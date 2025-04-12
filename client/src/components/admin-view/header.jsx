import { AlignJustify, LogOut } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { logoutUser } from "@/store/auth-slice";

function AdminHeader({ setOpen }) {
  const dispatch = useDispatch();

  function handleLogout() {
    dispatch(logoutUser());
  }

  return (
    <header className="flex h-16 items-center justify-between px-6 py-4 bg-background border-b sticky top-0 z-30 shadow-sm">
      <Button 
        onClick={() => setOpen(true)} 
        className="lg:hidden sm:block hover:bg-primary/10 hover:text-primary transition-all duration-200"
        variant="ghost"
        size="icon"
      >
        <AlignJustify className="h-5 w-5" />
        <span className="sr-only">Toggle Menu</span>
      </Button>
      <div className="flex flex-1 justify-end">
        <Button
          onClick={handleLogout}
          className="inline-flex gap-2 items-center rounded-md px-4 py-2 text-sm font-medium transition-all duration-200 hover:bg-destructive/90 hover:shadow-md"
          variant="destructive"
        >
          <LogOut className="h-4 w-4" />
          Logout
        </Button>
      </div>
    </header>
  );
}

export default AdminHeader;
