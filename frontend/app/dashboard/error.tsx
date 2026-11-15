'use client';

export default function DashboardError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-50 px-4">
      <div className="text-center">
        <h2 className="mb-2 text-xl font-bold text-gray-900">Terjadi Kesalahan</h2>
        <p className="mb-4 text-sm text-gray-600">
          {error.message || 'Dashboard gagal dimuat. Silakan coba lagi.'}
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-black px-4 py-2 text-sm font-medium text-white hover:bg-gray-800 transition"
        >
          Coba Lagi
        </button>
      </div>
    </div>
  );
}
