import { api } from "@/lib/axios";
import { ApiResponse } from "@/types/api.types";

import type {
  ICreateTimeSlotPayload,
  ITimeSlot,
  IUpdateTimeSlotPayload,
} from "@/types/time-slot.types";

const createTimeSlot = async (payload: ICreateTimeSlotPayload) => {
  const response = await api.post<ApiResponse<ITimeSlot>>(
    "/time-slots",
    payload,
  );

  return response.data;
};

const updateTimeSlot = async (
  timeSlotId: string,
  payload: IUpdateTimeSlotPayload,
) => {
  const response = await api.patch<ApiResponse<ITimeSlot>>(
    `/time-slots/${timeSlotId}`,
    payload,
  );

  return response.data;
};

const deleteTimeSlot = async (timeSlotId: string) => {
  const response = await api.delete<ApiResponse<ITimeSlot>>(
    `/time-slots/${timeSlotId}`,
  );

  return response.data;
};

export const timeSlotService = {
  createTimeSlot,
  updateTimeSlot,
  deleteTimeSlot,
};
