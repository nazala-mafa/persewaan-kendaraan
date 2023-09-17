import { FaDatabase, FaTachographDigital, FaUser } from "react-icons/fa6";
import { Breadcrumb, Layout, Menu, theme } from "antd";
import { Head, Link } from "@inertiajs/react";
const { Content, Footer, Sider } = Layout;

const sideMenuItems = [
    {
        key: `dashboard`,
        icon: <FaTachographDigital />,
        label: <Link href={route("dashboard")}>Dashboard</Link>,
    },
    {
        key: `transaction`,
        icon: <FaDatabase />,
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
    },
];
const headMenuItems = (user) => [
    {
        key: `profile`,
        icon: <FaUser />,
        label: <span className="capitalize">{user.name}</span>,
        children: [
            {
                key: `profile.setting`,
                label: <Link href={route("profile.edit")}>Setting</Link>,
            },
            {
                key: `logout`,
                label: <Link href={route("logout")}>Logout</Link>,
            },
        ],
    },
];

export default function AuthenticatedLayout({
    children,
    menu,
    openmenu,
    breadcrumb = [],
    title,
    user,
}) {
    const {
        token: { colorBgContainer },
    } = theme.useToken();

    return (
        <Layout className="flex flex-col justify-between min-h-screen">
            <Head title={title} />
            <Menu
                className="p-2 w-full justify-end hidden lg:flex"
                theme="dark"
                mode="horizontal"
                selectedKeys={["profile"]}
                items={[...headMenuItems(user)]}
            />
            <Menu
                className="p-2 w-full justify-end lg:hidden"
                theme="dark"
                mode="horizontal"
                selectedKeys={["profile"]}
                items={[...sideMenuItems, ...headMenuItems(user)]}
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
                        className="w-0 lg:w-[200px] hidden lg:block"
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
