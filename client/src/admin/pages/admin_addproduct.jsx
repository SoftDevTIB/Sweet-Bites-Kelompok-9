import { useState } from 'react';
import { BsUpload } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/admin_layout';
import '../components/admin_menu.css';

const AddProductPage = () => {
    const [gambar, setGambar] = useState(null);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) setGambar(URL.createObjectURL(file));
    };

    return (
        <AdminLayout>
            <section className="container-md admin-section" style={{ maxWidth: '900px' }}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                    <li className="breadcrumb-item">Produk</li>
                    <li className="breadcrumb-item active" aria-current="page">Tambah Produk</li>
                    </ol>
                </nav>

                <h4 className="fw-bold mb-4">Tambah Produk</h4>

                <div className="p-4 rounded-4 shadow-sm box">
                    <form>
                    <div className="row g-4 align-items-start">
                        {/* Upload Gambar */}
                        <div className="col-md-4 text-center">
                        <label
                            htmlFor="uploadGambar"
                            className="d-flex flex-column justify-content-center align-items-center picture"
                        >
                            {gambar ? (
                            <img
                                src={gambar}
                                alt="Preview"
                                className="img-fluid h-100 w-100 object-fit-cover rounded"
                            />
                            ) : (
                            <>
                                <BsUpload size={32} />
                                <span className="mt-2">Tambah Gambar</span>
                            </>
                            )}
                        </label>
                        <input
                            id="uploadGambar"
                            type="file"
                            accept="image/*"
                            onChange={handleUpload}
                            hidden
                        />
                        </div>

                        {/* Form Input */}
                        <div className="col-md-8">
                        <div className="mb-3">
                            <label className="form-label">Nama:</label>
                            <input type="text" className="form-control border-orange" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Harga:</label>
                            <input type="number" className="form-control border-orange" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Stok:</label>
                            <input type="number" className="form-control border-orange" />
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Deskripsi Produk:</label>
                            <textarea rows="4" className="form-control border-orange" />
                        </div>

                        <div className="d-flex gap-3 mt-4">
                            <button type="submit" className="btn btn-teal rounded-pill px-4">Tambah</button>
                            <Link to="/admin/menu" className='btn btn-outline-dark rounded-pill px-4'>Batal</Link>
                        </div>
                        </div>
                    </div>
                    </form>
                </div>
            </section>
        </AdminLayout>
    );
};

export default AddProductPage;