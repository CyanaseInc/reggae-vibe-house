
import React from 'react';
import { Link } from 'react-router-dom';

const FeaturedArtist = () => {
  return (
    <section className="py-20 bg-reggae-black relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute -left-32 -top-32 w-96 h-96 rounded-full bg-reggae-red"></div>
        <div className="absolute -right-32 -bottom-32 w-96 h-96 rounded-full bg-reggae-gold"></div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="max-w-4xl mx-auto">
          <div className="bead-divider">
            <span className="text-reggae-gold text-xl">⚫</span>
          </div>

          <div className="bg-gray-900 p-6 md:p-8 lg:p-12 rounded-xl">
            <div className="text-center mb-6">
              <span className="text-reggae-gold font-medium">This Week</span>
              <h2 className="text-3xl md:text-4xl lg:text-5xl text-white font-heading">
                DJ Zion – Uganda's First Lady of Reggae Decks
              </h2>
            </div>

            <div className="flex flex-col md:flex-row gap-8 items-center">
              {/* Artist Image */}
              <div className="md:w-1/3">
                <div className="rounded-full overflow-hidden border-4 border-reggae-gold w-64 h-64 mx-auto">
                  <img
                    src="/dj3.jpg"
                    alt="DJ Zion"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>

              {/* Artist Info */}
              <div className="md:w-2/3 text-white">
                <p className="text-lg mb-6 leading-relaxed">
                  Known for her deep cuts and expert selection of both classic and underground reggae tracks,
                  DJ Zion has been revolutionizing Uganda's music scene for over a decade. Her signature
                  "Rootsman" series has become a staple for reggae enthusiasts across East Africa.
                </p>

                <div className="aspect-w-16 aspect-h-9 mb-6">
                  <iframe
                    width="100%"
                    height="315"
                    src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                    title="DJ Zion Performance"
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="rounded-lg"
                  ></iframe>
                </div>

                <Link
                  to="/profile"
                  className="inline-block bg-reggae-gold text-reggae-black font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition duration-200"
                >
                  Explore Artist Profile
                </Link>
              </div>
            </div>
          </div>

          <div className="bead-divider">
            <span className="text-reggae-gold text-xl">⚫</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default FeaturedArtist;
