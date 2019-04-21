/** firebase.js **/


function getCount(userID, itemType)
{
	var userId = firebase.auth().currentUser;
	var count = firebase.database().ref('/users/' + userID).once('value').then(function(snapshot) {
  		var trashCount = snapshot.val()[itemType];
			return trashCount;
	});
	// This is a returned promise --> To access it you need to resolve it with .then()
	return count;
}

function updateCount(userID, itemType)
{
	var userId = firebase.auth().currentUser;
	return firebase.database().ref('/users/' + userID).once('value').then(function(snapshot) {
  		var trashCount = (snapshot.val() && snapshot.val()[itemType]) || 0;
			firebase.database().ref('users/' + userID).update({
				[itemType] : trashCount + 1
			});
	});
}

function updateURL(userID, url)
{
	var userId = firebase.auth().currentUser;
	return firebase.database().ref('/users/' + userID).once('value').then(function(snapshot) {
			firebase.database().ref('users/' + userID).update({
				imageUrl : url
			});
	});
}
//
function drawWithPromise(user, itemType) {
	// Draws itemType count with user being snapchat user
	// (i.e. user: "bobaluvr124" and itemType: "recyclable")
	user = "CassTao";
	itemType = "recyclable";
	updateCount(user, itemType).then(function() {
		getCount(user, itemType).then(function(result) {
			var dataURL = draw(user, result);
		});
	});
}

function draw(user, count) {
	var ctx = document.getElementById('canvas').getContext('2d');
	var img = new Image();
	img.crossOrigin="anonymous";
	img.onload = function() {
		ctx.drawImage(img, 0, 0);
		ctx.font = '35px serif'
		ctx.fillText(count, 300, 120);
		var dataURL = output();
		updateURL(user, dataURL);
	};
	img.src = 'https://i.ibb.co/CnSVB26/Slice1.png';
}


function output(){
	var myCanvas = document.getElementById("canvas");
	var dataURL = myCanvas.toDataURL();
	window.location.href=dataURL;
	console.log(dataURL);
	return dataURL;
}

function firebaseOutput(){
	canvas.toBlob(function(blob) {
		var image = new Image();
		image.src = blob;
		var uploadTask = storageRef.child('images/' + "apple").put(blob);
	});
}
//updateCount("hello23", "o847539847983475928374");
//getCount("hello23", "recyclable");
