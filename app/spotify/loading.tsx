import { Container } from "@components";

export default function Loading() {
  return (
    <Container className="my-24 min-h-screen">
      <div className="w-full flex items-center justify-center">
        <div className="pb-12 flex flex-col items-center gap-8">
          <div className="w-[180px] h-[180px] bg-zinc-400 rounded-full" />
          <h1 className="text-gray-50 font-bold text-5xl hover:text-green-500">
            ...
          </h1>
        </div>
      </div>
    </Container>
  );
}
