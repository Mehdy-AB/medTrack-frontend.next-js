"use client";
import { useState } from "react";
import { usePathname } from "next/navigation";
import Link from "next/link";
import { useSession, signOut } from "next-auth/react";
import { LogOut, User } from "lucide-react";

const Navbar = () => {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const { data: session, status } = useSession();

  const navLinks = [
    { id: "accueil", label: "Accueil", href: "/" },
    { id: "a-propos", label: "À Propos", href: "/a-propos" },
    { id: "contact", label: "Contact", href: "/contact" },
  ];

  const isActive = (href: string) => {
    if (href === "/") return pathname === "/";
    return pathname === href || pathname.startsWith(`${href}/`);
  };

  const getDashboardLink = () => {
    const role = session?.user?.role;
    switch (role) {
      case 'admin': return '/tableau-de-bord';
      case 'student': return '/espace-etudiant';
      case 'encadrant': return '/espace-encadrant';
      case 'establishment': return '/espace-etablissement';
      default: return '/';
    }
  };

  return (
    <nav className="bg-white shadow-sm sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center h-20 justify-between">

          <div className="flex items-center space-x-8">
            <Link href="/" className="flex items-center space-x-2">
              <img src="/img/logo.png" alt="MedTrack Logo" className="h-20 w-20 object-contain" />
            </Link>

            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link) => (
                <Link
                  key={link.id}
                  href={link.href}
                  className={`px-4 py-2 rounded-full text-sm font-medium transition-all duration-200 ${isActive(link.href)
                      ? "bg-teal-500 text-white"
                      : "text-gray-700 hover:text-teal-500 hover:bg-teal-50"
                    }`}
                >
                  {link.label}
                </Link>
              ))}
            </div>
          </div>

          {/* Desktop Right Side - Auth */}
          <div className="hidden md:flex items-center space-x-4">
            {status === 'authenticated' ? (
              <div className="flex items-center gap-4">
                <Link
                  href={getDashboardLink()}
                  className="flex items-center gap-2 text-gray-700 font-medium hover:text-teal-600 transition"
                >
                  <div className="bg-teal-100 p-2 rounded-full">
                    <User className="w-5 h-5 text-teal-600" />
                  </div>
                  <span>Mon Espace</span>
                </Link>
                <button
                  onClick={() => signOut({ callbackUrl: '/' })}
                  className="flex items-center gap-2 text-red-500 hover:text-red-700 font-medium transition px-4 py-2 rounded-lg border border-red-200 hover:border-red-400"
                >
                  <LogOut className="w-4 h-4" />
                  <span>Déconnexion</span>
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="bg-teal-600 hover:bg-teal-700 text-white px-6 py-2.5 rounded-lg font-medium transition-all shadow-sm hover:shadow"
              >
                Se connecter
              </Link>
            )}
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

      <div className={`md:hidden ${open ? "block" : "hidden"} border-t border-gray-200 bg-white`}>
        <div className="px-4 pt-2 pb-4 space-y-2">
          {navLinks.map((link) => (
            <Link
              key={link.id}
              href={link.href}
              onClick={() => setOpen(false)}
              className={`block px-3 py-2 rounded-md text-base font-medium ${isActive(link.href)
                  ? "bg-teal-500 text-white"
                  : "text-gray-700 hover:text-teal-500 hover:bg-teal-50"
                }`}
            >
              {link.label}
            </Link>
          ))}

          <div className="pt-4 mt-4 border-t border-gray-100">
            {status === 'authenticated' ? (
              <div className="space-y-3">
                <Link
                  href={getDashboardLink()}
                  onClick={() => setOpen(false)}
                  className="flex items-center gap-2 px-3 py-2 text-gray-700 font-medium hover:bg-gray-50 rounded-md"
                >
                  <User className="w-5 h-5 text-teal-600" />
                  Mon Espace
                </Link>
                <button
                  onClick={() => {
                    setOpen(false);
                    signOut({ callbackUrl: '/' });
                  }}
                  className="w-full flex items-center gap-2 px-3 py-2 text-red-500 font-medium hover:bg-red-50 rounded-md"
                >
                  <LogOut className="w-5 h-5" />
                  Déconnexion
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                onClick={() => setOpen(false)}
                className="block w-full text-center bg-teal-600 text-white px-4 py-2 rounded-lg font-medium"
              >
                Se connecter
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
