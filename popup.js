const input = document.getElementById("api-key-input")
const saveBtn = document.getElementById("save-btn")
const status = document.getElementById("status")

// Load saved key when popup opens
chrome.storage.local.get("groqApiKey", (data) => {
  if (data.groqApiKey) {
    input.value = data.groqApiKey
    status.textContent = "Key saved ✓"
    status.className = "status success"
  }
})

// Save key when button clicked
saveBtn.addEventListener("click", () => {
  const key = input.value.trim()

  if (!key) {
    status.textContent = "Please enter a key first."
    status.className = "status"
    return
  }

  if (!key.startsWith("gsk_")) {
    status.textContent = "Invalid key — should start with gsk_"
    status.className = "status"
    return
  }

  chrome.storage.local.set({ groqApiKey: key }, () => {
    status.textContent = "Key saved successfully ✓"
    status.className = "status success"
  })
})