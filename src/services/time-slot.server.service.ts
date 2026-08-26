import { api } from "@/lib/server-fetch";

import type { ITimeSlot } from "@/types/time-slot.types";

export interface ITimeSlotQuery {
  roomId?: string;
  date?: string;
}

const getTimeSlots = async (query?: ITimeSlotQuery) => {
  const params = new URLSearchParams();

  if (query?.roomId) {
    params.set("roomId", query.roomId);
  }

  if (query?.date) {
    params.set("date", query.date);
  }

  const queryString = params.toString();

  const response = await api.get<ITimeSlot[]>(
    `/time-slots${queryString ? `?${queryString}` : ""}`,
  );

  return response.data ?? [];
};

const getTimeSlotById = async (timeSlotId: string) => {
  const response = await api.get<ITimeSlot>(`/time-slots/${timeSlotId}`);

  return response.data;
};

const getTimeSlotsByRoom = async (roomId: string) => {
  return api.get<ITimeSlot[]>(`/time-slots?roomId=${roomId}`);
};

export const timeSlotServerService = {
  getTimeSlots,
  getTimeSlotById,
  getTimeSlotsByRoom,
};
