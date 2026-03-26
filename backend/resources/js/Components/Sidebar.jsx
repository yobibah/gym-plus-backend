import { useState } from "react";
import { Link, usePage } from "@inertiajs/react";
import {
    Dumbbell,
    LayoutDashboard,
    Users,
    LogOut,
    Menu,
    X,
    ChevronRight,
    Wallet,
    Settings,
    LucideUsers,
} from "lucide-react";

export default function Sidebar() {
    const { auth } = usePage().props;
    const { url } = usePage();
    const [collapsed, setCollapsed] = useState(false);
    const [mobileOpen, setMobileOpen] = useState(false);

    const links = [
        {
            href: "/dashboard",
            label: "Dashboard",
            icon: <LayoutDashboard size={20} />,
        },
        { href: "/membres", label: "Membres", icon: <Users size={20} /> },
        { href: "/gerants", label: "Gerants", icon: <LucideUsers size={20} /> },
        { href: "/salles", label: "Salles", icon: <Dumbbell size={20} /> },
        { href: "/paiements", label: "Paiements", icon: <Wallet size={20} /> },
        {
            href: "/parametres",
            label: "Parametres",
            icon: <Settings size={20} />,
        },
    ];

    const isActive = (href) => url.startsWith(href);

    const SidebarContent = () => (
        <div className="flex flex-col h-full">
            <div
                className={`flex items-center gap-3 px-4 py-5 border-b border-gray-100 ${collapsed ? "justify-center" : ""}`}
            >
                <Dumbbell size={28} className="text-orange-600 shrink-0" />
                {!collapsed && (
                    <span className="text-xl font-bold text-orange-600">
                        GymPlus
                    </span>
                )}
            </div>

            <nav className="flex-1 px-2 py-4 space-y-1">
                {links.map((link) => (
                    <Link
                        key={link.href}
                        href={link.href}
                        className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition
              ${
                  isActive(link.href)
                      ? "bg-orange-600 text-white"
                      : "text-gray-600 hover:bg-orange-50 hover:text-orange-600"
              }
              ${collapsed ? "justify-center" : ""}
            `}
                    >
                        {link.icon}
                        {!collapsed && <span>{link.label}</span>}
                    </Link>
                ))}
            </nav>

            {/* User + Logout */}
            <div className={`border-t border-gray-100 px-2 py-4 space-y-2`}>
                {/* Infos user */}
                {!collapsed && (
                    <div className="flex items-center gap-3 px-3 py-2">
                        <div className="w-9 h-9 rounded-full bg-orange-600 text-white flex items-center justify-center font-bold uppercase shrink-0">
                            {auth?.user?.name?.charAt(0) ?? "U"}
                        </div>
                        <div className="overflow-hidden">
                            <p className="text-sm font-semibold text-gray-800 truncate">
                                {auth?.user?.name ?? "Utilisateur"}
                            </p>
                            <p className="text-xs text-gray-500 truncate">
                                {auth?.user?.email}
                            </p>
                        </div>
                    </div>
                )}

                {/* Bouton déconnexion */}
                <Link
                    href="/logout"
                    method="post"
                    as="button"
                    className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium text-red-500 hover:bg-red-50 transition
            ${collapsed ? "justify-center" : ""}
          `}
                >
                    <LogOut size={20} />
                    {!collapsed && <span>Se déconnecter</span>}
                </Link>
            </div>
        </div>
    );

    return (
        <>
            {/* ── DESKTOP SIDEBAR ── */}
            <aside
                className={`hidden md:flex flex-col bg-white shadow-md transition-all duration-300
          ${collapsed ? "w-16" : "w-64"}
        `}
            >
                {/* Bouton collapse */}
                <button
                    onClick={() => setCollapsed(!collapsed)}
                    className="absolute top-4 -right-3 bg-white border border-gray-200 rounded-full p-1 shadow-sm z-10 hidden md:flex"
                >
                    <ChevronRight
                        size={14}
                        className={`text-gray-500 transition-transform duration-300 ${collapsed ? "" : "rotate-180"}`}
                    />
                </button>

                <SidebarContent />
            </aside>

            <button
                className="md:hidden fixed top-4 left-4 z-50 bg-white border border-gray-200 rounded-xl p-2 shadow-md"
                onClick={() => setMobileOpen(!mobileOpen)}
            >
                {mobileOpen ? <X size={20} /> : <Menu size={20} />}
            </button>

            {mobileOpen && (
                <div
                    className="md:hidden fixed inset-0 bg-black/40 z-40"
                    onClick={() => setMobileOpen(false)}
                />
            )}

            <aside
                className={`md:hidden fixed top-0 left-0 h-full w-64 bg-white shadow-xl z-50 transform transition-transform duration-300
          ${mobileOpen ? "translate-x-0" : "-translate-x-full"}
        `}
            >
                <SidebarContent />
            </aside>
        </>
    );
}
