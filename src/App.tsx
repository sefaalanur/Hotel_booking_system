import React, { useEffect, useState } from "react";
import { loadJsonFile } from "./utils/dataLoader";

interface Room {
  roomType: string;
  roomId: string;
}

interface RoomType {
  code: string;
  description: string;
  amenities: string[];
  features: string[];
}

interface Hotel {
  id: string;
  name: string;
  roomTypes: RoomType[];
  rooms: Room[];
}

interface Booking {
  hotelId: string;
  arrival: string;
  departure: string;
  roomType: string;
  roomRate: string;
}

interface AvailabilityDetails {
  totalRooms: number;
  bookedRooms: number;
  availableRooms: number;
}

const App: React.FC = () => {
  const [hotels, setHotels] = useState<Hotel[] | null>(null);
  const [bookings, setBookings] = useState<Booking[] | null>(null);

  const [hotelId, setHotelId] = useState<string>("");
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [roomType, setRoomType] = useState<string>("");

  const [availabilityDetails, setAvailabilityDetails] = useState<AvailabilityDetails | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const hotelsData = await loadJsonFile<Hotel[]>('/hotels.json');
        const bookingsData = await loadJsonFile<Booking[]>('/bookings.json');
        setHotels(hotelsData);
        setBookings(bookingsData);
      } catch (error) {
        console.error("Error loading data:", error);
      }
    };

    fetchData();
  }, []);

  const handleCheckAvailability = () => {
    if (!hotelId || !startDate || !endDate || !roomType) {
      alert("Please fill out all fields.");
      return;
    }

    if (new Date(startDate) > new Date(endDate)) {
      alert("Start date must be before the end date.");
      return;
    }

    const selectedHotel = hotels?.find((hotel) => hotel.id === hotelId);
    if (!selectedHotel) {
      alert("Invalid Hotel ID.");
      return;
    }

    const validRoomTypes = selectedHotel.roomTypes.map((type) => type.code);
    if (!validRoomTypes.includes(roomType)) {
      alert(`Invalid room type. Valid types are: ${validRoomTypes.join(", ")}`);
      return;
    }

    const totalRooms = selectedHotel.rooms.filter(
      (room) => room.roomType === roomType
    ).length;

    const overlappingBookings = bookings?.filter((booking) => {
      const isSameHotel = booking.hotelId === hotelId;
      const isSameRoomType = booking.roomType === roomType;
      const isOverlapping =
        new Date(startDate) < new Date(booking.departure) &&
        new Date(endDate) > new Date(booking.arrival);
      return isSameHotel && isSameRoomType && isOverlapping;
    }) || [];

    const bookedRooms = overlappingBookings.length;
    const availableRooms = totalRooms - bookedRooms;

    setAvailabilityDetails({ totalRooms, bookedRooms, availableRooms });
  };

  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Hotel Availability Checker</h1>

      <div className="mb-6 bg-white p-6 shadow rounded">
        <h2 className="text-xl font-semibold mb-4">Check Availability</h2>

        <label className="block mb-2">Select Hotel:</label>
        <select
          value={hotelId}
          onChange={(e) => setHotelId(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        >
          <option value="">Select a hotel</option>
          {hotels?.map((hotel) => (
            <option key={hotel.id} value={hotel.id}>
              {hotel.name} ({hotel.id})
            </option>
          ))}
        </select>

        <label className="block mb-2">Start Date:</label>
        <input
          type="date"
          value={startDate}
          onChange={(e) => setStartDate(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        <label className="block mb-2">End Date:</label>
        <input
          type="date"
          value={endDate}
          onChange={(e) => setEndDate(e.target.value)}
          className="border p-2 rounded w-full mb-4"
        />

        <label className="block mb-2">Room Type:</label>
        <input
          type="text"
          value={roomType}
          onChange={(e) => setRoomType(e.target.value)}
          className="border p-2 rounded w-full mb-4"
          placeholder="Enter Room Type (e.g., SGL, DBL)"
        />

        <button
          onClick={handleCheckAvailability}
          className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
        >
          Check Availability
        </button>
      </div>

      {availabilityDetails && (
        <div className="mt-6 bg-gray-100 p-6 rounded shadow">
          <h2 className="text-xl font-semibold">Availability Result:</h2>
          <p>Total Rooms: {availabilityDetails.totalRooms}</p>
          <p>Booked Rooms: {availabilityDetails.bookedRooms}</p>
          <p>Available Rooms: {availabilityDetails.availableRooms}</p>
        </div>
      )}
    </div>
  );
};

export default App;
