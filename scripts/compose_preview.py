#!/usr/bin/env python3
import argparse
import json
import shutil
from pathlib import Path

UI_OWNED_FILES = {
    Path("docs/index.md"),
    Path("docs/question-bank.md"),
    Path("docs/flashcards.md"),
    Path("docs/mock-interview.md"),
}

def copy_file(src: Path, dst: Path) -> None:
    dst.parent.mkdir(parents=True, exist_ok=True)
    shutil.copy2(src, dst)

def question_version(root: Path) -> int:
    path = root / "docs/data/questions.json"
    if not path.exists():
        return -1
    try:
        return int(json.loads(path.read_text(encoding="utf-8")).get("version", 0))
    except Exception:
        return -1

def main() -> None:
    parser = argparse.ArgumentParser(
        description="Compose a branch preview using main as the UI source of truth."
    )
    parser.add_argument("--main", required=True, dest="main_root")
    parser.add_argument("--branch", required=True, dest="branch_root")
    parser.add_argument("--output", required=True, dest="output_root")
    args = parser.parse_args()

    main_root = Path(args.main_root).resolve()
    branch_root = Path(args.branch_root).resolve()
    output_root = Path(args.output_root).resolve()

    if output_root.exists():
        shutil.rmtree(output_root)
    output_root.mkdir(parents=True)

    # UI/config always comes from main.
    copy_file(main_root / "mkdocs.yml", output_root / "mkdocs.yml")
    copy_file(main_root / "requirements-docs.txt", output_root / "requirements-docs.txt")
    shutil.copytree(main_root / "docs", output_root / "docs", dirs_exist_ok=True)

    # Branch owns content, but never shared UI assets or shell pages.
    branch_docs = branch_root / "docs"
    if branch_docs.exists():
        for src in branch_docs.rglob("*"):
            if src.is_dir():
                continue

            rel = src.relative_to(branch_root)

            if rel.parts[:2] == ("docs", "assets"):
                continue
            if rel in UI_OWNED_FILES:
                continue

            # Question data uses the branch only when it is compatible with main schema.
            if rel == Path("docs/data/questions.json"):
                branch_version = question_version(branch_root)
                main_version = question_version(main_root)
                if branch_version < main_version:
                    print(
                        f"Keeping main questions.json because branch schema v{branch_version} "
                        f"is older than main v{main_version}."
                    )
                    continue

            copy_file(src, output_root / rel)

    print("Preview composed successfully.")
    print("UI source: main")
    print("Content source: branch")
    print(f"Main data version: {question_version(main_root)}")
    print(f"Branch data version: {question_version(branch_root)}")

if __name__ == "__main__":
    main()
