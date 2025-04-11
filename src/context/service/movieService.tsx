import { MovieData } from "../../component/type";

export async function fetchMovieData(): Promise<MovieData[]> {
  try {
    const response = await fetch('https://run.mocky.io/v3/1792a7a6-f4cb-4297-adc2-2f22bd612d0d');
    const data = await response.json();
    return data;
  } catch (error) {
    console.error('Failed to fetch movie data:', error);
    return [];
  }
}
