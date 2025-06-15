import React, { useEffect, useState } from 'react';
import { FiSearch, FiFilter } from 'react-icons/fi';
import Header from '../components/header';
import Footer from '../components/footer';
import ProductCard from '../components/ProductCard';
import bannerImage from '../../assets/banner.png';
import './MenuPage.css';

const backendUrl = import.meta.env.VITE_BACKEND_URL || '';

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
      <main className="menu-main">
        <div className="banner-container">
          <img src={bannerImage} alt="Banner" className="menu-banner" />
        </div>
        <h2 className="text-center mb-4 text-oren">Temukan Pilihanmu</h2>

        <div className="search-filter-container">
          <div className="search-filter-top">
            <div className="input-box">
              <input
                type="text"
                placeholder="Cari nama produk..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
                className="search-input"
              />
              <FiSearch className="search-icon" size={20} />
            </div>
            <FiFilter
              className="filter-icon"
              size={20}
              onClick={() => setShowFilters(!showFilters)}
            />
          </div>

          {showFilters && (
            <div className="filter-dropdown">
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="filter-select"
              >
                <option value="name">Nama Produk</option>
                <option value="price">Harga</option>
              </select>

              <select
                value={order}
                onChange={(e) => setOrder(e.target.value)}
                className="filter-select"
              >
                <option value="asc">Asc</option>
                <option value="desc">Desc</option>
              </select>

              <select
                value={available}
                onChange={(e) => setAvailable(e.target.value)}
                className="filter-select"
              >
                <option value="true">Tersedia</option>
                <option value="false">Tidak tersedia</option>
              </select>
            </div>
          )}
        </div>

        <div className="d-flex flex-wrap justify-content-center container cards-container mb-5">
          {products.map(product => (
            <ProductCard
              key={product._id}
              id={product._id}
              name={product.productName}
              price={formatPrice(product.price)}
              stock={product.stock}
              imageUrl={product.photo ? `${backendUrl}/uploads/${product.photo}` : ''}
            />
          ))}
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MenuPage;
