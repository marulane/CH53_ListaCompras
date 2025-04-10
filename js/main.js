let txtName= document.getElementById("Name"); //Nombre
let txtNumber = document.getElementById("Number"); //Cantidad
let btnAgregar = document.getElementById("btnAgregar"); //Botón Agregar
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto"); //Texto del contenedor de alerta
let alertValidaciones = document.getElementById("alertValidaciones"); //Contenedor oculto de alerta

const contadorProductos = document.getElementById("contadorProductos"); //Contador de productos, mas no de unidades
const precioTotal = document.getElementById("precioTotal"); //precio total de la compra
//seleccionando la tabla del HTML por su id
let tablaListaCompras = document.getElementById("tablaListaCompras");
//Accediendo a el cuerpo de la tabla seleccionada arriba
const cuerpoTabla = tablaListaCompras.getElementsByTagName("tBody").item(0);

//Numeración de la primera columna de la table
let cont = 0;
let costoTotal=0;
let totalEnProductos = 0;

function validarCantidad(){
    if(txtNumber.value.trim().length<=0){
        return false;
    }//lenght<=0

    if(isNaN(txtNumber.value)){
        return false;
    }//isNaN

    if(Number(txtNumber.value)<=0){ //convierte primero a Number, despues te aseguras que la cantidad sea mayor a 0
        return false;
    }//menor igual a 0
    return true;
}//validarCantidad

function getPrecio(){
    //Se genera un valor random con limite de 1 - 100, se redondea y se divide entre 100 para tener dos decimales 
    return Math.round((Math.random()*10000))/100;
}//getPrecio

btnAgregar.addEventListener("click", function(event){
    event.preventDefault();

    //Bandera, al ser true permite agregar los datos a la tabla
    let isValid=true;

    //Limpiando formatos de alerta e input
    txtName.style.border=""; //sin estilo para nombre
    txtNumber.style.border=""; //sin estilo para cantidad
    alertValidacionesTexto.innerHTML="" //sin mensaje
    alertValidaciones.style.display="none";  //oculto

    txtName.value = txtName.value.trim(); //quita espacios vacios al inicio y al final
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length <3){
        txtName.style.border="solid 3px red";
        alertValidacionesTexto.innerHTML="<strong>Nombre de producto incorrecto</strong>"; //Se tiene que desactivar el estilo rojo para que no se active d
        alertValidaciones.style.display="block"; 
        isValid=false;
    }//lenght >=3

    if(! validarCantidad()){ //Si el return de la funcion es falsa
        txtNumber.style.border="solid 3px red";
        alertValidacionesTexto.innerHTML+="<br/><strong>La cantidad no es correcta</strong>"; //Se tiene que desactivar el estilo rojo para que no se active d
        alertValidaciones.style.display="block"; 
        isValid = false;
    }//lenght<=0

    if(isValid){
        cont++; //primera columna
        let precio = getPrecio();
        let row = `<tr>
                        <td>${cont}</td>
                        <td>${txtName.value}</td>
                        <td>${txtNumber.value}</td>
                        <td>${precio}</td>
                    </tr>`;
        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);

        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;

        contadorProductos.innerText = cont;



        //Limpia los campos después de agregarlos a la tabla
        txtName.value="";
        txtNumber.value="";
        //Regresa el puntero a el primer campo para seguir escribiendo
        txtName.focus(); 
    }
    
})//btnAgregar