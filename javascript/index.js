// Objectif : Récupérer l'ensemble des articles dans l'API et les afficher sur la page principale 

const mainHTML = document.getElementById("main");



// Dernière étape // 

main() // La fonction est appellée 

async function main() {  //La fonction doit être asynchrone car on doit attendre que la promesse soit resolue 

    const articles = await getArticle() // On attend que les articles soient récupérés 

    for (article of articles) { // Boucle for pour récupérer chaque article du tableau articles
        displayArticle(article) // Chaque article est affiché individuellement



    }


}


// Première étape : Récupérer l'API et s'assurer que tout fonctionne en loggant les informations dans la console//



function getArticle() { // Tout d'abord on doit récupérer l'API et afficher tous les articles dans la console

    return fetch(`http://localhost:3000/api/cameras`)
        .then(
            function (res) {
                if (res.ok) {
                    return res.json()// On peut vérifier à ce niveau si tout se passe bien en réalisant un console.log
                }
            }
        ).then(

            function (articles) {
                console.log(articles)

                return articles      // On retourne articles car on devra par la suite itéré à l'intérieur pour récupérer tous nos articles individuellement 
            }


        ).catch((error) => {
            console.log(error)
            mainHTML.innerHTML += " <div class='error'><h2> Impossible de récupérer les données. Vérifiez bien que le serveur ait été lancé</h2><br><h2>Si l'erreur presiste merci de bien vouloir nous contacter</h2></div>"
        })

}


//Deuxième étape : On crée une fonction displayAricle pour afficher chaque article individuellement// 

function displayArticle() {

    //On crée directement dans le DOM les classes, ID et div dans lesquels on va afficher nos articles

    const link = "product.html" + `?id=${article._id}`

    mainHTML.innerHTML += `<div class="article">    
    
    <a href=${link}>

    <span class="img"> <img class=img src="${article.imageUrl}"/></span>
    
    <div class="container">
    <span id=name>Model: ${article.name}</span><br>
    <span id=price>Price: ${article.price / 100} euros</span>
    
    </div>
    </a>
    </div>`
}


