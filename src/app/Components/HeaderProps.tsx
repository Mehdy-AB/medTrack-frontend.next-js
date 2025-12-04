
"use client";

import { Bell } from 'lucide-react';

interface HeaderProps {
  spaceName: string;
  notificationCount?: number;
}

const Header = ({ spaceName, notificationCount = 0 }: HeaderProps) => {
  const hasNotifications = notificationCount > 0;

  return (
    <div className="bg-white px-4 sm:px-6 lg:px-8 pt-6 pb-4">
      <div className="max-w-7xl mx-auto">
        {/* Container avec fond gris et bordures arrondies */}
        <div className="bg-[#EBEBEB]/30 rounded-2xl px-6 py-4 flex items-center justify-between">
          {/* Nom de l'espace */}
          <h1 className="text-xl font-semibold text-gray-800">
            {spaceName}
          </h1>

          {/* Icône de notification */}
          <div className="relative">
            <button 
              className="p-2 rounded-full hover:bg-white/50 transition-colors duration-200 relative"
              aria-label="Notifications"
            >
              <Bell 
                className={`w-6 h-6 ${
                  hasNotifications ? 'text-red-500' : 'text-primary'
                }`}
                strokeWidth={2.5}
              />
              
              {/* Badge de nombre de notifications */}
              {hasNotifications && (
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs font-bold rounded-full h-5 w-5 flex items-center justify-center shadow-md">
                  {notificationCount > 99 ? '99+' : notificationCount}
                </span>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Header;
 