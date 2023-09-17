import AuthenticatedLayout from "@/Layouts/AuthenticatedLayout";

export default function Dashboard({ auth }) {
    return (
        <AuthenticatedLayout
            menu={"dashboard"}
            breadcrumb={["Dashboard"]}
            title="Dashboard"
            user={auth.user}
        ></AuthenticatedLayout>
    );
}
