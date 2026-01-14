import { useEffect, useState } from "react"
import { IoIosCloseCircleOutline } from "react-icons/io"
import { useAddUser, useEditUser } from "../../../queryApi/query";
import toast from "react-hot-toast";
import AwsAccountList from "../../../components/AwsAccountList";

const UserForm = ({ mode, show, setShow, data }) => {

  const [fName, setFName] = useState("")
  const [lName, setLName] = useState("")
  const [emailId, setEmailId] = useState("")
  const [role,setRole] = useState("")
  const [username,setUsername] = useState("")
  const [password,setPassword] = useState("")

  //this useState is used for checking , that is role changed to another role from customer than 
  //remove all the accounts from that user in frontend
  const [isCustomer,setIsCustomer] = useState(true)

  //this is for visiblity of onboardingAccountList
  const [showAccountList,setShowAccountList] = useState(false)
  
  const [awsAccounts,setAwsAccounts] = useState([])

  const { mutate: addUser , isLoading} = useAddUser();
  const { mutate: editUser } = useEditUser(); 

  useEffect(() => {
    if (mode === "edit" && data) {
      setFName(data.firstName || "");
      setLName(data.lastName || "");
      setEmailId(data.email || "");
      setRole(data.role || "");
    }
    if (mode === "add") {
      setFName("")
      setLName("")
      setEmailId("")
      setUsername("")
      setPassword("")
    }
  }, [mode, data]);

  useEffect(()=>{
    if(role==="Customer"){
      setShowAccountList(true)
    }
    else{
      setShowAccountList(false)
    }
  },[role])

  const handleRole=(e)=>{
    setRole(e.target.value)
    if(e.target.value.toString()==="Customer"){
      setShowAccountList(true)
    }
    else{
      setShowAccountList(false)
    }
  }

  const handleVisiblity = (e) => {
    e.preventDefault();
    setShow(false);
  };

  const handleAddUser = async()=>{

    if(fName.length==0||lName.length==0||emailId.length==0||username.length==0||password.length==0||(role=="Roles"||role.length==0)){
      toast.error("All Fields are Mandatory")
    }
    else if((role=="Customer")&&(awsAccounts.length==0 || awsAccounts==null || awsAccounts==undefined)){
      toast.error("Assigning Aws Account is Mandatory!")
    }
    else{
      addUser({
        "firstName": fName,
        "lastName": lName,
        "email": emailId,
        "username": username,
        "password": password,
        "role": role,
        "addAwsOnboardAccounts":awsAccounts
      })

    }
  }

  const handleEditUser = ()=>{

    if(fName.length==0||lName.length==0||emailId.length==0||(role=="Roles"||role.length==0)){
      toast.error("Cannot add user with blank details")
    }
    else{

      if(role!="Customer"){
        setIsCustomer(false)
      }

      editUser({
        id:data?.id,
        payload:{
          "firstName": fName,
          "lastName": lName,
          "email": emailId,
          "role":role,
          "addAwsOnboardAccounts":role!="Customer"?[]:awsAccounts
        }}
      )

    }
  }

  return (
    <>
      {/* {show && <div className="size-full absolute top-0 z-10 bg-gray-600 opacity-80" />} */}
      {show && <div className="h-screen w-screen absolute top-0 right-0 z-10 bg-gray-600 opacity-80" />}

      {show && (
        <div className={`h-max w-[800px] absolute z-20 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-gray-200 rounded-lg shadow-lg transition-all duration-300 ease-out py-2 px-2 flex flex-col space-y-4 text-blue-950`}>

          <div className="w-full flex items-center justify-between">
            <p className="text-2xl font-bold">{mode === "edit" ? "Update User" : "Add New User"}</p>
            <IoIosCloseCircleOutline className="size-8 cursor-pointer relative bottom-6 left-6 text-white bg-blue-950 rounded-full" onClick={handleVisiblity} />
          </div>

          <div className={`${showAccountList ? ("max-h-[740px] duration-200") : ("max-h-[200px] duration-500") } ${mode==="add" ? "max-h-[310px]":"max-h-[200px]"} w-full p-2 flex flex-col space-y-8 rounded-lg shadow-lg transition-[max-height] ease-in-out overflow-visible`}>

            <div className="w-full flex items-center justify-between text-md font-semibold">
              <div className="flex flex-col space-y-2">
                <label htmlFor="firstName">First Name</label>
                <input id="firstName" type="text" className="w-[320px] border-gray-400 rounded-md p-1 bg-white shadow-sm focus:outline-blue-800" value={fName} onChange={(e) => setFName(e.target.value)} required minLength={3} maxLength={20} placeholder="Enter First Name" />
              </div>

              <div className="flex flex-col space-y-2">
                <label htmlFor="lastName">Last Name</label>
                <input id="lastName" type="text" className="w-[320px] border-gray-400 rounded-md p-1 bg-white shadow-sm focus:outline-blue-800" value={lName} onChange={(e) => setLName(e.target.value)} required minLength={3} maxLength={20} placeholder="Enter Last Name" />
              </div>
            </div>

            <div className="w-full flex items-center justify-between text-md font-semibold">
              <div className="flex flex-col space-y-2">
                <label htmlFor="email">Email</label>
                <input id="email" type="email" className="w-[320px] border-gray-400 rounded-md p-1 bg-white shadow-sm focus:outline-blue-800" value={emailId} onChange={(e) => setEmailId(e.target.value)} required placeholder="Enter Email" />
              </div>

              <div className="w-[320px] flex flex-col space-y-2">
                <label>Select Role</label>
                <select className="border-gray-400 rounded-md p-1 bg-white shadow-sm text-gray-600 focus:outline-blue-950" value={role} onChange={(e) => handleRole(e)}>
                  <option>Roles</option>
                  <option>Admin</option>
                  <option>ReadOnly</option>
                  <option>Customer</option>
                </select>
              </div>
            </div>

            { mode==="add"?

              (<div className="w-full flex items-center justify-between text-md font-semibold">
                <div className="flex flex-col space-y-2">
                  <label htmlFor="username">Username</label>
                  <input id="username" type="text" className="w-[320px] border-gray-400 rounded-md p-1 bg-white shadow-sm focus:outline-blue-800" value={username} onChange={(e) => setUsername(e.target.value)} required minLength={3} maxLength={20} placeholder="Enter Username" />
                </div>

                <div className="flex flex-col space-y-2">
                  <label htmlFor="password">Password</label>
                  <input id="password" type="text" className="w-[320px] border-gray-400 rounded-md p-1 bg-white shadow-sm focus:outline-blue-800" value={password} onChange={(e) => setPassword(e.target.value)} required minLength={3} maxLength={20} placeholder="Enter Password" />
                </div>
              </div>):""
            }

            <AwsAccountList mode={mode} visible={showAccountList} setAccountList={setAwsAccounts} user={data} isCustomer={isCustomer}/>

          </div>
          
          
          <button className="py-2 px-4 bg-blue-950 text-white rounded-md hover:bg-blue-900 hover:cursor-pointer" onClick={mode==="edit"?handleEditUser:handleAddUser} disabled={isLoading}>
              {mode === "edit" ? "Update User" : "Add User"}
          </button>
        </div>
      )}
    </>
  );
};

export default UserForm;
