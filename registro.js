// Initialize Firebase
var config = {
    apiKey: "AIzaSyC6NaSMP_XCvbEkcD1hzlPpcHaZaeHKl9A",
    authDomain: "prueba-4976a.firebaseapp.com",
    databaseURL: "https://prueba-4976a.firebaseio.com",
    storageBucket: "prueba-4976a.appspot.com",
    messagingSenderId: "476637022678"
};
firebase.initializeApp(config);

//Obtener elementos
const txtNombre = document.getElementById('nombre');
const txtEmail = document.getElementById('email');
const txtPassword = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

//Evento LogIn
btnLogin.addEventListener('click', e => {
const email = txtEmail.value;
const pass = txtPassword.value;
const auth = firebase.auth();

//Sign In
const promise = auth.signInWithEmailAndPassword(email, pass);
    promise.catch(e => {
        alert(e.message);

    });
});

////Evento Registrarse SignUp
btnSignUp.addEventListener('click', e => {
const email = txtEmail.value;
const pass = txtPassword.value;
const auth = firebase.auth();

//Crear user
const promise = auth.createUserWithEmailAndPassword(email, pass);
promise.catch(e => {
    alert(e.message);
    //console.log(e.message)

});
});

//// Boton LogOut
//    btnLogout.addEventListener('click', e => {
//        firebase.auth().signOut();
//    });

//Agregar un Listener en tiempo real
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
    console.log(firebaseUser);
}else {  
    console.log('Not loged in');
} 
});
    
var holaMundo = document.getElementById('holaMundo');
var dbref = firebase.database().ref().child('nombre');
dbref.on('value', snap => holaMundo.innerText = snap.val());

