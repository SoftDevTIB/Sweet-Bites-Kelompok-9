const User = require('../models/User');
const Product = require('../models/Product');
const Order = require('../models/Order');

const getAdminStats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments();
    const totalProducts = await Product.countDocuments();

    const orders = await Order.find({ status: { $in: ['diproses', 'dikirim', 'selesai'] } }); // hanya yg valid
    const totalSales = orders.reduce((sum, order) => sum + order.totalAmount, 0);

    // Grafik penjualan per hari
    const salesByDate = await Order.aggregate([
      {
        $match: {
          status: { $in: ['diproses', 'dikirim', 'selesai'] }
        }
      },
      {
        $group: {
          _id: { $dateToString: { format: "%Y-%m-%d", date: "$orderDate" } },
          total: { $sum: "$totalAmount" },
        }
      },
      {
        $sort: { _id: 1 }
      }
    ]);

    // Produk terlaris
    const bestSellers = await Order.aggregate([
      { $unwind: "$items" },
      {
        $group: {
          _id: "$items.productId",
          totalSold: { $sum: "$items.quantity" },
        }
      },
      {
        $sort: { totalSold: -1 }
      },
      {
        $limit: 5
      },
      {
        $lookup: {
          from: "products",
          localField: "_id",
          foreignField: "_id",
          as: "product"
        }
      },
      {
        $unwind: "$product"
      },
      {
        $project: {
          _id: 0,
          productId: "$product._id",
          productName: "$product.productName",
          totalSold: 1
        }
      }
    ]);

    return res.json({
      totalUsers,
      totalProducts,
      totalSales,
      salesByDate,
      bestSellers,
    });

  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: 'Gagal mengambil statistik admin' });
  }
};

module.exports = { getAdminStats };
