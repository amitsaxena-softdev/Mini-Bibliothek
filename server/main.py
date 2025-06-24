from fastapi import FastAPI, HTTPException
from models import Book
from datetime import datetime
from fastapi.middleware.cors import CORSMiddleware
from uuid import uuid4
from datetime import datetime
from models import Book, BookCreate

app = FastAPI()

# Creating cors middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

books = [
    Book(id=1, title="Der Steppenwolf", author="H. Hesse", created_by="Amit", created_at=datetime.now()),
    Book(id=2, title="Faust", author="Goethe", created_by="Admin", created_at=datetime.now())
]

# Create a "/" route that returns a welcome message
@app.get("/")
def read_root():
    return {"message": "Welcome to the Book API"}

@app.get("/books")
def get_books():
    return books

@app.put("/books/{book_id}")
def update_book(book_id: int, updated_book: Book):
    for index, book in enumerate(books):
        if book.id == book_id:
            books[index] = updated_book
            return {"message": "Book updated"}
    raise HTTPException(status_code=404, detail="Book not found")

@app.post("/books")
def add_book(book_data: BookCreate):
    new_id = max([b.id for b in books], default=0) + 1
    new_book = Book(
        id=new_id,
        title=book_data.title,
        author=book_data.author,
        created_by=book_data.created_by or "Unknown",
        created_at=datetime.now()
    )
    books.append(new_book)
    return {"message": "Book added", "book": new_book}

