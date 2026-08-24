/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

import { venueService } from "@/services/venue.service";

import type { IVenue } from "@/types/venue.types";

interface VenueEditFormProps {
  venue: IVenue;
}

export function VenueEditForm({ venue }: VenueEditFormProps) {
  console.log(venue);
  const router = useRouter();

  const [name, setName] = useState(venue.name);
  const [description, setDescription] = useState(venue.description ?? "");
  const [address, setAddress] = useState(venue.address);
  const [city, setCity] = useState(venue.city);
  const [country, setCountry] = useState(venue.country);
  const [phone, setPhone] = useState(venue.phone ?? "");
  const [email, setEmail] = useState(venue.email ?? "");
  const [image, setImage] = useState(venue.image ?? "");
  const [status, setStatus] = useState<"ACTIVE" | "INACTIVE">(venue.status);

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.SubmitEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Venue name is required.");
      return;
    }

    if (!address.trim()) {
      toast.error("Address is required.");
      return;
    }

    if (!city.trim()) {
      toast.error("City is required.");
      return;
    }

    if (!country.trim()) {
      toast.error("Country is required.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await venueService.updateVenue(venue.id, {
        name: name.trim(),
        description: description.trim() || undefined,
        address: address.trim(),
        city: city.trim(),
        country: country.trim(),
        phone: phone.trim() || undefined,
        email: email.trim() || undefined,
        image: image.trim() || undefined,
        status,
      });

      if (!result.success) {
        toast.error(result.message || "Unable to update the venue.");
        return;
      }

      toast.success(result.message || "Venue updated successfully.");

      router.push(`/dashboard/venues/${venue.id}`);

      router.refresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Unable to update the venue.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="font-semibold">Venue information</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Update the basic information for this venue.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Venue name</Label>

        <Input
          id="name"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          disabled={isLoading}
          rows={4}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="address">Address</Label>

        <Input
          id="address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          disabled={isLoading}
          required
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>

          <Input
            id="city"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>

          <Input
            id="country"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            disabled={isLoading}
            required
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="phone">Phone</Label>

          <Input
            id="phone"
            type="tel"
            value={phone}
            onChange={(event) => setPhone(event.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            type="email"
            value={email}
            onChange={(event) => setEmail(event.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="image">Image URL</Label>

        <Input
          id="image"
          type="url"
          placeholder="https://..."
          value={image}
          onChange={(event) => setImage(event.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>

        <select
          id="status"
          value={status}
          onChange={(event) =>
            setStatus(event.target.value as "ACTIVE" | "INACTIVE")
          }
          disabled={isLoading}
          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="ACTIVE">Active</option>

          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={() => router.push(`/dashboard/venues/${venue.id}`)}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Saving changes...
            </>
          ) : (
            "Save changes"
          )}
        </Button>
      </div>
    </form>
  );
}
