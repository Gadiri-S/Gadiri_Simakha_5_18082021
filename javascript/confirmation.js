let orderId = localStorage.getItem('orderId')
let priceValidation = localStorage.getItem('total')
let ordr = document.getElementById("main-product")
let links = document.getElementsByTagName("a")

console.log(links)

ordr.innerHTML=`<h3> Thank you for your purchase</h3> <h3> The total amount of your order is :
${priceValidation}  euros</h3> <h3> Your order Id is :
${orderId} <h3> <a href="index.html"> 
Back to home page </a> </h3>`


