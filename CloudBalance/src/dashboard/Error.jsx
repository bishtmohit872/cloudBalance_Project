const Error = () =>{
    return(
        <div className="h-screen w-full flex flex-col items-center justify-center border-2">
            <img className="object-cover size-150 " src="/assets/errorImg.png" alt="error"/>
            <p className="text-2xl font-semibold">Sorry ,Requested page is not Found !</p>
        </div>
    )
}

export default Error