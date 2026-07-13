import re


# ---------------------------------------
# SQL Injection Detection
# ---------------------------------------
def detect_sql_injection(prompt: str) -> bool:
    prompt = prompt.lower()

    sql_patterns = [
        "drop table",
        "delete from",
        "truncate table",
        "insert into",
        "update ",
        "alter table",
        "create table",
        "union select",
        "select *",
        "--",
        ";"
    ]

    return any(pattern in prompt for pattern in sql_patterns)


# ---------------------------------------
# Prompt Injection Detection
# ---------------------------------------
def detect_prompt_injection(prompt: str) -> bool:
    prompt = prompt.lower()

    prompt_patterns = [
        "ignore previous instructions",
        "ignore all instructions",
        "forget previous instructions",
        "forget all instructions",
        "reveal system prompt",
        "show system prompt",
        "system prompt",
        "developer mode",
        "act as root",
        "bypass security",
        "jailbreak",
        "do anything now",
        "dan mode",
        "disable safety"
    ]

    return any(pattern in prompt for pattern in prompt_patterns)


# ---------------------------------------
# Secret / API Key Detection
# ---------------------------------------
def detect_secret(prompt: str):

    patterns = {
        "OpenAI API Key Detected": r"sk-[A-Za-z0-9]{20,}",
        "AWS Access Key Detected": r"AKIA[0-9A-Z]{16}",
        "GitHub Token Detected": r"ghp_[A-Za-z0-9]{36}",
        "Google API Key Detected": r"AIza[0-9A-Za-z\-_]{35}",
        "Generic Secret Detected": r"(?i)(api[_-]?key|secret|password)\s*[:=]\s*['\"]?[A-Za-z0-9_\-]{8,}"
    }

    for reason, pattern in patterns.items():
        if re.search(pattern, prompt):
            return reason

    return None


# ---------------------------------------
# PII Masking
# ---------------------------------------
def mask_pii(prompt: str):

    # Email
    prompt = re.sub(
        r'([a-zA-Z0-9._%+-]+)@([a-zA-Z0-9.-]+\.[a-zA-Z]{2,})',
        r'********@\2',
        prompt
    )

    # Phone Number
    prompt = re.sub(
        r'\b[6-9]\d{9}\b',
        '**********',
        prompt
    )

    # Aadhaar
    prompt = re.sub(
        r'\b\d{12}\b',
        '************',
        prompt
    )

    # PAN Card
    prompt = re.sub(
        r'\b[A-Z]{5}[0-9]{4}[A-Z]\b',
        '**********',
        prompt
    )

    # Credit Card
    prompt = re.sub(
        r'\b(?:\d[ -]*?){13,16}\b',
        '****************',
        prompt
    )

    return prompt


# ---------------------------------------
# Main Security Analyzer
# ---------------------------------------
def analyze_prompt(prompt: str):

    # SQL Injection
    if detect_sql_injection(prompt):
        return {
            "safe": False,
            "reason": "SQL Injection Detected",
            "masked_prompt": prompt
        }

    # Prompt Injection
    if detect_prompt_injection(prompt):
        return {
            "safe": False,
            "reason": "Prompt Injection Detected",
            "masked_prompt": prompt
        }

    # Secret Detection
    secret = detect_secret(prompt)

    if secret:
        return {
            "safe": False,
            "reason": secret,
            "masked_prompt": prompt
        }

    # PII Masking
    masked = mask_pii(prompt)

    return {
        "safe": True,
        "reason": "Safe Prompt",
        "masked_prompt": masked
    }