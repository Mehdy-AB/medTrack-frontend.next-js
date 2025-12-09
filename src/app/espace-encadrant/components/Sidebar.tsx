"use client";

import { 
  Home,
  Users,
  BookOpen,
  ClipboardList,
  Clock,
  MessageSquare,
  FileText,
  User,
  LogOut,
  ChevronRight,
  Calendar,
  LayoutDashboard,
  FileCheck
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
  isLogout?: boolean;
}

const SidebarEncadrant = () => {
  const pathname = usePathname();

  const menuItems: SidebarItem[] = [
    { 
      id: 'accueil', 
      label: 'Accueil Encadrant', 
      icon: <Home size={20} />, 
      href: '/espace-encadrant' 
    },
    { 
      id: 'liste-etudiants', 
      label: 'Liste Étudiants', 
      icon: <Users size={20} />, 
      href: '/espace-encadrant/Liste-Etudiants' 
    },
    { 
      id: 'PageStageActuel', 
      label: 'Stage actuel', 
      icon: <BookOpen size={20} />, 
      href: '/espace-encadrant/PageStageActuel' 
    },
    { 
      id: 'EvaluationsPage', 
      label: 'Évaluations', 
      icon: <ClipboardList size={20} />, 
      href: '/espace-encadrant/PageEvaluations' 
    },
    { 
      id: 'PagePresences', 
      label: 'Présences', 
      icon: <Clock size={20} />, 
      href: '/espace-encadrant/PagePresences' 
    },
    { 
      id: 'rapport', 
      label: 'Rapport', 
      icon: <FileText size={20} />, 
      href: '/espace-encadrant/rapport' 
    },
    { 
      id: 'messagerie', 
      label: 'Messagerie', 
      icon: <MessageSquare size={20} />, 
      href: '/espace-encadrant/messagerie' 
    },
    { 
      id: 'PagePlanning', 
      label: 'Planning', 
      icon: <Calendar size={20} />, 
      href: '/espace-encadrant/PagePlanning' 
    },
    { 
      id: 'vue-globale', 
      label: 'Vue Globale du Service', 
      icon: <LayoutDashboard size={20} />, 
      href: '/espace-encadrant/vue-globale' 
    },
    { 
      id: 'PageCandidatures', 
      label: 'Gestion des Candidatures', 
      icon: <FileCheck size={20} />, 
      href: '/espace-encadrant/PageCandidatures' 
    },
    { 
      id: 'profil', 
      label: 'Profil', 
      icon: <User size={20} />, 
      href: '/espace-encadrant/profile' 
    },
    { 
      id: 'logout', 
      label: 'Se déconnecter', 
      icon: <LogOut size={20} />, 
      href: '/logout',
      isLogout: true
    }
  ];

  const isActive = (href: string) => pathname === href;

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: Logique de déconnexion
    console.log('Déconnexion...');
    // Rediriger vers la page de connexion
    window.location.href = '/login';
  };

  return (
    <aside className="w-64 shrink-0 ml-6 mr-4">
      <div className="bg-[#EBEBEB]/30 rounded-2xl p-6">
        {/* Navigation principale */}
        <nav className="space-y-1">
          {menuItems.map((item) => {
            if (item.isLogout) {
              return (
                <button
                  key={item.id}
                  onClick={handleLogout}
                  className="w-full flex items-center justify-between px-4 py-3 rounded-xl transition-all duration-200 group text-gray-600 hover:bg-red-50 hover:text-red-600 hover:shadow-md border border-transparent hover:border-red-200"
                >
                  <div className="flex items-center space-x-3">
                    <div className="text-gray-400 group-hover:text-red-500">
                      {item.icon}
                    </div>
                    <span className="font-medium text-sm">{item.label}</span>
                  </div>
                </button>
              );
            }

            return (
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
            );
          })}
        </nav>
      </div>
    </aside>
  );
};

export default SidebarEncadrant;