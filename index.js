// MODELO---------------------------------------------------------------------
class gatito {
    constructor(imagenId, nombre)
    {
        this.numClicks = 0;  
        this.nombre = nombre;
        this.imagen = imagenId;    
    }
}

class ModeloDatos{
    constructor(){
        this.gatos = new Array();
        this.gatos.push(new gatito("./download.jpg", "misifu"));
        this.gatos.push(new gatito("./unnamed.jpg","luna"));
        this.gatos.push(new gatito("./unnamed2.jpg","alita"));
        this.gatos.push(new gatito("./lorita.jpg","lorita"));
        this.gatos.push(new gatito("./images.jpg","jose"));

        this.seleccionado = null;       
    }

    set gatoSeleccionado(numero){
        this.seleccionado = this.gatos[numero];
    }

    get gatoSeleccionado(){
        return this.seleccionado;
    }
}
//--------------------------------------------------------------------------------------------------------
// VISTA -------------------------------------------------------------------------------------------------

class listaGatosView {
    constructor(controlador){
        this.lista = document.getElementById("listaGatos");
        this.controlador = controlador;
        this.mostrar();
    }

    mostrar(){
        // Obtener array de gatos
        this.gatos = this.controlador.getLista;

        // Crear lista
        this.gatos.forEach( (gato, indice) => {
            var item = document.createElement("li");
            item.innerText = gato.nombre;
            item.id = indice;

            // Asociar evento con cada entrada de la lista (cada nombre de gato)
            item.addEventListener("click", (e) => {
                this.controlador.setGatoSeleccionado = e.target.id;                     
              });gatoSeleccionado

            this.lista.appendChild(item);        
        });  
    }
}
class gatoSeleccionadoView {
    constructor(controlador)
    {
        this.controlador = controlador;

        this.etiquetaNombre = document.getElementById("nombreGato");
        this.etiquetaNumClicks = document.getElementById("numeroClicks");
        this.imagen = document.getElementById("imagenGato");

        this.imagen.addEventListener("click", () => {
            this.controlador.incrementaContador();
        })
    }

    mostrar()
    {
        let gatoSeleccionado = this.controlador.getGatoSeleccionado;
        this.etiquetaNombre.textContent = gatoSeleccionado.nombre;
        this.etiquetaNumClicks.textContent = gatoSeleccionado.numClicks;
        this.imagen.src = gatoSeleccionado.imagen;        
    }
}

//--------------------------------------------------------------------------------------------------------
// CONTROLADOR  -------------------------------------------------------------------------------------------------
class controlador{
    constructor()
    {
        this.modelo = new ModeloDatos();
        this.vistaLista = new listaGatosView(this);
        this.vistaGato = new gatoSeleccionadoView(this);      
    }

    get getLista()
    {
        return this.modelo.gatos;
    }

    get getGatoSeleccionado()
    {
        return this.modelo.gatoSeleccionado;
    }

    set setGatoSeleccionado(numero)
    {
        this.modelo.gatoSeleccionado = numero;
        this.vistaGato.mostrar();
    }

    incrementaContador(){
        this.modelo.gatoSeleccionado.numClicks++;
        this.vistaGato.mostrar();
    }
}

//--------------------------------------------------------------------------------------------------------

window.onload = () => {
    controlador = new controlador();
}