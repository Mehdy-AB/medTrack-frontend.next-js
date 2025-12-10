"use client";
import { Facebook, Instagram, Twitter, Linkedin } from 'lucide-react';
import Link from 'next/link';

const Footer = () => {
  return (
    <footer className="relative bg-[#42BABA]/50 pb-8 mt-30">

      {/* Wave decoration at top */}
      <div className="absolute top-0 left-0 w-full overflow-hidden leading-none" style={{ height: '80px', transform: 'translateY(-100%)' }}>
        <svg className="relative block w-full h-full" preserveAspectRatio="none" viewBox="0 0 1200 120">
          <path d="M0,80 C300,10 600,150 900,40 C1050,0 1200,60 1200,60 L1200,120 L0,120 Z" fill="#42BABA" opacity="0.5"/>
          <path d="M0,70 C300,20 600,100 900,40 C1050,10 1200,50 1200,50" stroke="#42BABA" strokeWidth="2" fill="none" opacity="0.6" />
          <path d="M0,60 C300,0 600,90 900,20 C1050,-10 1200,40 1200,40" stroke="#42BABA" strokeWidth="1.5" fill="none" opacity="0.5" />
          <path d="M0,85 C300,40 600,120 900,60 C1050,20 1200,70 1200,70" stroke="#42BABA" strokeWidth="1" fill="none" opacity="0.4" />     
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Logo + Nom (Ligne séparée) */}
        <div >
          <Link href="/" className="flex items-center">
            <img 
              src="/img/logo.png" 
              alt="MedTrack Logo" 
              className="h-32 w-32"
            />
          </Link>
        </div>

        {/* 4 Colonnes en dessous */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 items-start">
          
          {/* Colonne 1: Texte + Social Media */}
          <div className="mr-28">
            <p className="text-gray-700 text-sm leading-relaxed mb-4">
              <strong>Un projet réalisé par des étudiants, pour les étudiants.</strong>
            </p>
            <p className="text-gray-600 text-xs leading-relaxed mb-4">
              <strong>Découvrez l&apos;équipe du projet →</strong><br />
              Université M&apos;hamad Bougara de Boumerdès, Faculté Des Sciences.<br />
              <a href="#" className="text-teal-700 hover:text-teal-900 underline">
                Université officielle →
              </a>
            </p>
            
            {/* Social Media Icons */}
            <div className="flex space-x-4">
              <a href="#" className="text-gray-700 hover:text-teal-700 transition-colors">
                <Facebook size={20} />
              </a>
              <a href="#" className="text-gray-700 hover:text-teal-700 transition-colors">
                <Instagram size={20} />
              </a>
              <a href="#" className="text-gray-700 hover:text-teal-700 transition-colors">
                <Twitter size={20} />
              </a>
              <a href="#" className="text-gray-700 hover:text-teal-700 transition-colors">
                <Linkedin size={20} />
              </a>
            </div>
          </div>

          {/* Colonne 2: Connectez-vous */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4 text-base">Connectez-vous</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-700 hover:text-teal-700 transition-colors text-sm">
                  Accueil
                </Link>
              </li>
              <li>
                <Link href="/choose-role" className="text-gray-700 hover:text-teal-700 transition-colors text-sm">
                  Se Connecter
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 3: Espaces */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4 text-base">Espaces</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/espace-etudiant" className="text-gray-700 hover:text-teal-700 transition-colors text-sm">
                  Espace Étudiant
                </Link>
              </li>
              <li>
                <Link href="/espace-encadrant" className="text-gray-700 hover:text-teal-700 transition-colors text-sm">
                  Espace Encadrant 
                </Link>
              </li>
              <li>
                <Link href="/espace-etablissement" className="text-gray-700 hover:text-teal-700 transition-colors text-sm">
                  Espace Etablissement
                </Link>
              </li>
              <li>
                <Link href="/tableau-de-bord" className="text-gray-700 hover:text-teal-700 transition-colors text-sm">
                  Tableau De Bord
                </Link>
              </li>
            </ul>
          </div>

          {/* Colonne 4: Feedback */}
          <div>
            <h3 className="text-gray-800 font-semibold mb-4 text-base">Feedback</h3>
            <ul className="space-y-3">
              <li>
                <a href="/a-propos" className="text-gray-700 hover:text-teal-700 transition-colors text-sm">
                  À propos
                </a>
              </li>
              <li>
                <a href="/contact" className="text-gray-700 hover:text-teal-700 transition-colors text-sm">
                  Contact
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider Line */}
        <div className="border-t border-gray-400 my-8"></div>

        {/* Copyright */}
        <div className="text-center">
          <p className="text-gray-600 text-sm">
            Copyright © 2025 MedTrack.com
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;