import { Container } from "../components/Container";
import { DarkModeSwitch } from "../components/DarkModeSwitch";
import { Hero } from "../components/Hero";
import Meta from "../components/Meta";

const Index = () => (
  <Container minHeight="100vh">
    <Meta />
    <Hero />
    <DarkModeSwitch />
  </Container>
);

export default Index;
