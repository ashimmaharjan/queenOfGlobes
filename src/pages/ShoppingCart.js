import React, { useEffect } from "react";
import { useCart } from "../components/CartContext";
import {
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
} from "@nextui-org/react";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { ToastContainer, toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const ShoppingCart = () => {
  const { cart, removeFromCart, updateCartQuantity, clearCart } = useCart();
  const navigate = useNavigate();

  useEffect(() => {
    console.log("ShoppingCart component loaded, Cart Items:", cart);
  }, [cart]);

  const handleQuantityChange = (item, newQuantity) => {
    if (newQuantity > 0) {
      updateCartQuantity(item.id, newQuantity);
    }
  };

  const calculateTotalPrice = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  const handleCheckout = async () => {
    const email = sessionStorage.getItem("userEmail");

    const orderDetails = {
      cartItems: cart.map((item) => ({
        name: item.name,
        price: item.price,
        image: item.src,
        quantity: item.quantity,
      })),
      total: calculateTotalPrice(),
      email: email,
    };

    try {
      const response = await fetch("/api/orders/add", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(orderDetails),
      });

      if (response.ok) {
        toast.success("Order has been placed successfully!");
        clearCart(); // Clear the cart
      } else {
        toast.error("Opps, your cart seems empty.");
      }
    } catch (error) {
      toast.error("An error occurred while placing the order.");
    }
  };

  return (
    <section className="px-28 pb-16">
      <div className="mt-12">
        <h2 className="text-white body-text text-[25px] font-bold">
          Shopping Cart
        </h2>
      </div>

      <div className="bg-white rounded-xl p-8 mt-8">
        <Table aria-label="Cart Items Table">
          <TableHeader>
            <TableColumn>S.N.</TableColumn>
            <TableColumn>Product Name</TableColumn>
            <TableColumn>Image</TableColumn>
            <TableColumn>Quantity</TableColumn>
            <TableColumn>Price</TableColumn>
            <TableColumn>Actions</TableColumn>
          </TableHeader>
          <TableBody emptyContent={"Your cart is empty!!"}>
            {cart.map((item, index) => (
              <TableRow key={index}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{item.name}</TableCell>
                <TableCell>
                  <img
                    src={item.src}
                    alt={item.name}
                    className="w-[100px] h-[70px] rounded-[10px] object-cover"
                  />
                </TableCell>
                <TableCell>
                  <div className="flex items-center">
                    <Button
                      isIconOnly
                      variant="bordered"
                      color="primary"
                      onClick={() =>
                        handleQuantityChange(item, item.quantity - 1)
                      }
                    >
                      <AiOutlineMinus size={16} />
                    </Button>
                    <span className="mx-5">{item.quantity}</span>
                    <Button
                      isIconOnly
                      variant="bordered"
                      color="primary"
                      onClick={() =>
                        handleQuantityChange(item, item.quantity + 1)
                      }
                    >
                      <AiOutlinePlus size={16} />
                    </Button>
                  </div>
                </TableCell>
                <TableCell>${item.price * item.quantity}</TableCell>
                <TableCell>
                  <Button
                    variant="solid"
                    color="danger"
                    onClick={() => removeFromCart(item.id)}
                    startContent={<MdDeleteOutline size={20} />}
                  >
                    Remove
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>

        {/* Cart Total and Checkout Button */}
        <div className="mt-8 flex justify-end items-center">
          <span className="text-black text-xl font-bold mr-8">
            Total: ${calculateTotalPrice().toFixed(2)}
          </span>
          <Button color="success" onClick={handleCheckout}>
            Checkout
          </Button>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default ShoppingCart;
