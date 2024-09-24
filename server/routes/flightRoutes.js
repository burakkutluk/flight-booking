const express = require("express");
const router = express.Router();
const axios = require("axios");

const SCHIPHOL_API_BASE_URL = "https://api.schiphol.nl/public-flights/flights";

router.get("/search", async (req, res) => {
  try {
    const { from, to, departDate, returnDate } = req.query;

    // Schiphol API request with headers and parameters
    const response = await axios.get(SCHIPHOL_API_BASE_URL, {
      headers: {
        resourceversion: "v4",
        app_id: process.env.SCHIPHOL_APP_ID,
        app_key: process.env.SCHIPHOL_APP_KEY,
      },
      params: {
        flightDirection: "D",
        scheduleDate: departDate,
        route: [from, to],
      },
    });

    // Process flights data, handling missing departureDateTime and userId
    const flights = response.data.flights.map((flight) => {
      const departureDateTime = flight.scheduleDateTime || new Date().toISOString();
      const arrivalDateTime = flight.actualLandingTime || new Date().toISOString();
      const userId = req.user?.id || null;

      return {
        userId,
        flightId: flight.id,
        airline: flight.prefixICAO || flight.prefixIATA || "Unknown",
        flightNumber: flight.flightName,
        departureTime: departureDateTime,
        arrivalTime: arrivalDateTime,
        origin: flight.route.destinations[0],
        destination: flight.route.destinations[1],
        price: Math.floor(Math.random() * (500 - 100 + 1) + 100), // Mock price
      };
    });

    res.json(flights);
  } catch (error) {
    console.error("Error fetching flights:", error);
    let errorMessage = "Error fetching flights";
    if (error.response) {
      errorMessage = error.response.data.message || errorMessage;
    }
    res.status(500).json({ message: errorMessage });
  }
});

module.exports = router;