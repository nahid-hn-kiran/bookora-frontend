export interface IVenue {
  id: string;
  name: string;
  description?: string | null;
  address: string;
  city: string;
  country: string;
  phone?: string | null;
  email?: string | null;
  image?: string | null;
  status: "ACTIVE" | "INACTIVE";
}

export interface ICreateVenuePayload {
  name: string;
  description?: string;
  address: string;
  city: string;
  country: string;
  phone?: string;
  email?: string;
  image?: string;
}

export interface IUpdateVenuePayload {
  name?: string;
  description?: string;
  address?: string;
  city?: string;
  country?: string;
  phone?: string;
  email?: string;
  image?: string;
  status?: "ACTIVE" | "INACTIVE";
}
