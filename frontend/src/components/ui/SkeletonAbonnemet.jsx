import React from "react";

export default function SkeletonAbonnement({key}){
    return(
        <>
<tr key={key} className="text-sm p-2 border-b border-gray-200">

            <td className="flex items-center  font-bold  gap-2 py-5 px-3">
                <span className=" h-5 w-5 rounded-full bg-gray-400 animate-pulse flex items-center p-2"></span>
                <p className="h-5 w-20 animate-pulse bg-gray-400"></p>
            </td>
            <td className=" px-3 py-5"><p className="h-5 animate-pulse mx-auto w-50 bg-gray-400"></p></td>
            <td className=" px-3 py-5"><p className="h-5 animate-pulse w-50 mx-auto bg-gray-400"></p></td>
            <td className=" px-3 py-5"><p className="h-5 animate-pulse w-20 mx-auto bg-gray-400"></p></td>
            

            <td className=" py-5 px-3">
                <p className="h-5 w-20 mx-auto animate-pulse bg-gray-400"></p>
            </td>
        </tr>
        </>
    )
}