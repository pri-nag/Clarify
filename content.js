const tooltip = document.createElement("div")
tooltip.id = "clarify-tooltip"
document.body.appendChild(tooltip)

document.addEventListener("mouseup", (e) => {
  const selected = window.getSelection().toString().trim()

  if (selected.length > 3) {
    tooltip.textContent = "Clarifying..."
    tooltip.style.display = "block"
    tooltip.style.left = e.pageX + 12 + "px"
    tooltip.style.top = e.pageY + 12 + "px"

    const pageContext = document.body.innerText.slice(0, 1500)

    try {
      chrome.runtime.sendMessage(
        { type: "EXPLAIN", selected, pageContext },
        (response) => {
          if (chrome.runtime.lastError) {
            tooltip.textContent = "Please refresh the page."
            return
          }
          if (response) {
            tooltip.textContent = response.explanation
          } else {
            tooltip.textContent = "Could not get explanation."
          }
        }
      )
    } catch(e) {
      tooltip.textContent = "Please refresh the page."
    }
  } else {
    tooltip.style.display = "none"
  }
})