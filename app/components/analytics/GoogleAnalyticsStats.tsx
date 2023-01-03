import { BetaAnalyticsDataClient } from "@google-analytics/data";
import { google } from "@google-analytics/data/build/protos/protos";

const analyticsDataClient = new BetaAnalyticsDataClient({
  credentials: {
    client_email:
      "starting-account-m1culz2mpdbf@mjcarnaje-1672629014612.iam.gserviceaccount.com",
    private_key:
      "-----BEGIN PRIVATE KEY-----\nMIIEvwIBADANBgkqhkiG9w0BAQEFAASCBKkwggSlAgEAAoIBAQDPG4fZk7ymnaGv\niTeMxIay13648dsbZ901ZhVG5q5mpktCrZehfcQ2kwc/C1hZ1hNVBj5sx8wMdx75\n4VnWKPdZEqS/oyTzAiK3+JCf4pVHo+LsmUAtNNGRJ4swOukGjj0d4PNA+0NlLIml\ntaoup1F/pDVZf0kGkSdK7w8uUTQ8gkmYtgkoNOSjVf8MN0NwBJPRm8Q15KdM+dll\nBQcxMfFinIwRfvBaOmXKZiCJo7OXBnWN4ZXsu/Vifa5RzHqSkAgnB6KdhsFPVocv\nV2KTVvJzSSb7rwQZxiJ2kBkj8Yb7dGTS8SW6vJWAlzLbqdjiNyDa3FkUi8mFP/z/\nPH+rtTjjAgMBAAECggEAWP8Zl3OWw3pFOmsahdEFmOBlQhAb+WDee83MItWJ5+5Z\ntONnnyuuH0169apoYuJNGGJAfPo2Qr0FgJdHxXGBKLOMPBVdEVe/l5Kmgy4Yu9o+\n7zDDlSl3TIrTkvwdmoWQ2cAKh8fxJA7Jb33rDXU03kav7i92L+48FkU4Hs0iR0Vn\nKyqGQIpTd91yjx7I2N+Hw/MburKfL1vNAV5v1n0rh12495yQaXTRHB3VBW6Iy/LU\nyIdJUNSG8++oWmWOhJHD1V0qCNQ1o2yOmFJoSRZlkNtPjO+Ip7X5A9W/Q/4HGNe3\nM5XwOjM1TynHkUnqeQf2VH3rL/5+oB+7xVMhZhb/cQKBgQDzeTqHP3GAV5ZRql92\nI94jCXd7SOlFcA3VY4cprFO79U5T8B0YHxEZJIO+BTVfdnx/MUAoMfBq82Go4sgs\nS2AGFpUIYau4jhCnZ+A1NyUsGH1CU6wkg1vfKgTy9Ht/435+Lh02X9xrAiyBMDP2\nZUbBK+/TPfmuwmGQSoOi2o2QFwKBgQDZw1QBp3QbPqsqcN21/j5AUTcIKx6r94wl\ne9VgGfBs6LjFtU2gsHy+LUjJD+p/4hxBIECeZdtqEYdbPsjiLO6p4ODayv0Zqoum\nnJGNNmQTDAMj3iSaG8N316wVD8wHpjc9yhsTu6M2DaIQtTW++Q2vw68OrwyUw92S\nM+enFRwxFQKBgQCqBPz3FzmmWwOQcb4J3NAxfVnfULH9GFvAqKjpU/qBJbMV8HYQ\nsxkYiqQo3LBBwpb7pyPbLcxqkxyeeAc6z0P13G0kFjh5P1On42TxJFoj6dIGsDFk\nqgpM06XzFwDq9K0PZhpmLxjX7QOxDz0qEd0P5iOqSvwBqqHAxhgYcDAs7wKBgQDG\nL3P8EWelCBMFjDTr1ljXdlKsd3nxrlj5IEugq9rZc6/+F7Rvo0/UUShl/LtB6gom\n53CH+FGJpixXSbvPxG7tYsGhvo481q9EUkhRiYfooc0Vzq3nJ49tOXbesELTT14F\nOTQNcH7oyd2OcS1aAhaHuYNPzNaZaez0i5KvyJGgxQKBgQCfGMw2yJYLxwnGn1ci\nCao5asslcpu4ysA1w3w4cxQMESbj4ux1DD0ExumDlf7cT/xfUOhUBUE6Fk9fvxhX\n1CH+15vYnZq7KLwroxOMS1ryeJhLcm/A8V+Jqr/ySZqu2c69T15omAJU8QDtTO49\nvg0VIkR4wOGMtk1Lsl+kTND/1w==\n-----END PRIVATE KEY-----\n",
  },
});

async function getReport(): Promise<
  google.analytics.data.v1beta.IRunReportResponse & { total_visits: number }
> {
  const [response] = await analyticsDataClient.runReport({
    property: "properties/347859177",
    dateRanges: [{ startDate: "30daysAgo", endDate: "today" }],
    dimensions: [{ name: "year" }],
    metrics: [{ name: "activeUsers" }],
  });

  const total_visits = (response.rows || []).reduce((acc, row) => {
    const num = parseInt(row.metricValues?.[0]?.value || "");
    return acc + num;
  }, 0);

  return {
    ...response,
    total_visits,
  };
}

export default async function GoogleAnalyticsStats() {
  const data = await getReport();
  return (
    <div>
      <h1>Google Analytics</h1>
      <pre>{JSON.stringify({ total_visits: data.total_visits }, null, 2)}</pre>
    </div>
  );
}
