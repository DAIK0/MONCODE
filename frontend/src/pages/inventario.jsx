import HeaderA from "../components/HeaderAdmin";
import SidebarA from "../components/Sidebar";
import { ProductsInventoryGrid } from "../components/ProductsInventoryGrid"

function inventario() {
    return (
        <div className="min-h-screen bg-[#e5e5e5]">
            <HeaderA />
            <SidebarA />
            <main className="ml-0 md:ml-32 mt-20 px-4 md:px-8 py-8">
                <ProductsInventoryGrid />
            </main>
        </div>
    )
}

export default inventario