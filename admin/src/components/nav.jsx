import { Link, NavLink } from "react-router-dom";
import {
  LayoutDashboard,
  CreditCard,
  Building2,
  UserSquare2,
  Users,
  Settings,
  LogOut,
} from "lucide-react";

import logo_gym from '../assets/logo_gym.svg'

const NavBar = () => {
  const nav = [
    { name: "Dashboard", path: "/", icon: LayoutDashboard },
    { name: "Paiements", path: "/paiement", icon: CreditCard },
    { name: "Salles", path: "/salle", icon: Building2 },
    { name: "Gerants", path: "/gerant", icon: UserSquare2 },
    { name: "Membres", path: "/membre", icon: Users },
  ];

  return (
    <aside className="fixed inset-y-0 left-0 z-40 w-64 border-r border-zinc-800 bg-zinc-950">
      <div className="p-4">
        <div className="mb-8 px-3 flex items-center gap-2">
            <Link 
            to={'/'}
            className="">
                <img src="/logo_gym.svg" alt="logo gymplus"
                className="h-10 w-10  rounded-xl"
                 />

            </Link>
          <h1 className="text-xl font-bold text-white">
            Gym<span className="text-orange-500">Plus</span>
          </h1>
        </div>

        <nav className="flex flex-col gap-2">
          {nav.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === "/"}
              className={({ isActive }) =>
                `flex items-center gap-3 rounded-xl px-4 py-3 text-sm font-medium transition-all duration-200 ${
                  isActive
                    ? "bg-orange-500/20 text-white border border-orange-500/20"
                    : "text-zinc-400 border border-transparent hover:bg-orange-500/10 hover:text-white"
                }`
              }
            >
              <item.icon size={20} />
              <span>{item.name}</span>
            </NavLink>
          ))}
        </nav>

        <nav className="absolute bottom-0 mb-5 ">
            <NavLink 
                  to={'/params'}
            className={`text-white flex gap-2 px-4 py-3.5 rounded-xl hover:bg-orange-500/10 hover:text-white`}
            >
                <Settings className="text-white"/> 
                <p>Parametres</p>
            </NavLink>
  
            <NavLink 
            to={'/logout'}
            className={`text-red-500 flex gap-2 mt-2 px-4 py-3.5 rounded-xl hover:bg-orange-500/10 hover:text-white  `}
            >
                <LogOut /> 
                <p>Deconnexion</p>
            </NavLink>
        </nav>
      </div>
    </aside>
  );
};

export default NavBar;