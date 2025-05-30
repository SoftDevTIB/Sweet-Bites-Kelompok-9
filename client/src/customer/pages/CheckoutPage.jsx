import React, { useState, useEffect } from 'react';
import { useCart } from '../context/CartContext';
import Header from '../components/header';
import Footer from '../components/footer';
import './CheckoutPage.css';

const jakartaData = [
  { regency: "Jakarta Selatan", districts: [
      { district: "Kebayoran Baru", villages: [
          { village: "Gandaria Selatan", code: "12140" },
          { village: "Kebayoran Baru", code: "12120" },
          { village: "Pulo", code: "12110" },
        ]
      },
      { district: "Cilandak", villages: [
          { village: "Cilandak Barat", code: "12430" },
          { village: "Cilandak Timur", code: "12440" },
          { village: "Gandaria Selatan", code: "12420" },
        ]
      }
    ]
  },
  { regency: "Jakarta Barat", districts: [
      { district: "Cengkareng", villages: [
          { village: "Kedaung Kali Angke", code: "11710" },
          { village: "Cengkareng Barat", code: "11720" },
          { village: "Cengkareng Timur", code: "11730" },
        ]
      },
      { district: "Kebon Jeruk", villages: [
          { village: "Kebon Jeruk", code: "11530" },
          { village: "Duri Kepa", code: "11520" },
          { village: "Kelapa Dua", code: "11510" },
        ]
      }
    ]
  },
  { regency: "Jakarta Timur", districts: [
      { district: "Matraman", villages: [
          { village: "Pal Meriam", code: "13140" },
          { village: "Pisangan Baru", code: "13150" },
          { village: "Kayu Manis", code: "13130" },
        ]
      },
      { district: "Kramat Jati", villages: [
          { village: "Cawang", code: "13510" },
          { village: "Kramat Jati", code: "13520" },
          { village: "Balekambang", code: "13530" },
        ]
      }
    ]
  },
  { regency: "Jakarta Utara", districts: [
      { district: "Penjaringan", villages: [
          { village: "Pejagalan", code: "14410" },
          { village: "Penjaringan", code: "14420" },
          { village: "Pluit", code: "14430" },
        ]
      },
      { district: "Tanjung Priok", villages: [
          { village: "Sunda Kelapa", code: "14310" },
          { village: "Tanjung Priok", code: "14320" },
          { village: "Sumber Rejo", code: "14330" },
        ]
      }
    ]
  },
  { regency: "Jakarta Pusat", districts: [
      { district: "Gambir", villages: [
          { village: "Gambir", code: "10110" },
          { village: "Cideng", code: "10150" },
          { village: "Petojo Selatan", code: "10160" },
        ]
      },
      { district: "Tanah Abang", villages: [
          { village: "Kebon Kacang", code: "10230" },
          { village: "Kebon Melati", code: "10220" },
          { village: "Kampung Bali", code: "10240" },
        ]
      }
    ]
  }
];

const CheckoutPage = () => {
  const { cartItems } = useCart();

  const [provinsi] = useState('DKI Jakarta');
  const [kota, setKota] = useState('');
  const [kecamatan, setKecamatan] = useState('');
  const [kelurahan, setKelurahan] = useState('');
  const [kodePos, setKodePos] = useState('');
  const [alamat, setAlamat] = useState('');

  const [kotaList, setKotaList] = useState([]);
  const [kecamatanList, setKecamatanList] = useState([]);
  const [kelurahanList, setKelurahanList] = useState([]);

  useEffect(() => {
    // populate kota
    setKotaList(jakartaData.map(j => j.regency));
    // restore saved
    const sK = localStorage.getItem('checkout_kota') || '';
    const sC = localStorage.getItem('checkout_kecamatan') || '';
    const sV = localStorage.getItem('checkout_kelurahan') || '';
    const sCode = localStorage.getItem('checkout_kodePos') || '';
    const sAddr = localStorage.getItem('checkout_alamat') || '';
    setKota(sK); setAlamat(sAddr);
    if (sK) {
      const kd = jakartaData.find(j=>j.regency===sK);
      setKecamatanList(kd?.districts.map(d=>d.district)||[]);
    }
    setKecamatan(sC);
    if (sK && sC) {
      const kd = jakartaData.find(j=>j.regency===sK);
      const dc = kd?.districts.find(d=>d.district===sC);
      setKelurahanList(dc?.villages.map(v=>v.village)||[]);
    }
    setKelurahan(sV);
    setKodePos(sCode);
  }, []);

  useEffect(() => {
    if (!kota) return;
    const kd = jakartaData.find(j=>j.regency===kota);
    setKecamatanList(kd?.districts.map(d=>d.district)||[]);
    setKecamatan(''); setKelurahan(''); setKelurahanList([]); setKodePos('');
    localStorage.setItem('checkout_kota', kota);
    localStorage.removeItem('checkout_kecamatan');
    localStorage.removeItem('checkout_kelurahan');
    localStorage.removeItem('checkout_kodePos');
  }, [kota]);

  useEffect(() => {
    if (!kecamatan) return;
    const kd = jakartaData.find(j=>j.regency===kota);
    const dc = kd?.districts.find(d=>d.district===kecamatan);
    setKelurahanList(dc?.villages.map(v=>v.village)||[]);
    setKelurahan(''); setKodePos('');
    localStorage.setItem('checkout_kecamatan', kecamatan);
    localStorage.removeItem('checkout_kelurahan');
    localStorage.removeItem('checkout_kodePos');
  }, [kecamatan]);

  useEffect(() => {
    if (!kelurahan) return;
    const kd = jakartaData.find(j=>j.regency===kota);
    const dc = kd?.districts.find(d=>d.district===kecamatan);
    const vl = dc?.villages.find(v=>v.village===kelurahan);
    if (vl) {
      setKodePos(vl.code);
      localStorage.setItem('checkout_kelurahan', kelurahan);
      localStorage.setItem('checkout_kodePos', vl.code);
    }
  }, [kelurahan]);

  const handleAlamatChange = e => {
    setAlamat(e.target.value);
    localStorage.setItem('checkout_alamat', e.target.value);
  };

  const formatPrice = price => `Rp ${price.toLocaleString('id-ID')}`;
  const totalItems = cartItems.reduce((sum,i)=>sum+i.quantity,0);
  const subtotal = cartItems.reduce((sum,i)=>sum+i.quantity*i.price,0);
  const ongkir = 10000;
  const total = subtotal + ongkir;

  const handleCheckout = async () => {
    if (!kota||!kecamatan||!kelurahan||!alamat||!kodePos) {
      alert('Lengkapi data alamat.'); return;
    }
    const token = localStorage.getItem('token');
    try {
      const up = await fetch('http://localhost:5000/api/users/update-address',{
        method:'POST',headers:{'Content-Type':'application/json',Authorization:`Bearer ${token}`},
        body:JSON.stringify({province:provinsi,kota,kecamatan,kelurahan,alamat,kodePos})
      });
      if(!up.ok){alert('Gagal update alamat.');return;}
      const od = await fetch('http://localhost:5000/api/orders',{method:'POST',headers:{'Content-Type':'application/json'},body:JSON.stringify({province:provinsi,kota,kecamatan,kelurahan,alamat,kodePos,cartItems})});
      od.ok?alert('Pesanan berhasil!'):alert('Gagal kirim pesanan.');
    } catch(e){console.error(e);alert('Error proses.');}
  };

  return (
    <>
      <Header />
      <div className="checkout-container">
        <div className="checkout-content-container">
          <h2 className="checkout-title">Check Out</h2>
          <p className="checkout-subtitle">*Hanya DKI Jakarta & sameday (pesan sebelum 16:00)</p>

          <div className="address-section">
            <h5>Alamat</h5>
            <div className="address-box">
              <select className="address-input" value={kota} onChange={e=>setKota(e.target.value)}>
                <option value="">--Pilih Kota--</option>
                {kotaList.map((k,i)=><option key={i} value={k}>{k}</option>)}
              </select>

              <select className="address-input" value={kecamatan} onChange={e=>setKecamatan(e.target.value)} disabled={!kota}>
                <option value="">--Pilih Kecamatan--</option>
                {kecamatanList.map((c,i)=><option key={i} value={c}>{c}</option>)}
              </select>

              <select className="address-input" value={kelurahan} onChange={e=>setKelurahan(e.target.value)} disabled={!kecamatan}>
                <option value="">--Pilih Kelurahan--</option>
                {kelurahanList.map((v,i)=><option key={i} value={v}>{v}</option>)}
              </select>

              <input className="address-input" type="text" placeholder="Kode Pos" value={kodePos} readOnly />
              <input className="address-input" type="text" placeholder="Alamat lengkap" value={alamat} onChange={handleAlamatChange} />
            </div>
          </div>

          <div className="order-section">
            <div className="order-items">
              <h5>Pesanan</h5>
              {cartItems.map(item=>(
                <div key={item.id} className="order-item">
                  <img src={item.imageUrl} alt={item.name} />
                  <div className="order-item-details">
                    <h6>{item.name}</h6>
                    <p>{formatPrice(item.price)}</p>
                  </div>
                  <div>{item.quantity} x</div>
                  <div>{formatPrice(item.quantity*item.price)}</div>
                </div>
              ))}
            </div>

            <div className="order-summary">
              <p>Total Item <span style={{float:'right'}}>{totalItems}</span></p>
              <p>Subtotal <span style={{float:'right'}}>{formatPrice(subtotal)}</span></p>
              <p>Ongkir <span style={{float:'right'}}>{formatPrice(ongkir)}</span></p>
              <hr />
              <p><strong>Total <span style={{float:'right'}}>{formatPrice(total)}</span></strong></p>
              <button className="payment-button" onClick={handleCheckout} disabled={cartItems.length===0}>
            Pembayaran
          </button>
            </div>
            
          </div>


          
          
        </div>
      </div>
      <Footer />
    </>
  );
};

export default CheckoutPage;
