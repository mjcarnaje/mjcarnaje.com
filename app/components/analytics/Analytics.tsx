"use client";

import React from "react";
import { GoogleAnalytics } from "nextjs-google-analytics";

export function Analytics() {
  return (
    <GoogleAnalytics
      strategy="afterInteractive"
      gaMeasurementId={process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID}
    />
  );
}
