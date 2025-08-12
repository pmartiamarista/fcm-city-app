import { z } from 'zod';

export const PlaceMetadataSchema = z.object({
  type: z.string(),
  name: z.string(),
  coordinates: z
    .tuple([z.number(), z.number()])
    .refine(([lat, lng]) => Math.abs(lat) <= 90 && Math.abs(lng) <= 180, {
      message: 'Invalid latitude or longitude values',
    }),
});

export type PlaceMetadata = z.infer<typeof PlaceMetadataSchema>;
