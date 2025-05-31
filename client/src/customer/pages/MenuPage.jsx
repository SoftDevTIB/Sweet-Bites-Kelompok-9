import React, { useEffect, useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import Header from '../components/header';
import Footer from '../components/footer';
import ProductCard from '../components/ProductCard';
import bannerImage from '../../assets/banner.png';
import './MenuPage.css';

const MenuPage = () => {
  const [products, setProducts] = useState([]);
  const [search, setSearch] = useState('');
  const [sortBy, setSortBy] = useState('');
  const [order, setOrder] = useState('asc');
  const [available, setAvailable] = useState('');
  const [showFilters, setShowFilters] = useState(false);

  const fetchProducts = () => {
    let url = '/api/products?';
    if (search) url += `search=${encodeURIComponent(search)}&`;
    if (sortBy) url += `sortBy=${sortBy}&order=${order}&`;
    if (available) url += `available=${available}&`;

    fetch(url)
      .then(res => res.json())
      .then(data => setProducts(data))
      .catch(err => console.error('Failed to fetch products:', err));
  };

  useEffect(() => {
    fetchProducts();
  }, [search, sortBy, order, available]);

  const formatPrice = (price) => {
    if (typeof price === 'number') {
      return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    if (typeof price === 'string') {
      const numericPrice = price.replace(/\D/g, '');
      return numericPrice.replace(/\B(?=(\d{3})+(?!\d))/g, '.');
    }
    return price;
  };

  return (
    <>
      <Header />
      <main className="container" style={{ backgroundColor: '#FFF2F2' }}>
        <img src={bannerImage} alt="Banner" className="menu-banner" />
        <h2 className="text-center mb-4" style={{ color: '#D67832' }}>Temukan Pilihanmu</h2>

        <div className="search-filter-container mb-4 d-flex justify-content-center align-items-center flex-wrap gap-3" style={{ maxWidth: '920px', margin: '0 auto' }}>
          <div className="d-flex align-items-center" style={{ position: 'relative', flex: '1 1 700px' }}>
            <input
              type="text"
              placeholder="Cari nama produk..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="search-input"
              style={{ backgroundColor: 'white', borderRadius: '20px', border: '1px solid #D67832', height: '40px', width: '100%', paddingLeft: '15px', paddingRight: '40px', color: 'black', textAlign: 'center' }}
            />
            <FiSearch style={{ position: 'absolute', right: '10px', cursor: 'pointer', color: '#D67832' }} size={20} />
          </div>

          <FiFilter
            style={{ cursor: 'pointer', color: '#D67832', marginLeft: '10px' }}
            size={20}
            onClick={() => setShowFilters(!showFilters)}
          />

          {showFilters && (
            <div className="d-flex flex-wrap justify-content-center gap-3" style={{ backgroundColor: 'white', padding: '10px', borderRadius: '20px', border: '1px solid #D67832' }}>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)} className="filter-select" style={{ backgroundColor: 'white', color: 'black', borderRadius: '20px', border: '1px solid #D67832', height: '40px', padding: '0 10px', minWidth: '150px' }}>
                <option value="name">Nama Produk</option>
                <option value="price">Harga</option>
              </select>

              <select value={order} onChange={(e) => setOrder(e.target.value)} className="filter-select" style={{ backgroundColor: 'white', color: 'black', borderRadius: '20px', border: '1px solid #D67832', height: '40px', padding: '0 10px', minWidth: '100px' }}>
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>

              <select value={available} onChange={(e) => setAvailable(e.target.value)} className="filter-select" style={{ backgroundColor: 'white', color: 'black', borderRadius: '20px', border: '1px solid #D67832', height: '40px', padding: '0 10px', minWidth: '150px' }}>
                <option value="true">Tersedia</option>
                <option value="false">Tidak tersedia</option>
              </select>
            </div>
          )}
        </div>

<div className="d-flex flex-wrap justify-content-center product-cards-container">
  {products.map(product => (
    <ProductCard
      key={product._id}
      id={product._id}
      name={product.productName}
      price={formatPrice(product.price)}
      available={product.stock > 0}
      imageUrl={product.photo ? `/uploads/${product.photo}` : ''}
    />
  ))}
</div>
      </main>
      <Footer />
    </>
  );
};

export default MenuPage;
