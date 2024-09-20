import {
    ArrowLeftRight,
    PackagePlus,
    WalletMinimal,
    ShoppingCartIcon,
    LucideDroplets,
    UtilityPole,
    HouseIcon,
    HeartPulseIcon,
    Banknote,
    ChartCandlestickIcon,
    Church,
    Gamepad2Icon,
    EthernetPortIcon,
    TrendingUp,
    GiftIcon,
    WrenchIcon,
    ArrowLeftRightIcon,
    GraduationCapIcon,
    Bus,
    PlaneIcon,
    BanknoteIcon,
    PercentIcon,
    PlugZapIcon,
    SaveAllIcon,
    Replace,
} from "lucide-react";

const TransactionIcon = ({ type, category }: {
    type: string;
    category: string;
}) => {

    if (type === ("expense" || "income")) {
        switch (category) {
            case "shopping":
                return <ShoppingCartIcon className='w-5 h-5 text-red-500' />;
            case "transport":
                return <Bus className='w-5 h-5 text-blue-300' />;
            case "housing":
                return <HouseIcon className='w-5 h-5 text-green-5' />;
            case "healthcare":
                return <HeartPulseIcon className='w-5 h-5 text-green-500' />;
            case "utilities":
                return <WrenchIcon className='w-5 h-5 text-yellow-500' />;
            case "entertainment":
                return <ChartCandlestickIcon className='w-5 h-5 text-purple-500' />;
            case "education":
                return <GraduationCapIcon className='w-5 h-5 text-pink-500' />;
            case "gift":
                return <GiftIcon className='w-5 h-5 text-pink-800' />;
            case "gaming":
                return <Gamepad2Icon className='w-5 h-5 text-red-500' />;
            case "internet":
                return <EthernetPortIcon className='w-5 h-5 text-purple-500' />;
            case "travel":
                return <PlaneIcon className='w-5 h-5 text-yellow-500' />;
            case "water bill":
                return <LucideDroplets className='w-5 h-5 text-blue-500' />;
            case "power bill":
                return <UtilityPole className='w-5 h-5 text-pink-500' />;
            case "transportation":
                return <Bus className='w-5 h-5 text-blue-500' />;
            case "rent":
                return <HouseIcon className='w-5 h-5 text-pink-500' />;
            case "church":
                return <Church className='w-5 h-5 text-cyan-700' />;
            case "asset purchase":
                return <TrendingUp className='w-5 h-5 text-pink-500' />;
            case "salary":
                return <BanknoteIcon className='w-5 h-5 text-lime-500' />;
            case "bonus":
                return <GiftIcon className='w-5 h-5 text-pink-500' />;
            case "interest":
                return <PercentIcon className='w-5 h-5 text-lime-800' />;
            case "refund":
                return <ArrowLeftRightIcon className='w-5 h-5 text-yellow-500' />;
            case "freelance":
                return <PlugZapIcon className='w-5 h-5 text-pink-500' />;
            case "investment":
                return <SaveAllIcon className='w-5 h-5 text-fuchsia-400' />;
            case "transfer":
                return <Replace className='w-5 h-5 text-cyan-500' />;
            default:
                return <Banknote className='w-5 h-5 text-pink-700' />;

        }
    } else {
        switch (type) {
            case "saving":
                return <WalletMinimal className='w-5 h-5 text-blue-500' />;
            case "transfer":
                return <ArrowLeftRight className='w-5 h-5 text-cyan-500' />;
            case "investment":
                return <PackagePlus className='w-5 h-5 text-orange-500' />;

            default:
                return <Banknote className='w-5 h-5 text-slate-200' />;
        }
    }
}
export default TransactionIcon;
