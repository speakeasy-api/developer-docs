import { SidebarSeparator } from "@/components/ui/sidebar-separator";

export const docsIntroItems = {
  "search-bar-docs": {
    type: "separator",
    title: "__INKEEP_SEARCH_DOCS__",
  },
  index: {
    title: "Home",
    theme: {
      layout: "full",
      toc: false,
      pagination: false,
    },
  },
};

const meta = {
  // hide static pages from sidebar
  "*": {
    display: "hidden",
  },
  docs: {
    title: "Documentation",
    type: "page",
    display: "children",
    items: {
      ...docsIntroItems,
      /*
      HOSTED MCP
      */
      "managed-mcp-section": {
        type: "separator",
        title: <SidebarSeparator>{"Gram (MCP Cloud)"}</SidebarSeparator>,
      },
      gram: {
        title: "Gram (MCP Cloud)",
        display: "children",
        items: {
          introduction: {
            title: "Introduction",
          },
          "mcp-installation-guides": {
            title: "MCP Installation Guides",
          },
          "getting-started": {
            title: "Getting Started",
            items: {
              typescript: {
                title: "Use TypeScript (Gram Functions)",
              },
              openapi: {
                title: "Use an OpenAPI spec",
              },
            },
          },
          concepts: {
            title: "Concepts",
            items: {
              "tool-definitions": {
                title: "Tool Definitions",
              },
              toolsets: {
                title: "Toolsets",
              },
              "tool-variations": {
                title: "Tool Variations",
              },
              "tool-sources": {
                title: "Tool Sources",
              },
              environments: {
                title: "Environments",
              },
              deployments: {
                title: "Deployments",
              },
              "api-keys": {
                title: "API Keys",
              },
            },
          },
          "gram-functions": {
            title: "Gram Functions",
            items: {
              introduction: {
                title: "Introduction",
              },
              "functions-framework": {
                title: "Using the Functions Framework",
              },
              "mcp-sdk": {
                title: "Using the MCP SDK",
              },
              "configuring-environments": {
                title: "Configuring environments",
              },
              "build-deploy": {
                title: "Build and Deploy",
              },
            },
          },
          "build-mcp": {
            title: "Build MCP",
            items: {
              "custom-toolsets": {
                title: "Curate a custom toolset",
              },
              "create-default-toolset": {
                title: "Create a default toolset",
              },
              "advanced-tool-curation": {
                title: "Advanced tool curation",
              },
              "configuring-environments": {
                title: "Configure environments",
              },
              "attach-environments-to-sources": {
                title: "Attach environments to tool sources",
              },
              "test-toolsets": {
                title: "Test toolsets",
              },
              "dynamic-toolsets": {
                title: "Dynamic toolsets (experimental)",
              },
              "response-filtering": {
                title: "Response filtering (experimental)",
              },
            },
          },
          "host-mcp": {
            title: "Productionize MCP",
            items: {
              "deploy-mcp-server": {
                title: "Deploy an MCP server",
              },
              "public-private-servers": {
                title: "Control server visibility",
              },
              "adding-oauth": {
                title: "Add OAuth",
              },
              "oauth-proxy-for-internal-servers": {
                title: "OAuth proxy for internal servers",
              },
              "tool-call-healing": {
                title: "Tool call healing",
              },
              "publish-gram-server-mcp-registry": {
                title: "Publish to MCP Registry",
              },
            },
          },
          "command-line": {
            title: "Command Line",
            items: {
              auth: {},
              whoami: {},
              stage: {},
              "stage-function": {},
              "stage-openapi": {},
              push: {},
              status: {},
            },
          },
          clients: {
            title: "MCP Clients",
            items: {
              "using-chatgpt-developer-mode-with-gram": {
                title: "ChatGPT Developer mode",
              },
              "using-claude-code-with-gram-mcp-servers": {
                title: "Claude Code",
              },
              "using-claude-desktop-with-gram-mcp-server": {
                title: "Claude Desktop",
              },
              "using-cline-with-gram-mcp-server": {
                title: "Cline",
              },
              "using-gemini-cli-with-gram-mcp-servers": {
                title: "Gemini CLI",
              },
              "using-mistral-with-gram-mcp-servers": {
                title: "Mistral",
              },
              "using-n8n-with-gram-mcp-servers": {
                title: "n8n",
              },
              "using-roo-code-with-gram-mcp-server": {
                title: "Roo Code",
              },
              "using-your-ide-with-gram-mcp-server": {
                title: "IDE",
              },
              troubleshooting: {
                title: "Troubleshooting",
              },
            },
          },
          "api-clients": {
            title: "API usage",
            items: {
              "using-anthropic-api-with-gram-mcp-servers": {
                title: "Anthropic API",
              },
              "using-langchain-with-gram-mcp-servers": {
                title: "LangChain",
              },
              "using-openai-agents-sdk-with-gram-mcp-servers": {
                title: "OpenAI Agents SDK",
              },
              "using-openai-api-with-gram-mcp-servers": {
                title: "OpenAI Responses API",
              },
              "using-pydantic-ai-with-gram-mcp-servers": {
                title: "Pydantic AI",
              },
              "using-vercel-ai-sdk-with-gram-mcp-servers": {
                title: "Vercel AI SDK",
              },
            },
          },
          examples: {
            title: "Examples",
            items: {
              "adding-ai-chat-to-your-app": {
                title: "Add AI chat to an existing app",
              },
              "oauth-external-server": {
                title: "Build MCP with external OAuth",
              },
              "deploy-from-github-actions": {
                title: "Deploy from Github Actions",
              },
              "creating-taskmaster-mcp-server": {
                title: "Create a Taskmaster MCP server",
              },
              "consuming-external-apis": {
                title: "Connect to External APIs",
              },
              "open-ai-apps-sdk": {
                title: "Build a ChatGPT App",
              },
              "using-environments-with-vercel-ai-sdk": {
                title: "Using environments with the Vercel AI SDK",
              }
            },
          },
        },
      },
      /*
      /docs/standalone-mcp/
      */
      "standalone-mcp-section": {
        type: "separator",
        title: <SidebarSeparator>{"Self-hosted MCP"}</SidebarSeparator>,
      },
      "standalone-mcp": {
        title: "Standalone MCP",
        display: "children",
        items: {
          "build-server": {
            title: "Generate Server",
          },
          "customize-tools": {
            title: "Customize Tools",
          },
          "custom-resources": {
            title: "Custom Resources",
          },
          "custom-prompts": {
            title: "Custom Prompts",
          },
          "setting-up-oauth": {
            title: "Setting up OAuth",
          },
          "cloudflare-deployment": {
            title: "Deploying on Cloudflare",
          },
          "remote-mcp-servers": {
            title: "Remote MCP Servers",
          },
        },
      },
      /*
        SDKs
      */
      "sdks-section": {
        type: "separator",
        title: <SidebarSeparator>{"SDKs"}</SidebarSeparator>,
      },
      sdks: {
        title: "SDKs",
        display: "children",
        items: {
          introduction: {
            title: "Introduction",
          },
          "core-concepts": {
            title: "Core Concepts",
          },
          "create-client-sdks": {
            title: "Generate SDKs",
          },
          "prep-openapi": {
            title: "Prepare OpenAPI Spec",
          },
          customize: {
            title: "Customize",
            items: {
              basics: {
                title: "Customization Basics",
              },
              structure: {
                title: "Structure",
              },
              "data-model": {
                title: "Data Model",
                items: {
                  types: {
                    title: "Types",
                  },
                  enums: {
                    title: "Enums",
                  },
                  "oneof-schemas": {
                    title: "OneOf",
                  },
                  "allof-schemas": {
                    title: "AllOf",
                  },
                  "complex-numbers": {
                    title: "Complex Numbers",
                  },
                  additionalproperties: {
                    title: "Additional Properties",
                  },
                },
              },
              methods: {
                title: "Customize methods",
              },
              responses: {
                title: "Responses & Error Handling",
                items: {
                  responses: {
                    title: "Customize Responses",
                  },
                  errors: {
                    title: "Error Handling",
                  },
                },
              },
              globals: {
                title: "Global Parameters",
              },
              servers: {
                title: "Configure servers",
              },
              deprecations: {
                title: "Deprecations",
              },
              authentication: {
                title: "Security & Authentication",
                items: {
                  overview: {
                    title: "Overview",
                  },
                  configuration: {
                    title: "Configuration Options",
                  },
                  "simple-schemes": {
                    title: "Standard security schemes",
                  },
                  oauth: {
                    title: "OAuth 2.0 Authentication",
                  },
                  "custom-security-schemes": {
                    title: "Custom Security Schemes",
                  },
                  "security-callbacks": {
                    title: "Security Callbacks",
                  },
                },
              },
              runtime: {
                title: "SDK Behavior",
                items: {
                  retries: {
                    title: "Enable Retries",
                  },
                  timeouts: {
                    title: "Enable Timeouts",
                  },
                  pagination: {
                    title: "Enable Pagination",
                  },
                  streaming: {
                    title: "Enable Streaming",
                  },
                  "server-sent-events": {
                    title: "Enable Server-Sent Events",
                  },
                  "jsonl-events": {
                    title: "Enable JSON Lines Responses",
                  },
                  "custom-http-client": {
                    title: "Customize HTTP Client",
                  },
                  "override-accept-headers": {
                    title: "Override accept headers",
                  },
                },
              },
              webhooks: {
                title: "Add webhooks to your SDKs",
              },
              code: {
                title: "Add Custom Code",
                items: {
                  "code-regions": {
                    items: {
                      overview: {},
                      python: {},
                      typescript: {},
                      java: {},
                    },
                  },
                },
              },
              typescript: {
                title: "TypeScript",
                items: {
                  "additional-index-exports": {
                    title: "Additional index exports",
                  },
                  "configuring-module-format": {
                    title: "Configuring Module Format",
                  },
                  "disabling-barrel-files": {
                    title: "Disabling Barrel Files",
                  },
                  "model-validation-and-serialization": {
                    title: "Model validation and serialization",
                  },
                  "property-naming": {
                    title: "Control property casing: snake, camel",
                  },
                  "react-hooks": {
                    title: "Generating React Hooks from OpenAPI",
                  },
                },
              },
            },
          },
          manage: {
            title: "Manage",
            items: {
              versioning: {
                title: "Version Control",
              },
              "sdk-changelogs": {
                title: "SDK Changelogs",
              },
              "github-setup": {
                title: "Github Setup",
              },
              "sdk-sandbox": {
                title: "Enable Sandbox",
              },
              migrate: {
                title: "Migrate",
              },
              "forward-compatibility": {
                title: "Forward Compatibility",
              },
              "breaking-changes": {
                title: "Handle Breaking Changes",
              },
            },
          },
          "publish-sdk": {
            title: "Publish SDK",
          },
          "sdk-contract-testing": {
            title: "SDK Contract Testing",
            items: {
              "bootstrapping-test-generation": {
                title: "Bootstrapping SDK Tests",
              },
              "customizing-sdk-tests": {
                title: "Customizing SDK Tests",
              },
              "github-actions": {
                title: "Testing in Github Actions",
              },
              "openapi-in-tests": {
                title: "OpenAPI data in Tests",
              },
              "running-tests": {
                title: "Running SDK Tests",
              },
              "custom-contract-tests": {
                title: "Custom Contract Tests",
              },
            },
          },
          "sdk-docs": {
            title: "SDK Documentation",
            items: {
              "edit-readme": {
                title: "Edit README",
              },
              integrations: {
                title: "Integrate with docs provider",
                items: {
                  readme: {
                    title: "README.com",
                  },
                  mintlify: {
                    title: "Mintlify",
                  },
                  scalar: {
                    title: "Scalar",
                  },
                  bump: {
                    title: "Bump.sh",
                  },
                },
              },
              "code-samples": {
                title: "Code Samples",
                items: {
                  "generate-code-samples": {
                    title: "Generate Code Samples",
                  },
                  "code-samples-api": {
                    title: "Code Samples API",
                  },
                  "automated-code-sample-urls": {
                    title: "Automated Code Sample URLs",
                  },
                },
              },
              "snippet-ai": {
                title: "SnippetAI",
                display: "hidden",
                items: {
                  overview: {
                    title: "Overview",
                  },
                  "integrate-via-react": {
                    title: "Integrate via React",
                  },
                  "integrate-via-web-component": {
                    title: "Integrate via Web Component",
                  },
                  "integrate-via-script": {
                    title: "Integrate via Script",
                  },
                },
              },
            },
          },
          languages: {
            title: "Language Design",
            items: {
              philosophy: {
                title: "Design philosophy",
              },
              maturity: {
                title: "Maturity",
              },
              typescript: {
                title: "TypeScript",
                items: {
                  "methodology-ts": {
                    title: "TypeScript design",
                  },
                  "oss-comparison-ts": {
                    title: "Speakeasy vs. OSS generators",
                  },
                  "migrating-from-oss": {
                    title: "Migrating from OpenAPI Generator to Speakeasy",
                  },
                  "feature-support": {
                    title: "Feature reference",
                  },
                  "standalone-functions": {
                    title: "Standalone functions",
                  },
                },
              },
              python: {
                title: "Python",
                items: {
                  "methodology-python": {
                    title: "Python design",
                  },
                  "oss-comparison-python": {
                    title: "Speakeasy vs. OSS generators",
                  },
                  "feature-support": {
                    title: "Feature reference",
                  },
                },
              },
              golang: {
                title: "Go",
                items: {
                  "methodology-go": {
                    title: "Go design",
                  },
                  "oss-comparison-go": {
                    title: "Speakeasy vs. OSS generators",
                  },
                  "feature-support": {
                    title: "Feature reference",
                  },
                },
              },
              java: {
                title: "Java",
                items: {
                  "methodology-java": {
                    title: "Java design",
                  },
                  "oss-comparison-java": {
                    title: "Speakeasy vs. OSS generators",
                  },
                  "feature-support": {
                    title: "Feature reference",
                  },
                },
              },
              csharp: {
                title: "C#",
                items: {
                  "methodology-csharp": {
                    title: "C# design",
                  },
                  "oss-comparison-csharp": {
                    title: "Speakeasy vs. OSS generators",
                  },
                },
              },
              php: {
                title: "PHP",
                items: {
                  "methodology-php": {
                    title: "PHP design",
                  },
                  "oss-comparison-php": {
                    title: "Speakeasy vs. OSS generators",
                  },
                },
              },
              ruby: {
                title: "Ruby [beta]",
                items: {
                  "methodology-ruby": {
                    title: "Ruby design [coming soon]",
                  },
                },
              },
              rust: {
                title: "Rust [coming]",
                items: {
                  "methodology-rust": {
                    title: "Rust design [coming soon]",
                  },
                },
              },
              cpp: {
                title: "C++ [coming]",
                items: {
                  "methodology-cpp": {
                    title: "C++ design [coming soon]",
                  },
                },
              },
              unity: {
                title: "Unity [beta]",
                items: {
                  "methodology-unity": {
                    title: "Unity design [coming soon]",
                  },
                },
              },
            },
          },
        },
      },
      "docs-md": {
        // Hide DocsMD docs while we're still in private beta. We'll make them visible
        // once we hit public beta in July.
        display: "hidden",
      },

      /*
            Terraform
          */
      "terraform-section": {
        type: "separator",
        title: <SidebarSeparator>{"Terraform"}</SidebarSeparator>,
      },
      terraform: {
        title: "Terraform",
        display: "children",
        items: {
          "create-terraform": {
            title: "Generate Terraform Provider",
          },
          "publish-terraform": {
            title: "Publish Terraform Provider",
          },
          customize: {
            title: "Customize Terraform",
            items: {
              index: {
                title: "Overview",
              },
              "entity-mapping": {
                title: "Map API Entities",
              },
              "provider-configuration": {
                title: "Provider Configuration",
              },
              "resource-configuration": {
                title: "Resource Configuration",
              },
              "property-customization": {
                title: "Property Customization",
              },
              "validation-dependencies": {
                title: "Validation and Dependencies",
              },
              "plan-modification": {
                title: "Plan Modification",
              },
              "advanced-features": {
                title: "Advanced Features",
              },
              "schema-keywords": {
                title: "Schema Keywords",
              },
              testing: {
                display: "hidden",
              },
              extensions: {
                display: "hidden",
              },
            },
          },
        },
      },
      /*
            Reference
          */
      "reference-section": {
        type: "separator",
        title: <SidebarSeparator>{"Reference"}</SidebarSeparator>,
      },
      "speakeasy-reference": {
        title: "Speakeasy",
        items: {
          cli: {
            title: "CLI",
            items: {
              "getting-started": {
                title: "Getting Started",
              },
              "mise-toolkit": {
                title: "Using with mise toolkit",
              },
            },
          },
          generation: {
            title: "Generation Config",
            items: {
              "gen-yaml": {
                title: "Config File",
              },
              "ci-cd-pipeline": {
                title: "CI/CD Pipeline",
              },
              "ts-config": {
                title: "TypeScript Configuration",
              },
              "python-config": {
                title: "Python Configuration",
              },
              "go-config": {
                title: "Go Configuration",
              },
              "java-config": {
                title: "Java Configuration",
              },
              "csharp-config": {
                title: "C# Configuration",
              },
              "php-config": {
                title: "PHP Configuration",
              },
              "ruby-config": {
                title: "Ruby Configuration",
              },
              "terraform-config": {
                title: "Terraform Configuration",
              },
            },
          },
          supported: {
            title: "Supported",
          },
        },
      },

      /*
            Support
          */
      // "support-section": {
      //   type: "separator",
      //   title: <SidebarSeparator>{"Support"}</SidebarSeparator>,
      // },
      // "slack-community": {
      //   title: "Slack Community",
      //   href: "https://go.speakeasy.com/slack",
      // },
      // "enterprise-support": {
      //   title: "Enterprise Support",
      // },
      // // Privacy & Security
      // "privacy-security-section": {
      //   type: "separator",
      //   title: <SidebarSeparator>{"Privacy & Security"}</SidebarSeparator>,
      // },
      // "product-security": {
      //   title: "Product Security",
      // },
      // "privacy-policy": {
      //   title: "Privacy Policy",
      // },
      // "terms-of-service": {
      //   title: "Terms of Service",
      // },
    },
  },
  openapi: {
    title: "OpenAPI Hub",
    type: "page",
    display: "children",
    items: {
      "search-bar-openapi": {
        type: "separator",
        title: "__INKEEP_SEARCH__",
      },
      index: {
        title: "Introduction",
        theme: {
          layout: "full",
          toc: false,
        },
      },
      // Start standard OpenAPI order
      info: {
        title: "Info",
      },
      servers: {
        title: "Servers",
      },
      security: {
        title: "Security",
      },
      paths: {
        title: "Paths",
      },
      operations: {
        title: "Operations",
      },
      content: {
        title: "Content & Media",
        items: {
          "file-uploads": {
            title: "File Uploads",
          },
          "server-sent-events": {
            title: "Server-Sent Events",
          },
          jsonl: {
            title: "JSONL",
          },
        },
      },
      schemas: {
        title: "Data Types",
      },
      requests: {
        title: "Requests",
      },
      responses: {
        title: "Responses",
        items: {
          errors: {
            title: "Errors",
          },
          "rate-limiting": {
            title: "Rate Limiting",
          },
          headers: {
            title: "Headers",
          },
          links: {
            title: "Links",
          },
        },
      },
      components: {
        title: "Components",
      },
      tags: {
        title: "Tags",
      },
      "external-documentation": {
        title: "External Documentation",
      },
      references: {
        title: "References ($ref)",
      },
      examples: {
        title: "Examples",
      },
      // Extensions and other concepts
      extensions: {
        title: "Extensions",
      },
      overlays: {
        title: "Overlays",
      },
      // Advanced features
      webhooks: {
        title: "Webhooks",
      },
      // Additional tools and frameworks
      arazzo: {
        title: "Arazzo",
      },
      frameworks: {
        title: "Frameworks",
        items: {
          // JavaScript/TypeScript Frameworks
          "js-ts-frameworks": {
            type: "separator",
            title: (
              <SidebarSeparator>{"JavaScript/TypeScript"}</SidebarSeparator>
            ),
          },
          nestjs: {
            title: "NestJS",
          },
          fastify: {
            title: "Fastify",
          },
          hono: {
            title: "Hono",
          },
          trpc: {
            title: "tRPC",
          },
          tsoa: {
            title: "tsoa",
          },
          typespec: {
            title: "TypeSpec",
          },
          elysia: {
            title: "Elysia",
          },
          zod: {
            title: "Zod",
          },

          // Python Frameworks
          "python-frameworks": {
            type: "separator",
            title: <SidebarSeparator>{"Python"}</SidebarSeparator>,
          },
          fastapi: {
            title: "FastAPI",
          },
          django: {
            title: "Django",
          },
          flask: {
            title: "Flask",
          },
          pydantic: {
            title: "Pydantic",
          },

          // Go Frameworks
          "go-frameworks": {
            type: "separator",
            title: <SidebarSeparator>{"Go"}</SidebarSeparator>,
          },
          goa: {
            title: "Goa",
          },
          "grpc-gateway": {
            title: "gRPC-Gateway",
          },
          gnostic: {
            title: "Gnostic",
          },

          // Java Frameworks
          "java-frameworks": {
            type: "separator",
            title: <SidebarSeparator>{"Java"}</SidebarSeparator>,
          },
          springboot: {
            title: "Spring Boot",
          },

          // PHP Frameworks
          "php-frameworks": {
            type: "separator",
            title: <SidebarSeparator>{"PHP"}</SidebarSeparator>,
          },
          laravel: {
            title: "Laravel",
          },
          // Ruby Frameworks
          "ruby-frameworks": {
            type: "separator",
            title: <SidebarSeparator>{"Ruby"}</SidebarSeparator>,
          },
          rails: {
            title: "Ruby on Rails",
          },
        },
      },
      "release-notes-section": {
        type: "separator",
        title: <SidebarSeparator>{"Release Notes"}</SidebarSeparator>,
      },
      "release-notes": {
        title: "OpenAPI Release Notes",
      },
    },
  },
  "api-design": {
    title: "API Design",
    type: "page",
    display: "children",
    items: {
      "search-bar-api-design": {
        type: "separator",
        title: "__INKEEP_SEARCH__",
      },
      index: {
        title: "Introduction",
        theme: {
          layout: "full",
          toc: false,
        },
      },
      "basics-section": {
        type: "separator",
        title: <SidebarSeparator>{"API Design Basics"}</SidebarSeparator>,
      },
      "picking-architectures": {
        title: "Picking an architecture",
      },
      urls: {
        title: "Structuring URLs",
      },
      "http-methods": {
        title: "HTTP Methods",
      },
      parameters: {
        title: "Request parameters",
      },
      "data-formats": {
        title: "Data Formats",
      },
      "request-body": {
        title: "Request Body",
      },
      "status-codes": {
        title: "Status Codes",
      },
      responses: {
        title: "Response Body",
      },
      "advanced-section": {
        type: "separator",
        title: <SidebarSeparator>{"Advanced Considerations"}</SidebarSeparator>,
      },
      "file-uploads": {
        title: "File uploads",
      },
      pagination: {
        title: "Pagination",
      },
      "filtering-responses": {
        title: "Filtering responses",
      },
      caching: {
        title: "Caching",
      },
      errors: {
        title: "Returning Errors",
      },
      "rate-limiting": {
        title: "Rate limiting",
      },
      versioning: {
        title: "Versioning",
      },
      "product-section": {
        type: "separator",
        title: <SidebarSeparator>{"Productizing APIs"}</SidebarSeparator>,
      },
      "expose-api-publicly": {
        title: "Expose APIs publicly",
      },
      monetization: {
        title: "Monetizing APIs",
      },
      "developer-experience": {
        title: "Developer experience",
      },
      documentation: {
        title: "Documentation",
      },
      consistency: {
        title: "Enforcing consistency",
      },
      security: {
        title: "Security",
      },
      "api-compliance": {
        title: "API Compliance",
      },
      testing: {
        title: "Testing",
      },
      collections: {
        title: "Collections",
      },
    },
  },
  guides: {
    title: "Guides",
    type: "page",
    display: "children",
    items: {
      "search-bar-guides": {
        type: "separator",
        title: "__INKEEP_SEARCH__",
      },
      index: {
        title: "Overview",
      },
      openapi: {
        title: "OpenAPI Guides",
        items: {
          "x-codesamples": {
            title: "Code Samples Extension",
          },
          "path-fragments": {
            title: "Path Fragments",
          },
          "publish-specs-to-api-registry": {
            title: "Publish Specs to API Registry",
          },
        },
      },

      sdks: {
        title: "SDK Guides",
        items: {
          "creating-a-monorepo": {
            title: "Create a Monorepo",
          },
          "utilizing-user-agent-strings": {
            title: "User Agent Strings",
          },
          "generate-in-a-subdirectory": {
            title: "Generate in a Subdirectory",
          },
          "typescript-monorepo-tips": {
            title: "TypeScript Monorepo Tips",
          },
          "pnpm-default": {
            title: "Using PNPM",
          },
          "override-compile": {
            title: "Override Compile Commands",
          },
          overlays: {
            title: "SDK Overlays",
            items: {
              overlays: {
                title: "Common Overlays for SDKs",
              },
              "internal-external-versions": {
                title: "Internal and External SDKs",
              },
              "json-path-expressions": {
                title: "JSON Path Expressions",
              },
            },
          },
        },
      },
      hooks: {
        title: "Hook Guides",
        items: {
          "env-auth-hook": {
            title: "Environment Auth Hook",
          },
          "posthog-telemetry-hook": {
            title: "PostHog Telemetry Hook",
          },
          "sentry-error-hook": {
            title: "Sentry Error Hook",
          },
          "user-agent-hook": {
            title: "User Agent Hook",
          },
        },
      },

      terraform: {
        title: "Terraform Guides",
        items: {
          crud: {
            title: "CRUD Example",
          },
          hoisting: {
            title: "Hoisting",
          },
          "merged-entity": {
            title: "Merged Entity",
          },
          "remove-nontf-endpoints": {
            title: "Remove Non-TF Endpoints",
          },
        },
      },

      cli: {
        title: "CLI Guides",
        items: {
          "code-samples-without-github-actions": {
            title: "Populate Code Samples Without GitHub Actions",
          },
        },
      },
    },
  },
  mcp: {
    title: "MCP Hub",
    type: "page",
    display: "children",
    items: {
      "search-bar-mcp": {
        type: "separator",
        title: "__INKEEP_SEARCH__",
      },
      index: {
        title: "MCP Hub",
        theme: {
          layout: "full",
          toc: false,
        },
      },

      "getting-started-section": {
        type: "separator",
        title: <SidebarSeparator>{"Intro to MCP"}</SidebarSeparator>,
      },
      overview: {
        title: "An overview of MCP",
      },
      "core-concepts": {
        title: "Core Concepts",
        items: {
          tools: {
            title: "Tools",
          },
          resources: {
            title: "Resources",
          },
          transports: {
            title: "Transports",
          },
          prompts: {
            title: "Prompts",
          },
          completables: {
            title: "Completables",
          },
          roots: {
            title: "Roots",
          },
          sampling: {
            title: "Sampling",
          },
        },
      },
      "mcp-for-skeptics": {
        title: "MCP for Skeptics",
        items: {
          "common-criticisms": {
            title: "Common Criticisms Addressed",
          },
          "when-to-use-mcp": {
            title: "When to Use MCP",
          },
        },
      },
      "building-servers-section": {
        type: "separator",
        title: <SidebarSeparator>{"Building MCP servers"}</SidebarSeparator>,
      },
      "tool-design": {
        title: "Design MCP tools",
        items: {
          "less-is-more": {
            title: "Why less is more for MCP",
          },
          "dynamic-tool-discovery": {
            title: "Dynamic Tool Discovery",
          },
          "response-filtering-jq": {
            title: "Response Filtering with JQ",
          },
          "optimizing-openapi": {
            title: "Optimize OpenAPI for MCP",
          },
        },
      },
      "deploying-mcp-servers": {
        title: "Deploying your MCP server",
      },
      "securing-mcp-servers": {
        title: "Secure your MCP server",
        items: {
          "authenticating-mcp-servers": {
            title: "State of OAuth in MCP",
          },
          "authorizing-mcp-servers": {
            title: "Authorizing MCP servers",
          },
        },
      },
      "distributing-mcp-servers": {
        title: "Distribute your MCP server",
      },
      "monitoring-mcp-servers": {
        title: "Monitor your MCP server",
      },
      "framework-guides": {
        title: "Framework Guides",
        items: {
          "building-fastapi-server": {
            title: "Building an MCP server for FastAPI",
          },
        },
      },

      "using-mcp-section": {
        type: "separator",
        title: <SidebarSeparator>{"Using MCP servers"}</SidebarSeparator>,
      },
      "using-mcp": {
        title: "Using MCP",
        display: "children",
        items: {
          "installing-mcp-servers": {
            title: "Intro to using MCP servers",
          },
          "using-tools": {
            title: "Best practices for using MCP Tools",
          },
          "use-cases": {
            title: "MCP use cases",
            items: {
              "account-management": {
                title: "Account management",
              },
            },
          },
          "mcp-server-providers": {
            title: "Connect popular MCP servers",
            items: {
              slack: {
                title: "Slack",
              },
              hubspot: {
                title: "Hubspot",
              },
              resend: {
                title: "Resend",
              },
              pandadoc: {
                title: "Pandadoc",
              },
              postiz: {
                title: "Postiz",
              },
            },
          },
          "ai-agents": {
            title: "Building AI Agents",
            items: {
              introduction: {
                title: "Introduction to AI Agents",
              },
              "agent-use-cases": {
                title: "Use cases for AI Agents",
              },
              "architecture-patterns": {
                title: "Agent Architecture Patterns",
              },
            },
          },
        },
      },

      "release-notes-section": {
        type: "separator",
        title: <SidebarSeparator>{"Release Notes"}</SidebarSeparator>,
      },
      "release-notes": {
        title: "MCP Release Notes",
        href: "/mcp/release-notes",
      },
    },
  },
  blog: {
    title: "Blog",
    type: "page",
    display: "children",
    items: {
      "*": {
        theme: {
          sidebar: true,
          pagination: false,
        },
      },
    },
  },
  changelog: {
    title: "Changelog",
    type: "page",
    display: "children",
    items: {
      "*": {
        theme: {
          sidebar: false,
          pagination: false,
          toc: false,
        },
      },
    },
  },
  customers: {
    title: "Customers",
    type: "page",
    display: "children",
    items: {
      "*": {
        theme: {
          sidebar: false,
          pagination: false,
        },
      },
    },
  },
  legal: {
    title: "Legal",
    type: "page",
    display: "children",
    items: {
      "*": {
        theme: {
          sidebar: false,
          pagination: false,
        },
      },
    },
  },
  support: {
    title: "Support",
    type: "page",
    display: "children",
    items: {
      "*": {
        theme: {
          sidebar: false,
          pagination: false,
        },
      },
    },
  },
};

export default meta;
