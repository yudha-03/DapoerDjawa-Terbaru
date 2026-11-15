export default function Loading() {
  return (
    <div className="min-h-screen bg-gray-50 pt-24 pb-16">
      <div className="container mx-auto max-w-6xl px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="aspect-square bg-gray-200 rounded-2xl animate-pulse" />
          <div className="space-y-4">
            <div className="h-8 bg-gray-200 rounded-lg w-3/4 animate-pulse" />
            <div className="h-6 bg-gray-200 rounded-lg w-1/2 animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-lg w-full animate-pulse" />
            <div className="h-4 bg-gray-200 rounded-lg w-5/6 animate-pulse" />
            <div className="h-12 bg-gray-200 rounded-xl w-1/3 animate-pulse mt-8" />
          </div>
        </div>
      </div>
    </div>
  );
}
