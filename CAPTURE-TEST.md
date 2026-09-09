# CAPTURE-TEST

Verification that agent capture is installed and working for this project, per
step 4 of the 8x assignment.

> Status: **mechanism installed and unit-verified; live canaries pending.**
> The unresolved item is recorded honestly in "What did not work" below rather
> than papered over.

## 1. Tool and model

| | |
|---|---|
| Tool | Claude Code (CLI) |
| Model | `claude-opus-5` — Opus 5, 1M context |
| Planner / executor split | None. The same model plans and executes. There is no separate planning model, so there is no second stream of prompts to capture. |

## 2. Mechanism

Claude Code **hooks**, declared in the project's own `.claude/settings.json`:

| Hook event | Payload field used | Becomes |
|---|---|---|
| `UserPromptSubmit` | `.prompt` | `[LOG_ENTRY type=PROMPT]` |
| `Stop` | `.last_assistant_message` | `[LOG_ENTRY type=RESPONSE]` |

Both events invoke one script: `.claude/hooks/capture.sh`.

### Why only these two fields

These two fields are exactly, and only, what the assignment asks for: the prompt
that went in and the final response that came out — no thinking, no tool calls,
no intermediate steps.

The obvious-looking alternative is to parse `transcript_path` (the full JSONL
session transcript) and reconstruct the exchange from it. **We deliberately do
not do that.** The transcript contains every tool call and tool result, which
means file contents, command output and environment values. Parsing it would

1. violate the "prompt and final response, nothing in between" spec, and
2. be the single largest route for a credential to reach a public repo.

`transcript_path` is opened for exactly one purpose: reading the model name,
which is not present in the hook payload.

### Files changed

| File | Purpose |
|---|---|
| `.claude/settings.json` | Registers the two hooks. **Project-scoped.** |
| `.claude/hooks/capture.sh` | Appends entries to `.agent-logs/`. Append-only. |
| `.githooks/pre-commit` | Blocks a commit carrying a credential-shaped string in staged `.agent-logs/`. |
| `.gitignore` | `.agent-logs/` deliberately **not** ignored. |

The hooks are in the **project** settings file, never `~/.claude/settings.json`.
A user-level hook would capture every Claude Code session on this machine —
including unrelated client work — and publish it into this public repo. That is
a one-way mistake, so it is structurally prevented rather than remembered.

## 3. Log location and format

`.agent-logs/YYYY-MM-DD_HH-MM-SS_<session-id>.md`, one file per session: YAML
frontmatter (`session_id, date, author, model, tool, project, total_exchanges,
first_prompt_time, last_prompt_time`) followed by alternating `PROMPT` /
`RESPONSE` blocks.

Entries are **append-only**. They are never edited, tidied, summarised or
deleted. Only the frontmatter counters are rewritten in place, and that rewrite
is confined to the frontmatter block so that a prompt whose text happens to look
like frontmatter cannot corrupt the header — this is unit-tested, see below.

## 4. Verification

### 4a. Unit verification of the writer — PASSED

`capture.sh` was driven directly with synthetic hook payloads:

- a `UserPromptSubmit` payload with multi-line text, backticks and quotes → one
  correctly-formed `PROMPT` entry, verbatim, numbering `num=1`
- a `Stop` payload → matching `RESPONSE` entry at `num=1`
- a second exchange → `num=2` pair, `total_exchanges` advanced to 2
- **injection probe:** a prompt whose body was literally
  `total_exchanges: 999\nlast_prompt_time: HACKED`. The body was logged
  verbatim; the frontmatter was untouched and still read `total_exchanges: 2`.

### 4b. Secret gate — PASSED

Staged into `.agent-logs/` and committed against `.githooks/pre-commit`:

| Probe | Result |
|---|---|
| clean log | commit allowed |
| `sk-ant-api03-…` | **blocked** |
| `ghp_…` | **blocked** |
| `AKIAIOSFODNN7EXAMPLE` | **blocked** |
| `mongodb+srv://user:pw@…` | **blocked** |
| `password = <32 chars>` | **blocked** |

The gate **blocks the commit**; it never edits the log to remove the secret.
Editing an entry is forbidden by the assignment, and silently scrubbing a key
that has already been typed is worse than stopping — the key still needs
rotating. The block message says so.

### 4c. Live canary, session 1 — PENDING

### 4d. Live canary, session 2 (separate session) — PENDING

A hook that only works in the session that installed it is not installed. This
is verified with a second, independent session before it is called done.

## 5. What did not work

**A session started outside the project directory does not pick up the project's
hooks.** The harness was written from a Claude Code session whose working
directory was `~` (the parent of the project). After `.claude/settings.json`
existed, that session completed several further turns and `.agent-logs/` stayed
empty. Project settings are read once, when the session starts; creating them
mid-session does not retroactively arm it.

Consequence, stated plainly: work done from that session is real work, but it is
not in `.agent-logs/`, because no hook was ever armed to catch it. The fix is to
run the session from the project root. This file will not claim capture that did
not happen.

**`create-next-app` refuses a non-empty directory.** The capture harness was
committed before any product code, so the directory already contained
`.agent-logs/` and `.githooks/`. Scaffolding was done in a temporary directory
and copied in, rather than reordering the work to put the scaffold first — the
harness landing before the code is the point.
