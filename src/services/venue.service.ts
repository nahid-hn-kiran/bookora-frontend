import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";

import type {
  ICreateVenuePayload,
  IUpdateVenuePayload,
  IVenue,
} from "@/types/venue.types";

const createVenue = async (payload: ICreateVenuePayload) => {
  const response = await api.post<ApiResponse<IVenue>>("/venues", payload);

  return response.data;
};

const updateVenue = async (id: string, payload: IUpdateVenuePayload) => {
  const response = await api.patch<ApiResponse<IVenue>>(
    `/venues/${id}`,
    payload,
  );

  return response.data;
};

const deleteVenue = async (id: string) => {
  const response = await api.delete<ApiResponse<IVenue>>(`/venues/${id}`);

  return response.data;
};

export const venueService = {
  createVenue,
  updateVenue,
  deleteVenue,
};
