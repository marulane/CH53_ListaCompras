let txtName= document.getElementById("Name");
let txtNumber = document.getElementById("Number");
let btnAgregar = document.getElementById("btnAgregar");
let alertValidacionesTexto = document.getElementById("alertValidacionesTexto");
let alertValidaciones = document.getElementById("alertValidaciones");



btnAgregar.addEventListener("click", function(event){
    txtName.value = txtName.value.trim(); //quita espacios vacios al inicio y al final
    txtNumber.value = txtNumber.value.trim();

    if(txtName.value.length <3){
        txtName.style.border="solid 3px red";
        alertValidacionesTexto.innerHTML="<strong>Nombre de producto incorrecto</strong>";
        alertValidaciones.style.display="block";
    }//lenght >=3
})//btnAgregar