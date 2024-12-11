# Hotel Availability Checker

This project is a **Hotel Availability Checker**, built with **Vite**, using **React**, **TypeScript**, and **TailwindCSS**. It allows users to check hotel room availability based on predefined hotel and booking data.

## Features
- Displays hotel and booking data from JSON files.
- Allows users to check room availability for specific hotels, dates, and room types.
- Calculates available rooms dynamically by considering overlapping bookings.

## Technologies Used
- **Vite**: For fast build and development.
- **React**: For creating the user interface.
- **TypeScript**: For type-safe JavaScript development.
- **TailwindCSS**: For styling and responsive design.

## Setup Instructions

### 1. Clone the Repository
```bash
git clone <https://github.com/sefaalanur/Hotel_booking_system>
cd <Hotel_booking_system>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Start the Development Server
```bash
npm run dev
```

Open your browser and navigate to [http://localhost:5173/](http://localhost:5173/) to view the application.

## Project Structure
- **`src/components`**: Contains reusable React components.
- **`src/utils`**: Contains utility functions like `dataLoader` for loading JSON files.
- **`public/`**: Includes static assets like `hotels.json` and `bookings.json`.

## Production Build
To build the project for production:

1. Run the build command:
```bash
npm run build
```

2. Serve the static files in the `dist/` folder using a static server:
```bash
npm install -g serve
serve -s dist
```

3. Access the app at [http://localhost:5173](http://localhost:5173) or the specified port.

## Troubleshooting
- Ensure JSON files are correctly placed in the `public/` directory.
- Verify that the data files follow the correct format as shown above.
