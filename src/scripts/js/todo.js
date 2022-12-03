class User {
    constructor(userId, task) {
        this.userId = userId;
        this.tasks = [task];
        this.tasksCompleted = this.countCompleted();
        this.finishRate = Math.round(this.calcFinishRate());
    }
    addTask(newTask) {
        this.tasks.push(newTask);
        this.tasksCompleted = this.countCompleted();
        this.finishRate = Math.round(this.calcFinishRate());
    }
    countCompleted() {
        let counter = 0;
        this.tasks.forEach((task) => {
            if (task.completed) {
                counter++;
            }
        });
        return counter;
    }
    calcFinishRate() {
        return (this.tasksCompleted / this.tasks.length) * 100;
    }
}
function getUsersIds(users) {
    const ids = [];
    users.forEach((user) => {
        ids.push(user.userId);
    });
    return ids;
}
function getUsersFinishRates(users) {
    const finishRates = [];
    users.forEach((user) => {
        finishRates.push(user.finishRate);
    });
    return finishRates;
}
const users = [];
const userIds = [];
async function fetchTodo(url) {
    const response = await fetch(url);
    const tasks = await response.json();
    return tasks;
    console.log(tasks);
}
function manageUser(task) {
    if (!userIds.includes(task.userId)) {
        const newUser = new User(task.userId, task);
        userIds.push(task.userId);
        users.push(newUser);
        console.log(userIds);
        console.log(users);
        return newUser;
    }
    else {
        const user = users.find((user) => user.userId === task.userId);
        user.addTask(task);
        console.log(userIds);
        console.log(users);
        return user;
    }
}
function buildTable(users) {
    users.forEach((user) => {
        const tbody = document.querySelector("tbody");
        const taskRow = document.createElement("tr");
        const taskUserCell = document.createElement("td");
        taskUserCell.innerText = String(user.userId);
        const completedTasksCell = document.createElement("td");
        completedTasksCell.innerText = String(user.tasksCompleted);
        const nonCompletedTasksCell = document.createElement("td");
        nonCompletedTasksCell.innerText = String(user.tasks.length - user.tasksCompleted);
        const totalTasksCell = document.createElement("td");
        totalTasksCell.innerText = String(user.tasks.length);
        taskRow.append(taskUserCell, completedTasksCell, nonCompletedTasksCell, totalTasksCell);
        tbody.appendChild(taskRow);
    });
}
function averageSquare(users) {
    const averagePlace = document.querySelector("#average");
    const finishRates = [];
    users.forEach((user) => {
        finishRates.push(user.finishRate);
    });
    const initialValue = 0;
    const totalFinishRate = finishRates.reduce((accumulator, currentValue) => accumulator + currentValue, initialValue);
    const averageFinishRate = Math.round(totalFinishRate / finishRates.length);
    averagePlace.innerHTML = `Class Average</br></br>Finish Rate: ${averageFinishRate}%`;
}
function bestSquare(users) {
    const bestUserPlace = document.querySelector("#best");
    const bestUsers = [users[0]];
    users.forEach((user) => {
        if (user.finishRate > bestUsers[0].finishRate) {
            bestUsers[0] = user;
        }
        else if (user.userId !== bestUsers[0].userId &&
            user.finishRate === bestUsers[0].finishRate) {
            bestUsers.push(user);
        }
    });
    const bestUserIds = getUsersIds(bestUsers);
    const bestUsersFinishRates = getUsersFinishRates(bestUsers);
    bestUserPlace.innerHTML = `Best User/s:</br>${bestUserIds}</br></br>Finish Rate: ${bestUsersFinishRates[0]}`;
}
function worstSquare(users) {
    const worstUserPlace = document.querySelector("#worst");
    const worstUsers = [users[0]];
    users.forEach((user) => {
        if (user.finishRate < worstUsers[0].finishRate) {
            worstUsers[0] = user;
        }
        else if (user.userId !== worstUsers[0].userId &&
            user.finishRate === worstUsers[0].finishRate) {
            worstUsers.push(user);
        }
    });
    const worstUserIds = getUsersIds(worstUsers);
    const worstUsersFinishRates = getUsersFinishRates(worstUsers);
    worstUserPlace.innerHTML = `Worst User/s:</br>${worstUserIds}</br></br>Finish Rate: ${worstUsersFinishRates[0]}`;
}
document.addEventListener("DOMContentLoaded", async () => {
    try {
        const tasks = await fetchTodo("https://jsonplaceholder.typicode.com/todos");
        tasks.forEach((task) => {
            const currentUser = manageUser(task);
        });
        buildTable(users);
        averageSquare(users);
        bestSquare(users);
        worstSquare(users);
    }
    catch (e) {
        console.log(e);
        return;
    }
});
