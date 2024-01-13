import { Container } from "@components";
import Twemoji from "@components/Twemoji";

export default function Home() {
  return (
    <Container className="min-h-screen mt-24">
      <div className="max-w-2xl">
        <h1 className="mt-6 text-5xl font-bold tracking-tight sm:text-5xl text-inherit">
          <Twemoji className="w-5 h-5" emoji="💻" /> Web Developer, Mobile
          Developer, a Full-Stack Developer.
        </h1>

        <p className="mt-8 text-base">
          Hello! I&apos;m{" "}
          <span className="text-lg font-semibold">Michael James Carnaje</span>,
          a proficient Web and Mobile Developer. I&apos;ve worked with Android
          and iOS Development using React Native, and Web Development using
          JavaScript, React, Next.js, Node.js, GraphQL, Python, Flask, C/C++, as
          well as database management using Firebase, Supabase, SQL, MySQL,
          PostgreSQL, and more.
        </p>
      </div>
      <div className="grid gap-6 my-16">
        <div className="flex gap-4">
          <Twemoji emoji="🎓️" />
          <div>
            <h2 className="mb-0.5 text-2xl font-bold">Education</h2>
            <p className="text-lg">
              Bachelors in <span className="font-bold">Computer Science</span>
            </p>
            <p>
              Mindanao State University - Iligan Instiute of Technology
              (MSU-IIT)
            </p>
          </div>
        </div>
        <div className="flex gap-4">
          <Twemoji emoji="💼" />
          <div>
            <h2 className="mb-0.5 text-2xl font-bold">Linkedin</h2>
            <a
              href="https://www.linkedin.com/in/mjcarnaje/"
              className="text-lg underline"
              target="_blank"
            >
              linkedin.com/in/mjcarnaje
            </a>
          </div>
        </div>
        <div className="flex gap-4">
          <Twemoji emoji="📮" />
          <div>
            <h2 className="mb-0.5 text-2xl font-bold">Email</h2>
            <a
              href="mailto:carnaje.michaeljames@gmail.com"
              className="text-lg underline"
              target="_blank"
            >
              carnaje.michaeljames@gmail.com
            </a>
          </div>
        </div>
      </div>
    </Container>
  );
}
