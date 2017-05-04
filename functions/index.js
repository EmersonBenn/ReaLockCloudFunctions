const functions = require('firebase-functions');

const admin = require('firebase-admin');
admin.initializeApp(functions.config().firebase);

const crypto = require('crypto');


// // Create and Deploy Your First Cloud Functions
// // https://firebase.google.com/docs/functions/write-firebase-functions
//
// exports.helloWorld = functions.https.onRequest((request, response) => {
//  response.send("Hello from Firebase!");
// });
// Listens for new messages added to /messages/:pushId/original and creates an
// uppercase version of the message to /messages/:pushId/uppercase
exports.newPasskey = functions.database.ref('/Lockbox1/timesOpened')
    .onWrite(event => {
      // Grab the current value of what was written to the Realtime Database.
      const oldKeyRef = event.data.adminRef.parent.child('passkey');
	  const hash = crypto.createHash('sha256');
	  oldKeyRef.once('value')
		.then(function(dataSnapshot) {
			const oldKey = dataSnapshot.val();// handle read data.
			//return oldKey;
			const saltRef = event.data.adminRef.parent.child('salt');
			saltRef.once('value')
				.then(function(dataSnapshot) {
				const salt = dataSnapshot.val();// handle read data.
				//return salt;
				console.log('Hashing', event.params.pushId, oldKey);
				const buf1 = new Buffer.from(oldKey.concat(salt), 'hex');
				hash.update(buf1);
				return event.data.adminRef.parent.child('passkey').set(hash.digest('hex').substring(0, 32));
				
			});
	    });
	  //const saltRef = event.data.adminRef.parent.child('salt');
	  /*oldKeyRef.once('value')
		.then(function(dataSnapshot) {
			const salt = dataSnapshot.val();// handle read data.
			return salt;
	    });*/
	  //const salt = event.data.ref.parent.child('salt').val();
      //console.log('Hashing', event.params.pushId, oldKeyRef);
      //const newKey = original.toUpperCase();
	  //hash.update(oldKeyRef.concat(saltRef));
	  //console.log(hash.digest('hex'));
      // You must return a Promise when performing asynchronous tasks inside a Functions such as
      // writing to the Firebase Realtime Database.
      // Setting an "uppercase" sibling in the Realtime Database returns a Promise.
      //return event.data.ref.parent.child('passkey').set(hash.digest('hex'));
    });
