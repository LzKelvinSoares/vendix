"use client";

import { useEffect, useMemo, useState } from "react";
import { seedItems } from "@/lib/client/fixtures/seed-items";
import { VENDIX_ITEMS_STORAGE_KEY } from "@/shared/constants/database";
import type { DashboardMetrics, ItemStatus, VendixItem } from "@/shared/types";

export function useVendixItems() {
  const [items, setItems] = useState<VendixItem[]>([]);

  useEffect(() => {
    const stored = window.localStorage.getItem(VENDIX_ITEMS_STORAGE_KEY);
    setItems(stored ? JSON.parse(stored) : seedItems());
  }, []);

  useEffect(() => {
    if (items.length) {
      window.localStorage.setItem(VENDIX_ITEMS_STORAGE_KEY, JSON.stringify(items));
    }
  }, [items]);

  const metrics = useMemo(() => calculateDashboardMetrics(items), [items]);

  function addItem(item: VendixItem) {
    setItems((current) => [item, ...current]);
  }

  function updateStatus(id: string, status: ItemStatus) {
    setItems((current) =>
      current.map((item) =>
        item.id === id
          ? {
              ...item,
              status,
              soldAt: status === "sold" ? new Date().toISOString() : item.soldAt,
              daysToSale:
                status === "sold"
                  ? Math.max(1, Math.round((Date.now() - new Date(item.createdAt).getTime()) / 86_400_000))
                  : item.daysToSale,
            }
          : item,
      ),
    );
  }

  return { items, metrics, addItem, updateStatus };
}

function calculateDashboardMetrics(items: VendixItem[]): DashboardMetrics {
  const sold = items.filter((item) => item.status === "sold");
  const active = items.filter((item) => item.status === "for-sale");
  const totalProfit = items.reduce((sum, item) => sum + Math.max(0, item.margin), 0);
  const realizedProfit = sold.reduce((sum, item) => sum + Math.max(0, item.margin), 0);
  const averageDays = sold.length
    ? Math.round(sold.reduce((sum, item) => sum + (item.daysToSale ?? 8), 0) / sold.length)
    : 0;
  const categoryTotals = items.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] ?? 0) + item.margin;
    return acc;
  }, {});
  const topCategory = Object.entries(categoryTotals).sort((a, b) => b[1] - a[1])[0]?.[0] ?? "Not enough data";

  return {
    totalProfit,
    realizedProfit,
    averageDays,
    topCategory,
    activeCount: active.length,
    soldCount: sold.length,
  };
}
