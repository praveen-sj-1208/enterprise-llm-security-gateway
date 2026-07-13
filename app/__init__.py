from pydantic import BaseModel
from datetime import datetime


class AuditLogCreate(BaseModel):
    username: str
    prompt: str
    response: str


class AuditLogResponse(AuditLogCreate):
    id: int
    created_at: datetime

    class Config:
        from_attributes = True