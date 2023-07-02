function obtenerTopNombresPropios() {
    var texto = document.getElementById('texto').value;

    // Realizar la solicitud AJAX al servidor
    var xhr = new XMLHttpRequest();
    xhr.onreadystatechange = function() {
        if (xhr.readyState === XMLHttpRequest.DONE) {
            if (xhr.status === 200) {
                var topNombresPropios = JSON.parse(xhr.responseText);
                mostrarResultado(topNombresPropios);
            } else {
                alert('Ocurrió un error al obtener los nombres propios.');
            }
        }
    };

    xhr.open('POST', '/obtener-top-nombres-propios');
    xhr.setRequestHeader('Content-Type', 'application/json');
    xhr.send(JSON.stringify({ texto: texto }));
}

function mostrarResultado(topNombresPropios) {
    var resultadoDiv = document.getElementById('resultado');
    resultadoDiv.innerHTML = '';

    if (topNombresPropios.length > 0) {
        var h2 = document.createElement('h2');
        h2.textContent = 'Top Nombres Propios:';
        resultadoDiv.appendChild(h2);

        var ul = document.createElement('ul');
        for (var i = 0; i < topNombresPropios.length; i++) {
            var nombrePropio = topNombresPropios[i][0];
            var frecuencia = topNombresPropios[i][1];

            var li = document.createElement('li');
            li.textContent = nombrePropio + ' - ' + frecuencia + ' repeticiones';
            ul.appendChild(li);
        }
        resultadoDiv.appendChild(ul);
    } else {
        resultadoDiv.textContent = 'No se encontraron nombres propios en el texto.';
    }
}
