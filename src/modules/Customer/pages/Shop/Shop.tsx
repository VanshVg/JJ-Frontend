import { useState } from "react";
import Sidebar from "./components/Sidebar/Sidebar";
import SidebarMobile from "./components/Sidebar/SidebarMobile/SidebarMobile";

const Shop = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <div className="h-screen flex fixed w-full">
      <Sidebar />
      <SidebarMobile
        isSidebarOpen={isSidebarOpen}
        setIsSidebarOpen={setIsSidebarOpen}
      />
      <div className="h-screen overflow-y-auto w-full p-2">
        <p
          className="underline font-secondary text-right text-primary mt-3 mr-3"
          onClick={() => setIsSidebarOpen(true)}
        >
          Apply Filters
        </p>
      </div>
    </div>
  );
};

export default Shop;
