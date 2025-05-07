let Formulario = document.getElementById("Formulario");



// Agregar un avento al formulario y anular el comportamiento por defecto al recargar la pagina
//  y agregar las funciones asociadas al evento submit 

Formulario.addEventListener("submit", function (event) {


    event.preventDefault();
    let FormularioData = new FormData(Formulario);
    let Transacion_Obj = ConvertirAobj(FormularioData);
    console.log(Transacion_Obj);


    InsertarFilaEntabla(Transacion_Obj);
    EnviarAlocal(Transacion_Obj);
    Formulario.reset(); // Reiniciar el formulario
    

    } ); 

function CategoryOption() {

let Allcategories = ["comida", "diversion", "cuotas", "gastos"];
for (let index = 0; index < Allcategories.length; index++) {
    AddCategory(Allcategories[index]);
}


}






    function AddCategory(NameCategory) {

        let CategoryOption = document.getElementById("categoria");
        let NewCat = `<option> ${NameCategory} </option>`;
        CategoryOption.insertAdjacentHTML("beforeend", NewCat);

    }




document.addEventListener("DOMContentLoaded", function () {

    CategoryOption()
    let ArrayObsj = JSON.parse(localStorage.getItem("Formulario")) 
       

        ArrayObsj.forEach(function (ArrayElement) {
            InsertarFilaEntabla(ArrayElement);
            console.log("Succesfully!")

        })


    });
      




   // Obtener los valores de los inputs del formulario y guardarlos en variables para despues imprimirlos en consola



   function ObtenerValoresId() {

let LastElement = localStorage.getItem("LastElement") || "-1";
let NewElementId = JSON.parse(LastElement) + 1;
localStorage.setItem("LastElement", JSON.stringify(NewElementId));
return NewElementId;
    }


function ConvertirAobj(FormularioData) {
    
    let Tipo = FormularioData.get("typeRadio");
    let Descrip = FormularioData.get("description");
    let Precio = FormularioData.get("amount");
    let Categoria = FormularioData.get("category");
    let TransactionId = ObtenerValoresId();

    return { "Tipo de transaccion": Tipo,
         "Descripcion": Descrip,
         "Precio": Precio,
         "Categoria" : Categoria,
         "TransactionId" : TransactionId
    }};



// Funcion parabtener los valores de los inputs del formulario y crear una nueva fila en la tabla

    function InsertarFilaEntabla(Transacion_Obj) {
    let TransactionTableRef = document.getElementById("transationTable");
    let TableRow = TransactionTableRef.insertRow(-1); 
    TableRow.setAttribute("Data-transaction-Id", Transacion_Obj["TransactionId"]); // Agregar un atributo a la fila con el id de la transaccion
    let TipoCell = TableRow.insertCell(0); 
    TipoCell.textContent = Transacion_Obj["Tipo de transaccion"];
    TipoCell = TableRow.insertCell(1);
    TipoCell.textContent = Transacion_Obj["Descripcion"];
    TipoCell = TableRow.insertCell(2);
    TipoCell.textContent = Transacion_Obj["Precio"];
    TipoCell = TableRow.insertCell(3);
    TipoCell.textContent = Transacion_Obj["Categoria"];



let EliminarCell = TableRow.insertCell(4);
   let EliminarBtn = document.createElement("button");
    EliminarBtn.textContent = "Eliminar";
    EliminarCell.appendChild(EliminarBtn);

    EliminarBtn.addEventListener("click", (event) => {
        let TransactionRow = event.target.parentNode.parentNode;
        let TransactionId = TransactionRow.getAttribute("Data-transaction-Id");
        TransactionRow.remove(); // Eliminar la fila de la tabla
        EliminarLocal(TransactionId); // Llamar a la funcion para eliminar el objeto del localStorage
        console.log("Eliminado correctamente")

    })};



   function EliminarLocal(TransactionId) {
    let ArrayObsj = JSON.parse(localStorage.getItem("Formulario"));
    let TindexArray = ArrayObsj.findIndex(Element => Element.TransactionId == TransactionId);
    TindexArray = ArrayObsj.splice(TindexArray, 1);
    let FormString = JSON.stringify(ArrayObsj);
    localStorage.setItem("Formulario", FormString);




    };

    function EnviarAlocal(Transacion_Obj) {


        let ArrayJSON = JSON.parse(localStorage.getItem("Formulario")) || [];
        ArrayJSON.push(Transacion_Obj);
        let FormString = JSON.stringify(ArrayJSON);  
        localStorage.setItem("Formulario", FormString);


    }



    

