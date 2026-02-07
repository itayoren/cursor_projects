import * as React from "react";

interface Feature {
  title: string;
  description: string;
  icon: string;
}

const features: Feature[] = [
  {
    title: "TypeScript",
    description:
      "Fully typed codebase with TypeScript for better developer experience and fewer bugs.",
    icon: "⚡",
  },
  {
    title: "Tailwind CSS",
    description:
      "Utility-first CSS framework for rapid UI development with a mobile-first approach.",
    icon: "🎨",
  },
  {
    title: "Gatsby",
    description:
      "Fast, SEO-friendly static site generator with incredible performance out of the box.",
    icon: "🚀",
  },
  {
    title: "React",
    description:
      "Component-based architecture using modern React with hooks and functional components.",
    icon: "⚛️",
  },
  {
    title: "Image Optimization",
    description:
      "Automatic image optimization with gatsby-plugin-image for blazing fast load times.",
    icon: "🖼️",
  },
  {
    title: "Best Practices",
    description:
      "Built following Gatsby and React best practices for production-ready applications.",
    icon: "✨",
  },
];

export function Features() {
  return (
    <section className="py-16 sm:py-20 lg:py-24">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12 lg:mb-16">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            This starter comes with all the modern tools and configurations you
            need to build exceptional web applications.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature) => (
            <div
              key={feature.title}
              className="bg-white p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
            >
              <div className="text-4xl mb-4">{feature.icon}</div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}




