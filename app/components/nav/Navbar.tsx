import { Container, NavItem } from "@components";

export function Navbar() {
  return (
    <Container className="h-16 z-10">
      <div className="h-16 pt-6 flex justify-between">
        <div className="w-full hidden md:block" />
        <nav className="md:min-w-[50%] w-full">
          <ul className="flex rounded-md px-3 text-sm font-medium text-zinc-800 shadow-lg shadow-zinc-800/5 ring-1 ring-zinc-900/5 backdrop-blur bg-zinc-800">
            <NavItem href="/">About</NavItem>
            <NavItem href="/spotify">Spotify Profile</NavItem>
          </ul>
        </nav>
        <div className="w-full hidden md:block" />
      </div>
    </Container>
  );
}
