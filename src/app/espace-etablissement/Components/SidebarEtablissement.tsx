"use client";

import { 
  Home,
  Building,
  Megaphone,
  FileCheck,
  Users,
  BarChart3,
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
  badge?: number;
  isLogout?: boolean;
}

const SidebarEtablissement = () => {
  const pathname = usePathname();

  // Données de menu pour l'espace établissement
  const menuItems: SidebarItem[] = [
    { 
      id: 'tableau-de-bord', 
      label: 'Tableau de Bord', 
      icon: <Home size={20} />, 
      href: '/espace-etablissement',
      badge: 3
    },
    { 
      id: 'gestion-services', 
      label: 'Gestion des Services', 
      icon: <Building size={20} />, 
      href: '/espace-etablissement/PageGestionServices',
      badge: 5
    },
    { 
      id: 'annonces-stages', 
      label: 'Annonces de Stages', 
      icon: <Megaphone size={20} />, 
      href: '/espace-etablissement/PageGestionAnnonces',
      badge: 2
    },
    { 
      id: 'candidatures', 
      label: 'Gestion Candidatures', 
      icon: <FileCheck size={20} />, 
      href: '/espace-etablissement/gestion-candidatures',
      badge: 12
    },
    { 
      id: 'liste-etudiants', 
      label: 'Liste des Étudiants', 
      icon: <Users size={20} />, 
      href: '/espace-etablissement/Liste-Etudiants',
      badge: 0
    },
    { 
      id: 'statistiques', 
      label: 'Statistiques & Rapports', 
      icon: <BarChart3 size={20} />, 
      href: '/espace-etablissement/statistiques-rapports'
    },
    { 
      id: 'messagerie', 
      label: 'Messagerie', 
      icon: <MessageSquare size={20} />, 
      href: '/espace-etablissement/messagerie',
      badge: 5
    },
    { 
      id: 'profil', 
      label: 'Profil Établissement', 
      icon: <User size={20} />, 
      href: '/espace-etablissement/profil'
    },
    { 
      id: 'logout', 
      label: 'Se déconnecter', 
      icon: <LogOut size={20} />, 
      href: '/logout',
      isLogout: true
    }
  ];

  const isActive = (href: string) => {
    if (href === '/espace-etablissement') {
      return pathname === href;
    }
    return pathname?.startsWith(href);
  };

  const handleLogout = (e: React.MouseEvent) => {
    e.preventDefault();
    // TODO: Logique de déconnexion
    console.log('Déconnexion établissement...');
    // Rediriger vers la page de connexion
    window.location.href = '/login';
  };

  return (
    <aside className="w-64 shrink-0 ml-6 mr-4">
      <div className="bg-[#EBEBEB]/30 rounded-2xl p-6">
        {/* En-tête du sidebar avec fond vert */}
        <div className="mb-6 p-4 bg-linear-to-r from-green-500 to-green-600 rounded-2xl text-white">
          <div className="flex items-center space-x-3">
            <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
              <Building size={20} />
            </div>
            <div>
              <h3 className="font-semibold">CHU Mustapha Pacha</h3>
              <p className="text-xs text-green-100">Établissement Principal</p>
            </div>
          </div>
        </div>

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
                
                {/* Badge de notification */}
                {item.badge !== undefined && item.badge > 0 && (
                  <span className={`px-1.5 py-0.5 text-xs font-semibold rounded-full ${
                    isActive(item.href)
                      ? 'bg-white/20 text-white'
                      : 'bg-teal-100 text-teal-600 group-hover:bg-teal-200'
                  }`}>
                    {item.badge}
                  </span>
                )}
                
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

export default SidebarEtablissement;