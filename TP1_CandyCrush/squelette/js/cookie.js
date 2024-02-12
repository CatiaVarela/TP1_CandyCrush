/**
 * Sélectionne le cookie en mettant à jour son image et sa classe CSS.
 */
export default class Cookie {
  ligne=0;
  colone=0;
  type=0;
  htmlImage=undefined;

  static urlsImagesNormales = [
    "./assets/images/Croissant@2x.png",
    "./assets/images/Cupcake@2x.png",
    "./assets/images/Danish@2x.png",
    "./assets/images/Donut@2x.png",
    "./assets/images/Macaroon@2x.png",
    "./assets/images/SugarCookie@2x.png",
  ];
  static urlsImagesSurlignees = [
    "./assets/images/Croissant-Highlighted@2x.png",
    "./assets/images/Cupcake-Highlighted@2x.png",
    "./assets/images/Danish-Highlighted@2x.png",
    "./assets/images/Donut-Highlighted@2x.png",
    "./assets/images/Macaroon-Highlighted@2x.png",
    "./assets/images/SugarCookie-Highlighted@2x.png",
  ];

  /**
   * Crée une instance de Cookie.
   * @param {number} type - Le type du cookie.
   * @param {number} ligne - La ligne du cookie.
   * @param {number} colonne - La colonne du cookie.
   */
  constructor(type, ligne, colonne) {
    this.type = type;
    this.ligne = ligne;
    this.colonne = colonne;

    // On récupère l'URL de l'image correspondant au type
    // qui est un nombre entre 0 et 5
    const url = Cookie.urlsImagesNormales[type];

    // On crée une image HTML avec l'API du DOM
    let img = document.createElement("img");
    img.src = url;
    img.width = 80;
    img.height = 80;
    // pour pouvoir récupérer la ligne et la colonne
    // quand on cliquera sur une image et donc à partir
    // de cette ligne et colonne on pourra récupérer le cookie
    // On utilise la dataset API du DOM, qui permet de stocker
    // des données arbitraires dans un élément HTML
    img.dataset.ligne = ligne;
    img.dataset.colonne = colonne;

    // On stocke l'image dans l'objet cookie
    this.htmlImage = img;
  }

  /**
   * Sélectionne le cookie en mettant à jour son image et sa classe CSS.
   */
  selectionnee() {
    this.htmlImage.src = Cookie.urlsImagesSurlignees[this.type];
    this.htmlImage.classList.add("cookies-selected");
  }

  /**
   * Désélectionne le cookie en mettant à jour son image et sa classe CSS.
   */
  deselectionnee() {
    this.htmlImage.src = Cookie.urlsImagesNormales[this.type];
    this.htmlImage.classList.remove("cookies-selected");
  }

  /**
   * Met le cookie en alignement en mettant à jour son image et sa classe CSS.
   */
  alignee(){
    this.htmlImage.src = Cookie.urlsImagesNormales[this.type];
    this.htmlImage.classList.add("cookies-aligned");
  }

  /**
   * Met le cookie hors alignement en mettant à jour son image et sa classe CSS.
   */
  desalignee(){
    this.htmlImage.src = Cookie.urlsImagesNormales[this.type];
    this.htmlImage.classList.remove("cookies-aligned");
  }

  /**
   * Supprime le cookie en le retirant du DOM.
   */
  supprimer(){
    this.htmlImage.remove();
  }

  /**
   * Échange les cookies c1 et c2 en inversant leurs images et types.
   * @param {Cookie} c1 - Le premier cookie.
   * @param {Cookie} c2 - Le deuxième cookie.
   */
  static swapCookies(c1, c2) {
    // A FAIRE
    console.log("SWAP C1 C2");
     // On échange leurs images et types
    let c3 = c1.type;
    c1.type = c2.type;
    c2.type = c3;
   
    // et on remet les images correspondant au look
    // "désélectionné"
    c1.deselectionnee();
    c2.deselectionnee();
  }

  /**
   * Renvoie la distance entre deux cookies en termes de nombre de cases.
   * @param {Cookie} cookie1 - Le premier cookie.
   * @param {Cookie} cookie2 - Le deuxième cookie.
   * @returns {number} La distance entre les deux cookies.
   */
  static distance(cookie1, cookie2) {
    let l1 = cookie1.ligne;
    let c1 = cookie1.colonne;
    let l2 = cookie2.ligne;
    let c2 = cookie2.colonne;

    const distance = Math.sqrt((c2 - c1) * (c2 - c1) + (l2 - l1) * (l2 - l1));
    console.log("Distance = " + distance);
    return distance;
  }

  /**
   * Récupère la ligne et la colonne d'une image de cookie.
   * @param {HTMLImageElement} img - L'image du cookie.
   * @returns {Array} Un tableau contenant la ligne et la colonne de l'image.
   */
  static getLigneColonneFromImg(img) {
    return [img.dataset.ligne, img.dataset.colonne];
  }

}
