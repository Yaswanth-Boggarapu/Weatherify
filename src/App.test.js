// src/__tests__/App.test.js
import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import App from '../App';
import axios from 'axios';

// Mock the axios module
jest.mock('axios');

describe('Weather Monitor App', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('renders input and button', () => {
    render(<App />);
    expect(screen.getByPlaceholderText(/Enter Location/i)).toBeInTheDocument();
    expect(screen.getByText(/Fetch Weather/i)).toBeInTheDocument();
  });

  test('fetches weather data successfully', async () => {
    const mockResponse = {
      data: {
        main: {
          temp: 300,
          feels_like: 299,
        },
        weather: [{ main: 'Clear' }],
        name: 'Delhi',
      },
    };
    axios.get.mockResolvedValueOnce(mockResponse);

    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/Enter Location/i), {
      target: { value: 'Delhi' },
    });
    fireEvent.click(screen.getByText(/Fetch Weather/i));

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/Delhi/i)).toBeInTheDocument();
    expect(await screen.findByText(/Temperature: 26.9°C/i)).toBeInTheDocument();
    expect(await screen.findByText(/Condition: Clear/i)).toBeInTheDocument();
  });

  test('handles API errors gracefully', async () => {
    axios.get.mockRejectedValueOnce(new Error('Network Error'));

    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/Enter Location/i), {
      target: { value: 'InvalidLocation' },
    });
    fireEvent.click(screen.getByText(/Fetch Weather/i));

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));
    expect(await screen.findByText(/Failed to fetch weather data/i)).toBeInTheDocument();
  });

  test('updates daily summaries correctly', async () => {
    const mockResponse = {
      data: {
        main: {
          temp: 300,
          feels_like: 299,
        },
        weather: [{ main: 'Rain' }],
        name: 'Delhi',
      },
    };
    axios.get.mockResolvedValueOnce(mockResponse);

    render(<App />);
    fireEvent.change(screen.getByPlaceholderText(/Enter Location/i), {
      target: { value: 'Delhi' },
    });
    fireEvent.click(screen.getByText(/Fetch Weather/i));

    await waitFor(() => expect(axios.get).toHaveBeenCalledTimes(1));

    expect(screen.getByText(/Average Temperature:/i)).toBeInTheDocument();
  });
});
