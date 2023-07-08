import { MutableRefObject, useCallback, useEffect } from "react";

export default function useOutsideClick(
  ref: MutableRefObject<any>,
  handleClose: () => void
) {
  const handleClick = useCallback(
    (event: MouseEvent) => {
      if (!ref.current?.contains(event.target)) {
        handleClose();
      }
    },
    [handleClose, ref]
  );

  useEffect(() => {
    document.addEventListener("mousedown", handleClick);

    return () => {
      document.removeEventListener("mousedown", handleClick);
    };
  }, [handleClick]);
}
