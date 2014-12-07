var CookieJarClient = function(){
	$.support.cors = true
	this.hostname = "cookiejar-hackatron.herokuapp.com"
	this.interval = 5
	this.completedTasksCallback = function(){}
	this.pendingTasksCallback = function(){}
	this.pendingTaskDaemon = function(){
		$.ajax({
			url: this.hostname + "/users/1/tasks?filter=pending",
			method: "get",
			success: function(data){
				console.log("Received Pending Tasks")
				this.pendingTasksCallback(data)
			},
			error: function(){}
		});
	}
	this.completedTaskDaemon = function(){
		$.ajax({
			url: this.hostname + "/users/1/tasks?filter=completed",
			method: "get",
			success: function(data){
				console.log("Received completed tasks")
				this.completedTasksCallback(data)
			},
			error: function(){}
		});
	}
	this.onReceivingPendingTasks = function(callback){
		this.pendingTasksCallback = callback
	}
	this.onReceivingCompletedTasks = function(callback){
		this.completedTasksCallback = callback
	}
	this.completeTask = function(task){
		$.ajax({
			method: "post",
			url: this.hostname + "/users/1/tasks/" + task + "/complete",
			error: function(data){
				console.log("ERROR: " + data)
			}
		});
	}

	setInterval(this.pendingTaskDaemon, this.interval)
	setInterval(this.completedTaskDaemon, this.interval)
}
