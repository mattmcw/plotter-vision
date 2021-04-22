let filename = "plotter.stl";

function download()
{	
	let svg = "";
	svg += "<?xm version='1.0'?>\n";
	svg += "<svg xmlns='http://www.w3.org/2000/svg' version='1.2' baseProfile='tiny' width='" + width + "px' height='" + height + "px'>\n";
	svg += "<desc>plotter.vision</desc>";

	svg += "<g id=\"red\">\n";
	svg += "<path d='\n";
	svg += stl.svg_path();
	svg += "' style='stroke:#ff0000;stroke-width:1;fill:none'/>\n";
	svg += "</g>\n";

	if (redblue_mode)
	{
		svg += "<g id=\"blue\">\n";
		svg += "<path d='\n";
		svg += stl2.svg_path();
		svg += "' style='stroke:#0000ff;stroke-width:1;fill:none'/>\n";
		svg += "</g>\n";
	}

	svg += "</svg>";

	svg = encodeURIComponent(svg);

	var element = document.createElement('a');
	element.setAttribute('href', 'data:text/plain;charset=utf-8,' + svg);

	// attempt to reuse their filename
	let svgname = filename.replace(/\.stl$/, "");
	element.setAttribute('download', svgname + ".svg");

	element.style.display = 'none';
	document.body.appendChild(element);
	element.click();
	document.body.removeChild(element);
}

function fileOnchange (evt) {
	const reader = new FileReader();
	console.log("upload changed", evt);
	reader.onloadend = (evt) => {
		console.log(evt.target);
		const content = evt.target.result;
		if (!content)
			return;

		//console.log("content:", raw);
		stl = new STL(content);
		stl2 = new STL(content);
		//console.log("new stl:", stl);
		reproject = true;
	};

	let file = evt.target.files[0];
	filename = file.name;

	console.log("uploading " + filename);

	reader.readAsArrayBuffer(file);
};

(function () {
	document.forms['uploadForm'].elements['fileUpload'].onchange = fileOnchange;
})();