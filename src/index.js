socket = io.connect(window.location.href)
const productsDiv = document.getElementById("products")


socket.emit("req")
socket.on("res", function(data) {
    
    for (product in data) {
        console.log(data[product])
        const newDiv = document.createElement("div");
        newDiv.setAttribute("class", "product")


        const productName = document.createElement("h2")
        productName.innerText = data[product].name

        const productPrice = document.createElement("h3")
        productPrice.innerText = data[product].price

        const productDesc = document.createElement("p")
        productDesc.innerText = data[product].desc
        
        const productImage = document.createElement("img")
        productImage.setAttribute("src", data[product].image)
        productImage.setAttribute("class", "product-image")

        newDiv.appendChild(productName);
        newDiv.appendChild(productImage)
        newDiv.appendChild(productPrice);
        newDiv.appendChild(productDesc);
        
        
        productsDiv.appendChild(newDiv)
    }
})
