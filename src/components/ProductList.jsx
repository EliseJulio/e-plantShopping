import { useMemo, useState } from 'react';
import { useDispatch } from 'react-redux';
import { addItem } from '../features/cart/CartSlice.jsx';

const products = [
  {
    id: 'monstera-deliciosa',
    name: 'Monstera Deliciosa',
    category: 'Statement plants',
    price: 38,
    description: 'A sculptural favorite with iconic split leaves.',
    image: 'photo-1501004318641-b39e6451bec6'
  },
  {
    id: 'snake-plant',
    name: 'Golden Snake Plant',
    category: 'Easy care',
    price: 26,
    description: 'A resilient, upright beauty for any bright corner.',
    image: 'photo-1509423350716-97f9360b4e09'
  },
  {
    id: 'peace-lily',
    name: 'Peace Lily',
    category: 'Flowering plants',
    price: 32,
    description: 'Glossy foliage and elegant, soft white blooms.',
    image: 'photo-1593691509543-c55fb32e5cee'
  },
  {
    id: 'pothos',
    name: 'Golden Pothos',
    category: 'Easy care',
    price: 22,
    description: 'A cheerful trailing plant that loves to climb.',
    image: 'photo-1614594975525-e45190c55d0b'
  },
  {
    id: 'rubber-plant',
    name: 'Ruby Rubber Plant',
    category: 'Statement plants',
    price: 44,
    description: 'Deep burgundy leaves bring a rich, bold color.',
    image: 'photo-1597055181300-a8dd5f4e6ec4'
  },
  {
    id: 'calathea',
    name: 'Calathea Orbifolia',
    category: 'Pet friendly',
    price: 36,
    description: 'Silvery patterned leaves with a gentle presence.',
    image: 'photo-1597055181449-b9b5c0a1d531'
  }
];

const categories = ['All plants', ...new Set(products.map((product) => product.category))];

export default function ProductList() {
  const dispatch = useDispatch();
  const [category, setCategory] = useState('All plants');
  const [search, setSearch] = useState('');
  const visibleProducts = useMemo(
    () =>
      products.filter((product) => {
        const matchesCategory = category === 'All plants' || product.category === category;
        const matchesSearch = product.name.toLowerCase().includes(search.trim().toLowerCase());
        return matchesCategory && matchesSearch;
      }),
    [category, search]
  );

  return (
    <section className="catalog-section" aria-labelledby="catalog-title">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Find your new favorite</p>
          <h2 id="catalog-title">Plants for every kind of home</h2>
        </div>
        <label className="search-label">
          <span className="sr-only">Search plants</span>
          <input
            type="search"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
            placeholder="Search plants"
          />
        </label>
      </div>

      <div className="category-list" aria-label="Filter plants by category">
        {categories.map((item) => (
          <button
            className={`category-button${category === item ? ' selected' : ''}`}
            key={item}
            onClick={() => setCategory(item)}
            type="button"
          >
            {item}
          </button>
        ))}
      </div>

      <div className="product-grid">
        {visibleProducts.map((product) => (
          <article className="product-card" key={product.id}>
            <img
              alt={product.name}
              loading="lazy"
              src={`https://images.unsplash.com/${product.image}?auto=format&fit=crop&w=900&q=85`}
            />
            <div className="product-info">
              <p className="product-category">{product.category}</p>
              <h3>{product.name}</h3>
              <p className="product-description">{product.description}</p>
              <div className="product-buy-row">
                <strong>${product.price.toFixed(2)}</strong>
                <button className="button button-small" onClick={() => dispatch(addItem(product))} type="button">
                  Add to cart
                </button>
              </div>
            </div>
          </article>
        ))}
      </div>
      {visibleProducts.length === 0 && <p className="empty-state">No plants match that search. Try another name.</p>}
    </section>
  );
}
