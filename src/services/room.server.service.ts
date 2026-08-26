import { api } from "@/lib/server-fetch";

import type { IGetRoomsQuery, IRoom } from "@/types/room.types";

const getRooms = async (query?: IGetRoomsQuery) => {
  const params = new URLSearchParams();

  if (query?.venueId) {
    params.set("venueId", query.venueId);
  }

  const queryString = params.toString();

  return api.get<IRoom[]>(`/rooms${queryString ? `?${queryString}` : ""}`);
};

const getRoomById = async (roomId: string) => {
  return api.get<IRoom>(`/rooms/${roomId}`);
};

export const roomServerService = {
  getRooms,
  getRoomById,
};
