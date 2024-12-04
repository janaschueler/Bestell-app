function getMenueTemplateStarter(starterList, price, dishprice) {
  return ` <div class="dishUnit">
            <div class="dishContentContainer">
          <div class="dishName">${starterList.dishName} ${starterList.dishAmount}</div>
          <div>
          ${starterList.dishDiscription}
          </div>
          <div class="dishprice">${price}</div>
        </div>
        <div class="add">
          <button onclick="addCoursToBasket('${starterList.dishName}', ${dishprice}), renderSumFood(), renderTotalSum(), renderDeliveryCosts()"
            class="addBtn"
          ></button>
        </div>
        </div>`;
}

function getMenueTemplateMain(mainList, price, dishprice) {
  return ` <div class="dishUnit">
            <div class="dishContentContainer">
          <div class="dishName">${mainList.dishName} ${mainList.dishAmount}</div>
          <div>
          ${mainList.dishDiscription}
          </div>
          <div class="dishprice">${price}</div>
        </div>
        <div class="add">
          <button onclick="addCoursToBasket('${mainList.dishName}', ${dishprice}), renderSumFood(), renderTotalSum(), renderDeliveryCosts()"
            class="addBtn"
          ></button>
        </div>
        </div>`;
}

function getMenueTemplateDessert(dessertList, price, dishprice) {
  return ` <div class="dishUnit">
            <div class="dishContentContainer">
          <div class="dishName">${dessertList.dishName} ${dessertList.dishAmount}</div>
          <div>
          ${dessertList.dishDiscription}
          </div>
          <div class="dishprice">${price}</div>
        </div>
        <div class="add">
          <button onclick="addCoursToBasket('${dessertList.dishName}', '${dishprice}'), renderSumFood(), renderTotalSum(), renderDeliveryCosts()"
            class="addBtn"
          ></button>
        </div>
        </div>`;
}

function getBasketTemplate(basketList, priceList, indexBasket, price, amount) {
  return `
            <div class="dishUnitBasket">
             <div class="dishNameBasket">${basketList}</div>
             <div class="changeBasket">
              <div class="amountBasket">
                 <button onclick="renderAddDishAmountBasket(${indexBasket}), renderNewBasketUnitPrice(${indexBasket}, ${price}) "
                 class="addBtnBasket"
                 ></button>
                 <div id="dishAmountBasket${indexBasket}" class="dishpriceBasket">${amount}</div>
                  <button onclick="renderReduceDishAmountBasket(${indexBasket}, ${price}) "
                  class="minusBtnBasket"
                 ></button>
              </div>
              <div class="deleteDish">
                <div id="dishpriceBasket${indexBasket}" class="dishpriceBasket">${priceList}</div>
                <button onclick=deletedish(${indexBasket}) id="deleteDishBasket${indexBasket}"
                class="deleteBtnBasket"
                ></button>
              </div>
              </div>
            </div>`;
}

function getsubmitOrder() {
  return `<div> Thank you for your order!</div>
          <div>You will receive your delivery in 45 minutes.</div>
          <div>Enjoy your meal!</div>`;
}

function getmyOderBtn(sumTotaleEuro) {
  return `<button onclick="submitOrder (), submitOrderMessage ()" class="submit btn">Order (${sumTotaleEuro})</button>`;
}

function getmyMobileOderBtn(sumTotaleEuro) {
  return `My Basket (${sumTotaleEuro})`;
}

function getmyMobileOderBtnEmpty() {
  return `My Basket`;
}
