function friendlyDate(timestamp) {
	var formats = {
		'year': '%n% 年前',
		'month': '%n% 月前',
		'day': '%n% 天前',
		'hour': '%n% 小时前',
		'minute': '%n% 分钟前',
		'second': '%n% 秒前',
	};

	var now = Date.now();
	var seconds = Math.floor((now - timestamp) / 1000);
	var minutes = Math.floor(seconds / 60);
	var hours = Math.floor(minutes / 60);
	var days = Math.floor(hours / 24);
	var months = Math.floor(days / 30);
	var years = Math.floor(months / 12);

	var diffType = '';
	var diffValue = 0;
	if (years > 0) {
		diffType = 'year';
		diffValue = years;
	} else {
		if (months > 0) {
			diffType = 'month';
			diffValue = months;
		} else {
			if (days > 0) {
				diffType = 'day';
				diffValue = days;
			} else {
				if (hours > 0) {
					diffType = 'hour';
					diffValue = hours;
				} else {
					if (minutes > 0) {
						diffType = 'minute';
						diffValue = minutes;
					} else {
						diffType = 'second';
						diffValue = seconds === 0 ? (seconds = 1) : seconds;
					}
				}
			}
		}
	}
	return formats[diffType].replace('%n%', diffValue);
}
// 防抖
const _debounce = {
	keyList: {},
	canDoFunction(b = {}) {
		this.keyList[b.key] ? b.fail && b.fail() : (this.lockKey(b.key), b.success && b.success(), b.time && setTimeout(() => {
			this.releaseKey(b.key)
		}, b.time))
	},
	releaseKey(b) {
		delete this.keyList[b]
	},
	lockKey(b) {
		this.keyList[b] = !0
	}
}

// 节流
function _throttle(fn, interval) {
	console.log(2);
	var last;
	var timer;
	var interval = interval || 200;
	return function () {
		var th = this;
		var args = arguments;
		var now = +new Date();
		if (last && now - last < interval) {
			clearTimeout(timer);
			timer = setTimeout(function () {
				last = now;
				fn.apply(th, args);
			}, interval);
		} else {
			last = now;
			fn.apply(th, args);
		}
	}
}
// 判断null、空串、空串中有空格、unfinished
function isNotNull(obj) {
	var result = true;
	/*进行校验*/
	switch (obj) {
		case undefined:
		case null:
			result = false;
			break;
	}
	if (result) {
		if (obj.replace(/\s+/g, "") === "") {//空字符串校验
			result = false;
		}
	}
	return result;
}
/**
 * 解析url拿到对应的参数
 */
function getParameter(name) {
	let paramStr = location.search;
	if (paramStr.length === 0) return null;
	if (paramStr.charAt(0) !== '?') return null;
	paramStr = unescape(paramStr);
	paramStr = paramStr.substring(1);
	if (paramStr.length === 0) return null;
	let params = paramStr.split('&')
	let p = null;
	for (let i = 0; i < params.length; i++) {
		if (params[i].indexOf(name) >= 0) {
			p = params[i].split('=');
			p = p[1];
		}
	}
	return p;
}


function getCookie(name) {
	var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
	if (document == null) {
		return "";
	}
	if (arr = document.cookie.match(reg)) {
		var cvalue = unescape(arr[2]);
		if (name == "token" && (cvalue == null || cvalue.length < 5)) {
			return null;
		}
		return unescape(arr[2]);
	} else
		return null;
}

function padLeftZero(str) {
	return ('00' + str).substr(str.length);
}
function formatDate(date, fmt) {
	var date = new Date(date)
	if (/(y+)/.test(fmt)) {
		fmt = fmt.replace(RegExp.$1, (date.getFullYear() + '').substr(4 - RegExp.$1.length));
	}
	let o = {
		'M+': date.getMonth() + 1,
		'd+': date.getDate(),
		'h+': date.getHours(),
		'm+': date.getMinutes(),
		's+': date.getSeconds()
	};

	// 遍历这个对象
	for (let k in o) {
		if (new RegExp(`(${k})`).test(fmt)) {
			let str = o[k] + '';
			fmt = fmt.replace(RegExp.$1, (RegExp.$1.length === 1) ? str : padLeftZero(str));
		}
	}
	return fmt;
};

function getRsaPassword(input) {
	var publickey = "#(publicKey)";
	var encrypt = new JSEncrypt();
	encrypt.setPublicKey(publickey);
	return encrypt.encrypt(input);
}
// formatDate(res.data.retData.createTime,'yyyy-MM-dd hh:mm:ss')

/**
 * 无需 try-catch 即可轻松处理错误的异步等待包装函数
 * @param {promise} promise promise 对象
 * @param {object} errorExt 自定义错误对象
 * @returns {array} [err, res]
 */
function to(promise, errorExt) {
	return promise
			.then((data) => [null, data])
			.catch((err) => {
			if (errorExt) {
					const parsedError = Object.assign({}, err, errorExt);
					return [parsedError, undefined];
			}
			return [err, undefined];
	});
}

// 定义一个深拷贝函数  接收目标target参数
function deepClone(target) {
	// 定义一个变量
	let result;
	// 如果当前需要深拷贝的是一个对象的话
	if (typeof target === 'object') {
	// 如果是一个数组的话
			if (Array.isArray(target)) {
					result = []; // 将result赋值为一个数组，并且执行遍历
					for (let i in target) {
							// 递归克隆数组中的每一项
							result.push(deepClone(target[i]))
					}
			// 判断如果当前的值是null的话；直接赋值为null
			} else if(target===null) {
					result = null;
			// 判断如果当前的值是一个RegExp对象的话，直接赋值    
			} else if(target.constructor===RegExp){
					result = target;
			}else {
			// 否则是普通对象，直接for in循环，递归赋值对象的所有值
					result = {};
					for (let i in target) {
							result[i] = deepClone(target[i]);
					}
			}
	// 如果不是对象的话，就是基本数据类型，那么直接赋值
	} else {
			result = target;
	}
	// 返回最终结果
	return result;
}

/**
 * 判断对象是否为空
 * @param {Object} obj 
 * @returns {Boolean}
 */
function isEmptyObject(obj){
	return !Object.keys(obj).length;
}

export {
	getParameter,
	getCookie,
	formatDate,
	getRsaPassword,
	to,
	deepClone,
	isNotNull,
	isEmptyObject
}
