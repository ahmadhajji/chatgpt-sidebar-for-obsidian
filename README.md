# Vault Codex Assistant

`Vault Codex Assistant` is an Obsidian desktop plugin that forks the working foundation of [`takeshy/obsidian-gemini-helper`](https://github.com/takeshy/obsidian-gemini-helper) and narrows it into a Codex-first, vault-scoped assistant.

## Current direction

- Codex CLI is the only active backend.
- The current vault is the only workspace boundary.
- `AGENTS.md` in the vault root is injected into Codex chat context by default.
- The plugin keeps the reference project’s stronger parts: sidebar chat UX, vault-aware context plumbing, note tools, edit history, and CLI session handling.
- Gemini API, Claude CLI, RAG, Drive Sync, MCP settings, and workflow-first UI are hidden or disabled until they have a Codex-native path.

## Why this fork differs from the reference

Inspired by `obsidian-gemini-helper`:
- desktop-friendly Obsidian plugin structure
- chat sidebar architecture
- CLI provider/session handling
- note edit confirmation and diff tooling

Intentional differences for this project:
- no bridge or localhost companion process in the active runtime path
- no multi-provider UX
- no public-facing Gemini feature surface
- vault-local `AGENTS.md` as durable instruction context
- Codex-only setup and branding

Those differences are deliberate because this plugin is meant to behave like a Codex workspace assistant inside a single vault, not a general AI toolbox.

## Install for local testing

```bash
npm install
npm run build
```

Copy these files into your vault at `.obsidian/plugins/vault-codex-assistant/`:

- `main.js`
- `manifest.json`
- `styles.css`

Then in Obsidian:

1. Open `Settings -> Community plugins`
2. Reload plugins
3. Enable `Vault Codex Assistant`
4. Open the `Vault Codex` sidebar
5. In plugin settings, verify the `codex` executable path

## Status

This `v0.1.0` baseline is the first working basic version:

- imported the `obsidian-gemini-helper` base
- rebranded the plugin as `vault-codex-assistant`
- removed the old bridge-based runtime path
- constrained runtime setup to Codex CLI
- injected `AGENTS.md` into chat prompts
- hid incompatible settings and UI surfaces

Remaining work is product hardening on top of this base: stronger Codex-native structured proposal flows, tighter per-vault session semantics, and cleanup of remaining dormant Gemini-era modules.
