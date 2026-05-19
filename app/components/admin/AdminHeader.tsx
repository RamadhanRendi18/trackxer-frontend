interface AdminHeaderProps {
    title: string;
    description: string;
    children?: React.ReactNode;
}

export default function AdminHeader({
    title,
    description,
    children,
}: AdminHeaderProps) {
    return (
        <div className="sticky top-0 z-10 bg-surface border-b border-gray-700 px-5 py-4 flex items-center justify-between">

            <div>
                <h1 className="text-xl font-bold">
                    {title}
                </h1>

                <p className="text-sm text-textSecondary">
                    {description}
                </p>
            </div>

            <div className="flex gap-2">
                {children}
            </div>

        </div>
    );
}