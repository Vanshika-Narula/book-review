# Book Review

A RESTful API for managing books and user-submitted reviews, built using **Node.js**, **Express**, **MongoDB**, and **JWT authentication**.

# Features

- User authentication (signup/login with JWT)
- Add / View books with pagination and filtering
- Review system: one review per user per book
- Edit/Delete your reviews
- Search books by title or author (case-insensitive)

# Tech Stack

- **Backend**: Node.js, Express.js
- **Database**: MongoDB (with Mongoose ODM)
- **Authentication**: JWT (JSON Web Tokens)
- **Password hashing**: bcryptjs
- **Environment Config**: dotenv

## 📦 Project Setup Instructions

1. **Clone the repository**

```bash
git clone https://github.com/your-username/book-review-api.git
cd book-review-api
Install dependencies

bash
Copy
Edit
npm install
Set up environment variables

Create a .env file in the root directory:

env
Copy
Edit
PORT=5000
MONGODB_URI=your_mongodb_connection_string
JWT_SECRET=your_jwt_secret_key
Start the server

bash
Copy
Edit
npm run dev   # for development (nodemon)
# or
npm start     # for production
🔌 How to Run Locally
After setup:

Server runs at: http://localhost:5000

Use tools like Thunder Client, Postman, or curl to test endpoints.

📬 Example API Requests
🔐 Auth Routes
Signup

http
Copy
Edit
POST /signup
Content-Type: application/json

{
  "name": "John Doe",
  "email": "john@example.com",
  "password": "password123"
}
Login

http
Copy
Edit
POST /login
Content-Type: application/json

{
  "email": "john@example.com",
  "password": "password123"
}
📚 Book Routes
Add Book (Auth required)

http
Copy
Edit
POST /books
Authorization: Bearer <token>
Content-Type: application/json

{
  "title": "The Alchemist",
  "author": "Paulo Coelho",
  "genre": "Fiction",
  "description": "A mystical story of self-discovery."
}
Get All Books

http
Copy
Edit
GET /books?page=1&limit=5&author=paulo
Get Book by ID

http
Copy
Edit
GET /books/<book_id>
⭐ Review Routes
Add a Review (One per user per book)

http
Copy
Edit
POST /books/<book_id>/reviews
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 5,
  "comment": "Inspirational and beautiful."
}
Update Review

http
Copy
Edit
PUT /reviews/<review_id>
Authorization: Bearer <token>
Content-Type: application/json

{
  "rating": 4,
  "comment": "Updated comment here."
}
Delete Review

http
Copy
Edit
DELETE /reviews/<review_id>
Authorization: Bearer <token>
🔎 Search Books
By author or title (partial match)

http
Copy
Edit
GET /search?query=paulo
GET /search?author=paulo
GET /search?title=alchemist
💡 Design Decisions / Assumptions
JWT-based authentication is used to secure sensitive endpoints.

One review per user per book is enforced at controller level.

Passwords are securely hashed using bcryptjs.

GET /books supports optional pagination and filtering.

Book titles and author searches are case-insensitive using regex.

Database Schema (MongoDB with Mongoose)
🔹 User
js
Copy
Edit
{
  name: String,
  email: String (unique),
  password: String (hashed)
}
🔹 Book
js
Copy
Edit
{
  title: String,
  author: String,
  genre: String,
  description: String
}
🔹 Review
js
Copy
Edit
{
  user: ObjectId (ref: User),
  book: ObjectId (ref: Book),
  rating: Number (1–5),
  comment: String
}
📁 Folder Structure
pgsql
Copy
Edit
book-review-api/
├── controllers/
│   ├── bookController.js
│   ├── userController.js
│   └── reviewController.js
├── models/
│   ├── User.js
│   ├── Book.js
│   └── Review.js
├── routes/
│   ├── authRoutes.js
│   ├── bookRoutes.js
│   └── reviewRoutes.js
├── middleware/
│   └── authMiddleware.js
├── .env
├── server.js
└── README.md

 Test the API
Use Thunder Client (VS Code extension) or Postman to hit endpoints. Don't forget to:
Add Authorization: Bearer <token> header where needed.

Use valid MongoDB _ids for books/reviews.
