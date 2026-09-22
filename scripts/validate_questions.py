#!/usr/bin/env python3
import json
import re
import sys
from collections import Counter
from pathlib import Path

DATA_FILE = Path("docs/data/questions.json")
ALLOWED_LEVELS = {"Intern", "Junior", "Middle", "Senior"}
ID_PATTERN = re.compile(r"^(INT|JUN|MID|SEN)-[A-Z]+-[0-9]{3}$")
LEVEL_PREFIX = {
    "Intern": "INT",
    "Junior": "JUN",
    "Middle": "MID",
    "Senior": "SEN",
}

errors = []

try:
    payload = json.loads(DATA_FILE.read_text(encoding="utf-8"))
except Exception as exc:
    print(f"ERROR: Cannot parse {DATA_FILE}: {exc}")
    sys.exit(1)

questions = payload.get("questions")
if not isinstance(questions, list) or not questions:
    errors.append("questions must be a non-empty array")
    questions = []

ids = []
normalized_questions = []

for index, item in enumerate(questions, start=1):
    where = f"questions[{index}]"

    if not isinstance(item, dict):
        errors.append(f"{where}: item must be an object")
        continue

    required = ["id", "level", "topic", "question", "answer", "keyPoints", "followUps"]
    for key in required:
        if key not in item:
            errors.append(f"{where}: missing '{key}'")

    qid = item.get("id", "")
    level = item.get("level", "")
    topic = item.get("topic", "")
    question = item.get("question", "")
    answer = item.get("answer", "")
    key_points = item.get("keyPoints", [])
    follow_ups = item.get("followUps", [])

    if not isinstance(qid, str) or not ID_PATTERN.match(qid):
        errors.append(f"{where}: invalid id '{qid}'")
    else:
        ids.append(qid)
        expected_prefix = LEVEL_PREFIX.get(level)
        if expected_prefix and not qid.startswith(expected_prefix + "-"):
            errors.append(f"{qid}: id prefix does not match level '{level}'")

    if level not in ALLOWED_LEVELS:
        errors.append(f"{qid or where}: invalid level '{level}'")

    if not isinstance(topic, str) or not topic.strip():
        errors.append(f"{qid or where}: topic must be non-empty")

    if not isinstance(question, str) or len(question.strip()) < 8:
        errors.append(f"{qid or where}: question is too short")
    elif len(question) > 260:
        errors.append(f"{qid}: question is too long ({len(question)} chars)")
    else:
        normalized_questions.append(" ".join(question.lower().split()))

    if not isinstance(answer, str) or len(answer.strip()) < 80:
        errors.append(f"{qid or where}: answer should be at least 80 chars")
    elif len(answer) > 900:
        errors.append(f"{qid}: answer is too long ({len(answer)} chars)")

    if not isinstance(key_points, list) or not (2 <= len(key_points) <= 6):
        errors.append(f"{qid or where}: keyPoints must contain 2-6 items")
    elif any(not isinstance(x, str) or not x.strip() for x in key_points):
        errors.append(f"{qid or where}: keyPoints contains an empty/non-string item")

    if not isinstance(follow_ups, list) or not (1 <= len(follow_ups) <= 5):
        errors.append(f"{qid or where}: followUps must contain 1-5 items")
    else:
        for follow_index, follow_up in enumerate(follow_ups, start=1):
            follow_where = f"{qid or where}.followUps[{follow_index}]"

            if not isinstance(follow_up, dict):
                errors.append(f"{follow_where}: must be an object with question and answer")
                continue

            follow_question = follow_up.get("question", "")
            follow_answer = follow_up.get("answer", "")

            if not isinstance(follow_question, str) or len(follow_question.strip()) < 8:
                errors.append(f"{follow_where}: question is missing or too short")

            if not isinstance(follow_answer, str) or len(follow_answer.strip()) < 40:
                errors.append(f"{follow_where}: answer should be at least 40 chars")
            elif len(follow_answer) > 700:
                errors.append(f"{follow_where}: answer is too long ({len(follow_answer)} chars)")

duplicate_ids = [qid for qid, count in Counter(ids).items() if count > 1]
for qid in duplicate_ids:
    errors.append(f"duplicate id: {qid}")

duplicate_questions = [q for q, count in Counter(normalized_questions).items() if count > 1]
for question in duplicate_questions:
    errors.append(f"duplicate question text: {question}")

if errors:
    print(f"Question bank validation failed with {len(errors)} error(s):")
    for error in errors:
        print(f" - {error}")
    sys.exit(1)

level_counts = Counter(q["level"] for q in questions)
topic_counts = Counter(q["topic"] for q in questions)

print(f"Validated {len(questions)} interview questions.")
print("By level: " + ", ".join(f"{k}={level_counts[k]}" for k in ["Intern", "Junior", "Middle", "Senior"]))
print("Topics: " + ", ".join(f"{k}={v}" for k, v in sorted(topic_counts.items())))
