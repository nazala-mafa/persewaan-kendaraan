import { Button, Card, Input, InputNumber, Select, Table } from "antd";
import { FaMinus, FaPlus } from "react-icons/fa6";
import { IoClose } from "react-icons/io5";

export default function TransactionDetail({
    categories = [],
    data,
    handlers,
    parentIdx,
    showClose = true,
    showAdd,
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
                id: Math.random(),
                name: "",
                value_idr: "",
            },
        ]);
    };

    const removeRowHandler = (idx) => {
        setTransactions(
            transaction_group_id,
            transactions?.filter((_, _idx) => _idx !== idx)
        );
    };

    const transactionChangeHandler = (idx, name, value) => {
        let newTransaction = [...transactions];
        newTransaction[idx][name] = value;
        setTransactions(transaction_group_id, newTransaction);
    };

    return (
        <Card className="mb-4">
            {showClose && (
                <span
                    className="absolute top-5 right-5 cursor-pointer"
                    onClick={() =>
                        removeTransactionDetailHandler(transaction_group_id)
                    }
                >
                    <IoClose size={24} />
                </span>
            )}

            <div className="flex gap-4">
                <label htmlFor={`category-${transaction_group_id}`}>
                    Category
                </label>
                <div className="flex-1">
                    <div>
                        <Select
                            className="capitalize"
                            id={`category-${transaction_group_id}`}
                            value={transaction_category_id}
                            onChange={(e) =>
                                setTransactionCategoryId(
                                    transaction_group_id,
                                    e.target.value
                                )
                            }
                            options={categories.map((c) => ({
                                label: c.name,
                                value: c.id,
                            }))}
                        />
                    </div>
                </div>
            </div>
            <Table
                className="mt-2"
                bordered={true}
                rowKey={(r) => r.id}
                dataSource={transactions}
                pagination={false}
            >
                <Table.Column
                    title="Transaction Name"
                    render={(item, _, idx) => (
                        <>
                            <Input
                                value={item.name}
                                onChange={(e) =>
                                    transactionChangeHandler(
                                        idx,
                                        "name",
                                        e.target.value
                                    )
                                }
                                bordered={!item.name}
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
                        </>
                    )}
                />
                <Table.Column
                    title="Value (IDR)"
                    render={(item, _, idx) => (
                        <>
                            <InputNumber
                                className="w-full"
                                value={item.value_idr}
                                formatter={(value) =>
                                    `${value}`.replace(
                                        /\B(?=(\d{3})+(?!\d))/g,
                                        ","
                                    )
                                }
                                parser={(value) =>
                                    value?.replace(/\$\s?|(,*)/g, "")
                                }
                                onChange={(e) =>
                                    transactionChangeHandler(
                                        idx,
                                        "value_idr",
                                        e
                                    )
                                }
                                bordered={!item.value_idr}
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
                        </>
                    )}
                />
                <Table.Column
                    title="Action"
                    render={(_, __, idx) => (
                        <div className="flex gap-1 justify-center">
                            {idx === transactions.length - 1 && (
                                <Button
                                    shape="circle"
                                    className="flex justify-center items-center"
                                    onClick={addRowHandler}
                                >
                                    <FaPlus />
                                </Button>
                            )}
                            {transactions.length !== 1 && (
                                <Button
                                    shape="circle"
                                    className="flex justify-center items-center"
                                    onClick={() => removeRowHandler(idx)}
                                >
                                    <FaMinus />
                                </Button>
                            )}
                        </div>
                    )}
                />
            </Table>
            {showAdd && (
                <div className="flex justify-end mt-2">
                    <Button
                        className="bg-sky-400 text-white hover:bg-white"
                        onClick={addTransactionDetailHandler}
                        size="large"
                    >
                        Tambah
                    </Button>
                </div>
            )}
        </Card>
    );
}
