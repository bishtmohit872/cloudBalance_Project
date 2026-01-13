import { NavLink } from "react-router-dom"
import Options from "./costExplorerConfig"

import { LuSettings2 } from "react-icons/lu"
import graphs from "./graphConfig"
import FusionChart from "./FusionChart"
import { useEffect, useState } from "react"
import CostExplorerTable from "./CostExplorerTable"
import dayjs from "dayjs"
import { useFetchByAccountId, useFetchCostExplorerCategory, useFetchCostExplorerColumn, useFetchCostExplorerMonthWiseData } from "../queryApi/query"

import { useDispatch, useSelector } from "react-redux"
import { setActiveOption, setSwitchAccount } from "../redux/store"
import Loader from "../components/Loader"



const CostExplorer = () => {

    const [graphIndex, setGraphIndex] = useState(0)
    const [filterState, setFilterState] = useState(false)
    const sideBarState = useSelector(store => store.sideBarState)

    const dispatch = useDispatch()
    const option = useSelector(store => store.Options)
    const accountId = useSelector(store => store.switchAccount)
    
    const [category, setCategory] = useState(null)
    const [categoryValue, setCategoryValue] = useState(null)
    const [sideFilterCategory, setSideFilterCategory] = useState([])
    const { data: categoryOutput, isLoading: loading1 } = useFetchCostExplorerCategory(category, categoryValue)

    const { data: costData, isLoading } = useFetchCostExplorerMonthWiseData(option[0][1], categoryValue,accountId);

    const [xCategory, setXCategory] = useState(null)
    const [groupInstances, setGroupInstances] = useState(null)
    const [sameMonthGroupCost, setSameMonthGroupcost] = useState(null)

    //FilterSideBar
    const [openSubFilter, setOpenSubFilter] = useState(null)
    const [uniqueSideFilterOptions, setUniqueSideFilterOptions] = useState(null)
    const [parentKey, setParentKey] = useState([])
    // console.log(parentKey)
    const { data: sideFilterOptions, isLoading: loading } = useFetchCostExplorerColumn(openSubFilter)
    const { data: accountData, isLoading: loadingAccount } = useFetchByAccountId(accountId)

    useEffect(() => {
        dispatch(setSwitchAccount(true))
    }, [])

    ///Account data formatting
    const buildInstanceMonthWise = (response) => {
        const result = {};
        const totalMonths = response.length

        response.forEach((monthData, monthIndex) => {
            monthData.instanceCostDTO.forEach(({ instanceType, monthlyCost }) => {

                if (!result[instanceType]) {
                    result[instanceType] = Array(totalMonths)
                        .fill(0)
                        .map(() => ({ value: 0 }));
                }

                result[instanceType][monthIndex].value += Number(monthlyCost);
            });
        });

        return result;
    };

    const buildMonthWise = (response) => {
        return response.map(item => ({
            label: dayjs(item.date).format("MMMM YYYY")
        }));
    };

    const buildColumnWiseCost = (instanceMonthWise) => {
        const result = {}

        if (!instanceMonthWise) return result

        const instances = Object.keys(instanceMonthWise)
        if (instances.length === 0) return result

        const totalMonths = instanceMonthWise[instances[0]].length

        for (let monthIndex = 0; monthIndex < totalMonths; monthIndex++) {
            let total = 0

            instances.forEach(instance => {
                total += Number(instanceMonthWise[instance][monthIndex]?.value || 0)
            })

            result[monthIndex] = total
        }

        return result
    }

    useEffect(() => {
        if (!loadingAccount && accountData) {
            const result = buildInstanceMonthWise(accountData || [])
            const monthLabels = buildMonthWise(accountData || [])
            const columnCost = buildColumnWiseCost(result||[])
            setGroupInstances(result)
            setXCategory(monthLabels)
            setSameMonthGroupcost(columnCost)
        }
    }, [loadingAccount,accountData])


    useEffect(() => {

        if (categoryOutput != null) {

            const result = {}
            const totalMonths = categoryOutput.length

            const monthLabels = categoryOutput.map(item => ({
                label: dayjs(item.data).format("MMMM YYYY")
            }))

            categoryOutput.forEach((monthData, monthIndex) => {

                monthData.categoryCost.forEach(({ instanceType, profit }) => {

                    if (!result[instanceType]) {
                        result[instanceType] = Array(totalMonths)
                            .fill(0)
                            .map(() => ({ value: 0 }))
                    }

                    result[instanceType][monthIndex].value += Number(profit)
                })

            })


            const instanceKeys = Object.keys(result)
            const totalInstanceMonths = result[instanceKeys[0]].length

            const monthlyGroupCost = {}

            for (let monthIndex = 0; monthIndex < totalInstanceMonths; monthIndex++) {
                let totalCost = 0

                instanceKeys.forEach(instance => {
                    totalCost += result[instance][monthIndex]?.value || 0
                })

                monthlyGroupCost[monthIndex] = totalCost
            }

            setGroupInstances(result)
            setXCategory(monthLabels)
            setSameMonthGroupcost(monthlyGroupCost)
        }

    }, [categoryOutput])





    useEffect(() => {
        const data = new Set(sideFilterOptions?.sideSubOptions)
        setUniqueSideFilterOptions([...data])
    }, [sideFilterOptions])


    useEffect(() => {
        if (costData) {

            const dates = costData?.map((data) => {
                return { label: dayjs(data.date).format('MMMM YYYY') }
            })
            setXCategory(dates)

            const uniqueInstances = new Set()
            costData.forEach((data) => {
                data.instances.forEach(instance => uniqueInstances.add(instance.instanceType))
            })

            const result = {}
            const size = costData?.length
            uniqueInstances.forEach(instance => {
                result[instance] = Array(size).fill({ value: 0 })
            })

            costData.forEach((data, index) => {
                data.instances.forEach((instance) => {
                    result[instance.instanceType][index] = { value: instance.monthlyCost }
                })
            })

            //Total of each month of difference instances
            const sameMonthCost = {}
            const totalCols = result[Object.keys(result)[0]].length
            let total = 0

            for (let col = 0; col < totalCols; col++) {

                Object.keys(result).map((instance) => {
                    total += Number(result[instance][col]?.value)
                })
                sameMonthCost[col] = total
                total = 0
            }

            setSameMonthGroupcost(sameMonthCost)
            setGroupInstances(result)
        }
    }, [costData])

    let subKey = null
    const handleActiveIndex = (index, subKey) => {
        const options = [...option]

        if (subKey == null) {
            if (index != -1) {
                [options[0], options[index]] = [options[index], options[0]]
            }

        }
        else if (subKey != null) {
            const subIndex = options[7][1].findIndex(([key]) => key === subKey);
            // here above i put semicolor because with semicolor next line consider it as a string and give error at starting of next line
            [options[0], options[index][1][subIndex]] = [options[index][1][subIndex], options[0]]

        }

        dispatch(setActiveOption(options))
    }

    const handleGraphState = (index) => {
        setGraphIndex(index)
    }

    const handleFilterState = () => {
        setFilterState(prev => !prev)
    }

    const handleFirstHalf = (value) => {


        if (!openSubFilter) {
            setOpenSubFilter(value)
        }
        else {
            if (openSubFilter == value) {
                setOpenSubFilter(false)
            }
            else {

                setOpenSubFilter(false)
                setOpenSubFilter(value)
            }
        }
    }

    const handleSecondHalf = (value) => {

        if (!openSubFilter) {
            setOpenSubFilter(value)
        }
        else {
            if (openSubFilter == value) {
                setOpenSubFilter(false)
            }
            else {

                setOpenSubFilter(false)
                setOpenSubFilter(value)
            }
        }
    }

    const handleSubFilterCall = (value, option, key) => {
        if (categoryValue != option) {
            setCategory(value)
            setCategoryValue(option)
            setParentKey([...parentKey, key])
        }
        else if (categoryValue == option) {
            setCategoryValue(null)
        }
        setSideFilterCategory(prev => prev.includes(option) ? prev.filter(i => i !== option) : [...prev, option])
        // console.log(value,option)
    }

    return (
        <div
            className={`min-h-full w-full flex flex-col items-start p-4 space-y-6 bg-gray-200 transition-all duration-500`}
        >

            <div className="w-full">
                <p className="text-3xl font-extrabold">Cost Explorer</p>
                <p className="text-gray-600">How to always be aware of cost charges and history</p>
            </div>

            <div
                className={`bg-white border border-gray-300 flex flex-col transition-all duration-500 
                    ${sideBarState ? "w-[calc(100vw-300px)]" : "w-full"}`}>

                <div className="h-[60px] w-full px-4 flex items-center justify-between bg-gray-100 border-b border-gray-300">
                    <div className="flex items-center flex-wrap">

                        {option?.map((option, index) => (
                            <div key={index} className="flex items-center">

                                {index === 0 && <span className="font-bold mr-4">Group By:</span>}

                                {

                                    option[0] != "More" && (
                                        <NavLink
                                            className={`mr-2 px-3 py-1 font-semibold rounded-sm transition
                                            ${index === 0
                                                    ? "bg-blue-900 text-white"
                                                    : "bg-white border border-gray-300 text-blue-900"}
                                                `} onClick={() => handleActiveIndex(index)}>

                                            {option[0]}
                                        </NavLink>
                                    )
                                }

                                {index === 0 && <div className="h-[30px] border-r-2 border-gray-300 mr-2" />}

                                {
                                    option[0] === "More" && (
                                        <div className="w-max px-0 py-1 bg-white border border-gray-300 text-blue-900 rounded-sm">
                                            <select className="w-max outline-none font-semibold" onChange={(e) => { handleActiveIndex(index, e.target.value) }}>
                                                {
                                                    option[1].map((moreOptions, index) => (
                                                        <option key={index}>{moreOptions[0]}</option>
                                                    ))
                                                }
                                            </select>
                                        </div>
                                    )
                                }

                            </div>
                        ))}

                    </div>

                    <LuSettings2
                        size={34}
                        className="cursor-pointer border border-blue-900 bg-blue-900 text-white rounded-sm p-1"
                        onClick={handleFilterState}
                    />
                </div>

                <div className="relative h-[780px] w-full flex overflow-hidden">

                    <div className="flex-1 flex flex-col space-y-2 p-4 overflow-y-scroll scrollbar">

                        <div className="flex items-center justify-between">
                            <p className="text-gray-500 font-bold">Costs$</p>

                            <div className="flex border border-gray-200 rounded-sm">
                                {graphs.map((Icon, index) => (
                                    <Icon
                                        key={index}
                                        size={34}
                                        className={`p-2 cursor-pointer
                                        ${index !== graphs.length - 1 ? "border-r border-gray-200" : ""}
                                        ${graphIndex === index ? "bg-blue-100 text-blue-900" : ""}
                                    `}
                                        onClick={() => handleGraphState(index)}
                                    />
                                ))}
                            </div>
                        </div>

                        <div className={`min-h-max ${sideBarState ? "w-full" : "w-full"} border border-gray-300 rounded-sm overflow-hidden overflow-y-scroll scrollbar`}>
                            <FusionChart
                                typeIndex={graphIndex}
                                filter={filterState}
                                xLabel={xCategory}
                                groupInstances={groupInstances}
                                isLoading={isLoading}
                            />
                        </div>

                        <div className="h-[70px] w-full py-2 flex items-center justify-center text-sm font-semibold
                        text-blue-900 bg-blue-100 border border-blue-800 rounded-sm">
                            We are Showing up top 10 records by cost
                        </div>

                        <div className="min-h-[300px] w-full border border-gray-300 overflow-y-scroll scrollbar">
                            <CostExplorerTable
                                loading={isLoading}
                                selectedOption={option[0][0]}
                                months={xCategory}
                                groupInstances={groupInstances}
                                sameMonthWiseCost={sameMonthGroupCost}
                            />
                        </div>

                    </div>

                    <div
                        className={`absolute top-0 right-0 h-full w-[360px] bg-white border-l border-gray-300
                        transition-all duration-500 ease-in-out
                        ${filterState ? "translate-x-0 opacity-100 overflow-y-scroll scrollbar" : "translate-x-full opacity-0"}
                    `}
                    >
                        <div className="flex flex-col justify-start py-2 px-4">
                            <div className="w-full flex items-center justify-between mb-2">
                                <p className="font-bold text-blue-900 text-sm">Filters</p>
                                <p className="text-sm">Reset All</p>
                            </div>

                            {
                                option?.map(([key, value]) => (
                                    <div key={key} className="h-max w-full cursor-pointer">
                                        {
                                            key != "More" && (
                                                <div className="w-full flex flex-col items-center justify-start border-b border-gray-200 cursor-pointer">

                                                    <div className="h-10 w-full flex items-center justify-between" onClick={() => handleFirstHalf(value)}>
                                                        <div className="h-10 w-max flex items-center justify-between">
                                                            <input type="checkbox" className="border-2 border-gray-400 cursor-pointer" checked={key === parentKey} />
                                                            <p className="ml-2 text-sm font-medium">{key}</p>
                                                        </div>
                                                        <p className="text-xs text-gray-400 font-medium">Include Only</p>
                                                    </div>


                                                    <div className={`${openSubFilter == value ? "h-50 opacity-100 p-2" : "h-0 opacity-0"} w-full border border-gray-300 rounded-md transition-all duration-500 overflow-y-scroll scrollbar`}>
                                                        {
                                                            loading ? <Loader /> : uniqueSideFilterOptions?.map((option, index) => (
                                                                <div key={index} className="w-full flex items-center cursor-pointer" onClick={() => handleSubFilterCall(value, option, key)}>
                                                                    <input type="checkbox" checked={sideFilterCategory.includes(option)} className="mr-1" />
                                                                    <p>{option}</p>
                                                                </div>
                                                            ))
                                                        }
                                                    </div>


                                                </div>)
                                        }

                                        {
                                            Array.isArray(value) && (
                                                value?.map(([key, value]) => (

                                                    <div key={key} className="w-full flex flex-col items-center justify-start border-b border-gray-200 cursor-pointer">

                                                        <div className="h-10 w-full flex items-center justify-between" onClick={() => handleSecondHalf(value)}>
                                                            <div className="h-10 w-max flex items-center justify-start">
                                                                <input type="checkbox" className="border-2 border-gray-400 cursor-pointer" checked={key === parentKey} />
                                                                <p className="ml-2 text-sm font-medium">{key}</p>
                                                            </div>
                                                            <p className="text-xs text-gray-400 font-medium">Include Only</p>
                                                        </div>

                                                        <div className={`${openSubFilter == value ? "h-50 opacity-100 p-2" : "h-0 opacity-0"} w-full border border-gray-300 rounded-md transition-all duration-500 overflow-y-scroll scrollbar`}>
                                                            {
                                                                loading ? <Loader /> : uniqueSideFilterOptions?.map((option, index) => (
                                                                    <div key={index} className="w-full flex items-start cursor-pointer" onClick={() => handleSubFilterCall(value, option, key)}>
                                                                        <input type="checkbox" checked={sideFilterCategory.includes(option)} className="mr-1" />
                                                                        <p>{option}</p>
                                                                    </div>
                                                                ))
                                                            }

                                                        </div>

                                                    </div>
                                                ))
                                            )
                                        }
                                    </div>
                                ))
                            }
                        </div>
                    </div>

                </div>
            </div>
        </div>
    )


}

export default CostExplorer