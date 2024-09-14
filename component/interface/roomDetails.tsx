export interface RoomDetails {
    _id?:string,
    id: string;
    type: string;
    confort: string;
    mainImage: {
      asset: {
        _type : string,
        _ref:string,
      },
    };
    pricePerNight:number,
    status:string,
  }