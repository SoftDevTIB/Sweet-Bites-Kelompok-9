import React, { useState } from 'react';
import Header from '../components/header';
import Footer from '../components/footer';
import './Kontak.css';
import { BsWhatsapp, BsInstagram } from "react-icons/bs";
import axios from 'axios';

const Kontak = () => {
  const [form, setForm] = useState({
    name: '',
    email: '',
    phone: '',
    message: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/api/contact', form, {
      });

      console.log('Form dikirim:', response.data);
      alert('Pesan berhasil dikirim!');
      setForm({ name: '', email: '', phone: '', message: '' });
    } catch (error) {
      console.error('Error:', error);
      if (error.response?.status === 401) {
        alert('Silakan login terlebih dahulu untuk mengirim pesan');
      } else {
        alert('Gagal mengirim pesan. Silakan coba lagi.');
      }
    }
  };

  return (
    <>
      <Header />
      <div className="kontak-container">
        <div className="kontak-left">
          <h2>Hubungi Kami</h2>
          <p>
            Silakan hubungi kami melalui kontak di bawah ini, atau dengan
            mengisi formulir di samping.
          </p>
          <div className="kontak-info">
            <BsWhatsapp className="kontak-icon" />
            <span>0813 XXXX XXXX</span>
          </div>
          <div className="kontak-info">
            <BsInstagram className="kontak-icon" />
            <span>@sweetBites</span>
          </div>
        </div>

        <div className="kontak-right">
          <form onSubmit={handleSubmit} className="kontak-form">
            <label htmlFor="name">Nama:</label>
            <input
              type="text"
              id="name"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

            <label htmlFor="email">Email:</label>
            <input
              type="email"
              id="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              required
            />

            <label htmlFor="phone">No telp (opsional):</label>
            <input
              type="tel"
              id="phone"
              name="phone"
              value={form.phone}
              onChange={handleChange}
            />

            <label htmlFor="message">Pesan:</label>
            <textarea
              id="message"
              name="message"
              rows="4"
              value={form.message}
              onChange={handleChange}
              required
            ></textarea>

            <div className="d-flex justify-content-center">
              <button type="submit" className='btn btn-teal rounded-pill px-5'>Kirim</button>
            </div>
          </form>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Kontak;