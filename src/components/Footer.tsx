const Footer: React.FC = () => {
    return (
        <footer className="border-t border-[#2a2f48] bg-[#0f172a]">
            <div className="mx-auto max-w-6xl px-6 py-5 text-center">
                <p className="text-sm font-semibold text-[#e67e22]">Seven Bin</p>
                <p className="mt-1 text-xs text-[#8b8598]">
                    Seven Bin &copy; 2024. All pastes expire automatically after 7 days.
                </p>
            </div>
        </footer>
    );
};

export default Footer;
