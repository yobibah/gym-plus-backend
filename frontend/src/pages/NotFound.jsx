import React from "react";
import ImageComponent from "../components/ui/image";
import Button from "../components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import notfoundimg from '../assets/images/notfoundimg.png'


export default function NotFound() {

  const navigate = useNavigate()

  function goBack(){
    navigate(-1)
  }
  function goAccueil(){
    navigate('/')
  }

  return (
    <div className="flex flex-col gap-10 items-center justify-center bg-orange-100 h-screen p-4">
      <div className=" relative flex items-center">
        <p className="text-9xl uppercase font-bold text-orange-600/70">Erreur</p>
        <ImageComponent 
          source={notfoundimg}
          label={"not-found"}
          style={" mx-auto w-150 h-150 animate-pulse"}
        />
        <div className=" absolute left-2 bottom-50 flex items-center justify-center">
          <p className="text-4xl uppercase font-semibold">Page inexistante !</p>
        </div>
      </div>
       
       <div className="flex items-center gap-2">
        <Button onClick={goBack} title={'Page précédente'} icon={<ArrowLeft className="h-5 w-5"/>} className={"bg-orange-500 flex items-center transition-colors duration-200 justify-center gap-2 rounded-lg text-xl text-white  font-bold hover:text-black hover:bg-orange-100 border-2 border-orange-500 p-2"}/>
        <Button onClick={goAccueil} title={'Retour à l\'accueil'} className={"bg-orange-500 flex items-center transition-colors duration-200 justify-center gap-2 rounded-lg text-xl text-white  font-bold hover:text-black hover:bg-orange-100 border-2 border-orange-500 p-2"}/>
      </div>
    </div>
  );
}