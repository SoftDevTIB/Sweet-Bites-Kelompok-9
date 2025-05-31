import Header from '../components/header';
import Footer from '../components/footer';
import ChocoOreo from '../../assets/Choco_oreo.jpg';
import { BsArrowLeft } from "react-icons/bs";
import { Link } from 'react-router-dom';

const DetailPesananPage = () => {
    const order = {
        id: 'ORD 00027',
        date: 'Rabu, 9 April 2025',
        items: [
            {
                name: 'Choco Oreo',
                price: 10000,
                quantity: 1,
                image: ChocoOreo,
            },
            {
                name: 'Hokkaido Cupcake',
                price: 10000,
                quantity: 1,
                image: ChocoOreo,
            },
            {
                name: 'Cupcake',
                price: 20000,
                quantity: 1,
                image: ChocoOreo,
            },
        ],
        subtotal: 20000,
        shipping: 10000,
    };

    const formatRupiah = (num) =>
        'Rp ' + num.toLocaleString('id-ID', { minimumFractionDigits: 0 });

    return (
        <>
            <Header />
            <main className="text-center">
                <div className="pp-container ">
                    <div className="d-flex justify-content-center align-items-center position-relative title-box mb-4" style={{ maxWidth: "700px", height: "50px" }}>
                        <Link to="/pesanan" className="position-absolute start-0 ms-2 fs-4 back-button">
                            <BsArrowLeft className='me-2' />
                        </Link>
                        <h3 className="mx-auto mb-0 font-est text-center">Detail Pesanan</h3>
                    </div>


                    <div className="d-flex justify-content-center align-items-center mb-5">
                        <div className="w-100 p-4 rounded-5 order-box" style={{ maxWidth: "700px", backgroundColor: "#fef0d4", border: "1px solid #f5a150" }}>
                            <div className="d-flex justify-content-between align-items-center mb-1 detail-border pb-2">
                                <span className='fw-bold text-lg' style={{ color: "#d47500" }}>{order.id}</span>
                                <span className='fw-normal text-md'>{order.date}</span>
                            </div>

                            <div className="d-md-flex gap-5 align-items-stretch">
                                {/* Left Side - Order Items */}
                                <div className="flex-grow-1">
                                    {order.items.map((item, idx) => (
                                        <div
                                            key={idx}
                                            className={`d-flex align-items-start py-3 order-detail-item ${idx === order.items.length - 1 ? 'border-0' : ''}`}
                                        >
                                            <img
                                                src={item.image}
                                                alt={item.name}
                                                className="rounded me-3"
                                                style={{ width: '64px', height: '64px', objectFit: 'cover' }}
                                            />
                                            <div className="flex-grow-1 text-start">
                                                <div className="fw-medium text-lg text-teal font-est">{item.name}</div>
                                                <div className='text-md'>{formatRupiah(item.price)}</div>
                                            </div>
                                            <div className="text-end pt-3 text-md">
                                                <div>{item.quantity} x</div>
                                                <div className="fw-semibold">{formatRupiah(item.price * item.quantity)}</div>
                                            </div>
                                        </div>
                                    ))}
                                </div>

                                {/* Right Side - Price Summary sticky to bottom */}
                                <div className="d-flex flex-column flex-grow-1 justify-content-end" style={{ minWidth: '250px' }}>
                                    <div className="p-3 price-box text-md">
                                        <div className="mb-4">
                                            <div className="d-flex justify-content-between">
                                                <span className=''>Sub Total</span>
                                                <span className="fw-semibold">{formatRupiah(order.subtotal)}</span>
                                            </div>
                                            <div className="d-flex justify-content-between">
                                                <span>Ongkir</span>
                                                <span className="fw-semibold">{formatRupiah(order.shipping)}</span>
                                            </div>
                                        </div>
                                        <div className="d-flex justify-content-between align-items-center mt-3 p-2 total-box">
                                            <span className="fw-semibold">Total</span>
                                            <span className="fw-semibold">
                                                {formatRupiah(order.subtotal + order.shipping)}
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>
            </main>
            <Footer />
        </>
    );
};

export default DetailPesananPage;