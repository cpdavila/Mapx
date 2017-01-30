// Initialize Firebase
var config = {
    apiKey: "AIzaSyC6NaSMP_XCvbEkcD1hzlPpcHaZaeHKl9A",
    authDomain: "prueba-4976a.firebaseapp.com",
    databaseURL: "https://prueba-4976a.firebaseio.com",
    storageBucket: "prueba-4976a.appspot.com",
    messagingSenderId: "476637022678"
};
firebase.initializeApp(config);

////Obtener elementos
const txtNombre = document.getElementById('nombre');
const txtEmail = document.getElementById('email');
const txtPassword = document.getElementById('password');
const btnLogin = document.getElementById('btnLogin');
const btnSignUp = document.getElementById('btnSignUp');
const btnLogout = document.getElementById('btnLogout');

var holaMundo = document.getElementById('holaMundo');
var dbref = firebase.database().ref().child('nombre');
dbref.on('value', snap => holaMundo.innerText = snap.val());

//Boton LogOut
btnLogout.addEventListener('click', e => {
    firebase.auth().signOut();
});
//Boton Regresar
btnRegresar.addEventListener('click', e => {
    window.location="../home.html";
});

//Agregar un Listener en tiempo real
firebase.auth().onAuthStateChanged(firebaseUser => {
    if(firebaseUser){
    console.log(firebaseUser);
//window.location="../home.html";
}else {
    console.log('Not loged in');
}    
}); 

//function listasPruebas() {
//    const preObject = document.getElementById('object'); //Obtener Elemento
//    const dbRefObject = firebase.database().ref().child('object'); //Crear referencias
//    const dbRefList = dbRefObject.child('coordenadas');

//    //dbRefObject.on('value', snap => console.log(snap.val()));//Sincronizar elemento
//    dbRefObject.on('value', snap => {preObject.innerText = JSON.stringify(snap.val(),null,3)});//Sincronizar elemento mostrarlo en el div
         
//    dbRefList.on('value', snap => console.log(snap.val()));
//}
//listasPruebas();

//function listas(){
const preObject = document.getElementById('listas');
const dbRefObject = firebase.database().ref().child('object');

//dbRefObject.on('value', snap => {     
//    $.each( snap.val(), function(value) {
//        console.log(value);
//        const dbRefList = dbRefObject.child(value);
//        dbRefList.on('value', snap=> {            
//            //each #2
//            /*AGREGAR EL HTML*/
//            $.each( snap.val(), function(value) {
//                console.log(value);
//                /*AGREGAR EL HTML*/
//                const dbRefLugar1 = dbRefList.child(value);                
//                const dbRefLugar = dbRefLugar1.child('lugar');
//                const dbRefCoor = dbRefLugar1.child('coordenadas');
//                dbRefLugar.on('value', snap => console.log(snap.val()));
//                dbRefCoor.on('value', snap => console.log(snap.val()));
//            });
//            //end each
//       });   
//   });


//}); 

//NUEVO CODIGO FINAL******************************************************************

dbRefObject.on('value', snap => {     
    var texto='';
    var iTexto='';
    var fTexto='';
    var listas='';
    var nameList='';

    var text1;
    var lug;
    var coor;
    var long;
    var cont=0;

    $.each( snap.val(), function(value) {         
        cont = cont + 1;        
        iTexto='<div class="panel-group" id="accordion">'+
        '<div class="panel panel-default">'+
            '<div class="panel-heading">'+
                '<h4 class="panel-title">'+
                    '<a data-toggle="collapse" data-parent="#accordion" href="#collapse'+cont+'">'+
                         value+
                    '</a>'+
                '</h4>'+
            '</div>'+           
             '<div id="collapse'+cont+'" class="panel-collapse collapse in">'+
               '<div class="panel-body">';
    
    console.log(value);
    const dbRefList = dbRefObject.child(value);
    dbRefList.on('value', snap=> {            
        //each #2           
        $.each( snap.val(), function(value) {
            console.log(value);
            /*AGREGAR EL HTML*/
            nameList = value
            
            const dbRefLugar1 = dbRefList.child(value);
            const dbRefLugar = dbRefLugar1.child('lugar');
            const dbRefCoor = dbRefLugar1.child('latitud');
            const dbRefLongitud = dbRefLugar1.child('longitud');
            dbRefLugar.on('value', snap => console.log(snap.val()));
            dbRefCoor.on('value', snap => console.log(snap.val()));
            dbRefLongitud.on('value', snap => {
                long = snap.val();
            });
            dbRefLugar.on('value', snap => {
                lug = snap.val();
            });
            dbRefCoor.on('value', snap => {
            coor = snap.val();
            });
              
             listas +='<a href="#" class="list-group-item ">'+
                            '<div class="row">'+
                                '<div class="col-md-1 col-xs-2"><img src="img/marker3.png" alt="Eliminar" class="img-rounded"></div>'+
                                '<div class="col-md-10 col-xs-8">'+
                                '<h4 class="list-group-item-heading">'+ lug +'</h4>'+
                                '<p>'+ 'Coordenadas: ' + coor + ', '+long+'</p>'+
                                '</div>'+
                                '<div class="col-md-1 col-xs-1"><img src="img/minus2.png" alt="Eliminar" class="img-rounded"></div>'+
                            '</div>'+
                        '</a>';
        });
            //end each
             fTexto ='</div>'+
                             '</div>'+
                          '</div>';
             texto += iTexto+listas+fTexto;
             listas = '';
    
});   
});


             $("#listas").html(texto);

});              

//************************************************************************************
//$("#accordion").html("<p>"+ 'Coordenadas:' + snap.val() +"</p>");
    

//Llenar Listas
//dbRefObject.on('value', snap => {       

//    var texto ='<div class="panel panel-default">' +
//            '<div class="panel-heading">' + 
//               '<h4 class="panel-title">' +
//                    '<a data-toggle="collapse" data-parent="#accordion" href="#collapse1">'+
//                        + snap.val() + 
//                    '</a>'+
//                '</h4>'+
//            '</div>'+           
//             '<div id="collapse1" class="panel-collapse collapse in">'+
//                '<div class="panel-body">'+
//                    '<!--Lista-->'+
//                    '<div class="list-group">'+
//                        '<a href="#" class="list-group-item">'+
//                            '<div class="row">'+
//                                '<div class="col-md-1 col-xs-2"><img src="img/marker3.png" alt="Eliminar" class="img-rounded"></div>'+
//                                '<div id="listas" class="col-md-10 col-xs-8">'+                                
//                                '</div>'+
//                                '<div class="col-md-1 col-xs-1"><img src="img/minus2.png" alt="Eliminar" class="img-rounded"></div>'+                                
//                            '</div>'+                           
//                        '</a>'+ 
//                    '</div>'+
//                    '<!-- Fin lista -->'+
//                '</div>'+
//            '</div>'+
//       '</div>';
        
//$("#accordion").html(texto);    
//});    

     
  

  




