
import React from 'react';
import { Link } from 'react-router-dom';
const Footer = () => {


  const socialIcons = [
    { src: "/instagram.svg", alt: "Instagram", href: "https://www.instagram.com/thehouseofreggae/" },
    { src: "/sound.svg", alt: "SoundCloud", href: "https://soundcloud.com/house-of-reggae-637215843" }, // Restored original SoundCloud
    { src: "/x.svg", alt: "Twitter/X", href: "https://x.com/HouseOFReggaeUG" },
    { src: "/tiktok.svg", alt: "SoundCloud", href: "https://t.co/kYfi4WdTCP" },
    { src: "/mix.svg", alt: "Mixcloud", href: "https://www.mixcloud.com/houseofreggae/" },
    { src: "/tube.svg", alt: "YouTube", href: "https://www.youtube.com/@houseofreggae" },


  ];
  return (
    <footer className="bg-reggae-black text-white pt-16 pb-8">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {/* Logo and Description */}
          <div className="md:col-span-1 lg:col-span-1">
            <h3 className="font-heading text-3xl mb-4"> <img
              className="w-[90px] sm:w-[100px] md:w-[110px] lg:w-[125px] h-auto mb-4"
              src="logo.jpg"
              alt="House of Reggae Logo"
            /></h3>
            <p className="mb-6 text-gray-300 max-w-xs">
              Curating Uganda's Reggae Culture, One Vibe at a Time.
            </p>
            <div className="flex gap-4 flex-wrap">
              {socialIcons.map((icon, iconIndex) => (
                <a
                  key={iconIndex}
                  href={icon.href}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <img
                    className="w-6 h-6 hover:opacity-80 transition-opacity"
                    src={icon.src}
                    alt={icon.alt}
                  />
                </a>
              ))}
            </div>

          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-heading text-xl mb-4 text-reggae-gold">Quick Links</h4>
            <ul className="space-y-2">
              <FooterLink to="/">Home</FooterLink>
              <FooterLink to="/about">About Us</FooterLink>
              <FooterLink to="/gallery">Gallery</FooterLink>
              <FooterLink to="/marketplace">Shop</FooterLink>
              <FooterLink to="/contact">Contact</FooterLink>
            </ul>
          </div>

          {/* Music and Events */}
          <div>
            <h4 className="font-heading text-xl mb-4 text-reggae-gold">Music & Events</h4>
            <ul className="space-y-2">
              <FooterLink to="/mixes">Latest Mixes</FooterLink>
              <FooterLink to="/events">Upcoming Events</FooterLink>
              <FooterLink to="/artists">Featured Artists</FooterLink>
              <FooterLink to="/gallery">Photo Gallery</FooterLink>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-heading text-xl mb-4 text-reggae-gold">Contact Us</h4>
            <p className="mb-2 text-gray-300">Kampala, Uganda</p>
            <p className="mb-2 text-gray-300">info@houseofreggae.com</p>
            <p className="mb-6 text-gray-300">+256 700 123456</p>

            <Link to="/contact" className="bg-reggae-red hover:bg-opacity-90 transition duration-200 text-white py-2 px-4 rounded-md inline-block">
              Send Message
            </Link>
          </div>
        </div>

        <div className="bead-divider mt-12 mb-6">
          <span>⚫</span>
        </div>

        <div className="text-center text-gray-400 text-sm">
          <p>&copy; {new Date().getFullYear()} House of Reggae. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};

const SocialIcon = ({ icon, href }: { icon: React.ReactNode, href: string }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="bg-reggae-black hover:bg-reggae-red transition duration-200 h-10 w-10 flex items-center justify-center rounded-full border border-gray-700"
  >
    {icon}
  </a>
);

const FooterLink = ({ to, children }: { to: string, children: React.ReactNode }) => (
  <li>
    <Link to={to} className="text-gray-300 hover:text-reggae-gold transition duration-200">
      {children}
    </Link>
  </li>
);

export default Footer;
