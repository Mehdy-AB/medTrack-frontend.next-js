"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);

  const navLinks = [
    { id: "accueil", label: "Accueil", href: "/" },
    { id: "espace-etudiant", label: "Espace Étudiant", href: "/espace-etudiant" },
    { id: "espace-encadrant", label: "Espace Encadrant", href: "/espace-encadrant" },
    { id: "espace-etablissement", label: "Espace Établissement", href: "/espace-etablissement" },
    { id: "tableau-de-bord", label: "Tableau De Bord", href: "/tableau-de-bord" },
    { id: "a-propos", label: "À Propos", href: "/a-propos" },
    { id: "contact", label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  return (
    <nav className="bg-white shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20 justify-between">

          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/img/logo.png" alt="MedTrack Logo" className="h-35 w-35" />
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${
                    isActive(link.href)
                      ? "bg-teal-500 text-white"
                      : "text-gray-700 hover:text-teal-500 hover:bg-teal-50"
                  }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          <button 
            onClick={() => setOpen(!open)} 
            className="md:hidden p-2 rounded-md text-gray-700 hover:text-teal-500 hover:bg-teal-50"
          >
            <svg className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
            </svg>
          </button>
        </div>
      </div>

      <div className={`md:hidden ${open ? "block" : "hidden"} border-t border-gray-200`}>
        <div className="px-2 pt-2 pb-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${
                isActive(link.href)
                  ? "bg-teal-500 text-white"
                  : "text-gray-700 hover:text-teal-500 hover:bg-teal-50"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
