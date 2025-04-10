# developer-docs 🚧

Our open source documentation is under construction. Refer to our [website](https://www.speakeasy.com/docs) for up-to-date docs!

## SVG Usage in MDX Files

SVG files in our Nextra build require the `.url` property to be properly processed during build. Without it, your build will fail.

```markdown
# Correct usage
![Logo](./assets/logo.svg?.url)

# Incorrect usage - WILL CAUSE BUILD FAILURES
![Logo](./assets/logo.svg)
```
