import { Link, Head } from "@inertiajs/react";

export default function Welcome() {
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
                    backgroundImage: `url(/assets/images/hero-image.jpg)`,
                }}
            ></div>

            <div
                id="cards"
                className="grid grid-cols-2 md:grid-cols-4 gap-2 md:gap-6 px-4 md:px-8 my-10"
            >
                {["Google AdsWords", "Facebook Ads", "SEO", "Training"].map(
                    (card, idx) => (
                        <div
                            className="flex justify-center items-center h-36 border-2"
                            key={idx}
                        >
                            <p>{card}</p>
                        </div>
                    )
                )}
            </div>

            <div id="contents">
                <div className="flex flex-col md:flex-row gap-2 md:gap-8 px-8 mb-10">
                    <div className="flex justify-center items-center border-2 h-40 w-full md:w-[30vw]">
                        <p>Gambar</p>
                    </div>
                    <div className="w-full md:w-[70vw]">
                        <h2 className="text-xl mb-2">Google AdsWords</h2>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Omnis aut reiciendis a veniam enim voluptates
                            ipsam, dolores, facere earum repellendus ipsum? Non
                            tempore repudiandae perferendis, facere unde quaerat
                            totam omnis! Quisquam sed repudiandae illum eveniet
                            atque quam qui quae optio harum nulla recusandae
                            accusantium, neque minima dignissimos accusamus
                            consequuntur expedita quidem vero voluptate
                            repellendus voluptates nisi explicabo rem alias.
                            Tempora.
                        </p>
                        <div className="flex justify-end">
                            <Link className="text-xl" href="#">
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row-reverse gap-2 md:gap-8 px-8 mb-10">
                    <div className="flex justify-center items-center border-2 h-40 w-full md:w-[30vw]">
                        <p>Gambar</p>
                    </div>
                    <div className="w-full md:w-[70vw]">
                        <h2 className="text-xl mb-2">Google AdsWords</h2>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Omnis aut reiciendis a veniam enim voluptates
                            ipsam, dolores, facere earum repellendus ipsum? Non
                            tempore repudiandae perferendis, facere unde quaerat
                            totam omnis! Quisquam sed repudiandae illum eveniet
                            atque quam qui quae optio harum nulla recusandae
                            accusantium, neque minima dignissimos accusamus
                            consequuntur expedita quidem vero voluptate
                            repellendus voluptates nisi explicabo rem alias.
                            Tempora.
                        </p>
                        <div className="flex justify-end">
                            <Link className="text-xl" href="#">
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>

                <div className="flex flex-col md:flex-row gap-2 md:gap-8 px-8 mb-10">
                    <div className="flex justify-center items-center border-2 h-40 w-full md:w-[30vw]">
                        <p>Gambar</p>
                    </div>
                    <div className="w-full md:w-[70vw]">
                        <h2 className="text-xl mb-2">Google AdsWords</h2>
                        <p>
                            Lorem ipsum dolor, sit amet consectetur adipisicing
                            elit. Omnis aut reiciendis a veniam enim voluptates
                            ipsam, dolores, facere earum repellendus ipsum? Non
                            tempore repudiandae perferendis, facere unde quaerat
                            totam omnis! Quisquam sed repudiandae illum eveniet
                            atque quam qui quae optio harum nulla recusandae
                            accusantium, neque minima dignissimos accusamus
                            consequuntur expedita quidem vero voluptate
                            repellendus voluptates nisi explicabo rem alias.
                            Tempora.
                        </p>
                        <div className="flex justify-end">
                            <Link className="text-xl" href="#">
                                Read More
                            </Link>
                        </div>
                    </div>
                </div>
            </div>

            <div className="h-[100px]"></div>
        </>
    );
}
