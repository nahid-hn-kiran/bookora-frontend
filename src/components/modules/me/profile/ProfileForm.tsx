"use client";

import { useState } from "react";
import { Loader2, Save } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { updateMyProfile } from "@/services/auth/auth.service";

import type {
  IMyProfile,
  IUpdateMyProfilePayload,
} from "@/types/profile.types";

interface ProfileFormProps {
  profile: IMyProfile;
}

export function ProfileForm({ profile }: ProfileFormProps) {
  const [name, setName] = useState(profile.name);
  const [contactNumber, setContactNumber] = useState(
    profile.admin?.contactNumber ?? "",
  );
  const [image, setImage] = useState(profile.image ?? "");

  const [isUpdating, setIsUpdating] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const payload: IUpdateMyProfilePayload = {
      name: name.trim(),
      image: image.trim() || undefined,
      contactNumber: contactNumber.trim() || undefined,
    };

    try {
      setIsUpdating(true);

      await updateMyProfile(payload);

      toast.success("Profile updated successfully.");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update profile.",
      );
    } finally {
      setIsUpdating(false);
    }
  }

  const initials = profile.name
    .split(" ")
    .map((part) => part.charAt(0))
    .join("")
    .slice(0, 2)
    .toUpperCase();

  return (
    <form onSubmit={handleSubmit} className="space-y-8">
      {/* Profile preview */}
      <div className="flex items-center gap-4">
        {image ? (
          <img
            src={image}
            alt={profile.name}
            className="size-20 rounded-full object-cover ring-2 ring-border"
          />
        ) : (
          <div className="flex size-20 items-center justify-center rounded-full bg-muted text-xl font-semibold">
            {initials}
          </div>
        )}

        <div>
          <h3 className="font-semibold">{profile.name}</h3>

          <p className="text-sm text-muted-foreground">{profile.email}</p>
        </div>
      </div>

      {/* Basic information */}
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="name">Name</Label>

          <Input
            id="name"
            value={name}
            onChange={(event) => setName(event.target.value)}
            placeholder="Your name"
            disabled={isUpdating}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="email">Email</Label>

          <Input
            id="email"
            value={profile.email}
            disabled
            className="bg-muted"
          />

          <p className="text-xs text-muted-foreground">
            Email cannot be changed from your profile.
          </p>
        </div>

        <div className="space-y-2">
          <Label htmlFor="contactNumber">Contact Number</Label>

          <Input
            id="contactNumber"
            value={contactNumber}
            onChange={(event) => setContactNumber(event.target.value)}
            placeholder="Your contact number"
            disabled={isUpdating}
          />
        </div>

        <div className="space-y-2">
          <Label htmlFor="image">Profile Image URL</Label>

          <Input
            id="image"
            value={image}
            onChange={(event) => setImage(event.target.value)}
            placeholder="https://..."
            disabled={isUpdating}
          />
        </div>
      </div>

      {/* Account information */}
      <div className="rounded-lg border bg-muted/30 p-5">
        <h3 className="mb-4 font-medium">Account Information</h3>

        <div className="grid gap-4 text-sm sm:grid-cols-3">
          <div>
            <p className="text-muted-foreground">Role</p>

            <p className="mt-1 font-medium">{profile.role}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Status</p>

            <p className="mt-1 font-medium">{profile.status}</p>
          </div>

          <div>
            <p className="text-muted-foreground">Joined</p>

            <p className="mt-1 font-medium">
              {new Intl.DateTimeFormat("en-US", {
                dateStyle: "medium",
              }).format(new Date(profile.createdAt))}
            </p>
          </div>
        </div>
      </div>

      {/* Save */}
      <div className="flex justify-end border-t pt-6">
        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Saving...
            </>
          ) : (
            <>
              <Save className="mr-2 size-4" />
              Save Changes
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
