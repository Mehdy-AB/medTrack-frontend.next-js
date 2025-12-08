// app/contact/page.tsx
"use client";

import { useState } from 'react';
import Navbar from '../Components/Navbar';
import Footer from '../Components/Footer';
import { MapPin, Phone, Mail, Clock, CheckCircle } from 'lucide-react';

export default function ContactPage() {
  const [formData, setFormData] = useState({
    nom: '',
    email: '',
    objet: '',
    message: ''
  });
  
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Logique d'envoi du formulaire ici
    console.log('Formulaire envoyé:', formData);
    
    // Afficher le popup de succès
    setShowSuccess(true);
    
    // Réinitialiser le formulaire
    setFormData({
      nom: '',
      email: '',
      objet: '',
      message: ''
    });
  };

  const closeSuccessPopup = () => {
    setShowSuccess(false);
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      <Navbar />
      
      <main className="flex-1 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto">
          
          {/* Header - En haut */}
          <div className="mb-12">
             <h1 className="text-4xl font-bold text-gray-900 mb-4">Contactez-Nous</h1>
             <p className="text-gray-600 ">
                 Une Question, Une Suggestion, Ou Un Problème ? Remplissez Le Formulaire Ci-Dessous Ou Contactez-Nous Via Les Coordonnées Officielles.
             </p>
          </div>


          {/* Section Informations + Carte - Au milieu */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-12">
            
            {/* Informations - À gauche */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <h2 className="text-xl font-semibold text-gray-900 mb-6">
                Faculté De Médecine – Université M&apos;hamed Bougara De Boumerdès (UMBB)
              </h2>
              
              <div className="space-y-6">
                {/* Localisation */}
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-50 p-3 rounded-lg">
                    <MapPin className="text-teal-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Adresse</h3>
                    <p className="text-gray-600">
                      Avenue de l&apos;Indépendance,<br />
                      Boumerdès 35000, Algérie
                    </p>
                  </div>
                </div>

                {/* Téléphone */}
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-50 p-3 rounded-lg">
                    <Phone className="text-teal-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Téléphone</h3>
                    <p className="text-gray-600">+213 24 91 72 17</p>
                  </div>
                </div>

                {/* Email */}
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-50 p-3 rounded-lg">
                    <Mail className="text-teal-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                    <p className="text-gray-600">contact@univ-boumerdes.dz</p>
                  </div>
                </div>

                {/* Horaires */}
                <div className="flex items-start space-x-4">
                  <div className="bg-teal-50 p-3 rounded-lg">
                    <Clock className="text-teal-500" size={24} />
                  </div>
                  <div>
                    <h3 className="font-medium text-gray-900 mb-1">Horaires</h3>
                    <p className="text-gray-600">
                      Lundi - Jeudi: 8h00 - 17h00<br />
                      Vendredi: 8h00 - 12h00
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Carte - À droite */}
            <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full min-h-[400px]">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3196.3958366524547!2d3.4769!3d36.7667!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x128e52f1b7f1b1b1%3A0x1b1b1b1b1b1b1b1b!2sBoumerdes!5e0!3m2!1sen!2sdz!4v1234567890"
                width="100%"
                height="100%"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                title="Localisation Faculté"
              ></iframe>
            </div>
          </div>

          {/* Formulaire - En bas, centré */}
          <div className="max-w-3xl mx-auto">
            <div className="bg-white rounded-xl shadow-sm p-8">
              <h2 className="text-2xl font-semibold text-gray-900 mb-6">Remplir ces champs</h2>
              
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* Nom complet */}
                <div>
                  <label htmlFor="nom" className="block text-sm font-medium text-gray-700 mb-2">
                    Nom complet
                  </label>
                  <input
                    type="text"
                    id="nom"
                    name="nom"
                    value={formData.nom}
                    onChange={handleChange}
                    required
                    placeholder="Entrez votre nom complet"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Adresse e-mail */}
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                    Adresse e-mail
                  </label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                    placeholder="exemple@email.com"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Objet du message */}
                <div>
                  <label htmlFor="objet" className="block text-sm font-medium text-gray-700 mb-2">
                    Objet du message
                  </label>
                  <input
                    type="text"
                    id="objet"
                    name="objet"
                    value={formData.objet}
                    onChange={handleChange}
                    required
                    placeholder="Sujet de votre message"
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all"
                  />
                </div>

                {/* Message */}
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-2">
                    Message
                  </label>
                  <textarea
                    id="message"
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    required
                    rows={6}
                    placeholder="Écrivez votre message ici..."
                    className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-teal-500 focus:border-transparent outline-none transition-all resize-none"
                  ></textarea>
                </div>

                {/* Bouton */}
                <button
                  type="submit"
                  className="w-full bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-6 rounded-lg transition-colors duration-200 shadow-sm hover:shadow-md"
                >
                  Soumettre
                </button>
              </form>
            </div>
             <p className="text-gray-600 max-w-3xl mt-20 mx-auto">
                Ce site a été développé par des étudiants de la Faculté des Sciences 

                Departement d’Informatique de Boumerdès.

                dans le cadre d’un projet académique.

                Découvrir l’équipe du projet.
            </p>
          </div>

        </div>
      </main>

      <Footer />

      {/* Popup de succès */}
      {showSuccess && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
          <div className="bg-white rounded-2xl shadow-2xl max-w-md w-full p-8 text-center animate-fadeIn">
            <div className="mb-6">
              <div className="mx-auto w-16 h-16 bg-teal-100 rounded-full flex items-center justify-center">
                <CheckCircle className="text-teal-500" size={32} />
              </div>
            </div>
            
            <h3 className="text-2xl font-bold text-gray-900 mb-2">Merci !</h3>
            <p className="text-gray-600 mb-6">
              Votre message a bien été envoyé.<br />
              Nous vous répondrons dans que possible.
            </p>
            
            <button
              onClick={closeSuccessPopup}
              className="bg-teal-500 hover:bg-teal-600 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-200"
            >
              Fermer
            </button>
          </div>
        </div>
      )}
    </div>
  );
}