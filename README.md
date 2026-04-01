# Clarify ✦

> Explains any selected text in context using AI — not a dictionary definition, but what it actually means on the page you're reading.

**Live:** https://pri-nag.github.io/Clarify

---

## What it does

Select any word or sentence on any webpage and get an instant one-line AI explanation specific to what you're reading.

## Tech stack

- JavaScript (Vanilla)
- Chrome Extension APIs (Manifest V3)
- Chrome Content Scripts + Service Workers
- Groq API (Llama 3.1)
- HTML / CSS

## How to install

1. Clone this repo
```
   git clone https://github.com/pri-nag/Clarify.git
```
2. Go to `chrome://extensions` in Chrome
3. Enable **Developer Mode** (top right)
4. Click **Load Unpacked** → select the cloned folder
5. Click the Clarify icon in toolbar
6. Get a free API key from [console.groq.com](https://console.groq.com) → paste it → Save

## How to use

- Go to any webpage
- Select any word or sentence
- A tooltip appears instantly with an AI explanation in context
- Click ✕ to dismiss
