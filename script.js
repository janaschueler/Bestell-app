function renderStarter() {
  let myStarterRef = document.getElementById("dishUnitStarter");
  let myStarter = myStarterRef;
  myStarter.innerHTML = "";

  for (let indexStarter = 0; indexStarter < starter.length; indexStarter++) {
    const starterList = starter[indexStarter];
    let price = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(starter[indexStarter].dishprice);
    let dishprice = starter[indexStarter].dishprice;
    myStarter.innerHTML += getMenueTemplateStarter(starterList, price, dishprice);
  }
}

function renderMain() {
  let myMainRef = document.getElementById("dishUnitMain");
  let myMain = myMainRef;
  myMain.innerHTML = "";

  for (let indexMain = 0; indexMain < main.length; indexMain++) {
    const mainList = main[indexMain];
    let price = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(main[indexMain].dishprice);
    let dishprice = main[indexMain].dishprice;

    myMain.innerHTML += getMenueTemplateMain(mainList, price, dishprice);
  }
}

function renderDessert() {
  let myDessertRef = document.getElementById("dishUnitDessert");
  let myDessert = myDessertRef;
  myDessert.innerHTML = "";

  for (let indexDessert = 0; indexDessert < dessert.length; indexDessert++) {
    const dessertList = dessert[indexDessert];
    let price = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(dessert[indexDessert].dishprice);
    let dishprice = dessert[indexDessert].dishprice;

    myDessert.innerHTML += getMenueTemplateDessert(dessertList, price, dishprice);
  }
}

function renderBasket() {
  let myBasketRef = document.getElementById("dishBasketContainer");
  let myBasket = myBasketRef;
  myBasket.innerHTML = "";
  getBasketFromLocalStorage();

  for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
    const basketList = basket[indexBasket];
    const price = basketPrice[indexBasket];
    const amount = basketAmount[indexBasket];
    let priceList = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(price);

    myBasket.innerHTML += getBasketTemplate(basketList, priceList, indexBasket, price, amount);

    renderMultible();
  }
}

function addCoursToBasket(dishName, dishPrice) {
  for (let indexBasket = 0; indexBasket < basket.length; indexBasket++) {
    if (dishName === basket[indexBasket]) {
      renderAddDishAmountBasket(indexBasket);
      renderNewBasketUnitPrice(indexBasket, dishPrice);
      return;
    }
  }
  basket.push(dishName);
  basketPrice.push(dishPrice);
  basketAmount.push(1);
  saveBasketToLocalStorage();
  renderBasket();
  submitOrderMessage();
}

function renderSumFood() {
  let sumFoodRef = document.getElementById("sum__Food");
  let sumPrice = 0;
  for (let indexSumPrice = 0; indexSumPrice < basketPrice.length; indexSumPrice++) {
    sumPrice += parseFloat(basketAmount[indexSumPrice]) * parseFloat(basketPrice[indexSumPrice]);
  }

  let sumPriceEuro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(sumPrice);
  sumFoodRef.innerHTML = sumPriceEuro;

  showOderButton();
  orderBtn();
  basketBtnContent();
}

function renderTotalSum() {
  let sumTotalRef = document.getElementById("summTotal");
  let sumPrice = 0;
  for (let indexSumPrice = 0; indexSumPrice < basketPrice.length; indexSumPrice++) {
    sumPrice += parseFloat(basketAmount[indexSumPrice]) * parseFloat(basketPrice[indexSumPrice]);
  }
  if (sumPrice === 0) {
    sumTotalRef.innerHTML = "0,00 €";
    renderDeliveryCosts();
    return;
  }
  let sumTotal = sumPrice + 5;
  let sumTotaleEuro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(sumTotal);
  sumTotalRef.innerHTML = sumTotaleEuro;
}

function renderDeliveryCosts() {
  let deliveryCostRef = document.getElementById("amountDelivery");
  let sumTotalRef = document.getElementById("summTotal").innerHTML;
  if (sumTotalRef === "0,00 €") {
    deliveryCostRef.innerHTML = "0,00 €";
    return;
  }
  deliveryCostRef.innerHTML = "5,00 €";
}

function renderAddDishAmountBasket(indexBasket) {
  let myBasketAmountRef = document.getElementById("dishAmountBasket" + indexBasket);
  let myBasketAmount = myBasketAmountRef.innerHTML;

  myBasketAmount = parseFloat(myBasketAmount);
  myBasketAmountRef.innerHTML = +myBasketAmount + 1;
  basketAmount.splice(indexBasket, 1, myBasketAmount + 1);

  saveBasketToLocalStorage();
  renderSumFood();
  renderTotalSum();
}

function renderReduceDishAmountBasket(indexBasket, price) {
  let myBasketAmountRef = document.getElementById("dishAmountBasket" + indexBasket);
  let myBasketAmount = myBasketAmountRef.innerHTML;
  if (parseInt(myBasketAmount) === 1) {
    deletedish(indexBasket);
    return;
  }

  myBasketAmount = parseFloat(myBasketAmount);
  myBasketAmountRef.innerHTML = +myBasketAmount - 1;
  basketAmount.splice(indexBasket, 1, myBasketAmount - 1);
  saveBasketToLocalStorage();
  renderNewBasketUnitPrice(indexBasket, price);
  renderSumFood();
  renderTotalSum();
}

function renderNewBasketUnitPrice(indexBasket, price) {
  let myBasketAmountRef = document.getElementById("dishAmountBasket" + indexBasket);
  let myBasketAmount = myBasketAmountRef.innerHTML;
  myBasketAmount = parseFloat(myBasketAmount);

  let newBasketPrice = myBasketAmount * price;
  let myBasketPriceRef = document.getElementById("dishpriceBasket" + indexBasket);
  myBasketPriceRef.innerHTML = "";

  let newBasketPriceEuro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(newBasketPrice);
  myBasketPriceRef.innerHTML = newBasketPriceEuro;
}

function saveBasketToLocalStorage() {
  localStorage.setItem("basket", JSON.stringify(basket));
  localStorage.setItem("basketPrice", JSON.stringify(basketPrice));
  localStorage.setItem("basketAmount", JSON.stringify(basketAmount));
}

function getBasketFromLocalStorage() {
  let mybasket = JSON.parse(localStorage.getItem("basket"));
  let mybasketPrice = JSON.parse(localStorage.getItem("basketPrice"));
  let mybasketAmount = JSON.parse(localStorage.getItem("basketAmount"));
  if (mybasket === null) {
    return;
  } else {
    basket = mybasket;
    basketPrice = mybasketPrice;
    basketAmount = mybasketAmount;
  }
}

function deletedish(indexBasket) {
  basket.splice(indexBasket, 1);
  basketPrice.splice(indexBasket, 1);
  basketAmount.splice(indexBasket, 1);
  saveBasketToLocalStorage();
  renderBasket();
  renderSumFood();
  renderTotalSum();
  showOderButton();
  basketBtnContent();
}

function showOderButton() {
  let sumPrice = 0;
  for (let indexSumPrice = 0; indexSumPrice < basketPrice.length; indexSumPrice++) {
    sumPrice += parseFloat(basketPrice[indexSumPrice]);
  }
  if (sumPrice > 0) {
    document.getElementById("orderBtn").style.display = "block";
  } else {
    document.getElementById("orderBtn").style.display = "none";
  }
}

function submitOrder() {
  basket = [];
  basketPrice = [];
  basketAmount = [];
  saveBasketToLocalStorage();
  renderBasket();
  renderSumFood();
  renderTotalSum();
  orderBtn();
  basketBtnContent();
  showOderButton();
}

function submitOrderMessage() {
  document.getElementById("submitOrderMessage").style.display = "block";

  let sumPrice = 0;
  for (let indexSumPrice = 0; indexSumPrice < basketPrice.length; indexSumPrice++) {
    sumPrice += parseFloat(basketPrice[indexSumPrice]);
  }
  let myOrderMessage = document.getElementById("submitOrderMessage");
  if (sumPrice == 0) {
    myOrderMessage.style.display = "flex";
    myOrderMessage.innerHTML = getsubmitOrder();
  } else {
    myOrderMessage.style.display = "none";
  }
}

function orderBtn() {
  let myOrderBtn = document.getElementById("orderBtn");
  let sumPrice = 0;
  for (let indexSumPrice = 0; indexSumPrice < basketPrice.length; indexSumPrice++) {
    sumPrice += parseFloat(basketAmount[indexSumPrice]) * parseFloat(basketPrice[indexSumPrice]);
  }
  let sumTotal = sumPrice + 5;
  let sumTotaleEuro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(sumTotal);
  myOrderBtn.innerHTML = getmyOderBtn(sumTotaleEuro);
}

function basketBtnContent() {
  let myOrderBtnMobile = document.getElementById("basketBtn");
  let sumPrice = 0;
  for (let indexSumPrice = 0; indexSumPrice < basketPrice.length; indexSumPrice++) {
    sumPrice += parseFloat(basketAmount[indexSumPrice]) * parseFloat(basketPrice[indexSumPrice]);
  }

  if (sumPrice > 0) {
    let sumTotal = sumPrice + 5;
    let sumTotaleEuro = new Intl.NumberFormat("de-DE", { style: "currency", currency: "EUR" }).format(sumTotal);
    myOrderBtnMobile.innerHTML = getmyMobileOderBtn(sumTotaleEuro);
  } else {
    myOrderBtnMobile.style.display = "";
  }
}

function renderMultible() {
  showOderButton();
  renderTotalSum();
  renderSumFood();
  renderDeliveryCosts();
  orderBtn();
  basketBtnContent();
}

function toggleMobileBasket() {
  document.getElementById("containerRight").classList.toggle("d_flex");
}
