document.addEventListener("DOMContentLoaded", () => {
    // your code here
    const form = document.getElementById("create-task-form");
  
    const taskList = document.getElementById("tasks");
  
    form.addEventListener("submit", function(event) {
      event.preventDefault();
  
  
      const taskDescription = document.getElementById("new-task-description").value;
      const priority = document.getElementById("priority").value;
      const user = document.getElementById("user").value;
      const duration = document.getElementById("duration").value;
      const dateDue = document.getElementById("date-due").value;
  
      const newTask = document.createElement("li");
      newTask.textContent = taskDescription;
  
      newTask.style.color = getColorForPriority(priority);
  
      const completionCheckbox = document.createElement("input");
      completionCheckbox.type = "checkbox";
      completionCheckbox.id = "task-completed";
      completionCheckbox.addEventListener("change", function() {
  
        newTask.classList.toggle("completed", completionCheckbox.checked);
      });
  
      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.addEventListener("click", function() {
  
        taskList.removeChild(newTask);
      });
  
      const editButton = document.createElement("button");
      editButton.textContent = "Edit";
      editButton.addEventListener("click", function() {
  
        editTask(newTask);
  
      });
  
      newTask.appendChild(completionCheckbox);
      newTask.appendChild(deleteButton);
      newTask.appendChild(editButton);
  
      taskList.appendChild(newTask);
      document.getElementById("new-task-description").value = "";
      document.getElementById("priority").value = "low";
      document.getElementById("user").value = "";
      document.getElementById("duration").value = "";
      document.getElementById("date-due").value = "";
  
  
      document.getElementById("new-task-description").value = "";
  
      document.getElementById("priority").value = "low";
  
  
      document.getElementById("sort-asc").addEventListener("click", function() {
        sortTasks("asc");
      });
  
      document.getElementById("sort-desc").addEventListener("click", function() {
        sortTasks("desc");
      });
  
    });
  
    function getColorForPriority(priority) {
      switch (priority) {
        case "low":
          return "green";
        case "medium":
          return "yellow";
        case "high":
          return "red";
        default:
          return "black";
      }
    }
  
    function sortTasks(order) {
      const tasks = Array.from(taskList.children);
  
      tasks.sort((taskA, taskB) => {
        const priorityA = taskA.style.color;
        const priorityB = taskB.style.color;
  
        if (order === "asc") {
          return priorityA.localeCompare(priorityB);
        } else {
          return priorityB.localeCompare(priorityA);
        }
      });
  
      taskList.innerHTML = "";
  
      tasks.forEach(task => {
        taskList.appendChild(task);
      });
    }
  
  
    function editTask(taskElement) {
      const description = prompt("Edit task description:", taskElement.textContent.split(",")[0].slice(12));
      const priority = prompt("Edit priority:", taskElement.style.color === "green" ? "low" : (taskElement.style.color === "yellow" ? "medium" : "high"));
  
      taskElement.textContent = `Description: ${description}, Priority: ${priority}`;
  
      taskElement.style.color = getColorForPriority(priority);
    }
  
  
  
  });