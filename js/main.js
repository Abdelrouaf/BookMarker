let siteName = document.getElementById("siteName");
let siteUrl = document.getElementById("siteUrl");
let submit = document.getElementById("submit");
let deleteWebsites = document.getElementById("deleteWebsites");
let table = document.getElementById("table");

let siteContainer;

if(localStorage.getItem("websites") == null) {
    siteContainer = [];
} else {
    siteContainer = JSON.parse(localStorage.getItem("websites"));
    displaySites();
}

siteName.addEventListener("keyup", function(e) {
    if(e.target.value === "") {
        siteName.classList.add("is-invalid");
    } else {
        siteName.classList.add("is-valid");
        siteName.classList.remove("is-invalid");
    }
})

siteUrl.addEventListener("keyup", function(e) {
    if(e.target.value.includes(".com")) {
        siteUrl.classList.add("is-valid");
        siteUrl.classList.remove("is-invalid");
    }
    else {
        siteUrl.classList.add("is-invalid");
    }
})

submit.addEventListener("click", addSites);

function addSites() {
    let site = {
        Name : siteName.value,
        Url : siteUrl.value
    }

    if(siteName.classList.contains("is-invalid") || siteUrl.classList.contains("is-invalid") || siteName.value == "" || siteUrl.value == "") {
        alert("invalid input")
    } else {
        siteContainer.push(site);
        localStorage.setItem("websites", JSON.stringify(siteContainer));
        displaySites();
        clearInputs();
        location.reload();
    }
}

function clearInputs() {
    siteName.value = "";
    siteUrl.value = "";
    siteUrl.classList.remove("is-invalid");
    siteUrl.classList.remove("is-valid");
    siteName.classList.remove("is-invalid");
    siteName.classList.remove("is-valid");
}

if (siteContainer.length > 0) {
    table.classList.remove("d-none");
    table.classList.add("bounceInUp");
} else {
    table.classList.add('d-none');
    table.classList.remove('bounceInUp');
}

function displaySites() {
    let sitesList = "";
    for(var i = 0; i < siteContainer.length; i++) 
    {
        sitesList += 
        `<tr>
        
            <td>${i + 1}</td>
        
            <td>${siteContainer[i].Name}</td>
        
            <td><a href="${siteContainer[i].Url}" target="_blank" class="btn btn-success"><i class="fa-regular fa-eye"></i> visit</a></td>
        
            <td><button class="btn btn-danger" onclick="deleteSite(${i})" id="deleteWebsites"><i class="fa-regular fa-trash-can"></i> Delete</button></td>
        
        </tr>`
    }
    document.getElementById("tBody").innerHTML = sitesList;
}

function deleteSite(i) {
    siteContainer.splice(i, 1);
    localStorage.setItem("websites", JSON.stringify(siteContainer));
    displaySites();
    location.reload();
}


