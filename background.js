console.log("background.js loaded")

const GEMINI_API_KEY = "AIzaSyDsgRXFHE8RM-HMrc34jsWdDJHJsXfdekk"

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  console.log("message received:", message)
  if (message.type === "EXPLAIN") {
    console.log("explaining:", message.selected)
    const { selected, pageContext } = message

    const prompt = `
      You are a helpful assistant for students.
      A student is reading a page that contains this context:
      "${pageContext}"
      
      They selected this text: "${selected}"
      
      In 2-3 sentences, explain what this means in the context 
      of what they are reading. Use simple plain English.
      No jargon. Be direct and helpful.
    `

    fetch(`https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash-lite:generateContent?key=${GEMINI_API_KEY}`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }]
      })
    })
    .then(res => res.json())
    .then(data => {
      console.log("Gemini response:", JSON.stringify(data))
      const explanation = data.candidates?.[0]?.content?.parts?.[0]?.text || "Could not explain this."
      sendResponse({ explanation })
    })
    .catch(() => sendResponse({ explanation: "API error. Try again." }))

    return true
  }
})