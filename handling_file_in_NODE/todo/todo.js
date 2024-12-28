const fs = require("fs");
const filePath = "./tasks.json";

const command = process.argv[2]
const argument = process.argv[3]

const loadTask = () =>{
    try {
        const dataBuffer = fs.readFileSync(filePath);
        const dataJson = dataBuffer.toString();
        return JSON.parse(dataJson)
    } catch (error) {
        return []
    }
}

const saveTask = (tasks) =>{
    const dataJson = JSON.stringify(tasks);
    fs.writeFileSync(filePath,dataJson);
}

const addTask = (task) => {
    const tasks = loadTask();
    tasks.push({task})
    saveTask(tasks);
    console.log("Task added",task);
    
}

const listTask = () =>{
    const tasks = loadTask();
    tasks.forEach((task,index) => {
        console.log(`${index + 1} - ${task.task}`)
    });
}

const removeTask = (indexVal) => {
    const actualTaskIndex = indexVal-1; 
    const tasks = loadTask();
    const task = tasks[actualTaskIndex];
    tasks.splice(actualTaskIndex,1);
    saveTask(tasks);
    console.log("Task removed",task)
}

if(command === "add"){
    addTask(argument);
}
else if(command === "list"){
    listTask();
}
else if(command === "remove"){
    removeTask(parseInt(argument));
}
else{
    console.log("Command not found")
}