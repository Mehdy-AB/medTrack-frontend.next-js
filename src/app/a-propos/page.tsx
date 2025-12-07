import React from 'react';
import { Users, Target, Zap, Shield, TrendingUp, MessageCircle } from 'lucide-react';
import Navbar from '../Components/Navbar';

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-gray-50">
        <Navbar />
      {/* Hero Section */}
      <section className="bg-gradient-to-br from-teal-400 to-teal-600 text-white py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <h1 className="text-5xl font-bold mb-6">À Propos de Notre Plateforme</h1>
          <p className="text-xl text-teal-50 max-w-3xl">
            Nous créons des liens essentiels entre les étudiants en médecine, les hôpitaux et les administrateurs. Notre plateforme modernise et simplifie la gestion des stages au sein des hôpitaux de la wilaya de Boumerdès, en facilitant l’inscription, le suivi des candidatures, la planification, la communication et l’évaluation.
Notre objectif est d’offrir un environnement numérique fiable, clair et performant au service de la formation médicale.
          </p>
        </div>
      </section>

      {/* Problem & Solution */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12">
            <div>
              <h2 className="text-3xl font-bold text-gray-800 mb-4">Le Défi</h2>
              <p className="text-gray-600 leading-relaxed">
                Dans le domaine des stages médicaux, la gestion manuelle et dispersée des informations complique le travail des étudiants, des hôpitaux et des administrateurs. Les candidatures, le suivi des stages, la communication et les évaluations se font souvent à travers plusieurs supports non centralisés, ce qui entraîne des pertes de temps, des erreurs et un manque de visibilité.
              </p>
            </div>
            <div>
              <h2 className="text-3xl font-bold text-teal-600 mb-4">Notre Solution</h2>
              <p className="text-gray-600 leading-relaxed">
                Nous avons conçu une plateforme numérique unifiée qui centralise l’ensemble du processus de gestion des stages médicaux. Grâce à une interface intuitive, des tableaux de bord personnalisés et des outils de communication intégrés, chaque acteur (étudiant, hôpital, administrateur) bénéficie d’une expérience fluide, claire et efficace pour organiser, suivre et améliorer les stages.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-12 px-6 bg-teal-50">
        <div className="max-w-6xl mx-auto">
          <div className="grid md:grid-cols-4 gap-8 text-center">
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">10k+</div>
              <div className="text-gray-600">Utilisateurs actifs</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">50k+</div>
              <div className="text-gray-600">Interactions quotidiennes</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">98%</div>
              <div className="text-gray-600">Satisfaction client</div>
            </div>
            <div>
              <div className="text-4xl font-bold text-teal-600 mb-2">24/7</div>
              <div className="text-gray-600">Support disponible</div>
            </div>
          </div>
        </div>
      </section>

      {/* Key Features */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">
            Fonctionnalités Principales
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Users className="text-teal-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Gestion de Profils
              </h3>
              <p className="text-gray-600">
                Créez et gérez facilement les profils des étudiants, des hôpitaux et des administrateurs. Chaque profil contient des informations essentielles telles que la spécialité médicale, les préférences de stage et le parcours académique.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <TrendingUp className="text-teal-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Tableaux de Bord
              </h3>
              <p className="text-gray-600">
                Suivez l’évolution des stages en temps réel grâce à des tableaux de bord clairs et personnalisés. Visualisez rapidement les candidatures, les affectations, les évaluations et les performances des étudiants.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <MessageCircle className="text-teal-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Communication
              </h3>
              <p className="text-gray-600">
                Un système de messagerie intégré permet une communication rapide et efficace entre les étudiants, les hôpitaux et l’administration. Des notifications automatiques informent les utilisateurs de chaque mise à jour importante.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Target className="text-teal-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Recherche Avancée
              </h3>
              <p className="text-gray-600">
                Trouvez rapidement les offres de stage, les étudiants ou les spécialités grâce à des filtres intelligents et un moteur de recherche performant adapté au domaine médical.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Shield className="text-teal-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Sécurité Renforcée
              </h3>
              <p className="text-gray-600">
                Les données personnelles et médicales sont protégées par des mécanismes de sécurité avancés et des méthodes d’authentification sécurisées, garantissant la confidentialité et l’intégrité des informations.
              </p>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg hover:shadow-lg transition-shadow">
              <div className="w-12 h-12 bg-teal-100 rounded-lg flex items-center justify-center mb-4">
                <Zap className="text-teal-600" size={24} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">
                Performance Optimale
              </h3>
              <p className="text-gray-600">
                Une interface rapide, fluide et responsive qui s’adapte à tous les appareils (ordinateur, tablette, mobile) pour garantir une expérience utilisateur optimale partout et à tout moment.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-16 px-6 bg-gray-50">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-8 text-center">Notre Histoire</h2>
          <div className="space-y-6 text-gray-600 leading-relaxed">
            <p>
              Tout a commencé avec une vision simple : simplifier la vie numérique des utilisateurs. 
              En 2023, notre équipe a identifié un besoin criant de centralisation et d'efficacité 
              dans la gestion des interactions en ligne.
            </p>
            <p>
              Après des mois de développement et d'écoute des premiers utilisateurs, nous avons 
              lancé notre plateforme avec une mission claire : offrir une expérience utilisateur 
              exceptionnelle tout en garantissant sécurité et performance.
            </p>
            <p>
              Aujourd'hui, des milliers d'utilisateurs nous font confiance quotidiennement. 
              Nous continuons d'innover et d'améliorer notre plateforme grâce à vos retours 
              et vos suggestions.
            </p>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 px-6 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-3xl font-bold text-gray-800 mb-12 text-center">Nos Valeurs</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Shield className="text-teal-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Transparence</h3>
              <p className="text-gray-600">
                Nous favorisons une gestion claire et équitable des stages grâce à une communication ouverte entre les étudiants, les hôpitaux et l’administration.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Zap className="text-teal-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Innovation</h3>
              <p className="text-gray-600">
                Nous développons continuellement des solutions numériques modernes pour améliorer l’organisation, le suivi et l’évaluation des stages médicaux.
              </p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="text-teal-600" size={32} />
              </div>
              <h3 className="text-xl font-semibold text-gray-800 mb-3">Communauté</h3>
              <p className="text-gray-600">
                Notre plateforme repose sur la collaboration et la confiance entre les étudiants en médecine, les encadrants hospitaliers et les responsables administratifs, au service d’une formation médicale de qualité.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Section Inspiration */}
        <section className="py-20 px-6 bg-gradient-to-br from-teal-500 to-teal-700 text-white">
            <div className="max-w-4xl mx-auto text-center">
                <h2 className="text-4xl font-bold mb-6">
                Ensemble pour une meilleure organisation des stages
                </h2>
                <p className="text-xl text-teal-50 mb-8">
                Notre plateforme accompagne les étudiants en médecine et les hôpitaux de la wilaya de Boumerdès
                vers une gestion plus fluide, plus claire et plus efficace des stages.
                </p>
                <div className="flex gap-4 justify-center flex-wrap">
                <button className="bg-white text-teal-600 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors">
                    Découvrir la Plateforme
                </button>
                <button className="border-2 border-white text-white px-8 py-3 rounded-lg font-semibold hover:bg-white hover:text-teal-600 transition-colors">
                    Voir les Fonctionnalités
                </button>
                </div>
            </div>
        </section>

    </div>
  );
}