// Shared TypeScript interfaces and types

export interface SiteMetadata {
  title: string;
  description: string;
  siteUrl: string;
  author: string;
}

export interface PageContext {
  limit: number;
  skip: number;
  numPages: number;
  currentPage: number;
}

export interface ImageData {
  alt: string;
  src: string;
  width?: number;
  height?: number;
}

// Add your custom types and interfaces here




