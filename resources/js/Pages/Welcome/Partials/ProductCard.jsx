import { Link } from "@inertiajs/react";

export default function ProductCard({ link, title, imageUrl = "#" }) {
    return (
        <Link
            href={link}
            className="flex justify-center items-center h-36 border-2 cursor-pointer hover:-top-2 hover:shadow-xl relative duration-200 transition-all backdrop-blur-md backdrop-opacity-50"
        >
            <img src={imageUrl} className="contrast-[.4] blur-[1px]" />
            <p className="w-full text-center bg-gray-200 py-2  absolute">
                {title}
            </p>
        </Link>
    );
}
