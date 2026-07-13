from sqlalchemy.orm import Session
from app.models.audit_log import AuditLog
from app.schemas.audit_log import AuditLogCreate


def create_audit_log(db: Session, audit: AuditLogCreate):
    db_audit = AuditLog(
        username=audit.username,
        prompt=audit.prompt,
        response=audit.response
    )

    db.add(db_audit)
    db.commit()
    db.refresh(db_audit)

    return db_audit