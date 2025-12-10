// espace-chef-service/PageVueGlobale/components/ExportButton.tsx

"use client";

import { Download } from 'lucide-react';

interface ExportButtonProps {
  onExport: () => void;
}

const ExportButton = ({ onExport }: ExportButtonProps) => {
  return (
    <button
      onClick={onExport}
      className="flex items-center gap-2 px-4 py-2 bg-teal-500 text-white rounded-lg text-sm font-medium hover:bg-teal-600 transition-colors shadow-md hover:shadow-lg"
    >
      <Download className="w-4 h-4" />
      Exporter en PDF
    </button>
  );
};

export default ExportButton;