import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/contexts/CartContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { X, ShoppingCart, ChevronDown, Plus, Minus, Edit } from "lucide-react";
import { toast } from "@/hooks/use-toast";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";
import { Profile } from "@/types/database.types";
import { IngredientCustomizationModal } from "@/components/cart/IngredientCustomizationModal";
import { ProfileValidationModal } from "@/components/checkout/ProfileValidationModal";
import { Drawer, DrawerContent, DrawerTrigger } from "@/components/ui/drawer";
import { motion, AnimatePresence } from "framer-motion";
import { getLocalStorage, setLocalStorage } from "@/lib/localStorage";

const Cart = () => {
  const { 
    cartItems, 
    cartDishes, 
    loading, 
    removeFromCart, 
    updateQuantity, 
    clearCart, 
    removeDishFromCart, 
    updatePeopleCount,
    customizeIngredient,
    removeIngredientFromDish,
    addIngredientToDish
  } = useCart();
  const { user } = useAuth();
  const navigate = useNavigate();
  const [profileValidationOpen, setProfileValidationOpen] = useState(false);
  const [missingProfileFields, setMissingProfileFields] = useState<string[]>([]);
  const [customizationModalOpen, setCustomizationModalOpen] = useState(false);
  const [addIngredientModalOpen, setAddIngredientModalOpen] = useState(false);
  const [selectedDish, setSelectedDish] = useState<{
    dishId: string;
    people: number;
  } | null>(null);
  const [localCartState, setLocalCartState] = useState({
    items: [] as any[],
    dishes: [] as any[]
  });
  const [isUpdatePending, setIsUpdatePending] = useState(false);

  // Calculate item total with frontend calculation for instant feedback
  const calculateItemTotal = (quantity: number, price = 10) => {
    return quantity * price;
  };

  // Calculate subtotal based on current cart state (could be local or from backend)
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

  // Handle quantity change with local state update for instant feedback
  const handleQuantityChange = async (itemId: string, value: string) => {
    const newQuantity = parseInt(value, 10);
    if (!isNaN(newQuantity) && newQuantity > 0) {
      // Update local state immediately
      setIsUpdatePending(true);
      
      try {
        await updateQuantity(itemId, newQuantity);
        toast({
          title: "Quantity updated",
          description: "Your cart has been updated successfully."
        });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Failed to update quantity",
          description: error.message || "Please try again later."
        });
      } finally {
        setIsUpdatePending(false);
      }
    }
  };

  // Handle people count change with animation and local state update
  const handlePeopleChange = async (dishId: string, count: number) => {
    if (count >= 1) {
      setIsUpdatePending(true);
      
      try {
        await updatePeopleCount(dishId, count);
        toast({
          title: "Serving size updated",
          description: `Updated to ${count} ${count === 1 ? 'person' : 'people'}.`
        });
      } catch (error: any) {
        toast({
          variant: "destructive",
          title: "Failed to update serving size",
          description: error.message || "Please try again later."
        });
      } finally {
        setIsUpdatePending(false);
      }
    }
  };

  const handleOpenCustomization = (dishId: string, people: number) => {
    setSelectedDish({
      dishId,
      people
    });
    setCustomizationModalOpen(true);
  };

  const handleOpenAddIngredients = (dishId: string, people: number) => {
    setSelectedDish({
      dishId,
      people
    });
    setAddIngredientModalOpen(true);
  };

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    if (!loading && user) {
      const cartData = {
        items: cartItems,
        dishes: cartDishes,
        lastUpdated: new Date().toISOString()
      };
      setLocalStorage('cartData', JSON.stringify(cartData));
    }
  }, [cartItems, cartDishes, loading, user]);

  // Load cart from localStorage on initial load
  useEffect(() => {
    if (!loading && user) {
      const savedCart = getLocalStorage('cartData');
      if (savedCart) {
        try {
          const parsedCart = JSON.parse(savedCart);
          setLocalCartState({
            items: parsedCart.items || [],
            dishes: parsedCart.dishes || []
          });
        } catch (e) {
          console.error('Error parsing saved cart:', e);
        }
      }
    }
  }, [loading, user]);

  const validateProfile = async () => {
    if (!user) return false;
    
    try {
      const { data, error } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();
        
      if (error) throw error;
      
      const profile = data as Profile;
      const missingFields: string[] = [];
      
      if (!profile.address) {
        missingFields.push('address');
      }
      
      if (!profile.phone_number) {
        missingFields.push('phone');
      }
      
      setMissingProfileFields(missingFields);
      return missingFields.length === 0;
    } catch (error) {
      console.error('Error validating profile:', error);
      return false;
    }
  };

  const handleCheckout = async () => {
    if (!user) {
      toast({
        title: "Please sign in",
        description: "You need to be signed in to checkout",
        variant: "destructive",
      });
      navigate("/auth");
      return;
    }
    
    const isProfileValid = await validateProfile();
    
    if (!isProfileValid) {
      setProfileValidationOpen(true);
      return;
    }
    
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
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 text-center">
        <div className="flex flex-col items-center justify-center space-y-4">
          <div className="w-16 h-16 border-4 border-primary border-t-transparent rounded-full animate-spin"></div>
          <p className="text-lg font-medium">Loading your delicious items...</p>
        </div>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  const selectedDishData = selectedDish 
    ? cartDishes.find(d => d.dish.id === selectedDish.dishId) 
    : null;

  const total = calculateSubtotal() + 25; // Adding shipping fee

  // Mobile cart view as a drawer
  const MobileCartView = () => (
    <Drawer>
      <DrawerTrigger asChild>
        <Button variant="outline" className="flex items-center gap-2 md:hidden">
          <ShoppingCart className="h-5 w-5" />
          <span>View Cart</span>
        </Button>
      </DrawerTrigger>
      <DrawerContent className="px-4 pb-6 max-h-[80vh] overflow-auto">
        <div className="mt-6 space-y-6">
          <h2 className="text-2xl font-bold text-[#FF4444]">Your Cart</h2>
          
          {cartItems.length === 0 && cartDishes.length === 0 ? (
            <div className="text-center py-6">
              <ShoppingCart className="h-10 w-10 mx-auto text-gray-400 mb-3" />
              <p className="text-muted-foreground">Your cart is empty</p>
              <Button 
                onClick={() => navigate("/")} 
                className="mt-4 bg-[#003366] hover:bg-[#002244] transition-colors"
              >
                Start Shopping
              </Button>
            </div>
          ) : (
            <>
              {/* Dishes section */}
              {cartDishes.map((dish) => (
                <AnimatePresence key={dish.dish.id} mode="popLayout">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-md p-4 mb-4"
                  >
                    <div className="flex justify-between items-center mb-2">
                      <h3 className="font-bold text-lg text-[#FF4444]">{dish.dish.name}</h3>
                      <div className="flex gap-2 items-center">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handlePeopleChange(dish.dish.id, Math.max(1, dish.people - 1))}
                          disabled={isUpdatePending}
                          className="h-8 w-8 p-0 rounded-full bg-[#FFB347]/10 hover:bg-[#FFB347]/20"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <motion.span
                          key={dish.people}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="w-6 text-center font-medium"
                        >
                          {dish.people}
                        </motion.span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handlePeopleChange(dish.dish.id, dish.people + 1)}
                          disabled={isUpdatePending}
                          className="h-8 w-8 p-0 rounded-full bg-[#FFB347]/10 hover:bg-[#FFB347]/20"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                    <p className="text-sm text-gray-500 mb-3">{dish.ingredients.length} ingredients</p>
                    <div className="flex gap-2 flex-wrap">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => handleOpenCustomization(dish.dish.id, dish.people)}
                        className="text-xs bg-white border-[#003366] text-[#003366] hover:bg-[#003366]/10"
                      >
                        <Edit className="h-3 w-3 mr-1" /> Edit
                      </Button>
                      <Button 
                        variant="outline" 
                        size="sm" 
                        onClick={() => removeDishFromCart(dish.dish.id)}
                        className="text-xs bg-white border-[#FF4444] text-[#FF4444] hover:bg-[#FF4444]/10"
                      >
                        <X className="h-3 w-3 mr-1" /> Remove
                      </Button>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ))}
              
              {/* Individual items section */}
              {cartItems.map((item) => (
                <AnimatePresence key={item.id} mode="popLayout">
                  <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    transition={{ duration: 0.3 }}
                    className="bg-white rounded-lg shadow-md p-4 mb-4"
                  >
                    <div className="flex justify-between items-center">
                      <div>
                        <h3 className="font-medium">{item.ingredient?.name}</h3>
                        <p className="text-sm text-gray-500">{item.ingredient?.category}</p>
                      </div>
                      <div className="flex items-center gap-2">
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleQuantityChange(item.id, (item.quantity - 1).toString())}
                          disabled={isUpdatePending || item.quantity <= 1}
                          className="h-8 w-8 p-0 rounded-full bg-[#FFB347]/10 hover:bg-[#FFB347]/20"
                        >
                          <Minus className="h-3 w-3" />
                        </Button>
                        <motion.span
                          key={item.quantity}
                          initial={{ opacity: 0, scale: 0.8 }}
                          animate={{ opacity: 1, scale: 1 }}
                          className="w-6 text-center font-medium"
                        >
                          {item.quantity}
                        </motion.span>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => handleQuantityChange(item.id, (item.quantity + 1).toString())}
                          disabled={isUpdatePending}
                          className="h-8 w-8 p-0 rounded-full bg-[#FFB347]/10 hover:bg-[#FFB347]/20"
                        >
                          <Plus className="h-3 w-3" />
                        </Button>
                        <Button 
                          variant="ghost" 
                          size="sm" 
                          onClick={() => removeFromCart(item.ingredient_id)}
                          disabled={isUpdatePending}
                          className="h-8 w-8 p-0 rounded-full text-[#FF4444] hover:bg-[#FF4444]/10"
                        >
                          <X className="h-4 w-4" />
                        </Button>
                      </div>
                    </div>
                    <div className="mt-2 flex justify-between">
                      <span className="text-sm">Price:</span>
                      <span className="font-medium">₹ {calculateItemTotal(item.quantity).toFixed(2)}</span>
                    </div>
                  </motion.div>
                </AnimatePresence>
              ))}
              
              {/* Summary section */}
              <div className="bg-white rounded-lg shadow-md p-4 space-y-3">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>₹ {calculateSubtotal().toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Packaging fee</span>
                  <span>₹ 25.00</span>
                </div>
                <div className="border-t pt-2 mt-2 flex justify-between font-bold">
                  <span>Total</span>
                  <span>₹ {total.toFixed(2)}</span>
                </div>
                <div className="pt-2">
                  <Button 
                    onClick={handleCheckout} 
                    className="w-full bg-[#003366] hover:bg-[#002244] transition-colors"
                  >
                    Checkout
                  </Button>
                  <Button 
                    variant="outline" 
                    onClick={clearCart} 
                    className="w-full mt-2 border-[#FF4444] text-[#FF4444] hover:bg-[#FF4444]/10"
                  >
                    Clear Cart
                  </Button>
                </div>
              </div>
            </>
          )}
        </div>
      </DrawerContent>
    </Drawer>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-[#FF4444] mb-6 transition-transform hover:scale-[1.02]">Your Delicious Cart</h1>

      {/* Mobile view button */}
      <div className="md:hidden mb-6">
        <MobileCartView />
      </div>

      {/* Desktop view */}
      <div className="hidden md:block">
        {cartItems.length === 0 && cartDishes.length === 0 ? (
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-10 bg-white rounded-lg shadow-md"
          >
            <ShoppingCart className="h-16 w-16 mx-auto text-[#FFB347] mb-4" />
            <h2 className="text-xl font-medium text-gray-900 mb-2">Your cart is feeling a bit empty</h2>
            <p className="text-gray-500 mb-6">Let's fill it with some delicious ingredients!</p>
            <Button 
              onClick={() => navigate("/")} 
              className="bg-[#003366] hover:bg-[#002244] transition-transform hover:scale-105"
            >
              Explore Delicious Options
            </Button>
          </motion.div>
        ) : (
          <>
            <div className="space-y-6 mb-6">
              {/* Dishes with ingredients */}
              {cartDishes.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3 }}
                  className="bg-white shadow-md rounded-lg overflow-hidden mb-6"
                >
                  <h2 className="text-xl font-semibold p-4 border-b bg-gradient-to-r from-[#FFB347]/10 to-transparent text-[#FF4444]">Your Dishes</h2>
                  
                  <AnimatePresence>
                    {cartDishes.map((dishItem) => (
                      <Collapsible key={dishItem.dish.id} className="border-b last:border-b-0">
                        <div className="bg-gray-50 p-4 hover:bg-[#FFB347]/5 transition-colors">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center">
                              <CollapsibleTrigger className="mr-2">
                                <motion.div whileHover={{ rotate: 180 }} transition={{ duration: 0.3 }}>
                                  <Button variant="ghost" size="icon" className="text-[#003366]">
                                    <ChevronDown className="h-5 w-5" />
                                  </Button>
                                </motion.div>
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
                                    className="h-8 w-8 rounded-r-none hover:bg-[#FFB347]/10"
                                    onClick={() => handlePeopleChange(dishItem.dish.id, Math.max(1, dishItem.people - 1))}
                                    disabled={isUpdatePending}
                                  >
                                    <Minus className="h-3 w-3" />
                                  </Button>
                                  <motion.span 
                                    key={dishItem.people}
                                    initial={{ opacity: 0, scale: 0.8 }}
                                    animate={{ opacity: 1, scale: 1 }}
                                    className="w-8 text-center"
                                  >
                                    {dishItem.people}
                                  </motion.span>
                                  <Button 
                                    variant="ghost" 
                                    size="icon" 
                                    className="h-8 w-8 rounded-l-none hover:bg-[#FFB347]/10"
                                    onClick={() => handlePeopleChange(dishItem.dish.id, dishItem.people + 1)}
                                    disabled={isUpdatePending}
                                  >
                                    <Plus className="h-3 w-3" />
                                  </Button>
                                </div>
                              </div>
                              
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="flex items-center gap-1 border-[#003366] text-[#003366] hover:bg-[#003366]/10 transition-colors hover:scale-105"
                                onClick={() => handleOpenCustomization(dishItem.dish.id, dishItem.people)}
                              >
                                <Edit className="h-3 w-3" /> Edit
                              </Button>
                              
                              <Button 
                                variant="outline" 
                                size="sm" 
                                className="border-[#FF4444] text-[#FF4444] hover:bg-[#FF4444]/10 transition-colors hover:scale-105"
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
                              <TableRow className="bg-gradient-to-r from-[#FFB347]/10 to-transparent">
                                <TableHead className="w-[40%]">Ingredient</TableHead>
                                <TableHead>Base Quantity</TableHead>
                                <TableHead className="text-right">Adjusted Quantity</TableHead>
                                <TableHead className="text-right">Price</TableHead>
                              </TableRow>
                            </TableHeader>
                            <TableBody>
                              <AnimatePresence>
                                {dishItem.ingredients.map((item) => (
                                  <motion.tr
                                    key={item.id}
                                    initial={{ opacity: 0, x: -5 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: 5 }}
                                    transition={{ duration: 0.2 }}
                                    className="hover:bg-[#FFB347]/5 group"
                                  >
                                    <TableCell className="font-medium pl-10">
                                      {item.ingredient?.name}
                                      <div className="text-sm text-gray-500">{item.ingredient?.category}</div>
                                    </TableCell>
                                    <TableCell>{item.quantity} {item.ingredient?.unit || 'units'}</TableCell>
                                    <TableCell className="text-right">
                                      <motion.span
                                        key={item.quantity * dishItem.people}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="font-medium"
                                      >
                                        {item.quantity * dishItem.people} {item.ingredient?.unit || 'units'}
                                      </motion.span>
                                    </TableCell>
                                    <TableCell className="text-right">
                                      <motion.span
                                        key={calculateItemTotal(item.quantity * dishItem.people)}
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        className="font-medium text-[#FF4444]"
                                      >
                                        ₹ {calculateItemTotal(item.quantity * dishItem.people).toFixed(2)}
                                      </motion.span>
                                    </TableCell>
                                  </motion.tr>
                                ))}
                              </AnimatePresence>
                            </TableBody>
                          </Table>
                        </CollapsibleContent>
                      </Collapsible>
                    ))}
                  </AnimatePresence>
                </motion.div>
              )}
              
              {/* Individual ingredients (not part of a dish) */}
              {cartItems.length > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: 0.1 }}
                  className="bg-white shadow-md rounded-lg overflow-hidden"
                >
                  <h2 className="text-xl font-semibold p-4 border-b bg-gradient-to-r from-[#FFB347]/10 to-transparent text-[#FF4444]">Individual Ingredients</h2>
                  <Table>
                    <TableHeader>
                      <TableRow className="bg-gradient-to-r from-[#FFB347]/10 to-transparent">
                        <TableHead className="w-[40%]">Ingredient</TableHead>
                        <TableHead>Quantity</TableHead>
                        <TableHead className="text-right">Price</TableHead>
                        <TableHead className="w-[100px]">Actions</TableHead>
                      </TableRow>
                    </TableHeader>
                    <TableBody>
                      <AnimatePresence>
                        {cartItems.map((item) => (
                          <motion.tr 
                            key={item.id}
                            initial={{ opacity: 0, y: 5 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -5 }}
                            transition={{ duration: 0.2 }}
                            className="hover:bg-[#FFB347]/5 group"
                          >
                            <TableCell className="font-medium">
                              {item.ingredient?.name}
                              <div className="text-sm text-gray-500">{item.ingredient?.category}</div>
                            </TableCell>
                            <TableCell>
                              <div className="flex items-center border rounded-md w-fit">
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-r-none hover:bg-[#FFB347]/10"
                                  onClick={() => handleQuantityChange(item.id, (item.quantity - 1).toString())}
                                  disabled={isUpdatePending || item.quantity <= 1}
                                >
                                  <Minus className="h-3 w-3" />
                                </Button>
                                <motion.span 
                                  key={item.quantity}
                                  initial={{ opacity: 0, scale: 0.8 }}
                                  animate={{ opacity: 1, scale: 1 }}
                                  className="w-8 text-center"
                                >
                                  {item.quantity}
                                </motion.span>
                                <Button 
                                  variant="ghost" 
                                  size="icon" 
                                  className="h-8 w-8 rounded-l-none hover:bg-[#FFB347]/10"
                                  onClick={() => handleQuantityChange(item.id, (item.quantity + 1).toString())}
                                  disabled={isUpdatePending}
                                >
                                  <Plus className="h-3 w-3" />
                                </Button>
                              </div>
                            </TableCell>
                            <TableCell className="text-right">
                              <motion.span
                                key={calculateItemTotal(item.quantity)}
                                initial={{ opacity: 0 }}
                                animate={{ opacity: 1 }}
                                className="font-medium text-[#FF4444]"
                              >
                                ₹ {calculateItemTotal(item.quantity).toFixed(2)}
                              </motion.span>
                            </TableCell>
                            <TableCell>
                              <Button 
                                variant="ghost" 
                                size="icon" 
                                onClick={() => removeFromCart(item.ingredient_id)}
                                disabled={isUpdatePending}
                                className="text-[#FF4444] opacity-0 group-hover:opacity-100 transition-opacity hover:bg-[#FF4444]/10"
                              >
                                <X className="h-4 w-4" />
                              </Button>
                            </TableCell>
                          </motion.tr>
                        ))}
                      </AnimatePresence>
                    </TableBody>
                  </Table>
                </motion.div>
              )}
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.2 }}
                className="bg-white p-6 shadow-md rounded-lg mb-6 overflow-hidden relative"
              >
                <div className="flex justify-between mb-2">
                  <span>Subtotal</span>
                  <motion.span
                    key={calculateSubtotal()}
                    initial={{ opacity: 0, x: 10 }}
                    animate={{ opacity: 1, x: 0 }}
                  >
                    ₹ {calculateSubtotal().toFixed(2)}
                  </motion.span>
                </div>
                <div className="flex justify-between mb-2">
                  <span>Packaging and handling fee</span>
                  <span>₹ 25.00</span>
                </div>
                <div className="border-t border-gray-200 my-4"></div>
                <div className="flex justify-between font-bold">
                  <span>Total</span>
                  <motion.span
                    key={total}
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-green-500"
                  >
                    ₹ {total.toFixed(2)}
                  </motion.span>
                </div>
                
                {/* Background pattern */}
                <div className="absolute right-0 bottom-0 w-1/2 h-1/2 opacity-5 pointer-events-none">
                  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="#FF4444" strokeWidth="0.5">
                    <path d="M12 4.5c-3.4 0-6.38 2.24-7.33 5.5h14.66c-.95-3.26-3.93-5.5-7.33-5.5z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M20.29 12.5H3.71c.18.64.43 1.24.74 1.8h15.1c.31-.56.56-1.16.74-1.8z" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M19.33 16.5H4.67c2.46 2.1 5.72 2.7 8.65 1.58 1.2-.46 2.28-1.13 3.14-1.97.27-.28.52-.57.73-.89.1-.14.14-.21.14-.22z" strokeLinecap="round" strokeLinejoin="round" />
                  </svg>
                </div>
              </motion.div>

              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, delay: 0.3 }}
                className="flex flex-col gap-4 justify-end h-full"
              >
                <Button 
                  variant="outline" 
                  onClick={() => navigate("/")} 
                  className="hover:scale-[1.02] transition-transform border-[#FFB347] text-[#FFB347] hover:bg-[#FFB347]/10"
                >
                  Continue Shopping
                </Button>
                <div className="flex gap-4">
                  <Button 
                    variant="destructive" 
                    onClick={clearCart}
                    className="flex-1 bg-[#FF4444] hover:bg-[#FF3333] hover:scale-[1.02] transition-all"
                  >
                    Clear Cart
                  </Button>
                  <Button 
                    onClick={handleCheckout}
                    className="flex-1 bg-[#003366] hover:bg-[#002244] hover:scale-[1.02] transition-all"
                  >
                    Checkout
                  </Button>
                </div>
              </motion.div>
            </div>
          </>
        )}
      </div>

      {/* Customization Modal */}
      {selectedDishData && (
        <IngredientCustomizationModal
          isOpen={customizationModalOpen}
          onClose={() => {
            setCustomizationModalOpen(false);
            setSelectedDish(null);
          }}
          dish={selectedDishData.dish}
          ingredients={selectedDishData.ingredients}
          people={selectedDishData.people}
          onUpdateIngredient={customizeIngredient.bind(null, selectedDishData.dish.id)}
          onRemoveIngredient={removeIngredientFromDish.bind(null, selectedDishData.dish.id)}
          onAddIngredient={addIngredientToDish.bind(null, selectedDishData.dish.id)}
        />
      )}

      {/* Profile Validation Modal */}
      <ProfileValidationModal
        isOpen={profileValidationOpen}
        missingFields={missingProfileFields}
      />
    </div>
  );
};

export default Cart;
