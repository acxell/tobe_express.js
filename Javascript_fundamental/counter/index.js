let down = document.getElementById(`down`);
let reset = document.getElementById(`reset`);
let up = document.getElementById(`up`);
let num = document.getElementById('num');

let angka = 0;

down.onclick = function(){
    angka--;
    num.textContent = angka;
}

up.onclick = function(){
    angka++;
    num.textContent = angka;
}

reset.onclick = function(){
    angka = 0;
    num.textContent = angka;
}


