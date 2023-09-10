import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TransactionForm from "./Partials/TransactionForm";

export default function Create({ auth, categories, transaction }) {
    const { data, setData, put } = useForm(transaction);

    const handleSave = () => {
        put(route("transaction.update", transaction.id), {
            data,
            onSuccess(res) {
                console.log("success", res);
            },
            onError(err) {
                console.log("error", err);
            },
        });
    };

    return (
        <AuthenticatedLayout
            user={auth.user}
            header={
                <h2 className="font-semibold text-xl text-gray-800 leading-tight">
                    Input Data Transaksi
                </h2>
            }
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
                        />

                        <section className="flex justify-end gap-4 mt-4">
                            <button
                                className="bg-blue-600 p-2 px-6 border-2 text-white border-black"
                                onClick={handleSave}
                            >
                                Ubah
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
