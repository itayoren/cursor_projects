import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Layout } from "@/components/Layout";
import { Hero } from "@/components/Hero";
import { Features } from "@/components/Features";

function IndexPage(props: PageProps) {
  return (
    <Layout>
      <Hero />
      <Features />
    </Layout>
  );
}

export default IndexPage;

export const Head: HeadFC = () => (
  <>
    <title>Home | Gatsby TypeScript Tailwind Starter</title>
    <meta
      name="description"
      content="A modern Gatsby starter with TypeScript and Tailwind CSS"
    />
  </>
);




