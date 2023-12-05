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
async function fetchData() {
  try {
    const response = await fetch("/s_1/s_1_hw/s_1_hw.json");
    if (!response.ok) {
      throw new Error("не получены данные с data.json");
    }
    const data = await response.json();
    const tableClasses = document.querySelector(".table__classes");
    data.forEach(({ id, name, time, maxParticipants, currentParticipants }) => {
      const classesEl = `
      <table class="table__classes">
      <tr>
        <td>${id}</td>
        <td>${name}</td>
        <td>${time}</td>
        <td>${maxParticipants}</td>
        <td>${currentParticipants}</td>
        <td class="empty"><button class = "sign__btn">sign up</button></td>
        <td class="empty hidden"><button>cancel class</button></td>
      </tr>
    </table>`;
      tableClasses.insertAdjacentHTML("beforeend", classesEl);
      const signBtns = document.querySelectorAll(".sign__btn");
      signBtns.forEach((el) => {
        el.addEventListener("click", (e) => {
          if (currentParticipants < maxParticipants) {
            currentParticipants++;
            // e.target.closest(".cancel__btn").classList.toggle("hidden");
          } else {
            el.setAttribute("disabled", "");
          }
        });
      });
      const cancelBtn = document.querySelectorAll(".cancel__btn");
      cancelBtn.forEach((el) => {
        el.addEventListener("click", () => {
          if (
            currentParticipants <= maxParticipants &&
            !el.classList("hidden")
          ) {
            currentParticipants--;
          } else {
            el.classListAdd("hidden");
          }
        });
      });

      //   const dataToLocalStorage = JSON.stringify(data);
    });
  } catch (error) {
    console.error(error);
  }
}

//-----------------------------------------------------------------------------------
// let classElements = [];
fetchData();

