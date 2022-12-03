//using get method, send the date the user chose and translate it to hebrew date "https://www.hebcal.com/converter?cfg=json&date=2011-06-02&g2h=1&strict=1"
interface HebrewDate {
	heDateParts: {
		y: string;
		m: string;
		d: string;
	};
	hebrew: string;
}

document.addEventListener("DOMContentLoaded", async (event) => {
	const params: URLSearchParams = new URLSearchParams(document.location.search);
	const userDate: string = params.get("userDate");

	try {
		const response = await fetch(
			`https://www.hebcal.com/converter?cfg=json&date=${userDate}&g2h=1&strict=1`
		);
		const hebDate: HebrewDate = await response.json();
		console.log(hebDate.hebrew);

		const inputDate = document.getElementById("inputDate");
		const userDateParts = userDate.split("-");
		inputDate.innerHTML = `${userDateParts[2]}/${userDateParts[1]}/${userDateParts[0]} →`;

		const hebrewPlace = document.getElementById("hebrewDate");
		hebrewPlace.innerText = hebDate.hebrew;
	} catch (e) {
		console.log(e);
	}
});
