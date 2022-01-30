// Global Variables
const input = document.querySelector('.todo__input');
const crosses = document.getElementsByClassName('todo__cross')

const circle = document.querySelectorAll('.todo__circle');
let todoID = 0;
let listItems = [];
let todoStatus = document.querySelector('.todo__status span')

// Functions

const addTodo = () => {
    const li = document.createElement('li');
    li.classList.add('todo__list-item', 'todo__box')
    li.setAttribute("data-id", todoID)
    li.innerHTML = `<div class="todo__circle"> </div>
    <p>${input.value}
    </p>
    <div class="todo__box--cross"><img class="todo__cross" src="images/icon-cross.svg" alt=""></div>`
    listItems.push(li)
    input.value = "";
    todoID++

}

const renderTodos = () => {
    const todoList = document.querySelector('.todo__list')

    listItems.forEach(item => {
        todoList.appendChild(item);


    })
    todoStatus.innerHTML = listItems.length + " "

}
const removeTask = () => {
    const crosses = document.querySelectorAll('.todo__cross')
    crosses.forEach(element => {
        element.addEventListener('click', function () {

            console.log(this.parentNode.parentNode.dataset.id);
            listItems.splice(this.parentNode.parentNode.dataset.id, 1)

        })
    });
}





// Event Listeners
input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && input.value) {
        addTodo();
        renderTodos();

    }
})


// Ustawic usuwanie z tablicy i renderowanie po działaniu