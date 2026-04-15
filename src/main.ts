import './style.css'
import { TodoList } from './todoList';

// Allt som visas i webbläsaren sköts från main.ts

// Skapar en instans (nytt objekt) utifrån klassen TodoList som sparas i variabeln todoList
const todoList = new TodoList();

const taskForm = document.querySelector("#task-form") as HTMLFormElement;
const errorMessage = document.querySelector("#error-message") as HTMLParagraphElement;

renderList();

taskForm.addEventListener("submit", (event) => {
    event.preventDefault();
    newTodo();
});

function newTodo(): void {
    const taskName = document.querySelector("#task-name") as HTMLInputElement;
    const taskPriority = document.querySelector("#task-priority") as HTMLSelectElement;

    const task = taskName.value.trim();
    const priority = Number(taskPriority.value);

    // Anropar addTodo med inputvärden och kontrollerar om true eller false
    if (!todoList.addTodo(task, priority)) {
        errorMessage.classList.remove("hidden");
        errorMessage.textContent = "Fyll i alla fält!";
        return;
    }
    errorMessage.textContent = "";
    renderList();
}

// Skriver ut ny uppgift
function renderList(): void {
    const taskListContainer = document.querySelector("#todo-list-container") as HTMLDivElement;
    const taskList = document.querySelector("#todo-list") as HTMLUListElement;
    taskList.innerHTML = "";
    taskForm.reset();

    const todos = todoList.getTodos(); // Hämtar todos

    todos.forEach(todo => {
        taskListContainer.classList.remove("hidden");
        const liEl = document.createElement("li");

        const divEl = document.createElement("div");
        divEl.classList.add("li-left");

        // Skriver om siffra till text beroende på vald prioriteringsnivå
        let priorityText = "";
        if (todo.priority === 1) {
            priorityText = "Hög"
        } else if (todo.priority === 2) {
            priorityText = "Normal"
        } else {
            priorityText = "Låg"
        }

        const liTextEl = document.createElement("span");
        liTextEl.textContent = `${todo.task} (Prio: ${priorityText})`;

        const completedBtn = document.createElement("button");
        completedBtn.classList.add("completed-btn");
        completedBtn.setAttribute("aria-label", "Klarmarkera uppgift")

        // Vid klarmarkering
        completedBtn.addEventListener("click", () => {
            todoList.markTodoCompleted(todo.id);
            renderList();
        })

        // Konverterar datum
        let completedDate = "";
        if (todo.completedAt) {
            completedDate = new Date(todo.completedAt).toLocaleDateString();
        }

        // Vid uppgift klar
        if (todo.completed) {
            liTextEl.classList.add("completed");
            liTextEl.textContent = `${completedDate} ${todo.task} (Prio: ${priorityText})`;
            completedBtn.classList.add("completed-btn-checked");
            completedBtn.setAttribute("aria-label", "Uppgift klarmarkerad")
            completedBtn.textContent = "✔️";
        }

        const removeBtn = document.createElement("button");
        removeBtn.classList.add("remove-btn");
        removeBtn.textContent = "Ta bort";

        // Vid ta bort uppgift
        removeBtn.addEventListener("click", () => {
            todoList.removeTodo(todo.id);
            renderList();
        })

        divEl.append(completedBtn, liTextEl);
        liEl.append(divEl, removeBtn);
        taskList.appendChild(liEl);
    });
}