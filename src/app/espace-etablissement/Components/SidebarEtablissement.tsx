"use client";

import { 
  Home,
  UserCheck,
  GraduationCap,
  BookOpen,
  BarChart3,
  Settings,
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

const SidebarEtablissement = () => {
  const pathname = usePathname();

  const menuItems: SidebarItem[] = [
    { 
      id: 'dashboard', 
      label: 'Tableau de Bord', 
      icon: <Home size={20} />, 
      href: '/espace-etablissement' 
    },
    { 
      id: 'gestion-encadrants', 
      label: 'Gestion Encadrants', 
      icon: <UserCheck size={20} />, 
      href: '/espace-etablissement/gestion-encadrants' 
    },
    { 
      id: 'gestion-etudiants', 
      label: 'Gestion Étudiants', 
      icon: <GraduationCap size={20} />, 
      href: '/espace-etablissement/gestion-etudiants' 
    },
    { 
      id: 'gestion-projets', 
      label: 'Gestion Projets', 
      icon: <BookOpen size={20} />, 
      href: '/espace-etablissement/gestion-projets' 
    },
    { 
      id: 'statistiques', 
      label: 'Statistiques', 
      icon: <BarChart3 size={20} />, 
      href: '/espace-etablissement/statistiques' 
    },
    { 
      id: 'parametres-systeme', 
      label: 'Paramètres Système', 
      icon: <Settings size={20} />, 
      href: '/espace-etablissement/parametres-systeme' 
    }
  ];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="w-72 bg-gradient-to-b from-white to-gray-50/30 border-r border-gray-200 h-full flex flex-col">
      {/* Navigation principale */}
      <nav className="flex-1 p-6 overflow-y-auto">
        <div className="space-y-1">
          {menuItems.map((item) => (
            <Link
              key={item.id}
              href={item.href}
              className={`flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group ${
                isActive(item.href)
                  ? 'bg-teal-500 text-white shadow-lg shadow-teal-500/25'
                  : 'text-gray-600 hover:bg-white hover:text-teal-600 hover:shadow-md border border-transparent hover:border-gray-200'
              }`}
            >
              <div className="flex items-center space-x-3">
                <div className={`${
                  isActive(item.href) 
                    ? 'text-white' 
                    : 'text-gray-400 group-hover:text-teal-500'
                }`}>
                  {item.icon}
                </div>
                <span className="font-medium text-sm">{item.label}</span>
              </div>
              {isActive(item.href) && (
                <ChevronRight size={16} className="text-white" />
              )}
            </Link>
          ))}
        </div>
      </nav>

      {/* Section Déconnexion */}
      <div className="p-6 border-t border-gray-100">
        <button className="flex items-center space-x-3 px-4 py-3 rounded-xl text-gray-600 hover:bg-red-50 hover:text-red-600 w-full transition-all duration-200 group border border-transparent hover:border-red-200">
          <LogOut size={20} className="text-gray-400 group-hover:text-red-500" />
          <span className="font-medium text-sm">Se déconnecter</span>
        </button>
      </div>
    </div>
  );
};

export default SidebarEtablissement;