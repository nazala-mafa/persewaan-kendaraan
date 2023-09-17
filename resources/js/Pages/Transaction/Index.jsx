import { Link, usePage } from "@inertiajs/react";
import { Button, DatePicker, Input, Select, message } from "antd";
import TransactionTable from "./Partials/TransactionTable";
import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";
import { useEffect, useState } from "react";
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
    const [urlParams, setUrlParams] = useState(defaultParams);
    const [messageApi, contextHolder] = message.useMessage();
    const { success } = usePage().props.flash;

    useEffect(() => {
        success && messageApi.success(success);
    }, [success]);

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
            user={auth.user}
        >
            {contextHolder}

            <div className="flex flex-col md:flex-row justify-between">
                <Link
                    href={route("transaction.create")}
                    className="mb-3 md:mb-0 md:me-3"
                >
                    <Button className="w-full bg-sky-400" type="primary">
                        Add New Transaction
                    </Button>
                </Link>

                <div className="flex item items-center gap-2 flex-col md:flex-row">
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
                        className="w-full capitalize"
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
