import Link from "next/link";
import { GitHubIcon, LinkedInIcon, MailIcon } from "@/assets/icons";

export function Footer() {
  return (
    <footer className="border-t bg-white relative z-10">
      <div className="mx-auto max-w-7xl px-6 py-16 md:px-12">
        <div className="grid grid-cols-1 gap-12 md:grid-cols-4">
          <div className="col-span-1 md:col-span-2 space-y-6">
            <Link href="/" className="font-black text-2xl tracking-tighter">
              MJ<span className="text-primary">.</span>
            </Link>
            <p className="max-w-xs text-sm text-muted-foreground leading-relaxed font-medium">
              Software Engineer from the Philippines focused on building modern
              web applications and AI-powered solutions.
            </p>
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">
              Navigation
            </h3>
            <ul className="space-y-4">
              <li>
                <Link
                  href="/#about"
                  className="text-sm font-bold text-gray-600 hover:text-primary transition-colors"
                >
                  About
                </Link>
              </li>
              <li>
                <Link
                  href="/#projects"
                  className="text-sm font-bold text-gray-600 hover:text-primary transition-colors"
                >
                  Projects
                </Link>
              </li>
              <li>
                <Link
                  href="/blogs"
                  className="text-sm font-bold text-gray-600 hover:text-primary transition-colors"
                >
                  Journal
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-xs font-black uppercase tracking-widest text-gray-400 mb-6">
              Connect
            </h3>
            <div className="flex space-x-6">
              <a
                href="https://linkedin.com/in/mjcarnaje"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
                aria-label="LinkedIn"
              >
                <LinkedInIcon className="h-5 w-5 fill-current" />
              </a>
              <a
                href="https://github.com/mjcarnaje"
                target="_blank"
                rel="noopener noreferrer"
                className="text-primary"
                aria-label="GitHub"
              >
                <GitHubIcon className="h-5 w-5 fill-current" />
              </a>
              <a
                href="mailto:carnaje.michaeljames@gmail.com"
                className="text-primary"
                aria-label="Email"
              >
                <MailIcon className="h-5 w-5 fill-current" />
              </a>
            </div>
          </div>
        </div>
        <div className="mt-20 border-t border-gray-100 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <p className="text-[10px] font-black uppercase tracking-widest text-gray-400">
            &copy; {new Date().getFullYear()} Michael James Carnaje
          </p>
        </div>
      </div>
    </footer>
  );
}
