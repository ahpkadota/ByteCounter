$(document).ready(
    function() {
        chrome.storage.local.get(['appeals'], function(res) {
            if (!res.appeals) {
                let q = document.getElementById("appeals");
                let tr = document.createElement("tr");
                let qName = document.createElement("th");
                let qNumber = document.createElement("td");
                qName.innerHTML = "No tasks completed";
                qNumber.innerHTML = "-";
                tr.appendChild(qName);
                tr.appendChild(qNumber);
                q.appendChild(tr)
            } else {
                for (property in res.appeals) {
                    let q = document.getElementById("appeals");
                    let tr = document.createElement("tr");
                    let qName = document.createElement("th");
                    let qNumber = document.createElement("td");
                    qName.innerHTML = property;
                    qNumber.innerHTML = res.appeals[property];
                    tr.appendChild(qName);
                    tr.appendChild(qNumber);
                    q.appendChild(tr)
                
                }
            }
        });
        chrome.storage.local.get(['keys'], function(res) {
            if (!res.keys) {
                let q = document.getElementById("queues");
                let tr = document.createElement("tr");
                let qName = document.createElement("th");
                let qNumber = document.createElement("td");
                qName.innerHTML = "No tasks completed";
                qNumber.innerHTML = "-";
                tr.appendChild(qName);
                tr.appendChild(qNumber);
                q.appendChild(tr)
            } else {
                for (property in res.keys) {
                    let q = document.getElementById("queues");
                    let tr = document.createElement("tr");
                    let qName = document.createElement("th");
                    let qNumber = document.createElement("td");
                    qName.innerHTML = property;
                    qNumber.innerHTML = res.keys[property];
                    tr.appendChild(qName);
                    tr.appendChild(qNumber);
                    q.appendChild(tr)
                }
            }
        });
        document.getElementById("reset").addEventListener("click", function() {
                    chrome.storage.local.clear()
            });
        })


