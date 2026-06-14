#!/usr/bin/env bash
# ======================================================================
# export.sh — Build New_Covenant → each Nation, then push to their Git remotes
#
# Phase 1: Run B-Build_Nations.sh to rsync New_Covenant → Nations/<church>/
#           with all per-church patches applied (DB URLs, branding, Firebase configs).
# Phase 2: Stage, commit, and push each Nation's independent Git repo to its remote.
#
# Usage:
#   bash New_Covenant/iris/export.sh
#   bash New_Covenant/iris/export.sh --dry-run
#   bash New_Covenant/iris/export.sh --skip-build     (git push only — assumes Nations are already built)
#   bash New_Covenant/iris/export.sh --message "Fix: update App Store links in embed-launcher"
#
# ======================================================================
set -euo pipefail

# ── Flag parsing ─────────────────────────────────────────────────────
DRY_RUN=false
SKIP_BUILD=false
COMMIT_MSG=""
for arg in "$@"; do
  case "$arg" in
    --dry-run)        DRY_RUN=true ;;
    --skip-build)     SKIP_BUILD=true ;;
    --message=*)      COMMIT_MSG="${arg#*=}" ;;
    --message)        ;;
    *)
      if [[ "$arg" != --dry-run && "$arg" != --skip-build ]]; then
        echo "Unknown flag: $arg"
        echo "Usage: bash New_Covenant/iris/export.sh [--dry-run] [--skip-build] [--message=\"commit message\"]"
        exit 1
      fi
      ;;
  esac
done

$DRY_RUN && echo "🏗  DRY RUN — no files will be written or pushed" && echo ""

# ── Paths ─────────────────────────────────────────────────────────────
SCRIPT_DIR="$(cd "$(dirname "$0")" && pwd)"
# Script lives at New_Covenant/iris/ → workspace root is 2 levels up
WORKSPACE="$(cd "$SCRIPT_DIR/../.." && pwd)"
NATIONS_DIR="$WORKSPACE/Nations"
B_BUILD_SCRIPT="$WORKSPACE/Iris/Bezalel/Scripts/B-Build_Nations.sh"

# ── Dependency check ──────────────────────────────────────────────────
if ! command -v git &>/dev/null; then
  echo "ERROR: git is required."
  exit 1
fi
if [ ! -d "$NATIONS_DIR" ]; then
  echo "ERROR: Nations/ directory not found at $NATIONS_DIR"
  exit 1
fi
if ! $SKIP_BUILD && [ ! -f "$B_BUILD_SCRIPT" ]; then
  echo "ERROR: B-Build_Nations.sh not found at $B_BUILD_SCRIPT"
  exit 1
fi

# ── Nation repo definitions ───────────────────────────────────────────
# Format: "folder_name|remote_url|branch"
# These MUST match the .git/config remotes in each Nations/<folder>/
NATIONS=(
  "FlockOS|https://github.com/edidasken/flockos.git|main"
  "Root|https://github.com/edidasken/build.git|main"
  "TBC|https://github.com/edidasken/trinity.git|main"
  "TheForest|https://github.com/edidasken/theforest.git|main"
  "GAS|https://github.com/edidasken/offline.git|main"
)

# ── Pre-flight: verify each Nation is a Git repo with the expected remote ──
echo "Running pre-flight checks…"
PREFLIGHT_OK=true

for entry in "${NATIONS[@]}"; do
  IFS='|' read -r FOLDER REMOTE BRANCH <<< "$entry"
  NATION_PATH="$NATIONS_DIR/$FOLDER"

  if [ ! -d "$NATION_PATH" ]; then
    echo "  ✗ MISSING: $NATION_PATH"
    PREFLIGHT_OK=false
    continue
  fi

  if [ ! -d "$NATION_PATH/.git" ]; then
    echo "  ✗ NOT A GIT REPO: $NATION_PATH (missing .git/)"
    PREFLIGHT_OK=false
    continue
  fi

  # Verify the remote URL matches
  ACTUAL_REMOTE=$(git -C "$NATION_PATH" remote get-url origin 2>/dev/null || echo "MISSING")
  if [ "$ACTUAL_REMOTE" != "$REMOTE" ]; then
    echo "  ✗ REMOTE MISMATCH for $FOLDER: expected $REMOTE, got $ACTUAL_REMOTE"
    PREFLIGHT_OK=false
  fi
done

if ! $PREFLIGHT_OK; then
  echo ""
  echo "Pre-flight FAILED. Fix errors above before exporting."
  exit 1
fi
echo "  ✓ All Nations verified as Git repos with correct remotes"
echo ""

# ═══════════════════════════════════════════════════════════════════════
# PHASE 1 — Build Nations from New_Covenant
# ═══════════════════════════════════════════════════════════════════════
if $SKIP_BUILD; then
  echo "⏭  Skipping build phase (--skip-build)"
else
  echo "══════════════════════════════════════════════════════════"
  echo "  PHASE 1: Building Nations from New_Covenant/"
  echo "══════════════════════════════════════════════════════════"
  echo ""

  if $DRY_RUN; then
    echo "  [dry-run] Would back up .git/ dirs, run bash '$B_BUILD_SCRIPT', restore .git/"
  else
    # ── Save .git/ directories before B-Build's rsync --delete wipes them ──
    GIT_BACKUPS=()
    for entry in "${NATIONS[@]}"; do
      IFS='|' read -r FOLDER REMOTE BRANCH <<< "$entry"
      NATION_PATH="$NATIONS_DIR/$FOLDER"
      if [ -d "$NATION_PATH/.git" ]; then
        BACKUP_DIR=$(mktemp -d)
        cp -a "$NATION_PATH/.git" "$BACKUP_DIR/.git"
        GIT_BACKUPS+=("$FOLDER|$NATION_PATH|$BACKUP_DIR")
        echo "  ✓ Backed up $FOLDER/.git → $BACKUP_DIR"
      fi
    done

    # ── Run B-Build (rsync --delete from New_Covenant/) ──
    bash "$B_BUILD_SCRIPT"
    BUILD_EXIT=$?
    if [ $BUILD_EXIT -ne 0 ]; then
      # Restore .git/ even on failure
      for backup in "${GIT_BACKUPS[@]}"; do
        IFS='|' read -r FOLDER NATION_PATH BACKUP_DIR <<< "$backup"
        rm -rf "$NATION_PATH/.git" 2>/dev/null || true
        cp -a "$BACKUP_DIR/.git" "$NATION_PATH/.git"
        rm -rf "$BACKUP_DIR"
      done
      echo ""
      echo "Build FAILED (exit code $BUILD_EXIT). Aborting export."
      exit $BUILD_EXIT
    fi

    # ── Restore .git/ directories ──
    for backup in "${GIT_BACKUPS[@]}"; do
      IFS='|' read -r FOLDER NATION_PATH BACKUP_DIR <<< "$backup"
      rm -rf "$NATION_PATH/.git" 2>/dev/null || true
      cp -a "$BACKUP_DIR/.git" "$NATION_PATH/.git"
      rm -rf "$BACKUP_DIR"
      echo "  ✓ Restored $FOLDER/.git"
    done
  fi

  echo ""
  echo "  ✓ Build phase complete"
fi

echo ""

# ═══════════════════════════════════════════════════════════════════════
# PHASE 2 — Git commit & push each Nation
# ═══════════════════════════════════════════════════════════════════════
echo "══════════════════════════════════════════════════════════"
echo "  PHASE 2: Pushing each Nation to its Git remote"
echo "══════════════════════════════════════════════════════════"
echo ""

# Default commit message if none provided
if [ -z "$COMMIT_MSG" ]; then
  TIMESTAMP=$(date '+%Y-%m-%d %H:%M:%S')
  COMMIT_MSG="Build: New_Covenant export — $TIMESTAMP"
fi

PUSH_FAILURES=()

for entry in "${NATIONS[@]}"; do
  IFS='|' read -r FOLDER REMOTE BRANCH <<< "$entry"
  NATION_PATH="$NATIONS_DIR/$FOLDER"

  echo "─── $FOLDER ───"

  if $DRY_RUN; then
    echo "  [dry-run] git -C '$NATION_PATH' add -A"
    echo "  [dry-run] git -C '$NATION_PATH' commit -m '$COMMIT_MSG'"
    echo "  [dry-run] git -C '$NATION_PATH' push origin $BRANCH"
    echo ""
    continue
  fi

  # Check for changes
  if ! git -C "$NATION_PATH" diff --quiet 2>/dev/null && \
     ! git -C "$NATION_PATH" diff --cached --quiet 2>/dev/null; then
    HAS_CHANGES=true
  else
    # Also check untracked files
    if [ -n "$(git -C "$NATION_PATH" ls-files --others --exclude-standard 2>/dev/null)" ]; then
      HAS_CHANGES=true
    else
      HAS_CHANGES=false
    fi
  fi

  # Fallback: always check git status for anything to commit
  if ! git -C "$NATION_PATH" diff --quiet HEAD 2>/dev/null || \
     [ -n "$(git -C "$NATION_PATH" ls-files --others --exclude-standard 2>/dev/null)" ]; then
    HAS_CHANGES=true
  else
    HAS_CHANGES=false
  fi

  if ! $HAS_CHANGES; then
    echo "  ✓ No changes — skipping push"
    echo ""
    continue
  fi

  # Stage all changes (including deletions and untracked files)
  git -C "$NATION_PATH" add -A
  echo "  ✓ Changes staged"

  # Commit
  if git -C "$NATION_PATH" commit -m "$COMMIT_MSG" 2>&1; then
    echo "  ✓ Committed: $COMMIT_MSG"
  else
    echo "  ⚠ Commit may have been empty or failed — checking status"
    # If commit says "nothing to commit", that's fine
    if git -C "$NATION_PATH" diff --cached --quiet 2>/dev/null; then
      echo "  ✓ Nothing to commit (tree clean)"
      echo ""
      continue
    fi
  fi

  # Push
  echo "  → Pushing to $REMOTE ($BRANCH)…"
  if git -C "$NATION_PATH" push origin "$BRANCH" 2>&1; then
    echo "  ✓ Push succeeded"
  else
    echo "  ✗ Push FAILED"
    PUSH_FAILURES+=("$FOLDER")
  fi

  echo ""
done

# ── Summary ───────────────────────────────────────────────────────────
echo "══════════════════════════════════════════════════════════"
if $DRY_RUN; then
  echo "  DRY RUN complete — no changes made."
elif [ ${#PUSH_FAILURES[@]} -eq 0 ]; then
  echo "  ✓ All Nations exported and pushed successfully."
else
  echo "  ⚠ Push failed for: ${PUSH_FAILURES[*]}"
  echo "  Check Git auth/network and re-run with --skip-build to retry."
fi
echo "══════════════════════════════════════════════════════════"
