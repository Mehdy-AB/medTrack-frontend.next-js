import React from 'react';
import { Users, Target, Zap, Shield, TrendingUp,Monitor, MessageCircle, Award, Clock, CheckCircle, ArrowRight } from 'lucide-react';
import Navbar from '../Components/Navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Navbar />
      
      {/* Hero Section - Modern avec overlay subtil */}
      <section className="relative py-24 px-6 overflow-hidden">
       
        <div className="max-w-6xl mx-auto relative z-10">
         
           <h1 className="text-4xl font-bold text-gray-900 mb-4"> À Propos de Notre Plateforme</h1>
          
            <p className="text-xl text-gray-700 leading-relaxed mb-4">
              Nous créons des liens essentiels entre les étudiants en médecine, les hôpitaux et les administrateurs. 
              Notre plateforme modernise et simplifie la gestion des stages au sein des hôpitaux de la wilaya de Boumerdès, 
              en facilitant l&apos;inscription, le suivi des candidatures, la planification, la communication et l&apos;évaluation.
            </p>
            <p className="text-lg text-gray-600 leading-relaxed">
              Notre objectif est d&apos;offrir un environnement numérique fiable, clair et performant au service de la formation médicale.
            </p>
    
        </div>
      </section>

      {/* Problem & Solution - Design moderne avec cards */}
      <section className="py-20 px-6 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Carte Défi */}
            <div className="bg-white border border-gray-200 rounded-2xl p-8 shadow-sm hover:shadow-xl transition-all duration-300">
              <div className="w-14 h-14 bg-red-100 rounded-xl flex items-center justify-center mb-6">
                <Target className="text-red-600" size={28} />
              </div>
              <h2 className="text-3xl font-bold text-gray-900 mb-4">Le Défi</h2>
              <p className="text-gray-600 leading-relaxed text-lg">
                Dans le domaine des stages médicaux, la gestion manuelle et dispersée des informations complique 
                le travail des étudiants, des hôpitaux et des administrateurs. Les candidatures, le suivi des stages, 
                la communication et les évaluations se font souvent à travers plusieurs supports non centralisés, 
                ce qui entraîne des pertes de temps, des erreurs et un manque de visibilité.
              </p>
            </div>

            {/* Carte Solution */}
            <div className="bg-linear-to-br from-teal-500 to-cyan-600 rounded-2xl p-8 shadow-lg hover:shadow-2xl transition-all duration-300 text-white">
              <div className="w-14 h-14 bg-white/20 backdrop-blur-sm rounded-xl flex items-center justify-center mb-6">
                <CheckCircle className="text-white" size={28} />
              </div>
              <h2 className="text-3xl font-bold mb-4">Notre Solution</h2>
              <p className="text-teal-50 leading-relaxed text-lg">
                Nous avons conçu une plateforme numérique unifiée qui centralise l&apos;ensemble du processus de gestion 
                des stages médicaux. Grâce à une interface intuitive, des tableaux de bord personnalisés et des outils 
                de communication intégrés, chaque acteur (étudiant, hôpital, administrateur) bénéficie d&apos;une expérience 
                fluide, claire et efficace pour organiser, suivre et améliorer les stages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section - Design moderne avec animations */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-10">
            {[
              { number: '820', label: 'Etudiants actifs', icon: Users },
              { number: '100%', label: 'Gestion numérique des stages', icon: Monitor },
              { number: '98%', label: 'Satisfaction etudiants', icon: Award },
              { number: '24/7', label: 'Support disponible', icon: Clock }
            ].map((stat, index) => (
              <div key={index} className="bg-linear-to-br from-teal-50 to-cyan-50 rounded-xl p-6 border border-teal-100 hover:border-teal-300 transition-all duration-300 hover:scale-105">
                <stat.icon className="text-teal-600 mb-3" size={32} />
                <div className="text-4xl font-bold text-teal-700 mb-2">{stat.number}</div>
                <div className="text-gray-700 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Key Features - Grid moderne avec hover effects */}
      <section className="py-20 px-6 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Fonctionnalités</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3 mb-4">
              Tout ce dont vous avez besoin
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              Des outils puissants et intuitifs pour gérer efficacement les stages médicaux
            </p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Users,
                title: 'Gestion de Profils',
                description: 'Créez et gérez facilement les profils des étudiants, des hôpitaux et des administrateurs. Chaque profil contient des informations essentielles telles que la spécialité médicale, les préférences de stage et le parcours académique.',
                color: 'teal'
              },
              {
                icon: TrendingUp,
                title: 'Tableaux de Bord',
                description: 'Suivez l\'évolution des stages en temps réel grâce à des tableaux de bord clairs et personnalisés. Visualisez rapidement les candidatures, les affectations, les évaluations et les performances des étudiants.',
                color: 'cyan'
              },
             
              {
                icon: Target,
                title: 'Recherche Avancée',
                description: 'Trouvez rapidement les offres de stage, les étudiants ou les spécialités grâce à des filtres intelligents et un moteur de recherche performant adapté au domaine médical.',
                color: 'emerald'
              },
               {
                icon: MessageCircle,
                title: 'Communication',
                description: 'Un système de messagerie intégré permet une communication rapide et efficace entre les étudiants, les hôpitaux et l\'administration. Des notifications automatiques informent les utilisateurs de chaque mise à jour importante.',
                color: 'blue'
              },
              {
                icon: Shield,
                title: 'Sécurité Renforcée',
                description: 'Les données personnelles et médicales sont protégées par des mécanismes de sécurité avancés et des méthodes d\'authentification sécurisées, garantissant la confidentialité et l\'intégrité des informations.',
                color: 'indigo'
              },
              {
                icon: Zap,
                title: 'Performance Optimale',
                description: 'Une interface rapide, fluide et responsive qui s\'adapte à tous les appareils (ordinateur, tablette, mobile) pour garantir une expérience utilisateur optimale partout et à tout moment.',
                color: 'purple'
              }
            ].map((feature, index) => (
              <div 
                key={index} 
                className="group bg-white border border-gray-200 rounded-2xl p-7 hover:shadow-2xl hover:border-teal-200 transition-all duration-300 hover:-translate-y-1"
              >
                <div className={`w-14 h-14 bg-linear-to-br from-${feature.color}-100 to-${feature.color}-200 rounded-xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className={`text-${feature.color}-600`} size={26} />
                </div>
                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-teal-600 transition-colors">
                  {feature.title}
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {feature.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story - Timeline style */}
      <section className="py-20 px-6 bg-white">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-12">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Notre Parcours</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">Notre Histoire</h2>
          </div>
          <div className="bg-linear-to-br from-gray-50 to-teal-50 rounded-2xl p-8 md:p-12 border border-gray-200">
            <div className="space-y-8">
              {[
                {
                  text: "Tout a commencé avec une vision simple : simplifier la vie numérique des utilisateurs. En 2025, notre équipe a identifié un besoin criant de centralisation et d'efficacité dans la gestion des interactions en ligne."
                },
                {
                  text: "Après des mois de développement et d'écoute des premiers utilisateurs, nous avons lancé notre plateforme avec une mission claire : offrir une expérience utilisateur exceptionnelle tout en garantissant sécurité et performance."
                },
                {
                  text: "Aujourd'hui, des milliers d'utilisateurs nous font confiance quotidiennement. Nous continuons d'innover et d'améliorer notre plateforme grâce à vos retours et vos suggestions."
                }
              ].map((item, index) => (
                <div key={index} className="flex gap-4">
                  <div className="shrink-0 w-8 h-8 bg-teal-600 rounded-full flex items-center justify-center text-white font-bold">
                    {index + 1}
                  </div>
                  <p className="text-gray-700 leading-relaxed text-lg pt-1">{item.text}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Values - Design moderne avec icônes */}
      <section className="py-20 px-6 bg-linear-to-b from-gray-50 to-white">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="text-teal-600 font-semibold text-sm uppercase tracking-wider">Nos Principes</span>
            <h2 className="text-4xl font-bold text-gray-900 mt-3">Nos Valeurs</h2>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                icon: Shield,
                title: 'Transparence',
                description: 'Nous favorisons une gestion claire et équitable des stages grâce à une communication ouverte entre les étudiants, les hôpitaux et l\'administration.'
              },
              {
                icon: Zap,
                title: 'Innovation',
                description: 'Nous développons continuellement des solutions numériques modernes pour améliorer l\'organisation, le suivi et l\'évaluation des stages médicaux.'
              },
              {
                icon: Users,
                title: 'Communauté',
                description: 'Notre plateforme repose sur la collaboration et la confiance entre les étudiants en médecine, les encadrants hospitaliers et les responsables administratifs, au service d\'une formation médicale de qualité.'
              }
            ].map((value, index) => (
              <div key={index} className="text-center group">
                <div className="w-20 h-20 bg-linear-to-br from-teal-500 to-cyan-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:rotate-3 transition-all duration-300 shadow-lg">
                  <value.icon className="text-white" size={36} />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">{value.title}</h3>
                <p className="text-gray-600 leading-relaxed text-lg">
                  {value.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section - Design moderne avec gradient */}
      <section className="relative py-24 px-6 bg-linear-to-br from-teal-600 via-cyan-600 to-blue-700 text-white overflow-hidden">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0zNiAxOGMzLjMxNCAwIDYgMi42ODYgNiA2cy0yLjY4NiA2LTYgNi02LTIuNjg2LTYtNiAyLjY4Ni02IDYtNiIgc3Ryb2tlPSJyZ2JhKDI1NSwyNTUsMjU1LDAuMSkiLz48L2c+PC9zdmc+')] opacity-20"></div>
        <div className="max-w-4xl mx-auto text-center relative z-10">
          <p className="text-xl text-cyan-50 mb-10 leading-relaxed max-w-3xl mx-auto">
            Notre plateforme accompagne les étudiants en médecine et les hôpitaux de la wilaya de Boumerdès
            vers une gestion plus fluide, plus claire et plus efficace des stages.
          </p>
          <div className="flex gap-4 justify-center flex-wrap">
            <button className="group bg-white text-teal-600 px-8 py-4 rounded-xl font-semibold hover:bg-gray-50 transition-all duration-300 shadow-xl hover:shadow-2xl hover:scale-105 flex items-center gap-2">
              Découvrir la Plateforme
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
            <button className="group border-2 border-white text-white px-8 py-4 rounded-xl font-semibold hover:bg-white hover:text-teal-600 transition-all duration-300 flex items-center gap-2">
              Voir les Fonctionnalités
              <ArrowRight className="group-hover:translate-x-1 transition-transform" size={20} />
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}