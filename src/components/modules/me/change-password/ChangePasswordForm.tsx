"use client";

import { useState } from "react";
import { Eye, EyeOff, Loader2, LockKeyhole } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

import { changePassword } from "@/services/auth/auth.service";

export function ChangePasswordForm() {
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [showOldPassword, setShowOldPassword] = useState(false);
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [isUpdating, setIsUpdating] = useState(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();

    if (!oldPassword) {
      toast.error("Current password is required.");
      return;
    }

    if (newPassword.length < 8) {
      toast.error("New password must be at least 8 characters long.");
      return;
    }

    if (newPassword !== confirmPassword) {
      toast.error("Passwords do not match.");
      return;
    }

    if (oldPassword === newPassword) {
      toast.error("New password must be different from your current password.");
      return;
    }

    try {
      setIsUpdating(true);

      await changePassword({
        oldPassword,
        newPassword,
      });

      toast.success("Password changed successfully.");

      setOldPassword("");
      setNewPassword("");
      setConfirmPassword("");
    } catch (error) {
      toast.error(
        error instanceof Error ? error.message : "Failed to change password.",
      );
    } finally {
      setIsUpdating(false);
    }
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Current password */}
      <div className="space-y-2">
        <Label htmlFor="oldPassword">Current Password</Label>

        <div className="relative">
          <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="oldPassword"
            type={showOldPassword ? "text" : "password"}
            value={oldPassword}
            onChange={(event) => setOldPassword(event.target.value)}
            placeholder="Enter your current password"
            className="pl-9 pr-10"
            disabled={isUpdating}
            autoComplete="current-password"
          />

          <button
            type="button"
            onClick={() => setShowOldPassword((value) => !value)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={
              showOldPassword
                ? "Hide current password"
                : "Show current password"
            }
          >
            {showOldPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* New password */}
      <div className="space-y-2">
        <Label htmlFor="newPassword">New Password</Label>

        <div className="relative">
          <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="newPassword"
            type={showNewPassword ? "text" : "password"}
            value={newPassword}
            onChange={(event) => setNewPassword(event.target.value)}
            placeholder="Enter your new password"
            className="pl-9 pr-10"
            disabled={isUpdating}
            autoComplete="new-password"
          />

          <button
            type="button"
            onClick={() => setShowNewPassword((value) => !value)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={
              showNewPassword ? "Hide new password" : "Show new password"
            }
          >
            {showNewPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>

        <p className="text-xs text-muted-foreground">
          Your new password must be at least 8 characters long.
        </p>
      </div>

      {/* Confirm password */}
      <div className="space-y-2">
        <Label htmlFor="confirmPassword">Confirm New Password</Label>

        <div className="relative">
          <LockKeyhole className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            id="confirmPassword"
            type={showConfirmPassword ? "text" : "password"}
            value={confirmPassword}
            onChange={(event) => setConfirmPassword(event.target.value)}
            placeholder="Confirm your new password"
            className="pl-9 pr-10"
            disabled={isUpdating}
            autoComplete="new-password"
          />

          <button
            type="button"
            onClick={() => setShowConfirmPassword((value) => !value)}
            className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground"
            aria-label={
              showConfirmPassword
                ? "Hide confirmation password"
                : "Show confirmation password"
            }
          >
            {showConfirmPassword ? (
              <EyeOff className="size-4" />
            ) : (
              <Eye className="size-4" />
            )}
          </button>
        </div>
      </div>

      {/* Security notice */}
      <div className="rounded-lg border bg-muted/30 p-4">
        <p className="text-sm font-medium">Security notice</p>

        <p className="mt-1 text-sm text-muted-foreground">
          Changing your password will sign you out of other active sessions.
        </p>
      </div>

      {/* Submit */}
      <div className="flex justify-end border-t pt-6">
        <Button type="submit" disabled={isUpdating}>
          {isUpdating ? (
            <>
              <Loader2 className="mr-2 size-4 animate-spin" />
              Changing Password...
            </>
          ) : (
            <>
              <LockKeyhole className="mr-2 size-4" />
              Change Password
            </>
          )}
        </Button>
      </div>
    </form>
  );
}
