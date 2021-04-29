const form = document.getElementById("form");
const homeworkList = document.getElementById("homeworkList");
let arrayHomework = [];
let arrayIndex;

const createItem = (homework) => {
  let item = {
    activity: homework,
  };
  arrayHomework.push(item);
  return item;
};

const save = () => {
  localStorage.setItem("elements", JSON.stringify(arrayHomework));
  paint();
};

const paint = () => {
  homeworkList.innerHTML = " ";
  arrayHomework = JSON.parse(localStorage.getItem("elements"));
  if (arrayHomework === null) {
    arrayHomework = [];
  } else {
    arrayHomework.forEach((element) => {
      if (element.status) {
        homeworkList.innerHTML += `<div class="alert alert-success" role="alert">
        <span class="material-icons">
        thumb_up
        </span><b>${element.activity}</b>     -  TASK DONDE
        <span class="buttons">
        <span class="material-icons">autorenew</span>
        <span class="material-icons">delete</span>
        </span>
        </div>`;
      } else {
        homeworkList.innerHTML += `<div class="alert alert-danger" role="alert">
        <span class="material-icons">history</span><b>${element.activity}</b>     -  UNREALIZED TASK
        <span class="buttons">
        <span class="material-icons">done</span>
        <span class="material-icons">delete</span>
        </span>
        </div>`;
      }
    });
  }
};

const deleted = (text) => {
  arrayHomework.forEach((element, index) => {
    if (element.activity === text) arrayIndex = index;
  });
  arrayHomework.splice(arrayIndex, 1);
  save();
};

const edit = (text) => {
  arrayHomework.forEach((element, index) => {
    if (element.activity === text) arrayIndex = index;
  });
  if (arrayHomework[arrayIndex].status)
    arrayHomework[arrayIndex].status = false;
  else arrayHomework[arrayIndex].status = true;
  save();
};

form.addEventListener("submit", (e) => {
  e.preventDefault();
  let boxText = document.getElementById("boxText").value;
  createItem(boxText);
  save();
  form.reset();
});

document.addEventListener("DOMContentLoaded", paint);

homeworkList.addEventListener("click", (e) => {
  e.preventDefault();
  let text = e.path[2].childNodes[2].innerHTML;
  if (e.target.innerHTML === "done" || e.target.innerHTML === "autorenew") {
    edit(text);
  }
  if (e.target.innerHTML === "delete") {
    deleted(text);
  }
});
