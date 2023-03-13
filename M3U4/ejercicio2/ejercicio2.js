const caract = document.getElementById('caracteres');
const cantidad = document.getElementById('cant-caract');

caract.addEventListener("input", function () {
    const cant = caract.value.length;
    console.log(cant);
    cantidad.textContent = cant;
});