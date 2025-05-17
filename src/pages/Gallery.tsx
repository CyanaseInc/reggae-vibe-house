
import React from 'react';
import Navbar from '@/components/Navbar';
import Footer from '@/components/Footer';
import { GalleryHorizontal, Image as ImageIcon } from 'lucide-react';

const galleryImages = [
  { id: 1, src: '/music.jpg', alt: 'Live reggae performance on stage', category: 'Events' },
  { id: 2, src: '/dj3.jpg', alt: 'DJ set at House of Reggae event', category: 'DJs' },
  { id: 3, src: '/talent.jpg', alt: 'Crowd enjoying a reggae festival', category: 'Events' },
  { id: 4, src: '/dj2.jpg', alt: 'Traditional Nyabinghi drums performance', category: 'Culture' },
  { id: 5, src: '/a_3.png', alt: 'Reggae artist performing on stage', category: 'Artists' },
  { id: 6, src: '/bg_1.png', alt: 'Dancers moving to reggae rhythms', category: 'Culture' },
  { id: 7, src: '/music.jpg', alt: 'Reggae-inspired artwork and paintings', category: 'Art' },
  { id: 8, src: '/cultural.jpg', alt: 'House of Reggae merchandise display', category: 'Merchandise' },
  { id: 9, src: '/v.png', alt: 'Beach reggae festival in Jinja', category: 'Events' },
];

const Gallery = () => {
  const [activeFilter, setActiveFilter] = React.useState('All');
  const categories = ['All', 'Events', 'DJs', 'Artists', 'Culture', 'Art', 'Merchandise'];

  const filteredImages = activeFilter === 'All'
    ? galleryImages
    : galleryImages.filter(img => img.category === activeFilter);

  return (
    <>
      <Navbar />
      <main className="pt-24 pb-16 min-h-screen">
        <div className="container mx-auto px-4">
          <h1 className="section-title text-center">Gallery</h1>
          <div className="relative mb-6 flex justify-center">
            <div className="h-1 w-16 bg-reggae-gold"></div>
          </div>
          <p className="text-center text-xl mb-8">Experience the vibrant moments from House of Reggae events, artists, and culture.</p>

          {/* Category Filters */}
          <div className="flex flex-wrap justify-center gap-2 mb-10">
            {categories.map(category => (
              <button
                key={category}
                className={`px-4 py-2 rounded-full transition-all ${activeFilter === category
                  ? 'bg-reggae-gold text-reggae-black font-bold'
                  : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                  }`}
                onClick={() => setActiveFilter(category)}
              >
                {category}
              </button>
            ))}
          </div>

          {/* Gallery Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredImages.map((image) => (
              <div key={image.id} className="group relative overflow-hidden rounded-lg shadow-md">
                <img
                  src={image.src}
                  alt={image.alt}
                  className="w-full aspect-square object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <button className="bg-reggae-gold text-reggae-black rounded-full p-3">
                    <ImageIcon size={24} />
                  </button>
                </div>
                <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent p-4">
                  <span className="inline-block bg-reggae-gold text-reggae-black text-xs font-bold px-2 py-1 rounded">
                    {image.category}
                  </span>
                </div>
              </div>
            ))}
          </div>

          {/* Video Section */}
          <div className="mt-16">
            <h2 className="text-3xl font-heading mb-6 text-center">Featured Videos</h2>
            <div className="relative mb-6 flex justify-center">
              <div className="h-1 w-16 bg-reggae-gold"></div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-8">
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-80 rounded-lg"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="Reggae Festival Highlights"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
              <div className="aspect-w-16 aspect-h-9">
                <iframe
                  className="w-full h-80 rounded-lg"
                  src="https://www.youtube.com/embed/dQw4w9WgXcQ"
                  title="DJ Zion Live Set"
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default Gallery;
