"use client";

import type { ChangeEvent, FormEvent } from "react";
import { useState } from "react";
import { Dashboard } from "@/components/vendix/dashboard/Dashboard";
import { Evaluation } from "@/components/vendix/evaluation/Evaluation";
import { HeroPanel } from "@/components/vendix/hero/HeroPanel";
import { ItemDetail } from "@/components/vendix/item-detail/ItemDetail";
import { Metrics } from "@/components/vendix/metrics/Metrics";
import { TopNav } from "@/components/vendix/navigation/TopNav";
import { NewItemForm } from "@/components/vendix/new-item/NewItemForm";
import { useVendixItems } from "@/hooks/useVendixItems";
import { requestEvaluation } from "@/lib/client/services/evaluation/evaluation-client.service";
import type { EvaluationInput } from "@/shared/types";

type View = "dashboard" | "new" | "evaluation" | "detail" | "metrics";

const INITIAL_FORM: EvaluationInput = {
  name: "",
  category: "Electronics",
  brand: "",
  purchasePrice: 50,
  image: undefined,
};

export default function VendixApp() {
  const { items, metrics, addItem, updateStatus } = useVendixItems();
  const [activeView, setActiveView] = useState<View>("dashboard");
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const [isEvaluating, setIsEvaluating] = useState(false);
  const [evaluationError, setEvaluationError] = useState<string | null>(null);
  const [form, setForm] = useState<EvaluationInput>(INITIAL_FORM);

  const selectedItem = items.find((item) => item.id === selectedId) ?? items[0];

  function navigate(view: View, id?: string) {
    if (id) setSelectedId(id);
    setActiveView(view);
  }

  function handleImage(event: ChangeEvent<HTMLInputElement>) {
    const file = event.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = () => setForm((current) => ({ ...current, image: String(reader.result) }));
    reader.readAsDataURL(file);
  }

  async function evaluate(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsEvaluating(true);
    setEvaluationError(null);

    try {
      const evaluated = await requestEvaluation(form);
      addItem(evaluated);
      setSelectedId(evaluated.id);
      setActiveView("evaluation");
    } catch (error) {
      setEvaluationError(error instanceof Error ? error.message : "Unable to evaluate item. Please try again.");
    } finally {
      setIsEvaluating(false);
    }
  }

  return (
    <main className="app-shell">
      <section className="hero-panel">
        <TopNav onDashboard={() => navigate("dashboard")} onMetrics={() => navigate("metrics")} onNewItem={() => navigate("new")} />
        <HeroPanel metrics={metrics} onDashboard={() => navigate("dashboard")} onNewItem={() => navigate("new")} />
      </section>

      <section className="content-panel">
        {activeView === "dashboard" && <Dashboard items={items} metrics={metrics} onNew={() => navigate("new")} onOpen={(id) => navigate("detail", id)} />}
        {activeView === "new" && (
          <NewItemForm form={form} setForm={setForm} onImage={handleImage} onSubmit={evaluate} isEvaluating={isEvaluating} error={evaluationError} />
        )}
        {activeView === "evaluation" && selectedItem && <Evaluation item={selectedItem} onDetail={() => navigate("detail", selectedItem.id)} onStatus={updateStatus} />}
        {activeView === "detail" && selectedItem && <ItemDetail item={selectedItem} onStatus={updateStatus} />}
        {activeView === "metrics" && <Metrics items={items} metrics={metrics} />}
      </section>
    </main>
  );
}
