# 🍰 InstantCake - eCOM
### 🌐 Live Website: [Visit InstantCake](https://instant-cake-ecom.vercel.app/)
![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)
![Firebase](https://img.shields.io/badge/Firebase-FFCA28?style=for-the-badge&logo=firebase&logoColor=black)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=node.js&logoColor=white)
![Express](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)
![MongoDB](https://img.shields.io/badge/MongoDB-4EA94B?style=for-the-badge&logo=mongodb&logoColor=white)
---
A modern full-stack web app for ordering cakes online.  
Users can browse the menu, add items to their cart, and securely log in using **Firebase Authentication** (Google, Email/Password).  
The backend stores user details and orders, while the frontend provides a smooth shopping experience.  

---

## 🚀 Features

- 🔐 **Authentication**  
  - Firebase Auth (Google Sign-In, Email/Password)  
  - Protected routes (only logged-in users can checkout)  

- 🛒 **Cart System**  
  - Add, update, and remove items  
  - Cart badge shows item count in real-time  

- 🍕 **Menu & Services**  
  - Categorized food items (Pizza, Salad, Cakes, etc.)  
  - Dropdown menus with smooth hover effects  
  - Special offers section  

- 📱 **Responsive Navbar**  
  - Mobile + Desktop friendly  
  - Sticky navbar with hover animations  

- ⚡ **Backend Integration**  
  - Axios for API calls  
  - User details stored in database  
  - Error handling for conflicts (e.g., "User already exists")  

---

## 🛠️ Tech Stack

**Frontend**  
- React + Vite  
- TailwindCSS + DaisyUI  
- React Router DOM  
- Axios  

**Backend**  
- Node.js + Express  
- MongoDB (or your chosen DB)  

**Auth**  
- Firebase Authentication  

---

## 📦 Installation & Setup

### 1. Clone Repo
```bash
git clone https://github.com/abhinavsaxena2308/instantcake.git
cd instantcake
```
### 2. Install Dependencies
```bash
npm install
```

### 3. Setup Firebase
Go to Firebase Console

Create a project → Enable Authentication (Google & Email/Password)

Add your config to .env:
```bash
VITE_apiKey=xxxx
VITE_authDomain=xxxx.firebaseapp.com
VITE_projectId=xxxx
VITE_storageBucket=xxxx.appspot.com
VITE_messagingSenderId=xxxx
VITE_appId=xxxx
```
### 4. Run Development Server
```bash
vite
```
### 5. Run backend Server
```bash
cd server
npm install
npm run dev
```
### 📸 Screenshots
<img width="1271" height="630" alt="image" src="https://github.com/user-attachments/assets/433c3e6b-cb04-49ff-9583-0f366670ace3" />




