import { useCallback, useEffect } from "react";

export default function useEscapeKey(handleClose: () => void): void {
  const handleEscapeKey = useCallback(
    (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        handleClose();
      }
    },
    [handleClose]
  );

  useEffect(() => {
    document.addEventListener("keyup", handleEscapeKey, false);

    return () => {
      document.removeEventListener("keyup", handleEscapeKey, false);
    };
  }, [handleEscapeKey]);
}
