const Loader = () => {
  return (
    <div className="h-full w-full flex items-center justify-center gap-2 absolute left-0">
        <div className="h-screen w-screen absolute left-0 right-30 bg-gray-200"></div>
        <div className="w-2 h-10 bg-sky-400 animate-[equalize_1s_ease-in-out_infinite]"></div>
        <div className="w-2 h-10 bg-blue-500 animate-[equalize_1s_ease-in-out_infinite_150ms]"></div>
        <div className="w-2 h-10 bg-blue-900 animate-[equalize_1s_ease-in-out_infinite_300ms]"></div>
    </div>
  );
};


export default Loader