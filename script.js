 document.addEventListener('DOMContentLoaded', () => {
            const taskList = document.getElementById('task-list');
            const newTaskInput = document.getElementById('new-task');
            const addTaskBtn = document.getElementById('add-task-btn');

            let tasks = JSON.parse(localStorage.getItem('tasks')) || [];

            const renderTasks = () => {
                taskList.innerHTML = tasks.map((task, index) => `
                    <li class="task ${task.completed ? 'completed' : ''}" data-index="${index}">
                        <span>${task.text}</span>
                        <div>
                            <button class="edit-btn">Edit</button>
                            <button class="delete-btn">Delete</button>
                            <button class="complete-btn">${task.completed ? 'Unmark' : 'Complete'}</button>
                        </div>
                    </li>
                `).join('');
            };

            const saveTasks = () => {
                localStorage.setItem('tasks', JSON.stringify(tasks));
            };

            const addTask = () => {
                const text = newTaskInput.value.trim();
                if (text !== '') {
                    tasks.push({ text, completed: false });
                    newTaskInput.value = '';
                    saveTasks();
                    renderTasks();
                }
            };

            const editTask = index => {
                const newText = prompt('Edit task:', tasks[index].text);
                if (newText !== null && newText.trim() !== '') {
                    tasks[index].text = newText.trim();
                    saveTasks();
                    renderTasks();
                }
            };

            const deleteTask = index => {
                tasks.splice(index, 1);
                saveTasks();
                renderTasks();
            };

            const toggleCompleteTask = index => {
                tasks[index].completed = !tasks[index].completed;
                saveTasks();
                renderTasks();
            };

            taskList.addEventListener('click', event => {
                const { target } = event;
                const { parentElement } = target;
                const taskElement = parentElement.parentElement;
                const index = taskElement.dataset.index;

                if (target.classList.contains('edit-btn')) {
                    editTask(index);
                } else if (target.classList.contains('delete-btn')) {
                    deleteTask(index);
                } else if (target.classList.contains('complete-btn')) {
                    toggleCompleteTask(index);
                }
            });

            addTaskBtn.addEventListener('click', addTask);
            newTaskInput.addEventListener('keypress', event => {
                if (event.key === 'Enter') {
                    addTask();
                }
            });

            renderTasks();
        });