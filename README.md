# ✉️ AI Email Reply Generator (Spring Boot + React + Gemini API)

An intelligent **Email Reply Generator** powered by **Google Gemini AI**, built with **Spring Boot** for the backend, **React** for the frontend, and an optional **Chrome Extension** for Gmail integration.

This project generates **natural, tone-specific replies** to emails automatically — ideal for productivity and professional communication assistance.

---

## 🚀 Features

- Generate realistic, context-aware replies using Gemini 1.5 Flash  
- Choose between multiple tones: *Professional, Casual, Friendly*  
- Lightweight React UI with Material UI components  
- Spring Boot backend using WebClient for API calls  
- Secure key management via environment variables  
- Chrome extension integration for Gmail  

---

## 🧠 Tech Stack

| Layer | Technology |
|-------|-------------|
| **Frontend** | React.js, Material UI, Axios |
| **Backend** | Spring Boot (Java 17), WebClient |
| **AI Model** | Google Gemini 1.5 Flash |
| **Extension** | JavaScript, DOM Manipulation |
| **Build Tools** | Maven, Vite |

---

## 📁 Project Structure

email-reply-generator/
│
├── backend/ # Spring Boot Application
│ ├── src/main/java/com/email/writer/
│ │ ├── controller/EmailGeneratorController.java
│ │ ├── service/EmailGeneratorService.java
│ │ └── model/EmailRequest.java
│ ├── resources/
│ │ └── application.properties
│ └── pom.xml
│
├── frontend/ # React Frontend
│ ├── src/
│ │ ├── App.jsx
│ │ ├── App.css
│ │ └── components/
│ ├── package.json
│ └── vite.config.js
│
├── extension/ # Chrome Extension
│ ├── manifest.json
│ ├── content.js
│ └── popup.html
│
└── README.md

