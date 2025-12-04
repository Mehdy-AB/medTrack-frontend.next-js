interface CTASectionProps {
  title: string;
  description: string;
  imagePath: string;
}

const CTASection = ({ title, description, imagePath }: CTASectionProps) => {
  return (
    <section className="py-20 bg-linear-to-br from-white to-cyan-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
          {/* Image */}
          <div className="order-2 lg:order-1">
            <div className="relative">
              <div className="bg-white rounded-3xl shadow-2xl p-8 transform hover:scale-105 transition-transform duration-300">
                <img
                  src={imagePath}
                  alt="Connexion MedTrack"
                  className="w-full h-auto rounded-2xl"
                />
              </div>
            </div>
          </div>

          {/* Contenu */}
          <div className="order-1 lg:order-2 space-y-6">
            <h2 className="text-4xl md:text-5xl font-bold text-primary leading-tight">
              {title}
            </h2>
            <p className="text-lg text-gray-700 leading-relaxed">
              {description}
            </p>

            {/* Avantages */}
            <div className="space-y-4">
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700">
                  Rend la connexion entre les étudiants et les hôpitaux, rapide et sécurisée.
                </p>
              </div>
              <div className="flex items-start gap-3">
                <div className="shrink-0 w-6 h-6 bg-primary rounded-full flex items-center justify-center mt-1">
                  <span className="text-white text-sm">✓</span>
                </div>
                <p className="text-gray-700">
                  Une seule plateforme, des dizaines d'avantages.
                </p>
              </div>
            </div>

            {/* Bouton */}
            <a
              href="/connexion"
              className="inline-block px-8 py-4 bg-primary text-white font-semibold rounded-xl hover:bg-primary/90 transition-all duration-200 shadow-lg hover:shadow-xl"
            >
              Se connecter
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};

export default CTASection;