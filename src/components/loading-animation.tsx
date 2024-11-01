export default function LoadingAnimation() {
    return <div className="w-screen h-screen flex justify-center items-center">
        <div className="w-6 h-6 border-4 border-t-blue-500 border-gray-300 rounded-full animate-spin"></div>
        <div>
            <span className="mr-2">Loading</span>
            <span className="animate-[ping_1.5s_0.5s_ease-in-out_infinite]">.</span>
            <span className="animate-[ping_1.5s_0.7s_ease-in-out_infinite]">.</span>
            <span className="animate-[ping_1.5s_0.9s_ease-in-out_infinite]">.</span>
        </div>
    </div>
}
