document.addEventListener("DOMContentLoaded", async (event) => {
    const params = new URLSearchParams(document.location.search);
    const userDate = params.get("userDate");
    try {
        const response = await fetch(`https://www.hebcal.com/converter?cfg=json&date=${userDate}&g2h=1&strict=1`);
        const hebDate = await response.json();
        console.log(hebDate.hebrew);
        const inputDate = document.getElementById("inputDate");
        const userDateParts = userDate.split("-");
        inputDate.innerHTML = `${userDateParts[2]}/${userDateParts[1]}/${userDateParts[0]} →`;
        const hebrewPlace = document.getElementById("hebrewDate");
        hebrewPlace.innerText = hebDate.hebrew;
    }
    catch (e) {
        console.log(e);
    }
});
