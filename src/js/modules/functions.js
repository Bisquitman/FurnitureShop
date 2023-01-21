/** Проверка поддержки webp, добавление класса .webp или .no-webp для HTML */
export function isWebp() {
  // Проверка поддержки webp
  function testWebP(callback) {
    let webP = new Image();
    webP.onload = webP.onerror = function () {
      callback(webP.height == 2);
    };
    webP.src =
      'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
  }
  // добавление класса .webp или .no-webp для HTML
  testWebP(function (support) {
    if (support == true) {
      document.querySelector('html').classList.add('webp');
    } else {
      document.querySelector('html').classList.add('no-webp');
    }
  });
}

// Проверка мобильности устройства
export const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

// Удаление указанных классов
function _removeClasses([...elements], removeClass) {
  elements.forEach((element) => {
    element.classList.remove(removeClass);
  });
}

//  Actions (делегирование события click)
export function documentActions(e) {
  const targetElement = e.target;

  // Стрелки на меню и спойлерах
  if (window.innerWidth > 768 && isMobile.any()) {
    if (targetElement.classList.contains('menu__arrow')) {
      targetElement.closest('.menu__item').classList.toggle('_hover');
    }
    if (
      !targetElement.classList.contains('menu__arrow') &&
      document.querySelectorAll('.menu__item._hover').length > 0
    ) {
      _removeClasses(document.querySelectorAll('.menu__item._hover'), '_hover');
    }
  }

  // Кнопка поиска
  if (targetElement.classList.contains('search-form__icon')) {
    document.querySelector('.search-form').classList.toggle('_active');
  } else if (
    !targetElement.closest('.search-form') &&
    document.querySelector('.search-form._active')
  ) {
    document.querySelector('.search-form').classList.remove('_active');
  }

  // Кнопка Show More
  if (targetElement.classList.contains('products__more')) {
    getProducts(targetElement);
    e.preventDefault();
  }

  // Кнопка Add to cart
  if (targetElement.classList.contains('actions-product__button')) {
    const productId = targetElement.closest('.item-product').dataset.pid;
    addToCart(targetElement, productId);
    e.preventDefault();
  }

  // Открытие корзины
  if (
    targetElement.classList.contains('cart-header__icon') ||
    targetElement.closest('.cart-header__icon')
  ) {
    if (document.querySelector('.cart-list').children.length > 0) {
      document.querySelector('.cart-header').classList.toggle('_active');
    }
    e.preventDefault();
  } else if (
    !targetElement.closest('.cart-header') &&
    !targetElement.classList.contains('actions-product__button')
  ) {
    document.querySelector('.cart-header').classList.remove('_active');
  }

  // Удаление товара из корзины
  if (targetElement.classList.contains('cart-list__delete')) {
    const productId = targetElement.closest('.cart-list__item').dataset.cartPid;
    updateCart(targetElement, productId, false);
    e.preventDefault();
  }
}

// Картинки
export function ibg() {
  let ibg = document.querySelectorAll('._ibg');
  for (var i = 0; i < ibg.length; i++) {
    if (ibg[i].querySelector('img')) {
      ibg[i].style.backgroundImage =
        'url(' + ibg[i].querySelector('img').getAttribute('src') + ')';
    }
  }
}

// Header
const headerElement = document.querySelector('.header');

const callback = function (entries, observer) {
  if (entries[0].isIntersecting) {
    headerElement.classList.remove('_scroll');
  } else {
    headerElement.classList.add('_scroll');
  }
};

const headerObserver = new IntersectionObserver(callback);
headerObserver.observe(headerElement);

// Load More Products
async function getProducts(button) {
  if (!button.classList.contains('_hold')) {
    button.classList.add('_hold');
    const file = 'db/products.json';
    let response = await fetch(file);
    if (response.ok) {
      let result = await response.json();
      loadProducts(result);
      button.classList.remove('_hold');
      button.remove();
    } else {
      alert('Что-то пошло не так!');
    }
  }
}

// Load Products
function loadProducts(data) {
  const productsItems = document.querySelector('.products__items');

  data.products.forEach((item) => {
    const {
      id,
      url,
      image,
      title,
      text,
      price,
      priceOld,
      shareUrl,
      likeUrl,
      labels,
    } = item;

    const card = document.createElement('article');
    card.dataset.pid = id;
    card.className = 'products__item item-product';

    if (labels) {
      const itemProductLabels = document.createElement('div');
      itemProductLabels.className = 'item-product__labels';

      labels.forEach((label) => {
        const labelItem = document.createElement('div');
        labelItem.className = `item-product__label item-product__label_${label.type}`;
        labelItem.textContent = label.value;

        itemProductLabels.append(labelItem);
      });

      card.append(itemProductLabels);
    }

    const itemProductImage = document.createElement('a');
    itemProductImage.className = 'item-product__image _ibg';
    itemProductImage.href = url;
    itemProductImage.style = `background-image: url("./img/products/${image}");`;

    const img = new Image();
    img.src = `./img/products/${image}`;
    img.alt = title;

    itemProductImage.append(img);

    const itemProductBody = document.createElement('div');
    itemProductBody.className = 'item-product__body';

    const itemProductContent = document.createElement('div');
    itemProductContent.className = 'item-product__content';

    const itemProductTitle = document.createElement('h5');
    itemProductTitle.className = 'item-product__title';
    itemProductTitle.textContent = title;

    const itemProductText = document.createElement('div');
    itemProductText.className = 'item-product__text';
    itemProductText.textContent = text;

    itemProductContent.append(itemProductTitle, itemProductText);

    const itemProductPrices = document.createElement('div');
    itemProductPrices.className = 'item-product__prices';

    const itemProductPrice = document.createElement('div');
    itemProductPrice.className = 'item-product__price';
    itemProductPrice.textContent = price;

    itemProductPrices.append(itemProductPrice);

    if (priceOld) {
      const itemProductPriceOld = document.createElement('div');
      itemProductPriceOld.className =
        'item-product__price item-product__price_old';
      itemProductPriceOld.textContent = priceOld;

      itemProductPrices.append(itemProductPriceOld);
    }

    const actionsProduct = document.createElement('div');
    actionsProduct.className = 'item-product__actions actions-product';

    const actionsProductBody = document.createElement('div');
    actionsProductBody.className = 'actions-product__body';

    const actionsProductButton = document.createElement('a');
    actionsProductButton.href = '#';
    actionsProductButton.className = 'actions-product__button btn btn_white';
    actionsProductButton.textContent = 'Add to cart';

    const actionsProductLinkShare = document.createElement('a');
    actionsProductLinkShare.href = `${shareUrl ? shareUrl : '#'}`;
    actionsProductLinkShare.className = 'actions-product__link _icon-share';
    actionsProductLinkShare.textContent = 'Share';

    const actionsProductLinkFavorite = document.createElement('a');
    actionsProductLinkFavorite.href = `${likeUrl ? likeUrl : '#'}`;
    actionsProductLinkFavorite.className =
      'actions-product__link _icon-favorite';
    actionsProductLinkFavorite.textContent = 'Like';

    actionsProductBody.append(
      actionsProductButton,
      actionsProductLinkShare,
      actionsProductLinkFavorite,
    );

    actionsProduct.append(actionsProductBody);

    itemProductBody.append(
      itemProductContent,
      itemProductPrices,
      actionsProduct,
    );

    card.append(itemProductImage, itemProductBody);

    productsItems.insertAdjacentElement('beforeend', card);
  });
}

// Добавление в корзину
function addToCart(productButton, productId) {
  if (!productButton.classList.contains('_hold')) {
    productButton.classList.add('_hold');
    productButton.classList.add('_fly');

    const cartIcon = document.querySelector('.cart-header__icon');
    const product = document.querySelector(`[data-pid="${productId}"]`);
    const productImage = product.querySelector('.item-product__image');
    const img = product.querySelector('img');

    const productImageFly = productImage.cloneNode(true);

    const productImageFlyWidth = productImage.offsetWidth;
    const productImageFlyHeight = productImage.offsetHeight;
    const productImageFlyTop = productImage.getBoundingClientRect().top;
    const productImageFlyLeft = productImage.getBoundingClientRect().left;
    const productImageFlyPath = img.src;

    // productImageFly.setAttribute('class', '_flyImage _ibg');
    productImageFly.className = '_flyImage _ibg';
    productImageFly.style.cssText = `
      display: block;
      width: ${productImageFlyWidth}px;
      height: ${productImageFlyHeight}px;
      top: ${productImageFlyTop}px;
      left: ${productImageFlyLeft}px;
      background-image: url("${productImageFlyPath}");
    `;
    document.body.append(productImageFly);

    const cartFlyLeft = cartIcon.getBoundingClientRect().left;
    const cartFlyTop = cartIcon.getBoundingClientRect().top;

    productImageFly.style.cssText = `
      display: block;
      width: 0px;
      height: 0px;
      top: ${cartFlyTop}px;
      left: ${cartFlyLeft}px;
      opacity: 0;
      background-image: url("${productImageFlyPath}");
    `;

    productImageFly.addEventListener('transitionend', function () {
      if (productButton.classList.contains('_fly')) {
        productImageFly.remove();
        updateCart(productButton, productId);
        productButton.classList.remove('_fly');
      }
    });
  }
}

// Обновление корзины
function updateCart(productButton, productId, productAdd = true) {
  const cart = document.querySelector('.cart-header');
  const cartIcon = cart.querySelector('.cart-header__icon');
  const cartQuantity = cartIcon.querySelector('span');
  const cartProduct = document.querySelector(`[data-cart-pid="${productId}"]`);
  const cartList = document.querySelector('.cart-list');

  // Добавляем
  if (productAdd) {
    if (cartQuantity) {
      cartQuantity.innerHTML = ++cartQuantity.innerHTML;
    } else {
      cartIcon.insertAdjacentHTML('beforeend', `<span>1</span>`);
    }

    if (!cartProduct) {
      const product = document.querySelector(`[data-pid="${productId}"]`);
      const cartProductImage = product.querySelector(
        '.item-product__image img',
      );
      const cartProductTitle = product.querySelector(
        '.item-product__title',
      ).innerHTML;
      const cartProductContent = `
        <a href="#" class="cart-list__image _ibg" style="background-image: url(${cartProductImage.src});"><img src="${cartProductImage.src}" alt="${cartProductTitle}"></a>
        <div class="cart-list__body">
          <a href="#" class="cart-list__title">${cartProductTitle}</a>
          <div class="cart-list__quantity">Quantity: <span>1</span></div>
          <a href="#" class="cart-list__delete">Delete</a>
        </div>
      `;
      cartList.insertAdjacentHTML(
        'beforeend',
        `<li data-cart-pid="${productId}" class="cart-list__item">${cartProductContent}</li>`,
      );
    } else {
      const cartProductQuantity = cartProduct.querySelector(
        '.cart-list__quantity span',
      );
      cartProductQuantity.innerHTML = ++cartProductQuantity.innerHTML;
    }

    productButton.classList.remove('_hold');

    // Удаляем
  } else {
    const cartProductQuantity = cartProduct.querySelector('.cart-list__quantity span');
    cartProductQuantity.innerHTML = --cartProductQuantity.innerHTML;

    if (!parseInt(cartProductQuantity.innerHTML)) {
      cartProduct.remove();
    }

    const cartQuantityValue = --cartQuantity.innerHTML;

    if (cartQuantityValue) {
      cartQuantity.innerHTML = cartQuantityValue;
    } else {
      cartQuantity.remove();
      cart.classList.remove('_active');
    }
  }
}
