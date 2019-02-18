(function(global, factory) {
	typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) :
		typeof define === 'function' && define.amd ? define(['exports'], factory) :
		(factory((global.biu = {})))
}(this, (function(exports) {
	'use strict'


	//默认样式
	const STYLE = {
		PAGE_STYLE: {
			margin: 0,
			padding: 0
		},
		BIU_STYLE: {
			width: '100vw',
			height: '100vh',
			display: 'flex'
		},
		MENU_STYLE: {
			width: '10%',
			height: '100%',
			backgroundColor: '#f7f7f7',
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
			padding: 0
		},
		ITEM_BTN_STYLE: {
			width: '50%',
			height: '5%',
			backgroundColor: '#f7f7f7',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			cursor: 'pointer'
		},
		FEATURE_BTN_STYLE: {
			width: '50%',
			height: '5%',
			backgroundColor: '#d6d6d6',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			cursor: 'pointer'
		},
		ITEM_MENU_STYLE: {
			width: '100%',
			height: '95%',
			backgroundColor: '#f7f7f7',
			display: 'flex',
			flexWrap: 'wrap',
			justifyContent: 'space-around',
			alignItems: 'flex-start',
			boxSizing: 'border-box',
			padding: '20px 20px'
		},
		FEATURE_MENU_STYLE: {
			width: '100%',
			height: '95%',
			backgroundColor: '#d6d6d6',
			display: 'flex',
			flexDirection: 'column',
			justifyContent: 'flex-start',
			alignItems: 'flex-start',
			boxSizing: 'border-box',
			padding: '0'
		},
		BODY_STYLE: {
			width: '90%',
			height: '100%',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			backgroundColor: '#333'
		},
		SVG_STYLE: {
			backgroundColor: '#333'
		},
		CANVAS_COLOR: '#fff',
		MENU_ITEM_STYLE: {
			width: '90px',
			height: '100px',
			display: 'flex',
			flexDirection: 'column'
		},
		MENU_ITEM_ICON_STYLE: {
			height: '60px'
		},
		MENU_ITEM_TITLE_STYLE: {
			textAlign: 'center',
			userSelect: 'none'
		},
		FEATURE_MENU_ITEM_STYLE: {
			width: '100%',
			height: '40px',
			display: 'flex',
			justifyContent: 'center',
			alignItems: 'center',
			cursor: 'pointer'
		},
		CONTEXT_MENU_STYLE: {
			backgroundColor: '#f7f7f7',
			listStyle: 'none',
			textAlign: 'center',
			padding: 0,
			margin: 0
		},
		CONTEXT_MENU_ITEM_STYLE: {
			padding: '2px 20px',
			cursor: 'default'
		},
		SVG_SIZE: {
			width: 1920,
			height: 1080
		},
		SVG_ITEM_SIZE: {
			width: 100,
			height: 100
		},
		AUX_ITEM_SIZE: {
			width: 10,
			height: 10
		},
		MSG_STYLE: {
			position: 'fixed',
			left: '80%',
			top: '20%',
			transform: 'translate(-50%, -50%)',
			padding: '20px 40px',
			backgroundColor: '#f7f7f7',
			color: '#333333'
		}
	}

	//默认元素菜单配置
	const ITEM_MENU_CONF = {
		chache: {
			title: '叉车',
			url: 'http://vanchun.oss-cn-shenzhen.aliyuncs.com/biu/menuItems/chache.svg',
			color: '#DDDDFF',
			menus: [
				{
					name: '删除',
					callBack: function(self) {
						//可以加入自定义数据处理
						self.destory()
					}
				},
				{
					name: '向右旋转',
					callBack: function(self) {
						self.rotate += 90
						if (self.rotate == 360) {
							self.rotate = 0
						}
						self._resize()
						biu.auxs.reLocate()
					}
				},
				{
					name: '自定义菜单2',
					callBack: function() {
						console.log('真的可以自定义')
					}
				}
			],
			//自定义init事件
			init : function(self, itemMenu, svg) {
				var g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
				var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
				rect.setAttribute('fill', itemMenu[self.item_name].color)
				var img = document.createElementNS('http://www.w3.org/2000/svg', 'image')
				img.href.baseVal = itemMenu[self.item_name].url
				g.appendChild(rect)
				g.appendChild(img)
				svg.appendChild(g)
				return g
			}
		},
		huoxiang: {
			title: '货箱',
			url: 'http://vanchun.oss-cn-shenzhen.aliyuncs.com/biu/menuItems/xiangzi.svg',
			color: '#C4E1FF',
			menus: [
				{
					name: '删除',
					callBack: function(self) {
						self.destory()
					}
				}
			]
		}
	}
	
	//默认功能菜单配置
	const FEATURE_MENU_CONF = [
		{
			name: '保存',
			feature: function() {
				biuMsg('保存数据')
			}
		},
		{
			name: '重置',
			feature: function() {
				biuMsg('重置数据')
			}
		}
	]
	
	//默认生命周期
	const SVG_ITEM_LIFE = {
		init: function(self, itemMenu, svg) {
			var g = document.createElementNS('http://www.w3.org/2000/svg', 'g')
			var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
			rect.setAttribute('fill', itemMenu[self.item_name].color)
			var img = document.createElementNS('http://www.w3.org/2000/svg', 'image')
			img.href.baseVal = itemMenu[self.item_name].url
			g.appendChild(rect)
			g.appendChild(img)
			svg.appendChild(g)
			return g
		},
		resize: function(self) {
			self._dom.children[0].setAttribute('x', self.x)
			self._dom.children[0].setAttribute('y', self.y)
			self._dom.children[0].setAttribute('width', self.width)
			self._dom.children[0].setAttribute('height', self.height)
			//IMG
			self._dom.children[1].setAttribute('height', 60)
			self._dom.children[1].setAttribute('width', 60)
			//手动计算居中
			self._dom.children[1].setAttribute('x', self.x + (self.width - 60)/2)
			self._dom.children[1].setAttribute('y', self.y + (self.height - 60)/2)
			self._dom.setAttribute('transform', 'rotate(' + self.rotate + ', ' + (self.x + self.width/2) + ', ' + (self.y + self.height/2) + ')')
		}
	}

	//默认缩放事件
	const AUX_ITEM_ZOOM = {
		topLeftZoom: function (ev) {
			//计算x与y的位移量
			var offsetX = ev.offsetX - BIU_GLOBAL.mouse.x
			var offsetY = ev.offsetY - BIU_GLOBAL.mouse.y
			BIU_GLOBAL.mouse.x = ev.offsetX
			BIU_GLOBAL.mouse.y = ev.offsetY
			//计算元素实际需要移动的距离
			var vector = getMoveXY(offsetX, offsetY)
			//缩放当前元素,重新计算x,y,width,heigth
			BIU_GLOBAL.checkedSVGItem.forEach(item => {
				if (item.rotate == 0 || Math.abs(item.rotate) == 180) {
					item.x = item.x + vector.x
					item.y = item.y + vector.y
					//缩小的移动不可越界
					if (item.width - vector.x >= 20) {
						item.width = item.width - vector.x
					}
					if (item.height - vector.y >= 20) {
						item.height = item.height - vector.y
					}
				} else if (Math.abs(item.rotate) == 90 || Math.abs(item.rotate) == 270) {
					//缩小的移动不可越界
					if (item.width - vector.y >= 20) {
						item.width = item.width - vector.y
						item.x = item.x + (vector.x + vector.y) / 2
					}
					if (item.height - vector.x >= 20) {
						item.height = item.height - vector.x
						item.y = item.y + (vector.x + vector.y) / 2
					}
				}
				item._resize()
			})
			//使辅助点也跟着移动
			BIU_GLOBAL.checkedAUX.reLocate()
		},
		topMiddleZoom: function(ev) {
			//计算x与y的位移量
			var offsetX = ev.offsetX - BIU_GLOBAL.mouse.x
			var offsetY = ev.offsetY - BIU_GLOBAL.mouse.y
			BIU_GLOBAL.mouse.x = ev.offsetX
			BIU_GLOBAL.mouse.y = ev.offsetY
			//计算元素实际需要移动的距离
			var vector = getMoveXY(offsetX, offsetY)
			//缩放当前元素,重新计算x,y,width,heigth
			BIU_GLOBAL.checkedSVGItem.forEach(item => {
				if (item.rotate == 0 || Math.abs(item.rotate) == 180) {
					item.y = item.y + vector.y
					if (item.height - vector.y >= 20) {
						item.height = item.height - vector.y
					}
				} else if (Math.abs(item.rotate) == 90 || Math.abs(item.rotate) == 270) {
					//缩小的移动不可越界
					if (item.width - vector.y >= 20) {
						item.width = item.width - vector.y
						item.y = item.y + vector.y / 2
						item.x = item.x + vector.y / 2
					} else {
						item.y = item.y + vector.y
					}
				}
				item._resize()
			})
			//使辅助点也跟着移动
			BIU_GLOBAL.checkedAUX.reLocate()
		},
		topRightZoom: function(ev) {
			//计算x与y的位移量
			var offsetX = ev.offsetX - BIU_GLOBAL.mouse.x
			var offsetY = ev.offsetY - BIU_GLOBAL.mouse.y
			BIU_GLOBAL.mouse.x = ev.offsetX
			BIU_GLOBAL.mouse.y = ev.offsetY
			//计算元素实际需要移动的距离
			var vector = getMoveXY(offsetX, offsetY)
			//缩放当前元素,重新计算x,y,width,heigth
			BIU_GLOBAL.checkedSVGItem.forEach(item => {
				if (item.rotate == 0 || Math.abs(item.rotate) == 180) {
					//缩小的移动不可越界
					if (item.width + vector.x >= 20) {
						item.width = item.width + vector.x
					} else {
						item.x = item.x + vector.x
					}
					if (item.height - vector.y >= 20) {
						item.height = item.height - vector.y
					}
					item.y = item.y + vector.y
				} else if (Math.abs(item.rotate) == 90 || Math.abs(item.rotate) == 270) {
					//缩小的移动不可越界
					if (item.width - vector.y >= 20) {
						item.width = item.width - vector.y
						item.x = item.x + (vector.x + vector.y) / 2
					}
					if (item.height + vector.x >= 20) {
						item.height = item.height + vector.x
						item.y = item.y - (vector.x - vector.y) / 2
					}
				}
				item._resize()
			})
			//使辅助点也跟着移动
			BIU_GLOBAL.checkedAUX.reLocate()
		},
		middleLeftZoom: function(ev) {
			//计算x与y的位移量
			var offsetX = ev.offsetX - BIU_GLOBAL.mouse.x
			var offsetY = ev.offsetY - BIU_GLOBAL.mouse.y
			BIU_GLOBAL.mouse.x = ev.offsetX
			BIU_GLOBAL.mouse.y = ev.offsetY
			//计算元素实际需要移动的距离
			var vector = getMoveXY(offsetX, offsetY)
			//缩放当前元素,重新计算x,y,width,heigth
			BIU_GLOBAL.checkedSVGItem.forEach(item => {
				if (item.rotate == 0 || Math.abs(item.rotate) == 180) {
					//缩小的移动不可越界
					item.x = item.x + vector.x
					//缩小的移动不可越界
					if (item.width - vector.x >= 20) {
						item.width = item.width - vector.x
					}
				} else if (Math.abs(item.rotate) == 90 || Math.abs(item.rotate) == 270) {
					//缩小的移动不可越界
					if (item.height - vector.x >= 20) {
						item.height = item.height - vector.x
						item.y = item.y + vector.x / 2
						item.x = item.x + vector.x / 2
					} else {
						item.x = item.x + vector.x
					}
				}
				item._resize()
			})
			//使辅助点也跟着移动
			BIU_GLOBAL.checkedAUX.reLocate()
		},
		middleRightZoom: function(ev) {
			//计算x与y的位移量
			var offsetX = ev.offsetX - BIU_GLOBAL.mouse.x
			var offsetY = ev.offsetY - BIU_GLOBAL.mouse.y
			BIU_GLOBAL.mouse.x = ev.offsetX
			BIU_GLOBAL.mouse.y = ev.offsetY
			//计算元素实际需要移动的距离
			var vector = getMoveXY(offsetX, offsetY)
			//缩放当前元素,重新计算x,y,width,heigth
			BIU_GLOBAL.checkedSVGItem.forEach(item => {
				if (item.rotate == 0 || Math.abs(item.rotate) == 180) {
					//缩小的移动不可越界
					if (item.width + vector.x >= 20) {
						item.width = item.width + vector.x
					} else {
						item.x = item.x + vector.x
					}
				} else if (Math.abs(item.rotate) == 90 || Math.abs(item.rotate) == 270) {
					//缩小的移动不可越界
					if (item.height + vector.x >= 20) {
						item.height = item.height + vector.x
						item.y = item.y - vector.x / 2
						item.x = item.x + vector.x / 2
					} else {
						item.x = item.x + vector.x
					}
				}
				item._resize()
			})
			//使辅助点也跟着移动
			BIU_GLOBAL.checkedAUX.reLocate()
		},
		bottomLeftZoom: function(ev) {
			//计算x与y的位移量
			var offsetX = ev.offsetX - BIU_GLOBAL.mouse.x
			var offsetY = ev.offsetY - BIU_GLOBAL.mouse.y
			BIU_GLOBAL.mouse.x = ev.offsetX
			BIU_GLOBAL.mouse.y = ev.offsetY
			//计算元素实际需要移动的距离
			var vector = getMoveXY(offsetX, offsetY)
			//缩放当前元素,重新计算x,y,width,heigth
			BIU_GLOBAL.checkedSVGItem.forEach(item => {
				if (item.rotate == 0 || Math.abs(item.rotate) == 180) {
					item.x = item.x + vector.x
					//缩小的移动不可越界
					if (item.width - vector.x >= 20) {
						item.width = item.width - vector.x
					}
					
					if (item.height + vector.y >= 20) {
						item.height = item.height + vector.y
					} else {
						item.y = item.y + vector.y
					}
				} else if (Math.abs(item.rotate) == 90 || Math.abs(item.rotate) == 270) {
					//缩小的移动不可越界
					if (item.width + vector.y >= 20) {
						item.width = item.width + vector.y
						item.x = item.x + (vector.x - vector.y)/2
					}
					if (item.height - vector.x >= 20) {
						item.height = item.height - vector.x
						item.y = item.y + (vector.x + vector.y)/2
					}
				}
				item._resize()
			})
			//使辅助点也跟着移动
			BIU_GLOBAL.checkedAUX.reLocate()
		},
		bottomMiddleZoom: function(ev) {
			//计算x与y的位移量
			var offsetX = ev.offsetX - BIU_GLOBAL.mouse.x
			var offsetY = ev.offsetY - BIU_GLOBAL.mouse.y
			BIU_GLOBAL.mouse.x = ev.offsetX
			BIU_GLOBAL.mouse.y = ev.offsetY
			//计算元素实际需要移动的距离
			var vector = getMoveXY(offsetX, offsetY)
			//缩放当前元素,重新计算x,y,width,heigth
			BIU_GLOBAL.checkedSVGItem.forEach(item => {
				if (item.rotate == 0 || Math.abs(item.rotate) == 180) {
					if (item.height + vector.y >= 20) {
						item.height = item.height + vector.y
					} else {
						item.y = item.y + vector.y
					}
				} else if (Math.abs(item.rotate) == 90 || Math.abs(item.rotate) == 270) {
					//缩小的移动不可越界
					if (item.width + vector.y >= 20) {
						item.width = item.width + vector.y
						item.x = item.x - vector.y/2
						item.y = item.y + vector.y/2
					} else {
						item.y = item.y + vector.y
					}
				}
				item._resize()
			})
			//使辅助点也跟着移动
			BIU_GLOBAL.checkedAUX.reLocate()
		},
		bottomRightZoom: function(ev) {
			//计算x与y的位移量
			var offsetX = ev.offsetX - BIU_GLOBAL.mouse.x
			var offsetY = ev.offsetY - BIU_GLOBAL.mouse.y
			BIU_GLOBAL.mouse.x = ev.offsetX
			BIU_GLOBAL.mouse.y = ev.offsetY
			//计算元素实际需要移动的距离
			var vector = getMoveXY(offsetX, offsetY)
			//缩放当前元素,重新计算x,y,width,heigth
			BIU_GLOBAL.checkedSVGItem.forEach(item => {
				if (item.rotate == 0 || Math.abs(item.rotate) == 180) {
					//缩小的移动不可越界
					if (item.width + vector.x >= 20) {
						item.width = item.width + vector.x
					} else {
						item.x = item.x + vector.x
					}
					if (item.height + vector.y >= 20) {
						item.height = item.height + vector.y
					} else {
						item.y = item.y + vector.y
					}
				} else if (Math.abs(item.rotate) == 90 || Math.abs(item.rotate) == 270) {
					//缩小的移动不可越界
					if (item.width + vector.y >= 20) {
						item.width = item.width + vector.y
						item.x = item.x + (vector.x - vector.y)/2
					}
					if (item.height + vector.x >= 20) {
						item.height = item.height + vector.x
						item.y = item.y - (vector.x - vector.y)/2
						item.y = item.y + (vector.x + vector.y)/2
					}
				}
				item._resize()
			})
			//使辅助点也跟着移动
			BIU_GLOBAL.checkedAUX.reLocate()
		}
	}

	var BUILTIN_OBJECT = {
	    '[object Function]': 1,
	    '[object RegExp]': 1,
	    '[object Date]': 1,
	    '[object Error]': 1,
	    '[object CanvasGradient]': 1,
	    '[object CanvasPattern]': 1,
	    // For node-canvas
	    '[object Image]': 1,
	    '[object Canvas]': 1
	}
	
	var TYPED_ARRAY = {
	    '[object Int8Array]': 1,
	    '[object Uint8Array]': 1,
	    '[object Uint8ClampedArray]': 1,
	    '[object Int16Array]': 1,
	    '[object Uint16Array]': 1,
	    '[object Int32Array]': 1,
	    '[object Uint32Array]': 1,
	    '[object Float32Array]': 1,
	    '[object Float64Array]': 1
	}

	var objToString = Object.prototype.toString;
	
	function isDom(value) {
	    return typeof value === 'object'
	        && typeof value.nodeType === 'number'
	        && typeof value.ownerDocument === 'object';
	}

	//深度克隆
	function clone(source) {
	    if (source == null || typeof source !== 'object') {
	        return source;
	    }
	
	    var result = source;
	    var typeStr = objToString.call(source);
	
	    if (typeStr === '[object Array]') {
	        result = [];
	        for (var i = 0, len = source.length; i < len; i++) {
	            result[i] = clone(source[i]);
	        }
	    } else if (TYPED_ARRAY[typeStr]) {
	        var Ctor = source.constructor;
	        if (source.constructor.from) {
	            result = Ctor.from(source);
	        }
	        else {
	            result = new Ctor(source.length);
	            for (var i = 0, len = source.length; i < len; i++) {
	                result[i] = clone(source[i]);
	            }
	        }
	    }
	    else if (!BUILTIN_OBJECT[typeStr] && !isDom(source)) {
	        result = {};
	        for (var key in source) {
	            if (source.hasOwnProperty(key)) {
	                result[key] = clone(source[key]);
	            }
	        }
	    }
	    return result;
	}

	//处理用户style的个性配置
	function setStyle(target, opt, def) {
		opt = opt || {}
		var styleKeys = Object.keys(def)
		styleKeys.forEach(function(styleName) {
			target.style[styleName] = opt[styleName] ? opt[styleName] : def[styleName]
		})
	}

	//获得用户的style配置
	function getStyle() {
		return BIU_GLOBAL.option.style || {}
	}

	//各类全局对象
	var BIU_GLOBAL = {
		option : null,
		SVGItems: [],
		checkedSVGItem: [], //已选中的对象数组
		checkedAUX: { //选中信息的辅助点，总共有八个
			area: {}, //选中全部元素所占的区域
			dots: {}, //保存辅助点的对象
			reset: function() { //生成或重置辅助点的方法
				this.reArea()
				//删除原有的辅助点对象
				this.cleanDots()
				//创建新的辅助点对象
				this.dots.topLeft = new BiuAuxTopLeft()
				this.dots.topMiddle = new BiuAuxTopMiddle()
				this.dots.topRight = new BiuAuxTopRight()
				this.dots.middleLeft = new BiuAuxMiddleLeft()
				this.dots.middleRight = new BiuAuxMiddleRight()
				this.dots.bottomLeft = new BiuAuxBottomLeft()
				this.dots.bottomMiddle = new BiuAuxBottomMiddle()
				this.dots.bottomRight = new BiuAuxBottomRight()
			},
			cleanDots: function() {
				for (let key in this.dots) {
					this.dots[key]._destory()
				}
				this.dots = {}
			},
			reArea: function() {
				this.area = {}
				//重新计算Area 加入旋转后元素的兼容
				BIU_GLOBAL.checkedSVGItem.forEach(item => {
					var center = item.getCenter()
					item.rotate = item.rotate || 0
					if (Math.abs(item.rotate) == 0 || Math.abs(item.rotate) == 180) {
						if (!this.area.minX || this.area.minX > item.x) {
							this.area.minX = item.x
						}
						if (!this.area.maxX || this.area.maxX < item.x + item.width) {
							this.area.maxX = item.x + item.width
						}
						if (!this.area.minY || this.area.minY > item.y) {
							this.area.minY = item.y
						}
						if (!this.area.maxY || this.area.maxY < item.y + item.height) {
							this.area.maxY = item.y + item.height
						}
					} else if (Math.abs(item.rotate) == 90 || Math.abs(item.rotate) == 270) {
						if (!this.area.minX || this.area.minX > center.x - item.height/2) {
							this.area.minX = center.x - item.height/2
						}
						if (!this.area.maxX || this.area.maxX < center.x + item.height/2) {
							this.area.maxX = center.x + item.height/2
						}
						if (!this.area.minY || this.area.minY > center.y - item.width/2) {
							this.area.minY = center.y - item.width/2
						}
						if (!this.area.maxY || this.area.maxY < center.y + item.width/2) {
							this.area.maxY = center.y + item.width/2
						}
					}
					
				})
			},
			reSize: function() {
				for (let key in this.dots) {
					this.dots[key]._resize()
				}
			},
			reLocate: function() {
				this.reArea()
				for (let key in this.dots) {
					this.dots[key]._resize()
				}
			}
		},
		mouse: {x: 0, y: 0, setPosition: function(ev) {
			BIU_GLOBAL.mouse.x = ev.offsetX
			BIU_GLOBAL.mouse.y = ev.offsetY
		}},
		//右键菜单
		contextMenu: {
			dom: {},
			hide: function() {
				this.dom.style.display = 'none'
			},
			show: function(x, y) {
				this.dom.style.left = x + 'px'
				this.dom.style.top = y + 'px'
				this.dom.style.right = 'initial'
				this.dom.style.bottom = 'initial'
				this.dom.style.display = 'block'
				//处理反向菜单
				//高度越界
				if (y + this.dom.clientHeight >= document.documentElement.clientHeight) {
					this.dom.style.top = 'initial'
					this.dom.style.bottom = (document.documentElement.clientHeight - y) + 'px'
				}
				//宽度越界
				if (x + this.dom.clientWidth >= document.documentElement.clientWidth) {
					this.dom.style.left = 'initial'
					this.dom.style.right = (document.documentElement.clientWidth - x) + 'px'
				}
			}
		},
		//缩放队列，定义可行的缩放比例
		zoomQueue: {
			nowZoom: 7,
			arr: [
				{
					name: '25%',
					value: 4
				},
				{
					name: '33%',
					value: 3.03
				},
				{
					name: '50%',
					value: 2
				},
				{
					name: '67%',
					value: 1.49
				},
				{
					name: '75%',
					value: 1.33
				},
				{
					name: '80%',
					value: 1.25
				},
				{
					name: '90%',
					value: 1.11
				},
				{
					name: '100%',
					value: 1
				},
				{
					name: '110%',
					value: 0.91
				},
				{
					name: '125%',
					value: 0.8
				},
				{
					name: '150%',
					value: 0.67
				},
				{
					name: '175%',
					value: 0.57
				},
				{
					name: '200%',
					value: 0.5
				},
				{
					name: '250%',
					value: 0.4
				},
				{
					name: '300%',
					value: 0.33
				}
			]
		}
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
		var self = this
		//创建菜单对象
		setStyle(document.getElementsByTagName('body')[0], getStyle().page, STYLE.PAGE_STYLE)
		setStyle(this._dom, getStyle().biu, STYLE.BIU_STYLE)
		//创建menu和body，作为容器
		this._menu = document.createElement("div")
		this._body = document.createElement("div")
		this._dom.appendChild(this._menu)
		this._dom.appendChild(this._body)
		setStyle(this._menu, getStyle().menu, STYLE.MENU_STYLE)
		setStyle(this._body, getStyle().body, STYLE.BODY_STYLE)
		//创建元素菜单和功能菜单的按钮
		this._itemMenuBtn = document.createElement('div')
		this._featureMenuBtn = document.createElement('div')
		setStyle(this._itemMenuBtn, getStyle().menuBtn, STYLE.ITEM_BTN_STYLE)
		setStyle(this._featureMenuBtn, getStyle().menuBtn, STYLE.FEATURE_BTN_STYLE)
		this._itemMenuBtn.innerHTML = '元素'
		this._featureMenuBtn.innerHTML = '功能'
		this._menu.appendChild(this._itemMenuBtn)
		this._menu.appendChild(this._featureMenuBtn)
		this._itemMenu = document.createElement('div')
		this._featureMenu = document.createElement('div')
		setStyle(this._itemMenu, getStyle().subMenu, STYLE.ITEM_MENU_STYLE)
		setStyle(this._featureMenu, getStyle().subMenu, STYLE.FEATURE_MENU_STYLE)
		self._featureMenu.style.display = 'none'
		this._menu.appendChild(this._itemMenu)
		this._menu.appendChild(this._featureMenu)
		this._itemMenuBtn.addEventListener('click', function() {
			self._itemMenu.style.display = 'flex'
			self._featureMenu.style.display = 'none'
		})
		this._featureMenuBtn.addEventListener('click', function() {
			self._itemMenu.style.display = 'none'
			self._featureMenu.style.display = 'flex'
		})
		//创建SVG内容
		this._svg = document.createElementNS("http://www.w3.org/2000/svg", "svg")
		this._body.appendChild(this._svg)
		//SVG元素的样式与viewBox
		var svgSize = getStyle().svgSize || STYLE.SVG_SIZE
		this._svg.viewBox.baseVal.x = 0
		this._svg.viewBox.baseVal.y = 0
		this._svg.viewBox.baseVal.width = svgSize.width
		this._svg.viewBox.baseVal.height = svgSize.height
		//根据页面宽高比，设置SVGcss，务必保证不出现滚动条
		setStyle(this._svg, getStyle().svg, STYLE.SVG_STYLE)
		//如果屏幕比我更宽
		if (document.body.clientWidth / document.body.clientHeight > svgSize.width / svgSize.height) {
			this._svg.style.height = '100%'
		} else {
			this._svg.style.width = '100%'
		}
		//设置背景矩形，标明画布大小
		var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
		rect.setAttribute('x', 0)
		rect.setAttribute('y', 0)
		rect.setAttribute('width', svgSize.width)
		rect.setAttribute('height', svgSize.height)
		rect.setAttribute('fill', getStyle().canvasColor || STYLE.CANVAS_COLOR)
		this._svg.appendChild(rect)
		//SVG对象应作为辅助点对象的父元素
		BIU_GLOBAL.svg = this._svg
	}

	//item菜单的创建
	biuProto._initItemMenu = function() {
		var self = this
		var itemMenuConf = getItemMenuConf()
		Object.keys(itemMenuConf).forEach(function(key) {
			//为每一个item创建dom元素，加入页面
			var item = itemMenuConf[key]
			self.menuItems.push(new MenuItem(key, item, self._itemMenu))
		})
	}
	
	function getItemMenuConf() {
		var option = BIU_GLOBAL.option || {}
		return option.itemMenuConf ? option.itemMenuConf : ITEM_MENU_CONF
	}

	//feature菜单的创建
	biuProto._initFeatureMenu = function() {
		var self = this
		var feaureMenuConf = BIU_GLOBAL.option.featureMenuConf || FEATURE_MENU_CONF
		feaureMenuConf.forEach(feature => {
			//创建dom元素，加入页面
			var featureMenuItem = document.createElement('div')
			setStyle(featureMenuItem, BIU_GLOBAL.option.fuatureMenuItem, STYLE.FEATURE_MENU_ITEM_STYLE)
			featureMenuItem.innerHTML = feature.name
			featureMenuItem.addEventListener('click', feature.feature)
			self._featureMenu.appendChild(featureMenuItem)
		})
	}

	biuProto._initSVG = function() {
		var initSVG = BIU_GLOBAL.option.initSVG || function() {
			console.log('数据加载方法')
		}
		initSVG()
	}

	biuProto._initEvent = function() {
		var self = this
		this._svg.addEventListener('dragover', function(ev) {
			ev.dataTransfer.dropEffect = "copy"
			ev.preventDefault()
		})
		this._svg.addEventListener('drop', function(ev) {
			ev.preventDefault()
			var item_name = ev.dataTransfer.getData("text")
			//计算元素左上顶点的值
			var ratio = BIU_GLOBAL.zoomQueue.arr[BIU_GLOBAL.zoomQueue.nowZoom].value
			var svgSize = BIU_GLOBAL.option.svgSize || STYLE.SVG_SIZE
			var x = svgSize.width * ratio * ev.offsetX / BIU_GLOBAL.svg.clientWidth + BIU_GLOBAL.svg.viewBox.baseVal.x
			var y = svgSize.height * ratio * ev.offsetY / BIU_GLOBAL.svg.clientHeight + BIU_GLOBAL.svg.viewBox.baseVal.y
			new SVGItem(item_name, x, y)
		})
		this._svg.addEventListener('mousedown', function() {
			//点击背景，取消元素的选中
			BIU_GLOBAL.checkedSVGItem.forEach(item => {
				item.uncheckThis()
			})
			BIU_GLOBAL.checkedSVGItem = []
			BIU_GLOBAL.checkedAUX.cleanDots()
			//背景板可以取消右键菜单
			BIU_GLOBAL.contextMenu.hide()
		})
		//鼠标抬起时或经过body时
		this._svg.addEventListener('mouseover', function(ev) {
			ev.stopPropagation()
		})
		this._body.addEventListener('mouseover', function() {
			self._svg.removeEventListener('mousemove', itemMove)
			self._svg.removeEventListener('mousemove', topLeftZoom)
			self._svg.removeEventListener('mousemove', topMiddleZoom)
			self._svg.removeEventListener('mousemove', topRightZoom)
			self._svg.removeEventListener('mousemove', middleLeftZoom)
			self._svg.removeEventListener('mousemove', middleRightZoom)
			self._svg.removeEventListener('mousemove', bottomLeftZoom)
			self._svg.removeEventListener('mousemove', bottomMiddleZoom)
			self._svg.removeEventListener('mousemove', bottomRightZoom)
		})
		this._body.addEventListener('mouseup', function() {
			self._svg.removeEventListener('mousemove', itemMove)
			self._svg.removeEventListener('mousemove', topLeftZoom)
			self._svg.removeEventListener('mousemove', topMiddleZoom)
			self._svg.removeEventListener('mousemove', topRightZoom)
			self._svg.removeEventListener('mousemove', middleLeftZoom)
			self._svg.removeEventListener('mousemove', middleRightZoom)
			self._svg.removeEventListener('mousemove', bottomLeftZoom)
			self._svg.removeEventListener('mousemove', bottomMiddleZoom)
			self._svg.removeEventListener('mousemove', bottomRightZoom)
		})
		//滚轮事件，处理缩放
		this._body.addEventListener('wheel', function(ev) {
			if (ev.deltaY < 0) {
				if (BIU_GLOBAL.zoomQueue.nowZoom < BIU_GLOBAL.zoomQueue.arr.length - 1) {
					BIU_GLOBAL.zoomQueue.nowZoom += 1
					zoomSVG()
					BIU_GLOBAL.checkedAUX.reSize()
				}
			} else {
				if (BIU_GLOBAL.zoomQueue.nowZoom > 0) {
					BIU_GLOBAL.zoomQueue.nowZoom -= 1
					zoomSVG()
					BIU_GLOBAL.checkedAUX.reSize()
				}
			}
		})
		//整页拖拽的开始和结束
		this._svg.addEventListener('mousedown', function(ev) {
			BIU_GLOBAL.mouse.setPosition(ev)
			this.addEventListener('mousemove', dragAll)
		})
		this._body.addEventListener('mouseover', function() {
			self._svg.removeEventListener('mousemove', dragAll)
		})
		this._body.addEventListener('mouseup', function() {
			self._svg.removeEventListener('mousemove', dragAll)
		})
	}
	
	function dragAll(ev) {
		//计算x与y的位移量
		var offsetX = ev.offsetX - BIU_GLOBAL.mouse.x
		var offsetY = ev.offsetY - BIU_GLOBAL.mouse.y
		BIU_GLOBAL.mouse.x = ev.offsetX
		BIU_GLOBAL.mouse.y = ev.offsetY
		//计算背景实际需要移动的距离
		var move = getMoveXY(offsetX, offsetY)
		var xMove = move.x
		var yMove = move.y
		//让背景动起来
		this.viewBox.baseVal.x -= xMove
		this.viewBox.baseVal.y -= yMove
	}
	
	//全局缩放事件，重计算viewBox
	function zoomSVG() {
		var ratio = BIU_GLOBAL.zoomQueue.arr[BIU_GLOBAL.zoomQueue.nowZoom].value
		var svgSize = getStyle().svgSize || STYLE.SVG_SIZE
		BIU_GLOBAL.svg.viewBox.baseVal.width = svgSize.width * ratio
		BIU_GLOBAL.svg.viewBox.baseVal.height = svgSize.height * ratio
		biuMsg('当前缩放比例:' + BIU_GLOBAL.zoomQueue.arr[BIU_GLOBAL.zoomQueue.nowZoom].name)
	}
	
	function biuMsg(msg) {
		var div = document.createElement('div')
		div.innerHTML = msg
		setStyle(div, getStyle().msg, STYLE.MSG_STYLE)
		document.getElementsByTagName('body')[0].appendChild(div)
		setTimeout(function() {
			div.parentNode.removeChild(div)
		}, 2000)
	}

	/**
	 * 元素位移事件
	 */
	//移动事件
	function itemMove(ev) {
		//计算x与y的位移量
		var offsetX = ev.offsetX - BIU_GLOBAL.mouse.x
		var offsetY = ev.offsetY - BIU_GLOBAL.mouse.y
		BIU_GLOBAL.mouse.x = ev.offsetX
		BIU_GLOBAL.mouse.y = ev.offsetY
		//计算元素实际需要移动的距离
		var vector = getMoveXY(offsetX, offsetY)
		//使每一个元素也移动同样的距离
		BIU_GLOBAL.checkedSVGItem.forEach(item => {
			item.x = item.x + vector.x
			item.y = item.y + vector.y
			item._resize()
		})
		//使辅助点也跟着移动
		BIU_GLOBAL.checkedAUX.reLocate()
	}
	
	//单个元素的缩放事件，左上
	function topLeftZoom(ev) {
		var menuConf = getItemMenuConf()
		var auxItemZoomOption = BIU_GLOBAL.option.auxItemZoom || {}
		//当前元素自定义的缩放事件，或用户自定义的全局缩放事件，或默认缩放事件
		var fun = menuConf[BIU_GLOBAL.checkedSVGItem[0].item_name].topLeftZoom || auxItemZoomOption.topLeftZoom || AUX_ITEM_ZOOM.topLeftZoom
		fun(ev)
	}
	
	//单个元素的缩放事件，中上
	function topMiddleZoom(ev) {
		var menuConf = getItemMenuConf()
		var auxItemZoomOption = BIU_GLOBAL.option.auxItemZoom || {}
		//当前元素自定义的缩放事件，或用户自定义的全局缩放事件，或默认缩放事件
		var fun = menuConf[BIU_GLOBAL.checkedSVGItem[0].item_name].topMiddleZoom || auxItemZoomOption.topMiddleZoom || AUX_ITEM_ZOOM.topMiddleZoom
		fun(ev)
	}
	
	//单个元素的缩放事件，右上
	function topRightZoom(ev){
		var menuConf = getItemMenuConf()
		var auxItemZoomOption = BIU_GLOBAL.option.auxItemZoom || {}
		//当前元素自定义的缩放事件，或用户自定义的全局缩放事件，或默认缩放事件
		var fun = menuConf[BIU_GLOBAL.checkedSVGItem[0].item_name].topRightZoom || auxItemZoomOption.topRightZoom || AUX_ITEM_ZOOM.topRightZoom
		fun(ev)
	}
	
	//左中点的缩放
	function middleLeftZoom(ev) {
		var menuConf = getItemMenuConf()
		var auxItemZoomOption = BIU_GLOBAL.option.auxItemZoom || {}
		//当前元素自定义的缩放事件，或用户自定义的全局缩放事件，或默认缩放事件
		var fun = menuConf[BIU_GLOBAL.checkedSVGItem[0].item_name].middleLeftZoom || auxItemZoomOption.middleLeftZoom || AUX_ITEM_ZOOM.middleLeftZoom
		fun(ev)
	}
	
	//右中点的缩放
	function middleRightZoom(ev) {
		var menuConf = getItemMenuConf()
		var auxItemZoomOption = BIU_GLOBAL.option.auxItemZoom || {}
		//当前元素自定义的缩放事件，或用户自定义的全局缩放事件，或默认缩放事件
		var fun = menuConf[BIU_GLOBAL.checkedSVGItem[0].item_name].middleRightZoom || auxItemZoomOption.middleRightZoom || AUX_ITEM_ZOOM.middleRightZoom
		fun(ev)
	}

	//左下辅助点缩放事件
	function bottomLeftZoom(ev) {
		var menuConf = getItemMenuConf()
		var auxItemZoomOption = BIU_GLOBAL.option.auxItemZoom || {}
		//当前元素自定义的缩放事件，或用户自定义的全局缩放事件，或默认缩放事件
		var fun = menuConf[BIU_GLOBAL.checkedSVGItem[0].item_name].bottomLeftZoom || auxItemZoomOption.bottomLeftZoom || AUX_ITEM_ZOOM.bottomLeftZoom
		fun(ev)
	}
	
	//中下辅助点缩放事件
	function bottomMiddleZoom(ev) {
		var menuConf = getItemMenuConf()
		var auxItemZoomOption = BIU_GLOBAL.option.auxItemZoom || {}
		//当前元素自定义的缩放事件，或用户自定义的全局缩放事件，或默认缩放事件
		var fun = menuConf[BIU_GLOBAL.checkedSVGItem[0].item_name].bottomMiddleZoom || auxItemZoomOption.bottomMiddleZoom || AUX_ITEM_ZOOM.bottomMiddleZoom
		fun(ev)
	}
	
	//右下辅助点缩放事件
	function bottomRightZoom(ev) {
		var menuConf = getItemMenuConf()
		var auxItemZoomOption = BIU_GLOBAL.option.auxItemZoom || {}
		//当前元素自定义的缩放事件，或用户自定义的全局缩放事件，或默认缩放事件
		var fun = menuConf[BIU_GLOBAL.checkedSVGItem[0].item_name].bottomRightZoom || auxItemZoomOption.bottomRightZoom || AUX_ITEM_ZOOM.bottomRightZoom
		fun(ev)
	}
	
	//计算实际位移向量
	function getMoveXY(offsetX, offsetY) {
		//计算元素实际需要移动的距离
		var ratio = BIU_GLOBAL.zoomQueue.arr[BIU_GLOBAL.zoomQueue.nowZoom].value
		var svgSize = getStyle().svgSize || STYLE.SVG_SIZE
		return {
			x: offsetX * (svgSize.width * ratio) / BIU_GLOBAL.svg.clientWidth,
			y: offsetY * (svgSize.height * ratio) / BIU_GLOBAL.svg.clientHeight
		}
	}
	
	biuProto._initContextMenu = function() {
		//全局右键菜单对象的初始化
		var ul = document.createElement('ul')
		ul.style.display = 'none'
		ul.style.position = 'absolute'
		setStyle(ul, getStyle().contextMenu, STYLE.CONTEXT_MENU_STYLE)
		document.getElementsByTagName('body')[0].appendChild(ul)
		BIU_GLOBAL.contextMenu.dom = ul
	}

	//配置项的设置
	biuProto.setOption = function(option) {
		//全局只需一个option
		BIU_GLOBAL.option = option
		//完成初始页面布局
		this._initLayout()
		//完成菜单配置文件的加载
		this._initItemMenu()
		//功能菜单的加载
		this._initFeatureMenu()
		//元素的加载
		this._initSVG()
		//事件配置
		this._initEvent()
		//右键菜单初始化
		this._initContextMenu()
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
		setStyle(this._dom, getStyle().menuItem, STYLE.MENU_ITEM_STYLE)
		this._dom.style.backgroundColor = this._item.color
		this._dom.setAttribute('draggable', 'true')
		this._parent.appendChild(this._dom)
		var icon = document.createElement('img')
		icon.setAttribute('src', this._item.url)
		icon.setAttribute('draggable', 'false')
		setStyle(icon, getStyle().menuItemIcon, STYLE.MENU_ITEM_ICON_STYLE)
		var title = document.createElement('div')
		title.innerText = this._item.title
		setStyle(title, getStyle().menuItemTitle, STYLE.MENU_ITEM_TITLE_STYLE)
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
	function SVGItem(item_name, x, y, data) {
		this.item_name = item_name
		this.x = x
		this.y = y
		this.checked = false
		var itemMenuConf = getItemMenuConf()
		var svgItemSize = itemMenuConf[item_name].size || STYLE.SVG_ITEM_SIZE
		this.width = svgItemSize.width
		this.height = svgItemSize.height
		//用户传入，或默认，或空
		this.data = clone(data || itemMenuConf[item_name].data || {})
		this.rotate = 0
		this._dom = this._initDom()
		this._initEvent()
		this._resize()
		//保存到全局
		BIU_GLOBAL.SVGItems.push(this)
	}

	var SVGItemProto = SVGItem.prototype

	SVGItemProto._initDom = function() {
		var itemMenuConf = getItemMenuConf()
		var init = itemMenuConf[this.item_name].init || SVG_ITEM_LIFE.init
		return init(this, itemMenuConf, BIU_GLOBAL.svg)
	}

	SVGItemProto._initEvent = function() {
		var self = this
		this._dom.addEventListener('click', function(ev) {
			ev.stopPropagation()
			if (ev.ctrlKey && !self.checked) {
				self.addThis()
			} else {
				self.checkThis()
			}
		})
		this._dom.addEventListener('mousedown', function(ev) {
			ev.stopPropagation()
			//点击被选中的元素，则绑定拖拽事件
			if (self.checked) {
				//第一步，全局保存当前的鼠标指针位置
				BIU_GLOBAL.mouse.setPosition(ev)
				//全局绑定事件，处理选中元素的位移
				BIU_GLOBAL.svg.addEventListener('mousemove', itemMove)
			}
		})
		//点击元素隐藏右键菜单
		this._dom.addEventListener('mousedown', function() {
			BIU_GLOBAL.contextMenu.hide()
		})
		//动态生成右键菜单
		this._dom.addEventListener('contextmenu', function(ev) {
			var itemMenuConf = getItemMenuConf()
			var menuItem = itemMenuConf[self.item_name]
			//如果该元素配置了右键菜单，则生成并展示
			if (menuItem.menus && menuItem.menus.length > 0) {
				//清空原有的右键菜单
				BIU_GLOBAL.contextMenu.dom.innerHTML = ''
				menuItem.menus.forEach(menuEntry => {
					var li = document.createElement('li')
					li.innerHTML = menuEntry.name
					setStyle(li, BIU_GLOBAL.option.contextMenuItemStyle, STYLE.CONTEXT_MENU_ITEM_STYLE)
					li.addEventListener('click', function() {
						menuEntry.callBack(self)
						//执行后隐藏右键菜单
						BIU_GLOBAL.contextMenu.hide()
					})
					BIU_GLOBAL.contextMenu.dom.appendChild(li)
				})
				//展示右键菜单
				BIU_GLOBAL.contextMenu.show(ev.clientX, ev.clientY)
			}
		})
	}

	SVGItemProto._resize = function() {
		var itemMenuConf = getItemMenuConf()
		var resize = itemMenuConf[this.item_name].resize || SVG_ITEM_LIFE.resize
		resize(this)
	}
	
	SVGItemProto.checkThis = function() {
		//单击选择，则首先清空目前选中的全体对象
		BIU_GLOBAL.checkedSVGItem.forEach(item => {
			item.uncheckThis()
		})
		BIU_GLOBAL.checkedSVGItem = []
		//选中当前单个对象
		BIU_GLOBAL.checkedSVGItem.push(this)
		//记录自身的选中状态，且设置样式
		this.checked = true
		this._dom.style.cursor = 'move'
		//重渲染dom使当前元素在最上层
		BIU_GLOBAL.svg.removeChild(this._dom)
		BIU_GLOBAL.svg.appendChild(this._dom)
		//重置并生成辅助点
		BIU_GLOBAL.checkedAUX.reset()
	}
	
	SVGItemProto.addThis = function() {
		//添加当前对象进入选中队列
		BIU_GLOBAL.checkedSVGItem.push(this)
		//重置并生成辅助点
		BIU_GLOBAL.checkedAUX.reset()
		//记录自身的选中状态，且设置样式
		this.checked = true
		this._dom.style.cursor = 'move'
	}
	
	SVGItemProto.uncheckThis = function() {
		this.checked = false
		this._dom.style.cursor = 'auto'
	}
	
	SVGItemProto.destory = function() {
		//避免选中状态
		BIU_GLOBAL.checkedSVGItem.forEach(item => {
			item.uncheckThis()
		})
		BIU_GLOBAL.checkedSVGItem = []
		BIU_GLOBAL.checkedAUX.cleanDots()
		//在全局对象数组中删除自身的引用
		var arr = []
		for (var x = 0; x < BIU_GLOBAL.SVGItems.length; x++) {
			if (this != BIU_GLOBAL.SVGItems[x]) {
				arr.push(BIU_GLOBAL.SVGItems[x])
			}
		}
		BIU_GLOBAL.SVGItems = arr
		//删除自身dom
		BIU_GLOBAL.svg.removeChild(this._dom)
	}
	
	SVGItemProto.getCenter = function() {
		return {
			x: this.x + this.width / 2,
			y: this.y + this.height / 2
		}
	}
	
	/**
	 * 八个选择辅助点对象的定义
	 */
	//基础辅助点
	function BiuAuxBase() {
		this._destory = function() {
			BIU_GLOBAL.svg.removeChild(this._dom)
		},
		this._getSize = function() {
			var auxItemSize = BIU_GLOBAL.option.auxItemSize || STYLE.AUX_ITEM_SIZE
			//不管缩放，永远保持展示大小的一致
			this.width = auxItemSize.width * BIU_GLOBAL.zoomQueue.arr[BIU_GLOBAL.zoomQueue.nowZoom].value
			this.height = auxItemSize.height * BIU_GLOBAL.zoomQueue.arr[BIU_GLOBAL.zoomQueue.nowZoom].value
		},
		this._initDom = function() {
			var rect = document.createElementNS('http://www.w3.org/2000/svg', 'rect')
			rect.setAttribute('fill', '#FFFFFF')
			rect.setAttribute('stroke', '#000000')
			rect.setAttribute('stroke-width', '2')
			BIU_GLOBAL.svg.appendChild(rect)
			return rect
		},
		this._initEvent = function(callBack) {
			this._dom.addEventListener('click', function(ev) {
				ev.stopPropagation()
			})
			//点击元素隐藏右键菜单
			this._dom.addEventListener('mousedown', function() {
				BIU_GLOBAL.contextMenu.hide()
			})
			this._dom.addEventListener('mousedown', function(ev) {
				ev.stopPropagation()
				//第一步，全局保存当前的鼠标指针位置
				BIU_GLOBAL.mouse.setPosition(ev)
				//单个元素则绑定缩放事件，多个元素则绑定位移事件
				if (BIU_GLOBAL.checkedSVGItem.length == 1) {
					BIU_GLOBAL.svg.addEventListener('mousemove', callBack)
				} else {
					//全局绑定事件，处理选中元素的位移
					BIU_GLOBAL.svg.addEventListener('mousemove', itemMove)
				}
			})
		}
	}
	
	//左上辅助点
	function BiuAuxTopLeft() {
		this._dom = this._initDom()
		this._resize()
		this._dom.style.cursor = 'nw-resize'
		this._initEvent(topLeftZoom)
	}
	var BiuAuxTopLeftProto = BiuAuxTopLeft.prototype = new BiuAuxBase()
	
	BiuAuxTopLeftProto._resize = function() {
		this._getSize()
		this.x = BIU_GLOBAL.checkedAUX.area.minX - this.width/2
		this.y = BIU_GLOBAL.checkedAUX.area.minY - this.height/2
		this._dom.setAttribute('x', this.x)
		this._dom.setAttribute('y', this.y)
		this._dom.setAttribute('width', this.width)
		this._dom.setAttribute('height', this.height)
	}
		
	//中上辅助点
	function BiuAuxTopMiddle() {
		this._dom = this._initDom()
		this._resize()
		this._dom.style.cursor = 'n-resize'
		this._initEvent(topMiddleZoom)
	}
	var BiuAuxTopMiddleProto = BiuAuxTopMiddle.prototype = new BiuAuxBase()
	
	BiuAuxTopMiddleProto._resize = function() {
		this._getSize()
		this.x = BIU_GLOBAL.checkedAUX.area.minX + (BIU_GLOBAL.checkedAUX.area.maxX - BIU_GLOBAL.checkedAUX.area.minX)/2 - this.width/2
		this.y = BIU_GLOBAL.checkedAUX.area.minY - this.height/2
		this._dom.setAttribute('x', this.x)
		this._dom.setAttribute('y', this.y)
		this._dom.setAttribute('width', this.width)
		this._dom.setAttribute('height', this.height)
	}
	
	//右上辅助点
	function BiuAuxTopRight() {
		this._dom = this._initDom()
		this._resize()
		this._dom.style.cursor = 'ne-resize'
		this._initEvent(topRightZoom)
	}
	var BiuAuxTopRightProto = BiuAuxTopRight.prototype = new BiuAuxBase()
	
	BiuAuxTopRightProto._resize = function() {
		this._getSize()
		this.x = BIU_GLOBAL.checkedAUX.area.maxX - this.width/2
		this.y = BIU_GLOBAL.checkedAUX.area.minY - this.height/2
		this._dom.setAttribute('x', this.x)
		this._dom.setAttribute('y', this.y)
		this._dom.setAttribute('width', this.width)
		this._dom.setAttribute('height', this.height)
	}
	
	//左中辅助点
	function BiuAuxMiddleLeft() {
		this._dom = this._initDom()
		this._resize()
		this._dom.style.cursor = 'w-resize'
		this._initEvent(middleLeftZoom)
	}
	
	var BiuAuxMiddleLeftProto = BiuAuxMiddleLeft.prototype = new BiuAuxBase()
	
	BiuAuxMiddleLeftProto._resize = function() {
		this._getSize()
		this.x = BIU_GLOBAL.checkedAUX.area.minX - this.width/2
		this.y = BIU_GLOBAL.checkedAUX.area.minY + (BIU_GLOBAL.checkedAUX.area.maxY - BIU_GLOBAL.checkedAUX.area.minY)/2 - this.height/2
		this._dom.setAttribute('x', this.x)
		this._dom.setAttribute('y', this.y)
		this._dom.setAttribute('width', this.width)
		this._dom.setAttribute('height', this.height)
	}
	
	//右中辅助点
	function BiuAuxMiddleRight() {
		this._dom = this._initDom()
		this._resize()
		this._dom.style.cursor = 'e-resize'
		this._initEvent(middleRightZoom)
	}
	
	var BiuAuxMiddleRightProto = BiuAuxMiddleRight.prototype = new BiuAuxBase()
	
	BiuAuxMiddleRightProto._resize = function() {
		this._getSize()
		this.x = BIU_GLOBAL.checkedAUX.area.maxX - this.width/2
		this.y = BIU_GLOBAL.checkedAUX.area.minY + (BIU_GLOBAL.checkedAUX.area.maxY - BIU_GLOBAL.checkedAUX.area.minY)/2 - this.height/2
		this._dom.setAttribute('x', this.x)
		this._dom.setAttribute('y', this.y)
		this._dom.setAttribute('width', this.width)
		this._dom.setAttribute('height', this.height)
	}
	
	//左下辅助点
	function BiuAuxBottomLeft() {
		this._dom = this._initDom()
		this._resize()
		this._dom.style.cursor = 'sw-resize'
		this._initEvent(bottomLeftZoom)
	}
	
	var BiuAuxBottomLeftProto = BiuAuxBottomLeft.prototype = new BiuAuxBase()
	
	BiuAuxBottomLeftProto._resize = function() {
		this._getSize()
		this.x = BIU_GLOBAL.checkedAUX.area.minX - this.width/2
		this.y = BIU_GLOBAL.checkedAUX.area.maxY - this.height/2
		this._dom.setAttribute('x', this.x)
		this._dom.setAttribute('y', this.y)
		this._dom.setAttribute('width', this.width)
		this._dom.setAttribute('height', this.height)
	}
	
	//中下辅助点
	function BiuAuxBottomMiddle() {
		this._dom = this._initDom()
		this._resize()
		this._dom.style.cursor = 's-resize'
		this._initEvent(bottomMiddleZoom)
	}
	
	var BiuAuxBottomMiddleProto = BiuAuxBottomMiddle.prototype = new BiuAuxBase()
	
	BiuAuxBottomMiddleProto._resize = function() {
		this._getSize()
		this.x = BIU_GLOBAL.checkedAUX.area.minX + (BIU_GLOBAL.checkedAUX.area.maxX - BIU_GLOBAL.checkedAUX.area.minX)/2 - this.width/2
		this.y = BIU_GLOBAL.checkedAUX.area.maxY - this.height/2
		this._dom.setAttribute('x', this.x)
		this._dom.setAttribute('y', this.y)
		this._dom.setAttribute('width', this.width)
		this._dom.setAttribute('height', this.height)
	}
	
	//右下辅助点
	function BiuAuxBottomRight() {
		this._dom = this._initDom()
		this._resize()
		this._dom.style.cursor = 'se-resize'
		this._initEvent(bottomRightZoom)
	}
	
	var BiuAuxBottomRightProto = BiuAuxBottomRight.prototype = new BiuAuxBase()
	
	BiuAuxBottomRightProto._resize = function() {
		this._getSize()
		this.x = BIU_GLOBAL.checkedAUX.area.maxX - this.width/2
		this.y = BIU_GLOBAL.checkedAUX.area.maxY - this.height/2
		this._dom.setAttribute('x', this.x)
		this._dom.setAttribute('y', this.y)
		this._dom.setAttribute('width', this.width)
		this._dom.setAttribute('height', this.height)
	}
	
	//初始化biu对象
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
	
	//向客户提供创建元素的能力
	function createItem(item_name, x, y, data) {
		return new SVGItem(item_name, x, y, data)
	}
	
	exports.init = init
	exports.createItem = createItem
	exports.items = BIU_GLOBAL.SVGItems
	exports.auxs = BIU_GLOBAL.checkedAUX
})));
