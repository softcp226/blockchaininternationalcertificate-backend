// document.addEventListener("DOMContentLoaded", () => {
//   const nav = document.querySelector("nav");
//   if ((nav.className = "hide")) return (nav.className = "display");
//   nav.className = "hide";
// });

document.addEventListener("DOMContentLoaded", () => {
  document.querySelector("#harmburger_container").onclick = () => {
    const nav = document.querySelector("nav");
    if ((nav.className = "hide")) return (nav.className = "display");
    nav.className = "hide";
  };

  document.querySelector(".hide_container").onclick = () => {
    document.querySelector("nav").className = "hide";
  };
});
