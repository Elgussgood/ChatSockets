var socket = io();
var list = document.querySelector('#not');
//Elementos de HTML
let mensaje = document.getElementById('Mensaje');
let usuario = document.getElementById('Usuario');
let salida = document.getElementById('Salida');
let notificaciones = document.getElementById('Notificaciones');
let boton = document.getElementById('Enviar');

var clientes = [];

boton.addEventListener('click', function () {
  var data = {
    mensaje: mensaje.value,
    usuario: usuario.value,
  };
  console.log(data);

  if (mensaje.value === '' || usuario.value === '') {
    alert('Se requiere un mensaje y un usuario para poder ingresar al chat');
  } else {
    mensaje.value = '';
    socket.emit('chat:mensaje', data);
  }
});

mensaje.addEventListener('keydown', function () {
      socket.emit('chat:escribiendo', usuario.value);
});

socket.on('chat:mensaje', function (data) {
  salida.innerHTML +=
    '<b>' + data.usuario + '</b>: ' + data.mensaje + '<br>';
  Avisos.innerHTML = '';
});

socket.on('chat:escribiendo', function (data) {
  Avisos.innerHTML = '<p><em>' + data + '</em> está escribiendo...</p>';
});

socket.on('socket_desconectado', function (data) {
  console.log(data);
  clientes = clientes.filter(function (cliente) {
    console.log(cliente);
    return cliente.id != data.id;
  });
});

socket.on('socket_conectado', function (data) {
  console.log(data);
  notificaciones.innerHTML += JSON.stringify(data);
});