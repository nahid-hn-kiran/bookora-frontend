export type RoomStatus = "ACTIVE" | "INACTIVE";

export interface IRoom {
  id: string;
  name: string;
  description?: string | null;
  capacity: number;
  price: number;
  duration: number;
  difficulty?: string | null;
  image?: string | null;
  status?: RoomStatus | null;
  venueId: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateRoomPayload {
  name: string;
  description?: string;
  capacity: number;
  price: number;
  duration: number;
  difficulty?: string;
  image?: string;
  status?: RoomStatus;
  venueId: string;
}

export interface IUpdateRoomPayload {
  name?: string;
  description?: string;
  capacity?: number;
  price?: number;
  duration?: number;
  difficulty?: string;
  image?: string;
  status?: RoomStatus;
}
