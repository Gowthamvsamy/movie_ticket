import axios from "axios";
import { Booking, MovieData, MyTokenPayload, UserLogin, UserRegister } from "../../component/type";
import { jwtDecode } from "jwt-decode";

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

    const token = localStorage.getItem('token')
    const decoded = jwtDecode<MyTokenPayload>(token!);
    localStorage.setItem('user_id', decoded.id);
    localStorage.setItem('u_name', decoded.username)

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
    if (axios.isAxiosError(error)) {
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

// Update Booking
export async function updateBooking(id: string, updatedData: Partial<Booking>): Promise<Booking> {
  try {
    const response = await axios.patch(`${BASE_URL}/booking/updateBooking/${id}`, updatedData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to update booking:', error.response?.data || error.message);
      throw error.response?.data || new Error(error.message);
    } else {
      console.error('Unexpected error during booking update:', error);
      throw new Error('An unknown error occurred while updating booking');
    }
  }
}