$.request=function(){var n={};function r(r){var e={};return n[r]?n[r]:(e.queryString=function(){for(var n,e={},t=function(n){return decodeURIComponent(n.replace(/\+/g," "))},u=r.substring(r.indexOf("?")+1),i=/([^&=]+)=?([^&]*)/g;n=i.exec(u);)e[t(n[1])]=t(n[2]);return e}(),e.getUrl=function(){var n=r.substring(0,r.indexOf("?")+1);for(var t in e.queryString)n+=t+"="+e.queryString[t]+"&";return n.lastIndexOf("&")==n.length-1?n.substring(0,n.lastIndexOf("&")):n},n[r]=e,e)}return $.extend(r,r(window.location.href)),r}();