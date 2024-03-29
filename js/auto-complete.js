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
            <div class="hover:cursor-pointer text-lg border-2 border-red-500 w-auto p-2 mb-2 hover:border-orange-500 rounded" onclick="getSubjectInfo(this)" data-subjectid="${match.value}" data-subjectname="${match.label}">
                <h4>${match.label}</h4>
            </div>
        `
      )
      .join("");
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
  const { kolegij, ects, sati, predavanja, vjezbe, tip, semestar } = data;
  let createTableRow = `
    <tr class="whitespace-nowrap">
        <td class="px-6 py-4 text-sm text-gray-500 text-center">${kolegij}</td>
        <td class="px-6 py-4 text-sm text-gray-500 text-center">${ects}</td>
        <td class="px-6 py-4 text-sm text-gray-500 text-center">${sati}</td>
        <td class="px-6 py-4 text-sm text-gray-500 text-center">${predavanja}</td>
        <td class="px-6 py-4 text-sm text-gray-500 text-center">${vjezbe}</td>
        <td class="px-6 py-4 text-sm text-gray-500 text-center">${tip}</td>
        <td class="px-6 py-4 text-sm text-gray-500 text-center">${semestar}</td>
        <td class="px-6 py-4 text-sm text-gray-500"><input type="button" value="Izbrisi" onclick="removeItem(event)" class="bg-red-500 text-white p-2 rounded-lg text-lg hover:cursor-pointer"/></td>
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
  let ects = 0;
  let hours = 0;
  for (let i = 1; i < table.rows.length - 1; i++) {
    console.log(table.rows[i].cells[1].innerHTML);
    ects += parseInt(table.rows[i].cells[1].innerHTML);
    hours += parseInt(table.rows[i].cells[2].innerHTML);
  }
  document.querySelector("#ects").textContent = ects;
  document.querySelector("#hours").textContent = hours;
};

search.addEventListener("input", () => searchSubjects(search.value));
