import { Link, Head } from "@inertiajs/react";
import ContentCard from "./Partials/ContentCard";
import { useState } from "react";

const defaultPageData = {
    hero: {
        imageUrl: "/assets/images/hero.jpg",
    },
    products: [
        {
            title: "Google AdsWords",
            link: "#",
        },
        {
            title: "Facebook Ads",
            link: "#",
        },
        {
            title: "SEO",
            link: "#",
        },
        {
            title: "Training",
            link: "#",
        },
    ],
    articles: [
        {
            imageUrl: "/assets/images/Image00001.jpg",
            title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis amet doloribus incidunt quam error",
            body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis amet doloribus incidunt quam error. Eius mollitia obcaecati vero alias eaque consectetur, quasi ex ipsam explicabo, dignissimos pariatur impedit perferendis modi.",
            contentLink: "#",
        },
        {
            imageUrl: "/assets/images/Image00002.jpg",
            title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis amet doloribus incidunt quam error",
            body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis amet doloribus incidunt quam error. Eius mollitia obcaecati vero alias eaque consectetur, quasi ex ipsam explicabo, dignissimos pariatur impedit perferendis modi.",
            contentLink: "#",
        },
        {
            imageUrl: "/assets/images/Image00003.jpg",
            title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis amet doloribus incidunt quam error",
            body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis amet doloribus incidunt quam error. Eius mollitia obcaecati vero alias eaque consectetur, quasi ex ipsam explicabo, dignissimos pariatur impedit perferendis modi.",
            contentLink: "#",
        },
        {
            imageUrl: "/assets/images/Image00004.jpg",
            title: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis amet doloribus incidunt quam error",
            body: "Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quis amet doloribus incidunt quam error. Eius mollitia obcaecati vero alias eaque consectetur, quasi ex ipsam explicabo, dignissimos pariatur impedit perferendis modi.",
            contentLink: "#",
        },
    ],
};

export default function Welcome() {
    const [pageData, _] = useState(defaultPageData);

    return (
        <>
            <Head title="Partner Iklan" />

            <header className="flex justify-between px-2 md:px-14 py-4 border-2">
                <h1 className="text-2xl">
                    <Link href={route("dashboard")}>PartnerIklan.com</Link>
                </h1>

                <nav className="group/menu">
                    <div className="mt-1 block md:hidden">Menu</div>
                    <ul className="w-full text-center group-hover/menu:block md:group-hover/menu:flex hidden absolute right-0 bg-white p-4 top-16 md:top-0 border-2 md:border-0 md:relative md:flex md:gap-4">
                        <li>
                            <Link href="#">Homepage</Link>
                        </li>
                        <li>
                            <Link href="#">News</Link>
                        </li>
                        <li className="group/produk">
                            Produk
                            <ul className="hidden group-hover/produk:block absolute border-2 border-gray-600 p-2 bg-white">
                                <li>
                                    <Link href="#">Google</Link>
                                </li>
                                <li>
                                    <Link href="#">Facebook Ads</Link>
                                </li>
                                <li>
                                    <Link href="#">SEO</Link>
                                </li>
                                <li>
                                    <Link href="#">Training</Link>
                                </li>
                            </ul>
                        </li>
                        <li>
                            <Link href="#">Pemesanan</Link>
                        </li>
                        <li>
                            <Link href="#">Kontak</Link>
                        </li>
                    </ul>
                </nav>
            </header>

            <div
                id="heroimage"
                className="h-[300px] md:h-[500px] bg-cover"
                style={{
                    backgroundImage: `url(${pageData.hero.imageUrl})`,
                }}
            ></div>

            <section className="container mx-auto 2xl:max-w-[1024px]">
                {/* Products Card */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 px-4 md:px-8 my-10">
                    {pageData.products.map((product, idx) => (
                        <Link
                            href={product.link}
                            className="flex justify-center items-center h-36 border-2 cursor-pointer"
                            key={idx}
                        >
                            <p>{product.title}</p>
                        </Link>
                    ))}
                </div>

                {/* Contents List */}
                <div>
                    {pageData.articles.map((article, idx) => (
                        <ContentCard
                            key={idx}
                            title={article.title}
                            body={article.body}
                            contentLink={article.contentLink}
                            imageUrl={article.imageUrl}
                        />
                    ))}
                </div>
            </section>

            <div className="h-[100px]"></div>
        </>
    );
}
