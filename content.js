const tooltip = document.createElement("div")
tooltip.id = "clarify-tooltip"

const header = document.createElement("div")
header.id = "clarify-header"

const label = document.createElement("span")
label.id = "clarify-label"
label.textContent = "Clarify ✦"

const closeBtn = document.createElement("span")
closeBtn.id = "clarify-close"
closeBtn.textContent = "✕"
closeBtn.addEventListener("click", () => {
  tooltip.style.display = "none"
})

header.appendChild(label)
header.appendChild(closeBtn)

const explanationText = document.createElement("p")
explanationText.id = "clarify-text"

tooltip.appendChild(header)
tooltip.appendChild(explanationText)
document.body.appendChild(tooltip)

document.addEventListener("mouseup", (e) => {
  if (tooltip.contains(e.target)) return

  const selected = window.getSelection().toString().trim()

  if (selected.length > 3) {
    explanationText.textContent = "Clarifying..."
    tooltip.style.display = "block"
    tooltip.style.left = e.pageX + 12 + "px"
    tooltip.style.top = e.pageY + 12 + "px"

    const pageContext = document.querySelector('p')
      ? Array.from(document.querySelectorAll('p'))
          .map(p => p.innerText)
          .join(' ')
          .slice(0, 1500)
      : document.body.innerText.slice(0, 1500)

    try {
      chrome.runtime.sendMessage(
        { type: "EXPLAIN", selected, pageContext },
        (response) => {
          if (chrome.runtime.lastError) {
            explanationText.textContent = "Please refresh the page."
            return
          }
          if (response) {
            explanationText.textContent = response.explanation
          } else {
            explanationText.textContent = "Could not get explanation."
          }
        }
      )
    } catch(e) {
      explanationText.textContent = "Please refresh the page."
    }
  } else {
    tooltip.style.display = "none"
  }
})