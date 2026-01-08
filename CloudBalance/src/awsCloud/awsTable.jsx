import { useEffect, useState } from "react";
import AwsTableConfig from "./awsTableConfig"
import { CiFilter } from "react-icons/ci";
import Clipboard from "../components/Clipboard";

const AwsTable = ({dataIndex}) =>{
    
    const awsData = AwsTableConfig[dataIndex]
    const [instance,setInstance] = useState(awsData)

    useEffect(()=>{
        setInstance(awsData)
    },[awsData])

    const handleSorting=(data,index)=>{
    
        const col = Object.keys(data[0])[index]
        
        const sortData = [...data].sort((a,b)=>a[col].localeCompare(b[col]))

        setInstance({...instance,data:sortData})
     
    }


    return(
        <table className="w-full text-left border border-gray-300" cellSpacing="4">
            
            <thead className="w-full border">
                <tr className="w-full bg-blue-900 text-white">
                    {
                        instance?.header?.map((col,index)=>(
                            <th key={index} className="px-2 border-r border-white">
                                <div className="flex items-center justify-between">
                                    <span>{col}</span>
                                    <CiFilter size={20} className="cursor-pointer" onClick={()=>handleSorting(instance?.data,index)}/>
                                </div>
                            </th>
                        ))
                    }
                </tr>
            </thead>

            <tbody className="w-full overflow-y-scroll scrollbar">
                {
                    instance?.data?.map((data,index)=>(
                        <tr key={index} className={`${index%2==0?"bg-gray-100":""}`}>
                            {
                                Object.values(data).map((value,index)=>(
                                    <td key={index} className={`px-2 py-1 border border-gray-300 ${index==0?"text-blue-900 font-semibold":""}`}>
                                        <div className="flex items-center justify-between">
                                            <span>{value}</span>
                                            {
                                                index===0?(<Clipboard content={value}/>):""
                                            }
                                        </div>
                                    </td>
                                    
                                ))
                            }
                        </tr>
                    ))
                }
            </tbody>
        </table>
    )
}

export default AwsTable