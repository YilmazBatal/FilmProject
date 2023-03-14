const form = document.querySelector("#film-form");
const titleElement = document.querySelector("#title");
const directorElement = document.querySelector("#director");
const urlElement = document.querySelector("#url");
const cardBody = document.querySelectorAll(".card-body")[1];
const clearBtn = document.querySelector("#clear-films");

// UI objesini başlatma
const ui = new UI();
// Storage objesini başlatma
const storage = new Storage();

// Tüm eventleri yükleme

eventListeners();

function eventListeners() {
    form.addEventListener("submit",addFilm);
    document.addEventListener("DOMContentLoaded",function() {
       let films = storage.getFilmsFromStorage();
       ui.loadAllFilms(films); 
    });
    cardBody.addEventListener("click",deleteFilm);
    clearBtn.addEventListener("click",clearAllFims);
}
function addFilm(e){
    const title = titleElement.value;
    const director = directorElement.value;
    const url = urlElement.value;

    if (title === "" || director === "" || url === ""){
        ui.displayMessage("Lütfen tüm alanları doldurunuz.","danger")
    }
    else {
        // Yeni Film
        const newFilm = new Film(title, director, url);
        ui.addFilmToUI(newFilm); // Ara yüze film ekleme
        storage.addFilmToStorage(newFilm); // Storage'a Film ekleme
        ui.displayMessage("Film başarıyla eklendi.","success") // Alert gösterme
    }
    ui.clearInputs(titleElement,urlElement,directorElement); // Kutuları silme

    e.preventDefault();
}
function deleteFilm(e) {
    if (e.target.id === "delete-film") {
        ui.deleteFilmFromUI(e.target);
        storage.deleteFilmFromStorage(e.target.parentElement.previousElementSibling.previousElementSibling.textContent);
        ui.displayMessage("Silme işlemi başarılı.","success");
    }
}
function clearAllFims() {

    if (confirm("Tüm filmleri silmek istediğinize emin misiniz?")) {
        ui.clearAllFimsFromUI();
        storage.clearAllFilmsFromStorage();
        ui.displayMessage("Silme işlemi başarılı.","success");
    }
}