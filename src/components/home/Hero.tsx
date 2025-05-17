
import React from 'react';
import { Link } from 'react-router-dom';
import { Headphones, Calendar, ShoppingCart } from 'lucide-react';

const Hero = () => {
  return (
    <section className="relative min-h-screen flex items-center justify-center bg-[url('/v.png')] bg-cover bg-center">
      <div className="absolute inset-0 bg-gradient-to-b from-reggae-black/70 to-reggae-black/90"></div>

      <div className="container mx-auto px-4 relative z-10 text-center py-20">
        <div className="max-w-4xl mx-auto">
          <div className="mb-6 flex justify-center">
            <span className="inline-block h-2 w-20 bg-reggae-red"></span>
            <span className="inline-block h-2 w-20 bg-reggae-gold mx-2"></span>
            <span className="inline-block h-2 w-20 bg-reggae-green"></span>
          </div>

          <h1 className="hero-title">
            FEEL THE ROOTS.<br />
            <span className="text-reggae-gold">MOVE WITH THE MISSION.</span>
          </h1>

          <p className="text-xl md:text-2xl text-white mb-12 max-w-3xl mx-auto">
            Curating Uganda's Reggae Culture, One Vibe at a Time.
          </p>

          <div className="flex flex-col md:flex-row justify-center items-center space-y-6 md:space-y-0 md:space-x-6">
            <HeroButton
              to="/mixes"
              icon={<Headphones size={24} />}
              bgColor="bg-reggae-red"
              label="Listen to Our Latest Mix"
            />

            <HeroButton
              to="/events"
              icon={<Calendar size={24} />}
              bgColor="bg-reggae-green"
              label="See Upcoming Events"
            />

            <HeroButton
              to="/marketplace"
              icon={<ShoppingCart size={24} />}
              bgColor="bg-reggae-gold"
              label="Shop Merch"
            />
          </div>
        </div>
      </div>

      {/* Decorative elements */}
      <div className="absolute bottom-0 left-0 right-0 h-12 bg-gradient-to-r from-reggae-red via-reggae-gold to-reggae-green opacity-70"></div>
    </section>
  );
};

type HeroButtonProps = {
  to: string;
  icon: React.ReactNode;
  bgColor: string;
  label: string;
};

const HeroButton = ({ to, icon, bgColor, label }: HeroButtonProps) => (
  <Link
    to={to}
    className={`${bgColor} hero-cta group`}
  >
    <span className="group-hover:scale-110 transition-transform duration-300">
      {icon}
    </span>
    <span className="font-bold">{label}</span>
  </Link>
);

export default Hero;
