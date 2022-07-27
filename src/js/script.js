const currency = function(number){
    return new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2}).format(number);
};

const ulProducts = document.getElementById('listaProdutos')
const spanSoma = document.getElementById('somaValores')
const buttonAll = document.getElementById('buttonAll')
const buttonHortifruti = document.getElementById('buttonHortifruti')
const buttonPanificadora = document.getElementById('buttonPanificadora')
const buttonLaticinios = document.getElementById('buttonLaticinios')
const searchBar = document.getElementById('searchBar')
const searchButton = document.getElementById('searchButton')


function createCards(section = 'none') {
    let sum = 0
    for(i in produtos){
        if(produtos[i].secao == section || section == 'none'){
            const keyWords = document.createElement('span')
            keyWords.innerText = (produtos[i].nome + produtos[i].secao)
            keyWords.style.display = 'none'

            const liProducts = document.createElement('li')
            ulProducts.appendChild(liProducts)
        
            const h3Products = document.createElement('h3')
            h3Products.innerText = produtos[i].nome
        
            const imgProducts = document.createElement('img')
            imgProducts.src = produtos[i].img
           
            const spanProducts = document.createElement('span')
            spanProducts.innerText = produtos[i].secao
            
            const pProdutos = document.createElement('p')
            pProdutos.innerText = currency(produtos[i].preco)
        
            liProducts.append(keyWords, imgProducts, h3Products, spanProducts, pProdutos)
    
            sum = sum + produtos[i].preco
        }
    }
    spanSoma.innerText = ''
    spanSoma.innerText = currency(sum)
}

createCards()

buttonAll.addEventListener('click', function(){
    ulProducts.innerHTML = ''
    createCards()
})

buttonHortifruti.addEventListener('click', function() {
    ulProducts.innerHTML = ''
    createCards('Hortifruti')
})

buttonPanificadora.addEventListener('click', function() {
    ulProducts.innerHTML = ''
    createCards('Panificadora')
})

buttonLaticinios.addEventListener('click', function() {
    ulProducts.innerHTML = ''
    createCards('Laticínios')
})

const list = document.querySelector('.ulCards')

searchBar.addEventListener('keyup', function(e){
    let term = e.target.value.toLowerCase()
    const products = list.getElementsByTagName('li')
    
    Array.from(products).forEach(function(product){
        const name = product.firstElementChild.textContent
        if(name.toLowerCase().indexOf(term) != -1){
            product.style.display = 'block'
        }else{
            product.style.display = 'none'
        }
    })
})

