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

function drawWithPromise(user) {
	user = "CassTao";
	var recycleRef = firebase.database().ref('/users/CassTao/recyclable');
	recycleRef.on('value', function(snapshot) {
		getCount(user, "recyclable").then(function(result) {
			var recycleCount = result;
			getCount(user, "compost").then(function(result) {
				var totalCount = result + recycleCount;
				var dataURL = draw(user, recycleCount, totalCount, "recycle");
			});
		});
	});

	var compostRef = firebase.database().ref('/users/CassTao/compost');
	compostRef.on('value', function(snapshot) {
		getCount(user, "compost").then(function(result) {
			var compostCount = result;
			getCount(user, "recyclable").then(function(result) {
				var totalCount = result + compostCount;
				var dataURL = draw(user, compostCount, totalCount, "compost");
			});
		});
	});

	var trashRef = firebase.database().ref('/users/CassTao/trash');
	trashRef.on('value', function(snapshot) {
		itemType = "trash";
		var ranNum = 0;
		getCount(user, itemType).then(function(result) {
			var dataURL = draw(user, result, ranNum, "trash");
		});
	});
}

function draw(user, count, total, itemType) {
	var ctx = document.getElementById('canvas').getContext('2d');
	var img = new Image();
	img.crossOrigin="anonymous";
	img.onload = function() {
		ctx.drawImage(img, 0, 0);
		ctx.font = '35px serif'
		ctx.fillText(count, 300, 120);
		// Only draw this total count if not trash
		if (itemType === "recycle" || itemType === "compost") {
			ctx.fillText(total, 98, 100);
		}
		var dataURL = output();
		updateURL(user, dataURL);
	};
	if (itemType === "recycle") {
		img.src = 'https://i.ibb.co/10Vv7cw/Compost-FINAL.png';
	} else if (itemType === "compost") {
		img.src = 'https://i.ibb.co/5ktDnZh/Compost5.png';
	} else {
		img.src = 'https://i.ibb.co/X7p7MdY/trash2.png';
	}
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
