from fastapi import FastAPI

from app.database.connection import engine
from app.database.base import Base

# Models
from app.models.audit_log import AuditLog
from app.models.user import User

# Routers
from app.routers.audit import router as audit_router
from app.routers.chat import router as chat_router
from app.routers.auth import router as auth_router
from app.routers.dashboard import router as dashboard_router
from fastapi.middleware.cors import CORSMiddleware


app = FastAPI(
    title="Enterprise LLM Security Gateway"
)

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Enterprise LLM Security Gateway"
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Create Tables
Base.metadata.create_all(bind=engine)

# Include Routers
app.include_router(audit_router)
app.include_router(chat_router)
app.include_router(auth_router)
app.include_router(dashboard_router)


@app.get("/")
def home():
    return {
        "message": "Enterprise LLM Security Gateway Running"
    }