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

export function VenueForm() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [address, setAddress] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const [isLoading, setIsLoading] = useState(false);

  async function handleSubmit(event: React.SubmitEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Venue name is required.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await venueService.createVenue({
        name: name.trim(),
        description: description.trim(),
        address: address.trim(),
        city: city.trim(),
        country: country.trim(),
      });

      if (!result.success) {
        toast.error(result.message || "Unable to create venue.");
        return;
      }

      toast.success("Venue created successfully.");

      router.push("/dashboard/venues");
      router.refresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          error?.message ||
          "Unable to create venue.",
      );
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 rounded-xl border bg-background p-6"
    >
      <div className="space-y-2">
        <Label htmlFor="name">Venue name</Label>

        <Input
          id="name"
          placeholder="e.g. Bookora Convention Center"
          value={name}
          onChange={(event) => setName(event.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          placeholder="Describe this venue..."
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
          placeholder="Street address"
          value={address}
          onChange={(event) => setAddress(event.target.value)}
          disabled={isLoading}
        />
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="city">City</Label>

          <Input
            id="city"
            placeholder="Dhaka"
            value={city}
            onChange={(event) => setCity(event.target.value)}
            disabled={isLoading}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="country">Country</Label>

          <Input
            id="country"
            placeholder="Bangladesh"
            value={country}
            onChange={(event) => setCountry(event.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 border-t pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={() => router.back()}
          disabled={isLoading}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Creating...
            </>
          ) : (
            "Create venue"
          )}
        </Button>
      </div>
    </form>
  );
}
