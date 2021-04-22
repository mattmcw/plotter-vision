let filename = "plotter.stl";

function download()
{	
	const colors = {
		red : 'ff0000',
		blue : '0000ff',
		black : '000000',
		white : 'ffffff'
	};
	let colorName = redblue_mode ? 'red' : dark_mode ? 'white' : 'black';
	let color = colors[colorName];
	let svg = "";
	svg += `<?xml version="1.0" encoding="UTF-8" standalone="no"?>\n`;
	svg += `<svg xmlns:dc="http://purl.org/dc/elements/1.1/" xmlns:cc="http://creativecommons.org/ns#" xmlns:rdf="http://www.w3.org/1999/02/22-rdf-syntax-ns#" xmlns:svg="http://www.w3.org/2000/svg" xmlns="http://www.w3.org/2000/svg" xmlns:sodipodi="http://sodipodi.sourceforge.net/DTD/sodipodi-0.dtd" xmlns:inkscape="http://www.inkscape.org/namespaces/inkscape" version="1.2" width="${width}px" height="${height}px">\n`;
	svg += "<desc>plotter.vision</desc>\n";

	svg += `<g inkscape:label="${colorName}" inkscape:groupmode="layer" id="1${colorName}">\n`;
	svg += "<path d='\n";
	svg += stl.svg_path();
	svg += `' style='stroke:#${color};stroke-width:1;fill:none'/>\n`;
	svg += "</g>\n";

	if (redblue_mode)
	{
		colorName = 'blue';
		color = colors[colorName];
		svg += `<g inkscape:label="${colorName}" inkscape:groupmode="layer" id="2${colorName}">\n`;
		svg += "<path d='\n";
		svg += stl2.svg_path();
		svg += `' style='stroke:#${color};stroke-width:1;fill:none'/>\n`;
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

function fileOnclick () {
	const element = document.getElementById('fileUpload');
	element.click();
}

(function () {
	document.forms['uploadForm'].elements['fileUpload'].onchange = fileOnchange;
	document.getElementById('loadFileXml').addEventListener('click', fileOnclick, false); 
})();