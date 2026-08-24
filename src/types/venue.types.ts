export interface IVenue {
  id: string;
  name: string;
  description?: string | null;
  address?: string | null;
  city?: string | null;
  country?: string | null;
  status?: string;
  createdAt?: string;
  updatedAt?: string;
}

export interface ICreateVenuePayload {
  name: string;
  description?: string;
  address?: string;
  city?: string;
  country?: string;
}

export interface IUpdateVenuePayload extends ICreateVenuePayload {
  status?: string;
}
