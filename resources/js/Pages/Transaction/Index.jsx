import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { dateFixer, dateFormatter, parseParams } from "@/helper";
import { Head, Link, router, useForm } from "@inertiajs/react";
import { useEffect } from "react";
import Pagination from "./Partials/Pagination";
import { FaPencil, FaTrash } from "react-icons/fa6";

export default function Dashboard(props) {
    const { auth, categories, transactions, transactionCount } = props;
    const {
        data,
        setData,
        get,
        delete: destroy,
    } = useForm({
        date_from: "",
        date_to: "",
        category_id: "",
        search: "",
        page: 1,
        take: 10,
    });

    function filterAttempt() {
        get(route("transaction.index"));
    }

    const takeHandler = (e) => {
        setData("page", 1);
        setData("take", e.target.value);
        router.reload({
            data: {
                ...data,
                page: 1,
                take: e.target.value,
            },
        });
    };

    const paginateHandler = (currentPage) => {
        setData("page", currentPage);
        router.reload({
            data: {
                ...data,
                page: currentPage,
            },
        });
    };

    useEffect(() => {
        let paramsData = parseParams(window.location.search);
        setData({
            date_from: dateFixer(paramsData.date_from) || "",
            date_to: dateFixer(paramsData.date_to) || "",
            category_id: paramsData.category_id || "",
            search: paramsData.search || "",
            page: parseInt(paramsData?.page) || 1,
            take: parseInt(paramsData?.take) || 10,
        });
    }, []);

    const deleteHandler = (transactionHeaderId) => {
        destroy(route("transaction.destroy", transactionHeaderId));
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    List Data Transaksi
                </h2>
            }
        >
            <Head title="List Data Transaksi" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-x-auto border-2 p-4">
                        {/* Header */}
                        <div>
                            <div className="flex flex-col md:flex-row justify-between">
                                <Link
                                    href={route("transaction.create")}
                                    className="border-2 p-2 border-gray-600 mb-2"
                                >
                                    Tambah Data
                                </Link>
                                {/* Filters */}
                                <div className="flex gap-2 flex-col md:flex-row">
                                    <input
                                        type="datetime-local"
                                        className="border-2 p-2"
                                        value={data.date_from}
                                        onChange={(e) =>
                                            setData("date_from", e.target.value)
                                        }
                                    />
                                    <div className="flex items-center">to</div>
                                    <input
                                        type="datetime-local"
                                        className="border-2 p-2"
                                        value={data.date_to}
                                        onChange={(e) =>
                                            setData("date_to", e.target.value)
                                        }
                                    />
                                    <select
                                        value={data.category_id}
                                        onChange={(e) =>
                                            setData(
                                                "category_id",
                                                e.target.value
                                            )
                                        }
                                        className="capitalize"
                                    >
                                        {/* <option value={''}>semua kategori</option> */}
                                        {categories.map((c) => (
                                            <option key={c.id} value={c.id}>
                                                {c.name}
                                            </option>
                                        ))}
                                    </select>
                                    <input
                                        type="search"
                                        className="border-2 p-2"
                                        value={data.search}
                                        onChange={(e) =>
                                            setData("search", e.target.value)
                                        }
                                        placeholder="search"
                                    />
                                    <button
                                        className="border-2 p-2 border-gray-600"
                                        onClick={filterAttempt}
                                    >
                                        Search
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Body */}
                        <div className="overflow-auto">
                            <table className="table-auto my-4">
                                <thead>
                                    <tr>
                                        <th className="border-2 whitespace-nowrap py-2 px-4">
                                            No
                                        </th>
                                        <th className="border-2 whitespace-nowrap py-2 px-4">
                                            Deskripsi
                                        </th>
                                        <th className="border-2 whitespace-nowrap py-2 px-4">
                                            Code
                                        </th>
                                        <th className="border-2 whitespace-nowrap py-2 px-4">
                                            Rate Euro
                                        </th>
                                        <th className="border-2 whitespace-nowrap py-2 px-4">
                                            Date Paid
                                        </th>
                                        <th className="border-2 whitespace-nowrap py-2 px-4">
                                            Kategori
                                        </th>
                                        <th className="border-2 whitespace-nowrap py-2 px-4">
                                            Nama Transaksi
                                        </th>
                                        <th className="border-2 whitespace-nowrap py-2 px-4">
                                            Nominal (IDR)
                                        </th>
                                        <th className="border-2 whitespace-nowrap py-2 px-4">
                                            Aksi
                                        </th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {transactions.map((t, idx) => (
                                        <tr key={idx}>
                                            <td className="border-2 whitespace-nowrap py-2 px-4">
                                                {idx + 1}
                                            </td>
                                            <td className="border-2 whitespace-nowrap py-2 px-4">
                                                {t.description}
                                            </td>
                                            <td className="border-2 whitespace-nowrap py-2 px-4">
                                                {t.code}
                                            </td>
                                            <td className="border-2 whitespace-nowrap py-2 px-4">
                                                {t.rate_euro.toLocaleString()}
                                            </td>
                                            <td className="border-2 whitespace-nowrap py-2 px-4">
                                                {dateFormatter(t.date_paid)}
                                            </td>
                                            <td className="border-2 whitespace-nowrap py-2 px-4 capitalize">
                                                {t.category_name}
                                            </td>
                                            <td className="border-2 whitespace-nowrap py-2 px-4">
                                                {t.name}
                                            </td>
                                            <td className="border-2 whitespace-nowrap py-2 px-4">
                                                {t.value_idr.toLocaleString()}
                                            </td>
                                            <td className="border-2 whitespace-nowrap py-2 px-4">
                                                <div className="flex gap-2">
                                                    <button
                                                        onClick={() =>
                                                            deleteHandler(
                                                                t.td_id,
                                                                t.name
                                                            )
                                                        }
                                                    >
                                                        <FaTrash />
                                                    </button>
                                                    <Link
                                                        href={route(
                                                            "transaction.edit",
                                                            t.id
                                                        )}
                                                    >
                                                        <FaPencil />
                                                    </Link>
                                                </div>
                                            </td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>

                        {/* Footer */}
                        <div className="flex justify-between mt-6">
                            <div className="flex items-center gap-4">
                                <select
                                    value={data.take}
                                    onChange={takeHandler}
                                >
                                    <option value="5">5</option>
                                    <option value="10">10</option>
                                    <option value="20">20</option>
                                    <option value="50">50</option>
                                </select>
                                <p>
                                    Menampilkan {transactions.length} dari{" "}
                                    {transactionCount} data
                                </p>
                            </div>

                            <Pagination
                                currentPage={data.page}
                                dataLength={transactionCount}
                                itemsPerPage={data.take}
                                setCurrentPage={paginateHandler}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
