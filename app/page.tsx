"use client";

import { useState } from "react";
import { useIOUs } from "@/components/iou-context";
import IOUCard from "@/components/iou-card";
import TestPaymentButton from "@/components/TestPaymentButton";
import type { IOUCurrency } from "@/lib/types";

export default function Home() {
  const { ious } = useIOUs();

  const [search, setSearch] = useState("");
  const [categoryFilter, setCategoryFilter] = useState<string>("ALL");
  const [currencyFilter, setCurrencyFilter] = useState<IOUCurrency | "ALL">(
    "ALL"
  );

  const active = ious.filter((i) => !i.paid);
  const categories = Array.from(new Set(active.map((i) => i.category)))
    .filter(Boolean)
    .sort();

  const filteredActive = active.filter((iou) => {
    const matchesSearch =
      !search.trim() ||
      iou.name.toLowerCase().includes(search.trim().toLowerCase());

    const matchesCategory =
      categoryFilter === "ALL" || iou.category === categoryFilter;

    const matchesCurrency =
      currencyFilter === "ALL" || iou.currency === currencyFilter;

    return matchesSearch && matchesCategory && matchesCurrency;
  });

  return (
    <div className="space-y-6">

      {/* 🔥 Bottone Test Payment */}
      <div className="w-full flex justify-center mt-4">
        <TestPaymentButton />
      </div>

      <div className="pt-4 pb-2">
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          IOU Ledger Pro
        </h1>
        <p className="mt-1 text-sm text-gray-500">
          Track who owes what, across currencies.
        </p>
      </div>

      {/* ...resto della pagina */}
    </div>
  );
}
