// создать функцию очищ и экспортировать
// а в попар импорт
// export function
// export
export default function Clear() {
  const classAll = Array.from(document.querySelectorAll(".active")).forEach(
    (el) => {
      el.classList.remove("active");
    }
  );

  const listOrd = Array.from(document.querySelectorAll("#list-order__ul>li"));
  listOrd.forEach((el) => {
    el.remove();
  });
  const dif = Array.from(document.querySelectorAll("ul>li"));
  dif.forEach((el) => {
    if (el.getAttribute("disabled")) {
      el.removeAttribute("disabled");
      el.style.color = "black";
    }
  });
}
