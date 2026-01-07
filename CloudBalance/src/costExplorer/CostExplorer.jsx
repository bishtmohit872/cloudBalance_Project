import { NavLink } from "react-router-dom"
import Options from "./costExplorerConfig"

import { LuSettings2 } from "react-icons/lu"
import graphs from "./graphConfig"
import FusionChart from "./FusionChart"
import { useSelector } from "react-redux"
import { useState } from "react"


const CostExplorer = () => {


    const [OptionList,setOptionList] = useState([...Options])
    const [graphIndex,setGraphIndex] = useState(0)
    const [filterState,setFilterState] = useState(false)


    const sideBarState = useSelector(store=>store.sideBarState)

    const handleActiveIndex = (index) => {
        const updateOptions = [...OptionList]
        if(index!=-1){
            [updateOptions[0],updateOptions[index]]=[updateOptions[index],updateOptions[0]]
        }
        setOptionList([...updateOptions])
    }

    const handleGraphState=(index)=>{
        setGraphIndex(index)
    }

    const handleFilterState=()=>{
        setFilterState(prev=>!prev)
    }

    return (
        <div className={`h-full ${sideBarState?"w-[1570px]":"w-full"} flex flex-col items-center justify-start p-4 space-y-8 bg-gray-200 transition-all duration-500`}>
            <div className="h-max w-full">
                <div className="flex flex-col justify-center items-start">
                    <p className="text-3xl font-extrabold">Cost Explorer</p>
                    <p className="text-gray-600">How to always be aware of cost charges and history</p>
                </div>
            </div>

            <div className="h-max w-full shrink flex flex-col items-center justify-center">

                <div className="h-[60px] w-full px-4 flex items-center justify-between bg-gray-100 border border-gray-300">
                    
                    <div className="h-max w-full flex items-center">
                        {OptionList?.map((option, index) => (
                            <div key={index} className="w-max flex items-center">

                                {index === 0 && (
                                    <span className="font-bold mr-4">Group By:</span>
                                )}

                                <NavLink
                                    className={
                                        `mr-2 px-3 py-1 font-semibold rounded-sm ${index==0
                                            ? "bg-blue-900 text-white"
                                            : "bg-white border border-gray-300 text-blue-900"
                                        }`
                                    }
                                    onClick={() => handleActiveIndex(index)}
                                >
                                    {option}
                                </NavLink>

                                {index === 0 && (
                                    <div className="h-[30px] border-r-2 border-gray-300 mr-2" />
                                )}
                            </div>
                        ))}
                    </div>


                    <LuSettings2 size={35} className="cursor-pointer border border-blue-900 bg-blue-900 text-white rounded-sm p-1" onClick={handleFilterState}/>
                    {/* <div className="border px-3 py-2 bg-blue-900 text-white rounded-md cursor-pointer">
                    </div> */}

                </div>


                <div className={`h-max ${sideBarState?"w-[82vw]":"w-[94vw]"} bg-white flex border-l border-b border-r border-gray-200 transition-all duration-400 overflow-hidden`}>
                    
                    <div className={`h-full ${filterState?"w-[1760px]":"w-[94vw]"} shrink flex flex-col px-4 transition-all duration-700 overflow-hidden`}>
                        <div className="w-full flex items-center justify-between py-4">
                            <p className="text-gray-500 font-bold">Costs$</p>

                            <div className="h-max flex border border-gray-200 rounded-sm">
                                {graphs.map((Icon, index) => (
                                    <Icon
                                        key={index}
                                        size={35}
                                        className={`p-2 cursor-pointer ${index !== graphs.length - 1 ? "border-r border-gray-200" : ""
                                            } ${graphIndex===index?"bg-blue-100 text-blue-900":""}`}
                                        onClick={()=>handleGraphState(index)}
                                    />
                                ))}
                            </div>
                        </div>

                        {/* chart */}
                        <div className="h-max w-full border border-gray-300 rounded-sm transition-all duration-400">
                            <FusionChart typeIndex={graphIndex} filter={filterState}/>
                        </div>
                    </div>

                    {/* <div className={`border-2 h-full ${filterState?"block w-[340px]":"w-0 hidden"} translate-x-6 transition-all duration-400`}> */}
                    <div className={`h-full ${filterState?"w-[352px] translate-x-80":"w-0 translate-x-0"} transition-all duration-400`}>

                    </div>
                </div>
            </div>

        </div>
    )
}

export default CostExplorer