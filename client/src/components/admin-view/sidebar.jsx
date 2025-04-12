import {
  BadgeCheck,
  ChartNoAxesCombined,
  LayoutDashboard,
  ShoppingBasket,
} from "lucide-react";
import { Fragment } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { Sheet, SheetContent, SheetHeader, SheetTitle } from "../ui/sheet";

const adminSidebarMenuItems = [
  {
    id: "dashboard",
    label: "Dashboard",
    path: "/admin/dashboard",
    icon: <LayoutDashboard />,
  },
  {
    id: "products",
    label: "Products",
    path: "/admin/products",
    icon: <ShoppingBasket />,
  },
  {
    id: "orders",
    label: "Orders",
    path: "/admin/orders",
    icon: <BadgeCheck />,
  },
];

function MenuItems({ setOpen }) {
  const navigate = useNavigate();
  const location = useLocation();

  return (
    <nav className="mt-8 flex-col flex gap-3">
      {adminSidebarMenuItems.map((menuItem) => {
        const isActive = location.pathname === menuItem.path;
        return (
          <div
            key={menuItem.id}
            onClick={() => {
              navigate(menuItem.path);
              setOpen ? setOpen(false) : null;
            }}
            className={`flex cursor-pointer text-lg items-center gap-3 rounded-md px-4 py-3 
              transition-all duration-200 hover:bg-primary/10 
              ${isActive 
                ? "bg-primary/10 text-primary font-medium shadow-sm border-l-4 border-primary" 
                : "text-muted-foreground hover:text-foreground"
              }`}
          >
            <span className={`${isActive ? "text-primary" : ""}`}>{menuItem.icon}</span>
            <span>{menuItem.label}</span>
          </div>
        );
      })}
    </nav>
  );
}

function AdminSideBar({ open, setOpen }) {
  const navigate = useNavigate();

  return (
    <Fragment>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-72 p-6">
          <div className="flex flex-col h-full">
            <SheetHeader className="border-b pb-4">
              <SheetTitle className="flex gap-3 items-center">
                <ChartNoAxesCombined size={30} className="text-primary" />
                <h1 className="text-2xl font-extrabold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">Admin Panel</h1>
              </SheetTitle>
            </SheetHeader>
            <MenuItems setOpen={setOpen} />
          </div>
        </SheetContent>
      </Sheet>
      <aside className="hidden w-72 flex-col border-r bg-background p-6 shadow-sm lg:flex">
        <div
          onClick={() => navigate("/admin/dashboard")}
          className="flex cursor-pointer items-center gap-3 pb-4 border-b transition-all duration-200 hover:opacity-80"
        >
          <ChartNoAxesCombined size={30} className="text-primary" />
          <h1 className="text-2xl font-extrabold bg-gradient-to-r from-primary to-primary/60 text-transparent bg-clip-text">Admin Panel</h1>
        </div>
        <MenuItems />
      </aside>
    </Fragment>
  );
}

export default AdminSideBar;
