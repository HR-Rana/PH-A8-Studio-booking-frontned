import SectionHeading from "./SectionHeading";
import { IconStar } from "./AuthIcons";

const testimonials = [
  {
    quote:
      "StudioSpace made it so easy to find a production studio for our short film. Highly recommended.",
    name: "Tanvir Ahmed",
    role: "Filmmaker",
  },
  {
    quote:
      "Great platform! The booking process is smooth and the studios are top-notch.",
    name: "Rafiul Islam",
    role: "Photographer",
  },
  {
    quote:
      "Perfect for podcast recording. Excellent support and user-friendly interface.",
    name: "Mehedi Hasan",
    role: "Podcaster",
  },
];

export default function Testimonials() {
  return (
    <section>
      <SectionHeading
        title={
          <>
            What Our <span className="text-purple-400">Creators&rsquo;</span>{" "}
            Say
          </>
        }
        subtitle="Real experiences from our amazing community"
      />

      <div className="mt-10 grid gap-5 md:grid-cols-3">
        {testimonials.map((testimonial) => (
          <article
            key={testimonial.name}
            className="flex flex-col rounded-2xl bg-[#f5f4f8] p-6"
          >
            <p className="text-sm leading-relaxed text-[#2a2140]">
              &ldquo;{testimonial.quote}&rdquo;
            </p>
            <div className="mt-6 flex items-center gap-3">
              <span className="grid h-10 w-10 shrink-0 place-items-center rounded-full bg-gradient-to-br from-purple-500 to-fuchsia-500 text-xs font-bold text-white">
                {testimonial.name
                  .split(" ")
                  .map((word) => word[0])
                  .join("")}
              </span>
              <div>
                <p className="text-sm font-semibold text-[#1c1530]">
                  {testimonial.name}
                </p>
                <p className="text-xs text-black/50">{testimonial.role}</p>
              </div>
            </div>
            <div className="mt-4 flex justify-end gap-0.5">
              {[0, 1, 2, 3, 4].map((star) => (
                <IconStar key={star} className="h-3.5 w-3.5 text-amber-400" />
              ))}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
