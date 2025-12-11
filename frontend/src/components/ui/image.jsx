import React from "react";
import contactimg from '../../assets/images/contactimg.png'

export default function ContactImage({style, source, label}){
    return <img src={source} alt={label} className={style} />
}