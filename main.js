let timer;
let isTimerRunning = false;
let minutes = 0;
let seconds = 0;
let todos = [];


window.addEventListener('load', () => {
    todos = JSON.parse(localStorage.getItem('todos')) || [];


    const newToDoForm = document.querySelector('#new-todo-list');
    newToDoForm.addEventListener('submit', addTodo);


    document.querySelector('.timer__button--start').addEventListener('click', toggleTimer);
    document.querySelector('.timer__button--work').addEventListener('click', () => setTime(25, 0));
    document.querySelector('.timer__button--shortbreak').addEventListener('click', () => setTime(5, 0));
    document.querySelector('.timer__button--longbreak').addEventListener('click', () => setTime(10, 0));


    DisplayToDos();
});


function addTodo(e) {
    e.preventDefault();


    const todo = {
        content: e.target.elements.content.value,
        category: e.target.elements.category.value,
        done: false,
        createdAt: new Date().getTime()
    }


    todos.push(todo);


    localStorage.setItem('todos', JSON.stringify(todos));


    e.target.reset();


    DisplayToDos();
}


function toggleTimer() {
    const playButton = document.querySelector('.timer__button--start');
    if (isTimerRunning) {
        clearInterval(timer);
        isTimerRunning = false;
        playButton.innerHTML = '<span class="material-icons">play_arrow</span>';
    } else {
        timer = setInterval(updateTimer, 1000);
        isTimerRunning = true;
        playButton.innerHTML = '<span class="material-icons">pause</span>';
    }
}


function updateTimer() {
    if (seconds === 0) {
        if (minutes === 0) {
            clearInterval(timer);
            isTimerRunning = false;
            alert('Timer Ended');
            return;
        } else {
            minutes--;
            seconds = 59;
        }
    } else {
        seconds--;
    }


    updateTimerDisplay();
}


function updateTimerDisplay() {
    const minutesDisplay = document.querySelector('.timer--part--minutes');
    const secondsDisplay = document.querySelector('.timer--part--seconds');
    minutesDisplay.textContent = formatTime(minutes);
    secondsDisplay.textContent = formatTime(seconds);
}


function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}


function setTime(mins, secs) {
    minutes = mins;
    seconds = secs;
    updateTimerDisplay();
}


function DisplayToDos(){
    const todoList = document.querySelector('#todo-list');
    todoList.innerHTML = '';
    todos.forEach(todo =>{
        const todoItem = document.createElement('div');
        todoItem.classList.add('todo-item')


        const label = document.createElement('label');
        const input = document.createElement('input');
        const span = document.createElement('span');
        const content = document.createElement('div');
        const actions = document.createElement('div');
        const edit =  document.createElement('button');
        const deletebutton =  document.createElement('button');


        input.type = 'checkbox';
        input.checked = todo.done;
        span.classList.add('bubble');
       
        if(todo.category == 'personal'){
            span.classList.add('personal');
        }else{
            span.classList.add('school');
        }


        content.classList.add('todo-content');
        actions.classList.add('actions');
        edit.classList.add('edit');
        deletebutton.classList.add('delete');


        content.innerHTML = `<input type = "text" value = "${todo.content}" readonly>`;
        edit.innerHTML = 'Edit';
        deletebutton.innerHTML = 'Delete';


        label.appendChild(input);
        label.appendChild(span);
        actions.appendChild(edit);
        actions.appendChild(deletebutton);
        todoItem.appendChild(label);
        todoItem.appendChild(content);
        todoItem.appendChild(actions);


        todoList.appendChild(todoItem);


        if (todo.done){
            todoItem.classList.add('done');
        }


        input.addEventListener('change',(e)=>{
            todo.done = e.target.checked;
            localStorage.setItem('todos', JSON.stringify(todos))


            if (todo.done){
                todoItem.classList.add('done');
            }else{
                todoItem.classList.remove('done');
            }
            DisplayToDos();
        })
        edit.addEventListener('click',(e)=>{
            const input = content.querySelector('input');
            input.removeAttribute('readonly');
            input.focus();
            input.addEventListener('blur',(e)=>{
                input.setAttribute('readonly', true);
                todo.content = e.target.value;
                localStorage.setItem('todos', JSON.stringify(todos))
                DisplayToDos();
            })
        })


        deletebutton.addEventListener('click', (e) => {
            todos = todos.filter(t => t != todo);
            localStorage.setItem('todos', JSON.stringify(todos));
            DisplayToDos() })
    })
}



