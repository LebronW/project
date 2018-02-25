/**
 * 存储localStorage
 */
export const setStore = (name, content) => {
	if (!name) return;
	if (typeof content !== 'string') {
		content = JSON.stringify(content);
	}
	window.localStorage.setItem(name, content);
}

/**
 * 获取localStorage
 */
export const getStore = name => {
	if (!name) return;
	return window.localStorage.getItem(name);
}

export const gettoken = (name, value, expiredays) => {
	alert(1111)
	var exdate = new Date()
	exdate.setDate(exdate.getDate() + expiredays)
	document.cookie = name + '=' + escape(value) + ((expiredays == null) ? "" : ";expires=" + exdate.toGMTString())
}

/**
 * 删除localStorage
 */
export const removeStore = name => {
	if (!name) return;
	window.localStorage.removeItem(name);
}

