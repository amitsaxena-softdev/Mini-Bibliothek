# 📚 Mini-Bibliothek Web Project

A simple web application to manage a list of books, built with:

![Screenshot](https://github.com/amitsaxena-softdev/Mini-Bibliothek/blob/c687f09cbd0a95b9919c9419358f863f855b7893/public/Screenshot.png)

- **Frontend**: SAPUI5 + TypeScript
- **Backend**: FastAPI (Python)
- **Features**: Add, edit, delete books with UI dialogs and JSON-based backend communication

---

## 🚀 Project Structure
```bash
MINI-BIBLIOTHEK
    │
    │    
    │───my.bookapp/                    # Frontend (SAPUI5 Typescript)
    │       │
    │       ├───controller/            # Contains all functionalities
    │       ├───css/                   # Styling class
    │       ├───model/                 # Contains models
    │       ├───view/                  # Contains the XML Data
    │       ├───Component.ts           # Component to be loaded
    │       ├───index.html             # HTML File to be rendered
    │       ├───manifest.json          # Component to be loaded
    │
    │
    └───server/                        # Backend (FastAPI)
            │
            ├───main.py                # Business logic for each route
            ├───models.py              # Data Models
```
---

## 💡 Features

- 📖 View all books (title, author, created_by, created_at)
- ➕ Add new book via dialog
- ✏️ Edit book details
- ❌ Delete a book
- 🎨 Basic styling with SAP Fiori 3 theme

---

## 🛠️ Setup Instructions

### 1. Backend (FastAPI)

First install the python dependency, then start by npm script

```bash
cd server
pip install fastapi uvicorn pydantic
npm start
```

### 2. Frontend (SAPUI5 + TypeScript)

Open up a new terminal:

```bash
cd my.bookapp
npm install
npm start
```
## 📡 API Endpoints

| Method | Endpoint      | Description             |
| ------ | ------------- | ----------------------- |
| GET    | `/books`      | Get all books           |
| POST   | `/books`      | Add a new book          |
| PUT    | `/books/{id}` | Update an existing book |
| DELETE | `/books/{id}` | Delete a book by ID     |

All requests use JSON payloads.

## ✨ Future Improvements
- [ ] Pagination or filtering support
- [ ] User authentication
- [ ] Persist data in a real database (e.g. SQLite, PostgreSQL)
- [ ] Responsive layout improvements
- [ ] Unit tests and CI pipeline

## 👨‍💻 Author
**Amit Saxena**
B.Sc. Computer Science, Saarland University

📧 [amitsaxena.softdev@gmail.com](mailto:amitsaxena.softdev@gmail.com)  
🔗 [LinkedIn](https://www.linkedin.com/in/amit-saxena-b55345206/) | [GitHub](https://github.com/amitsaxena-softdev/)

