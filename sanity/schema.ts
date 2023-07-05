import { type SchemaTypeDefinition } from 'sanity'
import {userSchema} from './userSchema'
import {ridesSchema} from './ridesSchema'
import {tripSchema} from './tripSchema'

export const schema: { types: SchemaTypeDefinition[] } = {
  types: [userSchema, ridesSchema, tripSchema],
}
