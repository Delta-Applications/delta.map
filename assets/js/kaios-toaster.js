!function(t,o){"object"==typeof exports&&"undefined"!=typeof module?module.exports=o():"function"==typeof define&&define.amd?define(o):t.kaiosToaster=o()}(this,(function(){"use strict";
/*!
    * nano-assign v1.0.0
    * (c) 2017-present egoist <0x142857@gmail.com>
    * Released under the MIT License.
    */var t=function(t){for(var o=arguments,s=1;s<arguments.length;s++)for(var e in arguments[s])t[e]=o[s][e];return t},o=null,s=function(t){var s=this;void 0===t&&(t={});var e=t.message;void 0===e&&(e="");var i=t.position;void 0!==i&&-1!==["north","south"].indexOf(i)||(i="south");var n=t.timeout;void 0===n&&(n=3e3);var a=t.el;void 0===a&&(a=document.body);var r=t.rounded;void 0===r&&(r=!1);var d=t.type;void 0===d&&(d="");var u=t.debug;void 0===u&&(u=!1);var h=t.elements;void 0===h&&(h=[]),o&&o.destroy(),this.message=e,this.position=i,this.el=a,this.timeout=n,this.toast=document.createElement("div"),this.toast.className="kaios-toast kaios-toast-"+this.position,d&&(this.toast.className+=" kaios-toast-"+d);var c=document.createElement("div");c.className="kaios-toast-content",c.innerHTML=this.message,[c].concat(h).forEach((function(t){s.toast.appendChild(t)})),r&&(this.toast.style.borderRadius="33px"),this.el.appendChild(this.toast),o=this,this.show(),!u&&n&&this.hide()};function e(t){return new s(t)}s.prototype.show=function(){var t=this;setTimeout((function(){t.toast.classList.add("kaios-toast-shown")}),300)},s.prototype.hide=function(){var t=this;setTimeout((function(){t.destroy()}),this.timeout)},s.prototype.destroy=function(){var t=this;this.toast&&(this.toast.classList.remove("kaios-toast-shown"),setTimeout((function(){t.toast&&(t.el.removeChild(t.toast),t.toast=null)}),300))};for(var i of["success","warning","error","info"])e[i]=function(o){return e(t({type:i},o))};return e}));
