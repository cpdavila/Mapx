//(function(){
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
    const btnRegistrarse = document.getElementById('registrarse');
    const btnLogin1 = document.getElementById('login');
    

//EVENTOS BOTONES MENU
    //lOGIN
    btnLogin1.addEventListener('click', e => {
        window.location="../registro.html";

    });

    //Registrarse
    btnRegistrarse.addEventListener('click', e => {       
        window.location="../registro.html";
    });
    
    var holaMundo = document.getElementById('holaMundo');
    var dbref = firebase.database().ref().child('nombre');
    dbref.on('value', snap => holaMundo.innerText = snap.val());

