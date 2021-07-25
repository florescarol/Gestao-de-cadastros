/* navigation */
var firstTimeClient = true;

function clientsPage() {
    document.getElementById("clientsPage").style.display = "block";
    document.getElementById("productsPage").style.display = "none";
    document.getElementById("purchasesPage").style.display = "none";

    document.getElementById("formContainerClients").style.display = "none";
    document.getElementById("editFormClients").style.display = "none";
    document.getElementById("idFormClients").style.display = "none";
    if (firstTimeClient) {
        showClients()
    }; 
}

var firstTimeProduct = true;

function productsPage() {
    document.getElementById("clientsPage").style.display = "none";
    document.getElementById("productsPage").style.display = "block";
    document.getElementById("purchasesPage").style.display = "none";
    
    document.getElementById("formContainerProducts").style.display = "none";
    document.getElementById("editFormProducts").style.display = "none";
    document.getElementById("idFormProducts").style.display = "none";
    if (firstTimeProduct) {
        showProducts();
    }
}

var firstTimePurchase= true;

function purchasesPage() {
    document.getElementById("purchasesPage").style.display = "block";
    document.getElementById("clientsPage").style.display = "none";
    document.getElementById("productsPage").style.display = "none";

    document.getElementById("formContainerPurchases").style.display = "none";
    document.getElementById("editFormPurchases").style.display = "none";
    document.getElementById("idFormPurchases").style.display = "none";
    
    if (firstTimePurchase) {
        showPurchases();
    }
}

/* clients */

function showFormClients() {
    document.getElementById("formContainerClients").style.display = "block";
    document.getElementById("btnCreateClient").style.display = "block";
    document.getElementById("editFormClients").style.display = "none"
    document.getElementById("idFormClients").style.display = "none";
}

function showFormEditClients() {
    document.getElementById("formContainerClients").style.display = "block";
    document.getElementById("editFormClients").style.display = "block";
    document.getElementById("idFormClients").style.display = "block";
    document.getElementById("btnCreateClient").style.display = "none";
}

var clients = localStorage.getItem("Clients");
var clients = JSON.parse(clients);
if (!clients) {
    var clients = []
};

var i = localStorage.getItem("Clients ID");
var i = JSON.parse(i);
if (!i) {
    var i = 0
};

function checkClient() {
    var clientConditions = true;
    var selectedState = document.getElementById("clientState");

    if (document.getElementById("clientEmail").validity.valid == false || document.getElementById("clientEmail").value == "") {
        clientConditions = false;
    }
    if (selectedState.options[selectedState.selectedIndex].value == "none") {
        clientConditions = false;
    }
    if (document.getElementById("clientName").value == ""
    || document.getElementById("clientCity").value == ""
    || document.getElementById("clientAdress").value == "") {
        clientConditions = false;
    }

    return clientConditions
}

function createClient() {
    if (checkClient() == true) {
        i++;
        var selectedState = document.getElementById("clientState");

        var client = {
            id: "C" + i,
            name: document.getElementById("clientName").value,
            email: document.getElementById("clientEmail").value,
            state: selectedState.options[selectedState.selectedIndex].value,
            city: document.getElementById("clientCity").value,
            adress: document.getElementById("clientAdress").value
        }
        localStorage.setItem("Clients ID", i);
        
        clients.push(client);
        localStorage.setItem("Clients", JSON.stringify(clients));
        addClient(client);
        
        clientsPage();
        document.getElementById("formClients").reset();
    }
    else {
        alert("Preencha os campos corretamente.")
    }
}

function addClient(client) {
    var clientsTable = document.getElementById("clientsTable");
    var row = document.createElement("tr")
    row.id = client.id;

    for (const property in client) {
        var cell = document.createElement("td");
        var cellText = document.createTextNode(client[property]);
        cell.appendChild(cellText);
        row.appendChild(cell);
    } 
    clientsTable.appendChild(row);
}

function showClients() {
    var clientsTable = document.getElementById("clientsTable");
    
    for (var x in clients) {
        var client = clients[x];
        var row = document.createElement("tr");
        row.id = client.id;

        for (const property in client) {
            var cell = document.createElement("td");
            var cellText = document.createTextNode(client[property]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        } 
        clientsTable.appendChild(row);
    }
    firstTimeClient = false;
}

function editClient() {
    var idEdit = document.getElementById("idClient").value;
    var idFound = false;

    var selectedState = document.getElementById("clientState");

    for (x in clients) {
        if (clients[x].id === idEdit) {
            idFound = true;
            if (checkClient() == true) {
                clients[x].name = document.getElementById("clientName").value;
                clients[x].email = document.getElementById("clientEmail").value;
                clients[x].state = selectedState.options[selectedState.selectedIndex].value;
                clients[x].city = document.getElementById("clientCity").value;
                clients[x].adress = document.getElementById("clientAdress").value;
    
                localStorage.setItem("Clients", JSON.stringify(clients));
    
                document.getElementById("formClients").reset();
                document.getElementById("formIdClients").reset();
                alert("Atualize a página para ver as mudanças.");
            }
            else {
                alert("Complete todos os campos.")
            }
        }
    }
    if (idFound == false) {
        alert("ID inválido. Tente novamente.");
    }
}

function deleteClient() {
    var idEdit = document.getElementById("idClient").value;
    var idFound = false;

    for (x in clients) {
        if (clients[x].id === idEdit) {
            idFound = true;
            var confirmation = confirm("Essa alteração é permanente. Deseja continuar?")

            if (confirmation == true) {
                clients.splice(x, 1);

                localStorage.setItem("Clients", JSON.stringify(clients));
    
                document.getElementById("formClients").reset();
                document.getElementById("formIdClients").reset();
                alert("Atualize a página para ver as mudanças.");
            }
        }
    }
    if (idFound == false) {
        alert("ID inválido. Tente novamente.");
    }
}
/* products */

function showFormProducts() {
    document.getElementById("formContainerProducts").style.display = "block";
    document.getElementById("btnCreateProduct").style.display = "block";
    document.getElementById("editFormProducts").style.display = "none"
    document.getElementById("idFormProducts").style.display = "none";
}

function showFormEditProducts() {
    document.getElementById("formContainerProducts").style.display = "block";
    document.getElementById("editFormProducts").style.display = "block";
    document.getElementById("idFormProducts").style.display = "block";
    document.getElementById("btnCreateProduct").style.display = "none";
}

var products = localStorage.getItem("Products");
var products = JSON.parse(products);
if (!products) {
    var products = []
};

var j = localStorage.getItem("Products ID");
var j = JSON.parse(j);
if (!j) {
    var j = 0
};

function checkProduct() {
    var productConditions = true;
    var selectedCountry = document.getElementById("productCountry");
    var selectedType = document.getElementById("productType");

    if (selectedCountry.options[selectedCountry.selectedIndex].value == "none") {
        productConditions = false;
    }
    if (selectedType.options[selectedType.selectedIndex].value == "none") {
        productConditions = false;
    }
    if (document.getElementById("productName").value == ""
    || document.getElementById("productStorage").value == ""
    || document.getElementById("productPrice").value == "") {
        productConditions = false;
    }

    return productConditions
}

function createProduct() {
    if (checkProduct() == true) {
        j++;
        var selectedCountry = document.getElementById("productCountry");
        var selectedType = document.getElementById("productType");
    
        var product = {
            id: "P" + j,
            name: document.getElementById("productName").value,
            type: selectedType.options[selectedType.selectedIndex].value,
            country: selectedCountry.options[selectedCountry.selectedIndex].value,
            price: "R$" + document.getElementById("productPrice").value,
            storage: document.getElementById("productStorage").value,
            quantityBought: parseInt(0),
            storageNow: document.getElementById("productStorage").value,
        }
        localStorage.setItem("Products ID", j)
    
        products.push(product);
        localStorage.setItem("Products", JSON.stringify(products));
    
        addProduct(product);
        
        productsPage();
        document.getElementById("formProducts").reset();
    }
    else {
        alert("Preencha os campos corretamente.")
    }
}

function addProduct(product) {
    var productsTable = document.getElementById("productsTable");
    var row = document.createElement("tr");
    row.id = product.id;

    for (const property in product) {
        var cell = document.createElement("td");
        var cellText = document.createTextNode(product[property]);
        cell.appendChild(cellText);
        row.appendChild(cell);
    } 
    productsTable.appendChild(row);
}

function showProducts() {
    var productsTable = document.getElementById("productsTable");
    
    for (var x in products) {
        var product = products[x];
        var row = document.createElement("tr");
        row.id = product.id;

        for (const property in product) {
            var cell = document.createElement("td");
            var cellText = document.createTextNode(product[property]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        } 
        productsTable.appendChild(row);
    }
    firstTimeProduct = false;
}

function editProduct() {
    var idEdit = document.getElementById("idProduct").value;
    var idFound = false;

    var selectedCountry = document.getElementById("productCountry");
    var selectedType = document.getElementById("productType");

    for (x in products) {
        if (products[x].id === idEdit) {
            idFound = true;
            if (checkProduct() == true) {
                products[x].name = document.getElementById("productName").value;
                products[x].type = selectedType.options[selectedType.selectedIndex].value;
                products[x].country = selectedCountry.options[selectedCountry.selectedIndex].value;
                products[x].storage = document.getElementById("productStorage").value;
                products[x].price = "R$" + document.getElementById("productPrice").value;
                products[x].storageNow = parseInt(products[x].storage) - products[x].quantityBought;
    
                localStorage.setItem("Products", JSON.stringify(products));
    
                document.getElementById("formProducts").reset();
                document.getElementById("formIdProducts").reset();
                alert("Atualize a página para ver as mudanças.");
            }
            else {
                alert("Complete todos os campos.")
            }
        }
    }
    if (idFound == false) {
        alert("ID inválido. Tente novamente.");
    }
}

function deleteProduct() {
    var idEdit = document.getElementById("idProduct").value;
    var idFound = false;

    for (x in products) {
        if (products[x].id === idEdit) {
            idFound = true;
            var confirmation = confirm("Essa alteração é permanente. Deseja continuar?")

            if (confirmation == true) {
                products.splice(x, 1);

                localStorage.setItem("Products", JSON.stringify(products));
    
                document.getElementById("formProducts").reset();
                document.getElementById("formIdProducts").reset();
                alert("Atualize a página para ver as mudanças.");
            }
        }
    }
    if (idFound == false) {
        alert("ID inválido. Tente novamente.");
    }
}

/* Purchases */

function showFormPurchase() {
    document.getElementById("formContainerPurchases").style.display = "block";
    document.getElementById("btnCreatePurchases").style.display = "block";
    document.getElementById("editFormPurchases").style.display = "none"
    document.getElementById("idFormPurchases").style.display = "none";
}

function showFormEditPurchase() {
    document.getElementById("formContainerPurchases").style.display = "block";
    document.getElementById("editFormPurchases").style.display = "block";
    document.getElementById("idFormPurchases").style.display = "block";
    document.getElementById("btnCreatePurchases").style.display = "none";
}

var purchases = localStorage.getItem("Purchases");
var purchases = JSON.parse(purchases);
if (!purchases) {
    var purchases = []
};

var k = localStorage.getItem("Purchases ID");
var k = JSON.parse(k);
if (!k) {
    var k = 0
};

var chosenProduct;

function checkPurchaseIds() {
    var purchaseConditions = true;

    var idClient = document.getElementById("clientIdPurchase").value;
    var idClientFound = false;
    for (x in clients) {
        if (clients[x].id === idClient) {
            idClientFound = true;
        }
    }

    var idProduct = document.getElementById("productIdPurchase").value;
    var idProductFound = false;
    for (x in products) {
        if (products[x].id === idProduct) {
            idProductFound = true;
            chosenProduct = products[x];
        }
    }

    if (idClientFound == false && idProductFound == false) {
        alert("ID do cliente e do produto inválidos.");
    }
    else if (idClientFound == false) {
        alert("ID do cliente inválido.")
    }
    else if (idProductFound == false) {
        alert("ID do produto inválido.")
    }
    
    if (idProductFound == false || idClientFound == false) {
        purchaseConditions = false;
    }

    return purchaseConditions
}

function checkPurchaseStorage() {
    var purchaseConditions = true;

    var productsAvailable = parseInt(chosenProduct.storage) - parseInt(chosenProduct.quantityBought);
    var quantityBought = parseInt(document.getElementById("quantityPurchase").value);

    if (quantityBought > productsAvailable) {
        purchaseConditions = false;
        alert("Impossível realizar compra. Estoque: " + productsAvailable);
    }

    if (quantityBought < 1) {
        purchaseConditions = false;
        alert("Quantidade inválida.");
    }

    return purchaseConditions
}

function createPurchases() {
    if (checkPurchaseIds() == true && checkPurchaseStorage() == true) {
        k++;
    
        var purchase = {
            idPurchase: "B" + k,
            idClient: document.getElementById("clientIdPurchase").value,
            idProduct: document.getElementById("productIdPurchase").value,
            product: chosenProduct.name,
            price: chosenProduct.price,
            quantity: document.getElementById("quantityPurchase").value,
        }
        localStorage.setItem("Purchases ID", k)
    
        purchases.push(purchase);
        localStorage.setItem("Purchases", JSON.stringify(purchases));

        addPurchase(purchase);
        addPurchaseToProductsTable(purchase.quantity);
        
        purchasesPage();
        document.getElementById("formPurchases").reset();
        alert("Atualize a página para ver as mudanças.");
    }
}

function addPurchase(purchase) {
    var purchasesTable = document.getElementById("purchasesTable");
    var row = document.createElement("tr");
    row.id = purchase.id;

    for (const property in purchase) {
        var cell = document.createElement("td");
        var cellText = document.createTextNode(purchase[property]);
        cell.appendChild(cellText);
        row.appendChild(cell);
    } 
    purchasesTable.appendChild(row);
}

function showPurchases() {
    var purchasesTable = document.getElementById("purchasesTable");
    
    for (var x in purchases) {
        var purchase = purchases[x];
        var row = document.createElement("tr");
        row.id = purchase.id;

        for (const property in purchase) {
            var cell = document.createElement("td");
            var cellText = document.createTextNode(purchase[property]);
            cell.appendChild(cellText);
            row.appendChild(cell);
        } 
        purchasesTable.appendChild(row);
    }
    firstTimePurchase = false;
}

function editPurchase() {
    var idEdit = document.getElementById("idPurchase").value;
    var idFound = false;

    for (x in purchases) {
        if (purchases[x].idPurchase == idEdit) {
            var oldPurchase = purchases[x];
            idFound = true;

            var differentProduct = false;
            if (oldPurchase.idProduct != document.getElementById("productIdPurchase").value ){
                differentProduct = true;
                for (x in products) {
                    if (products[x].id === oldPurchase.idProduct) {
                        var productBoughtOriginal = products[x];
                    }
                }
            }
            
            if (checkPurchaseIds() == true) {
                var quantityBoughtOriginal = parseInt(oldPurchase.quantity);
                var quantityBoughtNew = parseInt(document.getElementById("quantityPurchase").value);

                if (differentProduct == true) {
                    productBoughtOriginal.quantityBought -= quantityBoughtOriginal;
                    quantityBoughtOriginal = 0;
                }

                oldPurchase.idProduct = document.getElementById("productIdPurchase").value;
                oldPurchase.product = chosenProduct.name;
                oldPurchase.price =  chosenProduct.price;

                if (quantityBoughtNew > quantityBoughtOriginal) {
                    if (checkPurchaseStorage() == true) {
                        oldPurchase.idClient = document.getElementById("clientIdPurchase").value;
                        oldPurchase.quantity = document.getElementById("quantityPurchase").value;
                        var quantityAdded = quantityBoughtNew - quantityBoughtOriginal;
                        addPurchaseToProductsTable(quantityAdded);
                    }
                    else {
                        break;
                    }
                }
                else {
                    removePurchaseFromProductsTable(quantityBoughtOriginal - quantityBoughtNew);
                    oldPurchase.idClient = document.getElementById("clientIdPurchase").value;
                    oldPurchase.quantity = document.getElementById("quantityPurchase").value;
                }
                localStorage.setItem("Purchases", JSON.stringify(purchases));
    
                document.getElementById("formPurchases").reset();
                document.getElementById("formIdPurchases").reset();
                alert("Atualize a página para ver as mudanças.");
            }                
        }
    }
    if (idFound == false) {
        alert("ID da compra inválido. Tente novamente.");
    }
}  

function deletePurchase() {
    var idEdit = document.getElementById("idPurchase").value;
    var idFound = false;

    for (x in purchases) {
        if (purchases[x].idPurchase === idEdit) {
            idFound = true;
            var confirmation = confirm("Essa alteração é permanente. Deseja continuar?")

            if (confirmation == true) {
                for (y in products) {
                    if (products[y].id == purchases[x].idProduct) {
                        chosenProduct = products[y];
                    }
                }
                var quantity = purchases[x].quantity;
                removePurchaseFromProductsTable(quantity)
                purchases.splice(x, 1);

                localStorage.setItem("Purchases", JSON.stringify(purchases));
    
                document.getElementById("formPurchases").reset();
                document.getElementById("formIdPurchases").reset();
                alert("Atualize a página para ver as mudanças.");
            }
        }
    }
    if (idFound == false) {
        alert("ID inválido. Tente novamente.");
    }
}

function addPurchaseToProductsTable(quantity) {
    chosenProduct.quantityBought += parseInt(quantity);
    chosenProduct.storageNow -= parseInt(quantity);
    localStorage.setItem("Products", JSON.stringify(products));
}

function removePurchaseFromProductsTable(quantity) {
    chosenProduct.quantityBought -= parseInt(quantity);
    chosenProduct.storageNow += parseInt(quantity);
    localStorage.setItem("Products", JSON.stringify(products));
}