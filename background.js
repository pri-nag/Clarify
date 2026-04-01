console.log("background.js loaded")

chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
  if (message.type === "EXPLAIN") {
    const { selected, pageContext } = message

    chrome.storage.local.get("groqApiKey", (data) => {
      const GROQ_API_KEY = data.groqApiKey

      if (!GROQ_API_KEY) {
        sendResponse({ explanation: "Please add your Groq API key by clicking the Clarify icon." })
        return
      }

      const prompt = `
        You are a helpful assistant for students.
        A student is reading this text: "${pageContext}"
        They selected: "${selected}"
        Explain in MAXIMUM 1 sentence what "${selected}" means in this context.
        Be direct. No intro phrases like "In this context" or "This means".
        Just the explanation itself.
      `

      fetch("https://api.groq.com/openai/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${GROQ_API_KEY}`
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",
          messages: [{ role: "user", content: prompt }],
          max_tokens: 80
        })
      })
      .then(res => res.json())
      .then(data => {
        const explanation = data.choices?.[0]?.message?.content || "Could not explain this."
        sendResponse({ explanation })
      })
      .catch(() => sendResponse({ explanation: "API error. Try again." }))
    })

    return true
  }
})