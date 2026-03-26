export default function SutraDivider() {
    return (
        <div className="flex justify-center py-2 dark:bg-black">
            <svg viewBox="0 0 800 60" className="w-full max-w-3xl h-12 opacity-50 dark:opacity-60">
                <path d="M0,30 Q100,5 200,30 Q300,55 400,30 Q500,5 600,30 Q700,55 800,30"
                    stroke="url(#sutraGrad)" strokeWidth="2" fill="none" strokeDasharray="6 4" />
                <circle cx="400" cy="30" r="5" fill="url(#sutraGrad)" />
                <defs>
                    <linearGradient id="sutraGrad" x1="0%" y1="0%" x2="100%" y2="0%">
                        <stop offset="0%" stopColor="#f59e0b" stopOpacity="0" />
                        <stop offset="50%" stopColor="#f59e0b" />
                        <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
                    </linearGradient>
                </defs>
            </svg>
        </div>
    );
}