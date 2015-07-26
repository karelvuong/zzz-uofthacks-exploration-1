!function(t){"undefined"!=typeof module&&"object"==typeof exports?module.exports="undefined"!=typeof window?t():t:window.Affix=t()}(function(){var t=function(t,e){this.element="object"==typeof t?t:document.querySelector(t),this.options={},this.options.target=e.target?"object"==typeof e.target?e.target:document.querySelector(e.target):null,this.options.offsetTop=e.offsetTop&&e.offsetTop?"function"===e.offsetTop?e.offsetTop():parseInt(e.offsetTop,0):0,this.options.offsetBottom=e.offsetBottom&&e.offsetBottom?"function"===e.offsetBottom?e.offsetBottom():parseInt(e.offsetBottom,0):null,this.element&&(this.options.target||this.options.offsetTop||this.options.offsetBottom)&&this.init()};t.prototype={init:function(){this.affixed=!1,this.affixedBottom=!1,this.getPinOffsetTop=0,this.getPinOffsetBottom=null,this.checkPosition(),this.updateAffix(),this.scrollEvent(),this.resizeEvent()},processOffsetTop:function(){return null!==this.options.target?this.targetRect().top+this.scrollOffset():null!==this.options.offsetTop?this.options.offsetTop:void 0},processOffsetBottom:function(){if(null!==this.options.offsetBottom){var t=this.getMaxScroll();return t-this.elementHeight()-this.options.offsetBottom}},offsetTop:function(){return this.processOffsetTop()},offsetBottom:function(){return this.processOffsetBottom()},checkPosition:function(){this.getPinOffsetTop=this.offsetTop,this.getPinOffsetBottom=this.offsetBottom},scrollOffset:function(){return window.pageYOffset||document.documentElement.scrollTop},pinTop:function(){this.element.classList&&!this.element.classList.contains("affix")&&this.element.classList.add("affix"),this.affixed=!0},unPinTop:function(){this.element.classList&&this.element.classList.contains("affix")&&this.element.classList.remove("affix"),this.affixed=!1},pinBottom:function(){this.element.classList&&!this.element.classList.contains("affix-bottom")&&this.element.classList.add("affix-bottom"),this.affixedBottom=!0},unPinBottom:function(){this.element.classList&&this.element.classList.contains("affix-bottom")&&this.element.classList.remove("affix-bottom"),this.affixedBottom=!1},updatePin:function(){this.affixed===!1&&parseInt(this.offsetTop(),0)-parseInt(this.scrollOffset(),0)<0?this.pinTop():this.affixed===!0&&parseInt(this.scrollOffset(),0)<=parseInt(this.getPinOffsetTop(),0)&&this.unPinTop(),this.affixedBottom===!1&&parseInt(this.offsetBottom(),0)-parseInt(this.scrollOffset(),0)<0?this.pinBottom():this.affixedBottom===!0&&parseInt(this.scrollOffset(),0)<=parseInt(this.getPinOffsetBottom(),0)&&this.unPinBottom()},updateAffix:function(){this.unPinTop(),this.unPinBottom(),this.checkPosition(),this.updatePin()},elementHeight:function(){return this.element.offsetHeight},targetRect:function(){return this.options.target.getBoundingClientRect()},getMaxScroll:function(){return Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight)},scrollEvent:function(){var t=this;window.addEventListener("scroll",affOnScroll=function(){t.updatePin()},!1)},resizeEvent:function(){var t=this;window.addEventListener("resize",affOnResize=function(){setTimeout(function(){t.updateAffix()},100)},!1)}};var e=document.querySelectorAll('[data-spy="affix"]');return[].forEach.call(e,function(e){var n={};return n.offsetTop=e.getAttribute("data-offset-top"),n.offsetBottom=e.getAttribute("data-offset-bottom"),n.target=e.getAttribute("data-target"),!e||null===n.offsetTop&&null===n.offsetBottom&&null===n.target?void 0:new t(e,n)}),t}),function(t){"undefined"!=typeof module&&"object"==typeof exports?module.exports="undefined"!=typeof window?t():t:window.ScrollSpy=t()}(function(){var t=function(t,e,n){this.element="object"==typeof t?t:document.querySelector(t),this.options={},this.options.target=n.target?"object"==typeof n.target?n.target:document.querySelector(n.target):null,this.items=this.options.target&&this.options.target.getElementsByTagName("A"),this.item=e,this.parent=this.item.parentNode,this.parentParent=this.parent.parentNode.parentNode,this.tg=this.item.href&&document.getElementById(this.item.getAttribute("href").replace("#","")),this.active=!1,this.topEdge=0,this.bottomEdge=0,this.scrollTarget=this.element.offsetHeight<this.element.scrollHeight?this.element:window,this.options.target&&this.init()};t.prototype={init:function(){this.item.getAttribute("href")&&this.item.getAttribute("href").indexOf("#")>-1&&(this.checkEdges(),this.refresh(),this.scrollEvent(),this.resizeEvent())},topLimit:function(){this.tg.currentStyle||window.getComputedStyle(this.tg),this.element.currentStyle||window.getComputedStyle(this.element);return this.scrollTarget===window?this.tg.getBoundingClientRect().top+this.scrollOffset():this.tg.offsetTop},bottomLimit:function(){this.tg.currentStyle||window.getComputedStyle(this.tg),this.element.currentStyle||window.getComputedStyle(this.element);return this.topLimit()+this.tg.offsetHeight},checkEdges:function(){this.topEdge=this.topLimit(),this.bottomEdge=this.bottomLimit()},scrollOffset:function(){return this.scrollTarget===window?window.pageYOffset||document.documentElement.scrollTop:this.element.scrollTop},activate:function(){this.parent&&"LI"===this.parent.tagName&&!this.parent.classList.contains("active")&&(this.parent.classList.add("active"),this.parentParent&&"LI"===this.parentParent.tagName&&this.parentParent.classList.contains("dropdown")&&!this.parentParent.classList.contains("active")&&this.parentParent.classList.add("active"),this.active=!0)},deactivate:function(){this.parent&&"LI"===this.parent.tagName&&this.parent.classList.contains("active")&&(this.parent.classList.remove("active"),this.parentParent&&"LI"===this.parentParent.tagName&&this.parentParent.classList.contains("dropdown")&&this.parentParent.classList.contains("active")&&this.parentParent.classList.remove("active"),this.active=!1)},toggle:function(){this.active===!1&&this.bottomEdge>this.scrollOffset()&&this.scrollOffset()>=this.topEdge?this.activate():this.active===!0&&this.bottomEdge<=this.scrollOffset()&&this.scrollOffset()<this.topEdge&&this.deactivate()},refresh:function(){this.deactivate(),this.checkEdges(),this.toggle()},scrollEvent:function(){function t(){e.refresh()}var e=this;this.scrollTarget.addEventListener("scroll",t,!1)},resizeEvent:function(){function t(){e.refresh()}var e=this;window.addEventListener("resize",t,!1)},scrollHeight:function(){return this.scrollTarget===window?Math.max(document.body.scrollHeight,document.body.offsetHeight,document.documentElement.clientHeight,document.documentElement.scrollHeight,document.documentElement.offsetHeight):this.element.scrollHeight}};var e=document.querySelectorAll('[data-spy="scroll"]');return[].forEach.call(e,function(e){var n={};if(n.target=e.getAttribute("data-target")||null,null!==n.target){var i="object"===n.target?n.target:document.querySelector(n.target),o=i.querySelectorAll("a");[].forEach.call(o,function(i){return i.href&&"#"!==i.getAttribute("href")?new t(e,i,n):void 0})}}),t}),/*!
 * headroom.js v0.7.0 - Give your page some headroom. Hide your header until you need it
 * Copyright (c) 2014 Nick Williams - http://wicky.nillia.ms/headroom.js
 * License: MIT
 */
!function(t,e){"use strict";function n(t){this.callback=t,this.ticking=!1}function i(e){return e&&"undefined"!=typeof t&&(e===t||e.nodeType)}function o(t){if(arguments.length<=0)throw new Error("Missing arguments in extend function");var e,n,s=t||{};for(n=1;n<arguments.length;n++){var r=arguments[n]||{};for(e in r)s[e]="object"!=typeof s[e]||i(s[e])?s[e]||r[e]:o(s[e],r[e])}return s}function s(t){return t===Object(t)?t:{down:t,up:t}}function r(t,e){e=o(e,r.options),this.lastKnownScrollY=0,this.elem=t,this.debouncer=new n(this.update.bind(this)),this.tolerance=s(e.tolerance),this.classes=e.classes,this.offset=e.offset,this.scroller=e.scroller,this.initialised=!1,this.onPin=e.onPin,this.onUnpin=e.onUnpin,this.onTop=e.onTop,this.onNotTop=e.onNotTop}var a={bind:!!function(){}.bind,classList:"classList"in e.documentElement,rAF:!!(t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame)};t.requestAnimationFrame=t.requestAnimationFrame||t.webkitRequestAnimationFrame||t.mozRequestAnimationFrame,n.prototype={constructor:n,update:function(){this.callback&&this.callback(),this.ticking=!1},requestTick:function(){this.ticking||(requestAnimationFrame(this.rafCallback||(this.rafCallback=this.update.bind(this))),this.ticking=!0)},handleEvent:function(){this.requestTick()}},r.prototype={constructor:r,init:function(){return r.cutsTheMustard?(this.elem.classList.add(this.classes.initial),setTimeout(this.attachEvent.bind(this),100),this):void 0},destroy:function(){var t=this.classes;this.initialised=!1,this.elem.classList.remove(t.unpinned,t.pinned,t.top,t.initial),this.scroller.removeEventListener("scroll",this.debouncer,!1)},attachEvent:function(){this.initialised||(this.lastKnownScrollY=this.getScrollY(),this.initialised=!0,this.scroller.addEventListener("scroll",this.debouncer,!1),this.debouncer.handleEvent())},unpin:function(){var t=this.elem.classList,e=this.classes;(t.contains(e.pinned)||!t.contains(e.unpinned))&&(t.add(e.unpinned),t.remove(e.pinned),this.onUnpin&&this.onUnpin.call(this))},pin:function(){var t=this.elem.classList,e=this.classes;t.contains(e.unpinned)&&(t.remove(e.unpinned),t.add(e.pinned),this.onPin&&this.onPin.call(this))},top:function(){var t=this.elem.classList,e=this.classes;t.contains(e.top)||(t.add(e.top),t.remove(e.notTop),this.onTop&&this.onTop.call(this))},notTop:function(){var t=this.elem.classList,e=this.classes;t.contains(e.notTop)||(t.add(e.notTop),t.remove(e.top),this.onNotTop&&this.onNotTop.call(this))},getScrollY:function(){return void 0!==this.scroller.pageYOffset?this.scroller.pageYOffset:void 0!==this.scroller.scrollTop?this.scroller.scrollTop:(e.documentElement||e.body.parentNode||e.body).scrollTop},getViewportHeight:function(){return t.innerHeight||e.documentElement.clientHeight||e.body.clientHeight},getDocumentHeight:function(){var t=e.body,n=e.documentElement;return Math.max(t.scrollHeight,n.scrollHeight,t.offsetHeight,n.offsetHeight,t.clientHeight,n.clientHeight)},getElementHeight:function(t){return Math.max(t.scrollHeight,t.offsetHeight,t.clientHeight)},getScrollerHeight:function(){return this.scroller===t||this.scroller===e.body?this.getDocumentHeight():this.getElementHeight(this.scroller)},isOutOfBounds:function(t){var e=0>t,n=t+this.getViewportHeight()>this.getScrollerHeight();return e||n},toleranceExceeded:function(t,e){return Math.abs(t-this.lastKnownScrollY)>=this.tolerance[e]},shouldUnpin:function(t,e){var n=t>this.lastKnownScrollY,i=t>=this.offset;return n&&i&&e},shouldPin:function(t,e){var n=t<this.lastKnownScrollY,i=t<=this.offset;return n&&e||i},update:function(){var t=this.getScrollY(),e=t>this.lastKnownScrollY?"down":"up",n=this.toleranceExceeded(t,e);this.isOutOfBounds(t)||(t<=this.offset?this.top():this.notTop(),this.shouldUnpin(t,n)?this.unpin():this.shouldPin(t,n)&&this.pin(),this.lastKnownScrollY=t)}},r.options={tolerance:{up:0,down:0},offset:0,scroller:t,classes:{pinned:"headroom--pinned",unpinned:"headroom--unpinned",top:"headroom--top",notTop:"headroom--not-top",initial:"headroom"}},r.cutsTheMustard="undefined"!=typeof a&&a.rAF&&a.bind&&a.classList,t.Headroom=r}(window,document),!function(t,e){"function"==typeof define&&define.amd?define([],e(t)):"object"==typeof exports?module.exports=e(t):t.smoothScroll=e(t)}("undefined"!=typeof global?global:this.window||this.global,function(t){"use strict";var e,n,i,o,s={},r=!!t.document.querySelector&&!!t.addEventListener,a={speed:500,easing:"easeInOutCubic",offset:0,updateURL:!0,callbackBefore:function(){},callbackAfter:function(){}},c=function(t,e,n){if("[object Object]"===Object.prototype.toString.call(t))for(var i in t)Object.prototype.hasOwnProperty.call(t,i)&&e.call(n,t[i],i,t);else for(var o=0,s=t.length;s>o;o++)e.call(n,t[o],o,t)},l=function(t,e){var n={};return c(t,function(e,i){n[i]=t[i]}),c(e,function(t,i){n[i]=e[i]}),n},f=function(e,n){for(var i=n.charAt(0);e&&e!==t.document;e=e.parentNode)if("."===i){if(e.classList.contains(n.substr(1)))return e}else if("#"===i){if(e.id===n.substr(1))return e}else if("["===i&&e.hasAttribute(n.substr(1,n.length-2)))return e;return!1},h=function(t){return Math.max(t.scrollHeight,t.offsetHeight,t.clientHeight)},u=function(t){for(var e,n=String(t),i=n.length,o=-1,s="",r=n.charCodeAt(0);++o<i;){if(e=n.charCodeAt(o),0===e)throw new InvalidCharacterError("Invalid character: the input contains U+0000.");s+=e>=1&&31>=e||127==e||0===o&&e>=48&&57>=e||1===o&&e>=48&&57>=e&&45===r?"\\"+e.toString(16)+" ":e>=128||45===e||95===e||e>=48&&57>=e||e>=65&&90>=e||e>=97&&122>=e?n.charAt(o):"\\"+n.charAt(o)}return s},d=function(t,e){var n;return"easeInQuad"===t&&(n=e*e),"easeOutQuad"===t&&(n=e*(2-e)),"easeInOutQuad"===t&&(n=.5>e?2*e*e:-1+(4-2*e)*e),"easeInCubic"===t&&(n=e*e*e),"easeOutCubic"===t&&(n=--e*e*e+1),"easeInOutCubic"===t&&(n=.5>e?4*e*e*e:(e-1)*(2*e-2)*(2*e-2)+1),"easeInQuart"===t&&(n=e*e*e*e),"easeOutQuart"===t&&(n=1- --e*e*e*e),"easeInOutQuart"===t&&(n=.5>e?8*e*e*e*e:1-8*--e*e*e*e),"easeInQuint"===t&&(n=e*e*e*e*e),"easeOutQuint"===t&&(n=1+--e*e*e*e*e),"easeInOutQuint"===t&&(n=.5>e?16*e*e*e*e*e:1+16*--e*e*e*e*e),n||e},p=function(t,e,n){var i=0;if(t.offsetParent)do i+=t.offsetTop,t=t.offsetParent;while(t);return i=i-e-n,i>=0?i:0},m=function(){return Math.max(t.document.body.scrollHeight,t.document.documentElement.scrollHeight,t.document.body.offsetHeight,t.document.documentElement.offsetHeight,t.document.body.clientHeight,t.document.documentElement.clientHeight)},g=function(t){return t&&"object"==typeof JSON&&"function"==typeof JSON.parse?JSON.parse(t):{}},v=function(e,n){t.history.pushState&&(n||"true"===n)&&t.history.pushState(null,null,[t.location.protocol,"//",t.location.host,t.location.pathname,t.location.search,e].join(""))},b=function(t){return null===t?0:h(t)+t.offsetTop};s.animateScroll=function(e,n,s){var r=l(r||a,s||{}),c=g(e?e.getAttribute("data-options"):null);r=l(r,c),n="#"+u(n.substr(1));var f="#"===n?t.document.documentElement:t.document.querySelector(n),h=t.pageYOffset;i||(i=t.document.querySelector("[data-scroll-header]")),o||(o=b(i));var y,w,E,T=p(f,o,parseInt(r.offset,10)),L=T-h,O=m(),H=0;v(n,r.updateURL);var S=function(i,o,s){var a=t.pageYOffset;(i==o||a==o||t.innerHeight+a>=O)&&(clearInterval(s),f.focus(),r.callbackAfter(e,n))},x=function(){H+=16,w=H/parseInt(r.speed,10),w=w>1?1:w,E=h+L*d(r.easing,w),t.scrollTo(0,Math.floor(E)),S(E,T,y)},B=function(){r.callbackBefore(e,n),y=setInterval(x,16)};0===t.pageYOffset&&t.scrollTo(0,0),B()};var y=function(t){var n=f(t.target,"[data-scroll]");n&&"a"===n.tagName.toLowerCase()&&(t.preventDefault(),s.animateScroll(n,n.hash,e))},w=function(){n||(n=setTimeout(function(){n=null,o=b(i)},66))};return s.destroy=function(){e&&(t.document.removeEventListener("click",y,!1),t.removeEventListener("resize",w,!1),e=null,n=null,i=null,o=null)},s.init=function(n){r&&(s.destroy(),e=l(a,n||{}),i=t.document.querySelector("[data-scroll-header]"),o=b(i),t.document.addEventListener("click",y,!1),i&&t.addEventListener("resize",w,!1))},s}),document.addEventListener("DOMContentLoaded",function(){!function(){var t=document.getElementsByClassName("site-header")[0],e=new Headroom(t,{offset:t.offsetTop});e.init();var n=document.getElementsByClassName("uh-footer")[0],i=new Headroom(n,{offset:t.offsetTop});i.init()}(),function(){function t(t,e){t.classList?t.classList.add(e):t.className+=" "+e}function e(t,e){t.classList?t.classList.remove(e):t.className=t.className.replace(new RegExp("(^|\\b)"+e.split(" ").join("|")+"(\\b|$)","gi")," ")}smoothScroll.init({easing:"easeInOutCubic",offset:40,speed:350,callbackBefore:function(){for(var t=document.querySelectorAll("[data-scroll]"),n=t.length,i=0;n>i;i++)e(t[i],"active")},callbackAfter:function(e){for(var n=document.querySelectorAll("[data-scroll]"),i=n.length,o=0;i>o;o++)t(e,"active")}})}()}),function(t){t("body").scrollspy({target:".site-header"})}(jQuery);