from pydantic import BaseModel


class ChangePassword(BaseModel):
    username: str
    current_password: str
    new_password: str