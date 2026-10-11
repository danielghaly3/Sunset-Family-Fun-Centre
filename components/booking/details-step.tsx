"use client";

import type { Customer } from "@/lib/booking/records";
import type { DetailErrors } from "@/lib/booking/validate";

const fields: {
  id: keyof Customer;
  label: string;
  type?: string;
  autoComplete: string;
  inputMode?: React.HTMLAttributes<HTMLInputElement>["inputMode"];
  hint?: string;
}[] = [
  { id: "name", label: "Full name", autoComplete: "name" },
  { id: "email", label: "Email address", type: "email", autoComplete: "email", inputMode: "email" },
  { id: "phone", label: "Phone number", type: "tel", autoComplete: "tel", inputMode: "tel", hint: "10 digits, like (519) 555-0123" },
];

const input =
  "w-full rounded-2xl border-2 bg-cream px-4 py-3.5 text-lg text-midnight transition-colors placeholder:text-ink-soft/70 focus:border-cobalt focus:outline-none focus-visible:outline-none aria-[invalid=true]:border-error";

export function DetailsStep({
  value,
  errors,
  onChange,
  onSubmit,
}: {
  value: Customer;
  errors: DetailErrors;
  onChange: (field: keyof Customer, v: string) => void;
  onSubmit: () => void;
}) {
  return (
    <form
      id="details-form"
      noValidate
      onSubmit={(e) => {
        e.preventDefault();
        onSubmit();
      }}
      className="space-y-6"
    >
      {fields.map((f) => {
        const err = errors[f.id];
        const describedBy = [f.hint && `${f.id}-hint`, err && `${f.id}-error`].filter(Boolean).join(" ") || undefined;
        return (
          <div key={f.id} className="flex flex-col gap-2">
            <label htmlFor={f.id} className="font-semibold">
              {f.label}
            </label>
            {f.hint && (
              <p id={`${f.id}-hint`} className="-mt-1 text-sm text-ink-soft">
                {f.hint}
              </p>
            )}
            <input
              id={f.id}
              name={f.id}
              type={f.type ?? "text"}
              autoComplete={f.autoComplete}
              inputMode={f.inputMode}
              value={value[f.id]}
              onChange={(e) => onChange(f.id, e.target.value)}
              aria-invalid={err ? true : undefined}
              aria-describedby={describedBy}
              className={`${input} ${err ? "border-error" : "border-midnight/15"}`}
            />
            {err && (
              <p id={`${f.id}-error`} className="text-sm font-semibold text-error">
                {err}
              </p>
            )}
          </div>
        );
      })}

      <div className="flex flex-col gap-2">
        <label htmlFor="notes" className="font-semibold">
          Special requests <span className="font-normal text-ink-soft">(optional)</span>
        </label>
        <textarea
          id="notes"
          name="notes"
          rows={4}
          value={value.notes}
          onChange={(e) => onChange("notes", e.target.value)}
          aria-invalid={errors.notes ? true : undefined}
          aria-describedby={`notes-count${errors.notes ? " notes-error" : ""}`}
          className={`${input} resize-y ${errors.notes ? "border-error" : "border-midnight/15"}`}
        />
        <p id="notes-count" className="text-right text-sm text-ink-soft">
          {value.notes.length}/500
        </p>
        {errors.notes && (
          <p id="notes-error" className="text-sm font-semibold text-error">
            {errors.notes}
          </p>
        )}
      </div>

      <p className="rounded-2xl bg-cream p-4 text-sm text-ink-soft">
        Demo form. Your details stay in this browser only. They are never sent to Sunset or anyone else.
      </p>
    </form>
  );
}
