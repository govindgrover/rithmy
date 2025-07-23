
"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PauseCircle } from "lucide-react";

type StopConfirmationDialogProps = {
  isOpen: boolean;
  onContinue: () => void;
  onConfirmStop: () => void;
};

export function StopConfirmationDialog({
  isOpen,
  onContinue,
  onConfirmStop,
}: StopConfirmationDialogProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent onEscapeKeyDown={onContinue}>
        <AlertDialogHeader>
          <div className="flex justify-center">
            <PauseCircle className="size-12 text-primary" />
          </div>
          <AlertDialogTitle className="text-center text-2xl font-headline">
            Pause
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            Do you want to end your session or continue your flow?
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter className="flex flex-col-reverse sm:grid sm:grid-cols-2 gap-2">
            <AlertDialogCancel onClick={onContinue}>
              Continue Flow
            </AlertDialogCancel>
            <AlertDialogAction onClick={onConfirmStop} className="bg-destructive text-destructive-foreground hover:bg-destructive/90">
              End Session
            </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
