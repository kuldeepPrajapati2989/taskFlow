const StatCard = ({ title, value, bg }) => {
    return (
        <div
            className={`${bg} rounded-2xl p-6 shadow-lg hover:scale-105 transition-all duration-300`}
        >
            <p className="text-white/80 text-sm">
                {title}
            </p>

            <h2 className="text-5xl font-bold text-white mt-3">
                {value}
            </h2>
        </div>
    );
};

export default StatCard;