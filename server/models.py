from pydantic import BaseModel
from datetime import datetime
from typing import Optional

class Book(BaseModel):
    id: int
    title: str
    author: str
    created_by: str
    created_at: datetime

class BookCreate(BaseModel):
    title: str
    author: str
    created_by: Optional[str] = "Unknown"
