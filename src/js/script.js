const currency = function(number){
    return new Intl.NumberFormat('pt-BR', {style: 'currency',currency: 'BRL', minimumFractionDigits: 2}).format(number);
};

const ulProducts = document.getElementById('productsList')
const ulProductsCart = document.getElementById('productsCartList')
const buttonAll = document.getElementById('buttonAll')
const buttonHortifruti = document.getElementById('buttonHortifruiti')
const buttonPanificadora = document.getElementById('buttonPanificadora')
const buttonLaticinios = document.getElementById('buttonLaticinios')
const searchBar = document.getElementById('searchBar')
const searchButton = document.getElementById('searchButton')
const spanQuantity = document.getElementById('spanQuantity')
const spanPrice = document.getElementById('spanFullPrice')
const fullCart = document.getElementById('fullCart')
const emptyCart = document.getElementById('emptyCart')
const searchList = []
let count = 0
let fullValue = 0




function createCards(section = 'none') {
    for(let i = 0; i < produtos.length; i++){
        if(produtos[i].secao == section || section == 'none'){
            const liProductsCard = document.createElement('li')
            const imgCardProducts = document.createElement('img')
            const h3TitleCards = document.createElement('h3')
            const spanSectionCards = document.createElement('span')
            const olListComponents = document.createElement('ol')
            const keyWords = document.createElement('span')
            keyWords.innerText = (produtos[i].nome + produtos[i].secao)
            keyWords.style.display = 'none'
            
            imgCardProducts.src = produtos[i].img
            h3TitleCards.innerText = produtos[i].nome
            spanSectionCards.innerText = produtos[i].secao
            liProductsCard.classList.add('search')
            
            for(let y = 0; y < produtos[i].componentes.length; y++){
                const liComponents = document.createElement('li')
                liComponents.innerText = produtos[i].componentes[y]
                olListComponents.appendChild(liComponents)
            }

            const divPriceCard = document.createElement('div')
            const pPriceCard = document.createElement('p')
            const buttonBuyCard = document.createElement('button')
            const value = produtos[i].preco
            
            buttonBuyCard.innerText = 'Comprar'
            pPriceCard.innerText = currency(produtos[i].preco)
            divPriceCard.append(pPriceCard, buttonBuyCard)
            liProductsCard.append(keyWords, imgCardProducts, h3TitleCards, spanSectionCards, olListComponents, divPriceCard)
            ulProducts.appendChild(liProductsCard)

            

            buttonBuyCard.addEventListener('click', function(){
                count += 1
                fullValue = fullValue + value

                const liCart = document.createElement('li')
                liCart.classList.add('search')
                const divCart = document.createElement('div')
                const imgCart = document.createElement('img')
                const divCartInternal = document.createElement('div')
                const h3Cart = document.createElement('h3')
                const spanCart = document.createElement('span')
                const pCartPrice = document.createElement('p')
                const buttonCartTrash = document.createElement('button')
                const imgCartTrash = document.createElement('img')

                imgCart.src = imgCardProducts.src
                h3Cart.innerText = h3TitleCards.innerText
                spanCart.innerText = spanSectionCards.innerText
                pCartPrice.innerText = pPriceCard.innerText
                spanQuantity.innerText = count
                spanPrice.innerText = currency(fullValue)


                imgCartTrash.src = "./src/img/trash.png"
                buttonCartTrash.appendChild(imgCartTrash)
                divCartInternal.append(h3Cart, spanCart, pCartPrice)
                divCart.append(imgCart,divCartInternal)
                liCart.append(divCart, buttonCartTrash)
                ulProductsCart.appendChild(liCart)

                fullCart.style.display = "flex"
                emptyCart.style.display = "none"

                buttonCartTrash.onclick = function(){
                    count--
                    fullValue = fullValue - value

                    spanQuantity.innerText = count
                    spanPrice.innerText = currency(fullValue)
                    liCart.remove()
                    if(count == 0){
                        fullCart.style.display = "none"
                        emptyCart.style.display = "block"
                    }
                }
            })
        }
    }
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

const listaaa = document.querySelector('.products__list')

searchBar.addEventListener('keyup', function(e){
    let term = e.target.value.toLowerCase()
    const products = listaaa.getElementsByClassName('search')

    Array.from(products).forEach(function(x){
        const name = x.firstElementChild.innerText
        if(name.toLowerCase().indexOf(term) != -1){
            x.style.display = 'block'
        }else{
            x.style.display = 'none'
        }
    })
})
