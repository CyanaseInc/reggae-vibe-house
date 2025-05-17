// src/pages/ArtistProfile.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Headphones, Music, Play, Volume, Clock, Heart } from 'lucide-react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';

const USERNAME = "house-of-reggae-637215843";
const CLIENT_ID = "CcuNTbKkAMIPLedGcyTw430ppDRwSZ3n"; // Replace with your SoundCloud Client ID
const CLIENT_SECRET = "P3EBzF7Bw8CuSTqG0zw4pIdJaMTbbEn2"; // Replace with your SoundCloud Client Secret

const ArtistProfile = () => {
    const [tracks, setTracks] = useState([]);
    const [accessToken, setAccessToken] = useState(null);
    const [isLoading, setIsLoading] = useState(true);
    const [activeIndex, setActiveIndex] = useState(null);

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
                `https://api.soundcloud.com/users/${userId}/tracks?limit=10`,
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
                genre: track.genre || 'Reggae',
                date: new Date(track.created_at).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                }),
                duration: `${Math.floor(track.duration / 1000 / 60)}:${Math.floor((track.duration / 1000) % 60)
                    .toString()
                    .padStart(2, '0')}`,
                likes: track.favoritings_count || Math.floor(Math.random() * 500),
                embedUrl: `https://w.soundcloud.com/player/?url=https%3A//api.soundcloud.com/tracks/${track.id}&color=%23ff5500&auto_play=false&hide_related=false&show_comments=true&show_user=true&show_reposts=false&show_teaser=true`,
                imageUrl: track.artwork_url?.replace('-large', '-t500x500') || '/reggae-artwork.jpg',
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

    const handlePlay = (index) => {
        if (activeIndex === index) {
            setActiveIndex(null); // Pause if clicking the same mix
        } else {
            setActiveIndex(index); // Play new mix
        }
    };

    const getIframeSrc = (track, index) => {
        const baseUrl = track.embedUrl;
        return activeIndex === index ? baseUrl.replace('auto_play=false', 'auto_play=true') : baseUrl;
    };

    return (
        <>
            <Navbar />
            <main className="min-h-screen bg-[url('/wood-texture.jpg')] bg-fixed bg-cover">
                <div className="bg-reggae-black bg-opacity-95 min-h-screen pb-16">
                    {/* Hero Section */}
                    <div className="bg-[url('/dj-zion-hero.jpg')] bg-cover bg-center py-32 relative">
                        <div className="absolute inset-0 bg-gradient-to-b from-reggae-black/80 to-reggae-black/95"></div>
                        <div className="container mx-auto px-4 text-center relative z-10">
                            <div className="inline-block mb-4 p-3 rounded-full bg-reggae-green bg-opacity-20">
                                <Headphones size={40} className="text-white" />
                            </div>
                            <h1 className="font-music text-5xl md:text-6xl mb-4 text-reggae-gold">DJ Zion</h1>
                            <p className="text-2xl max-w-3xl mx-auto text-white opacity-80">
                                Uganda's First Lady of Reggae Decks
                            </p>
                        </div>
                    </div>

                    {/* Bio Section */}
                    <section className="py-16">
                        <div className="container mx-auto px-4">
                            <div className="max-w-4xl mx-auto bg-gray-900 rounded-xl p-8 relative">
                                <div className="bead-divider mb-6">
                                    <span className="text-reggae-gold text-xl">⚫</span>
                                </div>
                                <div className="flex flex-col md:flex-row gap-8 items-center">
                                    <div className="md:w-1/3">
                                        <div className="rounded-full overflow-hidden border-4 border-reggae-gold w-64 h-64 mx-auto">
                                            <img
                                                src="/dj3.jpg"
                                                alt="DJ Zion"
                                                className="w-full h-full object-cover"
                                            />
                                        </div>
                                    </div>
                                    <div className="md:w-2/3 text-white">
                                        <h2 className="text-3xl font-heading text-reggae-gold mb-4">About DJ Zion</h2>
                                        <p className="text-lg leading-relaxed mb-4">
                                            Hailing from Kampala, DJ Zion is a trailblazer in Uganda’s reggae scene, blending classic roots reggae with modern dancehall and dub. For over a decade, she’s spun at festivals like Bayimba and Nyege Nyege, earning her the title "First Lady of Reggae Decks." Her "Rootsman" series, a collection of soulful mixes, has captivated audiences across East Africa.
                                        </p>
                                        <p className="text-lg leading-relaxed">
                                            Inspired by legends like Bob Marley and Sister Nancy, Zion’s sets are a journey through reggae’s rich history, infused with Uganda’s vibrant energy. When she’s not behind the decks, she mentors young DJs, empowering the next generation of Ugandan artists.
                                        </p>
                                    </div>
                                </div>
                                <div className="bead-divider mt-6">
                                    <span className="text-reggae-gold text-xl">⚫</span>
                                </div>
                            </div>
                        </div>
                    </section>

                    {/* Tracks Section */}
                    <section className="py-16 bg-gradient-to-b from-reggae-black to-transparent">
                        <div className="container mx-auto px-4">
                            <h2 className="text-3xl font-heading text-white text-center mb-8">DJ Zion’s Latest Mixes</h2>
                            <div className="bg-white/5 rounded-lg p-6">
                                {isLoading ? (
                                    <p className="text-center text-white/60">Loading mixes...</p>
                                ) : tracks.length > 0 ? (
                                    <table className="w-full table-auto">
                                        <thead className="border-b border-white/10">
                                            <tr>
                                                <th className="text-left py-4 text-white/60 font-normal">#</th>
                                                <th className="text-left py-4 text-white/60 font-normal">TITLE</th>
                                                <th className="text-left py-4 text-white/60 font-normal hidden md:table-cell">GENRE</th>
                                                <th className="text-left py-4 text-white/60 font-normal hidden lg:table-cell">DATE</th>
                                                <th className="text-right py-4 text-white/60 font-normal">
                                                    <Clock size={18} />
                                                </th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {tracks.map((track, index) => (
                                                <tr
                                                    key={track.id}
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
                                                                    src={track.imageUrl}
                                                                    alt={track.title}
                                                                    className="w-full h-full object-cover"
                                                                />
                                                            </div>
                                                            <div>
                                                                <h4 className="font-medium text-white">{track.title}</h4>
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
                                                                    src={getIframeSrc(track, index)}
                                                                    title={track.title}
                                                                ></iframe>
                                                            </div>
                                                        )}
                                                    </td>
                                                    <td className="py-4 text-white/60 hidden md:table-cell">{track.genre}</td>
                                                    <td className="py-4 text-white/60 hidden lg:table-cell">{track.date}</td>
                                                    <td className="py-4 text-white/60 text-right">{track.duration}</td>
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

                    {/* Video Section */}
                    <section className="py-16 bg-[url('/reggae-concert2.jpg')] bg-cover bg-center relative">
                        <div className="absolute inset-0 bg-gradient-to-r from-reggae-black/80 to-reggae-black/80"></div>
                        <div className="container mx-auto px-4 relative z-10">
                            <h2 className="text-3xl font-heading text-white text-center mb-8">Live Performance</h2>
                            <div className="max-w-3xl mx-auto">
                                <div className="aspect-w-16 aspect-h-9">
                                    <iframe
                                        width="100%"
                                        height="100%"
                                        src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                                        title="DJ Zion Live at Nyege Nyege Festival"
                                        frameBorder="0"
                                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                        allowFullScreen
                                        className="rounded-lg"
                                    ></iframe>
                                </div>
                                <p className="text-white/80 text-center mt-4">
                                    Watch DJ Zion’s electrifying set at Nyege Nyege 2024, where she brought the house down with her signature reggae vibes.
                                </p>
                            </div>
                        </div>
                    </section>

                    {/* Call-to-Action Section */}
                    <section className="py-16">
                        <div className="container mx-auto px-4 text-center">
                            <div className="bead-divider mb-6">
                                <span className="text-reggae-gold text-xl">⚫</span>
                            </div>
                            <h2 className="text-3xl font-heading text-white mb-4">Join the Rasta Roadshow</h2>
                            <p className="text-lg max-w-2xl mx-auto text-white/80 mb-8">
                                Catch DJ Zion live every Sunday on the Rasta Roadshow, or submit your own mix to join the reggae revolution!
                            </p>
                            <div className="flex justify-center gap-4">
                                <Link
                                    to="/mixes"
                                    className="bg-reggae-gold text-reggae-black font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition duration-200 inline-flex items-center"
                                >
                                    <Music size={20} className="mr-2" />
                                    Explore More Mixes
                                </Link>
                                <button className="bg-reggae-green text-white font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition duration-200 inline-flex items-center">
                                    <Music size={20} className="mr-2" />
                                    Submit Your Mix
                                </button>
                            </div>
                            <div className="bead-divider mt-6">
                                <span className="text-reggae-gold text-xl">⚫</span>
                            </div>
                        </div>
                    </section>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default ArtistProfile;