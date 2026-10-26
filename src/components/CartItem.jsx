import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../features/cart/CartSlice.jsx';

export default function CartItem({ onContinueShopping }) {
  const cart = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = cart.reduce((sum, item) => sum + item.price * item.quantity, 0);

  function handleIncrement(id, quantity) {
    dispatch(updateQuantity({ id, quantity: quantity + 1 }));
  }

  function handleDecrement(id, quantity) {
    if (quantity > 1) dispatch(updateQuantity({ id, quantity: quantity - 1 }));
  }

  function handleContinueShopping(event) {
    event.preventDefault();
    onContinueShopping();
  }

  if (cart.length === 0) {
    return (
      <section className="cart-container empty-cart" aria-labelledby="cart-title">
        <p className="eyebrow">Your basket</p>
        <h2 id="cart-title">Your cart is taking a little breather.</h2>
        <p>Find a leafy friend and it will show up here.</p>
        <button className="button get-started-button" onClick={handleContinueShopping} type="button">Continue Shopping</button>
      </section>
    );
  }

  return (
    <section className="cart-container" aria-labelledby="cart-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Your basket</p>
          <h2 id="cart-title">A little green is on its way</h2>
        </div>
        <button className="text-button get-started-button" onClick={handleContinueShopping} type="button">
          Continue Shopping
        </button>
      </div>
      <div className="cart-layout">
        <div className="cart-lines">
          {cart.map((item) => (
            <article className="cart-item" key={item.id}>
              <img className="cart-item-image" src={item.image} alt={item.name} />
              <div className="cart-line-info">
                <h3>{item.name}</h3>
                <p>Unit price: ${item.price.toFixed(2)}</p>
                <button className="remove-button" onClick={() => dispatch(removeItem(item.id))} type="button">
                  Delete
                </button>
              </div>
              <div className="quantity-stepper" aria-label={`Quantity for ${item.name}`}>
                <button aria-label={`Decrease ${item.name} quantity`} disabled={item.quantity <= 1} onClick={() => handleDecrement(item.id, item.quantity)} type="button">−</button>
                <span>{item.quantity}</span>
                <button aria-label={`Increase ${item.name} quantity`} onClick={() => handleIncrement(item.id, item.quantity)} type="button">+</button>
              </div>
              <strong className="line-total">${(item.price * item.quantity).toFixed(2)}</strong>
            </article>
          ))}
        </div>
        <aside className="order-summary">
          <h3>Order summary</h3>
          <div><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div>
          <div><span>Delivery</span><strong>Calculated at checkout</strong></div>
          <div className="summary-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
          <button className="button checkout-button" onClick={() => window.alert('Checkout Coming Soon!')} type="button">
            Checkout
          </button>
          <p className="checkout-note">Plant happiness, packed with care.</p>
        </aside>
      </div>
    </section>
  );
}
