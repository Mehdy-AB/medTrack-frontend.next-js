interface HeroSectionProps {
  title: string;
  subtitle: string;
  buttonText: string;
  buttonLink: string;
  imagePath: string;
}

const HeroSection = ({ 
  title, 
  subtitle, 
  buttonText, 
  buttonLink, 
  imagePath 
}: HeroSectionProps) => {
  return (
    <section className="relative bg-linear-to-br from-cyan-50 to-blue-50 overflow-hidden">
      <div className="max-w-7xl mx-auto -mt-120 px-4 sm:px-6 lg:px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Contenu texte */}
          <div className="space-y-6">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold text-gray-900 leading-tight">
              {title}
            </h1>
            <p className="text-lg text-gray-600 max-w-xl">
              {subtitle}
            </p>
            <a
              href={buttonLink}
              className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              {buttonText}
            </a>
          </div>

          {/* Image */}
          <div className="relative">
            <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-blue-200 rounded-full blur-3xl"></div>
            <div className="relative rounded-full overflow-hidden shadow-2xl">
              <img
                src='/img/hero-doctors.png'
                alt="Médecins"
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </div>
      
      {/* Vague décorative */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path d="M0 0L60 10C120 20 240 40 360 46.7C480 53 600 47 720 43.3C840 40 960 40 1080 46.7C1200 53 1320 67 1380 73.3L1440 80V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0V0Z" fill="white"/>
        </svg>
      </div>
    </section>
  );
};

export default HeroSection;