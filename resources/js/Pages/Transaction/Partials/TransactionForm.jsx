import { Card, DatePicker, Input, InputNumber } from "antd";
import TransactionDetail from "./TransactionDetail";

export default function TransactionForm({ categories, data, setData, errors }) {
    const transactionDetailHandlers = {
        setTransactionCategoryId(tgId, tcId) {
            const editedTdIdx = data.transaction_details.findIndex(
                (td) => td.transaction_group_id === tgId
            );
            let newtd = [...data.transaction_details];
            newtd[editedTdIdx].transaction_category_id = tcId;
            setData("transaction_details", newtd);
        },
        setTransactions(tgId, newDetail) {
            const editedTdIdx = data.transaction_details.findIndex(
                (td) => td.transaction_group_id === tgId
            );
            let newtd = [...data.transaction_details];
            newtd[editedTdIdx].details = newDetail;
            setData("transaction_details", newtd);
        },
        addTransactionDetailHandler() {
            setData("transaction_details", [
                ...data.transaction_details,
                {
                    transaction_group_id: Math.random(),
                    transaction_category_id: 1,
                    details: [
                        {
                            id: Math.random(),
                            name: "",
                            value_idr: "",
                        },
                    ],
                },
            ]);
        },
        removeTransactionDetailHandler(transaction_group_id) {
            setData("transaction_details", [
                ...data.transaction_details.filter(
                    (td) => td.transaction_group_id != transaction_group_id
                ),
            ]);
        },
    };

    return (
        <>
            <section>
                <div className="flex flex-col md:flex-row">
                    <div className="flex-1 flex mb-4">
                        <label htmlFor="description">Description</label>
                        <div className="ms-12 md:ms-8 md:me-8 w-full">
                            <Input.TextArea
                                id="description"
                                rows={4}
                                value={data.description}
                                onChange={(e) =>
                                    setData("description", e.target.value)
                                }
                            />
                            {errors?.description && (
                                <p className="text-red-600">
                                    {errors?.description}
                                </p>
                            )}
                        </div>
                    </div>
                    <div className="flex-1">
                        <div className="flex gap-4 mb-2">
                            <label
                                className="min-w-[100px] lg:min-w-[200px]"
                                htmlFor="code"
                            >
                                Code
                            </label>
                            <div className="w-full">
                                <Input
                                    id="code"
                                    value={data.code}
                                    className="w-full"
                                    onChange={(e) =>
                                        setData("code", e.target.value)
                                    }
                                />
                                {errors?.code && (
                                    <p className="text-red-600">
                                        {errors?.code}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-4 mb-2">
                            <label
                                className="min-w-[100px] lg:min-w-[200px]"
                                htmlFor="rate_euro"
                            >
                                Rate Euro
                            </label>
                            <div className="w-full">
                                <InputNumber
                                    id="rate_euro"
                                    value={data.rate_euro}
                                    formatter={(value) =>
                                        `${value}`.replace(
                                            /\B(?=(\d{3})+(?!\d))/g,
                                            ","
                                        )
                                    }
                                    parser={(value) =>
                                        value?.replace(/\$\s?|(,*)/g, "")
                                    }
                                    className="w-full"
                                    onChange={(v) => setData("rate_euro", v)}
                                />
                                {errors?.rate_euro && (
                                    <p className="text-red-600">
                                        {errors?.rate_euro}
                                    </p>
                                )}
                            </div>
                        </div>
                        <div className="flex gap-4 mb-2">
                            <label
                                className="min-w-[100px] lg:min-w-[200px]"
                                htmlFor="date_paid"
                            >
                                Date Paid
                            </label>
                            <div className="w-full">
                                <DatePicker
                                    className="w-full"
                                    id="date_paid"
                                    format={"DD-MM-YYYY"}
                                    value={data.date_paid}
                                    onChange={(v) => setData("date_paid", v)}
                                />
                                {errors?.date_paid && (
                                    <p className="text-red-600">
                                        {errors?.date_paid}
                                    </p>
                                )}
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            <Card title="DATA TRANSAKSI">
                {data.transaction_details.map((td, idx) => (
                    <TransactionDetail
                        key={td.transaction_group_id}
                        categories={categories}
                        data={td}
                        handlers={transactionDetailHandlers}
                        parentIdx={idx}
                        showClose={data.transaction_details.length !== 1}
                        showAdd={data.transaction_details.length - 1 === idx}
                        errors={errors}
                    />
                ))}
            </Card>
        </>
    );
}
