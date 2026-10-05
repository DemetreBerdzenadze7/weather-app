function ErrorState({ onRetry }: { onRetry: () => void }) {
  return (
    <section className="mx-auto mt-16 flex max-w-138 flex-col items-center gap-6 text-center">
      <img src="/images/icon-error.svg" alt="" className="size-10" />
      <h1 className="font-display text-[52px] font-bold">
        Something went wrong
      </h1>
      <p className="text-xl text-neutral-200">
        We couldn’t connect to the server (API error). Please try again in a few
        moments.
      </p>
      <button
        onClick={onRetry}
        className="flex items-center gap-2.5 rounded-lg bg-neutral-800 px-4 py-3 hover:bg-neutral-700 cursor-pointer"
      >
        <img src="/images/icon-retry.svg" alt="" />
        Retry
      </button>
    </section>
  );
}

export default ErrorState;
