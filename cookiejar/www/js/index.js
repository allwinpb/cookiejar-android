/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */
 var app = {
  // Application Constructor
  initialize: function() {
    this.bindEvents();
  },
  // Bind Event Listeners
  //
  // Bind any events that are required on startup. Common events are:
  // 'load', 'deviceready', 'offline', and 'online'.
  bindEvents: function() {
    console.log("Reached bindEvents");
    document.addEventListener("deviceready", this.onDeviceReady, false);
    // document.addEventListener('deviceready', this.onDeviceReady, false);
  },
  // deviceready Event Handler
  //
  // The scope of 'this' is the event. In order to call the 'receivedEvent'
  // function, we must explicity call 'app.receivedEvent(...);'
  onDeviceReady: function() {
    console.log("Reached onDeviceReady")
    app.getOngoingTasks()
    app.receivedEvent('deviceready');
    client = new CookieJarClient()
    client.onReceivingCompletedTasks(console.log)
    client.onReceivingPendingTasks(console.log)
  },
  // Update DOM on a Received Event
  receivedEvent: function(id) {
    // start to initialize PayPalMobile library
    console.log("Reached receivedEvent")
    app.initPaymentUI();
  },
  initPaymentUI: function() {
    console.log("Reached initPaymentUI")
    var clientIDs = {
      "PayPalEnvironmentProduction": "YOUR_PRODUCTION_CLIENT_ID",
      "PayPalEnvironmentSandbox": "AcG4lxAW-4ju6HrR_McpgUxAyC0fhN8g5-jxycFkXP9aMT4ZWFvM5AcCtIgo"
    };
    PayPalMobile.init(clientIDs, app.onPayPalMobileInit);

  },
  onSuccesfulPayment: function(payment) {
    console.log("payment success: " + JSON.stringify(payment, null, 4));
  },
  onAuthorizationCallback: function(authorization) {
    window.localStorage.setItem("auth", JSON.stringify(authorization, null, 4))
  },
  createPayment: function() {
    // for simplicity use predefined amount
    var paymentDetails = new PayPalPaymentDetails("50.00", "0.00", "0.00");
    var payment = new PayPalPayment("50.00", "USD", "Awesome Sauce", "Sale",
      paymentDetails);
    return payment;
  },
  configuration: function() {
    // for more options see `paypal-mobile-js-helper.js`
    var config = new PayPalConfiguration({
      merchantName: "CookieJar",
      merchantPrivacyPolicyURL: "https://mytestshop.com/policy",
      merchantUserAgreementURL: "https://mytestshop.com/agreement"
    });
    return config;
  },
  onPrepareRender: function() {
    if(window.localStorage.getItem("auth") === null){
      console.log("Future Payment Triggered")

      PayPalMobile.renderFuturePaymentUI(app.onAuthorizationCallback, app
        .onUserCanceled);
      console.log("Button Events Setup")
    }
  },
  onPayPalMobileInit: function() {
    // must be called
    // use PayPalEnvironmentNoNetwork mode to get look and feel of the flow
    console.log("Reached PayPalMobileInit")
    PayPalMobile.prepareToRender("PayPalEnvironmentNoNetwork", app.configuration(),
      app.onPrepareRender);
  },
  onUserCanceled: function(result) {
    console.log(result);
  },
  getOngoingTasks: function(){
    var hostname = "cookiejar-hackatron.herokuapp.com"
    if(window.location.indexOf("ongoing") === -1){
      return
    }
    $.ajax({
      url: hostname + '/users/1/tasks?filter=ongoing',
      method: 'get',
      success: function(data){
        for(thing in data){
          app.printOngoingTasks(thing)
        }
      },
      error: function(error){
        alert(error)
      }
    });
  },
  printOngoingTasks = function(obj){
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

};

app.initialize();