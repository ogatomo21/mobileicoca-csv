
console.log("Mobile ICOCA History CSV Export Extension Loaded");

if ((location.href).match("web.mobileicoca.jr-odekake.net/iq/ir/ICCardDisp.aspx")) {
	const rireki = document.getElementsByClassName("tit-bbg")[0];
	const exportCSV = document.createElement("button");
	exportCSV.innerText = "CSV書き出し";
	exportCSV.style = "margin-left:1rem;";
	exportCSV.onclick = function (event) {
		event.preventDefault(); // ページの遷移を抑制
		csv();
	};
	rireki.appendChild(exportCSV);
}

function downloadCSV(csv, filename) {
	let csvFile;
	let downloadLink;

	const BOM = "\uFEFF";  // BOM for UTF-8
	csv = BOM + csv;

	csvFile = new Blob([csv], { type: "text/csv" });
	downloadLink = document.createElement("a");
	downloadLink.download = filename;
	downloadLink.href = window.URL.createObjectURL(csvFile);
	downloadLink.style.display = "none";
	document.body.appendChild(downloadLink);
	downloadLink.click();
}

function tableToCSV() {
	let csv = [];
	let rows = document.querySelectorAll("tbody>tr");

	for (let i = 0; i < rows.length; i++) {
		let row = [], cols = rows[i].querySelectorAll("td, th");

		for (let j = 0; j < cols.length; j++) {
			let text = cols[j].innerText.replace(/,/g, ''); // Remove commas to avoid CSV formatting issues
			row.push(text);
		}

		csv.push(row.join(","));
	}

	return csv.join("\n");
}

function csv() {
	const csvData = tableToCSV();
	const now = new Date();
	const formattedDateTime = `${now.getFullYear()}-${(now.getMonth() + 1).toString().padStart(2, '0')}-${now.getDate().toString().padStart(2, '0')} ${now.getHours().toString().padStart(2, '0')}_${now.getMinutes().toString().padStart(2, '0')}_${now.getSeconds().toString().padStart(2, '0')}`;
	const filename = formattedDateTime + ".csv";
	downloadCSV(csvData, filename);
}
