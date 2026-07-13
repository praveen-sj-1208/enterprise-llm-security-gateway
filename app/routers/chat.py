from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session

from app.schemas.chat import ChatRequest
from app.schemas.audit_log import AuditLogCreate

from app.database.session import get_db
from app.crud.audit import create_audit_log

from app.services.security import analyze_prompt
from app.services.llm import generate_response
from app.services.rate_limiter import is_rate_limited

from app.auth.oauth2 import get_current_user


router = APIRouter(
    prefix="/chat",
    tags=["Chat"]
)


@router.post("/")
def chat(
    data: ChatRequest,
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    # ------------------------------------
    # STEP 1 - Rate Limiting
    # ------------------------------------
    if is_rate_limited(data.username):

        audit = AuditLogCreate(
            username=data.username,
            prompt=data.prompt,
            masked_prompt=data.prompt,
            response="BLOCKED",
            status="BLOCKED",
            reason="Rate Limit Exceeded"
        )

        create_audit_log(db, audit)

        return {
            "blocked": True,
            "reason": "Rate Limit Exceeded"
        }

    # ------------------------------------
    # STEP 2 - Security Analysis
    # ------------------------------------
    security = analyze_prompt(data.prompt)

    # SQL Injection / Prompt Injection
    if not security["safe"]:

        audit = AuditLogCreate(
            username=data.username,
            prompt=data.prompt,
            masked_prompt=data.prompt,
            response="BLOCKED",
            status="BLOCKED",
            reason=security["reason"]
        )

        create_audit_log(db, audit)

        return {
            "blocked": True,
            "reason": security["reason"]
        }

    # ------------------------------------
    # STEP 3 - PII Masking
    # ------------------------------------
    masked_prompt = security["masked_prompt"]

    # ------------------------------------
    # STEP 4 - Send to LLM
    # ------------------------------------
    result = generate_response(masked_prompt)

    # ------------------------------------
    # STEP 5 - Audit Log
    # ------------------------------------
    audit = AuditLogCreate(
        username=data.username,
        prompt=data.prompt,
        masked_prompt=masked_prompt,
        response=result["response"],
        status="ALLOWED",
        reason=security["reason"]
    )

    create_audit_log(db, audit)

    return {
        "blocked": False,
        "username": data.username,
        "original_prompt": data.prompt,
        "masked_prompt": masked_prompt,
        "response": result["response"]
    }