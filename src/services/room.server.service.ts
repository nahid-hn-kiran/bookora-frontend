import { api } from "@/lib/server-fetch";

import type {
  ICreateRoomPayload,
  IRoom,
  IUpdateRoomPayload,
} from "@/types/room.types";

const getRooms = async () => {
  return api.get<IRoom[]>("/rooms");
};

const getRoomById = async (roomId: string) => {
  return api.get<IRoom>(`/rooms/${roomId}`);
};

const createRoom = async (payload: ICreateRoomPayload) => {
  return api.post<IRoom>("/rooms", payload);
};

const updateRoom = async (roomId: string, payload: IUpdateRoomPayload) => {
  return api.patch<IRoom>(`/rooms/${roomId}`, payload);
};

const deleteRoom = async (roomId: string) => {
  return api.delete<IRoom>(`/rooms/${roomId}`);
};

export const roomServerService = {
  getRooms,
  getRoomById,
  createRoom,
  updateRoom,
  deleteRoom,
};
