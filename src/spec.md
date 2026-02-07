# Specification

## Summary
**Goal:** Ensure all Chess Learning Assistant example sequences use only legal chess moves with consistent board states, move text, and `lastMove` coordinates, and add dev/runtime validation to prevent invalid examples from being shown.

**Planned changes:**
- Fully review and correct all learning examples in `frontend/src/features/learning/examples.ts` so each step-to-step transition is a legal move for the moved piece and the board position, move text, captures, and `lastMove.from/to` are consistent.
- Fix the “Scholar's Mate (Basic Checkmate)” example so bishop/queen/knight moves follow standard movement rules and match the shown positions and metadata.
- Add lightweight development/startup validation for example step data (e.g., illegal movement, `lastMove` not matching board diffs, inconsistent notation/coordinates) and show a clear English error message in the Learning UI when an example is invalid, without changing behavior when all examples are valid.

**User-visible outcome:** In the Learning view, users can step through every example without encountering illegal moves or inconsistent step data; if an example is invalid during development, the UI clearly indicates the example is invalid instead of displaying misleading steps.
