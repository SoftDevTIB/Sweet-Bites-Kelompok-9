import { useEffect, useState } from 'react';
import { useParams, useNavigate, Link } from 'react-router-dom';
import { BsUpload } from 'react-icons/bs';
import AdminLayout from '../components/AdminLayout';

const backendUrl = import.meta.env.VITE_API_URL;

const EditProductPage = () => {
    const { productId } = useParams();
    const navigate = useNavigate();
    const [productName, setProductName] = useState('');
    const [price, setPrice] = useState('');
    const [stock, setStock] = useState('');
    const [description, setDescription] = useState('');
    const [photoFile, setPhotoFile] = useState(null);
    const [gambarPreview, setGambarPreview] = useState(null);
    const [showModal1, setShowModal1] = useState(false);
    const [showModal2, setShowModal2] = useState(false);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const res = await fetch(`${backendUrl}/api/products/${productId}`);
                const data = await res.json();
                setProductName(data.productName);
                setPrice(data.price);
                setStock(data.stock);
                setDescription(data.description);
                setGambarPreview(`${backendUrl}/uploads/${data.photo}`);
            } catch (err) {
                console.error(err);
                alert('Gagal mengambil data produk.');
            }
        };

        fetchProduct();
    }, [productId]);

    const handleUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPhotoFile(file);
            setGambarPreview(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async () => {
        const formData = new FormData();
        formData.append('productName', productName);
        formData.append('price', price);
        formData.append('stock', stock);
        formData.append('description', description);
        if (photoFile) {
            formData.append('photo', photoFile);
        }

        try {
            const res = await fetch(`${backendUrl}/api/products/${productId}`, {
                method: 'PUT',
                body: formData,
            });

            if (res.ok) {
                setShowModal2(true);
            } else {
                alert('Gagal memperbarui produk');
            }
        } catch (err) {
            console.error(err);
            alert('Terjadi kesalahan saat menyimpan perubahan');
        }
    };

    return (
        <AdminLayout>
            <section className="container-md admin-section" style={{ maxWidth: '900px' }}>
                <nav aria-label="breadcrumb">
                    <ol className="breadcrumb">
                        <li className="breadcrumb-item">Produk</li>
                        <li className="breadcrumb-item active" aria-current="page">Edit Produk</li>
                    </ol>
                </nav>

                <h4 className="fw-bold mb-4">Edit Produk</h4>

                <div className="p-4 rounded-4 shadow-sm box">
                    <form>
                        <div className="row g-4 align-items-start">
                            <div className="col-md-4 col-sm-4 text-center box-gambar">
                                <label htmlFor="uploadGambar" className="d-flex flex-column justify-content-center align-items-center picture">
                                    {gambarPreview ? (
                                        <img
                                            src={gambarPreview}
                                            alt="Preview"
                                            className="img-fluid h-100 w-100 object-fit-cover rounded"
                                        />
                                    ) : (
                                        <div className='caption-up-gambar'>
                                            <BsUpload className='caption-up-gambar' />
                                            <br />
                                            <span className="mt-2 caption-up-gambar">Tambah Gambar</span>
                                        </div>
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
                                    <button
                                        type="button"
                                        className="btn admin-btn-teal rounded-pill px-4"
                                        onClick={() => setShowModal1(true)}
                                    >
                                        Simpan
                                    </button>
                                    <Link to="/admin/menu" className="btn btn-outline-dark rounded-pill px-4 cancel-btn">Batal</Link>
                                </div>
                            </div>
                        </div>
                    </form>
                </div>

                {/* Modal Konfirmasi */}
                {showModal1 && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <p>Apakah Anda yakin ingin menyimpan perubahan?</p>
                            <div className="modal-actions d-flex gap-3 justify-content-center mt-4">
                                <button
                                    className="btn btn-teal rounded-pill px-5"
                                    onClick={() => {
                                        setShowModal1(false);
                                        handleSubmit();
                                    }}
                                >
                                    Ya
                                </button>
                                <button
                                    className="btn btn-secondary rounded-pill px-5"
                                    onClick={() => setShowModal1(false)}
                                >
                                    Tidak
                                </button>
                            </div>
                        </div>
                    </div>
                )}

                {/* Modal Berhasil */}
                {showModal2 && (
                    <div className="modal-overlay">
                        <div className="modal-content">
                            <p>Produk berhasil diperbarui!</p>
                            <div className="modal-actions">
                                <button
                                    className="btn btn-teal rounded-pill px-5"
                                    onClick={() => navigate("/admin/menu")}
                                >
                                    Ok
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </section>
        </AdminLayout>
    );
};

export default EditProductPage;