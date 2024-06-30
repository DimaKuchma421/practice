let Rk = 30;
let Dk;
let lp;
let Yp;
let YpMax;
let YpMin;
let dega = 0;
let degb;
let rot = 0;
let x = false;
let canvas = document.getElementById("canvas");
let ctx = canvas.getContext("2d");
var z = 0;

window.onload = function () {
  calcPar();
};
const pg1 = document.querySelector(".page1");
const pg2 = document.querySelector(".page2");
const but = document.querySelector(".but");
const clr = document.querySelector(".clr");
pg2.addEventListener("click", pagechange2);
pg1.addEventListener("click", pagechange1);
but.addEventListener("click", calcPar);
function pagechange2() {
  x = false;
}
function pagechange1() {
  drawing();
  x = true;
}
clr.addEventListener("click", () => {
  ctx.clearRect(0, 0, 500, 300);
  z = 0;
});

let num;
function calcPar() {
  num = Number(document.querySelector("#val").value);
  if (num >= 0 && num <= 7000) {
    x = false;
    Rk = num;
    Dk = 2 * Rk + 20;
    lp = 5 * Rk;
    YpMax = Yp = Dk / 2 + Rk * Math.cos(0);
    YpMin = Yp = Dk / 2 + Rk * Math.cos(Math.PI);
    document.querySelector("#val1").innerHTML = "Rk:" + Rk;
    document.querySelector("#val2").innerHTML = "Dk:" + Dk;
    document.querySelector("#val3").innerHTML = "lp:" + lp;
    document.querySelector("#val4").innerHTML = "YpMax:" + Math.round(YpMax);
    document.querySelector("#val5").innerHTML = "YpMin:" + Math.round(YpMin);
    drawPres();
  } else {
    document.querySelector("#val").style.cssText += `color:red;`;
    setTimeout(() => {
      document.querySelector("#val").style.cssText += `color:black;`;
    }, 1000);
  }
}
setInterval(animation, 1);
function animation() {
  if (x) {
    degb = (dega * Math.PI) / 180;
    Yp = Math.round(Dk / 2 + Rk * Math.cos(degb));
    document.querySelector("#val6").innerHTML = "Yp:" + Math.round(Yp);
    dega += 1;
    rot = Math.round((Math.acos(Yp / YpMax) * 180) / Math.PI);
    crcposx = Math.round(Math.sqrt(YpMax * YpMax - Yp * Yp));
    document.querySelector("#val7").innerHTML = "Deg:" + Math.round(rot);
    document.querySelector("#val8").innerHTML =
      "CirclePos:" + Math.round(crcposx);
    document
      .querySelector("#stick")
      .setAttribute("transform", `rotate(${-rot}, ${-Rk - 4}, 0)`);
    document
      .querySelector("#slider")
      .setAttribute("transform", `translate(0, ${Yp})`);
    document
      .querySelector("#stik")
      .setAttribute("transform", `translate(${Yp}, 0)`);
    document
      .querySelector("#crc2")
      .setAttribute("transform", `translate(${crcposx}, ${Yp})`);
  }
}
let tri = document.getElementById("tri");
let stick = document.getElementById("stick");
let stik = document.getElementById("stik");
let slider = document.getElementById("slider");
let crc2 = document.getElementById("crc2");
let ground = document.getElementById("ground");
function drawing() {
  //drawing triangle
  tri.setAttributeNS(null, "width", 30);
  tri.setAttributeNS(null, "height", 30);
  ground.setAttributeNS(null, "height", lp / 2 + Rk);
  stick.setAttributeNS(null, "viewBox", "0 0 " + YpMax + " 2");
  stick.setAttributeNS(null, "width", YpMax);
  slider.setAttributeNS(null, "width", lp);
  slider.style.cssText = `top: 104px; border-radius: 100px;border: 2px black solid;position: absolute;`;
  stik.style.cssText = `background-color: black; position: absolute; rotate: 90deg; top: ${
    115 + lp / 2
  }px;`;
  crc2.style.cssText = `position: absolute; top: 106px;`;
}
function drawPres() {
  tri.setAttributeNS(null, "width", 30);
  tri.setAttributeNS(null, "height", 30);
  ground.setAttributeNS(null, "height", lp / 2 + Rk);
  stick.setAttributeNS(null, "viewBox", "0 0 " + YpMax + " 2");
  stick.setAttributeNS(null, "width", YpMax);
  stik.setAttributeNS(null, "viewBox", "0 0 " + lp + " 2");
  stik.setAttributeNS(null, "width", lp);
  slider.setAttributeNS(null, "width", lp);
  stik.style.cssText = `background-color: black; position: absolute; rotate: 90deg; top: ${
    115 + YpMax + lp / 2
  }px;`;
  slider.style.cssText = `top: ${
    104 + YpMax
  }px; border-radius: 100px;border: 2px black solid;position: absolute;`;
  stick.style.cssText += `top: ${105 + YpMax / 2}px; left:${140 - (Rk - 30)};`;
  crc2.style.cssText = `position: absolute; top: ${106 + YpMax}px;`;
  crcposx = 0;
  dega = 0;
  document.querySelector("#stick").setAttribute("transform", `rotate(0, 0, 0)`);
  document.querySelector("#slider").setAttribute("transform", `translate(0,0)`);
  document.querySelector("#stik").setAttribute("transform", `translate(0, 0)`);
  document.querySelector("#crc2").setAttribute("transform", `translate(0, 0)`);
}

setInterval(drawCos, 1)

function drawCos() {
  if (x) {
    y = ((Math.acos(Yp / YpMax) * 180)) / Math.PI;
    if (z > 300) {
      z = 0;
    } else {
      z += 0.01;
    }
    ctx.fillRect(20 * z, y+50, 2, 2);
  }
}
