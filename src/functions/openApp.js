export default function openApp() {
    const intro = document.getElementById("intro");
    const wpApp = document.getElementById("WPComponent");
    
    window.setTimeout(() => {
        intro.style.display = "none";
        wpApp.style.display = "block";
    }, 5000);
}