import type { ITodo } from "./iTodo";

/* interface ITodo {
    task: string;
    completed: boolean;
    priority: number;
} */

export class TodoList { // Klass som container för egenskaper och metoder
  todos: ITodo[] = []; // Egenskap (array) där todo-objekt lagras

  // Metod som skapar nytt objekt och lägger till i todos-listan
  addTodo(task: string, priority: number): boolean {
    const newTodo: ITodo = {
      task,
      completed: false,
      priority
    };
    // Lägger till newTodo (nytt objekt) i arrayen todos
    this.todos.push(newTodo);
    return true;
  }

}