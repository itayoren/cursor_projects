import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Layout } from "@/components/Layout";

function AboutPage(props: PageProps) {
  return (
    <Layout>
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-8">
            About Us
          </h1>
          
          <div className="prose prose-lg max-w-none">
            <p className="text-xl text-gray-600 mb-6">
              Welcome to our Gatsby-powered website. We're passionate about
              building fast, modern, and accessible web experiences.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Our Mission
            </h2>
            <p className="text-gray-700 mb-6">
              Our mission is to create exceptional web experiences that are fast,
              accessible, and delightful to use. We believe in the power of modern
              web technologies to transform how people interact with the digital
              world.
            </p>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Technology Stack
            </h2>
            <ul className="list-disc list-inside text-gray-700 space-y-2 mb-6">
              <li>Gatsby 5 for blazing-fast static site generation</li>
              <li>TypeScript for type safety and better developer experience</li>
              <li>Tailwind CSS for rapid, utility-first styling</li>
              <li>React for component-based architecture</li>
              <li>GraphQL for efficient data querying</li>
            </ul>
            
            <h2 className="text-2xl font-semibold text-gray-900 mt-8 mb-4">
              Why Choose Us
            </h2>
            <p className="text-gray-700 mb-6">
              We combine cutting-edge technology with best practices to deliver
              websites that are not only beautiful but also performant, accessible,
              and SEO-friendly. Every project is built with care, attention to
              detail, and a focus on user experience.
            </p>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default AboutPage;

export const Head: HeadFC = () => (
  <>
    <title>About | Gatsby TypeScript Tailwind Starter</title>
    <meta
      name="description"
      content="Learn more about our mission and technology stack"
    />
  </>
);




