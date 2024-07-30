let allOrders = {};
let selectedProductPrice = 0;
let currentOrderItemToEdit = "";
let orderEditingMode = false;

// TODO Adding functionality to main btns

$(".add-new-product-btn").on("click", function () {
  $(".new-product-container").removeClass("hide");
  $(".new-customer-container").addClass("hide");
  $(".create-order-container").addClass("hide");
});
$(".add-new-customer-btn").on("click", function () {
  $(".new-product-container").addClass("hide");
  $(".new-customer-container").removeClass("hide");
  $(".create-order-container").addClass("hide");
});
$(".create-order-btn").on("click", function () {
  $(".new-product-container").addClass("hide");
  $(".new-customer-container").addClass("hide");
  $(".create-order-container").removeClass("hide");
});

// TODO Function to update price based on quantity

const updatePrice = function () {
  let currentQuant = parseInt($(".current-quantity").text());
  let orignalPrice = selectedProductPrice;
  $(".total-price").text(orignalPrice * currentQuant);
};

// Function to display all products

let allProducts = [];
const displayProducts = function () {
  $(".allproduct-container").empty();
  $("#products").empty();
  $("#products").append(
    `<option value="" class="product" selected hidden>
 Choose an item
 </option>`
  );
  $(".allproduct-container").append(` 
 <div class="added-product">
 <span class="sl-no-product-col">Sl no</span>
 <span class="product-col">Product</span>
 <span class="product-id-col">Product Id</span>
 <span class="price-col">Price</span>
 </div>`);
  let slnoProduct = 1;
  for (product of allProducts) {
    $(".allproduct-container").append(`
 <div class="added-product" data-productid=${product.uniqueId}>
 <span class="sl-no-product-col">${slnoProduct}</span>
 <span class="product-col">${product.productName}</span>
 <span class="product-id-col">${product.uniqueId}</span>
 <span class="price-col">${product.productPrice}</span>
 </div>`);
    slnoProduct += 1;
    $("#products").append(
      `<option value="${product.productName}" class="product product-${product.uniqueId}">${product.productName}</option>`
    );
  }
};

// function to display all customers

let allCustomers = [];
const displayCustomers = function () {
  $(".allcustomer-container").empty();
  $("#customers").empty();
  $("#customers").append(
    `<option value="" class="product" selected hidden>
 Choose a customer
 </option>`
  );
  $(".allcustomer-container").append(`
 <div class="added-customer">
 <span class="sl-no-customer-col">Sl no</span>
 <span class="customer-col">Customer</span>
 <span class="customer-id-col">Customer Id</span>
</div>`);
  let slnoCustomer = 1;
  for (customer of allCustomers) {
    $(".allcustomer-container").append(
      `<div class="added-customer">
 <span class="sl-no-customer-col">${slnoCustomer}</span>
 <span class="customer-col">${customer.customerName}</span>
 <span class="customer-id-col">${customer.uniqueId}</span>
 </div>`
    );
    slnoCustomer += 1;
    $("#customers").append(
      `<option value="${customer.customerName}" class="customer customer-${customer.uniqueId}">${customer.customerName}</option>`
    );
  }
};

// TODO function to display all orders

const displayOrders = function (customerName) {
  $(".allorder-container").empty();
  $(".allorder-container").append(`
 <div class="order">
 <span class="slno-order-col">Sl no</span>
 <span class="description-col">Description</span>
 <span class="order-id-col">Order Id</span>
 <span class="quantity-col">Quantity</span>
 <span class="rate-col">Rate</span>
 <span class="amount-col">Amount</span>
 <div class="order-btns">
 </div>
</div>`);
  slnoOrder = 1;
  console.log(allOrders[customerName]);
  for (order of allOrders[customerName]) {
    $(".allorder-container").append(
      `
 <div class="order">
    <span class="slno-order-col">${slnoOrder}</span>
    <span class="description-col ">${order.selectedProductName}</span>
    <span class="order-id-col">${order.uniqueId}</span>
    <span class="quantity-col">${order.selectedQuantity}</span>
    <span class="rate-col">${order.selectedProductPrice}</span>
    <span class="amount-col">${order.totalPrice}</span>
    <div class="order-btns">
        <button class='order-edit-btn'>Edit</button>
        <button class='order-delete-btn'>Delete</button>
    </div>
 </div>`
    );
    slnoOrder += 1;
  }
};

// TODO Logic to add and subtract quantity on button click

$(".quantity-icon-subtract").on("click", function () {
  const currentQuant = $(".current-quantity").text();
  if (currentQuant > 1) $(".current-quantity").text(currentQuant - 1);
  updatePrice();
});
$(".quantity-icon-add").on("click", function () {
  const currentQuant = $(".current-quantity").text();
  $(".current-quantity").text(parseInt(currentQuant) + 1);
  updatePrice();
});

//TODO Logic to add product to allproducts array

let uniqueProductId = 1;
$(".add-product-btn").on("click", function () {
  let productName = $(".product-name").val();

  const productPrice = $(".product-price").val();

  if (!productName || !productPrice) {
    Swal.fire({
      text: "Invalid Input !",
      icon: "warning",
      width: "400px",
      confirmButtonText: "Ok",
    });
  } else {
    if (
      productPrice
        .split("")
        .every((char) => parseInt(char) >= 0 && parseInt(char) <= 9)
    ) {
      productName = productName[0].toUpperCase() + productName.substring(1);
      allProducts.push({
        uniqueId: "P" + uniqueProductId,
        productName: productName,
        productPrice: productPrice,
      });
      $(".product-name").val("");
      $(".product-price").val("");
      uniqueProductId += 1;
      displayProducts();
    } else {
      Swal.fire({
        text: "Invalid Input !",
        icon: "warning",
        width: "400px",
        confirmButtonText: "Ok",
      });
    }
  }
});

//TODO Logic to add customers to allcustomers array

let uniqueCustomerId = 1;
$(".add-customer-btn").on("click", function () {
  let customerName = $(".customer-name").val();

  if (customerName) {
    customerName = customerName[0].toUpperCase() + customerName.substring(1);
    allCustomers.push({
      uniqueId: "C" + uniqueCustomerId,
      customerName: customerName,
    });
    allOrders[customerName] = [];
    $(".customer-name").val("");
    uniqueCustomerId += 1;
    displayCustomers();
  } else {
    Swal.fire({
      text: "Invalid input !",
      icon: "warning",
      width: "400px",
      confirmButtonText: "Ok",
    });
  }
});

//TODO Logic when user changes customer name

$("#customers").change(function (e) {
  const selectedCustomerName = $("#customers").val();
  displayOrders(selectedCustomerName);
  $(".current-quantity").text(1);
  $(".invoice-details").empty();
});

//TODO Logic when user changes the product

$("#products").change(function (e) {
  const uniqueIdProduct = $("#products")
    .find(":selected")[0]
    .classList[1].split("-")[1];
  const selectedProduct = allProducts.filter(
    (product) => product.uniqueId == uniqueIdProduct
  );
  selectedProductPrice = parseInt(selectedProduct[0].productPrice);

  $(".total-price").text(selectedProduct[0].productPrice);
  $(".current-quantity").text(1);
});

// TODO Logic to add orders to allOrders

let uniqueOrderId = 1;
$(".confirm-order-btn").on("click", function () {
  const selectedCustomerName = $("#customers").val();
  const selectedProductName = $("#products").val();
  const selectedQuantity = $(".current-quantity").text();
  const totalPrice = $(".total-price").text();
  if (!selectedCustomerName && !selectedProductName) {
    Swal.fire({
      text: "Invalid Input !",
      icon: "warning",
      width: "400px",
      confirmButtonText: "Ok",
    });
  } else {
    if (!orderEditingMode) {
      allOrders[selectedCustomerName].push({
        uniqueId: "O" + uniqueOrderId,
        selectedProductName: selectedProductName,
        selectedCustomerName: selectedCustomerName,
        selectedQuantity: selectedQuantity,
        selectedProductPrice: selectedProductPrice,
        totalPrice: totalPrice,
      });
      uniqueOrderId += 1;
      displayOrders(selectedCustomerName);
    } else {
      const newSelectedCustomerName = $("#customers").val();
      const newSelectedProductName = $("#products").val();
      const newSelectedQuantity = $(".current-quantity").text();
      const newTotalPrice = $(".total-price").text();
      let indexofOrder = 0;
      let orderToEdit = allOrders[newSelectedCustomerName].filter(
        (item, index) => {
          if (item.uniqueId == currentOrderItemToEdit) {
            indexofOrder = index;
            return item;
          }
        }
      )[0];
      orderToEdit.selectedProductName = newSelectedProductName;
      orderToEdit.selectedCustomerName = newSelectedCustomerName;
      orderToEdit.selectedQuantity = newSelectedQuantity;
      orderToEdit.totalPrice = newTotalPrice;
      allOrders[newSelectedCustomerName][indexofOrder] = orderToEdit;
      displayOrders(selectedCustomerName);
      orderEditingMode = false;
    }
  }
});

//TODO Logic to edit Order

$(".create-order-container").on("click", ".order-edit-btn", function (e) {
  const currentCustomer = $("#customers").val();
  const editItemId = $(e.target).closest(".order").find(".order-id-col").text();
  let orderToEdit = allOrders[currentCustomer].filter(
    (item) => item.uniqueId == editItemId
  )[0];
  $("#products").val(orderToEdit.selectedProductName);
  $(".current-quantity").text(orderToEdit.selectedQuantity);
  $(".total-price").text(orderToEdit.totalPrice);

  selectedProductPrice = orderToEdit.selectedProductPrice;
  currentOrderItemToEdit = editItemId;
  orderEditingMode = true;
});

//TODO Logic to delete an order

$(".create-order-container").on("click", ".order-delete-btn", function (e) {
  console.log("triggering delete");
  const deleteItemId = $(e.target)
    .closest(".order")
    .find(".order-id-col")
    .text();
  console.log(deleteItemId);

  let currentCustomer = $("#customers").val();
  let currentCustomerOrders = allOrders[currentCustomer];
  console.log(currentCustomerOrders);

  let filteredOrders = currentCustomerOrders.filter(
    (order) => order.uniqueId != deleteItemId
  );
  allOrders[currentCustomer] = filteredOrders;
  displayOrders(currentCustomer);
});

// TODO Generate Invoice

$(".generate-invoice-btn").click(function (e) {
  console.log("in");
  let currentCustomer = $("#customers").val();
  const date = new Date();
  let day = date.getDate();
  let month = date.getMonth() + 1;
  let year = date.getFullYear();
  let currentDate = `${day}-${month}-${year}`;
  $(".invoice-details").empty();
  $(".invoice-details").append(`
  <div class='invoice-title'>
    <h2 class='invoice-title'>INVOICE</h2>
    <p class='current-date'>Date : ${currentDate}</p>
  </div>
  <div class="order invoice-head">
    <span class="invoice-slno-order-col">Sl no</span>
    <span class="invoice-description-col">Description</span>
    <span class="invoice-quantity-col">Quantity</span>
    <span class="invoice-rate-col">Rate</span>
    <span class="invoice-amount-col">Amount</span>
  </div>`);
  let slno = 1;
  let totalamount = 0;
  for (const order of allOrders[currentCustomer]) {
    $(".invoice-details").append(`
    <div class="order">
      <span class="invoice-slno-order-col">${slno}</span>
      <span class="invoice-description-col">${order.selectedProductName}</span>
      <span class="invoice-quantity-col">${order.selectedQuantity}</span>
      <span class="invoice-rate-col">${order.selectedProductPrice}</span>
      <span class="invoice-amount-col">${order.totalPrice}</span>
    </div>`);
    totalamount += parseInt(order.totalPrice);
    slno += 1;
  }
  $(".invoice-details").append(`
  <div class='total-amount-container'> 
    <p>Total Amount</p> 
    <span>₹ ${totalamount.toFixed(2)}</span>
  </div>`);
});
