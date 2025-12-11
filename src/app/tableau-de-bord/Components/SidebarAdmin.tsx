"use client";

import { 
  Home,
  GraduationCap,
  UserCheck,
  BookOpen,
  Hospital,
  BarChart3,
  Wrench,
  User,
  LogOut,
  ChevronRight
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const SidebarAdmin = () => {
  const pathname = usePathname();

  const menuItems: SidebarItem[] = [
    { 
      id: 'accueil', 
      label: 'Accueil Admin', 
      icon: <Home size={20} />, 
      href: '/tableau-de-bord' 
    },
    { 
      id: 'gestion-etudiants', 
      label: 'Gestion Étudiants', 
      icon: <GraduationCap size={20} />, 
      href: '/tableau-de-bord/gestion-etudiants' 
    },
    { 
      id: 'gestion-encadrants', 
      label: 'Gestion Encadrants', 
      icon: <UserCheck size={20} />, 
      href: '/tableau-de-bord/gestion-encadrants' 
    },
    { 
      id: 'gestion-hopitaux', 
      label: 'Gestion Hôpitaux', 
      icon: <Hospital size={20} />, 
      href: '/tableau-de-bord/gestion-hopitaux' 
    },
    { 
      id: 'profil', 
      label: 'Profil', 
      icon: <User size={20} />, 
      href: '/tableau-de-bord/profile' 
    },
    { 
      id: 'logout', 
      label: 'Se deconnecter', 
      icon: <LogOut size={20} />, 
      href: '/logout' 
    }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <aside className="w-65 shrink-0 ml-6 bg-[#EBEBEB]/30 rounded-2xl h-full flex flex-col">
      {/* Navigation principale */}
      <nav className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => {
            // Style spécial pour le bouton de déconnexion
            const isLogoutItem = item.id === 'logout';
            
            return (
              <Link
                key={item.id}
                href={item.href}
                className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                  isLogoutItem
                    ? 'text-gray-600 hover:bg-red-50 hover:text-red-600 hover:shadow-md border border-transparent hover:border-red-200'
                    : isActive(item.href)
                    ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25'
                    : 'text-gray-600 hover:bg-white hover:text-teal-600 hover:shadow-md border border-transparent hover:border-gray-200'
                }`}
              >
                <div className="flex items-center space-x-3">
                  <div className={`${
                    isLogoutItem
                      ? 'text-gray-400 group-hover:text-red-500'
                      : isActive(item.href) 
                      ? 'text-white' 
                      : 'text-gray-400 group-hover:text-teal-500'
                  }`}>
                    {item.icon}
                  </div>
                  <span className="font-medium text-sm">{item.label}</span>
                </div>
                {isActive(item.href) && !isLogoutItem && (
                  <ChevronRight size={16} className="text-white" />
                )}
              </Link>
            );
          })}
        </div>
      </nav>
    </aside>
  );
};

export default SidebarAdmin;