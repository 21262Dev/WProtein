export default function loadedAnim() {
    const elems = document.querySelectorAll(".scrollzer");
    elems.forEach((elem, index) => {
        elem.style.animationDelay = (index + 1) * 0.2 + "s";
    });
}