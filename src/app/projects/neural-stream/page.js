"use client";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { motion } from "framer-motion";

export default function CaseStudyPage() {
  return (
    <div className="bg-ink-900 text-foreground min-h-screen">
      <Navbar />
      <main className="pt-32">
        <section className="container-page mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7 }}
            className="flex flex-col md:flex-row gap-8 items-end mb-12"
          >
            <div className="flex-1">
              <span className="font-mono text-xs text-[#06b6d4] uppercase tracking-[0.3em] mb-4 block">
                Case Study / 03
              </span>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold tracking-tight">
                <span className="text-gradient-brand">NeuralStream</span> Processor
              </h1>
            </div>
            <div className="flex gap-4 mb-4">
              <span className="px-4 py-1 border border-white/10 rounded-full text-xs font-mono text-[#a78bfa]">
                v2.4.0-alpha
              </span>
              <span className="px-4 py-1 border border-[#06b6d4]/30 text-[#06b6d4] rounded-full text-xs font-mono">
                LIVE PREVIEW
              </span>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative w-full aspect-[21/9] overflow-hidden rounded-2xl border border-white/10"
          >
            <Image
              className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              alt="NeuralStream Processor Dashboard"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzsikAcCoHbkPh1B6G8bzF6K6yCrNv2fEHtjwJJSuBkJb5K-kHwIHpzlweEYGbcgE1osGPCXyLH2zzpr1Uoyhz2W2rYMmpFkomr6HQeikljdZ0gdgYMbChb0GkbAkWKdc8iUZ4_RCSgWyrs5HYvt1UaEhVQKXO4k_qGRilkxbZtIPJIbzadzhWTE_0NcBg6JajE2ZqGA7YWBKiCFp3KjRZkOr77TRTq3TGeRXgVQWRKPM2EKrLseeTC1H7MktPLg8VkxDzpJNYzWU-"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-ink-900 via-transparent to-transparent" />
          </motion.div>
        </section>

        <section className="container-page mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            <motion.div
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="md:col-span-5 glass-card p-8 rounded-2xl flex flex-col justify-between"
            >
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[#f43f5e] text-3xl">⚠</span>
                  <h2 className="text-xl font-bold text-white uppercase tracking-tighter">
                    The Problem
                  </h2>
                </div>
                <p className="text-muted-light leading-relaxed">
                  Traditional data pipelines suffered from massive latency spikes
                  during high-concurrency events. The existing architecture
                  couldn&apos;t handle asynchronous neural input streams without
                  bottlenecking the main execution thread, resulting in a 40%
                  drop in throughput under heavy loads.
                </p>
              </div>
              <div className="mt-8 pt-4 border-t border-white/5">
                <span className="font-mono text-xs text-[#06b6d4]">
                  01 // BOTTLENECK ANALYSIS
                </span>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-7 glass-card p-8 rounded-2xl relative overflow-hidden"
            >
              <div className="absolute -top-24 -right-24 w-64 h-64 rounded-full bg-gradient-to-br from-[#06b6d4]/20 to-[#7c3aed]/20 blur-3xl" />
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="text-[#06b6d4] text-3xl">⚡</span>
                  <h2 className="text-xl font-bold text-white uppercase tracking-tighter">
                    The Solution
                  </h2>
                </div>
                <p className="text-muted-light leading-relaxed mb-6">
                  I engineered a distributed actor-model architecture that
                  leverages non-blocking I/O and custom memory allocation pools.
                  By implementing a lock-free queueing system, we achieved
                  near-zero latency for stream ingestion.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="text-[#06b6d4] mt-1">✓</span>
                    <div>
                      <h4 className="font-bold text-white">
                        Distributed Actor System
                      </h4>
                      <p className="text-sm text-muted">
                        Decoupled processing units that scale horizontally.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="text-[#06b6d4] mt-1">✓</span>
                    <div>
                      <h4 className="font-bold text-white">
                        Custom Buffer Management
                      </h4>
                      <p className="text-sm text-muted">
                        Eliminated garbage collection pauses during critical
                        windows.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="container-page mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.7 }}
            className="grid grid-cols-1 md:grid-cols-12 gap-8"
          >
            <div className="md:col-span-4">
              <h3 className="text-xl font-bold text-white uppercase tracking-tighter mb-8">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "RUST", "KAFKA", "KUBERNETES", "PROTOBUF", "REDIS", "WEBRTC",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="px-4 py-2 font-mono text-xs border border-white/10 text-muted bg-white/[0.03] rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="md:col-span-8 glass-card p-8 rounded-2xl"
            >
              <div className="flex items-center gap-3 mb-8">
                <span className="text-[#a78bfa] text-3xl">💡</span>
                <h2 className="text-xl font-bold text-white uppercase tracking-tighter">
                  Lessons Learned
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="border-l-2 border-[#06b6d4]/30 pl-6">
                  <h4 className="font-mono text-xs text-[#a78bfa] mb-2">
                    01 / PREMATURE OPTIMIZATION
                  </h4>
                  <p className="text-sm text-muted">
                    Identified that the true bottleneck wasn&apos;t the CPU but
                    the network serialization overhead. Pivoted to binary
                    protocols early.
                  </p>
                </div>
                <div className="border-l-2 border-[#06b6d4]/30 pl-6">
                  <h4 className="font-mono text-xs text-[#a78bfa] mb-2">
                    02 / OBSERVABILITY IS KEY
                  </h4>
                  <p className="text-sm text-muted">
                    In distributed systems, debugging is impossible without
                    granular distributed tracing. Implemented OpenTelemetry from
                    day one.
                  </p>
                </div>
              </div>
            </motion.div>
          </motion.div>
        </section>

        <section className="container-page mx-auto mb-16 py-20 bg-white/[0.02] rounded-3xl relative overflow-hidden border border-white/5">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute inset-0 bg-[url('data:image/svg+xml,%3Csvg xmlns=%22http://www.w3.org/2000/svg%22 width=%22100%22 height=%22100%22 viewBox=%220 0 100 100%22%3E%3Cpath d=%22M11 18c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm48 25c3.866 0 7-3.134 7-7s-3.134-7-7-7-7 3.134-7 7 3.134 7 7 7zm-43-7c1.657 0 3-1.343 3-3s-1.343-3-3-3-3 1.343-3 3 1.343 3 3 3z%22 fill=%22%2306b6d4%22 fill-opacity=%220.1%22 fill-rule=%22evenodd%22/%3E%3C/svg%3E')] bg-repeat" />
          </div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="text-5xl mb-6">💻</span>
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight text-white mb-8 max-w-2xl mx-auto">
              Explore the source architecture.
            </h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <motion.a
                href="https://github.com"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="bg-gradient-to-r from-[#06b6d4] to-[#7c3aed] text-white px-10 py-4 font-bold flex items-center gap-3 rounded-full hover:shadow-[0_0_30px_rgba(6,182,212,0.6)] transition-all"
              >
                View Source on GitHub
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M7 17L17 7M17 7H7M17 7v10" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </motion.a>
              <motion.a
                href="#"
                whileHover={{ scale: 1.02, y: -2 }}
                whileTap={{ scale: 0.97 }}
                className="border border-[#06b6d4]/30 text-white px-10 py-4 font-bold flex items-center gap-3 rounded-full hover:bg-[#06b6d4]/10 transition-all"
              >
                Documentation
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path d="M12 6.007v12m0 0l-4-4m4 4 4-4" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" />
                </svg>
              </motion.a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
