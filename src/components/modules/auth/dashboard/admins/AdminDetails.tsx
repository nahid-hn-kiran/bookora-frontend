"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { Loader2, Pencil, Trash2 } from "lucide-react";
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

import type { IAdmin, IUpdateAdminPayload } from "@/types/admin.types";
import {
  deleteAdmin,
  updateAdmin,
} from "@/services/admin/admin.client.service";

interface AdminDetailsProps {
  admin: IAdmin;
}

export function AdminDetails({ admin }: AdminDetailsProps) {
  const router = useRouter();

  const [isEditOpen, setIsEditOpen] = useState(false);
  const [isDeleteOpen, setIsDeleteOpen] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [name, setName] = useState(admin.user.name);
  const [profilePhoto, setProfilePhoto] = useState(admin.user.photo ?? "");
  const [contactNumber, setContactNumber] = useState(admin.contactNumber ?? "");

  async function handleUpdate() {
    try {
      setIsUpdating(true);

      const payload: IUpdateAdminPayload = {
        admin: {
          name: name.trim(),
          profilePhoto: profilePhoto.trim() || undefined,
          contactNumber: contactNumber.trim() || undefined,
        },
      };

      await updateAdmin(admin.id, payload);

      toast.success("Admin updated successfully.");

      setIsEditOpen(false);

      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to update admin.",
      );
    } finally {
      setIsUpdating(false);
    }
  }

  async function handleDelete() {
    try {
      setIsDeleting(true);

      await deleteAdmin(admin.id);

      toast.success("Admin deleted successfully.");

      setIsDeleteOpen(false);

      router.push("/dashboard/admins");
      router.refresh();
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to delete admin.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  return (
    <div className="space-y-8">
      {/* Profile */}
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center">
        {admin.user.photo ? (
          <img
            src={admin.user.photo}
            alt={admin.user.name}
            className="size-20 rounded-full object-cover"
          />
        ) : (
          <div className="flex size-20 items-center justify-center rounded-full bg-muted text-2xl font-semibold">
            {admin.user.name.charAt(0).toUpperCase()}
          </div>
        )}

        <div>
          <h2 className="text-xl font-semibold">{admin.user.name}</h2>

          <p className="text-sm text-muted-foreground">{admin.user.email}</p>
        </div>
      </div>

      {/* Information */}
      <div className="grid gap-6 md:grid-cols-2">
        <div>
          <p className="text-sm text-muted-foreground">Name</p>

          <p className="font-medium">{admin.user.name}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Email</p>

          <p className="font-medium">{admin.user.email}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Role</p>

          <p className="font-medium">
            {admin.user.role === "SUPER_ADMIN" ? "Super Admin" : "Admin"}
          </p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Status</p>

          <p className="font-medium">{admin.user.status}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Contact Number</p>

          <p className="font-medium">{admin.contactNumber || "Not provided"}</p>
        </div>

        <div>
          <p className="text-sm text-muted-foreground">Joined</p>

          <p className="font-medium">
            {new Intl.DateTimeFormat("en-US", {
              dateStyle: "medium",
            }).format(new Date(admin.createdAt))}
          </p>
        </div>
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3 border-t pt-6">
        <Button variant="outline" onClick={() => setIsEditOpen(true)}>
          <Pencil className="mr-2 size-4" />
          Edit Admin
        </Button>

        <Button variant="destructive" onClick={() => setIsDeleteOpen(true)}>
          <Trash2 className="mr-2 size-4" />
          Delete Admin
        </Button>
      </div>

      {/* Edit Dialog */}
      <Dialog open={isEditOpen} onOpenChange={setIsEditOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Edit Admin</DialogTitle>

            <DialogDescription>
              Update the administrator&apos;s information.
            </DialogDescription>
          </DialogHeader>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="admin-name">Name</Label>

              <Input
                id="admin-name"
                value={name}
                onChange={(event) => setName(event.target.value)}
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-photo">Profile Photo URL</Label>

              <Input
                id="admin-photo"
                value={profilePhoto}
                onChange={(event) => setProfilePhoto(event.target.value)}
                placeholder="https://..."
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="admin-contact">Contact Number</Label>

              <Input
                id="admin-contact"
                value={contactNumber}
                onChange={(event) => setContactNumber(event.target.value)}
                placeholder="01XXXXXXXXX"
              />
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

            <Button
              type="button"
              disabled={isUpdating || !name.trim()}
              onClick={handleUpdate}
            >
              {isUpdating && <Loader2 className="mr-2 size-4 animate-spin" />}
              Save Changes
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>

      {/* Delete Dialog */}
      <Dialog open={isDeleteOpen} onOpenChange={setIsDeleteOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Delete Admin?</DialogTitle>

            <DialogDescription>
              This will deactivate{" "}
              <span className="font-medium">{admin.user.name}</span>
              &apos;s admin account and end their active sessions. This action
              cannot be undone from the dashboard.
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
              Delete Admin
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}
