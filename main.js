const costos = [
  IVA = 1.21,
  envio = 500,
] 

class Bebidas {
  constructor(nombre, tamaño, precio, id, img) {
    this.nombre = nombre;
    this.tamaño = tamaño;
    this.precio = precio;
    this.id = id;
    this.img = img;
  }
}

const cocaCola= new Bebidas ("Coca Cola", "500", 200, 1, "./img/CocaCola.png");
const sprite = new Bebidas ("Sprite", "500", 225, 2,"./img/Sprite.png");
const fanta = new Bebidas ("Fanta", "500", 225, 3, "./img/Fanta.png");
const cepitaTetra = new Bebidas ("Cepita Tetra", "1000", 250, 4, "./img/Cepita.png");
const cepitaBotella = new Bebidas ("Cepita Botella", "995", 275, 5, "./img/CepitaBot.png");
const hiC = new Bebidas ("Hi-C", "1500", 150, 6, "./img/HiC.png");
const aquarius = new Bebidas ("Aquarius", "500", 180, 7, "./img/Aquarius.png");
const kin = new Bebidas ("Kin", "500", 120, 8, "./img/Kin.png");
const smartWater = new Bebidas ("Smart Water", "591", 150, 9, "./img/Smartwater.png");

const arrayBebidas = [cocaCola, sprite, fanta, cepitaTetra, cepitaBotella, hiC, aquarius, kin, smartWater];

const arrayBebidasConIva = arrayBebidas.map((precioMasIva => {
  return {
    nombre: precioMasIva.nombre,
    tamaño: precioMasIva.tamaño,
    precioMasIva: (precioMasIva.precio * IVA),
    id: precioMasIva.id,
    img: precioMasIva.img,
  }
})); 

let carrito = JSON.parse(localStorage.getItem('carrito')) || [];
let section = document.querySelector('.bebidas');
let carro = document.querySelector('.carrito');

mostrarCarrito();

function tarjetaBebidas() {
  arrayBebidas.forEach((prod) => {
    section.innerHTML +=
      `<div class="tarjeta">
        <div class="img-box">
            <img src="${prod.img}"></img>
        </div>
        <span>${prod.nombre}</span>
        <span>${prod.tamaño}</span>
        <span>$${prod.precio}</span>
        <button id="btnResta-${prod.id}">-</button>
        <button id="btnSuma-${prod.id}">+</button>
     </div>`;
  });
  funcionBtnResta();
  funcionBtnSuma();
  mostrarCarrito();
}

function funcionBtnSuma() {
  arrayBebidas.forEach((prod) => {
    document.getElementById(`btnSuma-${prod.id}`).addEventListener('click', () => {
      sumarAlCarrito(prod);
    });
  });
}

function funcionBtnResta() {
  arrayBebidas.forEach((prod) => {
    document.getElementById(`btnResta-${prod.id}`).addEventListener('click', () => {
      restarAlCarrito(prod);
    });
  });
}

function sumarAlCarrito(prod) {
  let existe = carrito.some((element) => element.id == prod.id);
  if (existe === false) {
    prod.cantidad = 1;
    carrito.push(prod);
  }
  else {
    let carritoBebida = carrito.find((element) => element.id == prod.id);
    carritoBebida.cantidad++;
  }
  localStorage.setItem('carrito', JSON.stringify(carrito));
  mostrarCarrito();
}

function restarAlCarrito(prod) {
  let existe = carrito.some((element) => element.id == prod.id);
  if (existe === false) {
    prod.cantidad = 1;
    carrito.pop(prod);
  }
  else {
    let carritoBebida = carrito.find((element) => element.id == prod.id);
    if (carritoBebida.cantidad > 0) {
      carritoBebida.cantidad--;
      localStorage.setItem('carrito', JSON.stringify(carrito));
      mostrarCarrito();
    }
  }
}

function mostrarCarrito() {
    carro.innerHTML = '';
    let totalCarrito = 0;
    carrito.forEach((prod) => {
      let subtotal = (prod.cantidad * prod.precio * IVA);
      carro.innerHTML += 
        `<div class="card">
           <span><img src="${prod.img}"></img></span>
           <span>${prod.nombre}</span>
           <span>${prod.tamaño} mL</span>
           <span>$${prod.precio} + IVA</span>
           <p>unidades: ${prod.cantidad}</p>
           <p>Subtotal compra: $${subtotal.toFixed(2)}</p>
           <button id="vaciarCarrito-${prod.id}">Borrar</button>
        </div>`; 
      totalCarrito += subtotal; 
    });
  carro.innerHTML += 
    `<div class="total">
      <p>Total de la compra: $${totalCarrito.toFixed(2)}</p>
      <button id= "comprar">Comprar</button>
    </div>`
  funcionBtnBorrar();
}

function funcionBtnBorrar() {
  carrito.forEach((prod) => {
    document.getElementById(`vaciarCarrito-${prod.id}`).addEventListener('click', () => {
      borrarProd(prod);
    });
  });
}

function borrarProd(prod) {
  carrito = carrito.filter((element) => element.id !== prod.id); 
  localStorage.setItem('carrito', JSON.stringify(carrito)); 
  mostrarCarrito(); 
}

tarjetaBebidas();

