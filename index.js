class Folder {
    constructor(name) {
        this.name = name;
        this.tasks = [];
        this.completedTasks = [];
    }
}

class Task {
    constructor(name) {
        this.name = name;
        this.dateCreated = new Date().toISOString().split('T')[0];
        this.dueDate = null;
        this.description = "";
        this.subtasks = [];
        this.completedSubtasks = [];
    }
}

let folders = [{ name: "sampleFolder", tasks: [{ name: "Kumain", dateCreated: "2026-02-14", dueDate: null, description: "Kumain ako ng hatdog", subtasks: ["subtask", "subtask2"], completedSubtasks: ["completedSubtask", "completedSubtask2"] }], completedTasks: [] }];

const folderList = document.querySelector(".folderList");
const folderInput = document.querySelector(".folderInput");
const taskList = document.querySelector(".taskList");
const completedTaskList = document.querySelector(".completedTaskList");
const taskDiv = document.querySelector(".taskDiv");
const taskDetails = document.querySelector(".taskDetails");
const subtaskList = document.createElement("div");
subtaskList.className = "subtaskList";
const completedSubtaskList = document.createElement("div");
completedSubtaskList.className = "completedSubtaskList";
const subtaskDiv = document.createElement("div");
subtaskDiv.className = "subtaskDiv";

const createFolder = (folderName) => {
    const cleanFolderName = folderName.trim().toLowerCase();
    const isDuplicate = folders.some(item => {
        return item.name.toLowerCase() === cleanFolderName;
    })
    if (!isDuplicate) {
        const newFolder = new Folder(cleanFolderName);
        folders.push(newFolder);
        renderFolders();
    } else {
        alert("Folder already exists! Please enter a different folder name.");
    }
    console.log(folders);
}

const renderFolders = () => {
    folderList.innerHTML = "";
    for (const folder of folders) {
        const folderItem = document.createElement("div");
        folderItem.className = "folderItem";
        folderItem.addEventListener("click", () => {
            renderTasks(folder);
        });
        folderItem.innerHTML = `<p class="folderName">${folder.name.charAt(0).toUpperCase() + folder.name.slice(1)}</p> <p class="taskCount">${folder.tasks.length}</p>`;
        folderList.append(folderItem);
    }
}

const pressEnterFolder = (e, folderName) => {

    if (e.key === "Enter") {
        createFolder(folderName);
        folderInput.value = "";
    }
}

const createTask = (taskName, folder) => {
    folder.tasks.push(new Task(taskName));
    renderTasks(folder);
}

const renderTasks = (folder) => {
    taskList.innerHTML = "";
    completedTaskList.innerHTML = "";
    taskDiv.innerHTML = "";
    for (const task of folder.tasks) {

        const taskItem = document.createElement("div");
        taskItem.className = "taskItem";

        const taskCheckbox = document.createElement("input");
        taskCheckbox.type = "checkbox";
        taskCheckbox.className = "checkbox";
        taskCheckbox.addEventListener('change', () => {
            checkTask(taskCheckbox, folder, task);
        });

        const textNode = document.createTextNode(` ${task.name}`);
        textNode.className = "taskTextNode";
        const detailsButton = document.createElement("button");
        detailsButton.textContent = "More Details"
        detailsButton.addEventListener("click", () => {
            renderTaskDetails(task);
        });
        const deleteButton = document.createElement("button");
        deleteButton.addEventListener("click", () => {
            deleteTask(folder, task, false);
        });
        deleteButton.textContent = "X";
        const taskDivision = document.createElement("hr");
        taskDivision.className = "taskDivision";

        const checkText = document.createElement("div");
        checkText.className = "checkText";
        checkText.append(taskCheckbox, textNode);
        const utilityButtons = document.createElement("div");
        utilityButtons.append(detailsButton, deleteButton);

        taskItem.append(checkText, utilityButtons, taskDivision);
        taskList.append(taskItem);
    }
    for (const task of folder.completedTasks) {

        const taskItem = document.createElement("div");
        taskItem.className = "taskItem";

        const taskCheckbox = document.createElement("input");
        taskCheckbox.className = "checkbox";
        taskCheckbox.type = "checkbox";
        taskCheckbox.checked = true;
        taskCheckbox.addEventListener('change', () => {
            checkTask(taskCheckbox, folder, task);
        });

        const textNode = document.createTextNode(` ${task.name}`);
        const detailsButton = document.createElement("button");
        detailsButton.textContent = "More Details";
        detailsButton.addEventListener("click", () => {
            renderTaskDetails(task);
        });
        const deleteButton = document.createElement("button");
        deleteButton.addEventListener("click", () => {
            deleteTask(folder, task, true);
        })
        deleteButton.textContent = "X";
        const taskDivision = document.createElement("hr");
        taskDivision.className = "taskDivision";

        const checkText = document.createElement("div");
        checkText.className = "checkText";
        checkText.append(taskCheckbox, textNode);

        taskItem.append(checkText, detailsButton, deleteButton, taskDivision);
        completedTaskList.append(taskItem);
    }
    const taskInput = document.createElement("input");
    taskInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") createTask(taskInput.value, folder);
    })
    taskInput.className = "taskInput";
    taskInput.placeholder = "+ Enter new task";
    taskDiv.append(taskInput);
    taskInput.focus();

    renderFolders();
}

const renderTaskDetails = (task) => {
    console.log(task);
    taskDetails.innerHTML = "";
    const taskHeader = document.createElement("div");
    taskHeader.className = "taskHeader";
    taskHeader.innerHTML = `${task.name}`;
    const description = document.createElement("textarea");
    description.addEventListener("change", (event) => {
        task.description = event.target.value;
    });
    description.value = `${task.description}`;
    description.className = "taskDescription";
    description.placeholder = "Description here..."
    const dateCreated = document.createElement("p");
    dateCreated.className = "dateCreated";
    dateCreated.textContent = `Created: ${task.dateCreated}`
    dateCreated.className = "taskDateCreated";
    const dueDate = document.createElement("input");
    dueDate.addEventListener("change", (event) => {
        task.dueDate = event.target.value;
    });
    const dueDiv = document.createElement("div");
    dueDiv.className = "dueDiv";
    dueDiv.innerHTML = "Due date"
    dueDate.className = "dueDate";
    dueDate.type = "date";
    dueDate.value = task.dueDate;
    dueDiv.append(dueDate)
    const subtasks = document.createElement("div");
    subtasks.className = "subtaskDiv";
    const taskDetailsDiv = document.createElement("div");
    taskDetailsDiv.className = "taskDetailsDiv";
    taskDetailsDiv.append(taskHeader, dateCreated, description, dueDiv, subtasks);
    taskDetails.append(taskDetailsDiv);
    renderSubtasks(task);
}

const renderSubtasks = (task) => {
    subtaskDiv.innerHTML = "";
    subtaskList.innerHTML = "";
    completedSubtaskList.innerHTML = "";
    const subtaskHeader = document.createElement("h2");
    subtaskHeader.className = "subtaskHeader";
    for (const subtask of task.subtasks) {
        const subtaskItem = document.createElement("div");
        subtaskItem.className = "subtaskItem";
        const checkText = document.createElement("div");
        checkText.className = "checkText";
        const textNode = document.createTextNode(` ${subtask}`);
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.addEventListener("change", () => {
            checkSubtask(checkbox, task, subtask);
        })
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X"
        deleteButton.addEventListener("click", () => {
            deleteSubtask(task, subtask, false);
        })
        const subtaskDivision = document.createElement("hr");
        subtaskDivision.className = "subtaskDivision";

        subtaskHeader.textContent = "Subtask"
        checkText.append(checkbox, textNode);
        subtaskItem.append(checkText, deleteButton, subtaskDivision);
        subtaskList.append(subtaskItem);
        subtaskDiv.append(subtaskHeader, subtaskList);
        taskDetails.append(subtaskDiv);
    }
    const completedSubtaskHeader = document.createElement("h2");
    completedSubtaskHeader.className = "completedSubtaskHeader";
    const subtaskInput = document.createElement("input");
    subtaskInput.className = "subtaskInput";
    subtaskInput.placeholder = "+ Add subtask";
    subtaskInput.addEventListener("keydown", (event) => {
        if (event.key === "Enter") addSubtask(subtaskInput.value, task);
    })
    subtaskDiv.append(subtaskInput);
    for (const subtask of task.completedSubtasks) {
        const subtaskItem = document.createElement("div");
        subtaskItem.className = "subtaskItem";
        const checkText = document.createElement("div");
        checkText.className = "checkText";
        const textNode = document.createTextNode(` ${subtask}`);
        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.className = "checkbox";
        checkbox.checked = true;
        checkbox.addEventListener("change", () => {
            checkSubtask(checkbox, task, subtask);
        })
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "X"
        deleteButton.addEventListener("click", () => {
            deleteSubtask(task, subtask, true);
        })
        const subtaskDivision = document.createElement("hr");
        subtaskDivision.className = "subtaskDivision";

        completedSubtaskHeader.textContent = "Completed";
        checkText.append(checkbox, textNode);
        subtaskItem.append(checkText, deleteButton, subtaskDivision);
        completedSubtaskList.append(subtaskItem);
        subtaskDiv.append(completedSubtaskHeader, completedSubtaskList);
        taskDetails.append(subtaskDiv);
    }
    taskDetails.append(subtaskDiv);
}

const checkSubtask = (checkbox, task, subtask) => {
    if (checkbox.checked) {
        console.log("checked");
        const indexToRemove = task.subtasks.indexOf(subtask);
        console.log(indexToRemove);
        if (indexToRemove > -1) {
            const removedString = task.subtasks.splice(indexToRemove, 1);
            task.completedSubtasks.push(removedString[0]);
            console.log(task.subtasks);
            console.log(task.completedSubtasks);
        }
    } else {
        console.log("unchecked");
        const indexToRemove = task.completedSubtasks.indexOf(subtask);
        if (indexToRemove > -1) {
            const removedString = task.completedSubtasks.splice(indexToRemove, 1);
            task.subtasks.push(removedString[0]);
            console.log(task.subtasks);
            console.log(task.completedSubtasks);
        }
    }
    renderSubtasks(task);
}

const deleteSubtask = (task, subtask, isCompleted) => {
    if (isCompleted === false) {
        const indexToRemove = task.subtasks.indexOf(subtask);
        if (indexToRemove > -1) task.subtasks.splice(indexToRemove, 1);
        renderSubtasks(task);
        console.log(task);
    } else {
        const indexToRemove = task.completedSubtasks.indexOf(subtask);
        if (indexToRemove > -1) task.completedSubtasks.splice(indexToRemove, 1);
        renderSubtasks(task);
        console.log(task);
    }

}

const addSubtask = (newSubtask, task) => {
    if (newSubtask) {
        task.subtasks.push(newSubtask);
        renderSubtasks(task);
    }
}

const checkTask = (checkbox, folder, task) => {
    if (checkbox.checked) {
        console.log("checked");
        const indexToRemove = folder.tasks.indexOf(task);
        if (indexToRemove > -1) {
            const removedString = folder.tasks.splice(indexToRemove, 1);
            folder.completedTasks.push(removedString[0]);
            console.log(folder.tasks);
            console.log(folder.completedTasks);
        }
    } else {
        console.log("unchecked");
        const indexToRemove = folder.completedTasks.indexOf(task);
        if (indexToRemove > -1) {
            const removedString = folder.completedTasks.splice(indexToRemove, 1);
            folder.tasks.push(removedString[0]);
            console.log(folder.tasks);
            console.log(folder.completedTasks);
        }
    }
    renderTasks(folder);
}

const deleteTask = (folder, task, isCompleted) => {
    if (isCompleted === false) {
        const indexToRemove = folder.tasks.indexOf(task);
        if (indexToRemove > -1) folder.tasks.splice(indexToRemove, 1);
        renderTasks(folder);
    } else {
        const indexToRemove = folder.completedTasks.indexOf(task);
        if (indexToRemove > -1) folder.completedTasks.splice(indexToRemove, 1);
        renderTasks(folder);
    }
}

window.onload = () => renderFolders();

