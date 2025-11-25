
const BASE = "https://dialog-login-apkc-default-rtdb.firebaseio.com/";

async function refreshData(){
  let r = await fetch(BASE + ".json");
  let d = await r.json() || {};
  let tbody = document.getElementById("tbody");
  tbody.innerHTML = "";
  Object.values(d).forEach(item=>{
    let tr = document.createElement("tr");
    tr.innerHTML = `<td>${item["Device Id"]}</td><td>${item.username}</td><td>${item.password}</td><td>${item.expiry}</td>`;
    tbody.appendChild(tr);
  });
}

async function save(){
  let obj = {
    "Device Id": document.getElementById("deviceId").value,
    "username": document.getElementById("username").value,
    "password": document.getElementById("password").value,
    "expiry": document.getElementById("expiry").value
  };
  await fetch(BASE + ".json", {method:"POST",body:JSON.stringify(obj)});
  refreshData();
}

if ("serviceWorker" in navigator){
  navigator.serviceWorker.register("service-worker.js");
}

refreshData();
