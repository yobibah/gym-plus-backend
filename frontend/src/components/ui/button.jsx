import React from "react";

export default function Button({onClick, icon, className, title}){
    return <button
        onClick={onClick}
        className={className}
       
      >
        {icon} {title}
      </button>
}