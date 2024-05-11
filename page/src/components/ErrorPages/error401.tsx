import { Link } from "react-router-dom"

export  function Error401() {
  return (
    <main className="flex h-[100dvh] flex-col items-center justify-center bg-white px-4 dark:bg-gray-950">
      <div className="space-y-4 text-center">
        <h1 className="text-9xl font-bold tracking-tighter text-gray-900 dark:text-gray-50">401</h1>
        <div className="space-y-2 text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl">Unauthorized</h2>
          <p className="text-gray-500 dark:text-gray-400">Authorization required.</p>
        </div>
        <Link
          className="inline-flex h-10 items-center justify-center rounded-md bg-[#19A25A] hover:bg-[#16884b] px-6 text-sm font-medium text-gray-50 shadow transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-gray-950 disabled:pointer-events-none disabled:opacity-50 dark:bg-gray-50 dark:text-gray-900 dark:hover:bg-gray-50/90 dark:focus-visible:ring-gray-300"
          to={'/'}>
          Go back
        </Link>
      </div>
    </main>
  )
}