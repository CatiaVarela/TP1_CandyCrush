import Cookie from "./cookie.js";
import { create2DArray } from "./utils.js";

/* Classe principale du jeu, c'est une grille de cookies. Le jeu se joue comme
Candy Crush Saga etc... c'est un match-3 game... */
/**
 * Classe représentant une grille de jeu.
 */
export default class Grille {
  /**
   * Constructeur de la grille
   * @param {number} l nombre de lignes
   * @param {number} c nombre de colonnes
   */
  tabCookies = [];

  constructor(l, c) {
    this.c = c;
    this.l = l;
    this.cookiesCliquees = [];
    this.tabcookies = this.remplirTableauDeCookies(6)
  }

  /**
   * parcours la liste des divs de la grille et affiche les images des cookies
   * correspondant à chaque case. Au passage, à chaque image on va ajouter des
   * écouteurs de click et de drag'n'drop pour pouvoir interagir avec elles
   * et implémenter la logique du jeu.
   */
  showCookies() {
    let caseDivs = document.querySelectorAll("#grille div");

    caseDivs.forEach((div, index) => {
      // on calcule la ligne et la colonne de la case
      // index est le numéro de la case dans la grille
      // on sait que chaque ligne contient this.c colonnes
      // er this.l lignes
      // on peut en déduire la ligne et la colonne
      // par exemple si on a 9 cases par ligne et qu'on 
      // est à l'index 4
      // on est sur la ligne 0 (car 4/9 = 0) et 
      // la colonne 4 (car 4%9 = 4)
      let ligne = Math.floor(index / this.l);
      let colonne = index % this.c; 

      console.log("On remplit le div index=" + index + " l=" + ligne + " col=" + colonne);

      // on récupère le cookie correspondant à cette case
      let cookie = this.tabcookies[ligne][colonne];
      // on récupère l'image correspondante
      let img = cookie.htmlImage;
      
      img.onclick = (event) => {
        console.log("On a cliqué sur la ligne " + ligne + " et la colonne " + colonne);
        //let cookieCliquee = this.getCookieFromLC(ligne, colonne);
        console.log("Le cookie cliqué est de type " + cookie.type);
        // highlight + changer classe CSS
        if (!this.cookiesCliquees.includes(cookie)) {
          this.cookiesCliquees.push(cookie);
          cookie.selectionnee();
        }
        // A FAIRE : tester combien de cookies sont sélectionnées
        // si 0 on ajoute le cookie cliqué au tableau
        // si 1 on ajoute le cookie cliqué au tableau
        // et on essaie de swapper
        if (this.cookiesCliquees.length == 2) {
          let cookie1 = this.cookiesCliquees[0];
          let cookie2 = this.cookiesCliquees[1];
          if(Cookie.distance(cookie1,cookie2) == 1){
            Cookie.swapCookies(cookie1, cookie2);
          }
          cookie1.deselectionnee()
          cookie2.deselectionnee()
          this.cookiesCliquees=[];
          
        }
        
        this.detecterMatch3Lignes();
        this.detecterMatch3Colonnes();
        this.supprimerCookiesAlignes();
        this.descendreCookies();
        
    }

       // On met un écouteur de drag'n'drop sur l'image
       img.ondragstart = (evt) => {
        console.log("drag start");
        let imgClickee = evt.target;

      };
      img.ondragover = (evt) => {
        evt.preventDefault();
      };

      img.ondragenter = (evt) => {
        // pour un effet visuel quand on déplace l'image dragguée...
        evt.target.classList.add("grilleDragOver");
      };

      img.ondragleave = (evt) => {
        // quand on quitte le survol d'une zone de drop on remet
        // le background d'origine
        evt.target.classList.remove("grilleDragOver");
      };

      //On swap le cookie draggué avec le cookie droppé
      img.ondrop = (evt) => {
        if (!this.cookiesCliquees.includes(cookie)) {
          this.cookiesCliquees.push(cookie);

        if (this.cookiesCliquees.length == 2) {
          let cookie1 = this.cookiesCliquees[0];
          let cookie2 = this.cookiesCliquees[1];
          if(Cookie.distance(cookie1,cookie2) == 1){
            Cookie.swapCookies(cookie1, cookie2);
            this.cookiesCliquees=[];
            evt.target.classList.remove("grilleDragOver");
          }
        }
      }
      
      this.detecterMatch3Lignes();
        this.detecterMatch3Colonnes();
        this.supprimerCookiesAlignes();
        this.descendreCookies();
    }
    
    this.detecterMatch3Lignes();
    this.detecterMatch3Colonnes();
    this.supprimerCookiesAlignes();
    


    // on affiche l'image dans le div pour la faire apparaitre à l'écran.
    div.appendChild(img);

      
    });
    
  }

  getCookieFromLigneColonne(l, c) {
    return this.tabCookies[l][c];
  }
  
  /**
   * Initialisation du niveau de départ. Le paramètre est le nombre de cookies différents
   * dans la grille. 4 types (4 couleurs) = facile de trouver des possibilités de faire
   * des groupes de 3. 5 = niveau moyen, 6 = niveau difficile
   *
   * Améliorations : 1) s'assurer que dans la grille générée il n'y a pas déjà de groupes
   * de trois. 2) S'assurer qu'il y a au moins 1 possibilité de faire un groupe de 3 sinon
   * on a perdu d'entrée. 3) réfléchir à des stratégies pour générer des niveaux plus ou moins
   * difficiles.
   *
   * On verra plus tard pour les améliorations...
   */
  remplirTableauDeCookies(nbDeCookiesDifferents) {
    // créer un tableau vide de 9 cases pour une ligne
    // en JavaScript on ne sait pas créer de matrices
    // d'un coup. Pas de new tab[3][4] par exemple.
    // Il faut créer un tableau vide et ensuite remplir
    // chaque case avec un autre tableau vide
    // Faites ctrl-click sur la fonction create2DArray
    // pour voir comment elle fonctionne
    let tab = create2DArray(9);

    // remplir
    for(let l = 0; l < this.l; l++) {
      for(let c =0; c < this.c; c++) {

        // on génère un nombre aléatoire entre 0 et nbDeCookiesDifferents-1
        const type = Math.floor(Math.random()*nbDeCookiesDifferents);
        //console.log(type)
        tab[l][c] = new Cookie(type, l, c);
        
        
      }
    }
    return tab;
  }

  //On detecte si 3 cookies sont alignés en ligne dans la grille et changer le fond de l'image
  detecterMatch3Lignes(){
    let count = 0;
    let ligne = 0;
    let score = document.getElementById("score");
    for(let l = 0; l < this.l; l++) {
      for(let c =0; c < this.c-2; c++) {
        const cookie = this.tabcookies[l][c];
        const cookie1 = this.tabcookies[l][c+1]; 
        const cookie2 = this.tabcookies[l][c+2];
        if(cookie.type === cookie1.type && cookie1.type === cookie2.type){
          cookie1.alignee();
          cookie2.alignee();
          cookie.alignee();
          count++;
          ligne = l;
        } 
      }
    }score.innerHTML =  count;
    console.log(count+" Cookies alignés sur la ligne: "+ligne);
  }

  //On detecte si 3 cookies sont alignés en colonne en parcourant la grille
  detecterMatch3Colonnes(){
    let count = 0;
    let colonne = 0;
    
    for(let l = 0; l < this.l-2; l++) {
      for(let c =0; c < this.c; c++) {
        const cookie = this.tabcookies[l][c];
        const cookie1 = this.tabcookies[l+1][c]; 
        const cookie2 = this.tabcookies[l+2][c];
        if(cookie.type === cookie1.type && cookie1.type === cookie2.type){
          cookie1.alignee();
          cookie2.alignee();
          cookie.alignee();
          count++;
          colonne = c;
        }
      }
    }score.innerHTML = parseInt(score.innerHTML) + count;
    console.log(count+" Cookies alignés sur la colonne: "+colonne);
  }

  //On supprime les cookies alignés
  supprimerCookiesAlignes(){
    // Parcourir le tableau pour détecter un cookie et le supprimer
    for (let l = 0; l < this.l; l++) {
      for (let c = 0; c < this.c; c++) {
        let cookie = this.tabcookies[l][c];
        if (cookie.htmlImage.classList.contains("cookies-aligned")) {
          cookie.supprimer();
          //console.log("Cookie supprimé : ligne "+l+" colonne: "+c);
        }
        
      }
    }
}

descendreCookies() {
  // on recupere l'id grille et detecte si les divs qui sont dans le div sont vides
  let grille = document.getElementById("grille");
  let divs = grille.getElementsByTagName("div");
  let count = 0;
  for (let div of divs) {
    if (div.innerHTML === "") {
      count++;
    }
  }
  console.log(count+" cases vides");

  //Parcourir les divs vides et les remplir avec le cookie du dessus
  
  for (let i = 0; i < divs.length; i++) {
    if (divs[i].innerHTML === "" && i > 8) {
      divs[i].innerHTML = divs[i - 9].innerHTML;
      divs[i - 9].innerHTML = "";
    }

}
  
}

}


