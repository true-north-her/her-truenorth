# TrueNorth Community Recommendations

## Goal
Let prospective members describe what they hope to find in a women’s community and receive grounded TrueNorth program suggestions and a useful next step.

## What will change
1. Add a polished, accessible interest form to the existing home page, placed after the community-growth story and before the Founding Circle invitation. Include a short prompt, optional examples, a clear submit/loading/error state, and a result with relevant programs and next steps.
2. Use a server-only Lovable AI Gateway call to personalize recommendations from the member’s description. Keep the model prompt and API key off the browser; constrain suggestions to TrueNorth’s existing programs and public actions. Do not store submissions or results.
3. Enable Lovable Cloud and add the required AI SDK dependencies and server-only helper/function files. Preserve the existing page, navigation, visual system, and other signup flows.
4. Verify the form interaction and real model response, run relevant project checks, and resolve any build issues.

## Technical details
- Use a TanStack Start `createServerFn` for this one-shot internal feature, with input validation and a plain serializable result.
- Stream the Responses API call server-side and consume its final text before returning it; use `openai/gpt-6-astra` via `@ai-sdk/openai` and the Lovable AI Gateway, with request-scoped run-ID propagation, `store: false`, and required reasoning options.
- Keep the feature in focused client-importable `.functions.ts` and server-only `.server.ts` modules; use plain-text model output rendered safely as text, not HTML.
