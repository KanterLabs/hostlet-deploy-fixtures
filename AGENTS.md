# AGENTS — Hostlet deployment fixtures

This public repository contains deterministic, non-secret applications used to
certify Hostlet hosting behavior.

- Keep every fixture self-contained under `apps/`.
- Pin dependency and package-manager versions.
- Never add infrastructure addresses, credentials, customer data, or production
  configuration.
- `main` is the stable fixture branch. Certification systems pin full commit
  SHAs and must not depend on a moving branch.
- GitHub Actions jobs use KanterLabs homelab runner tiers.

