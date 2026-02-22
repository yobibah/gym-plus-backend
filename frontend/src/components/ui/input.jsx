import React from "react";

export default function Input({
    type,
    value,
    onChange, 
    className,
    placeholder=null,
    disabled=false,
    hidden=false,
    pattern=null,
    ref=null,
    checked=null
}){
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