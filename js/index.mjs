import {e_} from "./util.mjs";

class IndexPage {
	static init () {
		const indexPage = new IndexPage();
		indexPage.render();
	}

	constructor () {
		this._wrpThumbnails = document.getElementById("wrp-thumbnails");
	}

	render () {
		IndexPage._IMAGES.forEach(path => this._addPortfolioImage(path));
	}

	_addPortfolioImage (path) {
		const pathThumbnail = path.split(".").map((it, i) => `${it}${!i ? "-thumb" : ""}`).join(".");

		const lnk = e_({
			outer: `<a href="${path.qq()}" class="shadow-sm border rounded border-3 d-inline-block"></a>`,
			children: [
				e_({outer: `<img src="${pathThumbnail.qq()}" alt="Portfolio Image">`}),
			],
		});
		lnk.appendTo(this._wrpThumbnails);
	}
}
IndexPage._IMAGES = [
	"media/index/house.png",
];

document.addEventListener("DOMContentLoaded", IndexPage.init.bind(IndexPage));
