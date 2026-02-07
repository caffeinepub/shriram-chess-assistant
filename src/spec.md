# Specification

## Summary
**Goal:** Publish the current Shriram Chess Assistant build with a clean build and deployment so it’s accessible via its public canister URL, and ensure in-app sharing uses the deployed URL.

**Planned changes:**
- Run a clean build for both frontend and backend and deploy the app to its public canister URL.
- Verify and, if needed, update the Header Share menu actions to use the deployed app URL for “Share on WhatsApp” and “Copy Link”.
- Confirm all user-facing text remains in English.

**User-visible outcome:** Users can access the app via its public canister URL, and the Share menu correctly shares/copies the deployed app link (with a success toast for Copy Link).
