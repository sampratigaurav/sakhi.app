import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="min-h-screen bg-[#F9F4EF] flex items-center justify-center px-4">
      <div className="max-w-lg w-full bg-white/60 backdrop-blur rounded-2xl border border-[#E7DDD3] p-8 text-center shadow-sm">
        <div className="text-7xl font-bold text-[#C06C5D]">404</div>
        <h1 className="mt-4 text-2xl font-serif text-[#4A3B32]">Oops! You seem lost.</h1>
        <p className="mt-2 text-sm text-[#6D5D53]">The page you’re looking for isn’t here.</p>
        <div className="mt-8">
          <Link
            href="/"
            className="inline-flex items-center justify-center px-8 py-4 bg-[#C06C5D] text-white rounded-full font-semibold hover:opacity-90 transition-all"
          >
            🏠 Return Home
          </Link>
        </div>
      </div>
    </div>
  );
}
