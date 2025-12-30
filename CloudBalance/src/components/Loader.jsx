const Loader = () => {
  return (
    <div className="h-screen w-screen flex items-center justify-center gap-2 relative">
        <div className="h-screen w-[95vw] absolute bg-gray-200"></div>
        <div className="w-2 h-10 bg-sky-400 animate-[equalize_1s_ease-in-out_infinite]"></div>
        <div className="w-2 h-10 bg-blue-500 animate-[equalize_1s_ease-in-out_infinite_150ms]"></div>
        <div className="w-2 h-10 bg-blue-900 animate-[equalize_1s_ease-in-out_infinite_300ms]"></div>
    </div>
  );
};


export default Loader