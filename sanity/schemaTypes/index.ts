import { type SchemaTypeDefinition } from 'sanity'
import roomType from './roomType'
import bookingType from './bookingType'
import guestType from './guestType'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [roomType,bookingType,guestType],
}
