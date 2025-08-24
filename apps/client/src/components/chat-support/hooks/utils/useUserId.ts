import { useEffect, useState } from "react";

const KEY = "chat:userId";

export const useUserId = () => {

  const [userId, setUserId] = useState<{ userId: number | null, peerId: number } | null>(null);

  useEffect(() => {
    const saved = JSON.parse(localStorage.getItem(KEY)!);
    if (saved) setUserId(saved);
  }, []);

  const update = (userId: number | null, peerId: number ) => {
    setUserId({ userId, peerId });
    if (userId == null) localStorage.removeItem(KEY);
    else localStorage.setItem(KEY, JSON.stringify({ userId, peerId }));
  };

  return { ids: userId, setIds: update };
}
