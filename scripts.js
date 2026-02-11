document.addEventListener("DOMContentLoaded", () => {
    const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
    let i = 0;
    const spinnerElement = document.getElementById("terminal-spinner");

    if (spinnerElement) {
        setInterval(() => {
            spinnerElement.innerText = frames[i++ % frames.length];
        }, 100);
    }
});