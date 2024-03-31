"use client";

import { Container } from "../../components";

export default function Error() {
  return (
    <Container className="min-h-screen my-24">
      <div className="flex items-center justify-center w-full">
        <div className="flex flex-col items-center gap-8 pb-12">
          <h1 className="text-5xl font-bold text-gray-50 hover:text-green-500">
            Something went wrong!
          </h1>
        </div>
      </div>
    </Container>
  );
}
