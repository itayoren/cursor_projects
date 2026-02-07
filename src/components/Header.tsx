import * as React from "react";
import { Link } from "gatsby";
import { useSiteMetadata } from "@/hooks/useSiteMetadata";

export function Header() {
  const { title } = useSiteMetadata();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = React.useState(false);

  function toggleMobileMenu() {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  }

  return (
    <header className="bg-white shadow-sm sticky top-0 z-50">
      <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex-shrink-0">
            <Link to="/" className="text-xl font-bold text-primary-600">
              {title}
            </Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex md:items-center md:space-x-8">
            <Link
              to="/"
              className="text-gray-700 hover:text-primary-600 transition-colors"
              activeClassName="text-primary-600"
            >
              Home
            </Link>
            <Link
              to="/about"
              className="text-gray-700 hover:text-primary-600 transition-colors"
              activeClassName="text-primary-600"
            >
              About
            </Link>
            <Link
              to="/contact"
              className="text-gray-700 hover:text-primary-600 transition-colors"
              activeClassName="text-primary-600"
            >
              Contact
            </Link>
          </div>

          {/* Mobile Menu Button */}
          <div className="md:hidden">
            <button
              onClick={toggleMobileMenu}
              className="text-gray-700 hover:text-primary-600 focus:outline-none focus:ring-2 focus:ring-primary-500 rounded-lg p-2"
              aria-label="Toggle menu"
            >
              <svg
                className="h-6 w-6"
                fill="none"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                {isMobileMenuOpen ? (
                  <path d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMobileMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              <Link
                to="/"
                className="text-gray-700 hover:text-primary-600 transition-colors py-2"
                activeClassName="text-primary-600"
              >
                Home
              </Link>
              <Link
                to="/about"
                className="text-gray-700 hover:text-primary-600 transition-colors py-2"
                activeClassName="text-primary-600"
              >
                About
              </Link>
              <Link
                to="/contact"
                className="text-gray-700 hover:text-primary-600 transition-colors py-2"
                activeClassName="text-primary-600"
              >
                Contact
              </Link>
            </div>
          </div>
        )}
      </nav>
    </header>
  );
}




