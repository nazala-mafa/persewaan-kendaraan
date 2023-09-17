import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import TransactionForm from "./Partials/TransactionForm";
import dayjs from "dayjs";
import { Button, Card } from "antd";

export default function Create({ auth, categories, transaction }) {
    const { data, setData, put } = useForm({
        ...transaction,
        date_paid: dayjs(transaction.date_paid),
    });

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
            menu={"transaction"}
            breadcrumb={["Transaction", "Edit"]}
            title="Input Transaction Data"
            user={auth.user}
        >
            <Head title="Input Data Transaksi" />

            <Card>
                <TransactionForm
                    categories={categories}
                    data={data}
                    setData={setData}
                />

                <section className="flex justify-end gap-4 mt-4">
                    <Button
                        className="bg-sky-400 text-white hover:bg-white"
                        onClick={handleSave}
                        size="large"
                        type="primary"
                    >
                        Ubah
                    </Button>
                    <Link href={route("transaction.index")}>
                        <Button
                            className="bg-red-400 text-white hover:bg-white"
                            size="large"
                            type="primary"
                            danger
                        >
                            Batal
                        </Button>
                    </Link>
                </section>
            </Card>
        </AuthenticatedLayout>
    );
}
