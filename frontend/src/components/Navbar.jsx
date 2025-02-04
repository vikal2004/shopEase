import { useState } from "react"
import { Link } from "react-router-dom"
const Navbar=({user})=>{
    const[menuOpen, setMenuOpen]=useState(false);
    const links=[
        {name:"Home", path: '/home'},
        {name:"Shop", path:"/products"},
    ]
    const guestLinks=[
        ...links,
        {name:"Search", path:"/search"},
        {name:"Login" , path:"/login"},
        {name:"Register" , path:"/register"}
    ]
    const userLinks=[
        ...guestLinks,
        { name: "Cart", path: "/cart" },
        { name: "Wishlist", path: "/wishlist" },
        { name: "Orders", path: "/orders" },
        { name: "Profile", path: "/profile" },
        { name: "Logout", path: "#" },
    ]
    const adminLinks = [
        ...links,
        { name: "Cart", path: "/cart" },
        { name: "Orders", path: "/orders" },
        { name: "Profile", path: "/profile" },
        { name: "Admin Dashboard", path: "/admin" },
        { name: "Logout", path: "#" },
      ];

    const navLinks=user?.role==="admin" ? adminLinks : user ? userLinks : guestLinks
     
    return(
        <>
        <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-2">
            <div className="flex justify-between h-16">
                {/* Logo */}
                <div className="flex items-center">
                  <Link to="/" className="text-xl font-bold text-gray-800">
                    ShopEase
                   </Link>
               </div>

               {/* Desktop Menu */}
                    <div className="hidden md:flex space-x-6 items-center">
                        {navLinks.map((link) => (
                        <Link
                            key={link.name}
                            to={link.path}
                            className="text-gray-700 hover:text-blue-600 transition"
                        >
                            {link.name}
                        </Link>
                        ))}
                    </div>

                     {/* Mobile Menu Button */}
                    <div className="md:hidden flex items-center">
                    <button onClick={() => setMenuOpen(!menuOpen)} className="text-gray-700 focus:outline-none">
                     {menuOpen ? "✖" : "☰"}
                   </button>
                    </div>





            </div>
        </div>

         {/* Mobile Menu */}
      {menuOpen && (
        <div className="md:hidden bg-white border-t p-4">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              className="block text-gray-700 py-2 hover:text-blue-600"
              onClick={() => setMenuOpen(false)}
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
        </nav>
        </>
    )
}

export default Navbar;