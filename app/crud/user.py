from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth import UserCreate

from app.auth.password import (
    hash_password,
    verify_password
)


def get_user_by_username(db: Session, username: str):
    return db.query(User).filter(User.username == username).first()


def create_user(db: Session, user: UserCreate, hashed_password: str):

    db_user = User(
        username=user.username,
        password=hashed_password,
        role=user.role
    )

    db.add(db_user)
    db.commit()
    db.refresh(db_user)

    return db_user


def change_password(
    db: Session,
    username: str,
    current_password: str,
    new_password: str
):

    user = db.query(User).filter(
        User.username == username
    ).first()

    if not user:
        return {
            "success": False,
            "message": "User not found"
        }

    if not verify_password(
        current_password,
        user.password
    ):
        return {
            "success": False,
            "message": "Current password is incorrect"
        }

    user.password = hash_password(new_password)

    db.commit()

    return {
        "success": True,
        "message": "Password changed successfully"
    }