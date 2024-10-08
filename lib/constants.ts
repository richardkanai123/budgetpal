export const expenses = [
	"shopping",
	"water bill",
	"power bill",
	"transportation",
	"utilities",
	"rent",
	"entertainment",
	"healthcare",
	"debt",
	"asset purchase",
	"gift",
	"church",
	"gaming",
	"internet bill",
	"other",
];

export const incomes = [
	"salary",
	"bonus",
	"interest",
	"refund",
	"freelance",
	"investment",
	"transfer",
	"gift",
	"other",
];

export const savings = [
	"sacco",
	"insurance",
	"bond",
	"mmf",
	"emergency fund",
	"retirement",
	"other",
];

export const investment = [
	"shares",
	"general",
	"stocks",
	"bonds",
	"real estate",
	"mutual funds",
	"other",
];

export const validCategories = {
	expense: expenses,
	income: incomes,
	saving: savings,
	investment: investment,
};

export const FormattedCurrency = (amount: number, currency: string) => {
	if (currency === "USD") {
		return new Intl.NumberFormat("en-US", {
			style: "currency",
			currency: "USD",
		}).format(amount);
	}
	else if (currency === "KES") {
		return new Intl.NumberFormat('en-KE', {
			style: "currency",
			currency: "KSH",
			currencyDisplay: "symbol",
		}).format(amount)
	}
};
