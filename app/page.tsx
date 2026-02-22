export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans bg-white dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl items-center justify-center bg-white dark:bg-black">
        <button
          className="px-6 py-3 rounded-lg font-semibold shadow-md transition-colors duration-200
            bg-blue-600 text-white hover:bg-blue-700
            dark:bg-blue-500 dark:text-black dark:hover:bg-blue-400 focus:outline-none focus:ring-2 focus:ring-blue-300 dark:focus:ring-blue-800"
        >
          Pay me
        </button>
      </main>
    </div>
  );
}
