import * as React from "react";
import { Link, type HeadFC, type PageProps } from "gatsby";
import { Layout } from "@/components/Layout";

function NotFoundPage(props: PageProps) {
  return (
    <Layout>
      <div className="min-h-[60vh] flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-6xl font-bold text-primary-600 mb-4">404</h1>
          <h2 className="text-3xl font-semibold text-gray-900 mb-4">
            Page Not Found
          </h2>
          <p className="text-lg text-gray-600 mb-8">
            Sorry, we couldn't find the page you're looking for.
          </p>
          <Link to="/" className="btn-primary inline-block">
            Go Home
          </Link>
        </div>
      </div>
    </Layout>
  );
}

export default NotFoundPage;

export const Head: HeadFC = () => <title>404 - Page Not Found</title>;




