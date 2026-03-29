import { NavLink, Outlet, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { IAdminRoutes } from "../customer/types";
import { ICustomerRoutes } from "../customer/types";
import { setLogoutData } from "../../redux/slices/auth.slice";

const navItems = [
  { label: "Dashboard", path: IAdminRoutes.Home },
  { label: "Orders", path: IAdminRoutes.Orders },
  { label: "Products", path: IAdminRoutes.Products },
  { label: "Customers", path: IAdminRoutes.Customers },
];

const AdminLayout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    dispatch(setLogoutData());
    navigate(ICustomerRoutes.Home);
  };

  return (
    <div className="flex h-screen overflow-hidden bg-gray-50 text-primary">
      {/* Sidebar */}
      <aside className="w-[220px] shrink-0 bg-white border-r border-gray-200 flex flex-col">
        <div className="px-5 py-5 border-b border-gray-200">
          <p className="text-[11px] font-semibold uppercase tracking-widest opacity-40 mb-1">
            Admin
          </p>
          <p className="text-[17px] font-bold">JJ Grocery</p>
        </div>
        <nav className="flex-1 py-4">
          {navItems.map((item) => (
            <NavLink
              key={item.path}
              to={item.path}
              end={item.path === IAdminRoutes.Home}
              className={({ isActive }) =>
                `block px-5 py-3 text-[14px] font-medium transition-colors ${
                  isActive
                    ? "bg-gray-100 text-primary"
                    : "text-gray-500 hover:text-primary hover:bg-gray-50"
                }`
              }
            >
              {item.label}
            </NavLink>
          ))}
        </nav>
        <div className="px-5 py-4 border-t border-gray-200">
          <button
            onClick={handleLogout}
            className="text-[13px] text-gray-400 hover:text-red-500 transition-colors"
          >
            Sign out
          </button>
        </div>
      </aside>

      {/* Main content */}
      <div className="flex-1 overflow-y-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default AdminLayout;
