import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function CaseStudyPage() {
  return (
    <div className="bg-background text-on-surface">
      <Navbar />
      <main className="pt-32">
        {/* Hero Section */}
        <section className="px-margin-page max-w-container-max mx-auto mb-section-gap">
          <div className="flex flex-col md:flex-row gap-gutter items-end mb-12">
            <div className="flex-1">
              <span className="font-code-sm text-primary uppercase tracking-[0.3em] mb-4 block">
                Case Study / 03
              </span>
              <h1 className="font-display-xl text-display-xl text-primary drop-shadow-[0_0_10px_rgba(57,255,20,0.4)]">
                NeuralStream Processor
              </h1>
            </div>
            <div className="flex gap-4 mb-4">
              <div className="px-4 py-1 border border-outline-variant rounded-full text-code-sm font-code-sm">
                v2.4.0-alpha
              </div>
              <div className="px-4 py-1 border border-primary-container text-primary-container rounded-full text-code-sm font-code-sm">
                LIVE PREVIEW
              </div>
            </div>
          </div>
          <div className="relative w-full aspect-[21/9] overflow-hidden rounded-lg neon-glow">
            <Image
              className="w-full h-full object-cover grayscale opacity-80 hover:grayscale-0 hover:opacity-100 transition-all duration-700"
              alt="NeuralStream Processor Dashboard"
              src="https://lh3.googleusercontent.com/aida-public/AB6AXuDzsikAcCoHbkPh1B6G8bzF6K6yCrNv2fEHtjwJJSuBkJb5K-kHwIHpzlweEYGbcgE1osGPCXyLH2zzpr1Uoyhz2W2rYMmpFkomr6HQeikljdZ0gdgYMbChb0GkbAkWKdc8iUZ4_RCSgWyrs5HYvt1UaEhVQKXO4k_qGRilkxbZtIPJIbzadzhWTE_0NcBg6JajE2ZqGA7YWBKiCFp3KjRZkOr77TRTq3TGeRXgVQWRKPM2EKrLseeTC1H7MktPLg8VkxDzpJNYzWU-"
              fill
            />
            <div className="absolute inset-0 bg-gradient-to-t from-background via-transparent to-transparent"></div>
          </div>
        </section>

        {/* Problem & Solution (Bento Style) */}
        <section className="px-margin-page max-w-container-max mx-auto mb-section-gap">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Problem */}
            <div className="md:col-span-5 glass-card p-10 rounded-xl flex flex-col justify-between">
              <div>
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    warning
                  </span>
                  <h2 className="font-headline-md text-headline-md text-primary uppercase tracking-tighter">
                    The Problem
                  </h2>
                </div>
                <p className="font-body-lg text-body-lg text-on-surface-variant leading-relaxed">
                  Traditional data pipelines suffered from massive latency spikes
                  during high-concurrency events. The existing architecture
                  couldn&apos;t handle asynchronous neural input streams without
                  bottlenecking the main execution thread, resulting in a 40%
                  drop in throughput under heavy loads.
                </p>
              </div>
              <div className="mt-12 pt-6 border-t border-outline-variant/30">
                <span className="font-code-sm text-code-sm text-primary">
                  01 // BOTTLENECK ANALYSIS
                </span>
              </div>
            </div>

            {/* Solution */}
            <div className="md:col-span-7 glass-card p-10 rounded-xl relative overflow-hidden">
              <div className="bg-glow-gradient absolute -top-24 -right-24 w-64 h-64 rounded-full"></div>
              <div className="relative z-10">
                <div className="flex items-center gap-3 mb-6">
                  <span className="material-symbols-outlined text-primary text-3xl">
                    bolt
                  </span>
                  <h2 className="font-headline-md text-headline-md text-primary uppercase tracking-tighter">
                    The Solution
                  </h2>
                </div>
                <p className="font-body-lg text-body-lg text-on-surface leading-relaxed mb-6">
                  I engineered a distributed actor-model architecture that
                  leverages non-blocking I/O and custom memory allocation pools.
                  By implementing a lock-free queueing system, we achieved
                  near-zero latency for stream ingestion.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary-container mt-1">
                      check_circle
                    </span>
                    <div>
                      <h4 className="font-bold text-primary">
                        Distributed Actor System
                      </h4>
                      <p className="text-on-surface-variant text-sm">
                        Decoupled processing units that scale horizontally.
                      </p>
                    </div>
                  </li>
                  <li className="flex items-start gap-3">
                    <span className="material-symbols-outlined text-primary-container mt-1">
                      check_circle
                    </span>
                    <div>
                      <h4 className="font-bold text-primary">
                        Custom Buffer Management
                      </h4>
                      <p className="text-on-surface-variant text-sm">
                        Eliminated garbage collection pauses during critical
                        windows.
                      </p>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Tech Stack & Lessons (Asymmetric) */}
        <section className="px-margin-page max-w-container-max mx-auto mb-section-gap">
          <div className="grid grid-cols-1 md:grid-cols-12 gap-gutter">
            {/* Tech Stack */}
            <div className="md:col-span-4">
              <h3 className="font-headline-md text-headline-md text-primary uppercase tracking-tighter mb-8">
                Tech Stack
              </h3>
              <div className="flex flex-wrap gap-3">
                {[
                  "RUST",
                  "KAFKA",
                  "KUBERNETES",
                  "PROTOBUF",
                  "REDIS",
                  "WEBRTC",
                ].map((tech) => (
                  <span
                    key={tech}
                    className="bg-surface-container-highest px-4 py-2 font-code-sm text-code-sm border border-outline-variant/50"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
            {/* Lessons Learned */}
            <div className="md:col-span-8 glass-card p-10 rounded-xl">
              <div className="flex items-center gap-3 mb-8">
                <span className="material-symbols-outlined text-primary text-3xl">
                  lightbulb
                </span>
                <h2 className="font-headline-md text-headline-md text-primary uppercase tracking-tighter">
                  Lessons Learned
                </h2>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
                <div className="border-l-2 border-primary-container pl-6">
                  <h4 className="font-code-sm text-primary mb-2">
                    01 / PREMATURE OPTIMIZATION
                  </h4>
                  <p className="text-on-surface-variant text-sm">
                    Identified that the true bottleneck wasn&apos;t the CPU but
                    the network serialization overhead. Pivoted to binary
                    protocols early.
                  </p>
                </div>
                <div className="border-l-2 border-primary-container pl-6">
                  <h4 className="font-code-sm text-primary mb-2">
                    02 / OBSERVABILITY IS KEY
                  </h4>
                  <p className="text-on-surface-variant text-sm">
                    In distributed systems, debugging is impossible without
                    granular distributed tracing. Implemented OpenTelemetry from
                    day one.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Final CTA */}
        <section className="px-margin-page max-w-container-max mx-auto mb-section-gap py-20 bg-surface-container-low rounded-3xl relative overflow-hidden border border-outline-variant/20">
          <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10"></div>
          <div className="relative z-10 flex flex-col items-center text-center">
            <span className="material-symbols-outlined text-primary-container text-6xl mb-6">
              terminal
            </span>
            <h2 className="font-display-xl text-headline-lg md:text-display-xl text-primary mb-8 max-w-2xl mx-auto">
              Explore the source architecture.
            </h2>
            <div className="flex flex-col sm:flex-row gap-6">
              <a
                className="bg-primary-container text-on-primary px-10 py-4 font-bold flex items-center gap-3 hover:shadow-[0_0_30px_rgba(57,255,20,0.6)] transition-all transform hover:-translate-y-1"
                href="https://github.com"
              >
                View Source on GitHub
                <span className="material-symbols-outlined">north_east</span>
              </a>
              <a
                className="border border-primary-container text-primary px-10 py-4 font-bold flex items-center gap-3 hover:bg-primary-container/10 transition-all"
                href="#"
              >
                Documentation
                <span className="material-symbols-outlined">menu_book</span>
              </a>
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
