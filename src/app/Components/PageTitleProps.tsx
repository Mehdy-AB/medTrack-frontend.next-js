interface PageTitleProps {
  title: string;
  description: string;
}

const PageTitle = ({ title, description }: PageTitleProps) => {
  return (
    <div className="mb-6">
      <h2 className="text-2xl font-bold text-gray-900 mb-2">
        {title}
      </h2>
      <p className="text-sm text-gray-600">
        {description}
      </p>
    </div>
  );
};

export default PageTitle;
