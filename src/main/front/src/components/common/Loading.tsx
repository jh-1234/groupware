export default function Loading() {
  return (
    <div className="bg-background flex h-screen w-full flex-col items-center justify-center">
      <div className="relative h-10 w-10">
        <div className="absolute inset-0 rounded-full border-[3px] border-zinc-200 dark:border-zinc-800"></div>
        <div className="absolute inset-0 animate-spin rounded-full border-[3px] border-transparent border-t-zinc-500"></div>
      </div>
    </div>
  );
}
