from sqlalchemy import Column, Integer, String, Text, DateTime
from datetime import datetime

from app.database.base import Base


class AuditLog(Base):
    __tablename__ = "audit_logs"

    id = Column(Integer, primary_key=True, index=True)

    username = Column(String(100))

    # Original User Prompt
    prompt = Column(Text)

    # Prompt after masking sensitive data
    masked_prompt = Column(Text)

    # LLM Response
    response = Column(Text)

    # Status
    status = Column(String(20))

    # Security Reason
    reason = Column(String(255))

    created_at = Column(DateTime, default=datetime.utcnow)