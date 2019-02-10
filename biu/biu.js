(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.biu = {})))
}(this, (function(exports) {
	'use strict'

	//默认样式
	const PAGE_STYLE = {
		margin: 0,
		padding: 0
	}
	const BIU_STYLE = {
		width: '100vw',
		height: '100vh',
		display: 'flex'
	}
	const MENU_STYLE = {
		width: '10%',
		height: '100%',
		backgroundColor: '#f7f7f7',
		display: 'flex',
		flexWrap: 'wrap',
		justifyContent: 'space-around',
		alignItems: 'flex-start',
		boxSizing: 'border-box',
		padding: '20px 20px'
	}
	const BODY_STYLE = {
		width: '90%',
		height: '100%',
		backgroundColor: '#333'
	}
	const MENU_ITEM_STYLE = {
		width: '90px',
		height: '100px',
		display: 'flex',
		flexDirection: 'column'
	}
	const MENU_ITEM_ICON_STYLE = {
		height: '60px'
	}
	const MENU_ITEM_TITLE_STYLE = {
		textAlign: 'center',
		userSelect: 'none'
	}
	const SVG_SIZE = {
		width: 1920,
		height: 1080
	}
	const SVG_ITEM_SIZE = {
		width: 100,
		height: 100
	}

	//默认菜单配置
	const MENU_CONF = {
		chache: {
			title: '叉车',
			url: 'http://vanchun.oss-cn-shenzhen.aliyuncs.com/biu/menuItems/chache.svg',
			color: '#DDDDFF'
		},
		huoxiang: {
			title: '货箱',
			url: 'http://vanchun.oss-cn-shenzhen.aliyuncs.com/biu/menuItems/xiangzi.svg',
			color: '#C4E1FF'
		},
		kaixiang: {
			title: '开箱',
			url: 'http://vanchun.oss-cn-shenzhen.aliyuncs.com/biu/menuItems/kaixiang.svg',
			color: '#D9FFFF'
		},
		kucun: {
			title: '库存',
			url: 'http://vanchun.oss-cn-shenzhen.aliyuncs.com/biu/menuItems/kucun.svg',
			color: '#D7FFEE'
		},
		dingwei: {
			title: '定位',
			url: 'http://vanchun.oss-cn-shenzhen.aliyuncs.com/biu/menuItems/dingwei.svg',
			color: '#BBFFBB'
		},
		jiansuo: {
			title: '检索',
			url: 'http://vanchun.oss-cn-shenzhen.aliyuncs.com/biu/menuItems/jiansuo.svg',
			color: '#DEFFAC'
		},
		louyu: {
			title: '楼宇',
			url: 'http://vanchun.oss-cn-shenzhen.aliyuncs.com/biu/menuItems/louyu.svg',
			color: '#FFFFB9'
		},
		tongji: {
			title: '统计',
			url: 'http://vanchun.oss-cn-shenzhen.aliyuncs.com/biu/menuItems/tongji.svg',
			color: '#FFF0AC'
		}
	}

	//处理用户style的个性配置
	function setStyle(target, opt, def) {
		opt = opt || {}
		var styleKeys = Object.keys(def)
		styleKeys.forEach(function(styleName) {
			target.style[styleName] = opt[styleName] ? opt[styleName] : def[styleName]
		})
	}

	//封装Ajax请求
	// 	function callGET(url, param, call_back) {
	// 		var param = param || {}
	// 		var ajax = new XMLHttpRequest()
	// 		ajax.onreadystatechange = function() {
	// 			if (ajax.readyState == 4 && ajax.status == 200) {
	// 				call_back(ajax.responseText)
	// 			}
	// 		}
	// 		ajax.open('GET', url + (JSON.stringify(param) == '{}'? '': '?' + param2String(param)))
	// 		ajax.send(null);
	// 	}

	function param2String(param) {
		var result = ''
		if (Object.keys(param).length > 0) {
			for (var x = 0; x < Object.keys(param).length - 1; x++) {
				result += Object.keys(param)[x] + '=' + param[Object.keys(param)[x]] + '&'
			}
			result += Object.keys(param)[Object.keys(param).length - 1] + '=' + param[Object.keys(param)[Object.keys(param).length -
				1]]
		}
	}

	/**
	 * 初始化biu对象
	 */
	function init(dom) {
		if (!dom) {
			throw new Error('没有指定元素')
		}
		//全局关闭右键
		document.oncontextmenu = function() {
			return false
		}
		var biu = new BIU(dom)
		return biu
	}


	/**
	 * @BIU模块
	 */
	function BIU(dom) {
		this._dom = dom
		this.menuItems = []
	}

	var biuProto = BIU.prototype

	biuProto._initLayout = function() {
		setStyle(document.getElementsByTagName('body')[0], option.pageStyle, PAGE_STYLE)
		setStyle(this._dom, option.biuStyle, BIU_STYLE)
		this._menu = document.createElement("div")
		this._body = document.createElement("div")
		this._dom.appendChild(this._menu)
		this._dom.appendChild(this._body)
		setStyle(this._menu, option.menuStyle, MENU_STYLE)
		setStyle(this._body, option.bodyStyle, BODY_STYLE)
		this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		this._body.appendChild(this._svg)
		//SVG元素的样式与viewBox
		var svgSize = option.svgSize || SVG_SIZE
		this._svg.setAttribute('viewBox', '0 0 ' + (svgSize.width ? svgSize.width : SVG_SIZE.width).toString() + ' ' + (
			svgSize.height ? svgSize.height : SVG_SIZE.height).toString())
	}

	biuProto._initConfig = function() {
		var self = this
		var menuConf = option.menuConf ? option.menuConf : MENU_CONF
		Object.keys(menuConf).forEach(function(key) {
			//为每一个item创建dom元素，加入页面
			var item = menuConf[key]
			self.menuItems.push(new MenuItem(key, item, self._menu))
		})
	}

	biuProto._initSVG = function() {
		console.log('加载页面元素')
	}

	biuProto._initEvent = function() {
		var self = this
		this._svg.addEventListener('dragover', function(ev) {
			ev.dataTransfer.dropEffect = "copy"
			ev.preventDefault()
		})
		this._svg.addEventListener('drop', function(ev) {
			ev.preventDefault()
			//计算元素左上顶点的值
			var x = (ev.clientX - self._menu.clientWidth) * SVG_SIZE.width / this.clientWidth
			var y = ev.clientY * SVG_SIZE.height / this.clientHeight
			var item_name = ev.dataTransfer.getData("text")
			new SVGItem(item_name, x, y, this)
		})
	}

	//配置项的设置
	biuProto.setOption = function(option) {
		//全局只需一个option
		window.option = option
		//完成初始页面布局
		this._initLayout()
		//完成菜单配置文件的加载
		this._initConfig()
		//元素的加载
		this._initSVG()
		//事件配置
		this._initEvent()
	}

	//菜单图标的容器类
	function MenuItem(key, item, parent) {
		this._dom = document.createElement("div")
		this._key = key
		this._item = item
		this._parent = parent
		this._initDom(key)
		this._initEvent()
	}

	var menuItemProto = MenuItem.prototype

	menuItemProto._initDom = function(key) {
		//配置DOM元素样式
		setStyle(this._dom, option.menuItemStyle, MENU_ITEM_STYLE)
		this._dom.style.backgroundColor = this._item.color
		this._dom.setAttribute('draggable', 'true')
		this._parent.appendChild(this._dom)
		var icon = document.createElement('img')
		icon.setAttribute('src', this._item.url)
		icon.setAttribute('draggable', 'false')
		setStyle(icon, option.menuItemIconStyle, MENU_ITEM_ICON_STYLE)
		var title = document.createElement('div')
		title.innerText = this._item.title
		setStyle(title, option.menuItemTitleStyle, MENU_ITEM_TITLE_STYLE)
		this._dom.appendChild(icon)
		this._dom.appendChild(title)
	}

	menuItemProto._initEvent = function() {
		var self = this
		this._dom.addEventListener('dragstart', function(ev) {
			ev.dataTransfer.setData("text/plain", self._key)
		})
	}

	//右侧内容的容器类
	function SVGItem(item_name, x, y, parent) {
		this.item_name = item_name
		this.x = x
		this.y = y
		this.parent = parent
		var svgItemSize = option.svgItemSize || {}
		this.width = svgItemSize.width ? svgItemSize.width : SVG_ITEM_SIZE.width
		this.height = svgItemSize.height ? svgItemSize.height : SVG_ITEM_SIZE.height
		this._dom = this._initDom()
		this._initEvent()
		this._resize()
	}

	var SVGItemProto = SVGItem.prototype

	SVGItemProto._initDom = function() {
		var g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
		var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
		rect.setAttribute('fill', MENU_CONF[this.item_name].color)
		var img = document.createElementNS('http://www.w3.org/2000/svg', 'image')
		img.href.baseVal = MENU_CONF[this.item_name].url
		g.appendChild(rect)
		g.appendChild(img)
		this.parent.appendChild(g)
		return {
			g: g,
			rect: rect,
			img: img
		}	
	}

	SVGItemProto._initEvent = function() {
		this._dom.g.addEventListener('click', console.log('不要啊~'))
	}

	SVGItemProto._resize = function() {
		this._dom.rect.setAttribute('x', this.x)
		this._dom.rect.setAttribute('y', this.y)
		this._dom.rect.setAttribute('width', this.width)
		this._dom.rect.setAttribute('height', this.height)
		//IMG
		this._dom.img.setAttribute('height', 60)
		this._dom.img.setAttribute('width', 60)
		//手动计算居中
		this._dom.img.setAttribute('x', this.x + (this.width - 60)/2)
		this._dom.img.setAttribute('y', this.y + (this.height - 60)/2)
	}

	exports.init = init

})));
