const input = document.querySelector('.todo__input');
const circles = document.querySelectorAll('.todo__cross');
let listItems = [];


const addTodo = () => {
    const li = document.createElement('li');
    li.classList.add('todo__list-item', 'todo__box')
    li.innerHTML = `<div class="todo__circle"> </div>
    <p>${input.value}
    </p>
    <div class="todo__cross"><img src="images/icon-cross.svg" alt=""></div>`
    listItems.push(li)
    input.value = "";
}
const renderTodos = () => {
    const todoList = document.querySelector('.todo__list')
    listItems.forEach(item => {
        todoList.appendChild(item);

    })
}


input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13) {
        addTodo();
        renderTodos();
    }
})