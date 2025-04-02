# Storytelling Platform

Welcome to the **Storytelling Platform**, a web application where users can create, share, and explore captivating stories. This project is built using the **MERN stack** (MongoDB, Express.js, React.js, Node.js).

## 🚀 Features
- Story creation & editing
- Interactive storytelling features
- AI-powered story suggestions (via Hugging Face API)
- Responsive & modern UI

## 📂 Repository Structure
- **client/** - Frontend (React.js)
- **server/** - Backend (Node.js, Express.js, MongoDB)

## 🔧 Installation & Setup
1. **Clone the repository:**
   ```sh
   git clone https://github.com/AbdulMoiz2493/storyTelling-Platform.git
   cd storyTelling-Platform
   ```

2. **Install dependencies:**
   ```sh
   cd client && npm install
   cd ../server && npm install
   ```

3. **Setup environment variables:**
   Create a `.env` file in the `server/` directory and add:
   ```env
   PORT=5000
   MONGO_DB_URL='mongodb://localhost:27017/your-db'
   HF_API_KEY=your-hugging-face-api-key
   ```

4. **Run the application:**
   - Start the backend:
     ```sh
     cd server
     npm run dev
     ```
   - Start the frontend:
     ```sh
     cd client
     npm run dev
     ```

5. **Access the application:**
   Open `http://localhost:5173` in your browser.

## 🛠 Technologies Used
- **Frontend:** React.js, Tailwind CSS
- **Backend:** Node.js, Express.js, MongoDB
- **AI Integration:** Hugging Face API

## 📜 License
This project is open-source and available under the **MIT License**.

---
### 👨‍💻 Contact
- Feel free to contribute or reach out for improvements!
- Email: abdulmoiz8895@gmail.com
