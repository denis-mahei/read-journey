

# 📚 Read Journey

A modern web application for managing your personal reading library, tracking reading progress, and discovering new books.

## ✨ Features

### 🔐 Authentication

- User registration
- User login
- Access & refresh token authorization
- Get current user information
- Secure logout

### 📖 Book Management

- Browse recommended books
- Add custom books
- Add books from recommendations
- Remove books from your library
- View your personal collection
- Get detailed book information

### 📈 Reading Progress

- Start reading a book
- Finish reading a book
- Track reading activity
- Remove reading progress

---

## 🛠 Tech Stack

- Next.js
- TypeScript
- tailwindcss
- REST API

---

## 🚀 Getting Started

### Install dependencies

```bash
pnpm install
```

### Environment Variables

Create a `.env.local` file:

```env
NEXT_PUBLIC_API_URL=your_api_url
```

### Run Development Server

```bash
pnpm dev
```

Open:

```text
http://localhost:3000
```

---

## 📡 API Overview

---

## ⏿ Backend

API Documentation: [Read Journey API Docs](https://readjourney.b.goit.study/api-docs)

---

### 🔐 Authentication

| Method | Endpoint | Description |
|----------|----------|-------------|
| POST | `/users/signup` | Register a new user |
| POST | `/users/signin` | Sign in |
| GET | `/users/current` | Get current user information |
| GET | `/users/current/refresh` | Refresh access and refresh tokens |
| POST | `/users/signout` | Sign out |

### Books

| Method | Endpoint | Description |
|----------|----------|-------------|
| GET | `/books/recommend` | Get recommended books |
| POST | `/books/add` | Add a custom book |
| POST | `/books/add/{id}` | Add a recommended book |
| DELETE | `/books/remove/{id}` | Remove a book from the library |
| GET | `/books/own` | Get user's books |
| POST | `/books/reading/start` | Start reading a book |
| POST | `/books/reading/finish` | Finish reading a book |
| DELETE | `/books/reading` | Remove reading progress |
| GET | `/books/{id}` | Get book details |

---

## 🚀 Live Demo

Coming soon...