
import React from 'react';
import { Link } from 'react-router-dom';
import { Calendar } from 'lucide-react';

const events = [
  {
    id: 1,
    title: 'Reggae Sundowner',
    date: 'June 15, 2025',
    time: '4:00 PM - 11:00 PM',
    location: 'Nyege Nyege Beach, Jinja',
    imageUrl: '/e_1.jpg',
  },
  {
    id: 2,
    title: 'Every sunday',
    date: 'July 22-23, 2025',
    time: 'All Day Event',
    location: 'National Theatre, Kampala',
    imageUrl: '/e.jpg',
  },
  {
    id: 3,
    title: 'Caribbean core',
    date: 'August 5, 2025',
    time: '8:00 PM - 3:00 AM',
    location: 'Club Guvnor, Kampala',
    imageUrl: '/e_2.png',
  },
];

const UpcomingEvents = () => {
  return (
    <section className="py-20 bg-white relative">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-start md:space-x-12">
          {/* Left Section - Title */}
          <div className="md:w-1/3 mb-10 md:mb-0 text-center md:text-left">
            <h2 className="section-title">Upcoming Events & Shows</h2>
            <div className="relative mb-6">
              <div className="h-1 w-16 bg-reggae-gold"></div>
            </div>
            <p className="text-lg mb-8">
              Join us at our live events and experience the true essence of reggae culture. From intimate acoustic sessions to large-scale festivals, there's always something happening at House of Reggae.
            </p>
            <Link
              to="/events"
              className="bg-reggae-green text-white font-bold py-3 px-6 rounded-md hover:bg-opacity-90 transition duration-200 inline-flex items-center"
            >
              <Calendar size={20} className="mr-2" />
              View Full Calendar
            </Link>
          </div>

          {/* Right Section - Events */}
          <div className="md:w-2/3 space-y-6">
            {events.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute right-0 top-0 h-full w-16 reggae-gradient opacity-10"></div>
    </section>
  );
};

const EventCard = ({ event }: { event: any }) => {
  return (
    <div className="flex flex-col md:flex-row bg-reggae-light overflow-hidden rounded-xl shadow-md hover:shadow-lg transition duration-300">
      <div className="md:w-1/4">
        <img src={event.imageUrl} alt={event.title} className="w-full h-full object-cover" />
      </div>

      <div className="p-6 md:w-3/4 flex flex-col md:flex-row justify-between">
        <div>
          <h3 className="font-heading text-2xl mb-2 text-reggae-black">{event.title}</h3>
          <p className="text-reggae-red font-medium mb-1">{event.date} • {event.time}</p>
          <p className="text-gray-600">{event.location}</p>
        </div>

        <div className="mt-4 md:mt-0 flex items-center">
          <Link
            to="/events"
            className="border-2 border-reggae-black text-reggae-black font-bold py-2 px-4 rounded-md hover:bg-reggae-black hover:text-white transition duration-200"
          >
            Details
          </Link>
        </div>
      </div>
    </div>
  );
};

export default UpcomingEvents;
