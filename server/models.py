from pydantic import BaseModel
from datetime import datetime

class Book(BaseModel):
    id: int
    title: str
    author: str
    created_by: str
    created_at: datetime
