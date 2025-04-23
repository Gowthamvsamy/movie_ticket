import axios from "axios";
import { Booking, MovieData, UserLogin, UserRegister } from "../../component/type";

const BASE_URL = 'http://localhost:8000';

// movie list fetching
export async function fetchMovieData(): Promise<MovieData[]> {
  try {
    const response = await axios.get(`${BASE_URL}/movies`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch movie data:', error);
    return [];
  }
}

// user register
export async function registerUser(userData: UserRegister): Promise<unknown> {
  try {
    const response = await axios.post(`${BASE_URL}/register`, userData);
    return response.data;

  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to register user:', error.response?.data || error.message);
      throw error.response?.data || new Error(error.message);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unknown error occurred');
    }
  }
}

// user Login
export async function loginUser(userData: UserLogin): Promise<unknown> {
  try {
    const response = await axios.post(`${BASE_URL}/login`, userData);

    if (response) {
      localStorage.setItem('token', response.data.token);      
    }

    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to login user:', error.response?.data || error.message);
      throw error.response?.data || new Error(error.message);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unknown error occurred');
    }
  }
}

// Post Booking
export async function booking(bookingData: Booking): Promise<unknown> {
  try {
    const response = await axios.post(`${BASE_URL}/booking`, bookingData);
    return response.data;
    
  } catch (error: unknown) {
    if(axios.isAxiosError(error)) {
      console.error('Failed to book ticket:', error.response?.data || error.message);
      throw error.response?.data || new Error(error.message);
    } else {
      console.error('Unexpected error:', error);
      throw new Error('An unknown error occurred');
    }
  }
}

// Get booking
export async function getBooking(): Promise<Booking[]> {
  try {
    const response = await axios.get(`${BASE_URL}/booking/getBooking`);
    return response.data;
  } catch (error) {
    console.error('Failed to fetch booking data:', error);
    return [];  
  }
}