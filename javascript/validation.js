// Objectif : valider le formulaire et envoyer l'object contact et l'array order au backend

const inputs = document.querySelectorAll("input");
const form = document.getElementById("form")
const btn = document.getElementById('btn');

maino();

function maino(){
    listen();
    check();

    
}
//On crée les REGEX pour s'assurer que le formulaire sera bien rempli 


const patterns = {
   firstName: /^[a-z]{2,}$/i, //Alphabétique et au moins 2 lettres, pas case sensitive
   lastName : /^[a-z]{2,}$/i, //Alphabétique et au moins 2 lettres, pas case sensitive
   city : /^[a-z]+(?:[\s-][a-z]+)*$/i, //Alphabétique et au moins 2 lettres, pas case sensitive
   address : /^[0-9]{1,} [a-z]{2,} [a-z]{2,}$/i, //Au moins 1 chiffre puis au moins deux fois 2 chaines de caractères 
   email : /^([a-z\d\.\_\-]+)@([a-z]+)\.[a-z]{2,8}$/i //Alphanumérique avec ._- puis @ puis alphabétique puis . puis alphabétique
    
  
};


// On vérifie les regex. Si vrai, on attribue la classe valid au champ input, sinon on attribue la classe invalid. 
//Le bouton order reçoit une classe "btn" si valide et s'affiche, sinon si un des champs est invalide, le bouton devient invisible
function validation (field, regex){ 
if(regex.test(field.value)){
field.className='valid'; 
btn.className='btn';

}else {
    field.className='invalid'; 
    btn.className="hide"
} 
}





//On vérifie les informations entrées dans les champs

function listen(){

inputs.forEach((input) => {
input.addEventListener('keyup',(e)=> {
   validation(e.target,patterns[e.target.attributes.name.value]);



   //On empêche l'utilisateur de soumettre le formulaire en appuyant sur la touche entrée
   window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);

});

});}

//////////////////////////////////////////
function check(){
    btn.addEventListener("click", (event)=>{
    event.preventDefault(); // Pas réactualiser la page
    window.addEventListener('keydown',function(e){if(e.keyIdentifier=='U+000A'||e.keyIdentifier=='Enter'||e.keyCode==13){if(e.target.nodeName=='INPUT'&&e.target.type=='text'){e.preventDefault();return false;}}},true);

    if (
      !firstName.value ||
      !lastName.value ||
      !address.value ||
      !city.value ||
      !email.value 
     
    ) {
      console.log("ERREUR");
      event.preventDefault();
    } else {




      for (let i = 0; i < productInLocalStorage.length; i++) {

        const idProduct = productInLocalStorage[i].idProduct;
        
     
  
      


    let products = [];
    products.push(idProduct);

    const order = {
        contact: {
            firstName: form[0].value,
            lastName: form[1].value,
            email:  form[2].value,
            address: form[3].value,
            city: form[4].value,

        },
        products: products,
      };

      console.log(order)    
      // -------  Envoi de la requête POST au back-end --------
      // Création de l'entête de la requête
    
      // Préparation du prix formaté pour l'afficher sur la prochaine page
      let priceValidation = finalPrice;
      
    
      // Envoie de la requête avec l'en-tête. On changera de page avec un localStorage qui ne contiendra plus que l'order id et le prix.
      fetch(`http://localhost:3000/api/cameras/order`,
      {
        method: "POST",
        headers: {
            'Accept': 'application/json', 
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(order)
    })
        .then((res) => res.json()) 
        .then((order) => {


          localStorage.clear();

          orderId = order.orderId;

          localStorage.setItem("orderId", order.orderId);
         localStorage.setItem("total", priceValidation);
          
         console.log(orderId)

           
          //  On peut commenter cette ligne pour vérifier le statut 201 de la requête fetch. Le fait de préciser la destination du lien ici et non dans la balise <a> du HTML permet d'avoir le temps de placer les éléments comme l'orderId dans le localStorage avant le changement de page.
          document.location.href = "validation.html";

        })
        .catch((err) => {
          console.log(err);
        })
        
    
    }   
  }}
    )
    
    
    }
       

/*
    for (let i = 0; i < form.length-1; i++) {
           

      
      ///////////////////////////////////////////////// LOCAL STORAGE /////////////////////////////////////////

        
 
      let fubar = {
      firstName :form[0].value,
      lastName : form[1].value,
      email : form[2].value,
      address : form[3].value,
      city : form[4].value

  }
  
      let formLocalStorage = JSON.parse(localStorage.getItem("contact"));        

      if(formLocalStorage){
          formLocalStorage.push(fubar);
          localStorage.setItem("contact", JSON.stringify(formLocalStorage));}
      else{
  (formLocalStorage)
  formLocalStorage = [];
  formLocalStorage.push(fubar);
  localStorage.setItem("contact", JSON.stringify(formLocalStorage));


  
  
  ;}
  
}    */