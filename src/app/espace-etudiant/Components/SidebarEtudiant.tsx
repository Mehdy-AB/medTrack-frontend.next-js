"use client";

import { 
  Home,
  BookOpen,
  ClipboardList,
  FileText,
  Calendar,
  MessageSquare,
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

const SidebarEtudiant = () => {
  const pathname = usePathname();

  const menuItems: SidebarItem[] = [
    { 
      id: 'accueil', 
      label: 'Accueil Étudiant', 
      icon: <Home size={20} />, 
      href: '/espace-etudiant' 
    },
    { 
      id: 'mon-stage', 
      label: 'Mon Stage', 
      icon: <BookOpen size={20} />, 
      href: '/espace-etudiant/mon-stage' 
    },
    { 
      id: 'evaluations', 
      label: 'Mes Évaluations', 
      icon: <ClipboardList size={20} />, 
      href: '/espace-etudiant/evaluations' 
    },
    { 
      id: 'rapports-stage', 
      label: 'Rapports Stage', 
      icon: <FileText size={20} />, 
      href: '/espace-etudiant/rapports-stage' 
    },
    { 
      id: 'planning', 
      label: 'Planning', 
      icon: <Calendar size={20} />, 
      href: '/espace-etudiant/planning' 
    },
    { 
      id: 'messagerie', 
      label: 'Messagerie', 
      icon: <MessageSquare size={20} />, 
      href: '/espace-etudiant/messagerie' 
    },
    { 
      id: 'profil', 
      label: 'Profil', 
      icon: <User size={20} />, 
      href: '/espace-etudiant/profile' 
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

export default SidebarEtudiant;