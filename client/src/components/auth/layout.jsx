import { Outlet } from "react-router-dom";

function AuthLayout() {
  return (
    <div className="flex min-h-screen w-full overflow-hidden">
      <div className="hidden lg:flex flex-col items-center justify-center bg-primary w-1/2 px-12 relative overflow-hidden">
        {/* Background gradient effect */}
        <div className="absolute inset-0 bg-gradient-to-br from-primary to-primary-foreground/20 opacity-90"></div>
        
        {/* Decorative circles */}
        <div className="absolute top-[20%] left-[20%] w-72 h-72 bg-primary-foreground/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-[20%] right-[20%] w-96 h-96 bg-primary-foreground/10 rounded-full blur-3xl"></div>
        
        <div className="max-w-md space-y-6 text-center text-primary-foreground relative z-10">
          <h1 className="text-5xl font-extrabold tracking-tight leading-tight drop-shadow-md">
            Welcome to <span className="bg-clip-text text-transparent bg-gradient-to-r from-white to-white/75">ECommerce Shopping</span>
          </h1>
          <p className="text-lg text-primary-foreground/90">
            Sign in to access the best shopping experience online.
          </p>
        </div>
      </div>
      <div className="flex flex-1 items-center justify-center bg-background px-4 py-12 sm:px-6 lg:px-8 transition-all duration-300">
        <div className="w-full max-w-md space-y-8 backdrop-blur-sm p-8 rounded-lg border border-border/50 shadow-lg">
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default AuthLayout;
