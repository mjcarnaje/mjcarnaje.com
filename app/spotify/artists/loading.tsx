import { Container } from "@components";
import { TimeRange } from "@typings/spotify-profile";
import { ArtistItemSkeleton } from "./Artists";

export default function Loading() {
  const labels = {
    [TimeRange.long_term]: "All Time",
    [TimeRange.medium_term]: "Last 6 Months",
    [TimeRange.short_term]: "Last 4 Weeks",
  };

  return (
    <Container className="my-24 min-h-screen">
      <div className="flex flex-col lg:flex-row gap-24 lg:gap-16 w-full">
        <div className="flex flex-col items-center w-full gap-8">
          <div className="flex gap-4 justify-end w-full">
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

          <div className="grid grid-cols-2 gap-8 md:grid-cols-3 lg:grid-cols-3 xl:grid-cols-4 mt-8">
            {Array.from({ length: 10 }).map((_, i) => (
              <ArtistItemSkeleton key={i} />
            ))}
          </div>
        </div>
      </div>
    </Container>
  );
}
