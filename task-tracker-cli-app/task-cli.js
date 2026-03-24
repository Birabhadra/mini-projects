#!/usr/bin/env node
const fs = require("fs");
const path = require("path");

const FILE = path.join(__dirname, "tasks.json");

function loadTasks() {
    if (!fs.existsSync(FILE)) {
        fs.writeFileSync(FILE, JSON.stringify([], null, 2));
    }
    const data = fs.readFileSync(FILE, "utf-8")
    return JSON.parse(data)
}
function saveTasks(tasks) {

    fs.writeFileSync(FILE, JSON.stringify(tasks, null, 2));

}


function getNextId(tasks) {
    if (tasks.length === 0) return 1;
    return Math.max(...tasks.map(t => t.id)) + 1;
}

function findTask(tasks, id) {
    return tasks.find(t => t.id === id);
}

function addTask(description) {
    const tasks = loadTasks();
    const task = {
        id: getNextId(tasks),
        description,
        status: "todo"
    }
    tasks.push(task);
    saveTasks(tasks);
    console.log(`✅ Task added with ID ${task.id}`);

}

function updateTask(id, description) {
    const tasks = loadTasks();
    const task = findTask(tasks, id);
    if (!task) {
        console.log("❌ Task not found")
        return;
    }
    task.description = description;
    saveTasks(tasks);
    console.log("✏️ Task updated");
}

function deleteTask(id) {
    const tasks = loadTasks()
    const newTasks = tasks.filter(t => t.id != id)
    if (tasks.length === newTasks.length) {
        console.log("❌ Task not found");
        return;
    }
    saveTasks(newTasks);
    console.log("🗑️ Task deleted");

}
function markStatus(id, status) {
    const tasks = loadTasks();
    const task = findTask(tasks, id);

    if (!task) {
        console.log("❌ Task not found");
        return;
    }

    task.status = status;
    saveTasks(tasks);

    console.log(`🔄 Task marked as ${status}`);
}
function listTasks(filter = null) {
    let tasks = loadTasks();

    if (filter) {
        tasks = tasks.filter(t => t.status === filter);
    }

    if (tasks.length === 0) {
        console.log("📭 No tasks found");
        return;
    }

    tasks.forEach(task => {
        console.log(`[${task.id}] ${task.description} - ${task.status}`);
    });
}

const args = process.argv.slice(2);
const command = args[0];
try {
    switch (command) {
        case "add":
            addTask(args[1]);
            break;

        case "update":
            updateTask(Number(args[1]), args[2]);
            break;

        case "delete":
            deleteTask(Number(args[1]));
            break;

        case "mark-in-progress":
            markStatus(Number(args[1]), "in-progress");
            break;

        case "mark-done":
            markStatus(Number(args[1]), "done");
            break;

        case "list":
            if (!args[1]) {
                listTasks();
            } else {
                const valid = ["done", "todo", "in-progress"];
                if (!valid.includes(args[1])) {
                    console.log("❌ Invalid filter");
                    break;
                }
                listTasks(args[1]);
            }
            break;

        default:
            console.log("❌ Unknown command");
    }
} catch (err) {
    console.log("❌ Error:", err.message);
}