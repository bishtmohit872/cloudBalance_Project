import { useState } from "react"
import tabs from "./tabConfig"
import AwsTable from "./awsTable"

const AwsCloud=()=>{
    const [btnIndex,setBtnIndex] = useState(0)

    const handleBtnIndex = (index)=>{
        setBtnIndex(index)
    }

    return(
        <div className="h-full w-full p-4 flex flex-col items-start bg-gray-100 space-y-6">
            <div className="h-max w-full flex flex-col items-start space-y-2">
                <p className="text-3xl font-extrabold">Scheduler</p>

                <div className="h-max w-max">
                    {
                        tabs.map((tab,index)=>(
                            <button key={index} className={`px-4 py-1 font-semibold cursor-pointer ${index===btnIndex? "bg-blue-100 border border-blue-400":"border border-gray-400"} text-blue-900 rounded-xs`} onClick={()=>handleBtnIndex(index)}>
                                {tab}
                            </button>
                        ))
                    }
                </div>
            </div>

            
            <div className="h-[800px] w-full bg-white flex flex-col space-y-2 px-2">
                <p className="text-2xl font-bold">Resources</p>
                <div className="h-[800px] w-full flex items-start overflow-y-scroll scrollbar">
                    <AwsTable dataIndex={btnIndex}/>
                </div>
            </div>
        </div>
    )
}

export default AwsCloud