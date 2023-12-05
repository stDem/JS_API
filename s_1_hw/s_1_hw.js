// Урок 1. Dom-дерево
// Статическая веб-страница с динамическими элементами:
// Создайте HTML-страницу с заголовком "Расписание занятий".

// Таблица с информацией о занятиях:
// Используйте JavaScript для динамического создания таблицы на основе JSON-данных.
// Каждая строка таблицы должна содержать информацию о занятии: название, время проведения, максимальное и текущее количество участников.
// 3. Кнопки "Записаться" и "Отменить запись":

// Рядом с каждым занятием добавьте кнопку "Записаться".
// Если максимальное количество участников достигнуто, сделайте кнопку неактивной.
// Предусмотрите кнопку "Отменить запись", которая появляется после записи на занятие.
// 4. Интерактивность с JavaScript:

// При нажатии на кнопку "Записаться" увеличьте количество записанных участников.
// Если пользователь нажимает "Отменить запись", уменьшите количество записанных участников.
// Обновляйте состояние кнопок и количество участников в реальном времени.
// 5. Дополнительно: Хранение данных в Local Storage:

// Сохраняйте изменения в Local Storage, чтобы они сохранялись при перезагрузке страницы.

//v_1
// async function fetchData() {
//   try {
//     const response = await fetch("/s_1/s_1_hw/s_1_hw.json");
//     if (!response.ok) {
//       throw new Error("не получены данные с data.json");
//     }
//     const data = await response.json();
//     const tableClasses = document.querySelector(".table__classes");
//     data.forEach(({ id, name, time, maxParticipants, currentParticipants }) => {
//       const classesEl = `
//       <table class="table__classes">
//       <tr>
//         <td>${id}</td>
//         <td>${name}</td>
//         <td>${time}</td>
//         <td>${maxParticipants}</td>
//         <td>${currentParticipants}</td>
//         <td class="empty"><button class = "sign__btn">sign up</button></td>
//         <td class="empty hidden"><button>cancel class</button></td>
//       </tr>
//     </table>`;
//       tableClasses.insertAdjacentHTML("beforeend", classesEl);
//       const signBtns = document.querySelectorAll(".sign__btn");
//       signBtns.forEach((el) => {
//         el.addEventListener("click", (e) => {
//           if (currentParticipants < maxParticipants) {
//             currentParticipants++;
//             // e.target.closest(".cancel__btn").classList.toggle("hidden");
//           } else {
//             el.setAttribute("disabled", "");
//           }
//         });
//       });
//       const cancelBtn = document.querySelectorAll(".cancel__btn");
//       cancelBtn.forEach((el) => {
//         el.addEventListener("click", () => {
//           if (
//             currentParticipants <= maxParticipants &&
//             !el.classList("hidden")
//           ) {
//             currentParticipants--;
//           } else {
//             el.classListAdd("hidden");
//           }
//         });
//       });

//       //   const dataToLocalStorage = JSON.stringify(data);
//     });
//   } catch (error) {
//     console.error(error);
//   }
// }

// //-----------------------------------------------------------------------------------
// // let classElements = [];
// fetchData();

//v_2
const articlesData = [
  {
    title: "Заголовок статьи 1",
    content: "Содержание статьи 1",
  },
  {
    title: "Заголовок статьи 2",
    content: "Содержание статьи 2",
  },
];

// Инициализация при загрузке страницы
window.onload = function () {
  loadArticles();
};

// Загрузка статей из данных
function loadArticles() {
  const articlesList = document.getElementById("articlesList");
  articlesList.innerHTML = "";

  articlesData.forEach((article, index) => {
    const articleCard = document.createElement("div");
    articleCard.className = "card mb-3";
    articleCard.innerHTML = `
            <div class="card-body">
                <h2 class="card-title">${article.title}</h2>
                <p class="card-text">${article.content}</p>
                <button class="btn btn-danger mr-2" onclick="deleteArticle(${index})">Удалить</button>
                <button class="btn btn-info" onclick="editArticle(${index})" data-toggle="modal" data-target="#editModal">Редактировать</button>
            </div>
        `;
    articlesList.appendChild(articleCard);
  });
}

// Добавление новой статьи
function addArticle() {
  const newArticle = {
    title: "Новая статья",
    content: "Введите содержание статьи...",
  };
  articlesData.push(newArticle);
  loadArticles();
  saveToLocalStorage();
}

// Удаление статьи по индексу
function deleteArticle(index) {
  articlesData.splice(index, 1);
  loadArticles();
  saveToLocalStorage();
}

// Редактирование статьи по индексу
function editArticle(index) {
  const editTitleInput = document.getElementById("editTitle");
  const editContentInput = document.getElementById("editContent");

  editTitleInput.value = articlesData[index].title;
  editContentInput.value = articlesData[index].content;

  // Сохраняем индекс редактируемой статьи в data-атрибуте
  editTitleInput.setAttribute("data-article-index", index);
}

// Сохранение изменений после редактирования
function saveChanges() {
  const editTitleInput = document.getElementById("editTitle");
  const editContentInput = document.getElementById("editContent");
  const index = editTitleInput.getAttribute("data-article-index");

  articlesData[index].title = editTitleInput.value;
  articlesData[index].content = editContentInput.value;

  loadArticles();
  saveToLocalStorage();

  // Закрываем модальное окно
  $("#editModal").modal("hide");
}

// Сохранение данных в локальное хранилище
function saveToLocalStorage() {
  localStorage.setItem("articlesData", JSON.stringify(articlesData));
}