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

interface RoomFormProps {
  venueId: string;
  venueName: string;
}

export function RoomForm({ venueId, venueName }: RoomFormProps) {
  const router = useRouter();

  const [name, setName] = useState("");
  const [description, setDescription] = useState("");
  const [capacity, setCapacity] = useState("");
  const [price, setPrice] = useState("");
  const [duration, setDuration] = useState("");
  const [difficulty, setDifficulty] = useState("");

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

      const result = await roomService.createRoom({
        name: name.trim(),
        description: description.trim() || undefined,
        capacity: Number(capacity),
        price: Number(price),
        duration: Number(duration),
        difficulty: difficulty.trim() || undefined,
        venueId,
      });

      if (!result.success) {
        toast.error(result.message || "Unable to create the room.");
        return;
      }

      toast.success(result.message || "Room created successfully.");

      router.push(`/dashboard/venues/${venueId}/rooms`);

      router.refresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message ||
          "Unable to create the room. Please try again.",
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
          Configure the basic information and booking details for this room.
        </p>
      </div>

      <div className="space-y-2">
        <Label htmlFor="name">Room name</Label>

        <Input
          id="name"
          placeholder="e.g. Conference Room A"
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
          placeholder="Describe this room..."
          value={description}
          onChange={(event) => setDescription(event.target.value)}
          disabled={isLoading}
          rows={4}
        />

        <p className="text-xs text-muted-foreground">
          Optional. Give customers a quick idea of what this room offers.
        </p>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="capacity">Capacity</Label>

          <Input
            id="capacity"
            type="number"
            min="1"
            placeholder="10"
            value={capacity}
            onChange={(event) => setCapacity(event.target.value)}
            disabled={isLoading}
            required
          />

          <p className="text-xs text-muted-foreground">
            Maximum number of people.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="duration">Duration</Label>

          <div className="relative">
            <Input
              id="duration"
              type="number"
              min="1"
              placeholder="60"
              value={duration}
              onChange={(event) => setDuration(event.target.value)}
              disabled={isLoading}
              required
              className="pr-14"
            />

            <span className="pointer-events-none absolute right-3 top-1/2 -translate-y-1/2 text-xs text-muted-foreground">
              min
            </span>
          </div>
        </div>
      </div>

      <div className="grid gap-5 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="price">Price</Label>

          <div className="relative">
            <span className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-sm text-muted-foreground">
              ৳
            </span>

            <Input
              id="price"
              type="number"
              min="0"
              step="0.01"
              placeholder="500"
              value={price}
              onChange={(event) => setPrice(event.target.value)}
              disabled={isLoading}
              required
              className="pl-8"
            />
          </div>

          <p className="text-xs text-muted-foreground">
            Price for the configured duration.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="difficulty">Difficulty</Label>

          <Input
            id="difficulty"
            placeholder="e.g. Beginner, Intermediate"
            value={difficulty}
            onChange={(event) => setDifficulty(event.target.value)}
            disabled={isLoading}
          />
        </div>
      </div>

      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-sm font-medium">Venue</p>

        <p className="mt-1 text-sm text-muted-foreground">
          This room will be added to{" "}
          <span className="font-medium text-foreground">{venueName}</span>.
        </p>
      </div>

      <div className="flex flex-col-reverse gap-3 border-t pt-6 sm:flex-row sm:justify-end">
        <Button
          type="button"
          variant="outline"
          disabled={isLoading}
          onClick={() => router.push(`/dashboard/venues/${venueId}/rooms`)}
        >
          Cancel
        </Button>

        <Button type="submit" disabled={isLoading}>
          {isLoading ? (
            <>
              <Loader2 className="size-4 animate-spin" />
              Creating room...
            </>
          ) : (
            "Create room"
          )}
        </Button>
      </div>
    </form>
  );
}
