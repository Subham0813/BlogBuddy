# 📝 BlogBuddy

**Live URL:** [BlogBuddy](https://blogbuddy1-0.onrender.com)

**BlogBuddy** is a full-stack dynamic blogging web application where users can sign up, write blog posts, like posts, and engage via comments and threaded replies. Built using EJS and Bootstrap5 for the frontend, with a Node.js + Express.js backend and MongoDB database.

---

## 🚀 Features

- 👤 User registration and login system (with session-based auth)
- 📝 Create, edit, and delete personal blog posts
- 👍 Like functionality on blog posts
- 💬 Comment on blog posts
- 🔁 Reply to comments (threaded replies)
- 📱 Clean, mobile-responsive UI using Bootstrap
- 🔒 Only logged-in users can post blogs or comment

> ✨ Upcomings:
>
> - Edit/delete comments and replies
> - User profile pages

---

## 💻 Tech Stack

### 🔹 Backend:

- Node.js
- Express.js
- MongoDB + Mongoose
- Express-session (Auth)
- Bcrypt (Password hashing)

### 🔹 Frontend:

- EJS (Embedded JavaScript Templating) for SSR
- Bootstrap (Latest version)
- Custom CSS (for styling tweaks)
- Client-side JS

---

## 📁 Folder Structure

```
BlogBuddy/
├── public/               # Static assets (CSS, JS, images)
├── routes/               # Express route handlers
├── controllers/          # Logic for blogs, auth, comments
├── models/               # Mongoose schemas
├── views/                # EJS templates
│   ├── partials/         # Header, footer, nav, etc.
│   └── pages/            # Home, login, register, blog pages
├── .env                  # Environment variables
├── app.js                # Entry point
└── package.json
```

---

## ⚙️ Getting Started (Run Locally)

1. **Clone the repository:**

```bash
git clone https://github.com/Subham0813/BlogBuddy.git
cd BlogBuddy
```

2. **Install dependencies:**

```bash
npm install
```

3. **Set up `.env` file:**

```env
PORT=8000
MONGO_URI=your_mongodb_uri
SESSION_SECRET=your_secret_key
```

4. **Run the server:**

```bash
npm run dev
```

5. **Visit in browser:**

```
http://localhost:8000
```

---

## 📸 Screenshots

Here are a few snapshots of BlogBuddy in action:

**📱 Mobile View**

![alt text](Screenshot_20250422-140124-1.png)

---

**💻 Desktop View**

![alt text](image.png)

![alt text](screencapture-blogbuddy1-0-onrender-blogs-68075238026b820a56e20bd7-2025-04-22-14_00_17-1.png)

---

## ⚠️ Current Limitation – No Blog Formatting (Yet)

Right now, blog content is stored and displayed as plain text inside a <p> tag, which means there’s no support for headings, bold text, bullet points, or code formatting.

But this was a conscious decision — I wanted to get the core features working first before diving into rich text editors or markdown support.

## 📌 Future Improvements:

Integrating a Markdown parser or rich text editor like Quill.js or Toast UI Editor

Allowing users to format their blogs with bold, italics, headings, links, and code blocks

Sanitizing input to prevent XSS

---

## ✌️ Author

Made with 💙 by [**Subham Bachar**](https://linkedin.com/in/subhambachar13)  
🔗 GitHub: [@Subham0813](https://github.com/Subham0813)

---

## 📄 License

This project is licensed under the MIT License – feel free to use and contribute!
