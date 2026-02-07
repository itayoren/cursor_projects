import * as React from "react";
import { Link } from "gatsby";

export function Hero() {
  return (
    <section className="bg-gradient-to-br from-primary-50 to-white py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-gray-900 mb-6">
            Welcome to{" "}
            <span className="text-primary-600">Gatsby TypeScript</span>
          </h1>
          <p className="text-lg sm:text-xl text-gray-600 mb-8 max-w-3xl mx-auto">
            A modern, fast, and scalable starter template built with Gatsby,
            TypeScript, and Tailwind CSS. Start building amazing websites today.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link to="/about" className="btn-primary w-full sm:w-auto">
              Get Started
            </Link>
            <a
              href="https://www.gatsbyjs.com/docs"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-secondary w-full sm:w-auto"
            >
              Learn More
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}




