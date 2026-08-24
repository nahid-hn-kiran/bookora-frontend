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

import { roomService } from "@/services/room.service";

import type { IRoom, RoomStatus } from "@/types/room.types";

interface RoomEditFormProps {
  room: IRoom;
  venueId: string;
  venueName: string;
}

export function RoomEditForm({ room, venueId, venueName }: RoomEditFormProps) {
  const router = useRouter();

  const [name, setName] = useState(room.name);
  const [description, setDescription] = useState(room.description ?? "");
  const [capacity, setCapacity] = useState(String(room.capacity));
  const [price, setPrice] = useState(String(room.price));
  const [duration, setDuration] = useState(String(room.duration));
  const [difficulty, setDifficulty] = useState(room.difficulty ?? "");
  const [status, setStatus] = useState<RoomStatus>(room.status ?? "ACTIVE");

  const [isLoading, setIsLoading] = useState(false);

  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    if (!name.trim()) {
      toast.error("Room name is required.");
      return;
    }

    if (!capacity || Number(capacity) <= 0) {
      toast.error("Please enter a valid capacity.");
      return;
    }

    if (!price || Number(price) < 0) {
      toast.error("Please enter a valid price.");
      return;
    }

    if (!duration || Number(duration) <= 0) {
      toast.error("Please enter a valid duration.");
      return;
    }

    try {
      setIsLoading(true);

      const result = await roomService.updateRoom(room.id, {
        name: name.trim(),
        description: description.trim() || undefined,
        capacity: Number(capacity),
        price: Number(price),
        duration: Number(duration),
        difficulty: difficulty.trim() || undefined,
        status,
      });

      if (!result.success) {
        toast.error(result.message || "Unable to update the room.");
        return;
      }

      toast.success(result.message || "Room updated successfully.");

      router.push(`/dashboard/venues/${venueId}/rooms/${room.id}`);

      router.refresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Unable to update the room.",
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="font-semibold">Room information</h2>

        <p className="mt-1 text-sm text-muted-foreground">
          Update the room information and booking settings.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Room name</Label>

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

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>

          <Input
            id="capacity"
            type="number"
            min="1"
            value={capacity}
            onChange={(event) => setCapacity(event.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>

          <Input
            id="duration"
            type="number"
            min="1"
            value={duration}
            onChange={(event) => setDuration(event.target.value)}
            disabled={isLoading}
            required
          />
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>

          <Input
            id="price"
            type="number"
            min="0"
            step="0.01"
            value={price}
            onChange={(event) => setPrice(event.target.value)}
            disabled={isLoading}
            required
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>

          <Input
            id="difficulty"
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>

        <select
          id="status"
          value={status}
          onChange={(event) => setStatus(event.target.value as RoomStatus)}
          disabled={isLoading}
          className="flex h-10 w-full rounded-md border bg-background px-3 py-2 text-sm"
        >
          <option value="ACTIVE">Active</option>

          <option value="INACTIVE">Inactive</option>
        </select>
      </div>

      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-sm font-medium">Venue</p>

        <p className="mt-1 text-sm text-muted-foreground">{venueName}</p>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={() =>
            router.push(`/dashboard/venues/${venueId}/rooms/${room.id}`)
          }
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
