//Auto complete
const search = document.querySelector("#search-subject");
const matchList = document.querySelector("#match-list");
const subjectTable = document.querySelector(".subject-table tbody");

const searchSubjects = async (searchText) => {
  const response = await fetch(
    "http://www.fulek.com/VUA/SUPIT/GetNastavniPlan"
  );
  const subjects = await response.json();

  let matches = subjects.filter((subject) => {
    const regex = new RegExp(`^${searchText}`, "gi");
    return subject.label.match(regex);
  });

  if (searchText.length === 0) {
    matches = [];
    matchList.innerHTML = "";
  }

  outputHtml(matches);
};

const outputHtml = (matches) => {
  if (matches.length > 0) {
    const html = matches
      .map(
        (match) => `
            <div class="hover:cursor-pointer" onclick="getSubjectInfo(this)" data-subjectid="${match.value}" data-subjectname="${match.label}">
                <h4>${match.label}</h4>
            </div>
        `
      )
      .join("");

    console.log(html);
    matchList.innerHTML = html;
  }
};

const getSubjectInfo = async (element) => {
  const name = element.dataset.subjectname;
  const subjectId = element.dataset.subjectid;
  search.value = name;

  const response = await fetch(
    `http://www.fulek.com/VUA/supit/GetKolegij/${subjectId}`
  );
  const data = await response.json();
  insertInTable(data);
};

const insertInTable = (data) => {
  let createTableRow = `
    <tr>
        <td>${data.kolegij}</td>
        <td>${data.ects}</td>
        <td>${data.sati}</td>
        <td>${data.predavanja}</td>
        <td>${data.vjezbe}</td>
        <td>${data.tip}</td>
        <td>${data.semestar}</td>
        <td><input type="button" value="Izbrisi" onclick="removeItem(event)" class="bg-red-500 text-white p-2 rounded-lg text-lg hover:cursor-pointer"/></td>
    </tr>
  `;

  subjectTable.innerHTML += createTableRow;
  calculateValues();
};

const removeItem = (event) => {
  event.target.parentElement.parentElement.remove();
  calculateValues();
};

const calculateValues = () => {
  let table = document.querySelector(".subject-table");
  let ects = Array.from(table.rows)
    .slice(1)
    .reduce((total, row) => {
      return total + parseFloat(row.cells[1].innerHTML);
    }, 0);

  let hours = Array.from(table.rows)
    .slice(2)
    .reduce((total, row) => {
      return total + parseFloat(row.cells[2].innerHTML);
    }, 0);

  document.querySelector("#ects").textContent = ects;
  document.querySelector("#hours").textContent = hours;
};

search.addEventListener("input", () => searchSubjects(search.value));
