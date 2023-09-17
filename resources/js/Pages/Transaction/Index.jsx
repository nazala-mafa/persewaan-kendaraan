import { Link } from "@inertiajs/react";
import { Button, DatePicker, Input, Select } from "antd";
import TransactionTable from "./Partials/TransactionTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useState } from "react";
import { BiRefresh } from "react-icons/bi";

const clientDateFormat = "DD/MM/YYYY";
const defaultParams = {
    page: 1,
    per_page: 10,
    category_id: null,
    search: "",
    date_from: null,
    date_to: null,
    order_by: null,
    order_dir: null,
};

export default function Index({ auth, categories }) {
    const { user } = auth;
    const [urlParams, setUrlParams] = useState(defaultParams);

    const freshFilter = () => {
        setUrlParams(defaultParams);
    };

    const changeFilterHandler = (name, value) => {
        setUrlParams({
            ...urlParams,
            [name]: value,
        });
    };

    return (
        <AuthenticatedLayout
            menu={"transaction.index"}
            openmenu={"transaction"}
            breadcrumb={["Transaction", "List"]}
            title="Transaction Data Lists"
            user={user}
        >
            <div className="flex justify-between">
                <Link href={route("transaction.create")}>
                    <Button>Add New Transaction</Button>
                </Link>

                <div className="flex item items-center gap-2">
                    <DatePicker
                        format={clientDateFormat}
                        onChange={(d) => changeFilterHandler("date_from", d)}
                        placeholder="Start date"
                        disabledDate={(d) => d.isAfter(urlParams?.date_to)}
                        value={urlParams.date_from}
                        className="w-full"
                        allowClear
                    />
                    <span>to</span>
                    <DatePicker
                        format={clientDateFormat}
                        onChange={(d) => changeFilterHandler("date_to", d)}
                        placeholder="End date"
                        disabledDate={(d) => d.isBefore(urlParams?.date_from)}
                        value={urlParams.date_to}
                        className="w-full"
                        allowClear
                    />
                    <Select
                        placeholder="All Transactions"
                        onChange={(v) => changeFilterHandler("category_id", v)}
                        options={categories.map((c) => ({
                            value: c.id,
                            label: c.name,
                        }))}
                        value={urlParams.category_id}
                        allowClear
                    />
                    <Input.Search
                        allowClear
                        onChange={(e) =>
                            changeFilterHandler("search", e.target.value)
                        }
                        value={urlParams.search}
                    />
                    <Button
                        className="w-10 flex justify-center p-1"
                        style={{
                            display:
                                urlParams.date_from ||
                                urlParams.date_to ||
                                urlParams.search ||
                                urlParams.category_id
                                    ? "block"
                                    : "none",
                        }}
                        onClick={freshFilter}
                    >
                        <BiRefresh size={24} />
                    </Button>
                </div>
            </div>

            <TransactionTable
                urlParams={urlParams}
                setUrlParams={setUrlParams}
            />
        </AuthenticatedLayout>
    );
}
