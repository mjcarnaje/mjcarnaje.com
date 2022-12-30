import { Container } from "@components/Container";
import {
  GitHubIcon,
  InstagramIcon,
  LinkedInIcon,
  TwitterIcon,
} from "@components/SocialIcons";
import { SocialLink } from "@components/SocialLink";
import me from "@images/me-500x500.png";
import Image from "next/image";

export default function Home() {
  return (
    <Container className="mt-24">
      <div className="max-w-2xl">
        <Image
          src={me}
          alt="Michael James Carnaje - Software Engineer"
          width={136}
          height={136}
        />
        <h1 className="mt-6 text-4xl font-bold tracking-tight text-zinc-100 sm:text-5xl">
          Web Developer, Mobile Developer, and Computer Science student.
        </h1>
        <p className="mt-6 text-base text-zinc-400">
          Hello! I'm MJ, a Web Developer / Mobile Developer currently pursuing a
          Bachelor's degree in Computer Science. I was born on June 1 2003, and
          have always had a strong interest in technology and problem-solving.
        </p>
        <div className="mt-6 flex gap-6">
          <SocialLink
            href="https://twitter.com/carnajeeed"
            aria-label="Follow on Twitter"
            icon={TwitterIcon}
            target="_blank"
          />
          <SocialLink
            href="https://instagram.com/mjcarnaje"
            aria-label="Follow on Instagram"
            icon={InstagramIcon}
            target="_blank"
          />
          <SocialLink
            href="https://github.com/mjcarnaje"
            aria-label="Follow on GitHub"
            icon={GitHubIcon}
            target="_blank"
          />
          <SocialLink
            href="https://www.linkedin.com/in/mjcarnaje"
            aria-label="Follow on LinkedIn"
            icon={LinkedInIcon}
            target="_blank"
          />
        </div>
      </div>
    </Container>
  );
}
