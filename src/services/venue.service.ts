import { api } from "@/lib/axios";

import type {
  ICreateVenuePayload,
  IUpdateVenuePayload,
} from "@/types/venue.types";

const createVenue = async (payload: ICreateVenuePayload) => {
  const response = await api.post("/venues", payload);

  return response.data;
};

const updateVenue = async (id: string, payload: IUpdateVenuePayload) => {
  const response = await api.patch(`/venues/${id}`, payload);

  return response.data;
};

const deleteVenue = async (id: string) => {
  const response = await api.delete(`/venues/${id}`);

  return response.data;
};

export const venueService = {
  createVenue,
  updateVenue,
  deleteVenue,
};
