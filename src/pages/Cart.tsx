
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Layout } from "@/components/layout/Layout";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X, ShoppingCart, ChevronDown, ChevronUp, Plus, Minus } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";

const Cart = () => {
  const { cartItems, cartDishes, loading, removeFromCart, updateQuantity, clearCart, removeDishFromCart, updatePeopleCount } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();

  const calculateItemTotal = (quantity: number, price = 10) => {
    return quantity * price;
  };

  const calculateSubtotal = () => {
    const dishTotal = cartDishes.reduce((total, dish) => {
      return total + dish.ingredients.reduce((subtotal, item) => {
        return subtotal + calculateItemTotal(item.quantity * dish.people);
      }, 0);
    }, 0);
    
    const individualTotal = cartItems.reduce((total, item) => {
      return total + calculateItemTotal(item.quantity);
    }, 0);
    
    return dishTotal + individualTotal;
  };

  const handleQuantityChange = (itemId: string, value: string) => {
    const newQuantity = parseInt(value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      updateQuantity(itemId, newQuantity);
    }
  };

  const handlePeopleChange = (dishId: string, count: number) => {
    if (count >= 1) {
      updatePeopleCount(dishId, count);
    }
  };

  const handleCheckout = () => {
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
    return null;
  }

  const total = calculateSubtotal() + 25; // Adding shipping fee

  return (
    <Layout>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-6">Your Shopping Cart</h1>

        {cartItems.length === 0 && cartDishes.length === 0 ? (
          <div className="text-center py-10">
            <ShoppingCart className="h-12 w-12 mx-auto text-gray-400 mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is empty</h2>
            <p className="text-gray-500 mb-6">Looks like you haven't added any items to your cart yet.</p>
            <Button onClick={() => navigate("/")}>Start Shopping</Button>
          </div>
        ) : (
          <>
            <div className="space-y-6 mb-6">
              {/* Dishes with ingredients */}
              {cartDishes.length > 0 && (
                <div className="bg-white shadow-md rounded-lg overflow-hidden mb-6">
                  <h2 className="text-xl font-semibold p-4 border-b">Your Dishes</h2>
                  
                  {cartDishes.map((dishItem) => (
                    <Collapsible key={dishItem.dish.id} className="border-b last:border-b-0">
                      <div className="bg-gray-50 p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center">
                            <CollapsibleTrigger className="mr-2">
                              <Button variant="ghost" size="icon">
                                <ChevronDown className="h-5 w-5" />
                              </Button>
                            </CollapsibleTrigger>
                            <div>
                              <h3 className="font-medium text-lg">{dishItem.dish.name}</h3>
                              <p className="text-sm text-gray-500">{dishItem.ingredients.length} ingredients</p>
                            </div>
                          </div>
                          <div className="flex items-center space-x-4">
                            <div className="flex items-center space-x-2">
                              <span className="text-sm text-gray-600">People:</span>
                              <div className="flex items-center border rounded-md">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-r-none"
                                  onClick={() => handlePeopleChange(dishItem.dish.id, Math.max(1, dishItem.people - 1))}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <span className="w-8 text-center">{dishItem.people}</span>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-l-none"
                                  onClick={() => handlePeopleChange(dishItem.dish.id, dishItem.people + 1)}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </div>
                            <Button 
                              variant="destructive" 
                              size="sm" 
                              onClick={() => removeDishFromCart(dishItem.dish.id)}
                            >
                              Remove
                            </Button>
                          </div>
                        </div>
                      </div>
                      
                      <CollapsibleContent>
                        <Table>
                          <TableHeader>
                            <TableRow className="bg-gray-100">
                              <TableHead className="w-[40%]">Ingredient</TableHead>
                              <TableHead>Base Quantity</TableHead>
                              <TableHead className="text-right">Adjusted Quantity</TableHead>
                              <TableHead className="text-right">Price</TableHead>
                            </TableRow>
                          </TableHeader>
                          <TableBody>
                            {dishItem.ingredients.map((item) => (
                              <TableRow key={item.id} className="pl-10">
                                <TableCell className="font-medium pl-10">
                                  {item.ingredient?.name}
                                  <div className="text-sm text-gray-500">{item.ingredient?.category}</div>
                                </TableCell>
                                <TableCell>{item.quantity} {item.ingredient?.unit || 'units'}</TableCell>
                                <TableCell className="text-right">
                                  {item.quantity * dishItem.people} {item.ingredient?.unit || 'units'}
                                </TableCell>
                                <TableCell className="text-right">
                                  ₹ {calculateItemTotal(item.quantity * dishItem.people).toFixed(2)}
                                </TableCell>
                              </TableRow>
                            ))}
                          </TableBody>
                        </Table>
                      </CollapsibleContent>
                    </Collapsible>
                  ))}
                </div>
              )}
              
              {/* Individual ingredients (not part of a dish) */}
              {cartItems.length > 0 && (
                <div className="bg-white shadow-md rounded-lg overflow-hidden">
                  <h2 className="text-xl font-semibold p-4 border-b">Individual Ingredients</h2>
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
                            <div className="text-sm text-gray-500">{item.ingredient?.category}</div>
                          </TableCell>
                          <TableCell>
                            <Input
                              title="quantity"
                              type="number"
                              className="w-16 text-center"
                              value={item.quantity}
                              min="1"
                              onChange={(e) => handleQuantityChange(item.id, e.target.value)}
                            />
                          </TableCell>
                          <TableCell className="text-right">₹ {calculateItemTotal(item.quantity).toFixed(2)}</TableCell>
                          <TableCell>
                            <Button variant="ghost" size="icon" onClick={() => removeFromCart(item.ingredient_id)}>
                              <X className="h-4 w-4" />
                            </Button>
                          </TableCell>
                        </TableRow>
                      ))}
                    </TableBody>
                  </Table>
                </div>
              )}
            </div>

            <div className="bg-white p-6 shadow-md rounded-lg mb-6">
              <div className="flex justify-between mb-2">
                <span>Subtotal</span>
                <span>₹ {calculateSubtotal().toFixed(2)}</span>
              </div>
              <div className="flex justify-between mb-2">
                <span>Packaging and handling fee</span>
                <span>₹ 25.00</span>
              </div>
              <div className="border-t border-gray-200 my-4"></div>
              <div className="flex justify-between font-bold">
                <span>Total</span>
                <span>₹ {total.toFixed(2)}</span>
              </div>
            </div>

            <div className="flex gap-4 justify-between">
              <Button variant="outline" onClick={() => navigate("/")}>Continue Shopping</Button>
              <div className="flex gap-4">
                <Button variant="destructive" onClick={clearCart}>Clear Cart</Button>
                <Button onClick={handleCheckout}>Checkout</Button>
              </div>
            </div>
          </>
        )}
      </div>
    </Layout>
  );
};

export default Cart;
