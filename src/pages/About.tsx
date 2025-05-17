import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { Users, Music, Calendar, Heart } from 'lucide-react';

const About = () => {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="section-title text-center">About House of Reggae</h1>
          <div className="relative mb-10 flex justify-center">
            <div className="h-1 w-16 bg-reggae-gold"></div>
          </div>

          {/* Mission Statement */}
          <div className="max-w-3xl mx-auto text-center mb-16">
            <p className="text-xl leading-relaxed">
              House of Reggae (HoR) is a dynamic Ugandan platform dedicated to nurturing and promoting reggae talent. Born out of Ras Clan Entertainment in 2003, HoR has evolved into a vibrant collective that unites artists, DJs, MCs, and cultural ambassadors who share a passion for reggae music and its rich cultural heritage.
            </p>
          </div>

          {/* History Section */}
          <div className="mb-16 bg-reggae-light p-8 rounded-xl">
            <h2 className="text-3xl font-heading mb-6">Our Story</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <p className="mb-4">
                  House of Reggae emerged from the vision of Ras Clan Entertainment in 2003, starting as a passionate initiative to celebrate and elevate reggae music in Uganda. What began as a small collective of reggae enthusiasts has grown into a cultural movement that amplifies the voices of creatives in the reggae world.
                </p>
                <p>
                  Today, HoR is a community-driven platform that curates opportunities for both emerging and established talent, hosting electrifying performances, cultural festivals, and sharing exclusive mixes and archival sets on streaming platforms. We are committed to keeping reggae alive and evolving, both locally and globally.
                </p>
              </div>
              <div className="relative">
                <img
                  src="/comm.jpg"
                  alt="House of Reggae cultural event"
                  className="rounded-lg shadow-lg w-full h-full object-cover"
                />
              </div>
            </div>
          </div>

          {/* What We Do */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading mb-10 text-center">What We Do</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              <ServiceCard
                icon={<Music size={40} />}
                title="Talent Development"
                description="We support artists in developing their craft, expanding their portfolios, and connecting with audiences worldwide."
              />
              <ServiceCard
                icon={<Calendar size={40} />}
                title="Events & Festivals"
                description="Hosting electrifying performances and cultural festivals to celebrate reggae’s transformative power."
              />
              <ServiceCard
                icon={<Users size={40} />}
                title="Community Building"
                description="Creating a vibrant collective of artists, DJs, MCs, and cultural ambassadors united by reggae."
              />
              <ServiceCard
                icon={<Heart size={40} />}
                title="Cultural Preservation"
                description="Preserving reggae’s roots while embracing its evolution through exclusive mixes and archival sets."
              />
            </div>
          </div>

          {/* Team Section */}
          <div className="mb-16">
            <h2 className="text-3xl font-heading mb-10 text-center">Meet Our Team</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              <TeamMember
                name="Marcus Garvey Jr."
                role="Founder & Creative Director"
                image="/reggae-team1.jpg"
              />
              <TeamMember
                name="DJ Zion"
                role="Head of Music"
                image="/reggae-team2.jpg"
              />
              <TeamMember
                name="Sarah Roots"
                role="Events Manager"
                image="/reggae-team3.jpg"
              />

            </div>
          </div>

          {/* Testimonials */}
          <div className="mb-16 bg-reggae-green text-white p-8 rounded-xl">
            <h2 className="text-3xl font-heading mb-10 text-center">What People Say</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <Testimonial
                quote="House of Reggae has completely transformed Uganda's music scene. Their events are unlike anything else in East Africa."
                author="The Kampala Times"
              />
              <Testimonial
                quote="The authenticity and passion behind this movement is what makes it special. It's not just about music, it's about a way of life."
                author="International Reggae Magazine"
              />
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

const ServiceCard = ({ icon, title, description }) => (
  <div className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow">
    <div className="text-reggae-red mb-4">
      {icon}
    </div>
    <h3 className="text-xl font-heading mb-2">{title}</h3>
    <p className="text-gray-600">{description}</p>
  </div>
);

const TeamMember = ({ name, role, image }) => (
  <div className="bg-white rounded-lg overflow-hidden shadow-md group">
    <div className="h-64 overflow-hidden">
      <img
        src={image}
        alt={name}
        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
      />
    </div>
    <div className="p-4">
      <h3 className="font-heading text-xl">{name}</h3>
      <p className="text-reggae-red">{role}</p>
    </div>
  </div>
);

const Testimonial = ({ quote, author }) => (
  <div className="bg-white bg-opacity-10 p-6 rounded-lg">
    <p className="text-lg italic mb-4">{quote}</p>
    <p className="font-bold text-reggae-gold">— {author}</p>
  </div>
);

export default About;