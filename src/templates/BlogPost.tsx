import * as React from "react";
import { graphql, type HeadFC, type PageProps } from "gatsby";
import { Layout } from "@/components/Layout";

interface BlogPostContext {
  slug: string;
}

interface BlogPostData {
  // Define your GraphQL query data structure here
  // Example:
  // markdownRemark: {
  //   frontmatter: {
  //     title: string;
  //     date: string;
  //     author: string;
  //   };
  //   html: string;
  // };
}

function BlogPostTemplate(props: PageProps<BlogPostData, BlogPostContext>) {
  const { slug } = props.pageContext;

  return (
    <Layout>
      <article className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <header className="mb-8">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Blog Post: {slug}
            </h1>
            <div className="flex items-center gap-4 text-gray-600">
              <time>January 1, 2024</time>
              <span>•</span>
              <span>5 min read</span>
            </div>
          </header>

          <div className="prose prose-lg max-w-none">
            <p>
              This is a template for programmatically created blog posts. 
              Customize this template based on your data source.
            </p>
            <p>Current slug: {slug}</p>
          </div>
        </div>
      </article>
    </Layout>
  );
}

export default BlogPostTemplate;

export const Head: HeadFC<BlogPostData, BlogPostContext> = ({ pageContext }) => {
  return (
    <>
      <title>Blog Post: {pageContext.slug}</title>
      <meta name="description" content={`Blog post about ${pageContext.slug}`} />
    </>
  );
};

// Example GraphQL query for a blog post
// Uncomment and modify based on your data source
// export const query = graphql`
//   query BlogPostBySlug($slug: String!) {
//     markdownRemark(fields: { slug: { eq: $slug } }) {
//       html
//       frontmatter {
//         title
//         date(formatString: "MMMM DD, YYYY")
//         author
//       }
//     }
//   }
// `;




