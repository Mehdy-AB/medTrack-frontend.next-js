// Encadrant/PageStageActuel/components/StudentCard.tsx

"use client";

import { useState } from 'react';
import { User, Star, Mail, Clock, FileText } from 'lucide-react';
import { Student } from '../models/stage.model';

interface StudentCardProps {
  student: Student;
  onMenuOpen: (id: string) => void;
}

const StudentCard = ({ student, onMenuOpen }: StudentCardProps) => {
  const [showMenu, setShowMenu] = useState(false);

  const handleAction = (action: string) => {
    console.log(`Action: ${action} for student:`, student);
    // TODO: Implémenter les actions (redirection, modal, etc.)
  };

  return (
    <div 
      className="relative bg-white rounded-xl p-4 shadow-sm border border-gray-200 hover:shadow-md transition-all cursor-pointer"
      onMouseEnter={() => {
        setShowMenu(true);
        onMenuOpen(student.id);
      }}
      onMouseLeave={() => setShowMenu(false)}
    >
      <div className="flex items-center space-x-3">
        <img 
          src={student.photo} 
          alt={student.nom}
          className="w-12 h-12 rounded-full object-cover border-2 border-gray-100"
        />
        <span className="font-medium text-gray-800">{student.nom}</span>
      </div>

      {showMenu && (
        <div className="absolute left-0 top-full mt-2 bg-gray-800 text-white rounded-xl shadow-xl z-50 py-2 min-w-[200px]">
          <button 
            onClick={() => handleAction('profile')}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors text-left"
          >
            <User className="w-4 h-4" />
            <span>Profil</span>
          </button>
          
          <button 
            onClick={() => handleAction('evaluate')}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors text-left"
          >
            <Star className="w-4 h-4" />
            <span>Évaluer</span>
          </button>
          
          <button 
            onClick={() => handleAction('message')}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors text-left"
          >
            <Mail className="w-4 h-4" />
            <span>Message</span>
          </button>
          
          <button 
            onClick={() => handleAction('presence')}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors text-left"
          >
            <Clock className="w-4 h-4" />
            <span>Présences</span>
          </button>
          
          <button 
            onClick={() => handleAction('report')}
            className="w-full flex items-center gap-3 px-4 py-2 hover:bg-gray-700 transition-colors text-left"
          >
            <FileText className="w-4 h-4" />
            <span>Rapport</span>
          </button>
        </div>
      )}
    </div>
  );
};

export default StudentCard;