import { useState } from 'react';
import AboutUs from './components/AboutUs.jsx';
import CartItem from './components/CartItem.jsx';
import ProductList, { Navbar } from './components/ProductList.jsx';

export default function App() {
  const [showProductList, setShowProductList] = useState(false);
  const [showCart, setShowCart] = useState(false);
  const [showAbout, setShowAbout] = useState(false);

  function handleGetStartedClick() {
    setShowProductList(true);
    setShowCart(false);
    setShowAbout(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  function handleNavigate(page) {
    setShowProductList(page === 'shop');
    setShowCart(page === 'cart');
    setShowAbout(page === 'about');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const currentPage = showCart ? 'cart' : showAbout ? 'about' : showProductList ? 'shop' : 'home';

  return (
    <div className="app-container">
      {!showProductList && !showCart && <Navbar currentPage={currentPage} onNavigate={handleNavigate} />}

      {!showProductList && !showCart && !showAbout && (
        <main id="home">
          <section className="hero background-image">
            <div className="hero-content">
              <p className="eyebrow light-eyebrow">A greener kind of happy</p>
              <h1>Welcome to<br /><em>Paradise Nursery</em></h1>
              <p className="hero-copy">
                Thoughtfully grown plants, friendly advice, and a little more nature for wherever you call home.
              </p>
              <button className="button button-light" onClick={handleGetStartedClick} type="button">
                Get Started <span aria-hidden="true">→</span>
              </button>
            </div>
            <div className="hero-caption"><span>01 / 03</span> Find room to grow</div>
          </section>
          <div className="home-intro">
            <span>Good plants. Good energy.</span>
            <button className="text-button" onClick={handleGetStartedClick} type="button">Meet your next plant <span aria-hidden="true">→</span></button>
          </div>
          <AboutUs />
        </main>
      )}
      {showProductList && <main><ProductList onNavigate={handleNavigate} /></main>}
      {showAbout && <main><AboutUs /></main>}
      {showCart && <main><CartItem onContinueShopping={handleGetStartedClick} onNavigate={handleNavigate} /></main>}

      <footer className="site-footer">
        <span>Paradise Nursery</span>
        <span>Rooted in care. Growing with you.</span>
      </footer>
    </div>
  );
}
