"use client";

import { Plus, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { FormInput, FormTextarea } from "./form-layout";

interface NestedFieldArrayProps {
  label: string;
  items: any[];
  onAdd: () => void;
  onRemove: (index: number) => void;
  onItemChange: (index: number, field: string, value: any) => void;
  fields: Array<{
    name: string;
    label: string;
    type?: "text" | "textarea";
    placeholder?: string;
  }>;
}

export function NestedFieldArray({
  label,
  items,
  onAdd,
  onRemove,
  onItemChange,
  fields,
}: NestedFieldArrayProps) {
  return (
    <div className="space-y-4">
      <div className="flex justify-between items-center">
        <h3 className="font-semibold text-foreground">{label}</h3>
        <Button
          type="button"
          variant="outline"
          onClick={onAdd}
          className="flex items-center gap-1"
        >
          <Plus className="w-4 h-4" />
          Add {label}
        </Button>
      </div>

      <div className="space-y-4">
        {items.map((item, index) => (
          <div
            key={index}
            className="p-4 rounded-lg border border-border bg-surface space-y-3"
          >
            <div className="flex justify-between items-start">
              <span className="text-sm font-medium text-muted">
                Item {index + 1}
              </span>
              <button
                type="button"
                onClick={() => onRemove(index)}
                className="p-1 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded transition-colors"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
              {fields.map((field) => (
                <div key={field.name}>
                  <label className="block text-xs font-medium text-muted mb-1">
                    {field.label}
                  </label>
                  {field.type === "textarea" ? (
                    <FormTextarea
                      value={item[field.name] || ""}
                      onChange={(e) =>
                        onItemChange(index, field.name, e.target.value)
                      }
                      placeholder={field.placeholder}
                      rows={3}
                    />
                  ) : (
                    <FormInput
                      value={item[field.name] || ""}
                      onChange={(e) =>
                        onItemChange(index, field.name, e.target.value)
                      }
                      placeholder={field.placeholder}
                    />
                  )}
                </div>
              ))}
            </div>
          </div>
        ))}

        {items.length === 0 && (
          <div className="p-4 rounded-lg border-2 border-dashed border-border text-center text-muted">
            No items yet. Click "Add {label}" to create one.
          </div>
        )}
      </div>
    </div>
  );
}
