const StatCard = ({ title, value }) => {
    return (
        <div className="bg-gradient-to-br from-blue-500 to-indigo-600 rounded-3xl p-6 shadow-lg hover:scale-105 hover:shadow-2xl transition-all duration-300 cursor-pointer">

            <p className="text-blue-100 text-sm font-medium tracking-wide">
                {title}
            </p>

            <h2 className="text-5xl font-bold text-white mt-4">
                {value}
            </h2>

        </div>
    );
};

export default StatCard;