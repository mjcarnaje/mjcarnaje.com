import { ImageResponse } from "next/og";
import { readFile } from "fs/promises";
import { join } from "path";

export const alt = "MJ Carnaje - Software Engineer from the Philippines";
export const size = {
  width: 1200,
  height: 630,
};

export const contentType = "image/png";

export default async function Image() {
  const imageData = await readFile(join(process.cwd(), "assets/images/me.png"));
  const imageBase64 = `data:image/png;base64,${imageData.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          backgroundColor: "#ffffff",
          padding: "80px",
          fontFamily: "system-ui, -apple-system, sans-serif",
          position: "relative",
        }}
      >
        {/* Grid pattern background */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "radial-gradient(circle, #00000010 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            zIndex: 0,
          }}
        />

        {/* Content container */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            position: "relative",
            zIndex: 1,
            flex: 1,
          }}
        >
          {/* Greeting */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "48px",
              fontWeight: "bold",
              marginBottom: "32px",
              gap: "12px",
            }}
          >
            <span>Hello there!</span>
            <span>👋</span>
          </div>

          {/* Description */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              fontSize: "24px",
              color: "#000000",
              lineHeight: 1.6,
              maxWidth: "700px",
              marginBottom: "48px",
            }}
          >
            I'm Michael James Carnaje, a software engineer from the Philippines
            with 4 years of experience. I enjoy building products that address
            real user needs—whether that's through web applications, mobile
            apps, or automation tools.
          </div>

          {/* Footer */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              fontSize: "22px",
              color: "#6b7280",
            }}
          >
            <span>mjcarnaje.com</span>
          </div>
        </div>

        {/* Profile Image */}
        <div
          style={{
            display: "flex",
            position: "relative",
            zIndex: 1,
            marginLeft: "40px",
          }}
        >
          <img
            src={imageBase64}
            alt="Michael James Carnaje"
            width="300"
            height="300"
            style={{ borderRadius: "50%" }}
          />
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
