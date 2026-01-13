import { useEffect, useState } from "react"
import Loader from "../components/Loader"


const CostExplorerTable = ({loading,selectedOption,months,groupInstances,sameMonthWiseCost}) =>{
    
    const [totalMonthCost,setTotalMonthCost] = useState(null)
    useEffect(()=>{

        if(groupInstances==null) return;
        let costs=[]
        if(groupInstances!=null){
            Object.keys(groupInstances)?.forEach((instanceName)=>{
                const totalSum = groupInstances[instanceName].reduce((sum,item)=>{
                    return sum+Number(item.value)
                },0)

                costs.push(totalSum)   
            })
            
            const totalCost=costs.reduce((sum,cost)=>{
                return sum+=cost
            },0)
            setTotalMonthCost(totalCost)
        }
    },[groupInstances])

    return(
        (loading)?<Loader/>:
        (<table className="h-max w-full bg-white">
            <thead className="sticky top-0">
                <tr className="bg-gray-100 text-gray-700 text-xs">
                    <th className="p-2 text-left border-r border-gray-300">{selectedOption}</th>
                    {
                        months?.map((month,index)=>(
                            <th key={index} className="text-center border-r border-gray-300">{month.label}</th>
                        ))
                    }
                    <th className="text-blue-900">Total</th>
                </tr>
            </thead>

            <tbody className="overflow-y-scroll">
                {
                    (groupInstances!=null)&&Object.keys(groupInstances)?.map((instanceName,index)=>(
                        <tr key={index} className="text-xs border-b border-gray-300">
                            <td className="p-2 font-semibold text-xs border-r border-gray-300">{instanceName}</td>
                            {
                                groupInstances[instanceName].map((costs,index)=>(
                                    <td key={index} className="text-center border-r border-gray-300">${costs.value}</td>
                                ))
                            }
                            <td className="text-center text-blue-900 font-semibold">
                                ${ 
                                    groupInstances[instanceName].reduce((sum,item)=>{
                                        return sum+item.value
                                    },0) 
                                }
                            </td>
                        </tr>
                    ))
                }
                <tr className="text-xs bg-blue-100 text-blue-900">
                    <td className="text-left p-2 border-r border-gray-300 font-semibold">Total</td>
                    {
                        sameMonthWiseCost!=null&&Object.entries(sameMonthWiseCost).map(([key,value])=>(
                            <td key={key} className="border-r border-gray-300 text-center font-semibold">${value}</td>
                        ))
                    }
                    <td className="text-center border-r border-gray-300 font-semibold">${totalMonthCost || 0}</td>
                </tr>
            </tbody>
        </table>)
    )
}

export default CostExplorerTable
