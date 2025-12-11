import React from "react";

export default function Input({type,checked, hidden, pattern, ref, value, placeholder, onChange, className, disabled}){
    return <input 
            type={type}
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            className={className}
            disabled={disabled}
            checked={checked}
            pattern={pattern}
            ref={ref}
            hidden={hidden}
        />
}