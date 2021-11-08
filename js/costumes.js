function autoTraeCategoria(){
    console.log("se esta ejecutando")

    $.ajax({
        url:"http://144.22.242.145:8080/api/Category/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            let $select = $("#select-category");
            $.each(respuesta, function (id, name) {
                $select.append('<option value='+name.id+'>'+name.name+'</option>');
                console.log("select "+name.id);
            }); 
        }
    })
}

function traerInformacionCostume(){
    console.log("Función se esta ejecutando")

    $.ajax({
        url:"http://144.22.242.145:8080/api/Costume/all",
        type:"GET",
        datatype:"JSON",
        success:function(respuesta){
            console.log(respuesta);
            pintarRespuestaCostume(respuesta);
        }
    })
}

function pintarRespuestaCostume(respuesta){
    let myTable = "<table class='ui center aligned celled table'>" + 
    "<thead><tr><th>NOMBRE DISFRAZ</th><th>MARCA</th><th>AÑO</th><th>DESCRIPCION</th><th>CATEGORIA</th><th colspan='3'></th></tr></thead>";
    for(i=0;i<respuesta.length;i++){
        myTable+="<tr>";
        myTable+="<td>"+respuesta[i].name+"</td>";
        myTable+="<td>"+respuesta[i].brand+"</td>";
        myTable+="<td>"+respuesta[i].year+"</td>";
        myTable+="<td>"+respuesta[i].description+"</td>";
        myTable+="<td>"+respuesta[i].category+"</td>";
        myTable+="<td> <button class='ui red button' onclick='borrar("+respuesta[i].id+")'>Borrar Disfraz</button></td>";
        myTable+="<td> <button class='ui blue button' onclick='cargarDatosCostume("+respuesta[i].id+")'>Editar Disfraz</button></td>";
        myTable+="<td> <button class='ui yellow button' onclick='actualizar("+respuesta[i].id+")'>Actualizar Disfraz</button></td>";
        myTable+="</tr>";
    }
    myTable+="</table>";
    $("#miListaCostume").html(myTable);
}

function cargarDatosCostume(id) {

    $.ajax({
        dataType: 'json',
        url:"http://144.22.242.145:8080/api/Costume/" + id,
        type: 'GET',
        success: function (respuesta) {
            console.log(respuesta);
            var item = respuesta;
            $("#id").val(item.id);
            $("#name").val(item.name);
            $("#brand").val(item.brand);
            $("#year").val(item.year);
            $("#description").val(item.description);
            $("#category").val(item.category);
        },
        error: function (jqXHR, textStatus, errorThrown) {

        }
    });
}

function agregarCostume() {
    if($("#name").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description").val().length == 0){
       alert("Todos los campos son obligatorios")
    }else{
            let elemento = {
                name: $("#name").val(),
                brand: $("#brand").val(),
                year: $("#year").val(),
                description: $("#description").val(),
                category:{id: +$("#select-category").val()},
            }
            let dataToSend = JSON.stringify(elemento);
            console.log(elemento);

            $.ajax({
                type: "POST",
                contentType: "application/json; charset=utf-8",
                url:"http://144.22.242.145:8080/api/Costume/save",
                dataType: "JSON",
                data: dataToSend,
                success:function(respuesta){
                    console.log(respuesta);
                    console.log("Se guardo Correctamente");
                    $("#miListaCostume").empty();
                    $("#name").val("");
                    $("#brand").val("");
                    $("#year").val("");
                    $("#description").val("");
                    traerInformacionCostume();                    
                    alert("Se ha guardado Correctamente!")
                },
                error: function(jqXHR, textStatus, errorThrown) {
                    alert("No se Guardo Correctamente")
                }
            });
    }
}

function borrar(idElemento) {
    var elemento = {
        id: idElemento
    }
    var dataToSend = JSON.stringify(elemento);
    console.log(dataToSend);

    $.ajax(
        {
            dataType: 'json',
            data: dataToSend,
            url:"http://144.22.242.145:8080/api/Costume/"+idElemento,
            type: 'DELETE',
            contentType: "application/JSON",
            success: function (respuesta) {
                console.log(respuesta);
                $("#miListaCostume").empty();
                alert("se ha Eliminado Correctamente!")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Elimino Correctamente!")
            }
        });
}

function actualizar(idElemento) {
    if($("#name").val().length == 0 || $("#brand").val().length == 0 || $("#year").val().length == 0 || $("#description").val().length == 0){
        alert("Todos los campos deben estar llenos")
    }else{
        let elemento={
            id:idElemento,
            name:$("#name").val(),
            brand:$("#brand").val(),
            year:$("#year").val(),
            description:$("#description").val(),
            category:{id:+$("#select-category").val()},
        };
        console.log(elemento);
        let dataToSend=JSON.stringify(elemento);

        $.ajax({
            url:"http://144.22.242.145:8080/api/Costume/update",
            type:"PUT",
            data:dataToSend,
            contentType:"application/JSON",
            dataType:"JSON",
            success:function(respuesta){
                console.log(respuesta);
                $("#miListaCostume").empty();
                $("#id").val("");
                $("#name").val("");
                $("#brand").val("");
                $("#year").val("");
                $("#description").val("");
                traerInformacionCostume();
                alert("se ha Actualizado Correctamente!")
            },
            error: function (jqXHR, textStatus, errorThrown) {
                alert("No se Actualizo Correctamente!")
            }
        });
    }
}