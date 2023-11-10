var selectedRow = null;

//mostrar alertas
function showAlert(message, className){
    const div = document.createElement("div");
    div.className = `alert alert-${className}`;

    div.appendChild(document.createTextNode(message));
    const container = document.querySelector(".container");
    const main = document.querySelector(".main");
    container.insertBefore(div, main);

    setTimeout(() => document.querySelector(".alert").remove(), 3000);
}

//Eliminar Todos Los Campos
function clearFields(){
    document.querySelector("#cantidad").value = "";
    document.querySelector("#producto").value = "";
    document.querySelector("#precio").value = "";
    document.querySelector("#venta").value = "";
}

//Agregar Producto
document.querySelector("#product-form").addEventListener("submit", (e) =>{
    e.preventDefault();
    //Get Forms Values
    const cantidad = document.querySelector("#cantidad").value;    
    const producto = document.querySelector("#producto").value;
    const precio = document.querySelector("#precio").value;
    const venta = document.querySelector("#venta").value;

    //validacion

    if(cantidad == "" || producto == "" || precio =="" || venta == ""){
        showAlert("Por favor llena los campos", "danger");
    }
    else{
        if (selectedRow == null){
            const list = document.querySelector("#product-list");
            const row = document.createElement("tr");

            row.innerHTML = `
                <td>${cantidad}</td>
                <td>${producto}</td>
                <td>${precio}</td>
                <td>${venta}</td>
                <td>
                    <a href="" class="btn btn-warning btn-sm edit">Editar</a>
                    <a href="" class="btn btn-danger btn-sm delete">Eliminar</a>
                </td>
            `;
            list.appendChild(row);
            selectedRow = null;
            showAlert("Producto Agregado", "success");
        }
        else{
            selectedRow.children[0].textContent = cantidad;            
            selectedRow.children[1].textContent = producto;
            selectedRow.children[2].textContent = precio;
            selectedRow.children[3].textContent = venta;
            selectedRow = null;
            showAlert("Producto Editado", "info");
        }

        clearFields();
    }
});

//Editar Producto
document.querySelector("#product-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("edit")){
        selectedRow = target.parentElement.parentElement;
        document.querySelector("#cantidad").value = selectedRow.children[0].textContent;        
        document.querySelector("#producto").value = selectedRow.children[1].textContent;
        document.querySelector("#precio").value = selectedRow.children[2].textContent;
        document.querySelector("#venta").value = selectedRow.children[3].textContent;
    }
});

//Eliminar Producto
document.querySelector("#product-list").addEventListener("click", (e) =>{
    target = e.target;
    if(target.classList.contains("delete")){
        target.parentElement.parentElement.remove();
        showAlert("Producto Eliminado", "danger");
    }
});
