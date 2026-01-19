
export type ReleaseCategory = 
  | 'New Game' 
  | 'Early Access' 
  | 'Full Release' 
  | 'Update' 
  | 'Port' 
  | 'Edition' 
  | 'DLC' 
  | 'Remake/Remaster'
  | 'Physical Release';

export interface Game {
  id: string;
  releaseDate: string; // YYYY-MM-DD
  displayDate: string;
  title: string;
  category: ReleaseCategory;
  genres: string[];
  platforms: string[];
  trailerUrl?: string;
  summary?: string; // Short descriptive text about the game
}

export type ViewMode = 'list' | 'calendar';
