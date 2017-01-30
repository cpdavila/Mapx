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

const dbRefObject = firebase.database().ref().child('object'); //Crear referencias

//Obtener elementos  
const btnLogout = document.getElementById('btnLogout');
const btnGrabar = document.getElementById('btnGrabar');

//Agregar un Listener en tiempo real
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
    console.log(firebaseUser);
}else {
    console.log('Not loged in');       
}
});

// Boton LogOut
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
window.location="../registro.html";
});

//Menu
btnRegresar.addEventListener('click', e => {
    window.location="../home.html";
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

    //var marker2 = new google.maps.Marker({
    //    position: myLatLng2,
    //    map: map,
    //    title: 'Marcador de Prueba!'
    //});

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
    
    // marker.setMap(null); // elimnar marcadores            
}

/* Formulario */   
btnGrabar.addEventListener('click', e => {
    const lista = $('#selecLista').val();
    const lugar = $('#etiquetaLugar').val();
    const descripcion = $('#descripcion').val();
    const latitud = $('#latitud').val();
    const longitud = $('#longitud').val();

    ingresar(lista, lugar, latitud,longitud);
  
    console.log(lista);
    console.log(lugar);
    console.log(descripcion);
   
});

    
    /*INGRESAR DATOS A FIREBASE*/
    function ingresar(lista,lugar,latitud,longitud){
        firebase.database().ref('object/'+lista+'/'+ lugar).set({
            latitud: latitud,
            longitud: longitud,
            lugar: lugar
        })
        .then(function() {
            $('#selecLista').val('');
            $('#etiquetaLugar').val('');
            $('#descripcion').val('');
            $('#latitud').val('');
            $('#longitud').val('');
            AddMarker2(lugar,latitud,longitud)
            alert('Datos almacenados correctamente.');
        })
        .catch(function(error) {
            alert('Detectado un error', error);
        });       
        
    }

    function AddMarker(){
        const lugar = $('#etiquetaLugar').val();
        const latitud = $('#latitud').val();
        const longitud = $('#longitud').val();
        //MAPA ********************************************************        
        var myLatLng = {lat: parseInt(latitud) , lng:parseInt(longitud)};
      
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
            title: lugar
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

        // End Map ***********************************************************************
    
    }


    function AddMarker2(lugar,latitud,longitud){        
        //MAPA ********************************************************        
        var myLatLng = {lat: parseInt(latitud) , lng:parseInt(longitud)};
      
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
            title: lugar
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

        // End Map ***********************************************************************
    
    }