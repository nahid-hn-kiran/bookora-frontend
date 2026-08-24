import { api } from "@/lib/axios";

import type {
  ICreateRoomPayload,
  IUpdateRoomPayload,
} from "@/types/room.types";

const createRoom = async (payload: ICreateRoomPayload) => {
  const response = await api.post("/rooms", payload);

  return response.data;
};

const updateRoom = async (roomId: string, payload: IUpdateRoomPayload) => {
  const response = await api.patch(`/rooms/${roomId}`, payload);

  return response.data;
};

const deleteRoom = async (roomId: string) => {
  const response = await api.delete(`/rooms/${roomId}`);

  return response.data;
};

export const roomService = {
  createRoom,
  updateRoom,
  deleteRoom,
};
