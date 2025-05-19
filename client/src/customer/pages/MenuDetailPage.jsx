import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { FaShoppingCart } from 'react-icons/fa';
import Header from '../components/header';
import Footer from '../components/footer';
import gambar1 from '../../assets/Choco_oreo.jpg';

const products = [
  {
    id: '1',
    name: 'Choco Oreo',
    price: '10.000',
    available: true,
    imageUrl: gambar1,
    description: `Choco Oreo adalah kue cokelat lembut yang dipanggang sempurna dengan topping Oreo utuh di bagian atasnya. 
    Setiap gigitan memberikan rasa cokelat yang rich dan manis, dipadukan dengan kerenyahan khas Oreo yang bikin nagih. 
    Kue ini cocok untuk pencinta cokelat dan Oreo, sempurna dinikmati sebagai camilan, hidangan penutup, atau teman minum teh di sore hari.`,
  },
  {
    id: '2',
    name: 'Choco Oreo',
    price: '10.000',
    available: true,
    imageUrl: gambar1,
    description: `Choco Oreo adalah kue cokelat lembut yang dipanggang sempurna dengan topping Oreo utuh di bagian atasnya. 
    Setiap gigitan memberikan rasa cokelat yang rich dan manis, dipadukan dengan kerenyahan khas Oreo yang bikin nagih. 
    Kue ini cocok untuk pencinta cokelat dan Oreo, sempurna dinikmati sebagai camilan, hidangan penutup, atau teman minum teh di sore hari.`,
  },
  {
    id: '3',
    name: 'Choco Oreo',
    price: '10.000',
    available: true,
    imageUrl: gambar1,
    description: `Choco Oreo adalah kue cokelat lembut yang dipanggang sempurna dengan topping Oreo utuh di bagian atasnya. 
    Setiap gigitan memberikan rasa cokelat yang rich dan manis, dipadukan dengan kerenyahan khas Oreo yang bikin nagih. 
    Kue ini cocok untuk pencinta cokelat dan Oreo, sempurna dinikmati sebagai camilan, hidangan penutup, atau teman minum teh di sore hari.`,
  },
  {
    id: '4',
    name: 'Choco Oreo',
    price: '10.000',
    available: true,
    imageUrl: gambar1,
    description: `Choco Oreo adalah kue cokelat lembut yang dipanggang sempurna dengan topping Oreo utuh di bagian atasnya. 
    Setiap gigitan memberikan rasa cokelat yang rich dan manis, dipadukan dengan kerenyahan khas Oreo yang bikin nagih. 
    Kue ini cocok untuk pencinta cokelat dan Oreo, sempurna dinikmati sebagai camilan, hidangan penutup, atau teman minum teh di sore hari.`,
  },
  {
    id: '5',
    name: 'Choco Oreo',
    price: '10.000',
    available: true,
    imageUrl: gambar1,
    description: `Choco Oreo adalah kue cokelat lembut yang dipanggang sempurna dengan topping Oreo utuh di bagian atasnya. 
    Setiap gigitan memberikan rasa cokelat yang rich dan manis, dipadukan dengan kerenyahan khas Oreo yang bikin nagih. 
    Kue ini cocok untuk pencinta cokelat dan Oreo, sempurna dinikmati sebagai camilan, hidangan penutup, atau teman minum teh di sore hari.`,
  },
  {
    id: '6',
    name: 'Choco Oreo',
    price: '10.000',
    available: true,
    imageUrl: gambar1,
    description: `Choco Oreo adalah kue cokelat lembut yang dipanggang sempurna dengan topping Oreo utuh di bagian atasnya. 
    Setiap gigitan memberikan rasa cokelat yang rich dan manis, dipadukan dengan kerenyahan khas Oreo yang bikin nagih. 
    Kue ini cocok untuk pencinta cokelat dan Oreo, sempurna dinikmati sebagai camilan, hidangan penutup, atau teman minum teh di sore hari.`,
  },
];

const MenuDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const product = products.find(p => p.id === id);

  if (!product) {
    return (
      <>
        <Header />
        <main className="container p-4">
          <h2>Product not found</h2>
          <button onClick={() => navigate('/menu')} className="btn btn-primary">Back to Menu</button>
        </main>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Header />
      <main className="container p-4" style={{ backgroundColor: '#FFF2F2' }}>
        <div className="row align-items-center">
          <div className="col-md-6">
            <img src={product.imageUrl} alt={product.name} className="img-fluid rounded" />
          </div>
          <div className="col-md-6">
            <h2 style={{ color: '#3B7883' }}>{product.name}</h2>
<p style={{ color: 'black' }}>{product.description}</p>
            <p style={{ color: product.available ? '#D67832' : 'gray' }}>
              {product.available ? 'Tersedia' : 'Tidak tersedia'}
            </p>
            <h4 style={{ color: '#3B7883' }}>Rp {product.price}</h4>
            <button className="btn btn-success me-2" disabled={!product.available}>
              <FaShoppingCart /> Add To Cart
            </button>
            <button className="btn btn-outline-secondary">
              Beli Sekarang
            </button>
          </div>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default MenuDetailPage;
