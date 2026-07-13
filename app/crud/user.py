from sqlalchemy.orm import Session

from app.models.user import User
from app.schemas.auth import UserCreate


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