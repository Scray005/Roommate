$(() => {

    class Autenticacion {

        constructor() {

        }

        authEmailPass()  // Inicio de metodo para autenticar por medio del email y contraseña
        {

            let email = $("#emailContactoReg").val();
            let pass = $("#passwordReg").val();
           // let btn_postea =$("#btn_postear").val();
           

            
         firebase.auth().signInWithEmailAndPassword(email, pass).then(function(result) // Validar si el usuario exite en la base de datos
        { 
       // alert("autenticacion correcta");
            $('.modal').modal('close');
            location.href ="perfil.html";
            Materialize.toast(`Bienvenido!! `, 4000);
        }).catch(function(error) 
        {
            $('.modal').modal('close');
            Materialize.toast(`Usted no se encuentra actualmente registrado`, 4000);
        });
        } // Fin de metodo para autenticar por medio del email y contraseña
        
        
        
        authFacebook() {

            let provider = new firebase.auth.FacebookAuthProvider();

            firebase.auth().signInWithPopup(provider).then((result) => {

                console.log(result);

                sessionStorage.setItem("nombre", result.user.displayName);
                sessionStorage.setItem("uid", result.user.uid);
                sessionStorage.setItem("email", result.user.email);
                //sessionStorage.setItem("imagePerfil", result.user.photoURL);

                //$("#avatar").attr("src", result.user.photoURL);

                $('.modal').modal('close');

                Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000);

            }).catch((error) => {

                console.log(error);
                Materialize.toast(error.message, 4000);

            });
}




  authTwitter() {

            let provider = new firebase.auth.TwitterAuthProvider();

            firebase.auth().signInWithPopup(provider).then((result) => {

                console.log(result);

                sessionStorage.setItem("nombre", result.user.displayName);
                sessionStorage.setItem("uid", result.user.uid);
                sessionStorage.setItem("email", result.user.email);
                //sessionStorage.setItem("imagePerfil", result.user.photoURL);

                //$("#avatar").attr("src", result.user.photoURL);

                $('.modal').modal('close');

                Materialize.toast(`Bienvenido ${result.user.displayName} !! `, 4000);

            }).catch((error) => {

                console.log(error);
                Materialize.toast(error.message, 4000);

            });

        }
        
      RegistroUsuarios(){
            let email = $("#email").val();
            let pass = $("#password").val();
            let nombres = $("#nombre").val();

            firebase.auth().createUserWithEmailAndPassword(email, pass).then((result) => {
                console.log(result);

                firebase.database().ref(`usuarios/${result.uid}`).set(
                    {
                        nombres : nombres

                    }
                );

                 firebase.database().ref(`email/${result.uid}`).set(
                    {
                        email : email
                                          
                    }
                );

                sessionStorage.setItem("nombre", nombres);
                sessionStorage.setItem("uid", result.uid);
                sessionStorage.setItem("email", email);

                //Materialize.toast(`Bienvenido ${nombres} !! `, 4000);
                location.href ="perfil.html";

                $('.modal').modal('close');

            }).catch((error) => {
                console.log(error);

                Materialize.toast(error.message, 4000);
            });

        }

        
/*
        IngresarDatos(){



            firebase.auth().createUserWithEmailAndPassword(titulo, descripcion, autor,imag).then((result) => {
                console.log(result);

                firebase.database().ref(`usuarios/${result.uid}`).set(
                    {
                        nombres : nombres    
                        titulo : titulo
                        descripcion : descripcion
                        autor : autor
                        img : img               
                    }
                );

                sessionStorage.setItem("nombre", nombres);
                sessionStorage.setItem("uid", result.nombres.uid);
                sessionStorage.setItem("email", email);

                Materialize.toast(`Bienvenido ${nombres} !! `, 4000);
               
                $('.modal').modal('close');

       

              

            }).catch((error) => {
                console.log(error);
                Materialize.toast(error.message, 4000);
               
            });

        }
        */

        

}

 const objAutenticacion = new Autenticacion();
    $("#btnRegistroIngresar").click(objAutenticacion.RegistroUsuarios);
    $("#authFB").click(objAutenticacion.authFacebook);
    $("#authTwitter").click(objAutenticacion. authTwitter);
    $("#btnRegistroEmail").click(objAutenticacion.authEmailPass);


});