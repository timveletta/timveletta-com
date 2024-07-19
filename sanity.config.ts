import { defineConfig } from "sanity";
import { structureTool } from "sanity/structure";
import { visionTool } from "@sanity/vision";
import { codeInput } from "@sanity/code-input";
import { schemaTypes } from "./schema";

// Different environments use different variables
const projectId = import.meta.env.PUBLIC_SANITY_PROJECT_ID!;
const dataset = import.meta.env.PUBLIC_SANITY_DATASET!;

// Feel free to remove this check if you don't need it
if (!projectId || !dataset) {
  throw new Error(
    `Missing environment variable(s). Check if named correctly in .env file.\n\nShould be:\PUBLIC_SANITY_PROJECT_ID=${projectId}\PUBLIC_SANITY_DATASET=${dataset}\n\nAvailable environment variables:\n${JSON.stringify(
      import.meta.env,
      null,
      2
    )}`
  );
}

export default defineConfig({
  name: "timveletta-com", // Can be whatever
  title: "TimVeletta.com", // Can be whatever
  projectId,
  dataset,
  plugins: [structureTool(), visionTool(), codeInput()],
  schema: {
    types: schemaTypes,
  },
});
