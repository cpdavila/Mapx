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
    console.log('Not logged in');
    window.location="../registro.html";   
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

    var content = '<h2>Nuevo Lugar Añadido</h2>' + '<p>Descripcion del Lugar</p>';
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
    var contentString = '<h1>Nombre del Lugar </h1>' + '<p>Descripcion del Lugar</p>';
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
    const list = $('#txt_lista').val();
    //const lista = $('#selecLista').val();
    const lugar = $('#etiquetaLugar').val();
    const descripcion = $('#descripcion').val();
    const latitud = $('#latitud').val();
    const longitud = $('#longitud').val();             
   
$('#formulario').bootstrapValidator({
    framework: 'bootstrap',   
    fields: {
        latitud: {
            validators: {
                between: {
                    min: -90,
                    max: 90,
                    message: 'Ingrese latitud entre -90.0 y 90.0'
                }
            }
        },
        longitud: {
            validators: {
                between: {
                    min: -180,
                    max: 180,
                    message: 'Ingrese latitud entre -180 y 180'
                }
            }
        }
    }


}).on('success.form.bv', function(e) {
          //var bv = $form.data('bootstrapValidator');          
          console.log('Submit exitoso');
          if(lugar != '' && list != ''){
              ingresar(list, lugar, latitud,longitud);
              console.log(list);
              console.log(lugar);
              console.log(descripcion);
          }
      });
});
    
    /*INGRESAR DATOS A FIREBASE*/
function ingresar(list,lugar,latitud,longitud){
    // var validacion = $('#formulario').bootstrapValidator();
    firebase.database().ref('object/'+list+'/'+ lugar).set({
        latitud: latitud,
        longitud: longitud,
        lugar: lugar
    })
       .then(function() {
           //const list = $('#txt_lista').val();
           //const lugar = $('#etiquetaLugar').val();
           //const latitud = $('#latitud').val();
           //const longitud = $('#longitud').val();

           AddMarker2(list,lugar,latitud,longitud)
           //  alert('Datos almacenados correctamente.');
           $('select option').remove();                
           $('#txt_lista').val('');           
           $('#etiquetaLugar').val('');
           $('#descripcion').val('');
           $('#latitud').val('');
           $('#longitud').val('');
           lugar="";
           latitud="";
           longitud="";

           llenarCombo();
       }).catch(function(error) {
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

    function AddMarker2(list,lugar,latitud,longitud){        
        //MAPA ********************************************************        
        var myLatLng = {lat: parseInt(latitud) , lng:parseInt(longitud)};
      
        var contentString = '<h2>Nuevo Lugar A&ntilde;adido</h2>' + '<p>'+lugar+'</p>';
        var contentString2 = '<h2>'+lugar+'</h2>' + '<p>Descricion del Lugar</p>';
        var map = new google.maps.Map(document.getElementById('map'), {
            zoom: 8,
            center: myLatLng,
            mapTypeId: google.maps.MapTypeId.ROADMAP
        });
        var msg = 'Nuevo lugar añadido';
        var marker = new google.maps.Marker({
            position: myLatLng,
            map: map,
            animation: google.maps.Animation.BOUNCE,
            title: lugar
        });        

        //Notificacion
        var infoNotify = new google.maps.InfoWindow({
            content: contentString
        });

        var infowindow = new google.maps.InfoWindow({
            content: contentString2
        });

        //Envento click
        //marker.addListener('click', function() {
        //    infowindow.open(map,marker);
                
        //    window.setTimeout(function() { //abrir y cerrar ventana de notificacion en el marcador
        //        infowindow.close(map,marker);                    
        //    }, 3000);
        //    //map.setZoom(12);
        //    //map.setCenter(marker.getPosition());
        //});

        //Envento click marker
        marker.addListener('click', function() {
            infowindow.open(map,marker);       
        });

        window.setTimeout(function() { //Parar animacion BOUNCE del marcador
            marker.setAnimation(null);                    
        }, 2000);
             
        // To add the marker to the map, call setMap();
        marker.setMap(map);

        infoNotify.open(map,marker);
                
        window.setTimeout(function() { //abrir y cerrar ventana de notificacion en el marcador
            infoNotify.close(map,marker);                    
        }, 3000);

        // End Map ***********************************************************************
    
    }

/*COMBO LISTAS*/
    function llenarCombo(){        
        //$('option', '#selecLista').remove();
        $('select option').remove();
        const dbRefObject = firebase.database().ref().child('object'); //Crear referencias       
        dbRefObject.on("value", snap => {
            $.each( snap.val(), function(value) {
                console.log(value);
                $("#selecLista").append('<option>'+value+'</option>');
            });       
        });
}

        llenarCombo();

/*Seleccionar Lista*/
        function seleccionarLista(){
            var lista = $("#selecLista").val();
            console.log(lista);
            $("#txt_lista").val(lista);        
        }

       