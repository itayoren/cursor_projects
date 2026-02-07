import type { GatsbyNode } from "gatsby";

export const createPages: GatsbyNode["createPages"] = async ({ actions }) => {
  const { createPage } = actions;

  // Example: Create pages programmatically
  // Uncomment and modify as needed for your use case
  
  // const blogPosts = [
  //   { slug: "first-post", title: "First Post" },
  //   { slug: "second-post", title: "Second Post" },
  // ];

  // blogPosts.forEach((post) => {
  //   createPage({
  //     path: `/blog/${post.slug}`,
  //     component: require.resolve("./src/templates/BlogPost.tsx"),
  //     context: {
  //       slug: post.slug,
  //     },
  //   });
  // });
};

export const onCreateWebpackConfig: GatsbyNode["onCreateWebpackConfig"] = ({
  actions,
}) => {
  actions.setWebpackConfig({
    resolve: {
      alias: {
        "@": `${__dirname}/src`,
      },
    },
  });
};


