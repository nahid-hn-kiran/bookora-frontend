"use client";

import { useState } from "react";
import { Loader2, Pencil, Trash2 } from "lucide-react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import type { IUser, IUpdateUserPayload } from "@/types/admin.types";

import type { UserStatus } from "@/types/auth.types";
import { deleteUser, updateUser } from "@/services/admin/admin.client.service";

interface UserActionsProps {
  user: IUser;
}

export function UserActions({ user }: UserActionsProps) {
  const router = useRouter();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [name, setName] = useState(user.name);
  const [photo, setPhoto] = useState(user.image ?? "");
  const [status, setStatus] = useState<UserStatus>(user.status);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  async function handleUpdate() {
    if (!name.trim()) {
      toast.error("Name is required.");
      return;
    }

    setIsUpdating(true);

    try {
      const payload: IUpdateUserPayload = {
        name: name.trim(),
        profilePhoto: photo.trim() || undefined,
        status,
      };

      await updateUser(user.id, payload);

      toast.success("User updated successfully.");

      setIsEditOpen(false);

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update user.",
      );
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleDelete() {
    setIsDeleting(true);

    try {
      await deleteUser(user.id);

      toast.success("User deleted successfully.");

      router.push("/dashboard/users");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete user.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <>
      <div className="flex flex-wrap gap-3">
        <Button
          variant="outline"
          onClick={() => {
            setName(user.name);
            setPhoto(user.image ?? "");
            setStatus(user.status);
            setIsEditOpen(true);
          }}
        >
          <Pencil className="mr-2 size-4" />
          Edit User
        </Button>

        {user.status !== "DELETED" && (
          <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>
            <Trash2 className="mr-2 size-4" />
            Delete User
          </Button>
        )}
      </div>

      {/* Edit Dialog */}
      <Dialog
        open={isEditOpen}
        onOpenChange={(open) => {
          if (!isUpdating) {
            setIsEditOpen(open);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit User</DialogTitle>

            <DialogDescription>
              Update this user&apos;s profile and account status.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-5 py-2">
            {/* Name */}
            <div className="space-y-2">
              <Label htmlFor="user-name">Name</Label>

              <Input
                id="user-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
                disabled={isUpdating}
                placeholder="Enter user name"
              />
            </div>

            {/* Photo */}
            <div className="space-y-2">
              <Label htmlFor="user-photo">Profile Photo URL</Label>

              <Input
                id="user-photo"
                value={photo}
                onChange={(event) => setPhoto(event.target.value)}
                disabled={isUpdating}
                placeholder="https://..."
              />
            </div>

            {/* Status */}
            <div className="space-y-2">
              <Label htmlFor="user-status">Status</Label>

              <select
                id="user-status"
                value={status}
                onChange={(event) =>
                  setStatus(event.target.value as UserStatus)
                }
                disabled={isUpdating}
                className="flex h-10 w-full rounded-md border bg-background px-3 text-sm"
              >
                <option value="ACTIVE">Active</option>
                <option value="BLOCKED">Blocked</option>
              </select>
            </div>
          </div>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isUpdating}
              onClick={() => setIsEditOpen(false)}
            >
              Cancel
            </Button>

            <Button type="button" disabled={isUpdating} onClick={handleUpdate}>
              {isUpdating && <Loader2 className="mr-2 size-4 animate-spin" />}

              {isUpdating ? "Saving..." : "Save Changes"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Confirmation */}
      <Dialog
        open={isDeleteOpen}
        onOpenChange={(open) => {
          if (!isDeleting) {
            setIsDeleteOpen(open);
          }
        }}
      >
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete User?</DialogTitle>

            <DialogDescription>
              This will deactivate <strong>{user.name}</strong>&apos;s account.
              The user will no longer be able to access the application.
            </DialogDescription>
          </DialogHeader>

          <DialogFooter>
            <Button
              type="button"
              variant="outline"
              disabled={isDeleting}
              onClick={() => setIsDeleteOpen(false)}
            >
              Cancel
            </Button>

            <Button
              type="button"
              variant="destructive"
              disabled={isDeleting}
              onClick={handleDelete}
            >
              {isDeleting && <Loader2 className="mr-2 size-4 animate-spin" />}

              {isDeleting ? "Deleting..." : "Delete User"}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </>
  );
}
