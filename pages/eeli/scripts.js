//tekijä Eeli Häggblom Tik22SP
//luodaan kysymykset taulukkoon, oikea vastaus on taulukon 6. elementti

const kysymykset = [["Mikä on meidän galaksimme nimi?", "Andromeda", "Linnunrata", "Texas", "Virgo", 2],
["Kuinka vanha maapallo on?", "4,5 miljardia vuotta", "45 miljoonaa vuotta","4,5 miljoonaa vuotta", "4,5 vuotta", 1],
["Milloin ihminen kävi ensimmäisen kerran kuussa?", "1869", "1969", "2009", "1961", 2],
["Mikä on yleisin alkuaine avaruudessa?", "Helium", "Vesi", "Vety", "Rauta", 3],
["Mikä on aurinkokuntamme suurin planeetta?", "Maa", "Jupiter", "Uranus", "Neptunus", 2]];


//luodaan taustakuville taulukko
const taustakuvat = ['./background/orion.jpg','./background/earth.jpg', './background/moon.jpg', './background/space2.jpg', './background/solar-system.jpg', './background/space3.jpg'];

//luodaan "nextquestion" painikkeelle eventlistener joka suorittaa seuraavakysymys funktion
nextquestion = document.getElementById("nextquestion");
nextquestion.addEventListener("click", seuraavakysymys);

//luodaan "tarkista vastaus" -painikkeelle eventlistener joka suorittaa vastauksen tarkistavan funktion
tarkistusnappi = document.getElementById("tarkista");
tarkistusnappi.addEventListener("click", tarkista);

//luodaan "tulokset" -painikkeelle eventlistener joka suorittaa tuloksien näyttämisen
tulosnappi = document.getElementById("tulokset");
tulosnappi.addEventListener("click", tulokset);

//luodaan sivunumerolaskurin sisältävälle boksille muuttuja
sivunumerolaskuri = document.getElementById("tulosboksi");

//luodaan muuttujat sivunumerolle & pisteille
let sivunumero = 0;
let pisteet = 0;




//tämä funktio aloittaa aina uuden sivun visassa 
function seuraavakysymys(){
    //taustakuva päälle

    document.getElementById("contentbox").style.backgroundImage = 'url('+taustakuvat[sivunumero] + ')';

    //poistetaan pojan kuva, muokataan tyylejä 
    document.getElementById("poika").style.display = "none";
    document.getElementById("kysymykset").style.display = "initial";
    nextquestion.innerHTML = "Seuraava kysymys";

    //luodaan radiobuttonit domiin
    luoradiot();

    //kun vastaus on valittu "tarkista vastaus"-napin lukitus poistetaan
    document.querySelectorAll(".radiovalinta").forEach(vastausnappi =>{
        vastausnappi.addEventListener("click", () => tarkistusnappi.disabled = false)});
    
    //nollataan tarkista-funktion luomat korostusvrit ja vaihdetaan sivunumero + otsikko
    otsikko.style.color = "white";
    otsikko.innerHTML = kysymykset[sivunumero][0];
    tulosboksi.innerHTML = "Kysymys " + (sivunumero+1) +"/5";
    nextquestion.style.display = "none";
    tarkistusnappi.style.display = "inline";
}


//tämä funktio luo radiobuttonit ja niiden labelit sivulle 
function luoradiot(){
    //luodaan muuttuja elementille johon vastaukset sijoitellaan
    radiobuttondiv = document.getElementById("radio-button");
    radiobuttondiv.innerHTML = "";
    tarkistusnappi.disabled = true;

    for (let i = 0; i < 4; i++) {

        //radiobuttonien luonti ja määrittely
        let radiovastaus = document.createElement("input");
        radiovastaus.type = "radio";
        radiovastaus.name = "question";
        radiovastaus.id = [i];
        radiovastaus.value = [i+1];
        radiovastaus.classList.add("radiovalinta");

        //labelien luonti ja määrittely
        let label = document.createElement("label");
        label.htmlFor = [i]
        label.innerHTML = kysymykset[sivunumero][i+1]
        label.classList.add("vastaukset", "noselect");
        
        //lisätään elementit domiin
        radiobuttondiv.appendChild(radiovastaus);
        radiobuttondiv.appendChild(label);
    }
}

//tämä funktio tarkistaa käyttäjän antaman vastauksen ja sen perusteella antaa pisteet ja muuttaa valitun vastauksen väriä 
function tarkista(){
    //luodaan muuttuja valitun radiobuttonin labelille 
    valittuvastaus = document.querySelector(".radio-button input[type='radio']:checked + label ");

    //viimeisen kysymyksen jälkeen tulokset nappi esiin
    if(sivunumero == 4){
        nextquestion.style.display = "none";
        tarkistusnappi.style.display = "none";
        tulosnappi.style.display = "initial";
    }
    else{  
    nextquestion.style.display = "inline";
    tarkistusnappi.style.display = "none";
    }

    vastaus = document.querySelector('input[name="question"]:checked').value;
    
    //korostetaan oikeat/väärät vastaukset vihreällä/punaisella värillä
    if(vastaus == kysymykset[sivunumero][5]){

        otsikko.innerHTML = "Oikein!";
        otsikko.style.color="green";
        pisteet++;
        sivunumero++;
        valittuvastaus.style.backgroundColor = "green";

    }
    //jos vastaus on väärä niin näytetään oikea vastaus
    else{
        oikeavastaus = kysymykset[sivunumero][5]
        otsikko.innerHTML = "Väärin, oikea vastaus: " + kysymykset[sivunumero][oikeavastaus];
        otsikko.style.color="red"; 
        valittuvastaus.style.backgroundColor = "red";
        sivunumero++;
    }
}

//tämä funktio luo tulossivun jossa mm. näytetään pisteet
function tulokset(){
    //taustakuvan vaihto
    document.getElementById("contentbox").style.backgroundImage = 'url('+taustakuvat[sivunumero] + ')';

    //muotoilun poistaminen
    radiobuttondiv.innerHTML = "";
    otsikko.style.color = "";
    otsikko.innerHTML = "Sait " + pisteet + "/5 pistettä!"

    //pistetään "aloita alusta" nappi näkyviin ja lisätään sille eventlistener joka reloadaa sivun
    document.getElementById("alusta").style.display = "initial";
    document.getElementById("alusta").addEventListener("click", () => {location.reload()});

    tulosnappi.style.display = "none";
    sivunumerolaskuri.style.display = "none";
    
    let emoji = document.getElementById("emoji");
    emoji.style.display = "grid";


    // esitetään käyttäjälle suoritusta vastaava emojie
    switch (+pisteet) {
        case 0:
            emoji.innerHTML = "&#128169";
            break;
        case 1:
            emoji.innerHTML = "&#128557";
            break;
        case 2:
            emoji.innerHTML = "&#128543";
            break;
        case 3:
            emoji.innerHTML = "&#128526";
            break;
        case 4:
            emoji.innerHTML = "&#128522";
            break;
        case 5:
            emoji.innerHTML = "&#128516";
            break;      
    }



}
