from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.crud.audit import get_dashboard_stats
from app.auth.oauth2 import get_current_user


router = APIRouter(
    prefix="/dashboard",
    tags=["Dashboard"]
)


@router.get("/")
def dashboard(
    db: Session = Depends(get_db),
    current_user=Depends(get_current_user)
):

    if current_user["role"] != "ADMIN":
        raise HTTPException(
            status_code=403,
            detail="Access Denied"
        )

    return get_dashboard_stats(db)