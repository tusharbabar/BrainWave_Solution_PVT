// Display today’s date & day
const dateElement = document.getElementById("date");
const dayElement = document.getElementById("day");
const today = new Date();
dateElement.textContent = today.toDateString();
dayElement.textContent = "Day: " + today.toLocaleDateString("en-US", { weekday: "long" });

// Select elements
const addTaskBtn = document.getElementById("add-task");
const taskList = document.getElementById("task-list");

// Summary counters
const totalTasksEl = document.getElementById("total-tasks");
const completedTasksEl = document.getElementById("completed-tasks");
const pendingTasksEl = document.getElementById("pending-tasks");

// Notes
const notesEl = document.getElementById("notes");

// Update task summary
function updateSummary() {
  const tasks = document.querySelectorAll(".task-item");
  const total = tasks.length;
  const completed = document.querySelectorAll(".task-item.done").length;
  const pending = total - completed;

  totalTasksEl.textContent = total;
  completedTasksEl.textContent = completed;
  pendingTasksEl.textContent = pending;
}

// Add Task
addTaskBtn.addEventListener("click", () => {
  const time = document.getElementById("task-time").value;
  const text = document.getElementById("task-text").value;

  if (time && text) {
    const li = document.createElement("li");
    li.className = "task-item";

    li.innerHTML = `
      <span><strong>${time}</strong> - ${text}</span>
      <div class="task-actions">
        <button class="done-btn">✔</button>
        <button class="delete-btn">✖</button>
      </div>
    `;

    // Mark as done
    li.querySelector(".done-btn").addEventListener("click", () => {
      li.classList.toggle("done");
      updateSummary();
    });

    // Delete task
    li.querySelector(".delete-btn").addEventListener("click", () => {
      li.remove();
      updateSummary();
    });

    taskList.appendChild(li);

    // Reset input
    document.getElementById("task-time").value = "";
    document.getElementById("task-text").value = "";

    updateSummary();
  } else {
    alert("Please enter both time and task!");
  }
});

// Auto-save notes in localStorage
notesEl.addEventListener("input", () => {
  localStorage.setItem("plannerNotes", notesEl.value);
});

// Load saved notes
document.addEventListener("DOMContentLoaded", () => {
  const savedNotes = localStorage.getItem("plannerNotes");
  if (savedNotes) {
    notesEl.value = savedNotes;
  }
});
