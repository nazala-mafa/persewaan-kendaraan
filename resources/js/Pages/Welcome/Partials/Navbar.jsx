import { Link } from "@inertiajs/react";

export default function Navbar({ menus }) {
    return (
        <nav className="group/menu">
            <div className="mt-1 block md:hidden">Menu</div>
            <ul className="w-full text-center group-hover/menu:block md:group-hover/menu:flex hidden absolute right-0 bg-white p-4 top-16 md:top-0 border-2 md:border-0 md:relative md:flex md:gap-4">
                {menus.map((menu, idx) => {
                    if (menu.link) {
                        return (
                            <li key={idx}>
                                <Link href={menu.link}>{menu.label}</Link>
                            </li>
                        );
                    } else if (!menu.link && menu.children) {
                        return (
                            <li className="group/produk" key={idx}>
                                {menu.label}
                                <ul className="hidden group-hover/produk:block absolute border-2 border-gray-600 p-2 bg-white">
                                    {menu.children.map((menu2, idx) => (
                                        <li
                                            key={idx}
                                            className="hover:bg-gray-500 hover:text-white py-1 px-4"
                                        >
                                            <Link href={menu2.link}>
                                                {menu2.label}
                                            </Link>
                                        </li>
                                    ))}
                                </ul>
                            </li>
                        );
                    }
                })}
            </ul>
        </nav>
    );
}
