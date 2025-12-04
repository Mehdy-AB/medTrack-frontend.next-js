"use client";
import Navbar from './Components/Navbar';
import Hero from './Components/Hero';
import Features from './Components/Featurs';
import Testimonials from './Components/Testimonials';
import CallToAction from './Components/CallToAction';
import Footer from './Components/Footer';
export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <Features />
        <Testimonials />
        <CallToAction />
      </main>
      <Footer/> 
    </>
  );
} 