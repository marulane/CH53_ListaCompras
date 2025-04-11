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
const btnClear = document.getElementById("btnClear"); //Boton para limpiar


//Numeración de la primera columna de la table
let cont = 0;
let costoTotal=0;
let totalEnProductos = 0;

let datos = new Array(); //Almacena los elementos de la tabla

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

        let elemento =  { //Creando OBJETO con notación JSON (clave, valor) a partir de los datos de la tabla
                            "cont" : cont,
                            "nombre" : txtName,
                            "cantidad" : txtNumber,
                            "precio" : precio 
                        };
        datos.push(elemento);
        //Almacenando el elemento al localstorage
        localStorage.setItem("datos", JSON.stringify(datos));
        

        cuerpoTabla.insertAdjacentHTML("beforeend", row);
        costoTotal += precio * Number(txtNumber.value);
        precioTotal.innerText = "$ " + costoTotal.toFixed(2);

        totalEnProductos += Number(txtNumber.value);
        productosTotal.innerText = totalEnProductos;

        contadorProductos.innerText = cont;

        //Crear el OBJETO despues de la asignacion de sus valores
        let resumen =   { //Creando objeto para resumen de compra
            "cont": cont,
            "totalEnProductos": totalEnProductos,
            "costoTotal": costoTotal
        }
        //Almacenando resumen al localstorage
        localStorage.setItem("resumen", JSON.stringify(resumen));

        //Limpia los campos después de agregarlos a la tabla
        txtName.value="";
        txtNumber.value="";
        //Regresa el puntero a el primer campo para seguir escribiendo
        txtName.focus(); 
    }
    
})//btnAgregar


window.addEventListener("load", function(event){
    event.preventDefault();

    if(this.localStorage.getItem("datos")!=null){
        datos = JSON.parse(this.localStorage.getItem("datos"));
    }

    if(this.localStorage.getItem("resumen")!=null){
        let resumen = JSON.parse(this.localStorage.getItem("resumen"));
        costoTotal = resumen.costoTotal;
        totalEnProductos = resumen.totalEnProductos;
        cont = resumen.cont;

    }//resumen != null

        precioTotal.innerText = "$ "+ costoTotal.toFixed(2);
        productosTotal.innerText = totalEnProductos;
        contadorProductos.innerText = cont;
});

// funcion para limpiar todo (resumen, datos, campo y agregar alerta)

btnClear.addEventListener("click", function(event){
    //no usar clear
    event.preventDefault();
    localStorage.removeItem("datos");
    localStorage.removeItem("resumen");

    productosTotal.innerText = 0;
    precioTotal.innerText ="$ " + 0.00;
    contadorProductos.innerText = 0;
    cuerpoTabla.innerHTML="";
        txtName.value="";
        txtNumber.value="";
        txtName.focus();

    cont = 0;
    costoTotal=0;
    totalEnProductos = 0;

    //Limpiando formatos de alerta e input
    txtName.style.border=""; //sin estilo para nombre
    txtNumber.style.border=""; //sin estilo para cantidad
    alertValidacionesTexto.innerHTML="" //sin mensaje
    alertValidaciones.style.display="none";  //oculto

});