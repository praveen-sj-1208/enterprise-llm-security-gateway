from pydantic import BaseModel


class AuditLogCreate(BaseModel):
    username: str
    prompt: str
    masked_prompt: str
    response: str
    status: str
    reason: str


class AuditLogResponse(AuditLogCreate):
    id: int

    class Config:
        from_attributes = True