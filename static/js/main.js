/* Declaring Global Variables*/

//Global variable declaration
let regName = /^^[ a-zA-Z\-\’]+$/
let emailFormat = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
let phoneReg = /^[\+]?[(]?[0-9]{4}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4}$/



// Global variable function for updating the cart amount
function updateCartTotal(){
    let cartItemCont = document.getElementsByClassName('table-row')[0]
    let cartRows = cartItemCont.getElementsByClassName('cart-item-row')
    let total = 0
    let quantities = 0
    for (let i = 0; i<cartRows.length; i++){
        let cartRow = cartRows[i]
        let priceElement = cartRow.getElementsByClassName('item-price-cart')[0]
        let quantityElement = cartRow.getElementsByClassName('number')[0]
        let price = parseFloat(priceElement.innerText.replace('\u20A6 ', ''))
        let quantity = parseInt(quantityElement.value)
        total = total + (price * quantity)
        quantities = quantities + quantity
    }
    total = Math.round(total * 100) / 100
    document.getElementsByClassName('total')[0].value = total
}


//Global variable function for number of items in the cart
function totalCartItem(){
    var noOfItemInCart = document.getElementsByClassName('cart-item-row')
    document.getElementsByClassName('cart-item-total')[0].innerHTML = noOfItemInCart.length
}


// Varriable function for adding item into cart
function addItemToCart(itemTitle, itemPrice){
    let cartRow = document.createElement('tr')
    let orderRow = document.createElement('tr')

    cartRow.classList.add('cart-item-row')
    orderRow.classList.add('order-list') 

    let cartItems = document.getElementsByClassName('table-row')[0]
    let orderList = document.getElementsByClassName('order-row')[0]
    
    let cartRowContents = `
        <td></td>
        <td class='cart-item-name'>${itemTitle}</td>
        <td class='item-price-cart'>${itemPrice}</td>
        <td>
            <button id="quantity">-</button> 
                <input type="number" value="1" disabled>  
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
        <td class='order-item-name'>${itemTitle}</td>
        <td><input type="number" value="1" class='numbers' disabled> </td>
    `
   
    cartRow.innerHTML = cartRowContents
    orderRow.innerHTML = orderSumContent
    
    cartRow.children[3].firstElementChild.classList.add('quantity-decrement')
    cartRow.children[3].lastElementChild.classList.add('quantity-increment')
    cartRow.lastElementChild.firstElementChild.classList.add('remove-item')
    cartRow.children[3].children[1].classList.add('number')
    cartRow.children[0].classList.add('sn')

    orderRow.children[2].children[0].classList.add('order-quantity')

    cartItems.append(cartRow)
    orderList.append(orderRow)

    //Event listener for getting the decrement button for item in the cart
    var quantityDecrements = document.getElementsByClassName('quantity-decrement')
    for (let i=0; i<quantityDecrements.length; i++){
        let decreaseBtn = quantityDecrements[i]
        decreaseBtn.addEventListener('click', decreaseQuantity)
    }

    //Event listener for getting the increment button for item in the cart
    var quantityIncrements = document.getElementsByClassName('quantity-increment')
    for (let i=0; i<quantityIncrements.length; i++){
        let increaseBtn = quantityIncrements[i]
        increaseBtn.addEventListener('click', increaseQuantity)
    }
    
    // Event listener for removing item from the cart
    var removeCartItemBtn = document.getElementsByClassName('remove-item')
    for( let i=0; i<removeCartItemBtn.length; i++){
        let removeButton = removeCartItemBtn[i]
        removeButton.addEventListener('click', removeItemInCart) 
    }

    totalCartItem()
       
    }


// Variable function for removing item from the cart 
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


// Variable function for removing item from the cart
function removeItemInCart(event){
    let removeBtnClicked = event.target
   
    itemRowInCart = removeBtnClicked.parentElement.parentElement.getElementsByClassName('cart-item-name')[0]
    itemInOrderSummary = removeBtnClicked.parentElement.parentElement.parentElement.parentElement.parentElement
    .parentElement.parentElement.parentElement.parentElement.getElementsByClassName('order-item-name')[0]
   
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


// Order Summary Function
function showOrderSummary(){
    var showOrderSummaryTable = document.getElementsByClassName('order-summary')[0]
    showOrderSummaryTable.classList.add('open-summary')
    

    var noOfItemInCart = document.getElementsByClassName('cart-item-row')
    if (noOfItemInCart.length == 0){
        alert('Please select your item/s')
        return
    }

    let buyerName = document.getElementById('name').value
    document.getElementById('buyer').innerText = buyerName
}


//Decrement button function
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


//Increment button function 
function increaseQuantity(event){
    let increaseBtn = event.target
    let quantityInCart; 
    staticCount = increaseBtn.parentElement.getElementsByClassName('number')[0].value
    testing = increaseBtn.parentElement.parentElement.getElementsByClassName('cart-item-name')[0].innerText
    
    orderItemSummaryQuantity = increaseBtn.parentElement.parentElement.parentElement.parentElement.parentElement
    .parentElement.parentElement.parentElement.parentElement.getElementsByClassName('order-item-name')

    count = parseInt(staticCount)
    count = count + 1
    
    increaseBtn.parentElement.getElementsByClassName('number')[0].value = count

    for (let i=0; i<orderItemSummaryQuantity.length; i++){
        orderItemSummaryQuantity[i].innerText
        if (orderItemSummaryQuantity[i].innerText == testing){
            quantityInCart = orderItemSummaryQuantity[i].parentElement.getElementsByClassName('numbers')[0]
            quantityInCart.value = count
         }
    }
    updateCartTotal()
}


/* Event listener for adding and removing from the cart item.*/

// Get the add to cart or remove from cart button on click
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
            let itemsOnCartTitle = shopAndCart.getElementsByClassName('cart-item-name')
            let itemOnOrderSummary = shopAndCart.getElementsByClassName('order-item-name')
            

            removeFromCart(itemTitle, itemsOnCartTitle, itemOnOrderSummary)
            updateCartTotal()
               
        }      
    }

//Event listener for continue shopping button
let continueShoppingBtn = document.getElementById('continue-shopping')
continueShoppingBtn.addEventListener('click', hideCart)



/* Validation of Customer in the cart*/

//Customer's name Validation
let username = document.getElementById('name')
username.addEventListener('blur', usernameValidation)

function usernameValidation(event){
    usernameInput = event.target
    let nameError = document.getElementById('name-error') 
    

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


// Customer's email validation
let email = document.getElementById('email')
email.addEventListener('blur', emailValidation)

function emailValidation(event){
    emailInput = event.target
    emailError = document.getElementById('email-error')

    // check if the email input box is empty
    if (emailInput.value == ""){
        emailInput.style.borderColor = 'red'
        emailError.style.visibility = 'visible'
        emailError.innerText = 'Enter your email'
    
    //check if email is in the correct email format
    }else if (!emailFormat.test(emailInput.value)){
        emailInput.style.borderColor = 'red'
        emailError.style.visibility = 'visible'
        emailError.innerHTML = "Enter a valid email address"

    //Display a green color around the input element if email is not empty and matches email format
    }else {
        emailInput.style.borderColor = 'green'
        emailError.style.visibility = 'hidden'
    }
}


// Customer's phone number valiadation
let phoneNumber = document.getElementById('phone-number')
phoneNumber.addEventListener('blur', phoneNumberValidation)

function phoneNumberValidation(event){
    phoneNumberInput = event.target
    phoneNumberError = document.getElementById('phone-number-error')

    // check if phone number input box is not empty
    if (phoneNumberInput.value == ""){
        phoneNumberInput.style.borderColor = 'red'
        phoneNumberError.style.visibility = 'visible'
        phoneNumberError.innerText = 'Enter your phone number'

    // check if phone number matches the correct pattern
    }else if (!phoneReg.test(phoneNumberInput.value)){
        phoneNumberInput.style.borderColor = 'red'
        phoneNumberError.style.visibility = 'visible'
        phoneNumberError.innerText = "Enter a valid phone number"
    
    //Display a green color border around the phone input if phone number matches the correct pattern
    }else {
        phoneNumberInput.style.borderColor = 'green'
        phoneNumberError.style.visibility = 'hidden'
    }
}


//Show cart item
function showCart(){
    var showAndHide = document.getElementsByClassName('cart-section')[0]
    showAndHide.classList.add('open')
}

//Hide cart item
function hideCart(){
    var showAndHide = document.getElementsByClassName('cart-section')[0]
    showAndHide.classList.remove('open')
}


/* Event listener for showing and hiding cart items */
document.getElementsByClassName('cart-button')[0].addEventListener('click',
showCart)

document.getElementsByClassName('cart-control')[0].addEventListener('click',
hideCart)


//check customer's phone number on checking out
function phoneVal(){
    let phoneNumber = document.getElementById('phone-number')
    let phoneNumberError = document.getElementById('phone-number-error')

    // check if customer's phone number is filled in
    if(phoneNumber.value == ''){
        phoneNumber.style.borderColor = 'red'
        phoneNumberError.innerText = 'Please enter your phone number'
        return
    }
}

//Processing Payment with Paystack
function payWithPaystack() {
    var handler = PaystackPop.setup({
    key: 'pk_test_0c79ecdd22d49ecb9a32b7f2d558debab7d7c42f', // Replace with your public key
    email: document.getElementById('email').value,
    amount: document.getElementById('total').value * 100, // the amount value is multiplied by 100 to convert to the lowest currency unit
    currency: 'NGN', // Use GHS for Ghana Cedis or USD for US Dollars
    ref: ''+Math.floor((Math.random() *1000000000) +1), // Replace with a reference you generated
    callback: function(response) {
        showOrderSummary() // show the order summary table on succesfull payment
    },
    onClose: function() {
        alert('Transaction was not completed, window closed.');
    },
    });
    handler.openIframe();
}


//Checking out
var checkoutBtn = document.getElementById('paymentForm');
checkoutBtn.addEventListener('submit', checkout);


function checkout(event){
    event.preventDefault()
    var noOfItemInCart = document.getElementsByClassName('cart-item-row')

    let username = document.getElementById('name')
    let nameError = document.getElementById('name-error') 

    let email = document.getElementById('email')
    let emailError = document.getElementById('email-error')

    let phoneNumber = document.getElementById('phone-number')
    let phoneNumberError = document.getElementById('phone-number-error')

    //check if cart is not empty
    if (noOfItemInCart.length == 0){
        alert('Please select your item/s')
        return
    // check if customer's name is not empty
    }else if (username.value == ''){
        username.style.borderColor = 'red'
        nameError.innerText = 'Enter your full name' 
        return

    // Check if Customer Enter Correct
    }else if (!regName.test(username.value)){
        username.style.borderColor = 'red'
        nameError.innerText = "Please enter a valid name"
        return

    //check if email is not empty
    }else if (email.value == ''){
        email.style.borderColor = 'red'
        emailError.innerText = 'Enter your email address' 
        return 
    //check if email is in correct formart
    }else if (!emailFormat.test(email.value)){
        email.style.borderColor = 'red'
        emailError.innerText = "Enter a valid email address"
        return

    }else if(phoneNumber.value == ''){
        phoneNumber.style.borderColor = 'red'
        phoneNumberError.innerText = 'Please enter your phone number'
        return
    }else if (!phoneReg.test(phoneNumber.value)){
        phoneNumber.style.borderColor = 'red'
        phoneNumberError.innerText = "Please enter a valid phone number"
        return
    }
    payWithPaystack()
    hideCart();
}


// closing and ending all activity after successfull payment
var okBtn =  document.getElementById('hide-summary')
okBtn.addEventListener('click', hideOrderSummary)


function hideOrderSummary(){
    var hideOrderSummaryTable = document.getElementsByClassName('order-summary')[0]
    hideOrderSummaryTable.classList.remove('open-summary')

    location.reload();
    return false;
}






 
