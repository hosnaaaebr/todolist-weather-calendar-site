const addShortcut = document.querySelector(".add-shortcut");
const icons = [
  {
    url: "https://github.com/",
    title: "github",
    id: "1",
    img: "assets/Images/github.png",
  },
  {
    url: "https://web.telegram.org/",
    title: "telegram",
    id: "2",
    img: "assets/Images/telegram.png",
  },
  {
    url: "https://www.instagram.com/",
    title: "instagram",
    id: "3",
    img: "assets/Images/icons8-instagram-48.png",
  },
];

function createLi() {
  let htmlContent = "";

  icons.forEach((icon) => {
    addShortcut.innerHTML += `<li class="icon-${icon.id}">
           <div>
             <img src="${icon.img}" alt="">
           </div>
           <h5><a href="${icon.url}" target="_blank">${icon.title}</a></h5>
         </li>`;
  });

  if (icons.length < 11) {
    const nums = 11 - icons.length;
    for (let i = 0; i < nums; i++) {
      addShortcut.innerHTML += `<li class="icon-${i}"><i class="bx bx-plus"></i></li>`;
    }
  }
}

createLi();
