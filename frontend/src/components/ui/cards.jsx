import React from "react";

export default function Card({className, iconClass, titleClass, textClass, icon, title, text}){
    return <div className={className}>
        <div className={iconClass}>{icon}</div>
        <div className={titleClass}>{title}</div>
        <div className={textClass}>{text}</div>
    </div>
}