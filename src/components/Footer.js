"use client";
import Image from "next/image";

const SOCIALS = [
  {
    label: "Email",
    href: "mailto:siamtechofficial1597@gmail.com",
    icon: <path d="M20 4H4c-1.1 0-1.99.9-1.99 2L2 18c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2V6c0-1.1-.9-2-2-2zm0 4l-8 5-8-5V6l8 5 8-5v2z" />,
  },
  {
    label: "GitHub",
    href: "https://github.com/Siam24857",
    icon: <path d="M12 .297c-6.63 0-12 5.373-12 12 0 5.303 3.438 9.8 8.205 11.385.6.113.82-.258.82-.577 0-.285-.01-1.04-.015-2.04-3.338.724-4.042-1.61-4.042-1.61C4.422 18.07 3.633 17.7 3.633 17.7c-1.087-.744.084-.729.084-.729 1.205.084 1.838 1.236 1.838 1.236 1.07 1.835 2.809 1.305 3.495.998.108-.776.417-1.305.76-1.605-2.665-.3-5.466-1.332-5.466-5.93 0-1.31.465-2.38 1.235-3.22-.135-.303-.54-1.523.105-3.176 0 0 1.005-.322 3.3 1.23.96-.267 1.98-.399 3-.405 1.02.006 2.04.138 3 .405 2.28-1.552 3.285-1.23 3.285-1.23.645 1.653.24 2.873.12 3.176.765.84 1.23 1.91 1.23 3.22 0 4.61-2.805 5.625-5.475 5.92.43.372.823 1.102.823 2.222 0 1.606-.015 2.896-.015 3.286 0 .315.21.69.825.57C20.565 22.092 24 17.592 24 12.297c0-6.627-5.373-12-12-12" />,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/sheikh-siam/",
    icon: <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />,
  },
 
];

export default function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="relative py-14 px-6 border-t border-white/5 bg-ink-900">
      <div className="container-page">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-8">
          <div className="flex items-center gap-3">
            <div className="relative w-10 h-10 overflow-hidden rounded-lg bg-ink-700 border border-white/10">
              <Image src="/favicon.ico" alt="Sheikh Siam Logo" fill className="object-cover p-2" />
            </div>
            <div>
              <h3 className="text-base font-semibold tracking-tight bg-gradient-to-r from-[#F3E8FF] to-[#FF6B6B] bg-clip-text text-transparent">
                Sheikh Siam
              </h3>
              <p className="text-xs text-muted">Frontend Developer</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            {SOCIALS.map((s) => (
              <a
                key={s.label}
                href={s.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={s.label}
                className="p-2.5 rounded-full border border-white/10 bg-white/[0.03] text-muted hover:text-[#FF6B6B] hover:border-[#FF6B6B]/40 hover:scale-110 transition-all duration-300"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  {s.icon}
                </svg>
              </a>
            ))}
          </div>
        </div>

        <div className="mt-10 pt-6 border-t border-white/5 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs text-muted-dim">
          <p>© {year} Sheikh Siam. All rights reserved.</p>
          <p>Built with Next.js, Tailwind CSS & Framer Motion.</p>
        </div>
      </div>
    </footer>
  );
}
