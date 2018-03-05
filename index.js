// dependencies
var express = require("express");
var bodyParser = require("body-parser");
var app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.set("view engine", "ejs");
//render css
app.use(express.static("public"));
// initial added tasks
var task = ["Advanced Asynchronous Javascript", "Functional Javascript"];
// Initial completed task
var complete = ["Solid Principles", "Hexagonal Architecture"];

// get pending tasks
app.get("/pendings", function(req, res) {
    res.send(task);
});

// Add new task
app.post("/pendings", function(req, res) {
    const newTask = req.body.newtask;
    task.push(newTask);
    res.send(task);
});

// // get completed tasks
app.get("/completes", function(req, res) {
    res.send(complete);
});

// remove task
app.post("/completes", function(req, res) {
    const completeTask = req.body.check;
    handleSelections(completeTask);
    res.redirect("/");
});

function handleSelections(completeTask){
    // If are removing several tasks
    if (typeof completeTask === "object") {
        for (let i = 0; i < completeTask.length; i++) {
            complete.push(completeTask[i]);
            task.splice(task.indexOf(completeTask[i]), 1);
        }
    }
    // Check if remove one task
    else{
        complete.push(completeTask);
        //check if the completed task already exits in the task when checked, then remove it
        task.splice(task.indexOf(completeTask), 1);
    }
}
//render the ejs
app.get("/", function(req, res) {
    res.render("index", { task: task, complete: complete });
});
//set app to listen on port 3000
app.listen(3000, function() {
    console.log("server is running on port 3000");
});