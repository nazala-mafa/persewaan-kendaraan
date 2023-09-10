export default function TransactionDetail({
    categories = [],
    data,
    handlers,
    parentIdx,
    showClose = true,
    errors,
}) {
    const {
        transaction_group_id,
        transaction_category_id,
        details: transactions,
    } = data;

    const {
        setTransactionCategoryId,
        setTransactions,
        addTransactionDetailHandler,
        removeTransactionDetailHandler,
    } = handlers;

    const addRowHandler = () => {
        setTransactions(transaction_group_id, [
            ...transactions,
            {
                name: "",
                value_idr: "",
            },
        ]);
    };

    const transactionChangeHandler = (idx, name, value) => {
        let newTransaction = [...transactions];
        newTransaction[idx][name] = value;
        setTransactions(transaction_group_id, newTransaction);
    };

    return (
        <div className="mb-4">
            <div className="border-2 border-gray-600 p-4 relative">
                {showClose && (
                    <span
                        className="absolute top-5 right-5 cursor-pointer"
                        onClick={() =>
                            removeTransactionDetailHandler(transaction_group_id)
                        }
                    >
                        Close
                    </span>
                )}

                <div className="flex gap-4">
                    <label htmlFor={`category-${transaction_group_id}`}>
                        Category
                    </label>
                    <div className="flex-1">
                        <select
                            className="border-2 border-gray-600 p-2 pe-10 capitalize"
                            id={`category-${transaction_group_id}`}
                            value={transaction_category_id}
                            onChange={(e) =>
                                setTransactionCategoryId(
                                    transaction_group_id,
                                    e.target.value
                                )
                            }
                        >
                            {categories.map((c, idx) => (
                                <option key={idx} value={c.id}>
                                    {c.name}
                                </option>
                            ))}
                        </select>
                        <table className="w-full mt-4">
                            <thead>
                                <tr>
                                    <th className="border-2 border-gray-600 p-2">
                                        Nama Transaksi
                                    </th>
                                    <th className="border-2 border-gray-600 p-2">
                                        Nominal (IDR)
                                    </th>
                                </tr>
                            </thead>
                            <tbody>
                                {transactions.map((t, idx) => (
                                    <tr key={idx}>
                                        <td className="border-2 border-gray-600 p-2">
                                            <input
                                                className="border-0 p-1 w-full"
                                                type="text"
                                                value={t.name}
                                                onChange={(e) =>
                                                    transactionChangeHandler(
                                                        idx,
                                                        "name",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors?.[
                                                `transaction_details.${parentIdx}.details.${idx}.name`
                                            ] && (
                                                <p className="text-red-600">
                                                    {
                                                        errors?.[
                                                            `transaction_details.${parentIdx}.details.${idx}.name`
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </td>
                                        <td className="border-2 border-gray-600 p-2">
                                            <input
                                                className="border-0 p-1 w-full"
                                                type="number"
                                                value={t.value_idr}
                                                onChange={(e) =>
                                                    transactionChangeHandler(
                                                        idx,
                                                        "value_idr",
                                                        e.target.value
                                                    )
                                                }
                                            />
                                            {errors?.[
                                                `transaction_details.${parentIdx}.details.${idx}.value_idr`
                                            ] && (
                                                <p className="text-red-600">
                                                    {
                                                        errors?.[
                                                            `transaction_details.${parentIdx}.details.${idx}.value_idr`
                                                        ]
                                                    }
                                                </p>
                                            )}
                                        </td>
                                        {idx === transactions.length - 1 && (
                                            <td className="w-0">
                                                <button
                                                    className="rounded-full bg-blue-500 w-6 h-6 flex justify-center items-center text-2xl ms-2 cursor-pointer"
                                                    onClick={addRowHandler}
                                                >
                                                    +
                                                </button>
                                            </td>
                                        )}
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
            <div className="flex justify-end">
                <button
                    className="bg-blue-600 border-2 p-2 px-4 text-white mt-2"
                    onClick={addTransactionDetailHandler}
                >
                    Tambah
                </button>
            </div>
        </div>
    );
}
