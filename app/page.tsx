"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useIOUs } from "@/components/iou-context";
import type { IOUCurrency } from "@/lib/types";
import DueDatePicker from "@/components/due-date-picker";

export default function AddIOUPage() {
  const router = useRouter();
  const { addIOU } = useIOUs();

  const [name, setName] = useState("");
  const [amount, setAmount] = useState<number | "">("");
  const [type, setType] = useState<"owed" | "owing">("owed");
  const [currency, setCurrency] = useState<IOUCurrency>("EUR");
  const [category, setCategory] = useState("");
  const [note, setNote] = useState("");
  const [dueDate, setDueDate] = useState<Date | null>(null);

  const handleSubmit = () => {
    if (!name || !amount) return;

    addIOU({
      id: crypto.randomUUID(),
      name,
      amount: Number(amount),
      type,
      currency,
      category,
      note,
      dueDate,
      paid: false,
      createdAt: new Date(),
    });

    router.push("/");
  };

  return (
    <div className="space-y-6 p-4">
      <h1 className="text-2xl font-bold">Add IOU</h1>

      <div className="space-y-3">
        <input
          className="w-full rounded border p-2"
          placeholder="Person Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          className="w-full rounded border p-2"
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value === "" ? "" : Number(e.target.value))}
        />

        <select
          className="w-full rounded border p-2"
          value={type}
          onChange={(e) => setType(e.target.value as "owed" | "owing")}
        >
          <option value="owed">Owed to Me</option>
          <option value="owing">I Owe</option>
        </select>

        <select
          className="w-full rounded border p-2"
          value={currency}
          onChange={(e) => setCurrency(e.target.value as IOUCurrency)}
        >
          <option value="EUR">EUR (€)</option>
          <option value="USD">USD ($)</option>
          <option value="PI">PI (π)</option>
        </select>

        <input
          className="w-full rounded border p-2"
          placeholder="Category (optional)"
          value={category}
          onChange={(e) => setCategory(e.target.value)}
        />

        <input
          className="w-full rounded border p-2"
          placeholder="Note (optional)"
          value={note}
          onChange={(e) => setNote(e.target.value)}
        />

        <DueDatePicker value={dueDate} onChange={setDueDate} />
      </div>

      <button
        onClick={handleSubmit}
        className="w-full bg-blue-600 text-white py-3 rounded-lg font-semibold"
      >
        Add IOU
      </button>
    </div>
  );
}
