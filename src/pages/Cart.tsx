
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Minus, Plus, X, ShoppingCart } from "lucide-react";
import { toast } from "@/hooks/use-toast";

const Cart = () => {
  const { cartItems, loading, removeFromCart, updateQuantity, clearCart } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      // This is just a placeholder calculation
      // In a real app, you would use actual prices
      return total + item.quantity * 10;
    }, 0);
  };

  const handleIncreaseQuantity = (ingredientId: string, currentQuantity: number) => {
    updateQuantity(ingredientId, currentQuantity + 1);
  };

  const handleDecreaseQuantity = (ingredientId: string, currentQuantity: number) => {
    if (currentQuantity > 1) {
      updateQuantity(ingredientId, currentQuantity - 1);
    } else {
      removeFromCart(ingredientId);
    }
  };

  const handleCheckout = () => {
    // In a real app, this would handle payment processing
    toast({
      title: "Order placed!",
      description: "Your order has been successfully placed.",
    });
    clearCart();
    navigate("/");
  };

  const redirectToLogin = () => {
    toast({
      title: "Please sign in",
      description: "You need to be signed in to view your cart",
      variant: "destructive",
    });
    navigate("/auth");
  };

  useEffect(() => {
    if (!loading && !user) {
      redirectToLogin();
    }
  }, [loading, user]);

  if (loading) {
    return (
      <Layout>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
          Loading cart...
        </div>
      </Layout>
    );
  }

  if (!user) {
    return null; // Will redirect in the useEffect
  }

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Shopping Cart</h1>

        {cartItems.length === 0 ? (
          <div className="text-center py-10">
            <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">
              Looks like you haven't added any items to your cart yet.
            </p>
            <Button onClick={() => navigate("/")}>
              Start Shopping
            </Button>
          </div>
        ) : (
          <>
            <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
              <Table>
                <TableHeader>
                  <TableRow>
                    <TableHead className="w-[40%]">Ingredient</TableHead>
                    <TableHead>Quantity</TableHead>
                    <TableHead className="text-right">Price</TableHead>
                    <TableHead className="w-[100px]">Actions</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {cartItems.map((item) => (
                    <TableRow key={item.id}>
                      <TableCell className="font-medium">
                        {item.ingredient?.name}
                        <div className="text-sm text-gray-500">
                          {item.ingredient?.category}
                        </div>
                      </TableCell>
                      <TableCell>
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleDecreaseQuantity(item.ingredient_id, item.quantity)}
                          >
                            <Minus className="h-4 w-4" />
                          </Button>
                          <span className="w-10 text-center">{item.quantity}</span>
                          <Button
                            variant="outline"
                            size="icon"
                            className="h-8 w-8"
                            onClick={() => handleIncreaseQuantity(item.ingredient_id, item.quantity)}
                          >
                            <Plus className="h-4 w-4" />
                          </Button>
                        </div>
                      </TableCell>
                      <TableCell className="text-right">
                        ₹ {(item.quantity * 10).toFixed(2)}
                      </TableCell>
                      <TableCell>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={() => removeFromCart(item.ingredient_id)}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </div>

            <div className="bg-white p-6 shadow-md rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹ {calculateTotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Shipping</span>
                <span>₹ 5.00</span>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹ {(calculateTotal() + 5).toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-4 justify-between">
              <Button variant="outline" onClick={() => navigate("/")}>
                Continue Shopping
              </Button>
              <div className="flex gap-4">
                <Button variant="destructive" onClick={clearCart}>
                  Clear Cart
                </Button>
                <Button onClick={handleCheckout}>
                  Checkout
                </Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
