
import React from 'react';
import { Link } from 'react-router-dom';
import { GalleryHorizontal } from 'lucide-react';

const galleryImages = [
  { id: 1, src: '/v.png', alt: 'Live reggae performance' },
  { id: 2, src: '/a_4.png', alt: 'DJ set at House of Reggae event' },
  { id: 3, src: '/dj_4.png', alt: 'Crowd enjoying reggae music' },
  { id: 4, src: '/contact.png', alt: 'Traditional drummers' },
  { id: 5, src: '/dj.jpg', alt: 'Reggae festival crowd' },
  { id: 6, src: '/dj3.jpg', alt: 'Artist performing on stage' },
];

const PhotoGallery = () => {
  return (
    <section className="py-20 bg-reggae-light">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="section-title">Photo + Video Gallery</h2>
          <div className="relative mb-10">
            <div className="absolute left-1/2 transform -translate-x-1/2 -top-6 w-16 h-1 bg-reggae-gold"></div>
          </div>
          <p className="section-subtitle">
            Relive the moments from our past events, performances, and community gatherings.
          </p>
        </div>

        {/* Gallery Grid */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
          {galleryImages.map((image) => (
            <div key={image.id} className="aspect-square overflow-hidden rounded-lg group">
              <img
                src={image.src}
                alt={image.alt}
                className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
              />
            </div>
          ))}
        </div>

        {/* View Gallery Button */}
        <div className="text-center mt-10">
          <Link
            to="/gallery"
            className="bg-reggae-black text-white font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition duration-200 inline-flex items-center"
          >
            <GalleryHorizontal size={20} className="mr-2" />
            View Full Gallery
          </Link>
        </div>
      </div>
    </section>
  );
};

export default PhotoGallery;
