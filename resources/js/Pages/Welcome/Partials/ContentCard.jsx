import { Link } from "@inertiajs/react";

export default function ContentCard({ imageUrl, title, body, contentLink }) {
    return (
        <div className="flex flex-col sm:flex-row border-2 mx-4 sm:mx-0 border-gray-300 sm:border-0 md:odd:flex-row-reverse gap-2 md:gap-8 px-2 py-2 sm:py-0 sm:px-8 mb-10">
            {imageUrl && (
                <div
                    className="flex justify-center items-center border-2 h-40 w-full md:w-[30vw] bg-center bg-cover"
                    style={{ backgroundImage: `url('${imageUrl}')` }}
                ></div>
            )}
            <div className="w-full md:w-[70vw]">
                <h2 className="text-xl mb-2">{title}</h2>
                <p>{body}</p>
                <div className="flex justify-end">
                    <Link className="text-xl" href={contentLink}>
                        Read More
                    </Link>
                </div>
            </div>
        </div>
    );
}
