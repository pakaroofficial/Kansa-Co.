"use client";

import { useState } from "react";
import { business } from "@/lib/business";

type Status = "idle" | "submitting" | "success" | "error";

export default function ContactForm() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("submitting");
    setErrorMsg("");

    const form = e.currentTarget;
    const data = new FormData(form);
    const payload = {
      name: String(data.get("name") || "").trim(),
      phone: String(data.get("phone") || "").trim(),
      message: String(data.get("message") || "").trim(),
    };

    if (!payload.name || !payload.phone) {
      setStatus("error");
      setErrorMsg("Please add your name and a phone number so we can reach you.");
      return;
    }

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      });

      if (!res.ok) throw new Error("Request failed");

      setStatus("success");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("Something went wrong sending this. Please try again, or call us directly.");
    }
  }

  if (status === "success") {
    return (
      <div className="border hairline-patina rounded-[3px] p-6 bg-patina/5">
        <p className="font-display text-xl text-ink">Message received.</p>
        <p className="mt-2 text-ink/70 text-sm">
          We usually reply within a day. If it&apos;s urgent, call us at{" "}
          <a href={business.phoneHref} className="text-brass">
            {business.phoneDisplay}
          </a>
          .
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div>
        <label htmlFor="name" className="block text-sm text-ink/70 mb-1.5">
          Name
        </label>
        <input
          id="name"
          name="name"
          type="text"
          required
          className="w-full border hairline rounded-[3px] px-4 py-2.5 bg-white focus:outline-none focus:border-brass"
        />
      </div>
      <div>
        <label htmlFor="phone" className="block text-sm text-ink/70 mb-1.5">
          Phone number
        </label>
        <input
          id="phone"
          name="phone"
          type="tel"
          required
          className="w-full border hairline rounded-[3px] px-4 py-2.5 bg-white focus:outline-none focus:border-brass"
        />
      </div>
      <div>
        <label htmlFor="message" className="block text-sm text-ink/70 mb-1.5">
          What are you looking for?
        </label>
        <textarea
          id="message"
          name="message"
          rows={4}
          className="w-full border hairline rounded-[3px] px-4 py-2.5 bg-white focus:outline-none focus:border-brass resize-none"
        />
      </div>

      {status === "error" && (
        <p className="text-sm text-red-700">{errorMsg}</p>
      )}

      <button
        type="submit"
        disabled={status === "submitting"}
        className="bg-ink text-ivory px-6 py-3 rounded-[3px] text-sm hover:bg-bark transition-colors disabled:opacity-60"
      >
        {status === "submitting" ? "Sending…" : "Send message"}
      </button>
    </form>
  );
}
