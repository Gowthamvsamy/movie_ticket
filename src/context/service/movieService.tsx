import axios, { AxiosError } from "axios";
import { Booking, MovieData, MyTokenPayload, UserLogin, UserRegister, WalletData } from "../../Component/Type";
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

//wallet creation
export async function wallet(walletBalance: WalletData) {
  try {
    const response = await axios.post(`${BASE_URL}/wallet`, walletBalance)
    return response.data
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error("Failed to create a wallet: ", error.response?.data || error.message);
      throw error.response?.data || new Error(error.message);
    } else {
      console.error("Unexpected:", error);
      throw new Error('An unknown error occurred');
    }
  }
}

// get wallet balance
export async function getWallet(): Promise<WalletData> {
  try {
    const response = await axios.get(`${BASE_URL}/wallet/getWallet`);
    return response.data;
  } catch (err) {
    console.error('Failed to fetch wallet balance:', err);
    throw err;
  }
}

// get wallet balance using user id
export async function getUserWallet(user_id: string): Promise<WalletData | null> {
  try{
    const response = await axios.get(`${BASE_URL}/wallet/getWallet/${user_id}`);
    return response.data;
  } catch (err) {
    const axiosError = err as AxiosError;

    // Handle 404 wallet not found
    if (axiosError.response?.status === 404) {
      return null; // Indicate that the wallet doesn't exist
    }

    console.error('Failed to fetch wallet balance:', err);
    throw err; // Re-throw other errors
  }
}

// update wallet
export async function updateWallet(id: string, updateData: Partial<WalletData>): Promise<WalletData> {
  try {
    const response =await axios.patch(`${BASE_URL}/wallet/updateWallet/${id}`, updateData);
    return response.data;
  } catch (error: unknown) {
    if (axios.isAxiosError(error)) {
      console.error('Failed to update waller:', error.response?.data || error.message);
      throw error.response?.data || new Error(error.message);
    } else {
      console.error('Unexpected error during wallet update:', error);
      throw new Error('An unknown error occurred while updating wallet');
    }
  }
}