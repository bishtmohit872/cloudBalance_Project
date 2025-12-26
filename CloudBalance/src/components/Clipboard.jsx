import toast from "react-hot-toast";
import { FaRegPaste } from "react-icons/fa6";

const Clipboard = ({content}) =>{
    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(content);
        } 
        catch (err) {
            toast.error("Failed to copy", err);
        }
        toast.success("Copied !")
    };
    return(
        <div className="size-max p-1 border border-blue-500 rounded-sm bg-white hover:bg-blue-800 hover:text-white hover:cursor-pointer" 
        onClick={()=>handleCopy()}>
            <FaRegPaste size={15}/>
        </div>
    )
}

export default Clipboard