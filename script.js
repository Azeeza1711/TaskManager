class Task {  
    constructor(name, description, status = 'pending') {  
      this.name = name;  
      this.description = description;  
      this.status = status;  
    }  
  }  
  
  let tasks = JSON.parse(localStorage.getItem('tasks')) || [];  
  
  const taskForm = document.getElementById('taskForm');  
  const taskList = document.getElementById('taskList');  
  const filterStatus = document.getElementById('filterStatus');  
  
  // Render tasks based on filter  
  function renderTasks(filter = 'all') {  
    taskList.innerHTML = '';  
    const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter);  
    filteredTasks.forEach((task, index) => {  
      const taskItem = document.createElement('li');  
      taskItem.className = `task-item ${task.status === 'completed' ? 'completed' : ''}`;  
      taskItem.innerHTML = `  
        <div>  
          <h3>${task.name}</h3>  
          <p>${task.description}</p>  
        </div>  
        <div class="task-actions">  
          <button class="toggle-status" onclick="toggleStatus(${index})">${task.status === 'pending' ? 'Complete' : 'Pending'}</button>  
          <button class="edit" onclick="editTask(${index})">Edit</button>  
          <button class="delete" onclick="deleteTask(${index})">Delete</button>  
        </div>  
      `;  
      taskList.appendChild(taskItem);  
    });  
  }  
  
  // Add a new task  
  taskForm.addEventListener('submit', (e) => {  
    e.preventDefault();  
    const taskName = document.getElementById('taskName').value.trim();  
    const taskDescription = document.getElementById('taskDescription').value.trim();  
    if (!taskName) {  
      alert('Task name is required!');  
      return;  
    }  
    tasks.push(new Task(taskName, taskDescription));  
    localStorage.setItem('tasks', JSON.stringify(tasks));  
    renderTasks();  
    taskForm.reset();  
  });  
  
  // Toggle task status  
  function toggleStatus(index) {  
    tasks[index].status = tasks[index].status === 'pending' ? 'completed' : 'pending';  
    localStorage.setItem('tasks', JSON.stringify(tasks));  
    renderTasks(filterStatus.value);  
  }  
  
  // Edit a task  
  function editTask(index) {  
    const task = tasks[index];  
    const newName = prompt('Enter new task name:', task.name);  
    const newDescription = prompt('Enter new task description:', task.description);  
    if (newName !== null && newDescription !== null) {  
      tasks[index].name = newName.trim();  
      tasks[index].description = newDescription.trim();  
      localStorage.setItem('tasks', JSON.stringify(tasks));  
      renderTasks(filterStatus.value);  
    }  
  }  
  
  // Delete a task  
  function deleteTask(index) {  
    if (confirm('Are you sure you want to delete this task?')) {  
      tasks.splice(index, 1);  
      localStorage.setItem('tasks', JSON.stringify(tasks));  
      renderTasks(filterStatus.value);  
    }  
  }  
  
  // Filter tasks by status  
  filterStatus.addEventListener('change', () => {  
    renderTasks(filterStatus.value);  
  });  
  
  // Initial render  
  renderTasks();  