interface Guest {
    name: string;
    age: number;
  }
  
 export interface BookingDetails {
  _id:string;
    id: string;
    name: string;
    email: string;
    checkInDate: string;
    checkOutDate: string;
    roomType: string;
    roomConfort: string;
    choosenRoom: string;  // Ensure this matches with AllBookings
    priceAnight: number;  // Ensure this matches with AllBookings
    totalAmountPaid: number;
    guests: Guest[];
    currency: string;  // Ensure this matches with AllBookings
  }
  