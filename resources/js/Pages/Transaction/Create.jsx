import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TransactionForm from "./Partials/TransactionForm";
import { Button } from "antd";

export default function Create({ auth, categories, success }) {
    const { data, setData, post, errors } = useForm({
        description: "",
        code: "",
        rate_euro: "",
        date_paid: null,
        transaction_details: [
            {
                transaction_group_id: 1,
                transaction_category_id: 1,
                details: [
                    {
                        id: Math.random(),
                        name: "",
                        value_idr: "",
                    },
                ],
            },
        ],
    });
    const handleSave = () => {
        post(route("transaction.store"));
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

            {success && <h1>{success}</h1>}

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
                            <Button
                                className="bg-sky-400 text-white hover:bg-white"
                                onClick={handleSave}
                                size="large"
                                type="primary"
                            >
                                Add
                            </Button>
                            <Link href={route("transaction.index")}>
                                <Button
                                    className="bg-red-400 text-white hover:bg-white"
                                    size="large"
                                    type="primary"
                                    danger
                                >
                                    Cancel
                                </Button>
                            </Link>
                        </section>
                    </div>
                </div>
            </div>
        </AuthenticatedLayout>
    );
}
