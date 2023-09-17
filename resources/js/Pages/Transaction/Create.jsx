import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TransactionDetail from "./Partials/TransactionDetail";
import TransactionForm from "./Partials/TransactionForm";
import { useState } from "react";

export default function Create({ auth, categories }) {
    const { data, setData, post } = useForm({
        description: "",
        code: "",
        rate_euro: "",
        date_paid: "",
        transaction_details: [
            {
                transaction_group_id: 1,
                transaction_category_id: 1,
                details: [
                    {
                        name: "",
                        value_idr: "",
                    },
                ],
            },
        ],
    });
    const [errors, setErrors] = useState({});

    const handleSave = () => {
        post(route("transaction.store"), {
            data,
            onSuccess(_) {
                console.log("success");
            },
            onError(err) {
                console.log(err);
                setErrors(err);
            },
        });
    };

    return (
        <AuthenticatedLayout
            menu={"transaction.create"}
            openmenu={"transaction"}
            breadcrumb={["Transaction", "Create"]}
            title="Input Data Transaksi"
            user={auth.user}
        >
            <Head title="Input Data Transaksi" />

            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-x-auto border-2 p-4">
                        <h2 className="text-xl mb-6">INPUT DATA TRANSAKSI</h2>

                        <TransactionForm
                            categories={categories}
                            data={data}
                            setData={setData}
                            errors={errors}
                        />

                        <section className="flex justify-end gap-4 mt-4">
                            <button
                                className="bg-blue-600 p-2 px-6 border-2 text-white border-black"
                                onClick={handleSave}
                            >
                                Tambah
                            </button>
                            <Link
                                href={route("transaction.index")}
                                className="bg-red-600 p-2 px-6 border-2 text-white border-black"
                            >
                                Batal
                            </Link>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
