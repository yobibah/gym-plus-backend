import React from "react";
import ImageComponent from "../components/ui/image";
import Button from "../components/ui/button";
import { ArrowLeft, Home } from "lucide-react";
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
    <div className="flex flex-col gap-6 sm:gap-8 md:gap-10 items-center justify-center bg-gradient-to-br from-orange-50 to-orange-100 min-h-screen p-4 sm:p-6 md:p-8">
      
      <div className="w-full max-w-6xl mx-auto">
        
        <div className="relative flex flex-col items-center justify-center">
          
          <div className="relative">
            <p className="text-5xl sm:text-7xl md:text-8xl lg:text-9xl uppercase font-bold text-orange-600/20 select-none">
              404
            </p>
            
            <div className="absolute inset-0 flex items-center justify-center">
              <ImageComponent 
                source={notfoundimg}
                label={"not-found"}
                style={"w-32 h-32 sm:w-48 sm:h-48 md:w-64 md:h-64 lg:w-80 lg:h-80 xl:w-96 xl:h-96 animate-pulse mx-auto"}
              />
            </div>
          </div>

          <div className="absolute -bottom-8 sm:-bottom-12 md:-bottom-16 left-0 right-0 flex items-center justify-center">
            <div className="bg-orange-500/90 backdrop-blur-sm px-4 py-2 sm:px-6 sm:py-3 md:px-8 md:py-4 rounded-lg shadow-lg">
              <p className="text-base sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl uppercase font-bold text-white text-center">
                Page inexistante !
              </p>
            </div>
          </div>
        </div>

        <div className="text-center mt-20 sm:mt-24 md:mt-28 lg:mt-32 mb-6 sm:mb-8 md:mb-10">
          <p className="text-gray-600 text-sm sm:text-base md:text-lg">
            Désolé, la page que vous recherchez n'existe pas ou a été déplacée.
          </p>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 md:gap-5">
          <Button 
            onClick={goBack} 
            title={'Page précédente'} 
            icon={<ArrowLeft className="h-4 w-4 sm:h-5 sm:w-5"/>} 
            className="w-full sm:w-auto bg-orange-500 flex items-center transition-all duration-300 justify-center gap-2 rounded-lg text-base sm:text-lg md:text-xl text-white font-bold hover:text-black hover:bg-orange-100 border-2 border-orange-500 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 shadow-md hover:shadow-lg transform hover:scale-105"
          />
          <Button 
            onClick={goAccueil} 
            title={'Retour à l\'accueil'} 
            icon={<Home className="h-4 w-4 sm:h-5 sm:w-5"/>}
            className="w-full sm:w-auto bg-orange-500 flex items-center transition-all duration-300 justify-center gap-2 rounded-lg text-base sm:text-lg md:text-xl text-white font-bold hover:text-black hover:bg-orange-100 border-2 border-orange-500 px-4 sm:px-5 md:px-6 py-2 sm:py-2.5 md:py-3 shadow-md hover:shadow-lg transform hover:scale-105"
          />
        </div>

        <div className="text-center mt-8 sm:mt-10 md:mt-12">
          <p className="text-gray-500 text-xs sm:text-sm">
            Ou vérifiez l'URL et réessayez
          </p>
        </div>
      </div>
    </div>
  );
}