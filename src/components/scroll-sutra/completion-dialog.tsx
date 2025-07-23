"use client";

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "@/components/ui/alert-dialog";
import { PartyPopper } from "lucide-react";

type CompletionDialogProps = {
  isOpen: boolean;
  onContinue: () => void;
  scrolls: number;
  duration: string;
};

export function CompletionDialog({
  isOpen,
  onContinue,
  scrolls,
  duration,
}: CompletionDialogProps) {
  return (
    <AlertDialog open={isOpen}>
      <AlertDialogContent onEscapeKeyDown={onContinue}>
        <AlertDialogHeader>
          <div className="flex justify-center">
            <PartyPopper className="size-12 text-primary" />
          </div>
          <AlertDialogTitle className="text-center text-2xl font-headline">
            Session Complete!
          </AlertDialogTitle>
          <AlertDialogDescription className="text-center">
            You have successfully completed your focused scrolling session.
            <br />
            You achieved <strong>{scrolls}</strong> scrolls in{" "}
            <strong>{duration}</strong>.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogAction onClick={onContinue}>
            Start Anew
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}
