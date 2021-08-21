//YOUR FIREBASE LINKS

var firebaseConfig = {
      apiKey: "AIzaSyC1os6NU4wj0vwK_M7bWqCAswoPIUqcg_c",
      authDomain: "kwitter-b989a.firebaseapp.com",
      databaseURL: "https://kwitter-b989a-default-rtdb.firebaseio.com",
      projectId: "kwitter-b989a",
      storageBucket: "kwitter-b989a.appspot.com",
      messagingSenderId: "480024657256",
      appId: "1:480024657256:web:3e95312b083f71bab2eadd"
    };      
    // Initialize Firebase
    firebase.initializeApp(firebaseConfig);

 user_name= localStorage.getItem("user_name");
 room_name= localStorage.getItem("room_name");

    function send(){
  msg= document.getElementById("message").value;
  firebase.database().ref(room_name).push({
name:user_name,
message:msg,
like:0
  })     
}

function getData() { firebase.database().ref("/"+room_name).on('value', function(snapshot) { document.getElementById("output").innerHTML = ""; snapshot.forEach(function(childSnapshot) { childKey  = childSnapshot.key; childData = childSnapshot.val(); if(childKey != "purpose") {
         firebase_message_id = childKey;
         message_data = childData;
//Start code
console.log(firebase_message_id);
console.log(message_data);
myname=message_data['name'];
message=message_data['message'];
likes= message_data['like'];
name_with_tag= "<h4>"+myname+"<img class='user_tick'src='tick.png'></h4>";
like_button="<button class='btn btn-warning'id="+firebase_message_id+"value="+likes+"onclick='updatelike(this.id)'";
span_with_tag="<span class= 'glyphicon glyphicon-thumbs-up'>Like:"+likes+"</span></button><hr>";
msg_with_tag="<h4 class='message_h4'>"+message+"</h4>";


row= name_with_tag+msg_with_tag+like_button+span_with_tag;
document.getElementById("output").innerHTML=row;

//End code
      } });  }); }

getData();

function updatelike(message_id){
  console.log("Clicked on like"+message_id);
  button_id=message_id;
  no_of_likes=document.getElementById(button_id).value;
  updated_like= Number(no_of_likes)+1;
  console.log(updated_like);
  firebase.database().ref(room_name).child(message_id).update({
    like:updated_like
  })
}

function logout(){
      localStorage.removeItem("room_name");
      localStorage.removeItem("user_name");
      window.location="index.html";
}
