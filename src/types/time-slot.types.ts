export interface ITimeSlotRoom {
  id: string;
  name: string;
  capacity: number;
  price: number;
  duration: number;
}

export interface ITimeSlot {
  id: string;
  roomId: string;
  date: string;
  startTime: string;
  endTime: string;
  isAvailable: boolean;
  room: ITimeSlotRoom;
}

export interface ICreateTimeSlotPayload {
  roomId: string;
  date: string;
  startTime: string;
  endTime: string;
}

export interface IUpdateTimeSlotPayload {
  date?: string;
  startTime?: string;
  endTime?: string;
}
