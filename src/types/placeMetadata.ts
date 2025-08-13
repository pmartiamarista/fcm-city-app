import { z } from 'zod';

export const coordinatesSchema = z.object({
  coordinates: z
    .tuple([z.number(), z.number()])
    .refine(([lat, lng]) => Math.abs(lat) <= 90 && Math.abs(lng) <= 180, {
      message:
        'Invalid coordinates. Latitude must be between -90 and 90, and longitude between -180 and 180.',
    }),
});

export type Coordinates = z.infer<typeof coordinatesSchema>;

export const PlaceMetadataSchema = z
  .object({
    type: z.string(),
    name: z.string(),
  })
  .and(coordinatesSchema);

export type PlaceMetadata = z.infer<typeof PlaceMetadataSchema>;
