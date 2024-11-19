import { Minus, Plus } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Button } from "../ui/button";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog"; // Add modal components from your UI library
import { Table, TableBody, TableCell, TableFooter, TableHead, TableHeader, TableRow } from "../ui/table";
import { useState } from "react";
import Checkout from "./Checkout";
import { CartItem, useCartStore } from "@/store/useCartStore";


const Cart = () => {
    const [open, setOpen] = useState<boolean>(false);
    const [confirmClear, setConfirmClear] = useState<boolean>(false);
    const { cart, decrementQuantity, incrementQuantity, removeFromTheCart, clearCart } = useCartStore();
    
    let totalAmount = cart.reduce((acc, ele) => {
        return acc + ele.price * ele.quantity;
    }, 0);

    const handleClearCart = () => {
        setConfirmClear(false);
        clearCart();
    };

    return (
        <div className="flex flex-col max-w-7xl mx-auto my-10">
            {cart?.length > 0 ? (
                <>
                    <div className="flex justify-end">
                        <Button
                            variant="link"
                            onClick={() => setConfirmClear(true)} // Trigger confirmation dialog
                        >
                            Clear All
                        </Button>
                    </div>
                    <Table>
                        <TableHeader>
                            <TableRow>
                                <TableHead>Items</TableHead>
                                <TableHead>Title</TableHead>
                                <TableHead>Price</TableHead>
                                <TableHead>Quantity</TableHead>
                                <TableHead>Total</TableHead>
                                <TableHead className="text-right">Remove</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {cart.map((item: CartItem) => (
                                <TableRow key={item._id}>
                                    <TableCell>
                                        <Avatar>
                                            <AvatarImage src={item.image} alt={item.name} />
                                            <AvatarFallback>CN</AvatarFallback>
                                        </Avatar>
                                    </TableCell>
                                    <TableCell>{item.name}</TableCell>
                                    <TableCell>{item.price}</TableCell>
                                    <TableCell>
                                        <div className="w-fit flex items-center rounded-full border border-gray-100 dark:border-gray-800 shadow-md">
                                            <Button
                                                onClick={() => decrementQuantity(item._id)}
                                                size={"icon"}
                                                variant={"outline"}
                                                className="rounded-full bg-gray-200"
                                            >
                                                <Minus />
                                            </Button>
                                            <Button
                                                size={"icon"}
                                                className="font-bold border-none"
                                                disabled
                                                variant={"outline"}
                                            >
                                                {item.quantity}
                                            </Button>
                                            <Button
                                                onClick={() => incrementQuantity(item._id)}
                                                size={"icon"}
                                                className="rounded-full bg-orange hover:bg-hoverOrange"
                                                variant={"outline"}
                                            >
                                                <Plus />
                                            </Button>
                                        </div>
                                    </TableCell>
                                    <TableCell>{item.price * item.quantity}</TableCell>
                                    <TableCell className="text-right">
                                        <Button
                                            onClick={() => removeFromTheCart(item._id)}
                                            size={"sm"}
                                            className="bg-orange hover:bg-hoverOrange"
                                        >
                                            Remove
                                        </Button>
                                    </TableCell>
                                </TableRow>
                            ))}
                        </TableBody>
                        <TableFooter>
                            <TableRow className="text-2xl font-bold">
                                <TableCell colSpan={5}>Total</TableCell>
                                <TableCell className="text-right">{totalAmount}</TableCell>
                            </TableRow>
                        </TableFooter>
                    </Table>
                    <div className="flex justify-end my-5">
                        <Button onClick={() => setOpen(true)} className="bg-orange hover:bg-hoverOrange">
                            Proceed To Checkout
                        </Button>
                    </div>
                    <Checkout open={open} setOpen={setOpen} />

                    {/* Confirmation Dialog */}
                    <Dialog open={confirmClear} onOpenChange={setConfirmClear}>
                        <DialogContent>
                            <DialogHeader>
                                <DialogTitle>Clear All Items</DialogTitle>
                            </DialogHeader>
                            <p className="text-gray-600">
                                Are you sure you want to clear all items from your cart? This action cannot be undone.
                            </p>
                            <DialogFooter>
                                <Button variant="outline" onClick={() => setConfirmClear(false)}>
                                    Cancel
                                </Button>
                                <Button className="bg-orange hover:bg-hoverOrange" onClick={handleClearCart}>
                                    Yes, Clear All
                                </Button>
                            </DialogFooter>
                        </DialogContent>
                    </Dialog>
                </>
            ) : (
                <div className="text-center text-xl font-semibold my-10">
                    Your cart is empty. Start adding items to see them here!
                </div>
            )}
        </div>
    );
};

export default Cart;
