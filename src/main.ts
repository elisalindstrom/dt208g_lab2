import './style.css'
import { TodoList } from './todoList';
// Allt som visas i webbläsaren sköts från main.ts

// Skapar en instans (nytt objekt) utifrån klassen TodoList som sparas i variabeln todoList
const todoList = new TodoList();

todoList.addTodo("städa", 1);

console.log(todoList.todos);