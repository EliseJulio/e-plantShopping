import { useState } from 'react';
import { useSelector } from 'react-redux';
import AboutUs from './components/AboutUs.jsx';
import CartItem from './components/CartItem.jsx';
import ProductList from './components/ProductList.jsx';

export default function App() {
  const [page, setPage] = useState('home');
  const itemCount = useSelector((state) =>
    state.cart.items.reduce((total, item) => total + item.quantity, 0)
  );

  function startShopping() {
    setPage('shop');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  return (
    <div className="app-shell">
      <header className="site-header">
        <a className="brand" href="#home" onClick={() => setPage('home')}>
          <span className="brand-mark" aria-hidden="true">✿</span>
          <span>Paradise <em>Nursery</em></span>
        </a>
        <nav aria-label="Main navigation">
          <button className={page === 'shop' ? 'nav-link active' : 'nav-link'} onClick={() => setPage('shop')} type="button">Shop</button>
          <button className={page === 'about' ? 'nav-link active' : 'nav-link'} onClick={() => setPage('about')} type="button">Our story</button>
          <button className="cart-link" onClick={() => setPage('cart')} type="button" aria-label={`Shopping cart, ${itemCount} items`}>
            Bag <span>{itemCount}</span>
          </button>
        </nav>
      </header>

      {page === 'home' && (
        <main id="home">
          <section className="hero">
            <div className="hero-content">
              <p className="eyebrow light-eyebrow">A greener kind of happy</p>
              <h1>Grow your<br /><em>happy place.</em></h1>
              <p className="hero-copy">
                Thoughtfully grown plants, friendly advice, and a little more nature for wherever you call home.
              </p>
              <button className="button button-light" onClick={startShopping} type="button">Get Started <span aria-hidden="true">→</span></button>
            </div>
            <div className="hero-caption"><span>01 / 03</span> Find room to grow</div>
          </section>
          <div className="home-intro">
            <span>Good plants. Good energy.</span>
            <button className="text-button" onClick={() => setPage('shop')} type="button">Meet your next plant <span aria-hidden="true">→</span></button>
          </div>
          <AboutUs />
        </main>
      )}
      {page === 'shop' && <main><ProductList /></main>}
      {page === 'about' && <main><AboutUs /></main>}
      {page === 'cart' && <main><CartItem onContinueShopping={() => setPage('shop')} /></main>}

      <footer className="site-footer">
        <span>Paradise Nursery</span>
        <span>Rooted in care. Growing with you.</span>
      </footer>
    </div>
  );
}
