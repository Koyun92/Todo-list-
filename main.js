// Global Variables
const input = document.querySelector('.todo__input');
const todoList = document.querySelector('.todo__list');
const circle = document.querySelectorAll('.todo__circle');
const circleHeader = document.querySelector('#add-button');
const todoStatus = document.querySelector('.todo__status span');
const clearBtn = document.querySelector('.todo__btn-clear');
const filters = document.querySelectorAll('.filter');

let listItems = [];
let activeList = [];
let actualView = "allTodos";

// Functions

const addTodo = () => {
    const li = document.createElement('li');
    li.classList.add('todo__list-item', 'todo__box', 'draggable');

    li.innerHTML = `<div class="todo__circle draggable"> </div>
    <p class="draggable">${input.value}
    </p>
    <div class="todo__box--cross"><img class="todo__cross draggable" src="images/icon-cross.svg" alt=""></div>`
    listItems.unshift(li);
    input.value = "";
    idGive();
    renderList();
    todosStatus();
    slist(document.getElementById('sortlist'))

}
const idGive = () => {
    listItems.forEach((item, index) => {
        item.setAttribute("data-id", index);
    })
}
const renderList = () => {
    todoList.innerHTML = "";
    if (actualView === "allTodos") {
        listItems.forEach((item) => {
            item.style.display = "flex"
            todoList.appendChild(item);
        })
    } else if (actualView === "activeTodos") {
        listItems.forEach((item) => {
            item.style.display = "flex"
            if (item.matches(".crossOut")) {
                item.style.display = "none";

            }
            todoList.appendChild(item);
        })
    } else {
        listItems.forEach((item) => {
            item.style.display = "flex"
            if (!item.matches(".crossOut")) {
                item.style.display = "none";
            }
            todoList.appendChild(item);
        })
    }
}

const todosStatus = () => {
    todoStatus.innerHTML = listItems.filter(item => !item.matches('.crossOut')).length + " ";
}

const removeTodo = (e) => {
    listItems.splice(e.target.closest('li').dataset.id, 1);
    todosStatus();
}
const filterTodos = () => {
    activeList = listItems.filter(item => !item.matches('.crossOut'))
    completedList = listItems.filter(item => item.matches('.crossOut'))
}

const checkClick = (e) => {
    if (e.target.matches(".todo__cross")) {
        removeTodo(e);
        idGive();

    } else if (e.target.matches('.todo__circle')) {
        e.target.classList.toggle('checked');
        e.target.parentNode.classList.toggle('crossOut');
        todosStatus();
    }
    renderList();
}

const clearingCompleted = () => {
    activeList = listItems.filter(item => !item.matches('.crossOut'))
    listItems = activeList
    renderList();
}
const classClearing = () => {
    for (let i = 0; i < filters.length; i++) {
        filters[i].classList.remove('focused')
    }
}



// // Event Listeners
// INPUT
input.addEventListener('keyup', (e) => {
    if (e.keyCode === 13 && input.value) {
        addTodo();
    }
})
circleHeader.addEventListener('click', () => {
    if (input.value) {
        addTodo()
    }
})

// TODOLIST 
todoList.addEventListener('click', ((e) => {
    checkClick(e);
}))


// LIST FILTERING
filters.forEach((filter) => {

    filter.addEventListener('click', (e) => {
        classClearing();
        e.target.classList.add('focused')
        if (filter.matches('.filters__all')) {
            actualView = "allTodos"

        } else if (filter.matches('.filters__active')) {
            actualView = "activeTodos"

        } else {
            actualView = "completedList"

        }
        renderList();

    })

})
clearBtn.addEventListener('click', clearingCompleted)


// Zrobic drag and drop>> zmiane kolorów itd 