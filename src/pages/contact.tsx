import * as React from "react";
import type { HeadFC, PageProps } from "gatsby";
import { Layout } from "@/components/Layout";
import { sendContactFormToSlack } from "@/utils/slack";

function ContactPage(props: PageProps) {
  const [formData, setFormData] = React.useState({
    name: "",
    email: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);

  function handleChange(
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setIsSubmitting(true);
    setError(null);

    try {
      // Send form data to Slack
      const channel = process.env.GATSBY_SLACK_CHANNEL || '#general';
      await sendContactFormToSlack(formData, channel);
      
      console.log("Form submitted successfully:", formData);
      setIsSubmitted(true);
      
      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({ name: "", email: "", message: "" });
        setIsSubmitted(false);
      }, 3000);
    } catch (err) {
      console.error("Error submitting form:", err);
      setError("Failed to send message. Please try again or contact us directly.");
    } finally {
      setIsSubmitting(false);
    }
  }

  return (
    <Layout>
      <section className="py-16 sm:py-20 lg:py-24">
        <div className="max-w-2xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h1 className="text-4xl sm:text-5xl font-bold text-gray-900 mb-4">
              Get In Touch
            </h1>
            <p className="text-lg text-gray-600">
              Have a question or want to work together? We'd love to hear from you.
            </p>
          </div>

          {error && (
            <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-6">
              <p className="text-red-700 text-sm">{error}</p>
            </div>
          )}

          {isSubmitted ? (
            <div className="bg-green-50 border border-green-200 rounded-lg p-6 text-center">
              <div className="text-green-600 text-4xl mb-4">✓</div>
              <h2 className="text-2xl font-semibold text-green-800 mb-2">
                Thank You!
              </h2>
              <p className="text-green-700">
                Your message has been sent successfully. We'll get back to you soon.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label
                  htmlFor="name"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="Your name"
                />
              </div>

              <div>
                <label
                  htmlFor="email"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors"
                  placeholder="your.email@example.com"
                />
              </div>

              <div>
                <label
                  htmlFor="message"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Message
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={6}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-colors resize-none"
                  placeholder="Tell us about your project or inquiry..."
                />
              </div>

              <button 
                type="submit" 
                className="btn-primary w-full disabled:opacity-50 disabled:cursor-not-allowed"
                disabled={isSubmitting}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          )}

          <div className="mt-12 pt-12 border-t border-gray-200">
            <h2 className="text-2xl font-semibold text-gray-900 mb-6 text-center">
              Other Ways to Connect
            </h2>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div className="text-center">
                <div className="text-3xl mb-2">📧</div>
                <h3 className="font-medium text-gray-900 mb-1">Email</h3>
                <p className="text-sm text-gray-600">hello@example.com</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">🐦</div>
                <h3 className="font-medium text-gray-900 mb-1">Twitter</h3>
                <p className="text-sm text-gray-600">@yourhandle</p>
              </div>
              <div className="text-center">
                <div className="text-3xl mb-2">💼</div>
                <h3 className="font-medium text-gray-900 mb-1">LinkedIn</h3>
                <p className="text-sm text-gray-600">/company/yourcompany</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </Layout>
  );
}

export default ContactPage;

export const Head: HeadFC = () => (
  <>
    <title>Contact | Gatsby TypeScript Tailwind Starter</title>
    <meta
      name="description"
      content="Get in touch with us. We'd love to hear from you."
    />
  </>
);



