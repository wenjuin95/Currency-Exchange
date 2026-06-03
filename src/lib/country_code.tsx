export const countryNames: Record<string, string> = {
  AED: "United Arab Emirates",
  AUD: "Australia",
  BND: "Brunei",
  CAD: "Canada",
  CHF: "Switzerland",
  CNY: "China",
  EGP: "Egypt",
  EUR: "Eurozone",
  GBP: "United Kingdom",
  HKD: "Hong Kong",
  IDR: "Indonesia",
  INR: "India",
  JPY: "Japan",
  KHR: "Cambodia",
  KRW: "South Korea",
  MMK: "Myanmar",
  NPR: "Nepal",
  NZD: "New Zealand",
  PHP: "Philippines",
  PKR: "Pakistan",
  SAR: "Saudi Arabia",
  SDR: "International Monetary Fund (IMF)",
  SGD: "Singapore",
  THB: "Thailand",
  TWD: "Taiwan",
  USD: "United States",
  VND: "Vietnam",
};

export const currencySymbols: Record<string, string> = {
  AED: "د.إ",
  AUD: "$",
  BND: "$",
  CAD: "$",
  CHF: "Fr.",
  CNY: "¥",
  EGP: "E£",
  EUR: "€",
  GBP: "£",
  HKD: "$",
  IDR: "Rp",
  INR: "₹",
  JPY: "¥",
  KHR: "៛",
  KRW: "₩",
  MMK: "K",
  NPR: "रू",
  NZD: "$",
  PHP: "₱",
  PKR: "₨",
  SAR: "ر.س",
  SDR: "SDR", // Special Drawing Rights has no native physical sign
  SGD: "$",
  THB: "฿",
  TWD: "NT$",
  USD: "$",
  VND: "₫",
};

export const per100UnitCurrencies = new Set([
	"JPY",
	"HKD",
	"THB",
	"PHP",
	"TWD",
	"KRW",
	"IDR",
	"SAR",
	"VND",
	"KHR",
	"MMK",
	"INR",
	"AED",
	"PKR",
	"NPR",
])

export const use1000units = new Set([
	"IDR",
	"VND",
	"KHR",
	"MMK",
	"KRW",
])

export const use100units = new Set([
	"AED",
	"JPY",
	"HKD",
	"THB",
	"PHP",
	"TWD",
])

export const currencyRegionsConverter: Record<string, string[]> = {
	"Popular": ["USD", "SGD", "JPY", "CNY", "KRW"],

	"Southeast Asia": [
		"SGD",
		"MYR",
		"IDR",
		"THB",
		"PHP",
		"VND",
		"KHR",
		"MMK",
		"BND",
	],

	"East Asia": [
		"JPY",
		"KRW",
		"CNY",
		"HKD",
		"TWD",
	],

	"South Asia": [
		"INR",
		"PKR",
		"NPR",
	],

	"Middle East": [
		"AED",
		"SAR",
	],

	"Europe": [
		"EUR",
		"GBP",
		"CHF",
	],

	"North America": [
		"USD",
		"CAD",
	],

	"Oceania": [
		"AUD",
		"NZD",
	],

	"Africa": [
		"EGP",
	],

	"International": [
		"SDR",
	],
};


export const currencyRegions: Record<string, string[]> = {
	"Southeast Asia": [
		"SGD",
		"MYR",
		"IDR",
		"THB",
		"PHP",
		"VND",
		"KHR",
		"MMK",
		"BND",
	],

	"East Asia": [
		"JPY",
		"KRW",
		"CNY",
		"HKD",
		"TWD",
	],

	"South Asia": [
		"INR",
		"PKR",
		"NPR",
	],

	"Middle East": [
		"AED",
		"SAR",
	],

	"Europe": [
		"EUR",
		"GBP",
		"CHF",
	],

	"North America": [
		"USD",
		"CAD",
	],

	"Oceania": [
		"AUD",
		"NZD",
	],

	"Africa": [
		"EGP",
	],

	"International": [
		"SDR",
	],
};
