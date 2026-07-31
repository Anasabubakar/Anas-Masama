'use client';

export function Footer() {
  const year = new Date().getFullYear();

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className="relative z-[1] flex flex-wrap justify-between gap-3 border-t border-[#f3f2ee]/[0.08] px-5 py-10 sm:px-8 lg:px-14">
      <p className="m-0 text-[13px] text-[#f3f2ee]/45">© {year} Anas Abubakar Masama</p>
      <button
        type="button"
        onClick={scrollToTop}
        className="inline-block text-[13px] font-semibold text-[#f3f2ee]/60 transition-[color,transform] duration-200 ease-out hover:-translate-y-0.5 hover:text-[#34c97e]"
      >
        Back to top ↑
      </button>
    </footer>
  );
}
