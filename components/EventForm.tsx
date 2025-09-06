// components/EventForm.tsx
'use client';

import { useState } from 'react';
import { supabase } from '@/utils/supabaseClient';

export default function EventForm() {
  const [title, setTitle] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [coverImageUrl, setCoverImageUrl] = useState('');
  const [capacity, setCapacity] = useState<number | null>(null);
  const [sponsors, setSponsors] = useState('');

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const eventDateTime = `${eventDate}T${eventTime}`;
    const sponsorsArray = sponsors.split(',').map(s => s.trim());
//In Supabase, the project is called “Buidlers” and the table is called “Events.”
    const { data, error } = await supabase
      .from('Events')
      .insert([
        { 
          title, 
          event_date: eventDateTime, 
          cover_image_url: coverImageUrl, 
          capacity,
          sponsors: sponsorsArray 
        }
      ]);

    if (error) {
      console.error('Error creating the event:', error);
      alert('There was an error creating the event.');
    } else {
      //console.log('Event successfully created:', data);
      alert('Event successfully created.');
      setTitle('');
      setEventDate('');
      setEventTime('');
      setCoverImageUrl('');
      setCapacity(null);
      setSponsors('');
      window.location.reload();
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-6 bg-gray-800 rounded-lg shadow-md max-w-lg mx-auto mb-8">
      <h2 className="text-2xl font-bold text-white mb-6 text-center">Create New Event</h2>
      {/* Create table Events */}
      {/* The ID is created automatically in Supabase. */}
      <div className="space-y-4"> 
        {/* title */}
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          placeholder="Title" 
          required 
          className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {/* Date and Time for Event Date*/}
        <div className="flex space-x-4">
          <input 
            type="date" 
            value={eventDate} 
            onChange={(e) => setEventDate(e.target.value)} 
            required 
            className="w-1/2 p-3 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
          <input 
            type="time" 
            value={eventTime} 
            onChange={(e) => setEventTime(e.target.value)} 
            required 
            className="w-1/2 p-3 rounded-md bg-gray-700 text-gray-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        </div>
        {/* URL image */}
        <input 
          type="url" 
          value={coverImageUrl} 
          onChange={(e) => setCoverImageUrl(e.target.value)} 
          placeholder="Image URL" 
          className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {/* Capacity */}
        <input 
          type="number" 
          value={capacity === null ? '' : capacity} 
          onChange={(e) => {
            const value = e.target.value;
            setCapacity(value ? parseInt(value) : null);
          }} 
          placeholder="Capacity" 
          className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
        {/* Sponsors */}
        <input 
          type="text" 
          value={sponsors} 
          onChange={(e) => setSponsors(e.target.value)} 
          placeholder="Sponsors (separated by commas)" 
          className="w-full p-3 rounded-md bg-gray-700 text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
      {/* The event creation is generated in Supabase. */}
      <button 
        type="submit"
        className="mt-6 w-full p-3 bg-purple-600 hover:bg-purple-700 text-white font-bold rounded-md transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-purple-500"
      >
        Create Event
      </button>
    </form>
  );
}