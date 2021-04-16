
document.getElementsByClassName('cart-button')[0].addEventListener('click',
showCart)

document.getElementsByClassName('cart-control')[0].addEventListener('click',
hideCart)


var addToCartElement = document.getElementsByClassName('add-to-cart')
for(let i=0; i<addToCartElement.length; i++){
    let button = addToCartElement[i]
    button.addEventListener('click', addAndRemoveFromCart)
}


function addAndRemoveFromCart(event){
    let addToCartBtn = event.target
 
    if (addToCartBtn.innerText == 'Add To Cart'){
        addToCartBtn.innerText = 'Remove From Cart'

        let shopItem = addToCartBtn.parentElement.parentElement
        let itemTitle = shopItem.getElementsByClassName('item-title')[0].innerText
        let itemPrice = shopItem.firstElementChild.getElementsByClassName('price')[0].innerHTML 
        
        addItemToCart(itemTitle, itemPrice)
        
        updateCartTotal()

        }else  if(addToCartBtn.innerText = 'Remove From Cart'){

            addToCartBtn.innerText = 'Add To Cart'

            let itemTitle = addToCartBtn.parentElement.parentElement.getElementsByClassName('item-title')[0].innerText
            let shopAndCart = addToCartBtn.parentElement.parentElement.parentElement.parentElement
            let itemsOnCartTitle = shopAndCart.getElementsByClassName('yes')
            let itemOnOrderSummary = shopAndCart.getElementsByClassName('yeso')
            

           removeFromCart(itemTitle, itemsOnCartTitle, itemOnOrderSummary)
            updateCartTotal()
               
        }      
    }


function addItemToCart(itemTitle, itemPrice){
    let cartRow = document.createElement('tr')
    let orderRow = document.createElement('tr')

    cartRow.classList.add('fkrow')
    orderRow.classList.add('order-list') 

    let cartItems = document.getElementsByClassName('table-row')[0]
    let orderList = document.getElementsByClassName('order-row')[0]
    
    let cartRowContents = `
        <td></td>
        <td class='yes'>${itemTitle}</td>
        <td class='item-price-cart'>${itemPrice}</td>
        <td>
            <button id="quantity">-</button> 
                <input type="number" value="1">  
            <button id="quantity">+</button>
        </td>
        <td>
            <button>
                Remove
            </button>
        </td>
        `

    let orderSumContent = `
        <td></td>
        <td class='yeso'>${itemTitle}</td>
        <td><input type="number" value="1" class='numbers' style="border: none" disabled> </td>
    `
   
    cartRow.innerHTML = cartRowContents
    orderRow.innerHTML = orderSumContent
    
    cartRow.children[3].firstElementChild.classList.add('quantity-decrement')
    cartRow.children[3].lastElementChild.classList.add('quantity-increment')
    cartRow.lastElementChild.firstElementChild.classList.add('remove-item')
    cartRow.children[3].children[1].classList.add('number')
    cartRow.children[0].classList.add('sn')

    cartItems.append(cartRow)
    orderList.append(orderRow)


    var quantityDecrements = document.getElementsByClassName('quantity-decrement')
    for (let i=0; i<quantityDecrements.length; i++){
        let decreaseBtn = quantityDecrements[i]
        decreaseBtn.addEventListener('click', decreaseQuantity)
    }

    var quantityIncrements = document.getElementsByClassName('quantity-increment')
    for (let i=0; i<quantityIncrements.length; i++){
        let increaseBtn = quantityIncrements[i]
        increaseBtn.addEventListener('click', increaseQuantity)
    }

    var removeCartItemBtn = document.getElementsByClassName('remove-item')
    for( let i=0; i<removeCartItemBtn.length; i++){
        let removeButton = removeCartItemBtn[i]
        removeButton.addEventListener('click', removeItemInCart) 
    }


    var quantityInputs = document.getElementsByClassName('number')
    for( let i=0; i<quantityInputs.length; i++){
        let input = quantityInputs[i]
        input.addEventListener('onchange', quantityChanged)
    }

        totalCartItem()
        
    }


function removeFromCart(itemTitle, itemsOnCartTitle, itemOnOrderSummary){
    
    for (let i=0; i<itemsOnCartTitle.length; i++){
        removingItems = itemsOnCartTitle[i]  
        if (removingItems.innerText == itemTitle){
                removeItem = itemsOnCartTitle[i]
                removeItem.parentElement.remove()
                break;               
        }
    } 

    for (let i=0; i<itemOnOrderSummary.length; i++){
        removeFromOrderSummary = itemOnOrderSummary[i]     
        if (removeFromOrderSummary.innerText == itemTitle){
                removeItem = itemOnOrderSummary[i]
                removeItem.parentElement.remove()
                break;               
        }
    }

    totalCartItem()
    updateCartTotal() 
}
    

 
function removeItemInCart(event){
    let removeBtnClicked = event.target
   
    itemRowInCart = removeBtnClicked.parentElement.parentElement.getElementsByClassName('yes')[0]
    itemInOrderSummary = removeBtnClicked.parentElement.parentElement.parentElement.parentElement.parentElement
    .parentElement.parentElement.parentElement.parentElement.getElementsByClassName('yeso')[0]

  
   
    itemsInShop = removeBtnClicked.parentElement.parentElement.parentElement.parentElement.
    parentElement.parentElement.parentElement.parentElement.getElementsByClassName('item-title')

    for(let i=0; i<itemsInShop.length; i++){
        itemInShopTitles = itemsInShop[i].innerText    
        if (itemInShopTitles == itemRowInCart.innerText){        
            itemsInShop[i].parentElement.getElementsByClassName('add-to-cart')[0].innerText ='Add To Cart'
           itemRowInCart.parentElement.remove()
        }
    }


    for(let i=0; i<itemsInShop.length; i++){
        itemInShopTitles = itemsInShop[i].innerText    
        if (itemInShopTitles == itemInOrderSummary.innerText){        
            itemInOrderSummary.parentElement.remove()
        }
    }

    totalCartItem()
    updateCartTotal()
}
 

function decreaseQuantity(event){
    let decreaseBtn = event.target
    staticCount = decreaseBtn.parentElement.getElementsByClassName('number')[0].value
    count = parseInt(staticCount)
    count = count - 1
    if (count <= 0) {
        alert("qunatity can not be less than one") 
        count = 1
        return
    }
    
    decreaseBtn.parentElement.getElementsByClassName('number')[0].value = count
    updateCartTotal()
    orderSummary() 
}



function increaseQuantity(event){
    let increaseBtn = event.target
    let found; 
    staticCount = increaseBtn.parentElement.getElementsByClassName('number')[0].value
    testing = increaseBtn.parentElement.parentElement.getElementsByClassName('yes')[0].innerText
    
    orderItemSummaryQuantity = increaseBtn.parentElement.parentElement.parentElement.parentElement.parentElement
    .parentElement.parentElement.parentElement.parentElement.getElementsByClassName('yeso')

    count = parseInt(staticCount)
    count = count + 1
    
    increaseBtn.parentElement.getElementsByClassName('number')[0].value = count

    for (let i=0; i<orderItemSummaryQuantity.length; i++){
        orderItemSummaryQuantity[i].innerText
        if (orderItemSummaryQuantity[i].innerText == testing){
            found = orderItemSummaryQuantity[i].parentElement.getElementsByClassName('numbers')[0]
            found.value = count
         }
    }
    updateCartTotal()
}


let continueShoppingBtn = document.getElementById('continue-shopping')
continueShoppingBtn.addEventListener('click', hideCart)


function updateCartTotal(){
    let cartItemCont = document.getElementsByClassName('table-row')[0]
    let cartRows = cartItemCont.getElementsByClassName('fkrow')
    let total = 0
    let quanti = 0
    for (let i = 0; i<cartRows.length; i++){
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('item-price-cart')[0]
        let quantityElement = cartRow.getElementsByClassName('number')[0]
        let price = parseFloat(priceElement.innerText.replace('\u20A6 ', ''))
        let quantity = parseInt(quantityElement.value)
        total = total + (price * quantity)
        quanti = quanti + quantity
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total')[0].value = total
}


function quantityChanged(event){
    let inputChanged = event.target
    console.log(inputChanged.value)
    if (isNaN(inputChanged.value) || inputChanged.value <= 0){
        inputChanged.value = 1
    }
   
    updateCartTotal()
}



function totalCartItem(){
    var noOfItemInCart = document.getElementsByClassName('fkrow')
    document.getElementsByClassName('cart-item-total')[0].innerHTML = noOfItemInCart.length
}


/* Validation of UserName*/
let username = document.getElementById('name')
username.addEventListener('blur', usernameValidation)

function usernameValidation(event){
    usernameInput = event.target
    let nameError = document.getElementById('name-error') 
    let regName = /^^[ a-zA-Z\-\’]+$/
    

    if (usernameInput.value == ""){
        usernameInput.style.borderColor = 'red'
        nameError.style.visibility = 'visible'
        nameError.innerHTML = "Enter your full name"

    }else if (!regName.test(usernameInput.value)){
        usernameInput.style.borderColor = 'red'
        nameError.style.visibility = 'visible'
        nameError.innerHTML = "Enter a valid name"

    }else {
        usernameInput.style.borderColor = 'green'
        nameError.style.visibility = 'hidden'       
    }
}


/* Validation of Email*/
let email = document.getElementById('email')
email.addEventListener('blur', emailValidation)

function emailValidation(event){
    emailInput = event.target
    emailError = document.getElementById('email-error')
    mailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/


    if (emailInput.value == ""){
        emailInput.style.borderColor = 'red'
        emailError.style.visibility = 'visible'
        emailError.innerText = 'Enter your email'

    }else if (!mailFormat.test(emailInput.value)){
        emailInput.style.borderColor = 'red'
        emailError.style.visibility = 'visible'
        emailError.innerHTML = "Enter a valid email address"
    }else {
        emailInput.style.borderColor = 'green'
        emailError.style.visibility = 'hidden'
    }
}


/* Validation of Phone Number*/
let phoneNumber = document.getElementById('phone-number')
phoneNumber.addEventListener('blur', phoneNumberValidation)

function phoneNumberValidation(event){
    phoneNumberInput = event.target
    phoneNumberError = document.getElementById('phone-number-error')
    phoneReg = /^[\+]?[(]?[0-9]{4}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/

    if (phoneNumberInput.value == ""){
        phoneNumberInput.style.borderColor = 'red'
        phoneNumberError.style.visibility = 'visible'
        phoneNumberError.innerText = 'Enter your phone number'

    }else if (!phoneReg.test(phoneNumberInput.value)){
        phoneNumberInput.style.borderColor = 'red'
        phoneNumberError.style.visibility = 'visible'
        phoneNumberError.innerText = "Enter a valid phone number"

    }else {
        phoneNumberInput.style.borderColor = 'green'
        phoneNumberError.style.visibility = 'hidden'
    }
}


function showCart(){
    var showAndHide = document.getElementsByClassName('cart-section')[0]
    showAndHide.classList.add('open')
}

function hideCart(){
    var showAndHide = document.getElementsByClassName('cart-section')[0]
    showAndHide.classList.remove('open')
}


function nameVal(){
    let username = document.getElementById('name')
    let nameError = document.getElementById('name-error') 

    if (username.value == ''){
        username.style.borderColor = 'red'
        nameError.innerText = 'Enter your full name' 
        return
    }   
}


function emailVal(){
    let email = document.getElementById('email')
    let emailError = document.getElementById('email-error')

    if (email.value == ''){
        email.style.borderColor = 'red'
        emailError.innerText = 'Enter your email address' 
        return 
    }
}


function phoneVal(){
    let phoneNumber = document.getElementById('phone-number')
    let phoneNumberError = document.getElementById('phone-number-error')

    if(phoneNumber.value == ''){
        phoneNumber.style.borderColor = 'red'
        phoneNumberError.innerText = 'Please enter your phone number'
        return
    }
}

var checkoutBtn = document.getElementById('paymentForm');
checkoutBtn.addEventListener('submit', checkout);


function checkout(event){
    event.preventDefault()
    var noOfItemInCart = document.getElementsByClassName('fkrow')

    let username = document.getElementById('name')
    let nameError = document.getElementById('name-error') 

    let email = document.getElementById('email')
    let emailError = document.getElementById('email-error')

    let phoneNumber = document.getElementById('phone-number')
    let phoneNumberError = document.getElementById('phone-number-error')


    if (noOfItemInCart.length == 0){
        alert('Please select your item/s')
        return
    }else if (username.value == ''){
        username.style.borderColor = 'red'
        nameError.innerText = 'Enter your full name' 
        return
    }else if (email.value == ''){
        email.style.borderColor = 'red'
        emailError.innerText = 'Enter your email address' 
        return 
    }else if(phoneNumber.value == ''){
        phoneNumber.style.borderColor = 'red'
        phoneNumberError.innerText = 'Please enter your phone number'
        return
    }

    payWithPaystack()
    hideCart();
}


function showOrderSummary(){
    var showOrderSummaryTable = document.getElementsByClassName('order-summary')[0]
    showOrderSummaryTable.classList.add('open-summary')
    

    var noOfItemInCart = document.getElementsByClassName('fkrow')
    if (noOfItemInCart.length == 0){
        alert('Please select your item/s')
        return
    }

    let buyerName = document.getElementById('name').value
    document.getElementById('buyer').innerText = buyerName

}

var okBtn =  document.getElementById('hide-summary')
okBtn.addEventListener('click', hideOrderSummary)


function hideOrderSummary(){
    var hideOrderSummaryTable = document.getElementsByClassName('order-summary')[0]
    hideOrderSummaryTable.classList.remove('open-summary')

    location.reload();
    return false;
}


function payWithPaystack(event) {
    var handler = PaystackPop.setup({
    key: 'pk_test_0c79ecdd22d49ecb9a32b7f2d558debab7d7c42f', // Replace with your public key
    email: document.getElementById('email').value,
    amount: document.getElementById('total').value * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
    currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
    ref: ''+Math.floor((Math.random() *1000000000) +1), // Replace with a reference you generated
    callback: function(response) {
        showOrderSummary()
    },
    onClose: function() {
        alert('Transaction was not completed, window closed.');
    },
    });
    handler.openIframe();
}

 
