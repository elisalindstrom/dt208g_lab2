import type { ITodo } from "./iTodo";

// Sköter logiken

export class TodoList { // Klass som container för egenskaper och metoder
  todos: ITodo[] = []; // Egenskap (array) där todo-objekt lagras

  constructor() {
    this.loadFromLocalStorage();
  }

  // Metod som skapar nytt objekt och lägger till i todos-listan
  addTodo(task: string, priority: number): boolean {
    if (!task || !priority) {
      return false;
    }

    const newTodo: ITodo = {
      id: Date.now(), // Används som unikt id
      task,
      completed: false,
      priority,
    };

    // Lägger till newTodo (nytt objekt) i arrayen todos
    this.todos.unshift(newTodo);
    this.saveToLocalStorage();
    return true;
  }

  // Markera todos som klara
  markTodoCompleted(id: number): void {
    const todo = this.todos.find(todo => todo.id === id); // Hitta rätt uppgift i array utifrån id

    if (!todo) {
      return;
    }

    if (todo.completed) {
      todo.completed = false;
      todo.completedAt = undefined;
    } else {
      todo.completed = true;
      todo.completedAt = new Date();
    }
    this.saveToLocalStorage();
  }

  // Hämta hela listan av todos
  getTodos(): ITodo[] {
    return this.todos;
  }

  // Spara todos till localStorage
  saveToLocalStorage(): void {
    localStorage.setItem("todos", JSON.stringify(this.todos));
  }

  // Hämta todos från localStorage
  loadFromLocalStorage(): void {
    const todosStr = localStorage.getItem("todos");
    if (todosStr) {
      this.todos = JSON.parse(todosStr);
    }
  }

  // Metod som tar bort en todo från local storage
  removeTodo(id: number): void {
    this.todos = this.todos.filter(todo => todo.id !== id);
    this.saveToLocalStorage(); // Spara på nytt i localStorage
  }
}