
import React from 'react';
import { Mail, Instagram, Globe, Music } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const team = [
  {
    id: 1,
    name: 'Moses Kironde',
    role: 'Founder & Chief Selector',
    bio: 'With over 15 years in Uganda\'s reggae scene, Moses founded House of Reggae to promote and preserve authentic reggae culture in East Africa.',
    imageUrl: '/reggae-team1.jpg',
    social: {
      email: 'moses@houseofreggae.com',
      instagram: '@djmoses',
      website: 'djmoses.com'
    }
  },
  {
    id: 2,
    name: 'Faith Namubiru',
    role: 'Events Director',
    bio: 'Faith organizes our legendary events and builds relationships with venues across Uganda. Her passion for bringing people together through music is unmatched.',
    imageUrl: '/reggae-team2.jpg',
    social: {
      email: 'faith@houseofreggae.com',
      instagram: '@faithreggae'
    }
  },
  {
    id: 3,
    name: 'Daniel Okello',
    role: 'Head Sound Engineer',
    bio: 'Daniel ensures our sound systems deliver the perfect reggae experience. His technical expertise and ear for quality are legendary in Uganda\'s music scene.',
    imageUrl: '/reggae-team3.jpg',
    social: {
      email: 'daniel@houseofreggae.com',
      instagram: '@soundmanokello'
    }
  },
  {
    id: 4,
    name: 'Sarah Achieng',
    role: 'Cultural Director',
    bio: 'Sarah focuses on the educational aspects of our mission, organizing workshops, exhibitions, and talks about reggae history and Rastafarian culture.',
    imageUrl: '/reggae-team4.jpg',
    social: {
      email: 'sarah@houseofreggae.com',
      instagram: '@sarahroots',
      website: 'sarahachieng.com'
    }
  },
  {
    id: 5,
    name: 'Joshua Mugisha',
    role: 'DJ & Music Curator',
    bio: 'Joshua has an encyclopedic knowledge of reggae music from around the world. He curates our mixes and special listening sessions with rare vinyl selections.',
    imageUrl: '/reggae-team5.jpg',
    social: {
      email: 'joshua@houseofreggae.com',
      instagram: '@joshuaselecta'
    }
  },
  {
    id: 6,
    name: 'Esther Nakato',
    role: 'Community Outreach',
    bio: 'Esther connects House of Reggae with local communities, organizing youth programs and ensuring our work has a positive social impact across Uganda.',
    imageUrl: '/reggae-team6.jpg',
    social: {
      email: 'esther@houseofreggae.com',
      instagram: '@esthernakato'
    }
  }
];

const Team = () => {
  return (
    <>
      <Navbar />

      <main className="min-h-screen bg-[url('/wood-texture.jpg')] bg-fixed bg-cover">
        <div className="bg-reggae-black bg-opacity-95 min-h-screen">
          {/* Hero Banner */}
          <div className="bg-[url('/reggae-crowd.jpg')] bg-cover bg-center py-16 pt-32 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-reggae-black/70 to-reggae-black/90"></div>
            <div className="container mx-auto px-4 text-center relative z-10">
              <h1 className="font-music text-5xl md:text-6xl mb-6 text-white">MEET THE TEAM</h1>
              <p className="text-xl max-w-3xl mx-auto text-white opacity-80">
                The passionate people behind House of Reggae, dedicated to promoting reggae culture in Uganda
              </p>
            </div>
          </div>

          {/* Our Mission */}
          <section className="py-16 bg-gradient-to-b from-reggae-black/90 to-transparent">
            <div className="container mx-auto px-4 text-center">
              <h2 className="font-heading text-3xl md:text-4xl text-white mb-8">OUR MISSION</h2>
              <p className="text-xl max-w-3xl mx-auto mb-10 text-white/80">
                Our mission is to support and amplify the voices of creatives in the reggae world. We curate opportunities for emerging and established talent to shine by helping them develop their craft, expand their portfolios, and connect with audiences both locally and globally.
              </p>

              <div className="flex justify-center">
                <div className="h-1 w-32 reggae-gradient"></div>
              </div>
            </div>
          </section>

          {/* Team Grid */}
          <section className="py-16">
            <div className="container mx-auto px-4">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {team.map(member => (
                  <TeamMember key={member.id} member={member} />
                ))}
              </div>
            </div>
          </section>

          {/* Join Us Section */}
          <section className="py-16 bg-[url('/reggae-concert1.jpg')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-reggae-black to-reggae-black/70"></div>
            <div className="container mx-auto px-4 text-center relative z-10">
              <h2 className="font-heading text-3xl md:text-4xl text-white mb-6">JOIN OUR TEAM</h2>
              <p className="text-lg max-w-2xl mx-auto mb-8 text-white/80">
                Passionate about reggae music and culture? We're always looking for volunteers and contributors
                to help us grow the reggae community in Uganda.
              </p>
              <button className="bg-reggae-green text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition duration-200 inline-flex items-center">
                <Music size={20} className="mr-2" />
                Get Involved
              </button>
            </div>
          </section>
        </div>
      </main>

      <Footer />
    </>
  );
};

const TeamMember = ({ member }: { member: any }) => {
  return (
    <div className="bg-white/10 backdrop-blur-sm rounded-xl overflow-hidden hover:transform hover:scale-105 transition duration-300">
      <div className="h-80 overflow-hidden">
        <img
          src={member.imageUrl}
          alt={member.name}
          className="w-full h-full object-cover"
        />
      </div>

      <div className="p-6">
        <h3 className="font-heading text-2xl text-white mb-1">{member.name}</h3>
        <p className="text-reggae-gold mb-4">{member.role}</p>
        <p className="text-white/70 mb-6">{member.bio}</p>

        <div className="pt-4 border-t border-white/10 space-y-2">
          {member.social.email && (
            <div className="flex items-center text-white/60 hover:text-white/90 transition">
              <Mail size={16} className="mr-2" />
              <span>{member.social.email}</span>
            </div>
          )}

          {member.social.instagram && (
            <div className="flex items-center text-white/60 hover:text-white/90 transition">
              <Instagram size={16} className="mr-2" />
              <span>{member.social.instagram}</span>
            </div>
          )}

          {member.social.website && (
            <div className="flex items-center text-white/60 hover:text-white/90 transition">
              <Globe size={16} className="mr-2" />
              <span>{member.social.website}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Team;
