/** Escape quotes. */
String.prototype.qq = String.prototype.qq || function () {
	return this.replace(/'/g, `&apos;`).replace(/"/g, `&quot;`);
};

/** Un-escape quotes. */
String.prototype.uq = String.prototype.uq || function () {
	return this.replace(/&apos;/g, `'`).replace(/&quot;/g, `"`);
};

class ElementUtil {
	static getOrModify (
		{
			tag,
			clazz,
			style,
			click,
			contextmenu,
			change,
			mousedown,
			mouseup,
			mousemove,
			html,
			text,
			ele,
			name,
			title,
			val,
			children,
			outer,
		},
	) {
		ele = ele || (outer ? (new DOMParser()).parseFromString(outer, "text/html").body.childNodes[0] : document.createElement(tag));

		if (clazz) ele.className = clazz;
		if (style) ele.setAttribute("style", style);
		if (click) ele.addEventListener("click", click);
		if (contextmenu) ele.addEventListener("contextmenu", contextmenu);
		if (change) ele.addEventListener("change", change);
		if (mousedown) ele.addEventListener("mousedown", mousedown);
		if (mouseup) ele.addEventListener("mouseup", mouseup);
		if (mousemove) ele.addEventListener("mousemove", mousemove);
		if (html != null) ele.innerHTML = html;
		if (text != null) ele.innerHTML = `${text}`.qq();
		if (name != null) ele.setAttribute("name", name);
		if (title != null) ele.setAttribute("title", title);
		if (val != null) ele.setAttribute("value", val);
		if (children) for (let i = 0, len = children.length; i < len; ++i) ele.append(children[i]);

		ele.appends = ele.appends || ElementUtil._appends.bind(ele);
		ele.appendTo = ele.appendTo || ElementUtil._appendTo.bind(ele);
		ele.prependTo = ele.prependTo || ElementUtil._prependTo.bind(ele);
		ele.addClass = ele.addClass || ElementUtil._addClass.bind(ele);
		ele.removeClass = ele.removeClass || ElementUtil._removeClass.bind(ele);
		ele.toggleClass = ele.toggleClass || ElementUtil._toggleClass.bind(ele);
		ele.show = ele.show || ElementUtil._show.bind(ele);
		ele.hide = ele.hide || ElementUtil._hide.bind(ele);
		ele.toggle = ele.toggle || ElementUtil._toggle.bind(ele);
		ele.empty = ele.empty || ElementUtil._empty.bind(ele);
		ele.detach = ele.detach || ElementUtil._detach.bind(ele);
		ele.attr = ele.attr || ElementUtil._attr.bind(ele);
		ele.val = ele.val || ElementUtil._val.bind(ele);
		ele.html = ele.html || ElementUtil._html.bind(ele);
		ele.onClick = ele.onClick || ElementUtil._onClick.bind(ele);
		ele.onContextmenu = ele.onContextmenu || ElementUtil._onContextmenu.bind(ele);
		ele.onChange = ele.onChange || ElementUtil._onChange.bind(ele);

		return ele;
	}

	static _appends (child) {
		this.appendChild(child);
		return this;
	}

	static _appendTo (parent) {
		parent.appendChild(this);
		return this;
	}

	static _prependTo (parent) {
		parent.prepend(this);
		return this;
	}

	static _addClass (clazz) {
		this.classList.add(clazz);
		return this;
	}

	static _removeClass (clazz) {
		this.classList.remove(clazz);
		return this;
	}

	static _toggleClass (clazz, isActive) {
		if (isActive == null) this.classList.toggle(clazz);
		else if (isActive) this.classList.add(clazz);
		else this.classList.remove(clazz);
		return this;
	}

	static _show () {
		this.classList.remove("d-none");
		return this;
	}

	static _hide () {
		this.classList.add("d-none");
		return this;
	}

	static _toggle (isActive) {
		this.toggleClass("d-none", isActive == null ? isActive : !isActive);
		return this;
	}

	static _empty () {
		this.innerHTML = "";
		return this;
	}

	static _detach () {
		if (this.parentElement) this.parentElement.removeChild(this);
		return this;
	}

	static _attr (name, value) {
		this.setAttribute(name, value);
		return this;
	}

	static _html (html) {
		this.innerHTML = html;
		return this;
	}

	static _onClick (fn) { return ElementUtil._onX(this, "click", fn); }
	static _onContextmenu (fn) { return ElementUtil._onX(this, "contextmenu", fn); }
	static _onChange (fn) { return ElementUtil._onX(this, "change", fn); }

	static _onX (ele, evtName, fn) { ele.addEventListener(evtName, fn); return ele; }

	static _val (val) {
		if (val !== undefined) {
			switch (this.tagName) {
				case "SELECT": {
					let selectedIndexNxt = -1;
					for (let i = 0, len = this.options.length; i < len; ++i) {
						if (this.options[i]?.value === val) { selectedIndexNxt = i; break; }
					}
					this.selectedIndex = selectedIndexNxt;
					return this;
				}

				default: {
					this.value = val;
					return this;
				}
			}
		}

		switch (this.tagName) {
			case "SELECT": return this.options[this.selectedIndex]?.value;

			default: return this.value;
		}
	}
}

export const e_ = ElementUtil.getOrModify;
