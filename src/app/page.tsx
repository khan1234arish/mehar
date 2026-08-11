import Link from 'next/link';

const products = [
  {
    name: 'EV Battery Systems',
    text: 'Reliable battery systems designed for modern electric mobility.',
    tone: 'bg-emerald-100',
  },
  {
    name: 'Solar Energy Storage',
    text: 'Store clean energy and keep essential systems running longer.',
    tone: 'bg-sky-100',
  },
  {
    name: 'Industrial Power',
    text: 'Practical power solutions for demanding industrial environments.',
    tone: 'bg-amber-100',
  },
];

const benefits = [
  ['01', 'Built for real work', 'Industrial-grade thinking from concept to delivery.'],
  ['02', 'Clear technical support', 'Talk directly with a team that understands your requirements.'],
  ['03', 'Flexible solutions', 'Choose a catalogue system or create a tailored battery pack.'],
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-[#f8faf9] text-slate-950">
      <header className="border-b border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-6 py-5 lg:px-8">
          <Link href="/" className="text-xl font-black tracking-[0.2em] text-slate-950">
            MEHAR
          </Link>
          <nav className="hidden items-center gap-8 text-sm font-medium text-slate-600 md:flex">
            <Link href="#solutions" className="transition hover:text-emerald-700">Solutions</Link>
            <Link href="#process" className="transition hover:text-emerald-700">How we work</Link>
            <Link href="/about" className="transition hover:text-emerald-700">About</Link>
          </nav>
          <Link href="/rfq" className="rounded-full bg-slate-950 px-5 py-2.5 text-sm font-semibold text-white transition hover:bg-emerald-700">
            Request a quote
          </Link>
        </div>
      </header>

      <main>
        <section className="mx-auto grid max-w-7xl gap-12 px-6 pb-20 pt-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:px-8 lg:pb-28 lg:pt-24">
          <div>
            <p className="mb-6 text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">Battery systems for a moving world</p>
            <h1 className="max-w-3xl text-5xl font-black leading-[1.02] tracking-tight sm:text-6xl lg:text-7xl">
              Power that keeps your next move going.
            </h1>
            <p className="mt-7 max-w-xl text-lg leading-8 text-slate-600">
              MEHAR supplies dependable battery systems and energy storage solutions for EV, solar, and industrial applications.
            </p>
            <div className="mt-9 flex flex-wrap gap-4">
              <Link href="/products" className="rounded-full bg-emerald-600 px-6 py-3.5 text-sm font-bold text-white transition hover:bg-emerald-700">Explore solutions</Link>
              <Link href="/contact" className="rounded-full border border-slate-300 bg-white px-6 py-3.5 text-sm font-bold text-slate-900 transition hover:border-slate-950">Talk to our team</Link>
            </div>
            <div className="mt-12 flex flex-wrap gap-x-8 gap-y-3 border-t border-slate-200 pt-6 text-sm text-slate-600">
              <span><strong className="text-slate-950">B2B</strong> supply</span>
              <span><strong className="text-slate-950">OEM</strong> support</span>
              <span><strong className="text-slate-950">Custom</strong> engineering</span>
            </div>
          </div>

          <div className="rounded-[2rem] bg-slate-200 p-3 shadow-sm">
            <div className="flex min-h-[420px] flex-col justify-between rounded-[1.5rem] bg-gradient-to-br from-slate-300 via-slate-100 to-emerald-100 p-6 sm:p-8">
              <div className="flex items-center justify-between text-xs font-bold uppercase tracking-[0.18em] text-slate-500">
                <span>Image placeholder</span><span>01 / 03</span>
              </div>
              <div>
                <div className="mb-6 h-24 w-24 rounded-3xl border-2 border-dashed border-slate-400 bg-white/40" />
                <p className="max-w-xs text-3xl font-bold leading-tight text-slate-900">A simple visual space for your product photography.</p>
              </div>
            </div>
          </div>
        </section>

        <section id="solutions" className="border-y border-slate-200 bg-white">
          <div className="mx-auto max-w-7xl px-6 py-20 lg:px-8">
            <div className="max-w-2xl">
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">What we do</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Solutions without the clutter.</h2>
              <p className="mt-5 text-lg leading-8 text-slate-600">Start with a proven system or work with us on a pack designed around your requirements.</p>
            </div>
            <div className="mt-12 grid gap-5 md:grid-cols-3">
              {products.map((product, index) => (
                <Link href="/products" key={product.name} className="group rounded-3xl border border-slate-200 bg-white p-4 transition hover:-translate-y-1 hover:border-emerald-300 hover:shadow-lg">
                  <div className={`flex h-56 items-end rounded-2xl ${product.tone} p-5`}>
                    <span className="rounded-full bg-white/80 px-3 py-1.5 text-xs font-bold uppercase tracking-wider text-slate-600">Image placeholder {index + 1}</span>
                  </div>
                  <div className="p-3 pt-6">
                    <h3 className="text-xl font-bold">{product.name}</h3>
                    <p className="mt-3 text-sm leading-6 text-slate-600">{product.text}</p>
                    <span className="mt-6 inline-block text-sm font-bold text-emerald-700">View solution →</span>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        <section id="process" className="mx-auto max-w-7xl px-6 py-20 lg:px-8 lg:py-28">
          <div className="grid gap-12 lg:grid-cols-[0.8fr_1.2fr]">
            <div>
              <p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-700">How we work</p>
              <h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Straightforward from first conversation to delivery.</h2>
            </div>
            <div className="divide-y divide-slate-200 border-y border-slate-200">
              {benefits.map(([number, title, text]) => (
                <div key={number} className="grid gap-4 py-7 sm:grid-cols-[70px_1fr]">
                  <span className="text-sm font-black text-emerald-700">{number}</span>
                  <div><h3 className="text-xl font-bold">{title}</h3><p className="mt-2 max-w-lg leading-7 text-slate-600">{text}</p></div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="mx-6 mb-16 rounded-[2rem] bg-slate-950 px-6 py-14 text-white sm:px-12 lg:mx-auto lg:max-w-7xl lg:px-16">
          <div className="flex flex-col justify-between gap-8 lg:flex-row lg:items-end">
            <div className="max-w-2xl"><p className="text-sm font-bold uppercase tracking-[0.2em] text-emerald-400">Let&apos;s build the right system</p><h2 className="mt-4 text-4xl font-black tracking-tight sm:text-5xl">Have a battery requirement?</h2><p className="mt-5 leading-7 text-slate-300">Share your application, target specifications, and volume. Our team will help you find the clearest next step.</p></div>
            <Link href="/rfq" className="shrink-0 rounded-full bg-emerald-500 px-6 py-3.5 text-center text-sm font-bold text-slate-950 transition hover:bg-emerald-400">Start an enquiry →</Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-slate-200 bg-white">
        <div className="mx-auto flex max-w-7xl flex-col gap-4 px-6 py-8 text-sm text-slate-500 sm:flex-row sm:items-center sm:justify-between lg:px-8">
          <span className="font-bold tracking-[0.2em] text-slate-950">MEHAR</span>
          <span>Battery systems and energy storage solutions.</span>
          <Link href="/contact" className="font-semibold text-emerald-700 hover:text-emerald-800">Contact us →</Link>
        </div>
      </footer>
    </div>
  );
}
