export interface CustomerDetails {
    _id?: string; 
    id: string;
    name: string;
    email: string;
    phoneNumber: string;
    picture?: string; // Optional field for storing the picture URL or base64 string
    birthday: string;
    favoriteAmenities: string;
    roomPreferences: string;
    Nationality: string;
  }