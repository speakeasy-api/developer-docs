---
title: Tool variations
description: Prompt-engineer tool names and descriptions for better results
sidebar:
  order: 2
---

Endpoints listed in an OpenAPI document may lack clear summaries and descriptions that convey their intent and use. When a tool definition inherits an incomplete or vague description, LLMs may struggle to understand when to invoke the tool, how to use it properly, or how to interpret its output.

Improving tool descriptions is a form of prompt engineering, and it's a critical step in building reliable, effective agents.

Gram provides two ways to improve a tool's description:

- [Editing the OpenAPI document](/docs/gram/concepts/tool-sources#optimizing-openapi-documents) and adding the `x-gram` extension to the endpoint to override or enrich the tool's metadata.
- Using the Gram Playground to directly edit a tool's name and description. This feature is called **Tool variations**.

Under the **Tools** tab for a toolset, you can edit the name and description of a tool.

To edit a tool's name, click the 3 dots and select **Edit name**. Update the tool name in the modal that opens.

<video width="600" controls>
  <source src="/assets/docs/gram/videos/tool-variations/editing-tool-name.mp4" type="video/mp4" />
    Your browser does not support the video tag.
</video>

Similarly, to edit a tool's description, click the 3 dots and select **Edit description**. Use the dedicated modal to validate and save your updated description:

<video width="600" controls>
  <source src="/assets/docs/gram/videos/tool-variations/editing-tool-description.mp4" type="video/mp4" />
    Your browser does not support the video tag.
</video>
