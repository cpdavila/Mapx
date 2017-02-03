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
//const btnLogout = document.getElementById('btnLogout');
//const btnGrabar = document.getElementById('btnGrabar');

//Agregar un Listener en tiempo real
//firebase.auth().onAuthStateChanged(firebaseUser => {
//    if(firebaseUser){
//    console.log(firebaseUser);
//}else {
//    console.log('Not logged in');       
//}
//});
    
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
               
}           
        
//VARIABLES
            var Lista_Marcadores=[];
            var lugares;
            var latitud;
            var longitud;
            var map;
            var ultimo=''; 
            var flag=false;
           
/*LISTAR PUNTOS DESDE FIREBASE*/
            function listar(){
                Lista_Marcadores=[];
                const dbRefList = dbRefObject.child('Lista1');  //Listas1                 
                            
                // Retrieve new posts as they are added to our database
                dbRefList.on("child_added", function(snapshot, prevChildKey) {
                    //console.log(snapshot.val());
                    var newPost = snapshot.val();
                    console.log("Lugar: " + newPost.lugar);
                    ultimo =  newPost.lugar;                    
                });
                                            
                dbRefList.on('value', snap => {
                   // alert(ultimo);
             //   console.log(ultimo);
                    $.each( snap.val(), function(value) {
                        //console.log(value);
                        const dbRefLista = dbRefList.child(value);                       
                        const dbRefCoordenadas = dbRefLista.child('latitud');//latitud
                        dbRefCoordenadas.on('value', snap => {latitud = snap.val()});
                        const dbRefLongitud = dbRefLista.child('longitud');//longitud
                        dbRefLongitud.on('value', snap => {longitud = snap.val()});
                        const dbRefLugar = dbRefLista.child('lugar');//lugar
                        dbRefLugar.on('value', snap => {lugar = snap.val()});
                        
                        if(ultimo == lugar ){
                            flag =true;
                        }else{
                            flag =false;
                        }

                        AddMarker(lugar,latitud,longitud,flag);

                    });
                mostrarMarcadores();
           
                
            });

            }

            /// COLOCAR MARCADORES
                function AddMarker(lugar,latitud,longitud,flag){        
                   
                //MAPA ********************************************************        
                var myLatLng = {lat: parseInt(latitud) , lng:parseInt(longitud)};
      
                var contentString = '<h1>'+lugar+'</h1>' + '<p>Descripcion del Lugar</p>';   
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
                    
                var contentString2 = '<h2>Nuevo Lugar A&ntilde;adido</h2>' + '<p>'+lugar+'</p>';

                    //Mostrar Notificacion de nuevo marcador
                if(flag == true){                   
                    var infowindow2 = new google.maps.InfoWindow({
                        content: contentString2
                    });  
                    infowindow2.open(map,marker);
                        window.setTimeout(function() { //abrir y cerrar ventana de notificacion en el marcador
                            infowindow2.close(map,marker);                    
                        }, 6000);
                }
                
                //Evento click    
                marker.addListener('click', function() {
                    infowindow.open(map,marker);
                
                    window.setTimeout(function() { //abrir y cerrar ventana de notificacion en el marcador
                        infowindow.close(map,marker);                    
                    }, 3000);
                    //map.setZoom(12);
                    map.setCenter(marker.getPosition());
                });

                window.setTimeout(function() { //Parar animacion BOUNCE del marcador
                    marker.setAnimation(null);                    
                }, 2000);
                
                // To add the marker to the map, call setMap();
                Lista_Marcadores.push(marker);
                //marker.setMap(map);                          
              
                //console.log(marker);
                //console.log(marcadores_firebase);

                // End Map ***********************************************************************
            }

            function mostrarMarcadores(){
                var cont=0;
                for(i in Lista_Marcadores){
                                 
                        Lista_Marcadores[i].setMap(map);
                    //if(cont == Lista_Marcadores.length-1){
                    //    //alert('ultimo');
                    //    //Lista_Marcadores[i].setMap(map);
                    //    //Notificacion  nuevo lugar
                    //    infowindow2.open(map,Lista_Marcadores[i]);
                    //    window.setTimeout(function() { //abrir y cerrar ventana de notificacion en el marcador
                    //        infowindow2.close(map,Lista_Marcadores[i]);                    
                    //    }, 4000);
                    //}
                    
                    cont = cont + 1;

                }            
            }

            listar();


          