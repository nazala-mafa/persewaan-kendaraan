import NewAuthenticatedLayout from "@/Layouts/NewAuthenticatedLayout";
import { Link } from "@inertiajs/react";
import { Button, DatePicker, Input, Select, Space } from "antd";
import TransactionTable from "./Partials/TransactionTable";

export default function Index({ auth, categories }) {
    const { user } = auth;

    return (
        <NewAuthenticatedLayout
            menu={"transaction.index"}
            openmenu={"transaction"}
            breadcrumb={["Transaction", "List"]}
            title="Transaction Data Lists"
        >
            <div className="flex justify-between">
                <Link href={route("transaction.create")}>
                    <Button>Add New Transaction</Button>
                </Link>

                <div className="flex gap-2">
                    <DatePicker.RangePicker allowClear />
                    <Select
                        placeholder="All Transactions"
                        allowClear
                        options={categories.map((c) => ({
                            value: c.id,
                            label: c.name,
                        }))}
                    />
                    <Input.Search allowClear />
                </div>
            </div>

            <TransactionTable />
        </NewAuthenticatedLayout>
    );
}
