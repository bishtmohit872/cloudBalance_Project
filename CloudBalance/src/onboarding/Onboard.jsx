import { useSelector } from "react-redux"
import { CiCircleCheck } from "react-icons/ci";
import Bullet from "../components/Bullet";
import formattedJson from "./formattedJson";
import Clipboard from "../components/Clipboard";
import { ImCheckboxChecked } from "react-icons/im";
import { MdOutlineRadioButtonChecked } from "react-icons/md";
import toast from "react-hot-toast";

import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { useSaveAwsOnboardAccount } from "../queryApi/query";


const FirstPage = ({ pageIncr,iamRoleARN,accountId,accountName,setIamRoleARN,setAccountId,setAccountName }) => {

    const navigate = useNavigate()

    const handleNext = () => {
        const roleArnRegex = /^arn:aws:iam::\d{12}:role\/[A-Za-z0-9+=,.@_-]+$/;
        const accountIdRegex = /^\d{4}$/;
        const accountNameRegex = /^Aws Account \d+$/;

        let errors = [];

        if (!roleArnRegex.test(iamRoleARN)) {
            errors.push("Invalid IAM Role ARN");
        }

        if (!accountIdRegex.test(accountId)) {
            errors.push("Invalid Account ID");
        }

        if (!accountNameRegex.test(accountName)) {
            errors.push("Invalid Account Name");
        }

        if (errors.length > 0) {
            toast.error(errors.join(", "));
            return;
        }

        pageIncr();

    }

    const handleCancel=()=>{
        // Window.location.reload()
        navigate(0)

    }

    return (
        <div className="flex flex-col items-start overflow-y-hidden space-y-4">
            <div className="w-full">
                <p className="text-xl font-bold text-gray-900">Create IAM Role</p>
                <p className="text-sm text-gray-600 mt-2">Create IAM Role by following these steps</p>
            </div>

            <div className="h-max w-full rounded-lg bg-white border border-gray-400 p-8 flex flex-col items-start space-y-4">
                <div className="flex items-center justify-start">
                    <Bullet number="1" />
                    <p>Log into AWS account & <a className="text-blue-800 underline font-bold">Create an IAM Role</a>.</p>
                </div>

                <div className="flex items-center justify-start">
                    <Bullet number="2" />
                    <p>In the <em>Trusted entity type</em> section, select <span className="font-semibold">Custom trust policy</span>. Replace the prefilled policy with the policy provided below -</p>
                </div>

                <div className="h-60 w-[1100px] p-1 ml-8 flex justify-between border bg-gray-100 border-gray-200 overflow-y-scroll text-xs text-blue-800 relative font-semibold hover:border-blue-800 z-10 rounded-sm">
                    <pre>
                        <code>
                            {JSON.stringify(formattedJson, null, 1)}
                        </code>
                    </pre>
                    <div className="sticky top-0 right-1">
                        <Clipboard content={JSON.stringify(formattedJson, null, 1)} />
                    </div>
                </div>

                <div className="flex items-start justify-start">
                    <Bullet number="3" />
                    <p className="w-full">Click on <strong>Next</strong> to go to the <em>Add permissions page</em>. We would not be adding any permissions for now because the permission policy content will be dependent on the AWS Account ID retrieved from the IAM Role. Click on <strong>Next</strong>.</p>
                </div>

                <div className="flex flex-col items-start">
                    <div className="flex items-start justify-start">
                        <Bullet number="4" />

                        <div className="flex flex-col items-start space-y-4">
                            <p className="w-full">In the <em>Role name field</em>,enter the below-mentioned role name,and click on <strong>Create Role</strong> -</p>

                            <div className="w-[380px] flex items-center justify-start border border-gray-200 bg-gray-100 py-2 px-2 rounded-md hover:border-blue-800">
                                <Clipboard content="CK-Tuner-Role-dev2" />
                                <p className="ml-4 font-semibold">CK-Tuner-Role-dev2</p>
                            </div>

                        </div>
                    </div>
                </div>

                <div className="flex items-start space-y-2">
                    <Bullet number="5" />
                    <div className="flex flex-col items-start space-y-2">
                        <p className="w-full">Go to the newly create IAM Role and copy the Role ARN -</p>
                        <img src="/assets/onboarding1.png" className="w-[1100px]" alt="" />
                    </div>
                </div>

                <div className="flex items-start space-y-2">
                    <Bullet number="6" />
                    <div className="h-max flex flex-col items-start space-y-2">
                        <p className="w-full">Paste the copied Role ARN below -</p>

                        <div className="h-40 w-[1200px] flex flex-wrap items-start space-y-2">
                            <div className="flex flex-col items-start space-y-1">
                                <label className="text-xs text-gray-600 font-medium">Enter the IAM Role ARN <span className="text-red-600">*</span></label>
                                <input type="text" className="w-[400px] py-1 px-2 outline-none border border-gray-300" value={iamRoleARN} onChange={(e) => setIamRoleARN(e.target.value)} />
                            </div>

                            <div className="flex flex-col items-start space-y-1 mx-4">
                                <label className="text-xs text-gray-600 font-medium ">Enter Account ID <span className="text-red-600">*</span></label>
                                <input type="text" className="w-[400px] py-1 px-2 outline-none border border-gray-300" value={accountId} onChange={(e) => setAccountId(e.target.value)} />
                            </div>

                            <div className="flex flex-col items-start space-y-1">
                                <label className="text-xs text-gray-600 font-medium">Enter Account Name <span className="text-red-600">*</span></label>
                                <input type="text" className="w-[400px] py-1 px-2 outline-none border border-gray-300" value={accountName} onChange={(e) => setAccountName(e.target.value)} />
                            </div>
                        </div>
                    </div>
                </div>

            </div>

            <div className="w-full flex items-center justify-between">
                <button className="w-18 h-8 border border-blue-900 text-blue-800 rounded-sm bg-white text-xs font-bold" onClick={handleCancel}>Cancel</button>

                <button className="w-max h-8 py-1 px-3 border border-blue-800 bg-[#0A3CA2] text-white rounded-sm text-xs font-semibold hover:cursor-pointer" onClick={() => handleNext()}>Next - Add Customer Managed Policies</button>
            </div>

        </div>
    )
}

const SecondPage = ({ pageIncr, pageDecr }) => {

    const navigate = useNavigate()

    const handleCancel=()=>{
        // Window.location.reload()
        navigate(0)

    }
    return (
        <div className="flex flex-col items-start overflow-y-hidden space-y-4">
            <div className="w-full">
                <p className="text-xl font-bold text-gray-900">Add Customer Managed Policies</p>
                <p className="text-sm text-gray-600 mt-2">Create an Inline policy for the role by following these steps</p>
            </div>

            <div className="h-max w-full rounded-lg bg-white border border-gray-400 p-8 flex flex-col items-start space-y-4">
                <div className="flex items-start justify-start">
                    <Bullet number="1" />
                    <div className="flex flex-col space-y-4">
                        <p>Go to the <a className="text-blue-800 underline font-bold">CK Tuner Role</a>.</p>
                        <img src="/assets/onboarding2.1.png" className="w-[1100px]" alt="img" />
                    </div>
                </div>

                <div className="flex items-start justify-start">
                    <Bullet number="2" />
                    <div className="flex flex-col space-y-4">
                        <p>In Permission policies, click on <span className="font-semibold">Add permissions Attach Policy</span></p>
                        <img src="/assets/onboarding2.2.png" className="w-[1100px]" alt="img" />
                    </div>
                </div>

                <div className="flex items-start justify-start">
                    <Bullet number="3" />
                    <div className="flex flex-col space-y-4">
                        <p>Filter by Type Customer managed then search for <span className="font-semibold">cktuner-CostAuditPolicy, cktuner-SecAuditPolicy, cktuner-TunerReadEssentials , cktuner-SchedulerPolicy and select them</span>.</p>
                        <img src="/assets/onboarding2.3.png" className="w-[1100px]" alt="img" />
                    </div>
                </div>

                <div className="flex items-start justify-start">
                    <Bullet number="4" />
                    <p>Now, click on <span className="font-semibold">Add permissions</span></p>
                </div>
            </div>

            <div className="w-full flex items-center justify-between">
                <button className="w-18 h-8 border border-blue-900 text-blue-800 rounded-sm bg-white text-xs font-bold" onClick={handleCancel}>Cancel</button>

                <div className="w-max flex items-center justify-between">
                    <button className="w-max h-8 py-1 px-3 border border-blue-800 text-[#0A3CA2] bg-white rounded-sm text-xs font-semibold hover:cursor-pointer" onClick={pageDecr}>Back - Create IAM Role</button>

                    <button className="w-max h-8 py-1 px-3 ml-2 border border-blue-800 bg-[#0A3CA2] text-white rounded-sm text-xs font-semibold hover:cursor-pointer" onClick={pageIncr}>Next - Create CUR</button>
                </div>
            </div>

        </div>
    )
}

const ThirdPage = ({ setIndex,pageDecr ,iamRoleARN,accountName}) => {

    const navigate = useNavigate()
    const {mutate:saveAwsAccount,isPending} = useSaveAwsOnboardAccount()


    
    const handleSubmit = () => {
        console.log(iamRoleARN,accountName)
        saveAwsAccount({iamRoleARN,accountName})
        
        if(!isPending){
            setIndex(prev=>prev+1)
        }
    }
    const handleCancel=()=>{
        // Window.location.reload()
        navigate(0)

    }

    return (
        <div className="flex flex-col items-start overflow-y-hidden space-y-4">
            <div className="w-full">
                <p className="text-xl font-bold text-gray-900">Create Cost & Usage Report</p>
                <p className="text-sm text-gray-600 mt-2">Create a Cost & Usage Report by following these steps</p>
            </div>

            <div className="h-max w-full rounded-lg bg-white border border-gray-400 p-8 flex flex-col items-start space-y-4">
                <div className="flex items-start justify-start">
                    <Bullet number="1" />
                    <div className="flex flex-col space-y-4">
                        <p>Go to <a className="text-blue-800 underline font-bold">Cost and Usage Reports</a> in the Billing Dashboard and click on Create report.</p>
                    </div>
                </div>

                <div className="flex items-start justify-start">
                    <Bullet number="2" />
                    <div className="flex flex-col items-start space-y-4">
                        <p>Name the report as shown below and select the Include resource IDs checkbox -</p>
                        <div className="w-[380px] flex items-center justify-start border border-gray-200 bg-gray-100 py-2 px-2 rounded-md hover:border-blue-800">
                            <Clipboard content="ck-tuner-275595855473-hourly-cur" />
                            <p className="ml-4 font-semibold">ck-tuner-275595855473-hourly-cur</p>
                        </div>

                        <div className="size-max flex flex-col items-center justify-center space-y-2">
                            <p className="text-xs">Ensure that the following configuration is checked</p>
                            <div className="flex items-center justify-center">
                                <ImCheckboxChecked className="text-gray-400" />
                                <p className="font-semibold ml-2 text-sm">Include Resource IDs</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-start space-y-4">
                            <p className="text-sm">Click on <span className="font-semibold">Next</span></p>
                            <img src="/assets/onboarding3.1.png" alt="" />
                        </div>
                    </div>
                </div>

                <div className="flex items-start justify-start">
                    <Bullet number="3" />
                    <div className="flex flex-col items-start space-y-4">
                        <p>In <em>Configure S3 Bucket</em>, provide the name of the S3 bucket that was created -</p>
                        <div className="size-max flex flex-col items-center justify-center space-y-2">
                            <p className="text-xs">Ensure that the following configuration is checked</p>
                            <div className="flex items-center justify-center">
                                <ImCheckboxChecked className="text-gray-400" />
                                <p className="font-semibold ml-2 text-sm">Include Resource IDs</p>
                            </div>
                        </div>

                        <div className="flex flex-col items-start space-y-4">
                            <p className="text-sm">Click on <span className="font-semibold">Save</span></p>
                            <img src="/assets/onboarding3.2.png" alt="" />
                        </div>
                    </div>
                </div>

                <div className="flex items-start justify-start">
                    <Bullet number="4" />
                    <div className="flex flex-col items-start space-y-4">
                        <p>In the <em>Delivery Options</em> section, enter the below-mentioned Report path prefix -</p>

                        <p className="text-xs">Report Path Prefix -</p>
                        <div className="w-[380px] flex items-center justify-start border border-gray-200 bg-gray-100 py-2 px-2 rounded-md hover:border-blue-800">
                            <Clipboard content="ck-tuner-275595855473-hourly-cur" />
                            <p className="ml-4 font-semibold">ck-tuner-275595855473-hourly-cur</p>
                        </div>

                        <div className="size-max flex flex-col items-start justify-center space-y-2">
                            <p className="text-xs">Additionally, ensure that the following checks are in place</p>
                            <p className="text-xs">Time granularity:</p>
                            <div className="flex items-center justify-center">
                                <MdOutlineRadioButtonChecked className="text-gray-400" />
                                <p className="font-semibold ml-2 text-sm">Hourly</p>
                            </div>

                            <div className="size-max flex flex-col items-start justify-center space-y-2">
                                <p className="text-xs">Please make sure these checks are Enabled in Enable report data integration for:</p>
                                <div className="ml-10 flex items-center justify-start">
                                    <ImCheckboxChecked className="text-gray-400" />
                                    <p className="font-semibold ml-2 text-sm">Amazon Athena</p>
                                </div>
                            </div>
                        </div>

                        <div className="flex flex-col items-start space-y-4">
                            <img src="/assets/onboarding3.4.png" alt="" />
                        </div>
                    </div>
                </div>

                <div className="flex items-start justify-start">
                    <Bullet number="5" />
                    <p>Click on <strong>Next</strong>. Now, review the configuration of the Cost and Usage Report. Once satisfied, click on <strong>Create Report</strong>.</p>
                </div>

            </div>

            <div className="w-full flex items-center justify-between">
                <button className="w-18 h-8 border border-blue-900 text-blue-800 rounded-sm bg-white text-xs font-bold" onClick={handleCancel}>Cancel</button>

                <div className="w-max flex items-center justify-between">
                    <button className="w-max h-8 py-1 px-3 border border-blue-800 text-[#0A3CA2] bg-white rounded-sm text-xs font-semibold hover:cursor-pointer" onClick={() => pageDecr()}>Back - Add Customer Managed Policies</button>
                    <button className="w-max h-8 py-1 px-3 ml-2 border border-blue-800 bg-[#0A3CA2] text-white rounded-sm text-xs font-semibold" onClick={handleSubmit}>Submit</button>
                </div>
            </div>

        </div>
    )
}


const Onboard = () => {

    const [iamRoleARN, setIamRoleARN] = useState("");
    const [accountId, setAccountId] = useState("");
    const [accountName, setAccountName] = useState("");

    let [count, setCount] = useState(0)
    let [index, setIndex] = useState(0)
    const breadCrumbs = useSelector(store => store.breadCrumbs)
    const pages = [FirstPage, SecondPage, ThirdPage]
    const ActiveComponent = pages[count]

    const handlePageIncr = () => {
        if (count < 3) {
            setCount((prev) => prev + 1)
            setIndex((prev) => prev + 1)
        }
    }
    const handlePageDecr = () => {
        if (count !== 0) {
            setCount((prev) => prev - 1)
            setIndex((prev) => prev - 1)
        }
    }

     



    return (
        <div className="size-full flex flex-col items-center">
            <div className="w-full h-[8%] px-16 flex items-center justify-start">
                {
                    breadCrumbs.map((breadCrumb, i) => (
                        <div key={i} className={`h-full w-max mr-2 pr-6 flex items-center justify-start ${i <= index ? "border-b-4 border-green-700" : "opacity-40"}`}>
                            <span className={`border-2 ${index > i ? "bg-green-700" : "bg-gray-300"} text-white rounded-full flex items-center justify-center`}><CiCircleCheck size={30} /></span>
                            <p>{breadCrumb}</p>
                        </div>
                    ))
                }
            </div>
            <div className="h-[calc(100%-8%)] w-full py-8 px-16 bg-gray-100 overflow-y-scroll">
                <ActiveComponent value={count} setIndex={setIndex} pageIncr={handlePageIncr} pageDecr={handlePageDecr} 
                iamRoleARN={iamRoleARN} accountId={accountId} accountName={accountName}
                setIamRoleARN={setIamRoleARN} setAccountId={setAccountId} setAccountName={setAccountName}/>
            </div>
        </div>
    )
}

export default Onboard