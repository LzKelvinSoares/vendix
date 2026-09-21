import type { ItemStatus } from "@/shared/types";

export function statusLabel(status: ItemStatus) {
  return {
    "for-sale": "For sale",
    sold: "Sold",
    archived: "Archived",
    draft: "Draft",
  }[status];
}
