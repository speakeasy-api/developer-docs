## Content guidelines

### **Markdown language**

Speakeasy documentation and blog posts are written in [MDX](https://mdxjs.com/) (`.mdx` files). You may encounter some Markdown (`.md`) files.

MDX (Markdown with JSX) uses the same formatting syntax for basic text elements as standard Markdown. This [guide to basic Markdown syntax](https://www.markdownguide.org/basic-syntax/) shows you how to format elements like headers, bold text, italic text, lists, and links.

### **Style specifics**

#### **Heading capitalization**

Speakeasy uses sentence case for titles and section headings globally.

#### **Backticks**

- In body text, place all references to code in backticks, including class names and `description` values.
- Don’t use backticks in titles, headings, or subheadings because they don’t render well.
- Don’t put language names in backticks unless it’s part of a code snippet:
  - ❌ In `go`, all types from all operations are collected into a global `AcceptHeaderEnum` type.
  - ✅ In Go, all types from all operations are collected into a global `AcceptHeaderEnum` type.

#### **Code blocks**

Speakeasy documentation uses [Code Hike](https://codehike.org/) for code blocks.

- Prefer code blocks to inline code for code snippets.
- Prefer YAML to JSON for code snippets where possible to improve readability. For example, use YAML for all OpenAPI document examples.
- Try to add a language to all code blocks. This helps with syntax highlighting.
- Use the `bash` language for shell commands.
- Terminal output can be highlighted by copying the output with control sequences (copy using iTerm2), then pasting the output to a code block and selecting the `ansi` language. This will render the output with the correct colors and formatting.
- The `ansi` language isn’t rendered as a Code Hike component. If you need to use the `ansi` language, use a standard code block.
- The `mermaid` language is used for diagrams. This language is excluded from Code Hike rendering.

#### **UI element labels**

Place all UI element labels like button text, menu items, tab names, section names, and page titles in bold.

#### **Word choice**

- Prefer “generate” over “create” when referring to the Speakeasy functionality for producing SDKs.
- Refer to Speakeasy-generated SDKs as “SDKs” not “client SDKs”.
- Use “autogenerate” over “auto-generate”.

---

## Docs

*Use this guide when writing developer documentation specifically. This does not apply to blog posts.*

<aside>
💡

Our documentation should be accessible for customers whose native language isn’t English

</aside>

### Language and Tone

- **American English**: Use American spellings and grammar conventions.
- **Avoid Pronouns**: Do not use "you/your" or "we/were." Focus on the task or action itself.

    **Example:**

  - Incorrect: "If you want to configure the server, you should..."
  - Correct: "To configure the server, follow these steps..."
- **Active Voice**: Use active voice for clarity and directness.

    **Example:**

  - Passive: "The file is uploaded by the user."
  - Active: "Upload the file."

#### Structure and Content

- **Brevity**: Keep explanations concise. Use short sentences and paragraphs to improve readability.

    **Example:**

  - Lengthy: "In order to ensure the system is functioning properly, you will need to check the logs frequently to identify any potential errors that may occur."
  - Concise: "Check logs regularly to identify errors."
- **Text Before Images**: Place relevant explanatory text above any images or diagrams. Use images as support, not a replacement, for information.

#### Images and Screenshots

- Always provide context for images and screenshots with text before the image.

#### Formatting

- **Headings**: Use clear, descriptive headings for each section.
- **Lists**: When listing steps or points, use ordered or unordered lists to improve readability.
- **Code Blocks**: Use code blocks for technical commands and scripts, and ensure proper syntax highlighting.
- **Links**: Links should be relative URLs like so: `[link](/docs/create-client-sdks)`
  - Avoid absolute paths `~~[link](https://www.speakeasy.com/docs/create-client-sdks)~~`
  - Avoid linking to the mdx file `~~[link](./create-clients.mdx)~~`
- Avoid using italics for emphasis.
- Avoid numbered lists

---

## Grammar Rules

Our choice of which English to use depends on each client's preference and house style. In the absence of a specified preference, default to American English.

### Abbreviations, initialisms, and acronyms

Don't spell out common shortenings, like API or HTML.

Shortenings written in all caps take no points (API not A.P.I.) and are followed by a lowercase 's' in plurals (APIs not API's). Only use an apostrophe to indicate possession:

- ✅ Check the API's documentation.

If there's a chance your reader won't be familiar with an acronym or initialism, spell it out the first time followed by the short version in brackets:

- ✅ Coordinated Universal Time (UTC)

Use the abbreviations "i.e.", "e.g.", and "etc." sparingly, but format them as written here if you do. If you're unsure of the proper use of these shortenings, try using their definitions in their place to see if your sentence makes sense:

- i.e. "that is"
- e.g. "for example"
- etc. "and other things"

### Apostrophe

Don't use an apostrophe to indicate plural forms.

Use an apostrophe to indicate missing letters (can't is a contraction of cannot) or possession (the user's password).

Possessive pronouns don't take an apostrophe: hers, his, its, ours, theirs, and yours.

Avoid using a possessive apostrophe with brand names and inanimate things:

- ❌ Speakeasy's SDK Generator.
- ✅ The Speakeasy SDK Generator.
- ❌ The applications's administrator.
- ✅ The administrator of the application.

### Backticks

Place inline code between backticks.

Use backticks to reference bits of code you're narrating, but not for labels or button text.

- ❌ Enter the filename and click `OK`.
- ✅ Import the built-in node `http` package.

Avoid starting headings or sentences with backticks or code:

- ❌ `request.args` is an ImmutableMultiDict.
- ✅ The `request.args` attribute is an ImmutableMultiDict.

### Capitalization

#### Titles and headings

Capitalize titles and headings according to the customer's style guide if they have one or match capitalization to their existing documentation.

At Speakeasy, we default to **sentence case** for titles and headings.

- ✅ Using multiplayer with anonymous users

#### Company names

Some company names use irregular capitalization rules. You should check the company website to confirm their preferred formatting if there's any doubt.

If the company website doesn't clear up how to capitalize their brand name, follow Wikipedia usage.

#### Websites and web publications

Capitalize the names of websites and web publications. Don't italicize.

### Code comments

When adding comments to your code, start with a capital letter and use conventional punctuation if the comment is a full sentence or multiple sentences.

- ✅ // This config enables response validation and dumping of found errors to the browser console. It's meant to be used as a helper during the development stage, so please set it to false for production systems.

Short phrases and incomplete sentences don't need to start with a capital letter or end with a period.

- ✅ // insert record

### Commas

Use a serial comma in lists:

- ✅ We shouldn't store passwords, access keys, personal information, or anything else sensitive in publicly accessible files.

Use a comma to separate introductory words, phrases, or clauses from the main clause of a sentence. These include:

- Transitional phrases and words
  - ✅ However, to ensure data security, it's crucial that you now set up appropriate user permissions.
- Adverbial phrases and clauses
  - ✅ In reality, you'll want to create a random user at the beginning of each login test.
- Conditional phrases and clauses
  - ✅ Before you can write any tests, you need a test user profile to log in with.

Avoid comma splices:

A comma splice occurs when two independent clauses are joined with a comma:

- ❌ Download the files you need, unzip them on your computer.

A clause is independent if it can stand alone as a complete sentence.

Correct comma splices by rewriting the independent clauses as complete sentences:

- ✅ Download the files you need. Unzip them on your computer.

Alternatively, add a conjunction:

- ✅ Download the files you need **and** unzip them on your computer.

Comma splices can be corrected by replacing the comma with a semicolon, but this approach is not recommended for our content:

- ✅ Download the files you need; unzip them on your computer.

### Contractions

Use common contractions (we'll, let's, can't) to make your tone friendly and informal, but avoid less common contractions (d'ya know 'em?).

### File extensions

Use uppercase when referring to a file type, add a lowercase s without an apostrophe for plurals:

- ✅ PNG
- ✅ PDFs

In file names, extensions should be lowercase:

- ✅ tictactoe.png

### Fractions and decimals

Spell out and hyphenate fractions: two-thirds (not 2/3 or two thirds).

Use decimal points when a number is not easily written out as a fraction: 1.273.

### Login, log in, log in to

**login** (noun)

Your access credentials:

- ✅ Keep your login details handy.

**log in** (phrasal verb)

- ✅ To make these changes, you'll need to log in.

**log in to** The term "log in" is a phrasal verb, so we add the preposition after a space:

- ✅ Log in to GitHub.

### Numbers

Spell out a number when it starts a sentence or if it's under ten, otherwise use numerals:

- ✅ Nine elements make up the array.
- ✅ The array has nine elements.
- ✅ MetaMask will give you a 12-word secret recovery phrase.

Some common expressions work best with numbers spelled out:

- ✅ Back to square one.
- ✅ An all-in-one solution.

Ordinals should mostly be avoided, but spelled out when used:

- ✅ Third-party
- ✅ First impression

Numbers over three digits get commas:

- ✅ 999
- ✅ 1,000
- ✅ 3,500,000

### Percent

Use the % symbol instead of spelling out "percent".

### Pronouns

Use they, their, and them in the singular if the subject's gender is unknown or irrelevant:

- ✅ Send your collaborator the join link and they'll be redirected to the sign in page.

Never use the pronoun "one".

Refer to a company or product as "it" (not "they" or "them"):

- ✅ Replit is an online IDE. It has various collaborative features.

### Quotation marks

Use double quotation marks to identify labels or button text:

- ✅ Click "OK" to complete set up

### Setup vs set up

We use **setup** as a noun or adjective:

- ✅ A microservices setup.
- ✅ Follow the setup instructions.

We use **set up** as a verb:

- ✅ How to set up your account.

### URLs and websites

Avoid spelling out URLs, but when you need to, leave off `http://www.`.

### Word list

A growing list of how we use specific words in the content we produce.

#### Data - singular or plural?

Always treat "data" as a singular noun.

- ❌ Import data and organize them.
- ✅ Import data and organize it.

#### Frontend and backend

Always write "frontend" and "backend" as single words.

#### Internet

Don't give "internet" an initial capital unless it appears at the start of a sentence.
