import type { ChangeEvent, Dispatch, FormEvent, SetStateAction } from "react";
import { PRODUCT_CATEGORIES } from "@/shared/constants/forms";
import type { EvaluationInput } from "@/shared/types";

type NewItemFormProps = {
  form: EvaluationInput;
  setForm: Dispatch<SetStateAction<EvaluationInput>>;
  onImage: (event: ChangeEvent<HTMLInputElement>) => void;
  onSubmit: (event: FormEvent<HTMLFormElement>) => void;
  isEvaluating: boolean;
  error?: string | null;
};

export function NewItemForm({ form, setForm, onImage, onSubmit, isEvaluating, error }: NewItemFormProps) {
  return (
    <form className="scan-grid" onSubmit={onSubmit}>
      <div className="camera-card">
        <div className="photo-preview">
          {form.image ? <img src={form.image} alt="Uploaded product" /> : <span>📷</span>}
        </div>
        <label className="upload-button">
          Camera or gallery
          <input type="file" accept="image/*" capture="environment" onChange={onImage} />
        </label>
        <p>Use a clear photo from the front, brand label, and any visible defects for better AI recognition.</p>
      </div>

      <div className="form-card">
        <p className="eyebrow">New item</p>
        <h2>Tell Vendix what you know</h2>
        <label>
          Item name
          <input value={form.name} placeholder="e.g. iPhone 13 Pro 128GB" onChange={(event) => setForm((current) => ({ ...current, name: event.target.value }))} />
        </label>
        <div className="two-columns">
          <label>
            Category
            <select value={form.category} onChange={(event) => setForm((current) => ({ ...current, category: event.target.value }))}>
              {PRODUCT_CATEGORIES.map((category) => <option key={category}>{category}</option>)}
            </select>
          </label>
          <label>
            Brand
            <input value={form.brand ?? ""} placeholder="Optional" onChange={(event) => setForm((current) => ({ ...current, brand: event.target.value }))} />
          </label>
        </div>
        <label>
          Purchase price (€)
          <input type="number" min="0" value={form.purchasePrice} onChange={(event) => setForm((current) => ({ ...current, purchasePrice: Number(event.target.value) }))} />
        </label>
        {error ? <p className="form-error" role="alert">{error}</p> : null}
        <button className="primary wide" disabled={isEvaluating}>{isEvaluating ? "Analyzing image and comps…" : "Evaluate resale value"}</button>
      </div>
    </form>
  );
}

