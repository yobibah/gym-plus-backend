import React, {useState} from "react";
import { Dumbbell, Menu, X} from "lucide-react";
import { useNavigate } from "react-router-dom";
import Button from "./ui/button";
import { Link } from "react-scroll";
import { motion } from "framer-motion";


export default function Header() {
  const navigate = useNavigate();
  const [mobile, setMobile] = useState(false)
  const [active, setActive] = useState('')

  return (
    <div className="fixed top-0 w-full z-50 transition-all duration-200">

    
      <div className="flex justify-between items-center py-4 md:px-15 px-4 bg-white">
        <div className="flex items-center text-2xl font-semibold gap-2">
          <Dumbbell className="h-8 w-8 text-orange-600 animate-bounce" />
          <p>GymPlus</p>
        </div>

        <ul className="list-none hidden md:flex items-center gap-20">
          <li className="hover:text-orange-500 transition-colors duration-200 cursor-pointer  hover:border-b-2 hover:border-orange-600 ">
            {/* <a href="#features">Fonctionnalités</a> */}
            <Link
              to="features"
              smooth={true}
              duration={600}
              offset={-50}
            >Fonctionnalités</Link>
          </li>
          <li className="hover:text-orange-500 transition-colors duration-200 cursor-pointer  hover:border-b-2 hover:border-orange-600 ">
            {/* <a href="#suscribe">Tarifs</a> */}
            <Link
              to="suscribe"
              smooth={true}
              duration={600}
              offset={-50}
            >Tarifs</Link>
          </li>
          <li className="hover:text-orange-500 transition-colors duration-200 cursor-pointer  hover:border-b-2 hover:border-orange-600 ">
            {/* <a href="#contact">Contacts</a> */}
            <Link
              to="contact"
              smooth={true}
              duration={600}
              offset={-50}
            >Contacts</Link>
          </li>
          
        </ul>

        <motion.div
          whileTap={{scale: 0.95}}
        >
          <Button onClick={()=>navigate('/auth')} 
              className="hidden md:flex items-center border-2 border-orange-500 font-bold rounded-lg p-2 bg-orange-600 hover:bg-transparent hover:text-black text-white cursor-pointer transition-colors duration-200"
              title='Se connecter'
          />
        </motion.div>

        

        <button
          onClick={() => setMobile(!mobile)}
          className=" md:hidden cursor-pointer transition-all duration-200"
          
        >
          {mobile ? <X className="h-8 w-8"/> : <Menu className="h-8 w-8"/>}
        </button>
      </div>

      {mobile && (
          <div className="md:hidden h-screen transition-all duration-200 flex-col justify-center backdrop-blur-lg items-center bg-gray-600/50">
              <div className="flex justify-center text-center pt-70 font-bold text-lg ">
                  <ul className="flex-col space-y-10">
                    <li className={` py-2 px-3 rounded-lg ${active === 'features' ? 'border-orange-500 border-2' : 'bg-white/20'}`}>
                      <Link
                        to="features"
                        smooth={true}
                        duration={600}
                        offset={-80}
                        onClick={()=>{
                          setMobile(!mobile)
                          setActive('features')
                        }}
                        className={`hover:text-orange-500 text-white transition-colors duration-200 cursor-pointer`}
                      >Fonctionnalités</Link>
                    </li>

                    <li className={` py-2 px-3 rounded-lg ${active === 'suscribe' ? 'border-orange-500 border-2' : 'bg-white/20'}`}>
                      <Link
                        to="suscribe"
                        smooth={true}
                        duration={600}
                        offset={-80}
                        onClick={()=>{
                          setMobile(!mobile)
                          setActive('suscribe')
                        }}
                        className={`hover:text-orange-500 text-white transition-colors duration-200 cursor-pointer`}
                      >Tarifs</Link>
                    </li>

                    <li className={` py-2 px-3 rounded-lg ${active === 'contact' ? 'border-orange-500 border-2' : 'bg-white/20'}`}>
                      <Link
                        to="contact"
                        smooth={true}
                        duration={600}
                        offset={-80}
                        onClick={()=>{
                          setMobile(!mobile)
                          setActive('contact')
                        }}
                        className={`hover:text-orange-500 transition-colors duration-200 cursor-pointer text-white`}
                      >Contacts</Link>
                    </li>
                      </ul>
              </div>
              <div className="absolute bottom-30 w-full">
                  <motion.div
                    whileHover={{scale: 0.95}}
                    whileTap={{scale: 1.05}}
                    className="" 
                  >
                    <Button onClick={()=>navigate('/auth')} 
                      className={"cursor-pointer flex mx-auto  rounded-lg py-2 px-3 border-2 border-orange-500 text-white bg-orange-600 hover:bg-transparent font-bold text-lg transition-colors duration-200 "}
                      title='Se connecter'
                  />
                  </motion.div>
                  
              </div>
          </div>
      )}
    </div>
  );
}
