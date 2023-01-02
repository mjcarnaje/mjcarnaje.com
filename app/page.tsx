import { Container, Hero } from "@components";
import GoogleAnalytics from "@components/analytics/GoogleAnalyticsStats";
import { Suspense } from "react";

export default function Home() {
  return (
    <Container className="mt-24 min-h-screen">
      <Hero />
      {process.env.NODE_ENV == "production" && (
        <div className="mt-16">
          <Suspense fallback={<p>loading..</p>}>
            {/* @ts-expect-error Async Server Component */}
            <GoogleAnalytics />
          </Suspense>
        </div>
      )}
    </Container>
  );
}
