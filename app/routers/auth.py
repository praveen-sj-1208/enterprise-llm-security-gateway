from fastapi import APIRouter, Depends, HTTPException
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session

from app.database.session import get_db
from app.models.user import User

from app.schemas.auth import UserCreate
from app.schemas.token import Token

from app.auth.password import hash_password, verify_password
from app.auth.jwt_handler import create_access_token

from app.schemas.change_password import ChangePassword
from app.crud.user import change_password

router = APIRouter(
    prefix="/auth",
    tags=["Authentication"]
)


@router.post("/register")
def register(
    user: UserCreate,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.username == user.username
    ).first()

    if existing_user:
        raise HTTPException(
            status_code=400,
            detail="Username already exists"
        )

    new_user = User(
        username=user.username,
        password=hash_password(user.password),
        role=user.role
    )

    db.add(new_user)
    db.commit()
    db.refresh(new_user)

    return {
        "message": "User Registered Successfully",
        "username": new_user.username,
        "role": new_user.role
    }


@router.post("/login", response_model=Token)
def login(
    form_data: OAuth2PasswordRequestForm = Depends(),
    db: Session = Depends(get_db)
):

    db_user = db.query(User).filter(
        User.username == form_data.username
    ).first()

    if not db_user:
        raise HTTPException(
            status_code=401,
            detail="Invalid Username or Password"
        )

    if not verify_password(
        form_data.password,
        db_user.password
    ):
        raise HTTPException(
            status_code=401,
            detail="Invalid Username or Password"
        )

    access_token = create_access_token(
        {
            "sub": db_user.username,
            "role": db_user.role
        }
    )

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }

@router.post("/change-password")
def update_password(
    request: ChangePassword,
    db: Session = Depends(get_db)
):

    result = change_password(
        db=db,
        username=request.username,
        current_password=request.current_password,
        new_password=request.new_password
    )

    if not result["success"]:
        raise HTTPException(
            status_code=400,
            detail=result["message"]
        )

    return {
        "message": result["message"]
    }

    return {
        "access_token": access_token,
        "token_type": "bearer"
    }