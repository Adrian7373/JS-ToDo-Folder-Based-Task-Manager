# JS-ToDo 📝

JS-ToDo is a feature-rich, vanilla JavaScript task management application. Unlike simple to-do lists, this project utilizes a three-pane layout to organize tasks into specific folders, allowing for granular control with subtasks, due dates, and detailed descriptions.

## 🚀 Features

* **Folder Organization:** Create custom folders to categorize your tasks (e.g., "Work," "Personal," "Groceries").
* **Three-Pane Interface:** A sleek, productivity-focused layout:
    1.  **Folders:** Manage your categories.
    2.  **Tasks:** View active and completed tasks within the selected folder.
    3.  **Details:** Edit task descriptions, set due dates, and manage subtasks.
* **Subtask Management:** Break down complex tasks into smaller, manageable subtasks with their own completion status.
* **Task Details:** Add rich details including:
    * Descriptions
    * Due Dates
    * Creation Date (Auto-generated)
* **Dark Mode Design:** Built with a modern, dark-themed UI for reduced eye strain.

## 🛠️ Technologies Used

* **HTML5**
* **CSS3** (Custom styling, Flexbox layout, Custom Checkbox design)
* **JavaScript (ES6+)** (Object-Oriented structure with `Task` and `Folder` classes, DOM manipulation)

## 📂 Project Structure

```text
/JS-ToDo
├── index.html      # Main application structure
├── index.js        # Logic for Folders, Tasks, Subtasks, and Event Listeners
└── styles.css      # Dark mode styling and layout definitions

```

## 🔧 How to Run

1. Clone this repository:
```bash
git clone https://github.com/Adrian7373/JS-ToDo.git
```


2. Navigate to the project folder.
3. Open `index.html` in your web browser.

## 📝 Usage Guide

1. **Create a Folder:** Type a name in the bottom left input and press `Enter`.
2. **Add a Task:** Select a folder, then type a task name in the center bottom input and press `Enter`.
3. **View Details:** Click "More Details" on any task to open the right-hand panel.
4. **Add Subtasks:** In the details panel, type a subtask name and press `Enter`.

## 🔮 Future Improvements

* **Local Storage Support:** Currently, data resets on refresh. Future updates will implement `localStorage` to save folders and tasks permanently.
* **Edit Functionality:** Add the ability to rename folders and existing tasks.
* **Drag and Drop:** Implement drag-and-drop to reorder tasks or move them between folders.

## 🤝 Contributing

Contributions are welcome! If you have suggestions for how to improve the architecture or want to add Local Storage support, feel free to open a pull request.

---

Made with ❤️ by Adrian Ablaza
