# Zeotap_Weather
# Weather Monitoring System  This Weather Monitoring System is a full-stack application built with React for the frontend and Node.js for the backend. It fetches real-time weather data, stores historical data in MongoDB, and provides customizable alert thresholds. The project is Dockerized for easy deployment and scalability. 


# Weather Monitoring System

## Overview

The Weather Monitoring System is a full-stack application designed to fetch, display, and analyze real-time weather data. Built with React for the frontend and Node.js with Express for the backend, this application leverages the OpenWeatherMap API to provide comprehensive weather insights. 

## Features

- Fetch real-time weather data for multiple locations.
- Display current temperature, feels like, and weather conditions.
- Store historical weather data in MongoDB for further analysis.
- Customizable alert thresholds for temperature and weather conditions.
- Alert notifications via popup and email.
- Dockerized for easy deployment and scalability.

## Technologies Used

- **Frontend:** React, Axios, Bootstrap
- **Backend:** Node.js, Express
- **Database:** MongoDB
- **API:** OpenWeatherMap API
- **Docker:** Containerization for easy deployment

## Installation

### Prerequisites

Make sure you have the following installed:

- [Node.js](https://nodejs.org/) (version 14 or higher)
- [MongoDB](https://www.mongodb.com/)
- [Docker](https://www.docker.com/)

### Steps to Run the Application

1. **Clone the repository:**

   ```bash
   git clone https://github.com/yourusername/weather-monitoring-system.git
   cd weather-monitoring-system
2. Install the dependencies:
   bash
    Copy code
    cd client
    npm install
    cd ../server
    npm install

Set up environment variables:

Create a .env file in the server directory with the following variables:

makefile
Copy code
MONGODB_URI=your_mongodb_connection_string
OPENWEATHER_API_KEY=your_openweather_api_key
Run the application locally:

Start the MongoDB server (if not running):

bash
Copy code
mongod
Start the server:

bash
Copy code
cd server
node index.js
Start the client:

bash
Copy code
cd client
npm start
Dockerize the application:

Navigate to the root directory of the project and run:

bash
Copy code
docker-compose up --build
Usage
Enter a location to fetch the current weather data.
Set temperature units and alert thresholds.
Choose the alert type (popup or email) for notifications.
Contributing
Contributions are welcome! Please feel free to open an issue or submit a pull request.

License
This project is licensed under the MIT License - see the LICENSE file for details.

Acknowledgments
OpenWeatherMap API for providing weather data.
MongoDB for the database.
markdown
Copy code

### Notes:
- Replace `yourusername` in the clone URL with your actual GitHub username.
- Make sure to update the `.env` section with actual values for MongoDB and OpenWeather API keys.
- Adjust any sections according to your specific project needs or structure.






