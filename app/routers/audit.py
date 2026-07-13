from fastapi import APIRouter, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.orm import Session
import csv

from app.database.session import get_db
import app.crud.audit
from app.auth.oauth2 import get_current_user
from app.models.audit_log import AuditLog


router = APIRouter(
    prefix="/audit",
    tags=["Audit"]
)


@router.get("/")
def get_logs(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    if current_user["role"] != "ADMIN":
        raise HTTPException(
            status_code=403,
            detail="Access Denied"
        )

    return app.crud.audit.get_all_audit_logs(db)


@router.get("/export")
def export_logs(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    if current_user["role"] != "ADMIN":
        raise HTTPException(
            status_code=403,
            detail="Access Denied"
        )

    logs = db.query(AuditLog).all()

    filename = "audit_logs.csv"

    with open(filename, mode="w", newline="", encoding="utf-8") as file:

        writer = csv.writer(file)

        writer.writerow([
            "ID",
            "Username",
            "Prompt",
            "Masked Prompt",
            "Response",
            "Status",
            "Reason",
            "Created At"
        ])

        for log in logs:
            writer.writerow([
                log.id,
                log.username,
                log.prompt,
                log.masked_prompt,
                log.response,
                log.status,
                log.reason,
                log.created_at
            ])
@router.get("/history")
def get_my_history(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    return app.crud.audit.get_user_chat_history(
        db,
        current_user["username"]
    )

    return FileResponse(
        path=filename,
        filename=filename,
        media_type="text/csv"
    )