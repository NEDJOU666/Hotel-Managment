// schemas/booking.ts

import { defineType, defineField } from 'sanity';
import guest from './guestType';

export default defineType({
  name: 'booking',
  title: 'Booking',
  type: 'document',
  fields: [
    defineField({
      name: 'id',
      title: 'ID',
      type: 'number', // Assuming ID is a string; adjust if it's a number or another type
    }),
    defineField({
      name: 'priceAnight',
      title: 'Price per Night',
      type: 'number',
    }),
    defineField({
      name: 'totalAmountPaid',
      title: 'Total Amount Paid',
      type: 'number',
    }),
    defineField({
      name: 'checkInDate',
      title: 'Check-In Date',
      type: 'datetime',
    }),
    defineField({
      name: 'checkOutDate',
      title: 'Check-Out Date',
      type: 'datetime',
    }),
    defineField({
      name: 'roomConfort',
      title: 'Room Comfort',
      type: 'string',
    }),
    defineField({
      name: 'roomType',
      title: 'Room Type',
      type: 'string',
    }),
    defineField({
      name: 'choosenRoom',
      title: 'Chosen Room',
      type: 'string',
    }),
    defineField({
      name: 'name',
      title: 'Name',
      type: 'string',
    }),
    defineField({
      name: 'email',
      title: 'Email',
      type: 'string',
    }),
    defineField({
      name: 'guests',
      title: 'Guests',
      type: 'array',
      of: [{ type: 'guest' }], // Reference to the guest schema
    }),
  ],
});
