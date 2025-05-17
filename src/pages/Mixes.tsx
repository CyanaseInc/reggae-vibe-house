// src/pages/Mixes.tsx
import React, { useState, useEffect } from 'react';
import { Headphones, Music, Play, Volume, Clock, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const USERNAME = "house-of-reggae-637215843";
const CLIENT_ID = "CcuNTbKkAMIPLedGcyTw430ppDRwSZ3n"; // Replace with your SoundCloud Client ID
const CLIENT_SECRET = "P3EBzF7Bw8CuSTqG0zw4pIdJaMTbbEn2"; // Replace with your SoundCloud Client Secret

const categories = ['All', 'Ugandan Reggae', 'Roots', 'Dub', 'Lovers Rock', 'Dancehall'];

const Mixes = () => {
  const [activeCategory, setActiveCategory] = useState('All');
  const [activeIndex, setActiveIndex] = useState(null);
  const [tracks, setTracks] = useState([]);
  const [accessToken, setAccessToken] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch token from SoundCloud API
  useEffect(() => {
    const fetchToken = async () => {
      // Check cached token
      const cachedToken = localStorage.getItem('soundcloud_access_token');
      const cachedExpiry = localStorage.getItem('soundcloud_token_expiry');
      const now = Date.now();

      if (cachedToken && cachedExpiry && now < parseInt(cachedExpiry)) {
        setAccessToken(cachedToken);
        setIsLoading(false);
        return;
      }

      try {
        const credentials = btoa(`${CLIENT_ID}:${CLIENT_SECRET}`);
        const response = await fetch("https://secure.soundcloud.com/oauth/token", {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            Authorization: `Basic ${credentials}`,
            Accept: "application/json; charset=utf-8",
          },
          body: new URLSearchParams({
            grant_type: "client_credentials",
          }),
        });
        const data = await response.json();

        if (data.access_token) {
          setAccessToken(data.access_token);
          localStorage.setItem("soundcloud_access_token", data.access_token);
          localStorage.setItem(
            "soundcloud_token_expiry",
            (now + data.expires_in * 1000).toString()
          );
          setIsLoading(false);
        } else {
          throw new Error("No access token in response");
        }
      } catch (error) {
        console.error("Error fetching token:", error.message);
        setIsLoading(false);
      }
    };

    fetchToken();
  }, []);

  // Resolve SoundCloud user ID
  const resolveUserId = async (username, token) => {
    try {
      const response = await fetch(
        `https://api.soundcloud.com/resolve?url=https://soundcloud.com/${username}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json; charset=utf-8",
          },
        }
      );
      const data = await response.json();
      console.log("Resolved User ID:", data.id);
      return data.id;
    } catch (error) {
      console.error("Error resolving user ID:", error);
      return null;
    }
  };

  // Fetch tracks from SoundCloud
  const fetchTracks = async (userId, token) => {
    try {
      const response = await fetch(
        `https://api.soundcloud.com/users/${userId}/tracks?limit=50`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json; charset=utf-8",
          },
        }
      );
      const data = await response.json();
      console.log("Fetched Tracks:", data);
      const mappedTracks = data.map((track, index) => ({
        id: track.id,
        title: track.title,
        dj: track.user.username,
        genre: track.genre || categories[(index % (categories.length - 1)) + 1] || 'Reggae',
        date: new Date(track.created_at).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
        duration: `${Math.floor(track.duration / 1000 / 60)}:${Math.floor((track.duration / 1000) % 60)
          .toString()
          .padStart(2, '0')}`,
        likes: track.favoritings_count || Math.floor(Math.random() * 500),
        popular: index < 2,
        embedUrl: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${track.id}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`,
        imageUrl: track.artwork_url?.replace('-large', '-t500x500') || '/reggae-artwork.jpg',
        description: track.description || 'A vibrant reggae mix showcasing top tracks and artists.',
      }));
      setTracks(mappedTracks);
    } catch (error) {
      console.error("Error fetching tracks:", error);
    }
  };

  // Fetch tracks when token is available
  useEffect(() => {
    const fetchData = async () => {
      if (accessToken) {
        const userId = await resolveUserId(USERNAME, accessToken);
        if (userId) {
          fetchTracks(userId, accessToken);
        }
      }
    };

    fetchData();
  }, [accessToken]);

  const filteredMixes = activeCategory === 'All'
    ? tracks
    : tracks.filter((mix) => mix.genre === activeCategory);

  const popularMixes = tracks.filter((mix) => mix.popular);

  const handlePlay = (index) => {
    if (activeIndex === index) {
      setActiveIndex(null); // Pause if clicking the same mix
    } else {
      setActiveIndex(index); // Play new mix
    }
  };

  const getIframeSrc = (mix, index) => {
    const baseUrl = mix.embedUrl;
    return activeIndex === index ? baseUrl.replace('auto_play=false', 'auto_play=true') : baseUrl;
  };

  return (
    <>
      <Navbar />
      <main className="min-h-screen bg-[url('/wood-texture.jpg')] bg-fixed bg-cover">
        <div className="bg-reggae-black bg-opacity-95 min-h-screen pb-16">
          <div className="bg-[url('/reggae-concert1.jpg')] bg-cover bg-center py-20 pt-32 relative">
            <div className="absolute inset-0 bg-gradient-to-b from-reggae-black/80 to-reggae-black/95"></div>
            <div className="container mx-auto px-4 text-center relative z-10">
              <div className="inline-block mb-4 p-3 rounded-full bg-reggae-green bg-opacity-20">
                <Headphones size={40} className="text-white" />
              </div>
              <h1 className="font-music text-5xl md:text-6xl mb-6 text-white">REGGAE MIXES</h1>
              <p className="text-xl max-w-3xl mx-auto text-white opacity-80">
                Dive into our collection of exclusive reggae mixes from Uganda's finest selectors and international guest DJs.
              </p>
            </div>
          </div>

          {popularMixes.length > 0 && (
            <section className="py-8 bg-gradient-to-b from-reggae-black to-transparent">
              <div className="container mx-auto px-4">
                <h2 className="font-heading text-3xl text-white mb-6">Featured Mix</h2>
                <div className="flex flex-col md:flex-row bg-gradient-to-r from-reggae-black to-reggae-black/70 rounded-xl overflow-hidden">
                  <div className="md:w-1/3 h-80 relative group cursor-pointer" onClick={() => handlePlay(0)}>
                    <img
                      src={popularMixes[0].imageUrl}
                      alt={popularMixes[0].title}
                      className="w-full h-full object-cover"
                    />
                    <div className="absolute inset-0 bg-black bg-opacity-40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                      <div className="w-16 h-16 rounded-full bg-reggae-gold flex items-center justify-center">
                        <Play size={32} className="text-reggae-black ml-1" />
                      </div>
                    </div>
                    {activeIndex === 0 && (
                      <div className="absolute bottom-4 right-4 animate-pulse">
                        <Volume size={24} className="text-white" />
                      </div>
                    )}
                  </div>
                  <div className="p-8 md:w-2/3 flex flex-col justify-center">
                    <div className="inline-block px-3 py-1 bg-reggae-red text-white text-sm rounded mb-3">
                      FEATURED
                    </div>
                    <h3 className="font-heading text-4xl text-white mb-3">{popularMixes[0].title}</h3>
                    <p className="text-white/80 text-lg mb-3">
                      By {popularMixes[0].dj} • {popularMixes[0].genre}
                    </p>
                    <p className="text-white/60 mb-6 max-w-2xl">{popularMixes[0].description}</p>
                    <div className="flex items-center gap-6">
                      <button
                        className="bg-reggae-gold text-reggae-black px-6 py-2 rounded-full flex items-center gap-2 hover:bg-opacity-90 transition"
                        onClick={() => handlePlay(0)}
                      >
                        <Play size={18} />
                        <span className="font-bold">Play Mix</span>
                      </button>
                      <div className="flex items-center text-white/70">
                        <Clock size={18} className="mr-2" />
                        {popularMixes[0].duration}
                      </div>
                      <div className="flex items-center text-white/70">
                        <Heart size={18} className="mr-2" />
                        {popularMixes[0].likes} likes
                      </div>
                    </div>
                    <div className="mt-4">
                      <iframe
                        width="100%"
                        height="166"
                        scrolling="no"
                        frameBorder="no"
                        allow="autoplay"
                        src={getIframeSrc(popularMixes[0], 0)}
                        title={popularMixes[0].title}
                      ></iframe>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}

          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="flex flex-wrap justify-center gap-3 mb-6">
                {categories.map((category) => (
                  <button
                    key={category}
                    className={`px-5 py-2 rounded-full transition-all ${activeCategory === category
                        ? 'bg-reggae-gold text-reggae-black font-bold shadow-md'
                        : 'bg-white/10 text-white hover:bg-white/20'
                      }`}
                    onClick={() => setActiveCategory(category)}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </section>

          <section className="py-8">
            <div className="container mx-auto px-4">
              <div className="bg-white/5 rounded-lg p-4 mb-12">
                <h2 className="font-heading text-2xl text-white mb-6">All Mixes</h2>
                {isLoading ? (
                  <p className="text-center text-white/60">Loading mixes...</p>
                ) : filteredMixes.length > 0 ? (
                  <table className="w-full table-auto">
                    <thead className="border-b border-white/10">
                      <tr>
                        <th className="text-left py-4 text-white/60 font-normal">#</th>
                        <th className="text-left py-4 text-white/60 font-normal">TITLE</th>
                        <th className="text-left py-4 text-white/60 font-normal hidden md:table-cell">DJ</th>
                        <th className="text-left py-4 text-white/60 font-normal hidden md:table-cell">GENRE</th>
                        <th className="text-left py-4 text-white/60 font-normal hidden lg:table-cell">DATE</th>
                        <th className="text-right py-4 text-white/60 font-normal">
                          <Clock size={18} />
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {filteredMixes.map((mix, index) => (
                        <tr
                          key={mix.id}
                          className={`border-b border-white/5 hover:bg-white/10 group transition-colors ${activeIndex === index ? 'bg-white/10' : ''
                            }`}
                        >
                          <td className="py-4 text-white/60 text-left">
                            <div className="relative">
                              <span className="group-hover:hidden">{index + 1}</span>
                              <button
                                className="hidden group-hover:block absolute top-1/2 -translate-y-1/2"
                                onClick={() => handlePlay(index)}
                              >
                                {activeIndex === index ? (
                                  <Volume size={18} className="text-reggae-gold" />
                                ) : (
                                  <Play size={18} className="text-white" />
                                )}
                              </button>
                            </div>
                          </td>
                          <td className="py-4">
                            <div className="flex items-center">
                              <div className="w-10 h-10 rounded mr-3 overflow-hidden hidden sm:block">
                                <img
                                  src={mix.imageUrl}
                                  alt={mix.title}
                                  className="w-full h-full object-cover"
                                />
                              </div>
                              <div>
                                <h4 className="font-medium text-white">{mix.title}</h4>
                                <p className="text-white/60 text-sm md:hidden">{mix.dj}</p>
                              </div>
                            </div>
                            {activeIndex === index && (
                              <div className="mt-2">
                                <iframe
                                  width="100%"
                                  height="100"
                                  scrolling="no"
                                  frameBorder="no"
                                  allow="autoplay"
                                  src={getIframeSrc(mix, index)}
                                  title={mix.title}
                                ></iframe>
                              </div>
                            )}
                          </td>
                          <td className="py-4 text-white/60 hidden md:table-cell">{mix.dj}</td>
                          <td className="py-4 text-white/60 hidden md:table-cell">{mix.genre}</td>
                          <td className="py-4 text-white/60 hidden lg:table-cell">{mix.date}</td>
                          <td className="py-4 text-white/60 text-right">{mix.duration}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                ) : (
                  <p className="text-center text-white/60">No mixes available.</p>
                )}
              </div>
            </div>
          </section>

          <section className="py-16 bg-[url('/reggae-artwork.jpg')] bg-cover bg-center relative">
            <div className="absolute inset-0 bg-gradient-to-r from-reggae-black to-reggae-black/70"></div>
            <div className="container mx-auto px-4 text-center relative z-10">
              <h2 className="font-heading text-3xl mb-6 text-white">WANT TO CONTRIBUTE A MIX?</h2>
              <p className="text-lg mb-8 max-w-2xl mx-auto text-white/80">
                Are you a DJ with a passion for reggae music? Submit your mix to be featured on our platform.
              </p>
              <button className="bg-reggae-green text-white font-bold py-3 px-8 rounded-md hover:bg-opacity-90 transition duration-200 inline-flex items-center">
                <Music size={20} className="mr-2" />
                Submit Your Mix
              </button>
            </div>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Mixes;