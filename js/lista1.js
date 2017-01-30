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

var cont =0;
var marcadores_firebase=[];
var map;

//Marcadores
function initMap() {
               
}


function mapa_list(){
    //NUEVO CODIGO FINAL OBETNER COORDENADAS******************************************************************            
    var lug;
    var lat;
    var long;
    var cont=0;

    const dbRefList = dbRefObject.child('Lista1');
                    
    dbRefList.on('value', snap => {
        $.each( snap.val(), function(value) {
            console.log(value);
            const dbRefNombre = dbRefList.child(value);
            const dbRefLatitud = dbRefNombre.child('latitud');
            const dbRefLongitud = dbRefNombre.child('longitud');
            const dbRefLug = dbRefNombre.child('lugar');
            //dbRefNombre.on('value', snap => console.log(snap.val()));               
            dbRefLatitud.on('value', snap => console.log(snap.val()));
            dbRefLongitud.on('value', snap => console.log(snap.val()));
                       
            dbRefLatitud.on('value', snap =>{
                lat = snap.val();
             });

            dbRefLongitud.on('value', snap => {
                long = snap.val();
    
            });

                dbRefLug.on('value', snap => {
                    lug = snap.val();
                });

                var posi = new google.maps.LatLng(lat,long);

                var marca = new google.maps.Marker({
                    idMarcador : 1,
                    position:posi,
                    titulo: lug
                });
            //    marcadores_firebase.push(marca);
              //  marca.setMap(map);
                //console.log(marca);

            AddMarker(lug,lat,long); 
                                            
        });
});
//************************************************************************************
       
}

            mapa_list();


           
         /// COLOCAR MARCADORES
            function AddMarker(lugar,latitud,longitud){        
                   
                //MAPA ********************************************************        
                var myLatLng = {lat: parseInt(latitud) , lng:parseInt(longitud)};
      
                var contentString = '<h1>Nombre del Lugar </h1>' + '<p>Descripcion del Lugar</p>';
                map = new google.maps.Map(document.getElementById('map'), {
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


                //Evento click
    
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
                marcadores_firebase.push(marker);
                marker.setMap(map);
               
                console.log(marker);
                console.log(marcadores_firebase);

                // End Map ***********************************************************************
            }
