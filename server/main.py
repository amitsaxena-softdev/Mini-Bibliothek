from fastapi import FastAPI, HTTPException
from models import Book
from datetime import datetime

app = FastAPI()
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
