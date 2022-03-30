const createTaskHtml = (id, name, description, assignedTo, dueDate, status) => {
  const taskHtml = `
            <div class="pt-2">
              <div class="card" id="idoftask" data-task-id = ${id} >
              <div class= "card-header p-3 fw-bold text-center  fs-4 ">
              ${name}
              </div>
              <div class="card-body ">
              <p class="fw-light">Description: ${description}</p>
              <p class="fw-light"> Assigned To: ${assignedTo}.</p>
              <p class="fw-light">Due Date: ${dueDate}</p>
              <p class="fw-bold">Status: ${status}</p>
              <button type="button" class="btn-sm btn btn-success done-button">Mark as Done</button>
              <button type="button" class="btn-sm btn btn-danger delete-button">Delete</button>

              </div>
            </div>
            </div>
           `;

  return taskHtml;
};

class TaskManager {
  constructor(currentId = 0) {
    this.tasks = [];
    this.currentId = currentId;
  }

  addTask(name, description, assignedTo, dueDate, status = "TODO") {
    // this.currentId++;
    const taskObj = {
      id: this.currentId++,
      name: name,
      description: description,
      assignedTo: assignedTo,
      dueDate: dueDate,
      status: status,
    };

    this.tasks.push(taskObj);
  }
  save() {
    const tasksJson = JSON.stringify(this.tasks);
    localStorage.setItem("tasks", tasksJson);
    const currentId = JSON.stringify(this.currentId);
    localStorage.setItem("currentId", currentId);

    //localStorage.setItem('tasks', JSON.stringify(tasksJson));
    //localStorage.setItem('currentId', JSON.stringify(currentId));
  }
  load() {
    if (
      localStorage.getItem("tasks") !== null &&
      localStorage.getItem("currentId") !== null
    ) {
      const tasksJson = localStorage.getItem("tasks");
      this.tasks = JSON.parse(tasksJson);
      const currentId = localStorage.getItem("currentId");
      this.currentId = Number(currentId);
    } else {
      console.log("No Localstorage");
    }
  } 
  render() {
    const tasksHtmlList = [];

    for (let i = 0; i < this.tasks.length; i++) {
      const currentTask = this.tasks[i];

      const date = new Date(currentTask.dueDate);
      // console.log(date);
      const formattedDate = date.toString();

      // console.log(formattedDate);
      const taskHtmlS = createTaskHtml(
        currentTask.id,
        currentTask.name,
        currentTask.description,
        currentTask.assignedTo,
        currentTask.dueDate,
        currentTask.status
      );
      tasksHtmlList.push(taskHtmlS);
    }

    const getval = document.getElementById("tasksList");
    const taskHtml1 = tasksHtmlList.join("\n");
    getval.innerHTML = taskHtml1;
  }

  getTaskById(taskId) {
    let foundTask;
    for (var i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      console.log('task', task);
      if (task.id == taskId) {
         foundTask = task;
         console.log('found', foundTask);
      }
    }

    return foundTask;
  }
  deleteTask(taskId) {
    const newTasks = [];
    for (var i = 0; i < this.tasks.length; i++) {
      const task = this.tasks[i];
      if (task.id !== taskId) {
        newTasks.push(task);
      }
    }
    this.tasks = newTasks;


  } 
}
exports.TaskManager = TaskManager


