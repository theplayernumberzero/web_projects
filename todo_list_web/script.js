// DOM Elements
const todoForm = document.getElementById('todoForm');
const todoInput = document.getElementById('todoInput');
const todoList = document.getElementById('todoList');
const searchInput = document.getElementById('searchInput');

// Get todos from localStorage
let todos = JSON.parse(localStorage.getItem('todos')) || [];

// Render todos
function renderTodos(filteredTodos = todos) {
    todoList.innerHTML = '';
    filteredTodos.forEach((todo, index) => {
        const li = document.createElement('li');
        li.className = 'todo-item';
        li.innerHTML = `
            <span class="${todo.completed ? 'completed' : ''}">${todo.text}</span>
            <div>
                <i class="fas fa-trash delete-btn" data-index="${index}"></i>
            </div>
        `;
        todoList.appendChild(li);
    });
}

// Add todo
todoForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const todoText = todoInput.value.trim();
    if (todoText) {
        todos.push({
            text: todoText,
            completed: false
        });
        localStorage.setItem('todos', JSON.stringify(todos));
        todoInput.value = '';
        renderTodos();
    }
});

// Delete todo
todoList.addEventListener('click', (e) => {
    if (e.target.classList.contains('delete-btn')) {
        const index = e.target.getAttribute('data-index');
        todos.splice(index, 1);
        localStorage.setItem('todos', JSON.stringify(todos));
        renderTodos();
    }
});

// Search todos
searchInput.addEventListener('input', (e) => {
    const searchText = e.target.value.toLowerCase();
    const filteredTodos = todos.filter(todo => 
        todo.text.toLowerCase().includes(searchText)
    );
    renderTodos(filteredTodos);
});

// Initial render
renderTodos(); 