import { useEffect, useState } from "react";
import random from "random";

export default function useWhoAmI(): string {
  const [whoAmI, setWhoAmI] = useState("");

  useEffect(() => {
    const storedUserId = localStorage.getItem("who_am_i");
    if (!storedUserId) {
      setWhoAmI(() => {
        const randomId = random.float().toString();
        localStorage?.setItem("who_am_i", randomId);
        return randomId;
      });
    } else {
      setWhoAmI(storedUserId);
    }
  }, [whoAmI]);

  return whoAmI;
}
