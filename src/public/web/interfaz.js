window.onload = () =>{

    const listaBuses = document.querySelector(".menu-despegable__buses");

    const botonesFlecha = document.querySelector(".button__flecha");


    botonesFlecha.addEventListener('click', () =>{

        listaBuses.classList.toggle('ocultarMenu');
    
    });
}