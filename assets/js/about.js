const notesFile = document.getElementById("notes-file");
const notesWindow = document.getElementById("notes-window");
const notesContent = document.getElementById("notes-content");

notesFile?.addEventListener("click", async (event) => {
  if (!notesWindow?.showPopover) return;

  event.preventDefault();
  notesWindow.showPopover();

  try {
    const response = await fetch(notesFile.href);
    if (!response.ok) throw new Error(`HTTP ${response.status}`);
    notesContent.textContent = await response.text();
  } catch {
    notesContent.textContent = "Could not open notes.md. Use the raw file link below.";
  }
});
