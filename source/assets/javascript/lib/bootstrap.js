// Native Javascript for Bootstrap 3
// by dnp_theme

(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.Affix = factory();
	}
})(function(){

	//AFFIX DEFINITION
	var Affix = function(element,options) {
		this.element = typeof element === 'object' ? element : document.querySelector(element);
		this.options = {};
		this.options.target = options.target ? ((typeof(options.target) === 'object') ? options.target : document.querySelector(options.target)) : null; // target is an object
		this.options.offsetTop = options.offsetTop && options.offsetTop ? ( options.offsetTop === 'function' ? options.offsetTop() : parseInt(options.offsetTop,0) ) : 0; // offset option is an integer number or function to determine that number
		this.options.offsetBottom = options.offsetBottom && options.offsetBottom ? ( options.offsetBottom === 'function' ? options.offsetBottom() : parseInt(options.offsetBottom,0) ) : null;

		if (this.element && (this.options.target || this.options.offsetTop || this.options.offsetBottom ) ) { this.init(); }
	}

	//AFFIX METHODS
	Affix.prototype = {
		init: function () {
			this.affixed = false;
			this.affixedBottom = false;
			this.getPinOffsetTop = 0;
			this.getPinOffsetBottom = null;

			//actions
			this.checkPosition();
			this.updateAffix();
			this.scrollEvent();
			this.resizeEvent()
		},
		processOffsetTop: function () {
			if ( this.options.target !== null ) {
				return this.targetRect().top + this.scrollOffset();
			} else if ( this.options.offsetTop !== null ) {
				return this.options.offsetTop
			}
		},
		processOffsetBottom: function () {
			if ( this.options.offsetBottom !== null ) {
				var maxScroll = this.getMaxScroll();
				return maxScroll - this.elementHeight() - this.options.offsetBottom
			}
		},
		offsetTop: function () {
			return this.processOffsetTop()
		},
		offsetBottom: function () {
			return this.processOffsetBottom()
		},
		checkPosition: function () {
			this.getPinOffsetTop = this.offsetTop
			this.getPinOffsetBottom = this.offsetBottom
		},
		scrollOffset: function () {
			return window.pageYOffset || document.documentElement.scrollTop
		},
		pinTop: function () {
			if ( this.element.classList && !this.element.classList.contains('affix') ) this.element.classList.add('affix');
			this.affixed = true
		},
		unPinTop: function () {
			if ( this.element.classList && this.element.classList.contains('affix') ) this.element.classList.remove('affix');
			this.affixed = false
		},
		pinBottom: function () {
			if ( this.element.classList && !this.element.classList.contains('affix-bottom') ) this.element.classList.add('affix-bottom');
			this.affixedBottom = true
		},
		unPinBottom: function () {
			if ( this.element.classList && this.element.classList.contains('affix-bottom') ) this.element.classList.remove('affix-bottom');
			this.affixedBottom = false
		},

		updatePin: function () {
			if (this.affixed === false && (parseInt(this.offsetTop(),0) - parseInt(this.scrollOffset(),0) < 0)) {
				this.pinTop();
			} else if (this.affixed === true && (parseInt(this.scrollOffset(),0) <= parseInt(this.getPinOffsetTop(),0) )) {
				this.unPinTop()
			}

			if (this.affixedBottom === false && (parseInt(this.offsetBottom(),0) - parseInt(this.scrollOffset(),0) < 0)) {
				this.pinBottom();
			} else if (this.affixedBottom === true && (parseInt(this.scrollOffset(),0) <= parseInt(this.getPinOffsetBottom(),0) )) {
				this.unPinBottom()
			}
		},

		updateAffix : function () { // Unpin and check position again
			this.unPinTop();
			this.unPinBottom();
			this.checkPosition()

			this.updatePin() // If any case update values again
		},

		elementHeight : function(){
			return this.element.offsetHeight
		},

		targetRect : function(){
			return this.options.target.getBoundingClientRect()
		},

		getMaxScroll : function(){
			return Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight )
		},

		scrollEvent : function(){
			var self = this;
			window.addEventListener('scroll', affOnScroll = function() {
				self.updatePin()
			}, false);

		},
		resizeEvent : function(){
			var self = this;
			window.addEventListener('resize', affOnResize = function () {
				setTimeout(function(){
					self.updateAffix()
				},100);
			}, false);

		}
	};

	var Affixes = document.querySelectorAll('[data-spy="affix"]');
	[].forEach.call(Affixes, function (item) {
		var options = {};
			options.offsetTop		= item.getAttribute('data-offset-top');
			options.offsetBottom	= item.getAttribute('data-offset-bottom');
			options.target			= item.getAttribute('data-target');

		if ( item && (options.offsetTop !== null || options.offsetBottom !== null || options.target !== null) ) { //don't do anything unless we have something valid to pin
			return new Affix(item, options);
		}
	})

	return Affix;
});

(function(factory){

	// CommonJS/RequireJS and "native" compatibility
	if(typeof module !== "undefined" && typeof exports == "object") {
		// A commonJS/RequireJS environment
		if(typeof window != "undefined") {
			// Window and document exist, so return the factory's return value.
			module.exports = factory();
		} else {
			// Let the user give the factory a Window and Document.
			module.exports = factory;
		}
	} else {
		// Assume a traditional browser.
		window.ScrollSpy = factory();
	}

})(function(){

	//SCROLLSPY DEFINITION
	var ScrollSpy = function(element,item,options) {

		//this is the container element we spy it's elements on
		this.element = typeof element === 'object' ? element : document.querySelector(element);

		this.options = {};

		// this is the UL menu component our scrollSpy object will target, configure and required by the container element
		this.options.target = options.target ? (typeof options.target === 'object' ? options.target : document.querySelector(options.target)) : null;

		//we need to determine the index of each menu item
		this.items = this.options.target && this.options.target.getElementsByTagName('A');

		this.item = item;
		// the parent LI element
		this.parent = this.item.parentNode;

		// the upper level LI ^ UL ^ LI, this is required for dropdown menus
		this.parentParent = this.parent.parentNode.parentNode;

		this.tg = this.item.href && document.getElementById(this.item.getAttribute('href').replace('#',''));
		this.active = false;
		this.topEdge = 0;
		this.bottomEdge = 0;

		//determine which is the real scrollTarget
		if ( this.element.offsetHeight < this.element.scrollHeight ) { // or this.scrollHeight()
			this.scrollTarget = this.element;
		} else {
			this.scrollTarget = window;
		}

		if ( this.options.target ) {
			this.init();
		}
	};

	//SCROLLSPY METHODS
	ScrollSpy.prototype = {
		init: function () {
			if ( this.item.getAttribute('href') && this.item.getAttribute('href').indexOf('#') > -1 ) {
				//actions
				this.checkEdges();
				this.refresh()
				this.scrollEvent();
				this.resizeEvent();
			}
		},
		topLimit: function () { // the target offset
			var s = this.tg.currentStyle || window.getComputedStyle(this.tg);
			var els = this.element.currentStyle || window.getComputedStyle(this.element);
			if ( this.scrollTarget === window ) {
				return this.tg.getBoundingClientRect().top + this.scrollOffset()
			} else {
				return this.tg.offsetTop;
			}

		},
		bottomLimit: function () {
			var s = this.tg.currentStyle || window.getComputedStyle(this.tg);
			var els = this.element.currentStyle || window.getComputedStyle(this.element);
			return this.topLimit() + this.tg.offsetHeight
		},
		checkEdges: function () {
			this.topEdge = this.topLimit();
			this.bottomEdge = this.bottomLimit()
		},
		scrollOffset: function () {
			if ( this.scrollTarget === window ) {
				return window.pageYOffset || document.documentElement.scrollTop
			} else {
				return this.element.scrollTop
			}
		},
		activate: function () {
			if ( this.parent && this.parent.tagName === 'LI' && !this.parent.classList.contains('active') ) {
				this.parent.classList.add('active');
				if ( this.parentParent && this.parentParent.tagName === 'LI' // activate the dropdown as well
					&& this.parentParent.classList.contains('dropdown')
					&& !this.parentParent.classList.contains('active') ) { this.parentParent.classList.add('active');}
				this.active = true
			}
		},
		deactivate: function () {
			if ( this.parent && this.parent.tagName === 'LI' && this.parent.classList.contains('active') ) {
				this.parent.classList.remove('active');
				if ( this.parentParent && this.parentParent.tagName === 'LI' // deactivate the dropdown as well
					&& this.parentParent.classList.contains('dropdown')
					&& this.parentParent.classList.contains('active') ) { this.parentParent.classList.remove('active'); }
				this.active = false
			}
		},

		toggle: function () {
			if ( this.active === false
				&& ( this.bottomEdge > this.scrollOffset() && this.scrollOffset() >= this.topEdge )) { //regular use, scroll just entered the element's topLimit or bottomLimit
					this.activate();
			} else if (this.active === true && (this.bottomEdge <= this.scrollOffset() && this.scrollOffset() < this.topEdge )) {
				this.deactivate()
			}
		},
		refresh : function () { // check edges again
			this.deactivate();
			this.checkEdges();

			this.toggle() // If any case update values again
		},
		scrollEvent : function(){
			var self = this;
			this.scrollTarget.addEventListener('scroll', onSpyScroll, false);
			function onSpyScroll() {
				self.refresh();
			}
		},
		resizeEvent : function(){
			var self = this;
			window.addEventListener('resize', onSpyResize, false);
			function onSpyResize() {
				self.refresh()
			}
		},
		scrollHeight : function() {
			if ( this.scrollTarget === window ) {
				return Math.max( document.body.scrollHeight, document.body.offsetHeight, document.documentElement.clientHeight, document.documentElement.scrollHeight, document.documentElement.offsetHeight );
			} else {
				return this.element.scrollHeight
			}
		}
	};


	//SCROLLSPY API
	//=============
	var scrollSpyes = document.querySelectorAll('[data-spy="scroll"]'); // mostly is the document.body or a large container with many elements having id="not-null-id"
	[].forEach.call(scrollSpyes, function (spy,idx) {
		var options = {};
		options.target = spy.getAttribute('data-target') || null;	// this must be a .nav component with id="not-null"
		if ( options.target !== null ) {
			var menu = options.target === 'object' ?  options.target : document.querySelector(options.target);
			var items = menu.querySelectorAll('a');
			[].forEach.call(items, function (item,i) {
				if ( item.href && item.getAttribute('href') !== '#' )
				return new ScrollSpy(spy, item, options);
			})
		}
	})

	return ScrollSpy;

});
