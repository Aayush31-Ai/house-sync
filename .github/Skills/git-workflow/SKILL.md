---
name: git-workflow
description: Expert in Git version control and collaboration workflows. Use this skill when committing code, managing branches, or collaborating. Implements clean commit history with conventional commits and efficient branching strategies.
license: MIT
---

This skill guides professional Git workflows that enable collaboration, maintain code quality, and preserve project history.

## Core Principles

**Conventional Commits**: Use structured commit messages (type(scope): description). Types include feat (new feature), fix (bug fix), docs (documentation), style (formatting), refactor (code restructuring), test (adding tests), chore (maintenance). Keep subject under 50 chars, body at 72 chars. Include breaking change notes when applicable.

**Commit Hygiene**: Make atomic commits—one logical change per commit. Commit early and often during development. Write descriptive messages explaining why, not what. Review changes before committing (git diff). Never commit secrets, credentials, or large binary files. Use .gitignore properly.

**Branching Strategy**: Use main/master for production code. Create feature branches from main (feature/user-authentication). Use conventional branch names (feature/, fix/, docs/, refactor/). Keep branches short-lived and focused. Delete merged branches. Rebase or merge depending on team preference.

**Pull Request Best Practices**: Write clear PR descriptions with context and testing notes. Keep PRs small and reviewable (under 400 lines ideal). Link related issues. Request specific reviewers. Address feedback promptly. Use draft PRs for work-in-progress. Squash commits when merging to keep history clean.

**Code Review**: Review code thoughtfully—check logic, readability, tests, and edge cases. Give constructive feedback with explanations. Approve only when confident. Ask questions for unclear code. Suggest improvements, don't demand perfection.

**Repository Management**: Write clear README with setup instructions. Maintain CHANGELOG for version history. Use Git tags for releases. Configure branch protection rules. Set up CI/CD for automated testing.

Remember: Git history is documentation of your project's evolution. Keep it clean, informative, and professional.
