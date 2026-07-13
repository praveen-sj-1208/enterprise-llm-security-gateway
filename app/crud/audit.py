from sqlalchemy.orm import Session
from sqlalchemy import func

from app.models.audit_log import AuditLog
from app.schemas.audit_log import AuditLogCreate


def create_audit_log(db: Session, audit: AuditLogCreate):

    db_audit = AuditLog(
        username=audit.username,
        prompt=audit.prompt,
        masked_prompt=audit.masked_prompt,
        response=audit.response,
        status=audit.status,
        reason=audit.reason
    )

    db.add(db_audit)
    db.commit()
    db.refresh(db_audit)

    return db_audit


def get_all_audit_logs(db: Session):

    return (
        db.query(AuditLog)
        .order_by(AuditLog.id.desc())
        .all()
    )


def get_dashboard_stats(db: Session):

    total_requests = db.query(func.count(AuditLog.id)).scalar()

    allowed_requests = db.query(func.count(AuditLog.id)).filter(
        AuditLog.status == "ALLOWED"
    ).scalar()

    blocked_requests = db.query(func.count(AuditLog.id)).filter(
        AuditLog.status == "BLOCKED"
    ).scalar()

    prompt_injection = db.query(func.count(AuditLog.id)).filter(
        AuditLog.reason == "Prompt Injection Detected"
    ).scalar()

    sql_injection = db.query(func.count(AuditLog.id)).filter(
        AuditLog.reason == "SQL Injection Detected"
    ).scalar()

    rate_limit = db.query(func.count(AuditLog.id)).filter(
        AuditLog.reason == "Rate Limit Exceeded"
    ).scalar()

    return {
        "total_requests": total_requests,
        "allowed_requests": allowed_requests,
        "blocked_requests": blocked_requests,
        "prompt_injection_blocked": prompt_injection,
        "sql_injection_blocked": sql_injection,
        "rate_limit_blocked": rate_limit
    }


def get_user_chat_history(db: Session, username: str):

    return (
        db.query(AuditLog)
        .filter(AuditLog.username == username)
        .order_by(AuditLog.id.desc())
        .all()
    )