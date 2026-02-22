import PaymentButton from "@/app/components/PaymentButton";

export default function Home() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-zinc-50 font-sans bg-white dark:bg-black">
      <main className="flex min-h-screen w-full max-w-3xl items-center justify-center bg-white dark:bg-black">
        <PaymentButton />
      </main>
    </div>
  );
}
