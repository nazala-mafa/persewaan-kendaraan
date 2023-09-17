import { Link, Head } from "@inertiajs/react";
import ContentCard from "./Partials/ContentCard";
import { useState } from "react";
import Navbar from "./Partials/Navbar";
import ProductCard from "./Partials/ProductCard";

const defaultPageData = {
    hero: {
        imageUrl: "/assets/images/hero.jpg",
    },
    products: [
        {
            imageUrl: "/assets/images/Image00001.jpg",
            title: "Google AdsWords",
            link: "#",
        },
        {
            imageUrl: "/assets/images/Image00002.jpg",
            title: "Facebook Ads",
            link: "#",
        },
        {
            imageUrl: "/assets/images/Image00004.jpg",
            title: "SEO",
            link: "#",
        },
        {
            imageUrl: "/assets/images/Image00003.jpg",
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
    menus: [
        {
            label: "Homepage",
            link: "#",
        },
        {
            label: "News",
            link: "#",
        },
        {
            label: "Produk",
            children: [
                {
                    label: "Google",
                    link: "#",
                },
                {
                    label: "Facebook Ads",
                    link: "#",
                },
                {
                    label: "SEO",
                    link: "#",
                },
                {
                    label: "Training",
                    link: "#",
                },
            ],
        },
        {
            label: "Pemesanan",
            link: "#",
        },
        {
            label: "Kontak",
            link: "#",
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

                <Navbar menus={pageData.menus} />
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
                <div className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 px-4 md:px-8 mt-10 mb-20">
                    {pageData.products.map((product, idx) => (
                        <ProductCard
                            key={idx}
                            title={product.title}
                            link={product.link}
                            imageUrl={product.imageUrl}
                        />
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
