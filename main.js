function slist(target) {
    // (A) SET CSS + GET ALL LIST ITEMS

    let items = target.getElementsByTagName("li"),
        current = null;

    // (B) MAKE ITEMS DRAGGABLE + SORTABLE
    for (let i of items) {
        // (B1) ATTACH DRAGGABLE
        i.draggable = true;

        // (B2) DRAG START - YELLOW HIGHLIGHT DROPZONES
        i.ondragstart = (ev) => {
            current = i;
            for (let it of items) {
                if (it != current) {
                    it.classList.add("hint");
                }
            }
        };

        // (B3) DRAG ENTER - RED HIGHLIGHT DROPZONE
        i.ondragenter = (ev) => {
            if (i != current) {
                i.classList.add("active");
            }
        };

        // (B4) DRAG LEAVE - REMOVE RED HIGHLIGHT
        i.ondragleave = () => {
            i.classList.remove("active");
        };

        // (B5) DRAG END - REMOVE ALL HIGHLIGHTS
        i.ondragend = () => {
            for (let it of items) {
                it.classList.remove("hint");
                it.classList.remove("active");
            }
        };

        // (B6) DRAG OVER - PREVENT THE DEFAULT "DROP", SO WE CAN DO OUR OWN
        i.ondragover = (evt) => {
            evt.preventDefault();
        };

        // (B7) ON DROP - DO SOMETHING
        i.ondrop = (evt) => {
            evt.preventDefault();
            if (i != current) {
                let currentpos = 0,
                    droppedpos = 0;
                for (let it = 0; it < items.length; it++) {
                    if (current == items[it]) {
                        currentpos = it;
                    }
                    if (i == items[it]) {
                        droppedpos = it;
                    }
                }
                if (currentpos < droppedpos) {
                    i.parentNode.insertBefore(current, i.nextSibling);
                } else {
                    i.parentNode.insertBefore(current, i);
                }
            }
        };
    }
}
// Global Variables
const input = document.querySelector('.todo__input');
const todoList = document.querySelector('.todo__list');
const circle = document.querySelectorAll('.todo__circle');
const todoStatus = document.querySelector('.todo__status span');
const clearBtn = document.querySelector('.todo__btn-clear');
const filters = document.querySelectorAll('.filter');

let listItems = [];
let activeList = [];
let actualView = "allTodos";

// Functions

const addTodo = () => {
    const li = document.createElement('li');
    li.classList.add('todo__list-item', 'todo__box');
    li.setAttribute("draggable", true)
    li.innerHTML = `<div class="todo__circle"> </div>
    <p>${input.value}
    </p>
    <div class="todo__box--cross"><img class="todo__cross" src="images/icon-cross.svg" alt=""></div>`
    listItems.unshift(li);
    input.value = "";
    idGive();
    renderList();
    todosStatus();
    slist(document)

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