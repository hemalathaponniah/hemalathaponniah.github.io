const task = document.getElementById("submitButton");
const taskManager = new TaskManager();
taskManager.load();
taskManager.render();

function validFormFieldInput(event) {
  event.preventDefault();
  const taskName = document.querySelector("#taskName");
  const name1 = taskName.value;
  // console.log("Task Name: ", name1);

  const description = document.querySelector("#description");
  const name2 = description.value;
  // console.log("Task Description: ", name2);

  const assignedTo = document.querySelector("#assignedTo");
  const name3 = assignedTo.value;
  // console.log("Assigned To: ", name3);

  const date = document.querySelector("#date");
  const name4 = date.value;
  // console.log("Due Date: ", name4);

  // validation fails if the input is blank
  if (taskName.value == "") {
    alert("Task name cannot be empty!");

    taskName.focus();
    return false;
  }

  // regular expression to match only alphanumeric characters and spaces
  const re = /^[a-zA-Z ]+$/;

  // validation fails if the input doesn't match our regular expression
  if (!re.test(taskName.value)) {
    alert("Error: Input contains invalid characters!");
    taskName.focus();
    return false;
  }

  // validation fails if the input is blank
  if (description.value == "") {
    alert("Description can not be empty!");
    description.focus();
    return false;
  }

  // validation fails if the input doesn't match our regular expression
  if (!re.test(description.value)) {
    alert("Error: Input contains invalid characters!");
    description.focus();
    return false;
  }

  // validation fails if the input is blank
  if (assignedTo.value == "") {
    alert("AssignedTo can not be empty!");
    assignedTo.focus();
    return false;
  }

  // validation fails if the input doesn't match our regular expression
  if (!re.test(assignedTo.value)) {
    alert("Error: Input contains invalid characters!");
    assignedTo.focus();
    return false;
  }

  if (date.value == "") {
    alert("Due date can not be empty!");
    date.focus();
    return false;
  }

  taskManager.addTask(name1, name2, name3, name4);
  taskManager.getTaskById();
  taskManager.render();
  //taskManager.load();
  taskManager.save();
 
  
  console.log(taskManager);
  taskName.value = "";
  description.value = "";
  assignedTo.value = "";
  date.value = "";
}
task.addEventListener("click", validFormFieldInput);

const taskList = document.querySelector("#tasksList");

taskList.addEventListener("click", function (event) {
  event.preventDefault();
  if (event.target.classList.contains("done-button")) {
    const parentTask = event.target.parentElement.parentElement;
    console.log(parentTask);

    const taskId = Number(parentTask.dataset.taskId);
    console.log(taskId);
    const task = taskManager.getTaskById(taskId);
    console.log(task);
    task.status = "DONE";
    taskManager.render();
    
  }
  
  if (event.target.classList.contains("delete-button")) {
    const parentTask = event.target.parentElement.parentElement;
    console.log(parentTask);

    const taskId = Number(parentTask.dataset.taskId);
    console.log(taskId);
    const task = taskManager.getTaskById(taskId);
    console.log(task);
    taskManager.deleteTask(taskId);
    taskManager.save();
    taskManager.render();
    
  }
});


