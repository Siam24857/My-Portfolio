"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const SOCIALS = [
  {
    label: "Email",
    value: "siamtechofficial1597@gmail.com",
    href: "mailto:siamtechofficial1597@gmail.com",
    icon: (
      <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />
    ),
  },
  {
    label: "GitHub",
    value: "@Siam24857",
    href: "https://github.com/Siam24857",
    icon: (
      <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />
    ),
  },
  {
    label: "LinkedIn",
    value: "in/sheikh-siam",
    href: "https://www.linkedin.com/in/sheikh-siam/",
    icon: (
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    ),
  },
   
];

export default function Contact() {
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [status, setStatus] = useState("idle");

  const handleChange = (e) =>
    setFormData((p) => ({ ...p, [e.target.name]: e.target.value }));

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;
    setStatus("submitting");
    setTimeout(() => {
      setStatus("success");
      setFormData({ name: "", email: "", message: "" });
      setTimeout(() => setStatus("idle"), 5000);
    }, 1800);
  };

  return (
    <section className="relative py-32 px-6 bg-ink-900" id="contacts">
      <div className="container-page">
        <div className="grid lg:grid-cols-2 gap-14 lg:gap-20">
          <div>
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="section-label mb-6"
            >
              Contact
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.7 }}
              className="text-4xl sm:text-5xl font-extrabold tracking-tight leading-[1.1] mb-6"
            >
              Let&apos;s build something{" "}
              <span className="text-gradient-brand">exceptional</span>
            </motion.h2>
            <p className="text-muted leading-relaxed max-w-md mb-12">
              Have a project, a role, or just want to connect? I&apos;m always open to
              meaningful frontend work and collaborations.
            </p>

            <div className="space-y-4">
              {SOCIALS.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex items-center gap-4 p-4 rounded-2xl border border-white/8 bg-white/[0.03] hover:border-[#FF6B6B]/40 hover:bg-white/[0.05] transition-all duration-300"
                >
                  <span className="flex items-center justify-center w-11 h-11 rounded-xl bg-white/5 text-[#FF6B6B] group-hover:scale-110 group-hover:bg-[#FF6B6B]/10 transition-all duration-300">
                    <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24">
                      {s.icon}
                    </svg>
                  </span>
                  <span>
                    <span className="block text-[0.7rem] uppercase tracking-wider text-muted">
                      {s.label}
                    </span>
                    <span className="text-sm font-medium text-white/90 group-hover:text-white">
                      {s.value}
                    </span>
                  </span>
                </a>
              ))}
            </div>

            {/* Availability badge */}
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="mt-8 flex items-center gap-3 text-sm text-muted bg-white/[0.03] border border-white/5 rounded-full px-5 py-2.5 w-fit"
            >
              <span className="relative flex h-2.5 w-2.5">
                <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />
                <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-green-400" />
              </span>
              Available for freelance & collaboration
            </motion.div>
          </div>

          <motion.form
            onSubmit={handleSubmit}
            initial={{ opacity: 0, y: 24 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="rounded-3xl border border-white/8 bg-white/[0.03] p-7 sm:p-9"
          >
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="h-full min-h-[300px] flex flex-col items-center justify-center text-center gap-3 text-[#FF6B6B]"
              >
                <svg className="w-12 h-12" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M5 13l4 4L19 7" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
                <p className="text-white font-semibold">Thank you!</p>
                <p className="text-muted text-sm">I&apos;ll get back to you soon.</p>
              </motion.div>
            ) : (
              <div className="space-y-6">
                {[
                  { name: "name", label: "Name", type: "text" },
                  { name: "email", label: "Email", type: "email" },
                ].map((field) => (
                  <div key={field.name} className="relative">
                    <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">
                      {field.label}
                    </label>
                    <input
                      name={field.name}
                      type={field.type}
                      value={formData[field.name]}
                      onChange={handleChange}
                      placeholder={`Your ${field.label.toLowerCase()}`}
                      className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted-dim focus:border-[#FF6B6B]/60 focus:bg-white/[0.06] outline-none transition-all"
                    />
                  </div>
                ))}
                <div className="relative">
                  <label className="text-xs uppercase tracking-widest text-muted font-semibold block mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    rows={4}
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project"
                    className="w-full bg-white/[0.04] border border-white/10 rounded-xl px-4 py-3 text-white placeholder:text-muted-dim focus:border-[#FF6B6B]/60 focus:bg-white/[0.06] outline-none transition-all resize-none"
                  />
                </div>
                <motion.button
                  type="submit"
                  disabled={status === "submitting"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.97 }}
                  className="w-full inline-flex items-center justify-center gap-2 bg-white text-ink-900 font-semibold px-6 py-3.5 rounded-full hover:bg-[#F3E8FF] transition-colors duration-300 disabled:opacity-70"
                >
                  {status === "submitting" ? (
                    <span className="flex gap-1.5">
                      <span className="w-1.5 h-1.5 rounded-full bg-ink-900 animate-bounce" style={{ animationDelay: "0ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-ink-900 animate-bounce" style={{ animationDelay: "150ms" }} />
                      <span className="w-1.5 h-1.5 rounded-full bg-ink-900 animate-bounce" style={{ animationDelay: "300ms" }} />
                    </span>
                  ) : (
                    <>
                      Send Message
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path d="M5 12h14m-6-6l6 6-6 6" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                      </svg>
                    </>
                  )}
                </motion.button>
              </div>
            )}
          </motion.form>
        </div>
      </div>
    </section>
  );
}
