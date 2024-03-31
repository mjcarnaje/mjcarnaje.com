import { Container } from "@/components";
import { TimeRange } from "@/types/spotify-profile";
import { ArtistItemSkeleton } from "./Artists";

export default function Loading() {
  const labels = {
    [TimeRange.long_term]: "All Time",
    [TimeRange.medium_term]: "Last 6 Months",
    [TimeRange.short_term]: "Last 4 Weeks",
  };

  return (
    <Container className="min-h-screen my-24">
      <div className="flex flex-col w-full gap-24 lg:flex-row lg:gap-16">
        <div className="flex flex-col items-center w-full gap-8">
          <div className="flex justify-end w-full gap-4">
            {Object.entries(labels).map(([key, label]) => (
              <button
                key={key}
                className={
                  "px-4 py-2 uppercase rounded-full text-xs font-bold tracking-widest hover:bg-white hover:text-zinc-900 transition duration-200 ease-in-out"
                }
              >
                {label}
              </button>
            ))}
          </div>

          <div className="grid grid-cols-2 gap-8 mt-8 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4">
            {Array.from({ length: 10 }).map((_, i) => (
              <ArtistItemSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
