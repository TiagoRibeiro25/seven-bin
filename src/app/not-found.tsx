import Link from "next/link";
import { FileQuestion } from "lucide-react";

const NotFound: React.FC = () => {
    return (
        <div className="flex flex-col items-center justify-center px-6 py-32 text-center">
            <FileQuestion className="mb-6 h-16 w-16 text-[#e67e22]" />
            <h1 className="mb-2 text-4xl font-bold text-[#e2d5c8]">404</h1>
            <p className="mb-8 text-lg text-[#8b8598]">
                This paste does not exist or has expired.
            </p>
            <Link
                href="/"
                className="rounded bg-[#e67e22] px-6 py-3 text-sm font-bold uppercase tracking-wider text-white transition-colors hover:bg-[#d35400]"
            >
                Create a Paste
            </Link>
        </div>
    );
};

export default NotFound;
