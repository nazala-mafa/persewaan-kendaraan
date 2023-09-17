import { Table } from "antd";
import { useEffect, useState } from "react";
import { dateFormatter } from "@/helper";
import TransactionTableAction from "./TransactionTableAction";
import dayjs from "dayjs";

const columns = [
    {
        title: "No",
        dataIndex: "no",
    },
    {
        title: "Description",
        dataIndex: "description",
        sorter: true,
    },
    {
        title: "Code",
        dataIndex: "code",
        sorter: true,
    },
    {
        title: "Rate Euro",
        dataIndex: "rate_euro",
        render: (v) => v.toLocaleString(),
        sorter: true,
    },
    {
        title: "Date Paid",
        dataIndex: "date_paid",
        render: (v) => dateFormatter(v),
        sorter: true,
    },
    {
        title: "Category",
        dataIndex: "category_name",
        render: (v) => <span className="capitalize">{v}</span>,
    },
    {
        title: "Value (IDR)",
        dataIndex: "value_idr",
        render: (v) => v.toLocaleString(),
        sorter: true,
    },
];

export default function TransactionTable({ urlParams, setUrlParams }) {
    const [data, setData] = useState();
    const [loading, setLoading] = useState(false);
    const [tableParams, setTableParams] = useState({
        pagination: {
            current: 1,
            pageSize: 10,
            total: 0,
        },
    });
    const fetchData = () => {
        setLoading(true);
        fetch(
            route("api.transaction", {
                ...urlParams,
                date_from:
                    urlParams.date_from &&
                    dayjs(urlParams.date_from).format("YYYY-MM-DD"),
                date_to:
                    urlParams.date_to &&
                    dayjs(urlParams.date_to).format("YYYY-MM-DD"),
            })
        )
            .then((res) => res.json())
            .then(({ data, total }) => {
                setData(
                    data.map((d, idx) => ({
                        no: idx + 1 + urlParams.per_page * (urlParams.page - 1),
                        ...d,
                    }))
                );
                setLoading(false);
                setTableParams({
                    ...tableParams,
                    pagination: {
                        ...tableParams.pagination,
                        total,
                    },
                });
            });
    };

    useEffect(() => {
        fetchData();
    }, [JSON.stringify(urlParams)]);

    const handleTableChange = (pagination, filters, sorter) => {
        console.log(sorter);
        setUrlParams({
            ...urlParams,
            page: pagination.current,
            per_page: pagination.pageSize,
            order_by: sorter.field,
            order_dir: sorter.order,
        });
        setTableParams({
            pagination,
            filters,
            ...sorter,
        });
        if (pagination.pageSize !== tableParams.pagination?.pageSize) {
            setData([]);
        }
    };
    return (
        <Table
            rowKey={(record) => record.td_id}
            dataSource={data}
            pagination={tableParams.pagination}
            loading={loading}
            onChange={handleTableChange}
            footer={() =>
                `Displays ${data?.length} of ${tableParams?.pagination?.total} data`
            }
        >
            {columns.map((column) => (
                <Table.Column key={column.dataIndex} {...column} />
            ))}
            <Table.Column
                title="Action"
                render={(_, item) => (
                    <TransactionTableAction
                        header_id={item.id}
                        detail_id={item.td_id}
                        name={item.name}
                    />
                )}
            />
        </Table>
    );
}
