import type { NextPage } from "next";

const Home: NextPage = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen py-2">
      <main className="flex flex-col items-center justify-center flex-1 w-full px-6 text-center md:px-20">
        <img
          className="w-full my-12 md:w-1/2"
          src="./empty_street.svg"
          alt="Under Contruction's Illustration"
        />
        <h1 className="text-2xl font-bold md:text-3xl">
          My portfolio is under construction
        </h1>
        <p className="mt-2 text-xl md:mt-4">I am working on it!</p>
      </main>
    </div>
  );
};

export default Home;
