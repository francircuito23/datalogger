window.onload = () => {

    const listaBuses = document.querySelector(".menu-despegable__buses");

    const botonesFlecha = document.querySelector(".button__flecha");


    botonesFlecha.addEventListener('click', () => {

        listaBuses.classList.toggle('ocultarMenu');
    
    });

    document.querySelector('.menu-despegable__element__button').addEventListener('click', () => {

        var url = `http://192.168.0.181:8000/buses`;

        fetch(url, {
            method: 'GET',
            mode: 'cors',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            }
        })

        .then(response => {
            return response.json()
        })
        .then(data => {
            console.log(data);
            if(data.length > 0){

                document.querySelector('.buses-conectados__element').style.display = "";

                let titulo = "";
                data.forEach(function(bus) {
                    titulo+= `
                        <ul>
                            <li>ID: <b>${bus.id}</b></li>
                            <li>Bus: <b>${bus.bus}</b></li>
                            <li>Comentario: <b>${bus.comentario}</b></li>
                        </ul>
                    `;
                });
                document.querySelector(".buses").innerHTML = titulo;
            }
            else{
                document.querySelector('.buses-conectados__element__noExiste').style.display = "";
            }

        })
    })
}

