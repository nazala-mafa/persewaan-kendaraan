import { Link, useForm } from "@inertiajs/react";
import { Modal } from "antd";
import { FaPencil, FaTrash } from "react-icons/fa6";

export default function TransactionTableAction({ name, header_id, detail_id }) {
    const { delete: destroy } = useForm();
    const [modal, contextHolder] = Modal.useModal();
    const confirm = () => {
        modal.confirm({
            title: "Confirm",
            content: `Are you sure to delete "${name}" transaction`,
            okButtonProps: {
                className: "bg-red-400",
            },
            okText: "Yes, Delete it",
            cancelText: "Cancel",
            onOk: () => {
                destroy(route("transaction.destroy", detail_id));
            },
        });
    };

    return (
        <div className="flex gap-2">
            <Link
                className="cursor-pointer"
                href={route("transaction.edit", header_id)}
            >
                <FaPencil />
            </Link>
            <div
                className="cursor-pointer hover:text-blue-400"
                onClick={confirm}
            >
                <FaTrash />
            </div>
            {contextHolder}
        </div>
    );
}
