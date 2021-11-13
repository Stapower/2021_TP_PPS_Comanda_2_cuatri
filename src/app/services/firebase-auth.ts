import { Injectable, NgModule } from "@angular/core";

import * as firebase from 'firebase/app';
import 'firebase/storage';
import { HttpClientModule } from '@angular/common/http';


//import { FirebaseService } from './firebase.service';
//import { AngularFireAuth } from 'angularfire2/auth';
//import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';



import { AngularFireModule } from '@angular/fire';
import { AngularFireAuthModule } from '@angular/fire/auth';

import firebaseConfig from '../../environments/environment';

import { AngularFireAuth } from '@angular/fire/auth';
import { AngularFirestore } from '@angular/fire/firestore';
import { AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';
import { Observable } from "rxjs";

//import {AngularFirestore} from 'angularfire2/firestore';
//import { auth } from 'firebase/app';

//import { AngularFireAuth } from '@angular/fire/auth';


/*@NgModule({
	imports: [	AngularFireModule.initializeApp(firebaseConfig.firebase),
				AngularFireAuthModule
			],
	providers: [ AngularFireAuth]
})*/

@Injectable({
	providedIn: 'root'
})

export class FirebaseAuth {
	//firebase = require('firebase');

	constructor(public afAuth: AngularFireAuth,
		public afs: AngularFirestore,
		public afDatabase: AngularFireDatabase
		//private firebaseService: FirebaseService,
		//public afAuth: AngularFireAuth
	) { }

	basePicturesPath = "pictures/";
	image = "/image";
	static users = "/users";
	static clientes = "/clientes";
	static mesas = "/mesas";
	static productos = "/productos";
	static orders = "/orders";



	async login(user) {
		try {
			const res = await this.afAuth.signInWithEmailAndPassword(user.email, user.password);
		}
		catch (err) {
			console.dir(err);
		}
	}

	async signIn(user) {
		try {
			const res = await this.afAuth.createUserWithEmailAndPassword(user.email, user.password);
		}
		catch (err) {
			console.dir(err);
		}
	}

	addUser(value) {
		return new Promise<any>((resolve, reject) => {
			this.afs.collection('/users').add({
				name: value.name,
				surname: value.surname,
				age: parseInt(value.age)
			})
				.then(
					(res) => {
						resolve(res)
					},
					err => reject(err)
				)
		})
	}



	async addImageAndReturnURL(value, relativePath, addBase64?) {

		console.log("value", value);
		console.log("relativePath", relativePath);

		const selfieRef = firebase.storage().ref(this.basePicturesPath + "users/" + relativePath);
		console.log("selfieRef", selfieRef);

		if(addBase64 == false){
			console.log("addBase64", addBase64);

			await selfieRef.put(value);
		}
		else{
			await selfieRef.putString(value, 'base64', { contentType: 'image/png' });
		}

		var download = "";

		await selfieRef.getDownloadURL().then(succ => {
			download = succ;
		});


		console.log("download", download);
		return download;

	}

	async addImage(value, type, user, relativePath) {

		const selfieRef = firebase.storage().ref(this.basePicturesPath + relativePath);
		await selfieRef.putString(value, 'base64', { contentType: 'image/png' });

		var download = "";

		await selfieRef.getDownloadURL().then(succ => {
			download = succ;
		});


		console.log("download", download);

		this.afs.collection('/image').add({
			type: type,
			image: download,
			user: user,
			voto: new Array(),//,
			fecha: new Date()
		}).then(succ => {
			console.log("Update on database succeded")
		}).catch(err => {
			throw err;
		});
	}

	async getImages(returnObject, email) {

		console.log("getImages");
		var array = new Array(); 
		this.bringEntity("/image", returnObject);
		return;
	}

	async saveExistingEntity(path, newObject, id) {
		//console.log("saveExistingEntity");
		return new Promise<any>((resolve, reject) => {

			var imageRef = this.afs.collection(path).ref.doc("/" + id).set(newObject)
			.then(
				(res) => {
					resolve(res)
				},
				err => reject(err)
			)
		});

		//var imageRef = await this.afs.collection(path).ref;
		//await imageRef.doc("/" + id).set(newObject).then(succ => { console.log("update completed"); });
	}

	bringEntity(path, returnObject) {
		console.log("bringEntity");
		//var returnObject = new Array(); 


		var imageRef = this.afs.collection<any>(path);

		imageRef.snapshotChanges().forEach(snapshot => {
			var array = new Array();
			returnObject.length = 0;
			
			var postData = snapshot.forEach(doc => {

				var postData = doc.payload.doc.data();
				console.log(doc.payload.doc['id'], " => ", postData);
				postData.id = doc.payload.doc['id'];
				  
				returnObject.push(postData);

			});
			return returnObject;
		});
	}

	bringClientsUnapproved(path, returnObject) {
		console.log("bringEntity");
		//var returnObject = new Array(); 


		var imageRef = this.afs.collection<any>(path);

		imageRef.snapshotChanges().forEach(snapshot => {
			var array = new Array();
			returnObject.length = 0;
			
			var postData = snapshot.forEach(doc => {

				var postData = doc.payload.doc.data();
				console.log(doc.payload.doc['id'], " => ", postData);
				postData.id = doc.payload.doc['id'];

				if((postData.aprobado == null || postData.aprobado == undefined || postData.aprobado == '') && postData.rol == 'Cliente'){
					returnObject.push(postData);
				}

			});
			return returnObject;
		});
	}


	bringEntityWithFilterKeyValue(path, key, value, returnObject) {
		console.log("bringEntityWithFilterKeyValue");
		console.log("key", key);
		console.log("value", value);

		var imageRef = this.afs.collection<any>(path);

		imageRef.snapshotChanges().forEach(snapshot => {
			var array = new Array();
			returnObject.length = 0;
			
			var postData = snapshot.forEach(doc => {


				var postData = doc.payload.doc.data();
				console.log(doc.payload.doc['id'], " => ", postData);
				postData.id = doc.payload.doc['id'];
				
				console.log("KEY", key);
				console.log(key.includes('.'));

				if(key.includes('.')){
					var keysArray = key.split('.');
					var leng = keysArray.length;
					var i = 1;
					var finalElement = postData;
					keysArray.forEach(element => {
						try{
							console.log("element", element);
							console.log(finalElement);

							if(finalElement != null)
								finalElement = finalElement[element];

							if(leng == i){
								if(finalElement != null && finalElement != undefined && finalElement == value)
									returnObject.push(postData);
							}
							i++;
						}
						catch(error){
							console.log("ERROR", error);
						}
					});
				}
				else if(postData[key] != null && postData[key] != undefined && postData[key] == value ){
					returnObject.push(postData);
				}
				console.log("Objeto a devolver", returnObject);

			});
			return returnObject;
		});
	}

	async getEntityOneTime(path, key, value) {
		var bigTable;
		await this.afs.collection<any>(path).get().forEach(element => {
			console.log("element", element);
			console.log("element docs", element.docs);

			element.docs.forEach(doc =>{
				console.log(doc["id"]);
				console.log("data", doc.data());
				var table = doc.data();
				table.id = doc["id"];
			
				if(table[key] != null && table[key] != undefined && table[key] == value){
					bigTable = table;
					return table;
				}

			});
			console.log("element metadata", element.metadata);
			
		});

		return bigTable;
	}

	bringEntityWithFilterString2(path, turnos, filterWord){
		console.log("bringEntityWithFilterString");

		var imageRef = this.afs.collection<any>(path);

		imageRef.get().forEach((snapshot => {
		//imageRef.snapshotChanges().forEach(snapshot => {
			//console.log("before snapshto foreach");
			turnos.length = 0;
			var postData = snapshot.forEach(doc => {
				//console.log("inside snapshto foreach");

				var postData = doc.data();
				//console.log(doc.id, " => ", postData);
				postData.id = doc.id;
				
				var jsonString = JSON.stringify(postData);
				
				if(jsonString.includes(filterWord))
					turnos.push(postData);
				else if(filterWord == null || filterWord == undefined)
					turnos.push(postData);
			});
			//console.log("after snapshto foreach");
			//console.log(turnos);
			return turnos;
		}));
	}


	saveNewEntity(path, value){
		return new Promise<any>((resolve, reject) => {
			this.afs.collection(path).add(value)
				.then(
					(res) => {
						resolve(res)
					},
					err => reject(err)
				)
		})
	}

	
	addChat(path, value, mail) {
		return new Promise<any>((resolve, reject) => {
			this.afs.collection(path).add({
				message: value,
				email: mail,
				time: new Date()
			})
				.then(
					(res) => {
						resolve(res)
					},
					err => reject(err)
				)
		})
	}

}