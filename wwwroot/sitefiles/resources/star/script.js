function stlStarDraw(t,e,r,n,o){for(var i=1;i<=e;i++)document.getElementById("stl_star_item_"+r+"_"+i).src=i<=t?o+"/"+n+"_on.gif":o+"/"+n+"_off.gif"}function stlStarInit(t,e){for(var r=1;r<=t;r++)document.getElementById("stl_star_item_"+e+"_"+r).src=document.getElementById("stl_star_item_"+e+"_"+r).getAttribute("oriSrc")}function stlStarCheck(t,e,r,n){var o="stlStar_"+t+"_"+e+"_"+r;if(-1!=document.cookie.indexOf(o+"="))return alert(decodeURIComponent(n)),!1;var i=o+"=true",c=new Date;return c.setTime(c.getTime()+864e5),i+="; expires="+c.toGMTString(),document.cookie=i,!0}function stlSuccessAlert(t){alert(t)}