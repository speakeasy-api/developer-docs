import { SidebarSeparator } from "@/components/ui/SidebarSeparator";

export default {
  index: {
    title: "Intro to API Design",
    theme: {
      layout: "overview",
      toc: false,
    },
  },
  "picking-architectures": {
    title: "Choosing an API Architecture",
  },
  "request-section": {
    type: "separator",
    title: <SidebarSeparator>Designing API Requests</SidebarSeparator>,
  },
  urls: {
    title: "Structuring URLs",
  },
  "http-methods": {
    title: "Using HTTP methods",
  },
  collections: {
    title: "Resources & Collections",
  },
  parameters: {
    title: "Sending request parameters",
  },
  "data-formats": {
    title: "Formatting API data",
  },
  "request-body": {
    title: "Sending request data",
  },
  "response-section": {
    type: "separator",
    title: <SidebarSeparator>Designing API Responses</SidebarSeparator>,
  },
  "status-codes": {
    title: "Returning HTTP status codes",
  },
  responses: {
    title: "Returning response data",
  },
  pagination: {
    title: "Paginating API responses",
  },
  "filtering-responses": {
    title: "Filtering API responses",
  },
  errors: {
    title: "Returning informative API Errors",
  },
  caching: {
    title: "Caching API responses",
  },
  security: {
    title: "Securing an API",
  },
  "file-uploads": {
    title: "Uploading files",
  },
  versioning: {
    title: "Versioning & evolution",
  },
  "rate-limiting": {
    title: "Protecting APIs with rate limits",
  },
  "developer-experience": {
    title: "API developer experience",
  },
  consistency: {
    title: "Enforcing API consistency",
  },
};
