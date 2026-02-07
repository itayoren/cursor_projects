import * as React from "react";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export function Footer() {
  const { title, author } = useSiteMetadata();
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gray-50 border-t border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              {title}
            </h3>
            <p className="text-gray-600 text-sm">
              Built with Gatsby, TypeScript, and Tailwind CSS.
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Links</h3>
            <ul className="space-y-2">
              <li>
                <a
                  href="https://www.gatsbyjs.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 text-sm transition-colors"
                >
                  Gatsby
                </a>
              </li>
              <li>
                <a
                  href="https://www.typescriptlang.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 text-sm transition-colors"
                >
                  TypeScript
                </a>
              </li>
              <li>
                <a
                  href="https://tailwindcss.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-gray-600 hover:text-primary-600 text-sm transition-colors"
                >
                  Tailwind CSS
                </a>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">
              Connect
            </h3>
            <p className="text-gray-600 text-sm">{author}</p>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t border-gray-200 text-center">
          <p className="text-gray-600 text-sm">
            &copy; {currentYear} {title}. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}




