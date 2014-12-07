var hostname = "cookiejar-hackatron.herokuapp.com"

function getOngoingTasks(){
	alert("I'm going to ajax" + $.toString)
	$.ajax({
		url: hostname + '/users/1/tasks?filter=ongoing',
		method: 'get',
		success: function(data){
			alert(data)
		},
		error: function(error){
			alert(error)
		}
	});
}

function printOngoingTasks(obj){
	var due_date = new Date(obj["due"]).toString().slice(4, 10);
	var mytable = document.getElementById("ongoing");
	var newcontent = document.createElement('tr');
	newcontent.innerHTML = '<td><a href="#' + obj["id"] + '"class="btn btn-block" style="background-color:inherit; margin:0px; font-size:13px">' + obj["name"] + '</a></td><td class="table-entries-column">' + due_date + '</td>';
	while (newcontent.firstChild) {
		mytable.appendChild(newcontent.firstChild);
	}

	var mydiv = document.getElementById("maindiv");
	var newdiv = document.createElement('div');
	newdiv.innerHTML =  '<div id="' + obj["id"] + '" class="modal"><header class="bar bar-nav" style="margin-top:50px"><a class="icon icon-close pull-right" href="#' + obj["id"] + '"></a><h1 class="title">' + obj["name"] + '</h1></header><div class="content" style="text-align:left; margin-top:50px"><p class="content-padded">The task is due on ' + due_date + '</p><p class="content-padded">' + obj['desc'] + '</p><p class="content-padded">The penalty for this task is ' + obj["penalty"] + '</p><p class="content-padded">The current penalty is ' + obj["current_penalty"] + '</p></div><div class="bar bar-standard bar-footer"><a class="icon icon-check pull-left"></a><a class="icon icon-trash pull-right"></a></div>'
	while (newdiv.firstChild) {
		mydiv.appendChild(newdiv.firstChild);
	}
}

// var CookieJarClient = function(){
// 	$.support.cors = true
// 	this.hostname = "cookiejar-hackatron.herokuapp.com"
// 	this.interval = 5
// 	this.completedTasksCallback = function(){}
// 	this.pendingTasksCallback = function(){}
// 	this.pendingTaskDaemon = function(){
// 		$.ajax({
// 			url: this.hostname + "/users/1/tasks?filter=pending",
// 			method: "get",
// 			success: function(data){
// 				console.log("Received Pending Tasks")
// 				this.pendingTasksCallback(data)
// 			},
// 			error: function(){}
// 		});
// 	}
// 	this.completedTaskDaemon = function(){
// 		$.ajax({
// 			url: this.hostname + "/users/1/tasks?filter=completed",
// 			method: "get",
// 			success: function(data){
// 				console.log("Received completed tasks")
// 				this.completedTasksCallback(data)
// 			},
// 			error: function(){}
// 		});
// 	}
// 	this.onReceivingPendingTasks = function(callback){
// 		this.pendingTasksCallback = callback
// 	}
// 	this.onReceivingCompletedTasks = function(callback){
// 		this.completedTasksCallback = callback
// 	}
// 	this.completeTask = function(task){
// 		$.ajax({
// 			method: "post",
// 			url: this.hostname + "/users/1/tasks/" + task + "/complete",
// 			error: function(data){
// 				console.log("ERROR: " + data)
// 			}
// 		});
// 	}

// 	setInterval(this.pendingTaskDaemon, this.interval)
// 	setInterval(this.completedTaskDaemon, this.interval)
// }
