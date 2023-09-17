import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head } from "@inertiajs/react";
import { Button, Input, Select } from "antd";
import { useState } from "react";

function fibbonacci(n) {
    console.log(`hitung fibo ${n}`);
    if (n <= 0) {
        return 0;
    } else if (n == 1) {
        return 1;
    } else {
        return fibbonacci(n - 1) + fibbonacci(n - 2);
    }
}

export default function Index({ auth }) {
    const [data, setData] = useState({
        n1: 1,
        n2: 4,
        v: 4,
    });
    const [mode, setMode] = useState("client");

    const sumFibo = (name, value) => {
        setData({
            ...data,
            [name]: value,
        });
    };

    const hitung = () => {
        setData({
            ...data,
            v: "sedang menghitung",
        });

        if (mode == "server") {
            fetch(route("fibonacci.sum", [data.n1, data.n2]))
                .then((res) => res.json())
                .then((res) => {
                    setData({
                        ...data,
                        v: res.result,
                    });
                });
        } else {
            const hasil = fibbonacci(data.n1) + fibbonacci(data.n2);
            setData({
                ...data,
                v: hasil,
            });
        }
    };

    return (
        <Authenticated
            menu={"fibonacci"}
            breadcrumb={["Fibonacci", "Calculator"]}
            title="Fibonacci"
            user={auth.user}
        >
            <div className="py-12">
                <div className="max-w-7xl mx-auto sm:px-6 lg:px-8">
                    <div className="bg-white overflow-x-auto border-2 p-4">
                        <div className="flex flex-col md:flex-row gap-2 items-center">
                            <Input
                                type="number"
                                value={data.n1}
                                onChange={(e) => sumFibo("n1", e.target.value)}
                            />
                            <div className="text-3xl">+</div>
                            <Input
                                type="number"
                                value={data.n2}
                                onChange={(e) => sumFibo("n2", e.target.value)}
                            />
                            <div className="text-3xl">=</div>
                            <Input type="text" value={data.v} disabled />
                            <Button onClick={hitung} className="w-full">
                                Hitung
                            </Button>
                            <Select
                                className="w-full"
                                value={mode}
                                onChange={(v) => setMode(v)}
                            >
                                <Select.Option value="client">
                                    Hitung di sisi client
                                </Select.Option>
                                <Select.Option value="server">
                                    Hitung di sisi server
                                </Select.Option>
                            </Select>
                        </div>
                    </div>
                </div>
            </div>
        </Authenticated>
    );
}
