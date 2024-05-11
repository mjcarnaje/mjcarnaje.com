/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: [
      "i.scdn.co",
      "scontent.fmaa10-1.fna.fbcdn.net",
      "res.cloudinary.com",
      "tsh.io",
      "file.techscience.com",
      "drive.google.com",
      "netlogoweb.org",
      "latex.codecogs.com",
    ],
  },
  redirects: async () => {
    return [
      {
        source: "/redirect/ocaomodsimyt",
        destination: "https://youtu.be/_RnJWDULNCk",
        permanent: true,
      },
    ];
  },
};

module.exports = nextConfig;
