import type { GatsbyBrowser } from "gatsby";
import "./src/styles/global.css";

export const onClientEntry: GatsbyBrowser["onClientEntry"] = () => {
  // IntersectionObserver polyfill for Safari
  if (typeof window.IntersectionObserver === "undefined") {
    import("intersection-observer");
  }
};

export const onRouteUpdate: GatsbyBrowser["onRouteUpdate"] = ({ location }) => {
  // Track page views, scroll to top, etc.
  if (typeof window !== "undefined") {
    window.scrollTo(0, 0);
  }
};


