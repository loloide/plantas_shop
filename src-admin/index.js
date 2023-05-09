socket = io.connect("https://con-luz-propia.onrender.com/")
const productsDiv = document.getElementById("products")
const nameInput = document.getElementById("name-input")
const descInput = document.getElementById("desc-input")
const priceInput = document.getElementById("price-input")
const imageInput = document.getElementById("image-input")

socket.emit("req")
socket.on("res", function(data) {
    
    for (product in data) {
        
        console.log(data[product])
        const newDiv = document.createElement("div");
        newDiv.setAttribute("id", product)
        newDiv.setAttribute("class", "product")

        const productName = document.createElement("h2")
        productName.innerText = data[product].name

        const productDesc = document.createElement("p")
        productDesc.innerText = data[product].desc
        
        const productPrice = document.createElement("h3")
        productPrice.innerText = "$" + data[product].price

        const productImage = document.createElement("img")
        productImage.setAttribute("src", data[product].image)
        productImage.setAttribute("class", "product-image") 

        const deleteBtn = document.createElement("button")
        deleteBtn.innerText = "Borrar"
        deleteBtn.addEventListener('click', function handleClick(event) {
            deleteItem(event.target.parentElement.id)
        });

        newDiv.appendChild(productName);
        newDiv.appendChild(productImage)
        newDiv.appendChild(productPrice);
        newDiv.appendChild(productDesc);
        newDiv.appendChild(deleteBtn)
        
        productsDiv.appendChild(newDiv)
    }
    console.log(data)
})

function deleteItem(item) {
    var data = {

        key: document.getElementById("key-input").value,
        item: item
    }
    socket.emit("delete", data)
    console.log("deleted item", item)
    setTimeout(()=> {location.reload(true)}, 500)
    
}

function sendItems() {
    if (nameInput.value != null && priceInput.value != null && descInput.value != null && imageInput.value != null) {
        var key = document.getElementById("key-input").value
        var data = {
            name: nameInput.value,
            price: priceInput.value,
            desc: descInput.value,
            image: imageInput.value,
            key: key
        }
        socket.emit("add", data)
        setTimeout(()=> {location.reload(true)}, 500)
    }
}