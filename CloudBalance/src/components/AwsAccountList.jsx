import { CiSearch } from "react-icons/ci"
import { useFetchOnboard } from "../queryApi/query"
import Loader from "./Loader"
import { useEffect, useState } from "react";

import { FaArrowCircleLeft } from "react-icons/fa";
import { FaArrowCircleRight } from "react-icons/fa";

import { FaRegFolderOpen } from "react-icons/fa";

const AwsAccountList = ({visible}) => {

    const { data: awsAccount, isLoading } = useFetchOnboard();


    const [accounts,setAccounts] = useState([])
    const [filterAccounts,setFilterAccounts] = useState([])
    //this is for checkbox purpose
    const [selectedAccounts, setSelectedAccounts] = useState([])


    const [associatedAccounts,setAssociatedAccounts] = useState([])
    const [filterAssociatedAccounts,setFilterAssociatedAccounts] = useState([])
    //this is for checkbox purpose
    const [selectedAssociatedAccounts,setSelectedAssociatedAccounts] = useState([])
 
   
    useEffect(()=>{
        setAccounts(awsAccount)
    },[awsAccount])
    
    useEffect(()=>{
        setFilterAccounts(accounts)
    },[accounts])

    // useEffect(()=>{
    //     setAccounts(filterAccounts)
    // },[filterAccounts])

    useEffect(()=>{
        setFilterAssociatedAccounts(associatedAccounts)
    },[associatedAccounts])


    const handleRightArrow=()=>{
        setAssociatedAccounts(selectedAccounts)

        const remainingAccounts = filterAccounts.filter((account)=>{
            return !selectedAccounts.includes(account)
        })

        setAccounts(remainingAccounts)

        setSelectedAccounts([])
    }

    const handleLeftArrow=()=>{
        
        if(!selectedAssociatedAccounts.length==0){
            const remainingAccounts = associatedAccounts.filter((account)=>{
                return !selectedAssociatedAccounts.includes(account)
            })
            setAssociatedAccounts(remainingAccounts)
            setAccounts([...accounts,...selectedAssociatedAccounts])
            setSelectedAssociatedAccounts([])
        }
        
    }


    return (
        // <div className={`h-[500px] w-full p-8 ${visible?"flex":"hidden"} items-center justify-between border border-gray-400`}>
        <div className={`h-[500px] w-full p-4 flex items-center justify-between border border-gray-200 rounded-lg bg-white transition-all  ease-in-out ${visible ? "opacity-100 translate-y-0 max-h-[500px] duration-1000" : "opacity-0 translate-y-4 max-h-0 duration-300 overflow-hidden pointer-events-none"}`}>

            <div className="h-max w-[45%] border border-gray-300 rounded-lg flex flex-col items-center">
                <div className="w-full p-2 flex items-center justify-between bg-blue-200 rounded-t-lg text-white">
                    <p className="text-black text-lg font-semibold">Choose Account IDs</p>
                    <p className="text-blue-800 font-bold">{accounts?.length} Available</p>
                </div>
                <div className="h-10 w-full px-2 flex items-center justify-center border-b border-gray-300">
                    <CiSearch size={25} />
                    <input type="search" className="w-full h-full ml-2 focus:outline-none font-medium" placeholder="Search" onChange={(e)=>{
                        setFilterAccounts(accounts.filter((account)=>{
                            return account.accountName.toLowerCase().includes(e.target.value.toLowerCase()) || account.accountARN.split(":")[4].includes(e.target.value)
                        }))
                    }}/>
                </div>

                <div className="h-[360px] w-full flex flex-col overflow-y-scroll scrollbar rounded-sm">
                    {
                        isLoading ? <Loader /> : (
                            filterAccounts?.map((account, index) => {
                                const id = account?.accountARN.split(":")[4];

                                return (
                                    <label key={index} className={`p-4 border-b border-gray-300 ${index%2==0 ? "bg-gray-200":"bg-white"}`}>
                                        <input
                                            className="mr-2 cursor-pointer"
                                            type="checkbox"
                                            checked={selectedAccounts?.includes(account)}
                                            onChange={() =>
                                                setSelectedAccounts(
                                                    selectedAccounts?.includes(account)
                                                        ? selectedAccounts?.filter((x) => x !== account)
                                                        : [...selectedAccounts, account]
                                                )
                                            }
                                        />
                                        <span>{`${account.accountName} (${id})`}</span>
                                    </label>
                                )
                            })
                        )
                    }
                </div>
            </div>

            <div className="h-max flex flex-col items-center justify-between space-y-10">
                <FaArrowCircleRight size={40} className="cursor-pointer" onClick={handleRightArrow}/>
                <FaArrowCircleLeft size={40} className="cursor-pointer" onClick={handleLeftArrow}/>
            </div>

            <div className="h-max w-[45%] border border-gray-300 rounded-lg flex flex-col items-center">
                <div className="w-full p-2 flex items-center justify-between bg-blue-200 rounded-t-lg text-white">
                    <p className="text-black text-lg font-semibold">Associated Account IDs</p>
                    <p className="text-blue-800 font-bold">{associatedAccounts?.length} Available</p>
                </div>

                <div className="h-10 w-full p-2 flex items-center justify-center border-b border-gray-300">
                    <CiSearch size={25} />
                    <input type="search" className="w-full h-full ml-2 focus:outline-none font-medium" placeholder="Search" disabled={associatedAccounts.length==0} onChange={(e)=>{
                        setFilterAssociatedAccounts(associatedAccounts.filter((account)=>{
                            return account.accountName.toLowerCase().includes(e.target.value.toLowerCase()) || account.accountARN.split(":")[4].includes(e.target.value)
                        }))
                    }}/>
                </div>
                
                <div className="h-[360px] w-full flex flex-col items-center justify-start overflow-y-scroll scrollbar">
                    {
                        filterAssociatedAccounts?.length==0?(
                            <div className="w-full mt-8 flex flex-col items-center">
                                <FaRegFolderOpen size={60}/>
                                <p className="text-xl font-semibold">No Account IDs Added </p>
                                <p className="text-sm text-gray-700 font-medium mt-4">Selected Account Ids will be shown here</p>
                            </div>
                        ):
                        filterAssociatedAccounts?.map((account, index) => {
                                const id = account.accountARN.split(":")[4];

                                return (
                                    <label key={index} className={`w-full p-4 border-b border-gray-300 ${index%2==0 ? "bg-gray-200":"bg-white"}`}>
                                        <input
                                            className="mr-2 cursor-pointer"
                                            type="checkbox"
                                            checked={selectedAssociatedAccounts.includes(account)}
                                            onChange={() =>
                                                setSelectedAssociatedAccounts(
                                                    selectedAssociatedAccounts.includes(account)
                                                        ?selectedAssociatedAccounts.filter((x) => x !== account)
                                                        : [...selectedAssociatedAccounts, account]
                                                )
                                            }
                                        />
                                        <span>{`${account.accountName} (${id})`}</span>
                                    </label>
                                )
                        })
                    }
                </div>
            </div>
        </div>
    )
}

export default AwsAccountList