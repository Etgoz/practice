interface Country {
	name: {
		common: string;
	};
	capital: string;
	flag: string;
	region: string;
}

function createTableHeads(headers: string[]): HTMLElement {
	const tableHead = document.createElement("thead");
	const tableHeadRow = document.createElement("tr");

	headers.forEach((header) => {
		const tHead = document.createElement("th");
		tHead.innerText = header;
		tableHeadRow.appendChild(tHead);
	});

	tableHead.appendChild(tableHeadRow);

	return tableHead;
}

function createTable(): HTMLElement {
	const table = document.createElement("table");
	document.body.appendChild(table);

	const tableHead = createTableHeads(["name", "capital", "flag", "region"]);

	table.append(tableHead);

	table.appendChild(document.createElement("tbody"));

	return table;
}

function createTableCountryRow(country: Country, table: HTMLElement) {
	const {
		name: { common },
		capital,
		flag,
		region,
	} = country;

	const countryRow = document.createElement("tr");
	const countryNameCell = document.createElement("td");
	countryNameCell.innerText = common;

	const countryCapitalCell = document.createElement("td");
	countryCapitalCell.innerText = capital;

	const countryFlagCell = document.createElement("td");
	countryFlagCell.innerText = flag;

	const countryRegionCell = document.createElement("td");
	countryRegionCell.innerText = region;

	countryRow.append(
		countryNameCell,
		countryCapitalCell,
		countryFlagCell,
		countryRegionCell
	);
	table.getElementsByTagName("tbody")[0].appendChild(countryRow);
}

document.addEventListener("DOMContentLoaded", async () => {
	const response = await fetch("https://restcountries.com/v3.1/all");
	const countries: Country[] = await response.json();

	const table = createTable();
	countries.forEach((country: Country) => {
		createTableCountryRow(country, table);
	});
});
