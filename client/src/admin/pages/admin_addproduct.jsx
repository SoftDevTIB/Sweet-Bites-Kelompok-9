import { useState } from 'react';
import { BsUpload } from 'react-icons/bs';
import { Link } from 'react-router-dom';
import AdminLayout from '../components/admin_layout';

const AddProductPage = () => {
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [photoFile, setPhotoFile] = useState(null);
    const [gambarPreview, setGambarPreview] = useState(null); 

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            setGambarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('description', description);
        formData.append('photo', photoFile);
        for (let pair of formData.entries()) {
  console.log(pair[0]+ ', ' + pair[1]);
}


        try {
            const res = await fetch('http://localhost:5000/api/products', {
                method: 'POST',
                body: formData,
            });

            if (res.ok) {
                alert('Produk berhasil ditambahkan!');
                // Reset form
                setProductName('');
                setPrice('');
                setStock('');
                setDescription('');
                setPhotoFile(null);
                setGambarPreview(null);
            } else {
                alert('Gagal menambahkan produk');
            }
        } catch (err) {
            console.error(err);
            alert('Terjadi kesalahan');
        }
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
                    <form onSubmit={handleSubmit}>
                        <div className="row g-4 align-items-start">
                            {/* Upload Gambar */}
                            <div className="col-md-4 col-sm-4 text-center box-gambar">
                                <label
                                    htmlFor="uploadGambar"
                                    className="d-flex flex-column justify-content-center align-items-center picture"
                                >
                                    {gambarPreview ? (
                                        <img
                                            src={gambarPreview}
                                            alt="Preview"
                                            className="img-fluid h-100 w-100 object-fit-cover rounded"
                                        />
                                    ) : (
                                        <>
                                            <div className='caption-up-gambar'>
                                                <BsUpload className='caption-up-gambar' />
                                                <br />
                                                <span className="mt-2 caption-up-gambar">Tambah Gambar</span>
                                            </div>
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
                            <div className="col-md-8 col-sm-8">
                                <div className="mb-3">
                                    <label className="form-label">Nama:</label>
                                    <input
                                        type="text"
                                        className="form-control border-orange"
                                        value={productName}
                                        onChange={(e) => setProductName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Harga:</label>
                                    <input
                                        type="number"
                                        className="form-control border-orange"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Stok:</label>
                                    <input
                                        type="number"
                                        className="form-control border-orange"
                                        value={stock}
                                        onChange={(e) => setStock(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="mb-3">
                                    <label className="form-label">Deskripsi Produk:</label>
                                    <textarea
                                        rows="4"
                                        className="form-control border-orange"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="d-flex gap-3 mt-4">
                                    <button type="submit" className="btn admin-btn-teal rounded-pill px-4">Tambah</button>
                                    <Link to="/admin/menu" className='btn btn-outline-dark rounded-pill px-4 cancel-btn'>Batal</Link>
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
