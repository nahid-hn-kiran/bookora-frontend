import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";

import type {
  ICreateRoomPayload,
  IRoom,
  IUpdateRoomPayload,
} from "@/types/room.types";

const createRoom = async (payload: ICreateRoomPayload) => {
  const response = await api.post<ApiResponse<IRoom>>("/rooms", payload);

  return response.data;
};

const updateRoom = async (roomId: string, payload: IUpdateRoomPayload) => {
  const response = await api.patch<ApiResponse<IRoom>>(
    `/rooms/${roomId}`,
    payload,
  );

  return response.data;
};

const deleteRoom = async (roomId: string) => {
  const response = await api.delete<ApiResponse<IRoom>>(`/rooms/${roomId}`);

  return response.data;
};

export const roomService = {
  createRoom,
  updateRoom,
  deleteRoom,
};
