import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { Music } from 'lucide-react';

const USERNAME = "house-of-reggae-637215843";
const CLIENT_ID = "CcuNTbKkAMIPLedGcyTw430ppDRwSZ3n"; // Replace with your SoundCloud Client ID
const CLIENT_SECRET = "P3EBzF7Bw8CuSTqG0zw4pIdJaMTbbEn2"; // Replace with your SoundCloud Client Secret

interface Track {
  id: number;
  title: string;
  dj: string;
  genre: string;
  date: string;
  embedUrl: string;
  imageUrl: string;
}

const FeaturedMixes = () => {
  const [tracks, setTracks] = useState<Track[]>([]);
  const [accessToken, setAccessToken] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  // Fetch token from SoundCloud API
  useEffect(() => {
    const fetchToken = async () => {
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
        const response = await fetch("https://api.soundcloud.com/oauth2/token", {
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

        if (response.status === 429) {
          const retryAfter = response.headers.get('Retry-After');
          const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : 60000; // default to 60 seconds
          console.warn(`Rate limited. Retrying after ${waitTime / 1000} seconds.`);
          setTimeout(fetchToken, waitTime);
          return;
        }

        const data = await response.json();

        if (data.access_token) {
          setAccessToken(data.access_token);
          localStorage.setItem("soundcloud_access_token", data.access_token);
          const expiresIn = data.expires_in ? data.expires_in : 3600; // default to 1 hour
          localStorage.setItem(
            "soundcloud_token_expiry",
            (now + expiresIn * 1000).toString()
          );
          setIsLoading(false);
        } else {
          throw new Error("No access token in response");
        }
      } catch (error) {
        console.error("Error fetching token:", error);
        setIsLoading(false);
      }
    };

    fetchToken();
  }, []);

  // Resolve SoundCloud user ID
  const resolveUserId = async (username: string, token: string): Promise<number | null> => {
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

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : 60000;
        console.warn(`Rate limited. Retrying after ${waitTime / 1000} seconds.`);
        setTimeout(() => resolveUserId(username, token), waitTime);
        return null;
      }

      const data = await response.json();
      return data.id;
    } catch (error) {
      console.error("Error resolving user ID:", error);
      return null;
    }
  };

  // Fetch tracks from SoundCloud (limit to 4)
  const fetchTracks = async (userId: number, token: string) => {
    try {
      const response = await fetch(
        `https://api.soundcloud.com/users/${userId}/tracks?limit=4`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json; charset=utf-8",
          },
        }
      );

      if (response.status === 429) {
        const retryAfter = response.headers.get('Retry-After');
        const waitTime = retryAfter ? parseInt(retryAfter, 10) * 1000 : 60000;
        console.warn(`Rate limited. Retrying after ${waitTime / 1000} seconds.`);
        setTimeout(() => fetchTracks(userId, token), waitTime);
        return;
      }

      const data = await response.json();
      const mappedTracks: Track[] = data.map((track: any) => ({
        id: track.id,
        title: track.title,
        dj: track.user.username,
        genre: track.genre || 'Reggae',
        date: new Date(track.created_at).toLocaleDateString('en-US', {
          month: 'long',
          day: 'numeric',
          year: 'numeric',
        }),
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

  return (
    <section className="py-12 bg-reggae-black text-white">
      <div className="container mx-auto px-4">
        <div className="text-center mb-8">
          <h2 className="section-title text-white text-3xl font-bold">Featured Mixes</h2>
          <div className="relative mb-6">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-4 w-12 h-1 bg-reggae-gold"></div>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-6">
          {isLoading ? (
            <p className="text-center">Loading mixes...</p>
          ) : tracks.length > 0 ? (
            tracks.map((mix) => <MixCard key={mix.id} mix={mix} />)
          ) : (
            <p className="text-center">No mixes available.</p>
          )}
        </div>

        <div className="text-center mt-8">
          <Link
            to="/mixes"
            className="bg-reggae-gold text-reggae-black font-bold py-2 px-4 rounded-md hover:bg-opacity-90 transition duration-200 inline-flex items-center"
          >
            <Music size={16} className="mr-2" />
            See All Mixes
          </Link>
        </div>
      </div>
    </section>
  );
};

interface MixCardProps {
  mix: Track;
}

const MixCard: React.FC<MixCardProps> = ({ mix }) => {
  return (
    <Link
      to="/mixes"
      className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition duration-300 block w-full sm:w-80"
    >
      <div className="h-40 bg-gray-800 relative">
        <img src={mix.imageUrl} alt={mix.title} className="w-full h-full object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent"></div>
        <div className="absolute bottom-2 left-2">
          <span className="bg-reggae-red text-white text-xs px-2 py-1 rounded">
            {mix.genre}
          </span>
        </div>
      </div>

      <div className="p-3">
        <h3 className="font-heading text-lg text-white mb-1 truncate">{mix.title}</h3>
        <p className="text-gray-400 text-xs mb-2">
          By {mix.dj} • {mix.date}
        </p>

        <div className="h-16">
          <iframe
            width="100%"
            height="100%"
            scrolling="no"
            frameBorder="no"
            src={mix.embedUrl}
            title={mix.title}
          ></iframe>
        </div>
      </div>
    </Link>
  );
};

export default FeaturedMixes;
