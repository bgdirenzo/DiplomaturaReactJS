const items = document.getElementsByClassName('item');
const rojo = document.querySelector('#rojo');
rojo.addEventListener('click', function () {
    document.body.style.backgroundColor = "red";
});

const verde = document.querySelector('#verde');
verde.addEventListener('click', function () {
    document.body.style.backgroundColor = "green";
});

const azul = document.querySelector('#azul');
azul.addEventListener('click', function () {
    document.body.style.backgroundColor = "blue";
});