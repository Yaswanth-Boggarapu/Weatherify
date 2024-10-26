import React, { useState, useEffect } from 'react';
import axios from 'axios';
import 'bootstrap/dist/css/bootstrap.min.css'; // Ensure Bootstrap CSS is imported
import { Container, Row, Col, Button, Form, Card } from 'react-bootstrap'; // Import React-Bootstrap components

const kelvinToCelsius = (kelvin) => (kelvin - 273.15).toFixed(1);
const kelvinToFahrenheit = (kelvin) => ((kelvin - 273.15) * 9 / 5 + 32).toFixed(1);

function App() {
  const [data, setData] = useState({});
  const [location, setLocation] = useState('Delhi');
  const [error, setError] = useState(null);
  const [tempUnit, setTempUnit] = useState('C'); // 'C' for Celsius, 'F' for Fahrenheit
  const [alertThreshold, setAlertThreshold] = useState(35); // Celsius
  const [alertType, setAlertType] = useState('popup'); // Default alert type

  // State for daily summaries
  const [dailySummaries, setDailySummaries] = useState({
    averageTemp: 0,
    maxTemp: -Infinity,
    minTemp: Infinity,
    dominantCondition: '',
    count: 0, // Count of records for average calculation
  });

  const apiKey = '5a7f5e1ee29d0dd8ce5887edd3fee2a3';

  // Load historical data from local storage on component mount
  useEffect(() => {
    const storedSummaries = localStorage.getItem('dailySummaries');
    if (storedSummaries) {
      setDailySummaries(JSON.parse(storedSummaries));
    }
  }, []);

  const fetchWeatherData = async () => {
    const apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}`;
    console.log('Fetching weather data from:', apiUrl);

    try {
      const response = await axios.get(apiUrl);
      console.log('API Response:', response.data); // Log the API response

      if (response.data && response.data.main && response.data.weather) {
        const temp = kelvinToCelsius(response.data.main.temp);
        const feels_like = kelvinToCelsius(response.data.main.feels_like);
        const condition = response.data.weather[0].main;

        // Update daily summaries
        updateDailySummaries(temp, condition);

        // Alert if temperature exceeds threshold
        if (temp > alertThreshold) {
          triggerAlert(temp);
        }

        setData({
          city: response.data.name,
          temp,
          feels_like,
          condition,
        });
        setError(null); // Reset any previous error
      } else {
        throw new Error('Unexpected API response structure');
      }
    } catch (err) {
      console.error('Error fetching weather data:', err.message); // Log error message
      setError(`Failed to fetch weather data: ${err.message}`);
    }
  };

  // Update daily summaries
  const updateDailySummaries = (temp, condition) => {
    setDailySummaries(prev => {
      const newMaxTemp = Math.max(prev.maxTemp, temp);
      const newMinTemp = Math.min(prev.minTemp, temp);
      const totalTemp = prev.averageTemp * (prev.count || 1) + parseFloat(temp);
      const count = (prev.count || 1) + 1;
      const averageTemp = (totalTemp / count).toFixed(1);
      
      // Determine dominant weather condition
      const updatedDominantCondition = determineDominantCondition(prev.dominantCondition, condition);
      
      const newSummary = {
        averageTemp,
        maxTemp: newMaxTemp,
        minTemp: newMinTemp,
        dominantCondition: updatedDominantCondition,
        count
      };

      // Save to local storage
      localStorage.setItem('dailySummaries', JSON.stringify(newSummary));

      return newSummary;
    });
  };

  // Function to determine the dominant weather condition
  const determineDominantCondition = (prevDominant, newCondition) => {
    // Here we can implement a more sophisticated logic to determine dominance
    // For simplicity, we'll just take the latest condition as dominant
    return newCondition;
  };

  const sendEmailAlert = async (currentTemp) => {
    try {
      const recipientEmail = 'yaswanth7868@gmail.com'; // Replace with the actual recipient email
      const subject = 'Weather Alert';
      const text = `Temperature exceeds threshold! Current: ${currentTemp}°C`;
  
      await axios.post('http://localhost:5000/send-email', {
        recipientEmail,
        subject,
        text,
      });
  
      console.log('Email alert sent successfully!');
    } catch (error) {
      console.error('Error sending email alert:', error.message);
    }
  };

  const triggerAlert = (currentTemp) => {
    if (alertType === 'popup') {
      alert(`Temperature exceeds threshold! Current: ${currentTemp}°C`);
    } else if (alertType === 'email') {
      sendEmailAlert(currentTemp);
    }
  };

  // Fetch data on component mount and set interval for periodic updates
  useEffect(() => {
    fetchWeatherData(); // Initial fetch
    const intervalId = setInterval(fetchWeatherData, 5 * 60 * 1000); // Fetch every 5 minutes
    return () => clearInterval(intervalId); // Cleanup on unmount
  }, [location]); // Refetch when location changes

  return (
    <Container className="app">
      <h1>Weather Monitor</h1>
      <Row>
        <Col md={4}>
          <Form>
            <Form.Group controlId="locationInput">
              <Form.Label>Location</Form.Label>
              <Form.Control
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                placeholder="Enter Location"
              />
            </Form.Group>

            <Form.Group controlId="tempUnitSelect">
              <Form.Label>Temperature Unit:</Form.Label>
              <Form.Control as="select" value={tempUnit} onChange={(e) => setTempUnit(e.target.value)}>
                <option value="C">Celsius</option>
                <option value="F">Fahrenheit</option>
              </Form.Control>
            </Form.Group>

            <Form.Group controlId="alertThresholdInput">
              <Form.Label>Alert Threshold (°C):</Form.Label>
              <Form.Control
                type="number"
                value={alertThreshold}
                onChange={(e) => setAlertThreshold(Number(e.target.value))}
              />
            </Form.Group>

            <Form.Group controlId="alertTypeSelect">
              <Form.Label>Alert Type:</Form.Label>
              <Form.Control as="select" value={alertType} onChange={(e) => setAlertType(e.target.value)}>
                <option value="popup">Popup Alert</option>
                <option value="email">Email Alert</option>
              </Form.Control>
            </Form.Group>

            <Button variant="primary" onClick={fetchWeatherData}>Fetch Weather</Button>
          </Form>
        </Col>
        <Col md={8}>
          {error ? (
            <p>{error}</p>
          ) : (
            <Card className="mt-3">
              <Card.Body>
                <Card.Title>{data.city}</Card.Title>
                <Card.Text>
                  Temperature: {tempUnit === 'C' ? data.temp + '°C' : kelvinToFahrenheit(data.temp) + '°F'}
                </Card.Text>
                <Card.Text>
                  Feels Like: {tempUnit === 'C' ? data.feels_like + '°C' : kelvinToFahrenheit(data.feels_like) + '°F'}
                </Card.Text>
                <Card.Text>
                  Condition: {data.condition}
                </Card.Text>
                <Card.Text>
                  <strong>Daily Summary</strong>
                </Card.Text>
                <Card.Text>
                  Average Temperature: {dailySummaries.averageTemp}°C
                </Card.Text>
                <Card.Text>
                  Max Temperature: {dailySummaries.maxTemp}°C
                </Card.Text>
                <Card.Text>
                  Min Temperature: {dailySummaries.minTemp}°C
                </Card.Text>
                <Card.Text>
                  Dominant Condition: {dailySummaries.dominantCondition}
                </Card.Text>
              </Card.Body>
            </Card>
          )}
        </Col>
      </Row>
    </Container>
  );
}

export default App;
