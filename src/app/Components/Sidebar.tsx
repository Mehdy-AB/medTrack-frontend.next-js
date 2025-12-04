"use client";

import { 
  User, 
  LogOut, 
  Settings, 
  Home,
  BookOpen,
  Users,
  Building,
  BarChart3,
  FileText,
  Calendar,
  MessageSquare,
  Bell,
  GraduationCap,
  UserCheck,
  ChevronRight,
  ClipboardList,
  Clock,
  Hospital,
  Wrench
} from 'lucide-react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useMemo } from 'react';

interface SidebarItem {
  id: string;
  label: string;
  icon: React.ReactNode;
  href: string;
}

const Sidebar = () => {
  const pathname = usePathname();

  // Utiliser useMemo pour calculer l'espace actuel sans état
  const currentSpace = useMemo(() => {
    if (pathname?.includes('/espace-etudiant')) return 'etudiant';
    if (pathname?.includes('/espace-encadrant')) return 'encadrant';
    if (pathname?.includes('/espace-etablissement')) return 'etablissement';
    if (pathname?.includes('/tableau-de-bord')) return 'tableau-de-bord';
    return null;
  }, [pathname]);

  // Si on n'est pas dans un espace, ne pas afficher le sidebar
  if (!currentSpace) {
    return null;
  }

  // Items communs à tous les espaces
  const commonItems: SidebarItem[] = [
    { id: 'profile', label: 'Profile', icon: <User size={20} />, href: `/${currentSpace === 'tableau-de-bord' ? 'tableau-de-bord' : `espace-${currentSpace}`}/profile` },
  ];

  // Items spécifiques à chaque espace selon vos besoins
  const spaceSpecificItems: Record<string, SidebarItem[]> = {
    etudiant: [
      { id: 'accueil', label: 'Accueil Étudiant', icon: <Home size={20} />, href: '/espace-etudiant' },
      { id: 'mon-stage', label: 'Mon Stage', icon: <BookOpen size={20} />, href: '/espace-etudiant/mon-stage' },
      { id: 'evaluations', label: 'Mes Évaluations', icon: <ClipboardList size={20} />, href: '/espace-etudiant/evaluations' },
      { id: 'rapports-stage', label: 'Rapports Stage', icon: <FileText size={20} />, href: '/espace-etudiant/rapports-stage' },
      { id: 'planning', label: 'Planning', icon: <Calendar size={20} />, href: '/espace-etudiant/planning' },
      { id: 'messagerie', label: 'Messagerie', icon: <MessageSquare size={20} />, href: '/espace-etudiant/messagerie' },
    ],
    encadrant: [
      { id: 'accueil', label: 'Accueil Encadrant', icon: <Home size={20} />, href: '/espace-encadrant' },
      { id: 'liste-etudiants', label: 'Liste Étudiants', icon: <Users size={20} />, href: '/espace-encadrant/liste-etudiants' },
      { id: 'stage-actuel', label: 'Stage Actuel', icon: <BookOpen size={20} />, href: '/espace-encadrant/stage-actuel' },
      { id: 'evaluations', label: 'Évaluations', icon: <ClipboardList size={20} />, href: '/espace-encadrant/evaluations' },
      { id: 'presences', label: 'Présences', icon: <Clock size={20} />, href: '/espace-encadrant/presences' },
      { id: 'messagerie', label: 'Messagerie', icon: <MessageSquare size={20} />, href: '/espace-encadrant/messagerie' },
      { id: 'rapports', label: 'Rapports', icon: <FileText size={20} />, href: '/espace-encadrant/rapports' },
    ],
    etablissement: [
      { id: 'dashboard', label: 'Tableau de Bord', icon: <Home size={20} />, href: '/espace-etablissement' },
      { id: 'gestion-encadrants', label: 'Gestion Encadrants', icon: <UserCheck size={20} />, href: '/espace-etablissement/gestion-encadrants' },
      { id: 'gestion-etudiants', label: 'Gestion Étudiants', icon: <GraduationCap size={20} />, href: '/espace-etablissement/gestion-etudiants' },
      { id: 'gestion-projets', label: 'Gestion Projets', icon: <BookOpen size={20} />, href: '/espace-etablissement/gestion-projets' },
      { id: 'statistiques', label: 'Statistiques', icon: <BarChart3 size={20} />, href: '/espace-etablissement/statistiques' },
      { id: 'parametres-systeme', label: 'Paramètres Système', icon: <Settings size={20} />, href: '/espace-etablissement/parametres-systeme' },
    ],
    'tableau-de-bord': [
      { id: 'accueil', label: 'Accueil Admin', icon: <Home size={20} />, href: '/tableau-de-bord' },
      { id: 'gestion-etudiants', label: 'Gestion des Étudiants', icon: <GraduationCap size={20} />, href: '/tableau-de-bord/gestion-etudiants' },
      { id: 'gestion-encadrants', label: 'Gestion des Encadrants', icon: <UserCheck size={20} />, href: '/tableau-de-bord/gestion-encadrants' },
      { id: 'gestion-admins', label: 'Gestion des Admins', icon: <UserCheck size={20} />, href: '/tableau-de-bord/gestion-admins' },
      { id: 'gestion-stages', label: 'Gestion des Stages', icon: <BookOpen size={20} />, href: '/tableau-de-bord/gestion-stages' },
      { id: 'gestion-hopitaux', label: 'Gestion des Hôpitaux', icon: <Hospital size={20} />, href: '/tableau-de-bord/gestion-hopitaux' },
      { id: 'rapports-statistiques', label: 'Rapports et Statistiques', icon: <BarChart3 size={20} />, href: '/tableau-de-bord/rapports-statistiques' },
      { id: 'maintenance-parametres', label: 'Maintenance/Paramètres', icon: <Wrench size={20} />, href: '/tableau-de-bord/maintenance-parametres' },
    ]
  };

  const allItems = [...spaceSpecificItems[currentSpace], ...commonItems];

  const isActive = (href: string) => pathname === href;

  return (
    <div className="w-70 bg-linear-to-b from-white to-gray-50/30 border-r border-gray-200 h-full">
      <div className="flex flex-col h-full">
        
        {/* Navigation principale */}
        <nav className="flex-1 p-6">
          <div className="space-y-1">
            {allItems.map((item) => (
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
                  <div className={`${isActive(item.href) ? 'text-white' : 'text-gray-400 group-hover:text-teal-500'}`}>
                    {item.icon}
                  </div>
                  <span className="font-medium">{item.label}</span>
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
            <span className="font-medium">Log Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;