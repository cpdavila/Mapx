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

    const btnLista = document.getElementById('lugares');
    //Menu
    btnLista.addEventListener('click', e => {
        window.location="../listas.html";
    });

    //Boton Regresar
    btnNuevoLugar.addEventListener('click', e => {
        window.location="../nuevoLugar.html";
    });



    //Obtener elementos  
    const btnLogout = document.getElementById('btnLogout');

//Agregar un Listener en tiempo real
    firebase.auth().onAuthStateChanged(firebaseUser => {
        if(firebaseUser){
        console.log(firebaseUser);
    }else {
        console.log('Not loged in');
        window.location="../registro.html";
    }
});

    // Boton LogOut
    btnLogout.addEventListener('click', e => {
        firebase.auth().signOut();
        window.location="../registro.html";
    });
    
    var holaMundo = document.getElementById('holaMundo');
    var dbref = firebase.database().ref().child('nombre');
    dbref.on('value', snap => holaMundo.innerText = snap.val());

//}());
//Maps
//var map;
//function initMap() {
//    map = new google.maps.Map(document.getElementById('map'), {
//        center: {lat: -34.397, lng: 150.644},
//        zoom: 8
//    });
//}

//Marcadores
    function initMap() {
        var myLatLng = {lat: -25.363, lng: 131.044};
        var myLatLng2 = {lat: -25.100, lng: 131.000};

        var contentString = '<h1>Nombre del Lugar </h1>' + '<p>Descripcion del Lugar</p>';
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });

        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            animation: google.maps.Animation.BOUNCE,
            title: 'Hello World!'
        });

        var marker2 = new google.maps.Marker({
            position: myLatLng2,
            map: map,
            title: 'Marcador de Prueba!'
        });

        var infowindow = new google.maps.InfoWindow({
            content: contentString
        });

        //Envento click
        marker.addListener('click', function() {
            infowindow.open(map,marker);
                
            window.setTimeout(function() { //abrir y cerrar ventana de notificacion en el marcador
                infowindow.close(map,marker);                    
            }, 3000);
            //map.setZoom(12);
            //map.setCenter(marker.getPosition());
        });

        window.setTimeout(function() { //Parar animacion BOUNCE del marcador
            marker.setAnimation(null);                    
        }, 2000);
           
        // To add the marker to the map, call setMap();
        marker.setMap(map);
        marker2.setMap(map);
        // marker.setMap(null); // elimnar marcadores            
    }