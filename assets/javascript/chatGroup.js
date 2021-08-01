
const database1 = firebase.database().ref("messages");
function sendMessage(){

      if(userData.loggedIn == true){
        firebase.database().ref('users/'+firebase.auth().currentUser.uid)
        .get()
            .then((snapshot)=>{
              
              if(snapshot.exists()){
                const nameOfSender = snapshot.val().name;
  
                  upload(nameOfSender);
                  
                  // childAdded(nameOfSender);
              }
              else{
                console.log("No data available");
              }
  
        });
      }
      else{
        alert("Please sign in or register to send messages");
      }
    message1.focus();
    
}

const message1 = document.querySelector("#message1");

function keyPressedFunction(event){
  var enterKeyPressed = event.key;
  if(enterKeyPressed == "Enter"){
    sendMessage();
  }
}

function inputMessageField(){

  message1.focus();
  
}


function upload(nameOfSender){
  if(message1.value.trim()!=""){
     database1.push().set({
    "sender" : nameOfSender.trim(),
    "message" : message1.value.trim()
  });
  }
  message1.value = "";
}

  database1.on("child_added", function(snapshot1){
    var html = "";
    html += "<li>";
    html += snapshot1.val().sender + "<br><h3>" +snapshot1.val().message;
    html += "</h3></li>";

    document.querySelector("#group-message").innerHTML += html;

});


//   database1.on("child_removed",function (snapshot2){
//     document.getElementById( snapshot2.id).innerText = "This message has been removed";
//     document.querySelector("#message1").value = "";
//   })







// function deleteMessage(self){
//     var messageId = self.id;
//   alert(messageId);
//     database1.child(messageId).remove();

// }




