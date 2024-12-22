import Product from "../../models/products.js";

export const getProductsByCategoryId = async (req, reply) => {
  const { categoryId } = req.params;

  try {
    const products = await Product.find({ category: categoryId })
      .select("-category")
      .exec();
    return reply.send(products);
  } catch (error) {
    return reply.status(500).send({ message: "An error occurred ", error });
  }
};

export const searchProductsByName = async (req, reply) => {
  const { keyword } = req.params; // Lấy keyword từ query string
  try {

    const products = await Product.find({
      name: { $regex: keyword, $options: "i" }, // Không phân biệt hoa thường
    })
    return reply.send(products); // Trả về danh sách sản phẩm
  } catch (error) {
    return reply.status(500).send({ message: "An error occurred", error });
  }
};

export const searchProducts = async (req, reply) => {
  const { searchTerm } = req.params;
  try {
      const products = await Product.find({
          name: { $regex: searchTerm, $options: 'i' } // Tìm kiếm không phân biệt chữ hoa chữ thường
      });
      return reply.send(products);
  } catch (error) {
      return reply.status(500).send({ message: "An error occurred while searching products", error });
  }
}

