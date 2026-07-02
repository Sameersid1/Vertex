"use client";

import React, { forwardRef, useEffect, useState } from "react";
import { Star, StarOff } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { toggleStarMarked } from "../actions";


interface MarkedToggleButtonProps
  extends React.ComponentPropsWithoutRef<typeof Button> {
  markedForRevision: boolean;
  id: string;
}

const MarkedToggleButton = forwardRef<
  HTMLButtonElement,
  MarkedToggleButtonProps
>(
  (
    { markedForRevision, id, onClick, className, children, ...props },
    ref
  ) => {
    const [isMarked, setIsMarked] = useState(markedForRevision);

    useEffect(() => {
      setIsMarked(markedForRevision);
    }, [markedForRevision]);

    const handleToggle = async (
      event: React.MouseEvent<HTMLButtonElement>
    ) => {
      onClick?.(event);

      const nextState = !isMarked;

      // Optimistic update
      setIsMarked(nextState);

      try {
        const res = await toggleStarMarked(id, nextState);

        if (res.success) {
          toast.success(
            nextState
              ? "Added to favourites"
              : "Removed from favourites"
          );
        } else {
          throw new Error(res.error);
        }
      } catch (error) {
        setIsMarked(!nextState);

        toast.error("Failed to update favourite.");
        console.error(error);
      }
    };

    return (
      <Button
        ref={ref}
        variant="ghost"
        onClick={handleToggle}
        className={cn(
          "flex w-full items-center justify-start rounded-md px-2 py-1.5 text-sm",
          className
        )}
        {...props}
      >
        {isMarked ? (
          <Star
            size={16}
            className="mr-2 fill-yellow-400 text-yellow-400"
          />
        ) : (
          <StarOff
            size={16}
            className="mr-2 text-muted-foreground"
          />
        )}

        {children ??
          (isMarked ? "Remove from Favorites" : "Add to Favorites")}
      </Button>
    );
  }
);

MarkedToggleButton.displayName = "MarkedToggleButton";

export default MarkedToggleButton;