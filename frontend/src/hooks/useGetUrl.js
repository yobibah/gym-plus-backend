import React from "react";



export default function useGetUrl(){
    const apiUrl = import.meta.env.VITE_API_URL;

    return {apiUrl};
}

