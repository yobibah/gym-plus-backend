import React from "react";

export default function SkeletonListeProgram({key}){
    return(
        <div key={key} className="flex flex-col gap-5 border border-gray-200 p-4 rounded-lg bg-white">
            <div className="flex items-center justify-between ">
                <p className="w-20 h-6 animate-pulse bg-gray-300"></p>
            </div>

            <div className="flex items-center gap-2">
                <p className="w-6 h-6 animate-pulse bg-gray-300"></p>
                <p className="w-15 h-6 animate-pulse bg-gray-300"></p>
                <p className="w-15 h-6 animate-pulse bg-gray-300"></p>
                <p className="w-15 h-6 animate-pulse bg-gray-300"></p>
                <p className="w-15 h-6 animate-pulse bg-gray-300"></p>
            </div>

            <div className="flex items-center gap-2">
                <p className="w-6 h-6 animate-pulse bg-gray-300"></p>
                <p className="w-15 h-6 animate-pulse bg-gray-300"></p>
                <p className="w-15 h-6 animate-pulse bg-gray-300"></p>
            </div>

            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2">
                    <p className="w-6 h-6 animate-pulse bg-gray-300"></p>
                    <p className="w-15 h-6 animate-pulse bg-gray-300"></p>
                </div>
                <div className="flex items-center gap-2 overflow-y-auto">
                    <p className="w-20 h-10 animate-pulse bg-gray-300"></p>
                    <p className="w-20 h-10 animate-pulse bg-gray-300"></p>
                    <p className="w-20 h-10 animate-pulse bg-gray-300"></p>
                    <p className="w-20 h-10 animate-pulse bg-gray-300"></p>
                </div>
            </div>

            <div className="flex items-center justify-center my-5">
                <p className="w-75 h-6 animate-pulse bg-gray-300"></p>
            </div>
        </div>
    )
}



















