import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { motion } from "framer-motion";

/**
 * Blade Runner 2049 Inspired Landing Page
 * 
 * This page showcases modern animation techniques with Framer Motion
 * and responsive design with Tailwind CSS. Theme inspired by the
 * neo-noir aesthetic of Blade Runner 2049.
 */

function LandingPage(props: PageProps) {
  // Ensure animations only run on client side (not during SSR)
  const [mounted, setMounted] = React.useState(false);

  React.useEffect(() => {
    setMounted(true);
  }, []);

  // Show loading state during SSR
  if (!mounted) {
    return (
      <div className="bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 min-h-screen flex items-center justify-center">
        <div className="text-white text-2xl">Loading...</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-b from-gray-900 via-purple-900 to-gray-900 min-h-screen">
      {/* Animated Navbar */}
      <AnimatedNavbar />

      {/* Hero Section */}
      <HeroSection />

      {/* Content Sections */}
      <FeaturesSection />
      <CharactersSection />

      {/* Animated Footer */}
      <AnimatedFooter />
    </div>
  );
}

/**
 * Animated Navbar Component
 * Slides down from top with fade-in effect on page load
 */
function AnimatedNavbar() {
  return (
    <motion.nav
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.8, ease: "easeOut" }}
      className="fixed top-0 left-0 right-0 z-50 bg-gray-900/80 backdrop-blur-md border-b border-purple-500/20"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <motion.div
            whileHover={{ scale: 1.05 }}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400"
          >
            BR2049
          </motion.div>

          {/* Nav Links - Hidden on mobile, visible on md and up */}
          <div className="hidden md:flex space-x-8">
            {["Features", "Characters", "Experience"].map((item, index) => (
              <motion.a
                key={item}
                href={`#${item.toLowerCase()}`}
                initial={{ opacity: 0, y: -20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + index * 0.1 }}
                whileHover={{ scale: 1.1, color: "#c084fc" }}
                className="text-gray-300 hover:text-purple-400 transition-colors"
              >
                {item}
              </motion.a>
            ))}
          </div>
        </div>
      </div>
    </motion.nav>
  );
}

/**
 * Hero Section Component
 * Full-width background with fade-in and slide-up animations
 * Captures the dystopian yet beautiful vibe of Blade Runner 2049
 */
function HeroSection() {
  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden pt-16">
      {/* Animated background gradient overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 0.3 }}
        transition={{ duration: 2 }}
        className="absolute inset-0 bg-gradient-to-r from-purple-600/20 via-pink-600/20 to-orange-600/20"
      />

      {/* Animated grid pattern background */}
      <div className="absolute inset-0 bg-[linear-gradient(rgba(168,85,247,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(168,85,247,0.1)_1px,transparent_1px)] bg-[size:100px_100px] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black,transparent)]" />

      {/* Hero Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
        {/* Main Headline - Fade in and slide up */}
        <motion.h1
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-bold mb-6"
        >
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-pink-400 to-orange-400">
            More Human
          </span>
          <br />
          <span className="text-white">Than Human</span>
        </motion.h1>

        {/* Subtitle - Delayed fade in and slide up */}
        <motion.p
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.3, ease: "easeOut" }}
          className="text-lg sm:text-xl md:text-2xl text-gray-300 mb-12 max-w-3xl mx-auto"
        >
          Experience the future. Where memories are manufactured and reality is questioned.
          Welcome to the world of 2049.
        </motion.p>

        {/* CTA Button with animated hover effect */}
        <AnimatedCTAButton />

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 1.5, duration: 1 }}
          className="absolute bottom-10 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            className="text-purple-400"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Call-to-Action Button Component
 * Features scale and glow effects on hover
 */
function AnimatedCTAButton() {
  return (
    <motion.button
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: 0.6 }}
      whileHover={{
        scale: 1.1,
        boxShadow: "0 0 30px rgba(168, 85, 247, 0.6)",
      }}
      whileTap={{ scale: 0.95 }}
      className="px-8 py-4 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-lg font-semibold rounded-full shadow-lg hover:shadow-purple-500/50 transition-shadow"
    >
      Enter the Experience
    </motion.button>
  );
}

/**
 * Features Section
 * Stagger animation effect - each feature card animates in sequence
 */
function FeaturesSection() {
  // Features data
  const features = [
    {
      icon: "🤖",
      title: "Advanced AI",
      description: "Replicants indistinguishable from humans, with implanted memories and emotions.",
    },
    {
      icon: "🌆",
      title: "Neo-Los Angeles",
      description: "A sprawling megacity bathed in perpetual rain and neon lights.",
    },
    {
      icon: "🔍",
      title: "Blade Runner Unit",
      description: "Elite officers tasked with retiring rogue replicants.",
    },
    {
      icon: "💭",
      title: "Baseline Test",
      description: "Psychological evaluation to maintain officer stability and compliance.",
    },
  ];

  // Container animation - stagger children
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2, // Each child animates 0.2s after the previous
      },
    },
  };

  // Individual card animation
  const cardVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" },
    },
  };

  return (
    <section id="features" className="py-20 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Key Features
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Discover the world-building elements that make 2049 unforgettable
          </p>
        </motion.div>

        {/* Feature Cards Grid - with stagger animation */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
        >
          {features.map((feature, index) => (
            <motion.div
              key={index}
              variants={cardVariants}
              whileHover={{ scale: 1.05, y: -10 }}
              className="bg-gray-800/50 backdrop-blur-sm border border-purple-500/20 rounded-xl p-6 hover:border-purple-500/50 transition-colors"
            >
              {/* Icon */}
              <div className="text-5xl mb-4">{feature.icon}</div>
              
              {/* Title */}
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              
              {/* Description */}
              <p className="text-gray-400">
                {feature.description}
              </p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Characters Section
 * Another staggered animation showcasing main characters
 */
function CharactersSection() {
  const characters = [
    {
      name: "K / Joe",
      role: "Blade Runner",
      quote: "I've never retired something that was born before.",
      gradient: "from-blue-500 to-cyan-500",
    },
    {
      name: "Rick Deckard",
      role: "Former Blade Runner",
      quote: "I had your job once. I was good at it.",
      gradient: "from-purple-500 to-pink-500",
    },
    {
      name: "Joi",
      role: "Holographic AI",
      quote: "I'm so happy when I'm with you.",
      gradient: "from-pink-500 to-rose-500",
    },
  ];

  // Stagger animation configuration
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.3,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: -50 },
    visible: {
      opacity: 1,
      x: 0,
      transition: { duration: 0.8, ease: "easeOut" },
    },
  };

  return (
    <section id="characters" className="py-20 px-4 sm:px-6 lg:px-8 bg-black/20">
      <div className="max-w-7xl mx-auto">
        {/* Section Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.3 }}
          transition={{ duration: 0.8 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl font-bold text-white mb-4">
            Characters
          </h2>
          <p className="text-gray-400 text-lg max-w-2xl mx-auto">
            Meet the souls navigating the blurred lines of humanity
          </p>
        </motion.div>

        {/* Characters List - staggered from left */}
        <motion.div
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
          className="space-y-6"
        >
          {characters.map((character, index) => (
            <motion.div
              key={index}
              variants={itemVariants}
              whileHover={{ scale: 1.02, x: 10 }}
              className="bg-gradient-to-r from-gray-800/80 to-gray-800/40 backdrop-blur-sm border border-purple-500/20 rounded-xl p-8 hover:border-purple-500/50 transition-colors"
            >
              <div className="flex flex-col md:flex-row md:items-center md:justify-between">
                <div className="mb-4 md:mb-0">
                  {/* Character Name with gradient */}
                  <h3 className={`text-3xl font-bold text-transparent bg-clip-text bg-gradient-to-r ${character.gradient} mb-2`}>
                    {character.name}
                  </h3>
                  
                  {/* Role */}
                  <p className="text-purple-400 text-sm font-semibold uppercase tracking-wider">
                    {character.role}
                  </p>
                </div>

                {/* Quote */}
                <div className="md:max-w-md">
                  <p className="text-gray-300 italic">
                    "{character.quote}"
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
}

/**
 * Animated Footer
 * Fades in when scrolled into view
 */
function AnimatedFooter() {
  return (
    <motion.footer
      initial={{ opacity: 0 }}
      whileInView={{ opacity: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 1 }}
      className="bg-gray-900/80 backdrop-blur-sm border-t border-purple-500/20 py-12 px-4"
    >
      <div className="max-w-7xl mx-auto text-center">
        {/* Footer Title */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2, duration: 0.8 }}
        >
          <h3 className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-400 to-pink-400 mb-4">
            Blade Runner 2049
          </h3>
          <p className="text-gray-400 mb-6">
            A vision of the future, a reflection of humanity
          </p>
        </motion.div>

        {/* Social Links */}
        <motion.div
          initial={{ y: 20, opacity: 0 }}
          whileInView={{ y: 0, opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.8 }}
          className="flex justify-center space-x-6 mb-6"
        >
          {["Twitter", "Instagram", "YouTube"].map((social) => (
            <motion.a
              key={social}
              href="#"
              whileHover={{ scale: 1.2, color: "#c084fc" }}
              className="text-gray-400 hover:text-purple-400 transition-colors"
            >
              {social}
            </motion.a>
          ))}
        </motion.div>

        {/* Copyright */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.8 }}
          className="text-gray-500 text-sm"
        >
          © 2049 Warner Bros. All rights reserved. | Built with ❤️ and Framer Motion
        </motion.p>
      </div>
    </motion.footer>
  );
}

export default LandingPage;

export const Head: HeadFC = () => (
  <>
    <title>Blade Runner 2049 | More Human Than Human</title>
    <meta
      name="description"
      content="Experience the dystopian future of Blade Runner 2049. A world where the line between human and machine blurs."
    />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  </>
);

