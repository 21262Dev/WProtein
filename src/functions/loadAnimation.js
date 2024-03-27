export default function loadAnim() {
    const intro = document.getElementById("intro");
    const loader = document.querySelector(".circle-loader");
    
    window.setTimeout(() => {
        loader.style.animation = "none";
        loader.style.background = "white";

        intro.style.animation = "byeBye 1s";
        intro.style.animationFillMode = "forwards";
    }, 4000);
}