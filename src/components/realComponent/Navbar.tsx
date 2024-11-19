import { Link } from "react-router-dom"
import { Menubar, MenubarContent, MenubarItem, MenubarMenu, MenubarTrigger } from "../ui/menubar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { Button } from "../ui/button";
import { HandPlatter, Menu, Moon, PackageCheck, ShoppingBag, SquareMenu, Sun, User, UtensilsCrossed } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { Sheet, SheetClose, SheetContent, SheetDescription, SheetFooter, SheetHeader, SheetTitle, SheetTrigger } from "../ui/sheet";

import { Separator } from "@radix-ui/react-separator";
import useUserStore from "@/store/useUserStore";
import { useCartStore } from "@/store/useCartStore";
import { useThemeStore } from "@/store/useThemeStore";


const Navbar = () => {

  const { user, logout } = useUserStore();
  const {cart} = useCartStore();
  const {setTheme} = useThemeStore();

  return (
    <div className="max-w-7xl mx-auto">
      <div className="flex items-center justify-between h-14">
        <Link to="/">
          <h1 className="text-2xl font-bold text-blue-800 tracking-wide">
            KP Hotel'<span className="text-3xl text-blue-500 font-mono">s</span>
          </h1>
        </Link>

        <div className="hidden md:flex items-center gap-10">
          <div className="hidden md:flex items-center gap-6">
            <Link to="/">Home</Link>
            <Link to="/profile">Profile</Link>
            <Link to="/order/status">Order</Link>

            {
              user?.admin && (
                <Menubar>
                  <MenubarMenu>
                    <MenubarTrigger>
                      Dashboard
                    </MenubarTrigger>
                    <MenubarContent>
                      <Link to="/admin/restaurant">
                        <MenubarItem>Restaurant</MenubarItem>
                      </Link>
                      <Link to="/admin/menu">
                        <MenubarItem>Menu</MenubarItem>
                      </Link>
                      <Link to="/admin/orders">
                        <MenubarItem>Order</MenubarItem>
                      </Link>
                    </MenubarContent>
                  </MenubarMenu>
                </Menubar>
              )
            }
          </div>
          <div className="flex items-center gap-4">
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="outline" size="icon">
                    <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                    <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                    <span className="sr-only">Toggle theme</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem onClick={()=> setTheme('light')}>
                    Light
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={()=> setTheme('dark')}>
                    Dark
                  </DropdownMenuItem>

                </DropdownMenuContent>
              </DropdownMenu>
            </div>
            <div>
              <Link to="/cart" className="relative cursor-pointer">
                <ShoppingBag />
                {
                  cart.length > 0 &&  <Button size={'icon'} className="absolute -inset-y-3 left-2 text-xs rounded-full h-6 w-6">{cart?.length}</Button>
                }
              </Link>
            </div>
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="Loading..." />
              <AvatarFallback>KP</AvatarFallback>
            </Avatar>
            <Button onClick={logout} className="bg-orange hover:bg-hoverOrange">Logout</Button>
          </div>
        </div>
        <div className="md:hidden lg:hidden">
          <MobileNavbar />
        </div>
      </div>
    </div>
  )
}

export default Navbar;




const MobileNavbar = () => {

  const {user,logout } = useUserStore();
  const {cart} = useCartStore();
  const {setTheme} = useThemeStore();
 
  return (
    <Sheet>
      <SheetTrigger asChild>
        <Button
          size={"icon"}
          className="rounded-full bg-gray-200 text-black hover:bg-gray-200"
          variant="outline"
        >
          <Menu size={'18'} />
        </Button>
      </SheetTrigger>
      <SheetContent className="flex flex-col">
        <SheetHeader className="flex flex-row items-center justify-between mt-2">
          <SheetTitle>KP Hotel's</SheetTitle>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="icon">
                <Sun className="h-[1.2rem] w-[1.2rem] rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
                <Moon className="absolute h-[1.2rem] w-[1.2rem] rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
                <span className="sr-only">Toggle theme</span>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem onClick={()=> setTheme('light')}>
                Light
              </DropdownMenuItem>
              <DropdownMenuItem onClick={()=> setTheme('light')}>
                Dark
              </DropdownMenuItem>

            </DropdownMenuContent>
          </DropdownMenu>
        </SheetHeader>
        <Separator className="my-2" />
        <SheetDescription className="flex-1">
          <Link to="/profile" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900">
            <User />
            <span>Profile</span>
          </Link>
          <Link to="/order/status" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900">
            <HandPlatter />
            <span>Order</span>
          </Link>
          <Link to="/cart" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900">
            <ShoppingBag />
            <span>Cart {cart?.length}</span>
          </Link>
          {
            user?.admin && (
              <>
                <Link to="/admin/menu" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900">
                  <SquareMenu />
                  <span>Menu</span>
                </Link>
                <Link to="/admin/restaurant" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900">
                  <UtensilsCrossed />
                  <span>Restaurant</span>
                </Link>
                <Link to="/admin/orders" className="flex items-center gap-4 hover:bg-gray-200 px-3 py-2 rounded-lg cursor-pointer hover:text-gray-900">
                  <PackageCheck />
                  <span>Order's</span>
                </Link>
              </>
            )
          }
        </SheetDescription>
        <SheetFooter className="flex flex-col gap-5">
          <div className="flex flex-row items-center gap-2">
            <Avatar>
              <AvatarImage src={user?.profilePicture} alt="Loading..." />
              <AvatarFallback>KP</AvatarFallback>
            </Avatar>
            <h1 className="font-bold">KP-Hotel's</h1>
          </div>
          <SheetClose asChild>
            <Button onClick={logout} type="submit" className="bg-amber-500 hover:bg-amber-600">Logout</Button>
          </SheetClose>

        </SheetFooter>
      </SheetContent>
    </Sheet>
  );
};