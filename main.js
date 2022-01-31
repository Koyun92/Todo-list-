// Global Variables
const input = document.querySelector('.todo__input');

const todoList = document.querySelector('.todo__list')
const circle = document.querySelectorAll('.todo__circle');
let listItems = [];
const todoStatus = document.querySelector('.todo__status span')
const clearBtn = document.querySelector('.todo__btn-clear')

// Functions

const addTodo = () => {
    const li = document.createElement('li');
    li.classList.add('todo__list-item', 'todo__box')

    li.innerHTML = `<div class="todo__circle"> </div>
    <p>${input.value}
    </p>
    <div class="todo__box--cross"><img class="todo__cross" src="images/icon-cross.svg" alt=""></div>`
    listItems.push(li);
    input.value = "";
    renderTodos();

}

const renderTodos = () => {
    todoList.innerHTML = "";

    listItems.forEach((item, index) => {
        todoList.appendChild(item);
        item.setAttribute("data-id", index);
    })
    todoStatus.innerHTML = listItems.length + " "

}
const removeTodo = (e) => {
    console.log(e.target.closest('li').dataset.id);
    listItems.splice(e.target.closest('li').dataset.id, 1);
    renderTodos();
}
const checkClick = (e) => {
    if (e.target.matches(".todo__cross")) {
        removeTodo(e);
    } else if (e.target.matches('.todo__circle')) {
        e.target.classList.toggle('checked')
    }
}





// // Event Listeners
// INPUT
input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && input.value) {
        addTodo();
    }
})

// TODOLIST 
todoList.addEventListener('click', ((e) => {
    checkClick(e);
}))


clearBtn.addEventListener('click', () => {
    listItems = [];
    renderTodos();
})


// ustawić Checked do końca w elemencie after >> zrobić clear completed>> zrobić filtrowanie>> zrobić drag and drop>> zrobić zmianę kolorów.