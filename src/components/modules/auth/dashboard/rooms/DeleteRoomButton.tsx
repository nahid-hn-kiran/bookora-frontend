/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { useState } from "react";
import { Loader2, Trash2 } from "lucide-react";
import { toast } from "sonner";
import { useRouter } from "next/navigation";

import { Button } from "@/components/ui/button";
import { roomService } from "@/services/room.service";

interface DeleteRoomButtonProps {
  roomId: string;
  venueId: string;
}

export function DeleteRoomButton({ roomId, venueId }: DeleteRoomButtonProps) {
  const router = useRouter();

  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this room? This action cannot be undone.",
    );

    if (!confirmed) {
      return;
    }

    try {
      setIsDeleting(true);

      const result = await roomService.deleteRoom(roomId);

      if (!result.success) {
        toast.error(result.message || "Unable to delete the room.");
        return;
      }

      toast.success(result.message || "Room deleted successfully.");

      router.push(`/dashboard/venues/${venueId}/rooms`);

      router.refresh();
    } catch (error: any) {
      toast.error(
        error?.response?.data?.message || "Unable to delete the room.",
      );
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <Button variant="destructive" onClick={handleDelete} disabled={isDeleting}>
      {isDeleting ? (
        <Loader2 className="size-4 animate-spin" />
      ) : (
        <Trash2 className="size-4" />
      )}

      {isDeleting ? "Deleting..." : "Delete"}
    </Button>
  );
}
