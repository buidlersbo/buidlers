// components/EventList.tsx
'use client';

import { supabase } from '@/utils/supabaseClient';

interface Event {
  id: string;
  title: string;
  event_date: string;
  cover_image_url: string;
  capacity: number;
  sponsors: string[];
  created_at: string;
}

export default function EventList({ events }: { events: Event[] }) {
  const handleDelete = async (id: string) => {
    if (!confirm('Are you sure you want to delete this event?')) {
      return;
    }
//In Supabase, the project is called “Buidlers” and the table is called “Events.”
    const { error } = await supabase
      .from('Events')
      .delete()
      .eq('id', id);

    if (error) {
      //console.error('Error deleting the event:', error);
      alert('Error deleting the event:');
    } else {
      alert('Event successfully deleted.');
      window.location.reload();
    }
  };
// time zone setting for the event
  const formatEventDate = (dateString: string) => {
    const date = new Date(dateString);
    const year = date.getUTCFullYear();
    const month = String(date.getUTCMonth() + 1).padStart(2, '0');
    const day = String(date.getUTCDate()).padStart(2, '0');
    const hours = String(date.getUTCHours()).padStart(2, '0');
    const minutes = String(date.getUTCMinutes()).padStart(2, '0');
    return `${year}-${month}-${day} ${hours}:${minutes} (UTC)`;
  };
// time zone setting for event creation
  const formatCreationDate = (dateString: string) => {
    const date = new Date(dateString);
    const options: Intl.DateTimeFormatOptions = {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
      hour12: false,
      timeZone: 'America/La_Paz',
    };
    return new Intl.DateTimeFormat('en-CA', options).format(date);
  };

  return (
    <div className="container mx-auto p-4 text-white">
      <h2 className="text-2xl font-bold mb-6 text-center">List of Events</h2>
      <div className="overflow-x-auto bg-gray-800 rounded-lg shadow-md">
        <table className="min-w-full">
          {/* table header */}
          <thead className="bg-gray-700">
            <tr>
              <th className="py-3 px-4 text-left font-semibold">ID</th>
              <th className="py-3 px-4 text-left font-semibold">Title</th>
              <th className="py-3 px-4 text-left font-semibold">Date</th>
              <th className="py-3 px-4 text-left font-semibold">Image</th>
              <th className="py-3 px-4 text-left font-semibold">Capacity</th>
              <th className="py-3 px-4 text-left font-semibold">Sponsors</th>
              <th className="py-3 px-4 text-left font-semibold">Creation</th>
              <th className="py-3 px-4 text-left font-semibold">Actions</th>
            </tr>
          </thead>
          {/* Dynamic Table */}
          <tbody className="divide-y divide-gray-700">
            {events.map((event) => (
              <tr key={event.id} className="hover:bg-gray-700 transition duration-150 ease-in-out">
                <td className="py-3 px-4 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">{event.id}</td>
                <td className="py-3 px-4">{event.title}</td>
                <td className="py-3 px-4">{formatEventDate(event.event_date)}</td>
                <td className="py-3 px-4 max-w-[200px] whitespace-nowrap overflow-hidden text-ellipsis">
                  {event.cover_image_url}
                </td>
                <td className="py-3 px-4">{event.capacity}</td>
                <td className="py-3 px-4">{Array.isArray(event.sponsors) ? event.sponsors.join(', ') : event.sponsors}</td>
                <td className="py-3 px-4">{formatCreationDate(event.created_at)}</td>
                <td className="py-3 px-4">
                  <button
                    onClick={() => handleDelete(event.id)}
                    className="bg-red-500 hover:bg-red-700 text-white font-bold py-1 px-3 rounded-md text-sm transition-colors duration-200"
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}