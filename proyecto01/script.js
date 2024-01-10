document.addEventListener('DOMContentLoaded', function() {

     


    //Creamos un Objeto para comprobar que los campos se llenan!
    const email = {
        nombre: "",
        email: "",
        asunto:"",
        mensaje: ""
    }
    

    console.log(email);

    //Selecionar los Inpust con document.queryselecto

    const inputEmail = document.querySelector('#email');
    const inputAsunto = document.querySelector('#asunto');
    const inputMensaje = document.querySelector('#mensaje');
    const inputNombre = document.querySelector('#nombre');
    const formulario = document.querySelector('#formulario1'); // Agregamos esta línea para seleccionar el formulario
    
    //Spinner
    const spinner = document.querySelector('#spinner');
     

    //Botones
    const btnformulario = document.querySelector('#formulario1 button[type="submit"]'); // Agregamos esta línea para seleccionar el formulario
    const btnReset = document.querySelector('#formulario1 button[type="reset"] ')

    //Creamos eventos de Escucha para crear funcion con parametro con los inputs

    inputEmail.addEventListener('blur', validar);
    inputAsunto.addEventListener('blur', validar);
    inputMensaje.addEventListener('blur', validar);
    inputNombre.addEventListener('blur', validar);

    formulario.addEventListener('submit', enviarEmail);

   //Boton reset
   btnReset.addEventListener('click', function(e) {
    e.preventDefault();

    resetFormulario();
})


function enviarEmail(e) {
    e.preventDefault();

       // Verifica si al menos un campo está lleno
       if (!Object.values(email).some(value => value.trim() !== '')) {
        // Si todos los campos están vacíos, muestra una alerta o realiza la acción que desees
        alert('Por favor, completa el formulario.');
        return;
    }

    // Deshabilita el botón antes de mostrar el spinner
    btnformulario.disabled = true;

    // Muestra el spinner
    spinner.classList.remove('oculto');
    spinner.classList.add('visible');

    setTimeout(() => {
        // Oculta el spinner después de 6 segundos
        spinner.classList.remove('visible');
        spinner.classList.add('oculto');

        resetFormulario();

        // Habilita el botón después de ocultar el spinner
        btnformulario.disabled = false;

        //Crear un Alerta
        const alertaExito = document.querySelector('p');
        alertaExito.classList.add('alertaExito');

        alertaExito.textContent = 'Mensaje enviado correctamente';

        formulario.appendChild(alertaExito)

        setTimeout(() => {
            alertaExito.remove();
        }, 3000);

    }, 1500);
}





    //Creamos la funcion Validar
    function validar(e) {
        if(e.target.value.trim() === '') {
            console.log('Tá to vasio');
            e.preventDefault(); // Evitar el envío del formulario
            //Creamos una funcion/reutilizable para crear una alerta 
            mostrarAlerta(`El ${e.target.id} es obligatorio`, e.target.parentElement);
            return;
        }
        comprobarEmail();


        //Condicional para validarEmail

        if(e.target.id === 'email' && !validarEmail(e.target.value)) {
            mostrarAlerta(`El email no es válido`, e.target.parentElement);
            return
        }

        comprobarEmail();

        

        limpiarAlerta(e.target.parentElement);
        

        //Asiganr valores usando los names de los Inputs (mirar los inputs si estan los names)
        email[e.target.name] = e.target.value.trim().toLowerCase();

    };

    function mostrarAlerta(mensaje, referencia){
        //Asegura que el contenedor de mensaje este limpio antes de mostrar un nuveo mensaje de error
        limpiarAlerta(referencia);

        const error = document.createElement('p');
        error.textContent = mensaje;
        error.classList.add('error')

        //Agregamos 
        referencia.appendChild(error);
        
    };

    function limpiarAlerta(referencia) {
        const alerta = referencia.querySelector('.error');
        if(alerta) {
            alerta.remove();
        }
    }

    //Funcion Validar Email

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/;
        const resultado = regex.test(email);
        return resultado;
 
    }


    //comprobar info del objeto

    function comprobarEmail() {
        if (Object.values(email).includes('')) {
            btnformulario.classList.add('opacity');
            btnformulario.disabled = true;
            return;
        }
    
        btnformulario.classList.remove('opacity');
        btnformulario.disabled = false;
    }
    



    function resetFormulario(){
    //Reinicia el Objeto
    email.email = "";
    email.asunto = "";
    email.nombre = "";
    email.mensaje = "";

    formulario.reset();
    comprobarEmail();


        // Habilita el botón de enviar después de resetear el formulario
        btnformulario.disabled = false;

    }
   

}); 
