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

# Install / Enable the Extension in Chrome

Follow these steps to load the extension into Google Chrome for development or testing.

##Load unpacked (recommended for development)
1. Open Chrome.
2. Go to `chrome://extensions/`.
3. Turn **ON** **Developer mode** (top-right toggle).
4. Click **Load unpacked** (top-left).
5. In the file dialog, select the extension folder (the folder containing `manifest.json`) and click **Select Folder**.
6. The extension should appear in the list. Make sure it is **enabled**.
7. Open Gmail (or the target site) and test the extension.  
   - If you change code, go back to `chrome://extensions` and click the **Reload** button on your extension to apply changes.


## Notes & Tips
- Use **Load unpacked** while developing — easiest and fastest.
- Keep the `manifest.json` version updated when you publish or re-pack.
- If Gmail or the site is already open, refresh the page after installing or reloading the extension.
- To publish publicly on Chrome Web Store, you need a Google Developer account (one-time registration fee).


