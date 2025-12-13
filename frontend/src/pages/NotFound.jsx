import React from "react";
import ContactImage from "../components/ui/image";
import Button from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import notfoundimg from '../assets/images/notfoundimg.png'


export default function NotFound() {

  const navigate = useNavigate()

  function goBack(){
    navigate('/')
  }

  return (
    <div className="flex flex-col gap-10 items-center justify-center bg-orange-100 min-h-screen p-4">
      <ContactImage 
        source={notfoundimg}
        label={"not-found"}
        style={" mx-auto w-150 h-150 animate-pulse"}
      />



      <Button onClick={goBack} title={'retour à l\'accuei'} icon={<ArrowLeft className="h-5 w-5"/>} className={"bg-orange-500 flex items-center transition-colors duration-200 justify-center gap-2 rounded-lg text-xl cursor-pointer hover:text-black hover:bg-orange-100 border-2 border-orange-500 p-2"}/>
    </div>
  );
}