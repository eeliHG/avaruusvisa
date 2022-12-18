//luodaan muuttujat navbarille, sisällölle ja hampurilaisvalikolle
let navbar = document.getElementById("navbar");
let article = document.getElementById("article");
let hampurilainen = document.getElementById("hampurilainen");

//luodaan muuttuja navbarin tyyleille käyttäen getcomputedstyle funktiota, joka ottaa huomioon myös mediaqueryt
let navbarTyyli = window.getComputedStyle(navbar, null);
//lisätään hampurilaiselle clcik event listener, joka kutsuu menu-funktiota
hampurilainen.addEventListener("click", menu);



function menu(){
    //jos navbar ei ole näkyvillä, tuodaan se näkyviin lisäämällä artikkelille ja navbarille classit jotka tuo ne näkyviin
    if (navbarTyyli.display === "none"){
        navbar.classList.remove("invisible")
        navbar.classList.add("visible")
        article.classList.add("twothirds")
        article.classList.remove("fullArticle")
    }
    //jos navbar on näkyvillä niin piilotetaan se 
    else{
        navbar.classList.remove("visible")
        navbar.classList.add("invisible")
        article.classList.remove("twothirds")
        article.classList.add("fullArticle")
    }
}

