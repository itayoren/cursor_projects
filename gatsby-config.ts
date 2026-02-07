import type { GatsbyConfig } from "gatsby";

const config: GatsbyConfig = {
  siteMetadata: {
    title: "Gatsby TypeScript Tailwind Starter",
    description: "A modern Gatsby starter with TypeScript and Tailwind CSS",
    siteUrl: "https://example.com",
    author: "@yourhandle",
  },
  graphqlTypegen: true,
  plugins: [
    "gatsby-plugin-postcss",
    "gatsby-plugin-image",
    "gatsby-plugin-sharp",
    "gatsby-transformer-sharp",
    {
      resolve: "gatsby-source-filesystem",
      options: {
        name: "images",
        path: `${__dirname}/src/images`,
      },
    },
    // Uncomment after adding src/images/icon.png (512x512 recommended)
    // {
    //   resolve: "gatsby-plugin-manifest",
    //   options: {
    //     name: "Gatsby TypeScript Tailwind Starter",
    //     short_name: "Gatsby Starter",
    //     start_url: "/",
    //     background_color: "#ffffff",
    //     theme_color: "#3b82f6",
    //     display: "minimal-ui",
    //     icon: "src/images/icon.png",
    //   },
    // },
  ],
};

export default config;

