// components/RoleCard.tsx
interface RoleCardProps {
  title: string;
  icon: string;
  onClick: () => void;
}

export default function RoleCard({ title, icon, onClick }: RoleCardProps) {
  return (
    <div
      className="bg-white rounded-lg p-8 cursor-pointer transition-all duration-300 
                 hover:shadow-lg border border-gray-100 flex flex-col items-center 
                 text-center"
      onClick={onClick}
    >
      <div className="text-5xl mb-4">{icon}</div>
      <h3 className="text-lg font-medium text-gray-800">{title}</h3>
    </div>
  );
}