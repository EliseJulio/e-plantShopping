import { useDispatch, useSelector } from 'react-redux';
import { removeItem, updateQuantity } from '../features/cart/CartSlice.jsx';

export default function CartItem({ onContinueShopping }) {
  const items = useSelector((state) => state.cart.items);
  const dispatch = useDispatch();
  const total = items.reduce((sum, item) => sum + item.price * item.quantity, 0);

  if (items.length === 0) {
    return (
      <section className="cart-section empty-cart" aria-labelledby="cart-title">
        <p className="eyebrow">Your basket</p>
        <h2 id="cart-title">Your cart is taking a little breather.</h2>
        <p>Find a leafy friend and it will show up here.</p>
        <button className="button" onClick={onContinueShopping} type="button">Explore plants</button>
      </section>
    );
  }

  return (
    <section className="cart-section" aria-labelledby="cart-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Your basket</p>
          <h2 id="cart-title">A little green is on its way</h2>
        </div>
        <button className="text-button" onClick={onContinueShopping} type="button">Continue shopping</button>
      </div>
      <div className="cart-layout">
        <div className="cart-lines">
          {items.map((item) => (
            <article className="cart-line" key={item.id}>
              <div className="cart-plant-icon" aria-hidden="true">✿</div>
              <div className="cart-line-info">
                <h3>{item.name}</h3>
                <p>${item.price.toFixed(2)} each</p>
                <button className="remove-button" onClick={() => dispatch(removeItem(item.id))} type="button">
                  Remove
                </button>
              </div>
              <label className="quantity-control">
                <span>Qty</span>
                <input
                  aria-label={`Quantity for ${item.name}`}
                  min="1"
                  onChange={(event) => dispatch(updateQuantity({ id: item.id, quantity: event.target.value }))}
                  type="number"
                  value={item.quantity}
                />
              </label>
              <strong className="line-total">${(item.price * item.quantity).toFixed(2)}</strong>
            </article>
          ))}
        </div>
        <aside className="order-summary">
          <h3>Order summary</h3>
          <div><span>Subtotal</span><strong>${total.toFixed(2)}</strong></div>
          <div><span>Delivery</span><strong>Calculated at checkout</strong></div>
          <div className="summary-total"><span>Total</span><strong>${total.toFixed(2)}</strong></div>
          <button className="button checkout-button" onClick={() => window.alert('Thanks for growing with us!')} type="button">
            Continue to checkout
          </button>
          <p className="checkout-note">Plant happiness, packed with care.</p>
        </aside>
      </div>
    </section>
  );
}
