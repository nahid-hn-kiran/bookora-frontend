import { api } from "@/lib/server-fetch";

import type { IVenue } from "@/types/venue.types";

const getVenues = async () => {
  return api.get<IVenue[]>("/venues");
};

const getVenueById = async (id: string) => {
  return api.get<IVenue>(`/venues/${id}`);
};

export const venueServerService = {
  getVenues,
  getVenueById,
};
