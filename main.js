// Global Variables
const input = document.querySelector('.todo__input');
const todoList = document.querySelector('.todo__list');
const circle = document.querySelectorAll('.todo__circle');
const todoStatus = document.querySelector('.todo__status span');
const clearBtn = document.querySelector('.todo__btn-clear');
const filters = document.querySelectorAll('.filter');

let listItems = [];
let activeList = [];
let completedList = [];
let actualView = "allTodos";

// Functions

const addTodo = () => {
    const li = document.createElement('li');
    li.classList.add('todo__list-item', 'todo__box');

    li.innerHTML = `<div class="todo__circle"> </div>
    <p>${input.value}
    </p>
    <div class="todo__box--cross"><img class="todo__cross" src="images/icon-cross.svg" alt=""></div>`
    listItems.push(li);
    input.value = "";
    filterTodos();

    renderTodos(viewCheck());

}
const viewCheck = () => {
    if (actualView === "allTodos") {
        console.log('rendering allTOdos');
        return listItems
    } else if (actualView === "activeTodos") {
        console.log('rendering active');
        return activeList
    } else {
        console.log('rendering completed');
        return completedList
    }
}

const todosStatus = () => {
    todoStatus.innerHTML = listItems.filter(item => !item.matches('.crossOut')).length + " ";
}

const renderTodos = (list) => {
    todoList.innerHTML = "";

    list.forEach((item, index) => {
        todoList.appendChild(item);
        item.setAttribute("data-id", index);
    })
    todosStatus();

}

const removeTodo = (e) => {
    listItems.splice(e.target.closest('li').dataset.id, 1);
    filterTodos();

    renderTodos(viewCheck());
}
const filterTodos = () => {
    activeList = listItems.filter(item => !item.matches('.crossOut'))
    completedList = listItems.filter(item => item.matches('.crossOut'))
}

const checkClick = (e) => {
    if (e.target.matches(".todo__cross")) {
        removeTodo(e);
    } else if (e.target.matches('.todo__circle')) {
        e.target.classList.toggle('checked');
        e.target.parentNode.classList.toggle('crossOut');

        todosStatus();



    }

    filterTodos();
    renderTodos(viewCheck());

}

const clearingCompleted = () => {

    activeList = listItems.filter(item => !item.matches('.crossOut'))
    listItems = activeList
    completedList = [];
    renderTodos(viewCheck());

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
        renderTodos(viewCheck());

    })

})
clearBtn.addEventListener('click', clearingCompleted)


// naprawić usuwanie completeed w completed>> zrobić drag and drop>> zrobić zmianę kolorów.
// zrobić flagę na to czy jest filter filters ma klase all i focused