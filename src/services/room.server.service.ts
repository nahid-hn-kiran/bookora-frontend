import { api } from "@/lib/server-fetch";

import type { IRoom } from "@/types/room.types";

const getRooms = async () => {
  return api.get<IRoom[]>("/rooms");
};

const getRoomById = async (roomId: string) => {
  return api.get<IRoom>(`/rooms/${roomId}`);
};

export const roomServerService = {
  getRooms,
  getRoomById,
};
