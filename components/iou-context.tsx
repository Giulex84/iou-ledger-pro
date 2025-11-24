"use client";

import { createContext, useContext, useEffect, useState } from "react";
import { db } from "@/lib/firebase";
import type { IOU } from "@/lib/types";
import { collection, onSnapshot, addDoc, updateDoc, doc } from "firebase/firestore";

interface IOUContextType {
  ious: IOU[];
  addIOU: (data: Omit<IOU, "id">) => Promise<void>;
  togglePaid: (id: string, paid: boolean) => Promise<void>;
}

const IOUContext = createContext<IOUContextType | undefined>(undefined);

export const IOUProvider = ({ children }: { children: React.ReactNode }) => {
  const [ious, setIous] = useState<IOU[]>([]);

  useEffect(() => {
    const unsub = onSnapshot(collection(db, "ious"), (snap) => {
      const data: IOU[] = snap.docs.map((d) => {
        const raw = d.data() as any;

        return {
          id: d.id,
          name: raw.name ?? "",
          amount: typeof raw.amount === "number" ? raw.amount : Number(raw.amount ?? 0),
          date: raw.date ?? new Date().toISOString(),
          paid: Boolean(raw.paid),
          type: raw.type === "owing" ? "owing" : "owed",
          category: raw.category ?? "Altro",
          currency: raw.currency === "USD" || raw.currency === "PI" ? raw.currency : "EUR",
        };
      });

      setIous(data);
    });

    return () => unsub();
  }, []);

  async function addIOU(data: Omit<IOU, "id">) {
    await addDoc(collection(db, "ious"), data);
  }

  async function togglePaid(id: string, paid: boolean) {
    await updateDoc(doc(db, "ious", id), { paid });
  }

  return (
    <IOUContext.Provider value={{ ious, addIOU, togglePaid }}>
      {children}
    </IOUContext.Provider>
  );
};

export function useIOUs() {
  const ctx = useContext(IOUContext);
  if (!ctx) throw new Error("useIOUs deve essere usato dentro IOUProvider");
  return ctx;
}
