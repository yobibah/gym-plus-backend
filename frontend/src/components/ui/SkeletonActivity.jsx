import React from "react";


export default function SkeletonActivity({key}){
    return(
        <div key={key} className=" rounded-lg bg-gray-200">

            <div className="h-60 w-full relative">
                <div className="w-full h-full bg-gray-300 animate-pulse"></div>
                <p className="absolute rounded-full top-5 left-5 bg-gray-400/50 h-8 w-20 animate-pulse"></p>
            </div>

            <div className="p-8 flex flex-col gap-5">

                <div className="w-full flex items-center justify-between">
                    <p className="h-8 w-40 bg-gray-300 animate-pulse"></p>
                    <div className="flex items-center gap-2">
                        <p className="h-6 w-6 animate-pulse bg-gray-300"></p>
                        <p className="h-6 w-6 animate-pulse bg-gray-300"></p>
                        <p className="h-6 w-6 animate-pulse bg-gray-300"></p>
                        <p className="h-6 w-6 animate-pulse bg-gray-300"></p>
                    </div>
                </div>

                <div className="flex flex-col gap-1">
                    <p className="h-6 w-100 animate-pulse bg-gray-300"></p>
                    <p className="h-6 w-95 animate-pulse bg-gray-300"></p>
                </div>

                <hr className="text-gray-300 w-full h-1 animate-pulse"/>

                <div className="flex items-center justify-between w-full">
                    <p className="h-8 w-30 animate-pulse bg-gray-300"></p>
                    <p className="h-8 w-30 animate-pulse bg-gray-300"></p>
                </div>
            </div>
        </div>
    )
}