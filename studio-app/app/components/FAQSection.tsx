"use client";

import { useState } from "react";
import Image from "next/image";
import purplePhotoStudio from "../../public/images/purple-photo-studio.jpg";

const faqs = [
  {
    question: "Is StudioSpace free to use?",
    answer:
      "Signing up and browsing studios is completely free. You only pay for the studio bookings you make.",
  },
  {
    question: "Can I cancel a booking?",
    answer:
      "Yes, you can cancel from your dashboard. Cancellations made at least 24 hours before your slot are fully refunded.",
  },
  {
    question: "How do I list my studio?",
    answer:
      "Create an account, choose Add Your Studio, and fill in your details, photos and pricing. Our team verifies and publishes it shortly.",
  },
];

export default function FAQSection() {
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  return (
    <section>
      <div className="grid items-stretch gap-8 lg:grid-cols-[1fr_1.4fr]">
        <div className="relative min-h-[260px] overflow-hidden rounded-2xl">
          <Image
            src={purplePhotoStudio}
            alt="Filmmaker working in a studio"
            fill
            sizes="(min-width: 1024px) 40vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-[#0d0a14]/15" />
        </div>

        <div>
          <h2 className="text-2xl font-bold text-white sm:text-3xl">
            Frequently Asked <span className="text-purple-400">Questions</span>
          </h2>
          <p className="mt-2 text-sm text-white/60">
            Find quick answers to common questions.
          </p>

          <div className="mt-6 space-y-3">
            {faqs.map((faq, index) => (
              <div
                key={faq.question}
                className="rounded-xl border border-white/10 bg-[#171223]"
              >
                <button
                  type="button"
                  onClick={() =>
                    setOpenIndex(openIndex === index ? null : index)
                  }
                  aria-expanded={openIndex === index}
                  className="flex w-full items-center justify-between gap-4 px-5 py-4 text-left text-sm font-semibold text-white"
                >
                  {faq.question}
                  <span
                    aria-hidden="true"
                    className="grid h-6 w-6 shrink-0 place-items-center rounded-full border border-purple-500/40 text-lg leading-none text-purple-400"
                  >
                    {openIndex === index ? "−" : "+"}
                  </span>
                </button>
                {openIndex === index ? (
                  <p className="px-5 pb-4 text-sm leading-relaxed text-white/60">
                    {faq.answer}
                  </p>
                ) : null}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
