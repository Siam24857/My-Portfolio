export default function Footer() {
  return (
    <footer className="w-full px-margin-page py-12 flex flex-col md:flex-row justify-between items-center gap-gutter border-t border-outline-variant/20 bg-surface-container-lowest">
      <div className="font-headline-md text-primary font-bold">DANIEL</div>
      <div className="font-code-sm text-code-sm uppercase tracking-tighter text-on-surface-variant opacity-80">
        © 2024 DANIEL. ENGINEERED FOR PERFORMANCE.
      </div>
      <div className="flex gap-gutter">
        <a
          className="font-code-sm text-code-sm uppercase tracking-tighter text-on-tertiary-container hover:text-primary-fixed transition-colors"
          href="#"
        >
          GITHUB
        </a>
        <a
          className="font-code-sm text-code-sm uppercase tracking-tighter text-on-tertiary-container hover:text-primary-fixed transition-colors"
          href="#"
        >
          LINKEDIN
        </a>
        <a
          className="font-code-sm text-code-sm uppercase tracking-tighter text-on-tertiary-container hover:text-primary-fixed transition-colors"
          href="#"
        >
          TWITTER
        </a>
      </div>
    </footer>
  );
}
