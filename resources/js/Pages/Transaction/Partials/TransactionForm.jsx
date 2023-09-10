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
                        <div className="ms-8 md:me-8 w-full">
                            <textarea
                                id="description"
                                className="border-2 border-gray-400 p-2 w-full"
                                rows="4"
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
                                className="min-w-[100px] md:min-w-[200px]"
                                htmlFor="code"
                            >
                                Code
                            </label>
                            <div className="w-full">
                                <input
                                    type="text"
                                    id="code"
                                    className="w-full"
                                    value={data.code}
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
                                className="min-w-[100px] md:min-w-[200px]"
                                htmlFor="rate_euro"
                            >
                                Rate Euro
                            </label>
                            <div className="w-full">
                                <input
                                    className="w-full"
                                    type="text"
                                    id="rate_euro"
                                    value={data.rate_euro}
                                    onChange={(e) =>
                                        setData("rate_euro", e.target.value)
                                    }
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
                                className="min-w-[100px] md:min-w-[200px]"
                                htmlFor="date_paid"
                            >
                                Date Paid
                            </label>
                            <div className="w-full">
                                <input
                                    className="w-full"
                                    type="date"
                                    id="date_paid"
                                    value={data.date_paid}
                                    onChange={(e) =>
                                        setData("date_paid", e.target.value)
                                    }
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

            <section className="border-2 border-gray-600 p-4 mt-6">
                <h1 className="text-xl">DATA TRANSAKSI</h1>
                {data.transaction_details.map((td, idx) => (
                    <TransactionDetail
                        key={idx}
                        categories={categories}
                        data={td}
                        handlers={transactionDetailHandlers}
                        parentIdx={idx}
                        showClose={data.transaction_details.length !== 1}
                        errors={errors}
                    />
                ))}
            </section>
        </>
    );
}
