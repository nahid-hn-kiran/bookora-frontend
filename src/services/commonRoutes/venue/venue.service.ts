import { api } from "@/lib/server-fetch";

import type { IVenue } from "@/types/venue.types";

const getVenues = async () => {
  return api.get<IVenue[]>("/venues");
};

const getVenueById = async (venueId: string) => {
  return api.get<IVenue>(`/venues/${venueId}`);
};

export const venueServerService = {
  getVenues,
  getVenueById,
};
