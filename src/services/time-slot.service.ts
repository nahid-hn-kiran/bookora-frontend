import { api } from "@/lib/axios";

import type {
  ICreateTimeSlotPayload,
  IUpdateTimeSlotPayload,
} from "@/types/time-slot.types";

const createTimeSlot = async (payload: ICreateTimeSlotPayload) => {
  const response = await api.post("/time-slots", payload);

  return response.data;
};

const updateTimeSlot = async (
  timeSlotId: string,
  payload: IUpdateTimeSlotPayload,
) => {
  const response = await api.patch(`/time-slots/${timeSlotId}`, payload);

  return response.data;
};

const deleteTimeSlot = async (timeSlotId: string) => {
  const response = await api.delete(`/time-slots/${timeSlotId}`);

  return response.data;
};

export const timeSlotService = {
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
};
