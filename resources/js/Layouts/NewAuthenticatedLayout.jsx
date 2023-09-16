import { FaDatabase, FaUser } from "react-icons/fa6";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { createElement } from "react";
import { Head, Link } from "@inertiajs/react";
const { Content, Footer, Sider } = Layout;

const sideMenuItems = [FaDatabase].map((icon) => {
    return {
        key: `transaction`,
        icon: createElement(icon),
        label: `Transaction`,
        children: [
            {
                key: `transaction.index`,
                label: (
                    <Link href={route("transaction.index")}>
                        Transactions List
                    </Link>
                ),
            },
            {
                key: `transaction.create`,
                label: (
                    <Link href={route("transaction.create")}>
                        Add New Transaction
                    </Link>
                ),
            },
            {
                key: `transaction.category.index`,
                label: `Transaction Categories`,
            },
            {
                key: `transaction.category.create`,
                label: `Add New Transaction`,
            },
        ],
    };
});
const headerMenuItems = [FaUser].map((icon) => {
    return {
        key: `profile`,
        icon: createElement(icon),
        label: `Profile`,
        children: [
            {
                key: `profile.setting`,
                label: `Setting`,
            },
        ],
    };
});

export default function NewAuthenticatedLayout({
    children,
    menu,
    openmenu,
    breadcrumb = [],
    title,
}) {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="flex flex-col justify-between min-h-screen">
            <Head title={title} />
            <Menu
                className="p-2 w-full justify-end"
                theme="dark"
                mode="horizontal"
                selectedKeys={["profile"]}
                items={headerMenuItems}
            />
            <Content className="px-10">
                <Breadcrumb
                    style={{
                        margin: "16px 0",
                    }}
                    items={breadcrumb.map((b) => ({ title: b }))}
                />
                <Layout
                    style={{
                        padding: "24px 0",
                        background: colorBgContainer,
                    }}
                >
                    <Sider
                        style={{
                            background: colorBgContainer,
                        }}
                        width={200}
                    >
                        <Menu
                            mode="inline"
                            defaultSelectedKeys={[menu]}
                            defaultOpenKeys={[openmenu]}
                            style={{
                                height: "100%",
                            }}
                            items={sideMenuItems}
                        />
                    </Sider>
                    <Content
                        style={{
                            padding: "0 24px",
                            minHeight: 280,
                        }}
                    >
                        <h1 className="text-2xl mb-2">{title}</h1>
                        {children}
                    </Content>
                </Layout>
            </Content>
            <Footer
                style={{
                    textAlign: "center",
                }}
            >
                Dashboard
            </Footer>
        </Layout>
    );
}
