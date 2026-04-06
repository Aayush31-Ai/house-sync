export default function DashboardLoading() {
  return (
    <div className="flex flex-col gap-6 md:grid md:grid-cols-12 max-w-7xl mx-auto p-4 md:p-8">
      <div className="col-span-12 h-10 w-48 rounded-md bg-gray-200 animate-pulse" />

      <div className="col-span-12 md:col-span-8 flex flex-col gap-6 w-full">
        <div className="h-72 rounded-4xl bg-gray-200 animate-pulse" />
        <div className="h-72 rounded-3xl bg-gray-200 animate-pulse" />
      </div>

      <div className="col-span-12 md:col-span-4 flex flex-col gap-6 w-full">
        <div className="h-64 rounded-3xl bg-gray-200 animate-pulse" />
        <div className="h-96 rounded-3xl bg-gray-200 animate-pulse" />
      </div>
    </div>
  );
}
