const DashCard = ({ item }) => {
  const Icon = item.icon;

  return (
    <div
      className={`flex items-center justify-between p-5 rounded-2xl border ${item.hover} ${item.bg} ${item.border} backdrop-blur-xl transition-all duration-300  `}
    >
      <div>
        <p className="text-sm text-gray-200">{item.name}</p>
        <p className="text-2xl font-bold text-gray-200">
          {item.value}
        </p>
      </div>

      <div
        className={`${item.iconCol} flex h-12 w-12 items-center justify-center rounded-xl ${item.iconbg} shadow`}
      >
        <Icon size={24} />
      </div>
    </div>
  );
};

export default DashCard;