interface MiniCardProps {
  label: string;
  count: number;
  icon?: React.ReactNode;
}

const MiniCard = ({ label, count, icon }: MiniCardProps) => {
  return (
    <div className="bg-white rounded-lg border border-gray-200 p-3 w-fit min-w-[180px] shadow-sm hover:shadow-md transition-all duration-150">
      <div className="flex items-center justify-between gap-3">

        {/* Label + Count same line */}
        <p className="text-sm font-medium text-gray-700">
          {label}: <span className="font-bold text-gray-900">{count}</span>
        </p>

        {/* Icon (small) */}
        {icon && (
          <div className="text-primary">
            {icon}
          </div>
        )}
      </div>
    </div>
  );
};

export default MiniCard;
