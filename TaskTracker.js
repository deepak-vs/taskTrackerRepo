/*
Implement a simple task tracker application that utilizes various JavaScript concepts. 
The application should allow users to add tasks, mark them as completed, and display the remaining tasks.

Task is an object and looks like
Task = {
    taskId: number,
    taskName: string,
    isComplete: boolean,
    meta: {
        creationTimestamp: string,
        completionTimestamp: string,
        createdBy: string,
        completedBy: string,
    }
}

Requirements:
1. Implement a function addTasks that accepts a variable number of task info as arguments. 
This function should add each task to a tasks array.

2. Create functions for adding tasks (addTask), marking a task as completed (completeTask), and displaying remaining tasks (displayRemainingTasks). Ensure proper separation of concerns.
a. addTask - takes 1 parametere(taskName). taskId should be unique, creationTimestamp you can generate as well, createdBy should be your name which you can store somewhere globally.
b. completeTask - takes 2 parameters(taskName, completedBy). completionTimestamp can be generated.

3. Implement a feature that periodically checks and logs the remaining tasks after every 2 minutes. When adding a task, add a delay of 2 seconds before showing log to the user depicting async behaviour.
*/


let prompt=require("prompt-sync")();


const createdBy="Deepak";
let taskIndex=1;
let taskArray=[];


//takes number of tasks and add the tasks into taskArray
const addTasks=(numberOfTasks)=>{
        for(let taskIndex=1;taskIndex<=numberOfTasks;taskIndex++){
            console.log(`Add Your ${taskIndex} Task :: `)
            let taskName=prompt("Enter Task Name :: ")
            addTask(taskName)
    }
}


//Adds task to taskArray and consoles the confirmation after 2 seconds
const addTask=(taskName)=>{
    let timeStamp=new Date().getTime();

        let Task = {
            taskId: taskIndex,
            taskName: taskName,
            isComplete: false,
            meta: {
                creationTimestamp: timeStamp,
                completionTimestamp: "",
                createdBy: createdBy,
                completedBy: "",
            }
        }
    taskArray.push(Task);
    taskIndex++;

    setTimeout(()=>{
        console.log(`${taskName} is Added Successfully !`)
    },2000)
}


//completes the task by setting iscomplete field to true and adds completionTimeStamp and completedBy user
const completeTask=(taskName,completedBy)=>{
    let task=taskArray.find((task)=>{
        return task.taskName===taskName;
    })
    if(task===undefined){
         console.log("Task not found !")
         return;
    }
    task.isComplete=true;
    task.meta.completionTimestamp=new Date().getTime();
    task.meta.completedBy=completedBy;
}


//Displays the remaining tasks to the console
const displayRemainingTasks=()=>{
    let remainingTask=taskArray.filter((task)=>{
        return !task.isComplete
    })
    if(remainingTask.length!==0){
        remainingTask.forEach(task=>console.log(task))
    }
    else{
        console.log("No Remaining Task Found !")
    }
    
}


//console the remaining (incompleted) tasks after every 2 minutes
const feature=()=>{
    setInterval(()=>{
        displayRemainingTasks();
    },120000)
}


addTasks(2);
completeTask("task2","User");
displayRemainingTasks();

feature();
