import { Container, NavItem } from "@/components";

export function Navbar() {
  return (
    <Container className="z-10 h-16">
      <div className="flex justify-between h-16 pt-6">
        <div className="hidden w-full md:block" />
        <nav className="md:min-w-[50%] w-full">
          <ul className="flex px-3 text-sm font-medium rounded-md shadow-lg text-zinc-800 shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur bg-zinc-800">
            <NavItem href="/">About</NavItem>
            <NavItem href="/spotify">Spotify Profile</NavItem>
          </ul>
        </nav>
        <div className="hidden w-full md:block" />
      </div>
    </Container>
  );
}
