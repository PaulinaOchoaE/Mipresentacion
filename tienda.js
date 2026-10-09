const CART_KEY = 'seoulMarketCart';

const Store = {

  // Obtener productos del carrito
  items() {

    const cart =
      JSON.parse(localStorage.getItem(CART_KEY)) || [];

    return cart.map(item => {

      return {
        id: item.id || item.name,
        name: item.name,
        price: Number(item.price) || 0,
        priceText: item.priceText || '',
        image: item.image || '',
        qty: Number(item.quantity) || 1,

        category: item.category || 'Producto',
        cur: item.cur || 'LOC',
        page: item.page || 'Home.html'
      };

    });

  },


  // Guardar productos
  save(list) {

    const cart = list.map(item => {

      return {
        id: item.id,
        name: item.name,
        price: item.price,
        priceText: item.priceText,
        image: item.image,
        quantity: item.qty,

        category: item.category,
        cur: item.cur,
        page: item.page
      };

    });

    localStorage.setItem(
      CART_KEY,
      JSON.stringify(cart)
    );

    window.dispatchEvent(
      new Event('cart:change')
    );

  },


  // Cantidad total de productos
  count() {

    return this.items().reduce(
      (total, item) => total + item.qty,
      0
    );

  },


  // Cambiar cantidad
  setQty(id, qty) {

    const list = this.items();

    const item = list.find(x => x.id === id);

    if (!item) return;

    if (qty <= 0) {
      this.remove(id);
      return;
    }

    item.qty = qty;

    this.save(list);

  },


  // Eliminar un producto
  remove(id) {

    const list =
      this.items().filter(
        item => item.id !== id
      );

    this.save(list);

  },


  // Vaciar carrito
  clear() {

    localStorage.removeItem(CART_KEY);

    window.dispatchEvent(
      new Event('cart:change')
    );

  },


  // Formato de precios
  fmt(currency, value) {

    const number = Number(value) || 0;

    if (currency === 'USD') {

      return new Intl.NumberFormat(
        'en-US',
        {
          style: 'currency',
          currency: 'USD'
        }
      ).format(number);

    }

    return '$' + number.toLocaleString('es-MX');

  },


  // Calcular totales
  totals() {

    const list = this.items();

    const total = list.reduce(
      (sum, item) =>
        sum + (item.price * item.qty),
      0
    );

    return {
      LOC: total
    };

  }

};