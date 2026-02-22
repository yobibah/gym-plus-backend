import React from "react";

export default function SkeletonCoach({key}){
    return(
        <div
            key={key}
            className="relative shadow-[0_0_18px_rgba(0,0,0,0.2)] w-50 flex flex-col items-center justify-center"
        >
            <div className="border-b bg-gray-200 border-gray-300 w-full h-50 flex items-center justify-center">

            </div>
            <div className="h-15 border-b bg-gray-200  border-gray-300 w-full flex flex-col gap-3 p-2">
                <div className="flex items-center gap-2 font-bold">
                    <p className="w-15 h-4 bg-gray-400 animate-pulse"></p>
                    <p className="w-15 h-4 bg-gray-400 animate-pulse"></p>
                </div>
                <div className="flex items-center gap-3">
                    <p className="w-30 h-4 bg-gray-400 animate-pulse"></p>
                    <p
                        className="w-10 h-4 bg-gray-400 animate-pulse"
                    ></p>
                </div>
            </div>

            <div className="h-5 bg-gray-200 w-full flex items-center px-2 py-4">
                <p
                    className="w-full border-r border-gray-300 flex items-center justify-center"
                >
                    <p className="w-5 h-2 rounded-full bg-gray-400 animate-pulse"></p>
                </p>
                <p
                    className="w-full  flex items-center justify-center"
                >
                    <p className="w-5 h-2 rounded-full bg-gray-400 animate-pulse"></p>
                </p>
            </div>

            <div className="absolute top-2 left-2">
                <p className="rounded-full w-30 bg-gray-400 animate-pulse text-white font-bold text-xs h-6"></p>
            </div>
        </div>
    )
}