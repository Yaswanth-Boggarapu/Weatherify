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

    ```bash
      Copy code
      cd client
      npm install
      cd ../server
      npm install

 3. Set up environment variables:
    Create a .env file in the server directory with the following variables:
    ```bash
    MONGODB_URI=your_mongodb_connection_string
    OPENWEATHER_API_KEY=your_openweather_api_key
 4. Run the application locally:
    Start the MongoDB server (if not running):

    ```bash
    mongod
    cd server      
    node index.js
 5. Dockerize the application:
    Navigate to the root directory of the project and run:
    ```bash
    docker-compose up --build
 6. Usage
    **Enter a location to fetch the current weather data.**
    **Set temperature units and alert thresholds.**
    **Choose the alert type (popup or email) for notifications.**

 7.


