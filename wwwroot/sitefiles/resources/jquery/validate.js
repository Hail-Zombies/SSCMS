function event_observe(t,e,r){element=document.getElementById(t);var n=function(t){r.call(element,t)};element.addEventListener?element.addEventListener(e,n,!1):element.attachEvent("on"+e,n)}function checkAttributeValueByParam(t,e,r,n,i,u,g,m,a){if($("#"+t).is(":hidden"))return!0;if(e||(e="false"),n||(n=""),i||(i=""),$("#"+t+"_msg").hide(),"true"==e&&(!r||0==r.length))return n.length>0?$("#"+t+"_msg").html(n):$("#"+t+"_msg").html(i+"不能为空"),$("#"+t+"_msg").show(),!1;if(u>0&&r.length<u)return n.length>0?$("#"+t+"_msg").html(n):$("#"+t+"_msg").html("长度不能小于"+u+"个字符"),$("#"+t+"_msg").show(),!1;if(g>0&&r.length>g)return n.length>0?$("#"+t+"_msg").html(n):$("#"+t+"_msg").html("长度不能大于"+g+"个字符"),$("#"+t+"_msg").show(),!1;var l;if(r&&r.length>0&&m&&"None"!=m)if("Custom"==m){if(a.length>0&&0==new RegExp(a,"gi").test(r))return n.length>0?$("#"+t+"_msg").html(n):$("#"+t+"_msg").html(i+"格式不正确"),$("#"+t+"_msg").show(),!1}else if("Chinese"==m?l=/^[\u0391-\uFFE5]+$/:"English"==m?l=/^[A-Za-z]+$/:"Email"==m?l=/^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$/:"Url"==m?l=/^http:\/\/[A-Za-z0-9]+\.[A-Za-z0-9]+[\/=\?%\-&_~`@[\]\':+!]*([^<>\"\"])*$/:"Phone"==m?l=/^((\(\d{3}\))|(\d{3}\-))?(\(0\d{2,3}\)|0\d{2,3}-)?[1-9]\d{6,7}$/:"Mobile"==m?l=/^((\(\d{3}\))|(\d{3}\-))?1\d{10}$/:"Integer"==m?l=/^[-\+]?\d+$/:"Currency"==m?l=/^\d+(\.\d+)?$/:"Zip"==m?l=/^[1-9]\d{5}$/:"IdCard"==m?l=/^\d{15}(\d{2}[A-Za-z0-9])?$/:"QQ"==m&&(l=/^[1-9]\d{4,11}$/),l&&0==l.test(r))return n.length>0?$("#"+t+"_msg").html(n):$("#"+t+"_msg").html(i+"格式不正确"),$("#"+t+"_msg").show(),!1;return!0}function checkAttributeValue(t){var e=t.srcElement||t.target;return checkAttributeValueByParam(e.id,e.getAttribute("isRequire"),e.value,e.getAttribute("errorMessage"),e.getAttribute("displayName"),parseInt(e.getAttribute("minNum")),parseInt(e.getAttribute("maxNum")),e.getAttribute("validateType"),e.getAttribute("regExp"))}function checkAttributeValueById(t){var e=document.getElementById(t);return!e||checkAttributeValueByParam(t,e.getAttribute("isRequire"),e.value,e.getAttribute("errorMessage"),e.getAttribute("displayName"),parseInt(e.getAttribute("minNum")),parseInt(e.getAttribute("maxNum")),e.getAttribute("validateType"),e.getAttribute("regExp"))}function checkFormValueById(t){var e=!0,r=document.getElementById(t).getElementsByTagName("*");if(r&&r.length>0)for(i=0;i<r.length;i++){var n=r.item(i);"true"==n.getAttribute("isValidate")&&0==checkAttributeValueById(n.getAttribute("id"))&&(e=!1)}return e}