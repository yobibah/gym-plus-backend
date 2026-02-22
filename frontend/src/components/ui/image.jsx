import React from "react";

export default function ImageComponent({style, source, label}){
    return <img src={source} alt={label} className={style} />
}