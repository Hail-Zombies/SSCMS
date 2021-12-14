var utils={init:function(e){return _.assign({pageLoad:!1,loading:null},e)},getQueryString:function(e,t){var n=location.search.match(new RegExp("[?&]"+e+"=([^&]+)","i"));return!n||n.length<1?t||"":decodeURIComponent(n[1])},getQueryStringList:function(e){var t=utils.getQueryString(e);return t?t.split(","):[]},getQueryBoolean:function(e){var t=location.search.match(new RegExp("[?&]"+e+"=([^&]+)","i"));return!(!t||t.length<1)&&("true"===t[1]||"True"===t[1])},getQueryInt:function(e,t){var n=location.search.match(new RegExp("[?&]"+e+"=([^&]+)","i"));return!n||n.length<1?t||0:utils.toInt(n[1])},getQueryIntList:function(e){var t=location.search.match(new RegExp("[?&]"+e+"=([^&]+)","i"));return!t||t.length<1?[]:_.map(t[1].split(","),function(e){return utils.toInt(e)})},loadEditors:function(e,t){setTimeout(function(){for(var n=0;n<e.length;n++){var s=e[n];if("TextEditor"===s.inputType){UE.delEditor(s.attributeName);var a=utils.getEditor(s.attributeName);a.attributeName=s.attributeName,a.ready(function(){this.addListener("contentChange",function(){t[this.attributeName]=this.getContent()})})}}},100)},getEditor:function(e){return UE.getEditor(e,{allowDivTransToP:!1,maximumWords:99999999,initialFrameWidth:null,autoHeightEnabled:!1,autoFloatEnabled:!1,zIndex:2001})},toCamelCase:function(e){if(!e||e[0]!==e[0].toUpperCase())return e;for(var t=e.split(""),n=e.split(""),s=0;s<t.length;s++){if(1==s&&t[s]!==t[s].toUpperCase())return n.join("");var a=s+1<t.length;if(s>0&&a&&t[s+1]!==t[s+1].toUpperCase())return n.join("");if(utils.isNumeric(t[s]))return n.join("");n[s]=_.toLower(t[s])}return n.join("")},toInt:function(e){return e?"number"==typeof e?e:parseInt(e,10)||0:0},toArray:function(e){return(e||"").split(",")},formatDate:function(e){var t=new Date(e),n=""+(t.getMonth()+1),s=""+t.getDate(),a=t.getFullYear();return n.length<2&&(n="0"+n),s.length<2&&(s="0"+s),[a,n,s].join("-")},isNumeric:function(e){return/^\d+$/.test(e)},getQueryIntList:function(e){var t=utils.getQueryString(e);return t?_.map(t.split(","),function(e){return parseInt(e,10)}):[]},getIndexUrl:function(e){var t=$rootUrl+"/";return e&&(t+="?",_.forOwn(e,function(e,n){t+=n+"="+encodeURIComponent(e)+"&"}),t=t.substr(0,t.length-1)),t},getRootUrl:function(e,t){return utils.getPageUrl(null,e,t)},getAssetsUrl:function(e){return"/sitefiles/assets/"+e},getCmsUrl:function(e,t){return utils.getPageUrl("cms",e,t)},getWxUrl:function(e,t){return utils.getPageUrl("wx",e,t)},getPluginsUrl:function(e,t){return utils.getPageUrl("plugins",e,t)},getSettingsUrl:function(e,t){return utils.getPageUrl("settings",e,t)},getCommonUrl:function(e,t){return utils.getPageUrl("common",e,t)},getPageUrl:function(e,t,n){var s=$rootUrl+"/";return s+=e?e+"/"+t+"/":t+"/",n&&(s+="?",_.forOwn(n,function(e,t){s+=t+"="+encodeURIComponent(e)+"&"}),s=s.substr(0,s.length-1)),s},getCountName:function(e){return utils.toCamelCase(e+"Count")},getExtendName:function(e,t){return utils.toCamelCase(t?e+t:e)},pad:function(e){for(var t=e+"";t.length<2;)t="0"+t;return t},getUrl:function(e,t){return t&&(t.startsWith("/")||-1!=t.indexOf("://"))?t:(e=_.trimEnd(e,"/"))+"/"+_.trimStart(_.trimStart(_.trimStart(t,"~"),"@"),"/")},getFriendlyDate:function(e){"[object Date]"!==Object.prototype.toString.call(e)&&(e=new Date(e));var t=Math.round((new Date-e)/1e3);return t<86400?utils.pad(e.getHours())+":"+utils.pad(e.getMinutes()):t<172800?"昨天 "+utils.pad(e.getHours())+":"+utils.pad(e.getMinutes()):utils.pad(e.getMonth()+1)+"月"+utils.pad(e.getDate())+"日"},getRootVue:function(){return top.$vue||window.$vue},getTabVue:function(e){var t=utils.getRootVue().tabs.find(function(t){return t.name==e});return t?top.document.getElementById("frm-"+t.name).contentWindow.$vue:null},getTabName:function(){return utils.getRootVue().tabName},openTab:function(e){var t=utils.getRootVue();-1!==t.tabs.findIndex(function(t){return t.name==e})&&(t.tabName=e)},addTab:function(e,t){var n=utils.getRootVue(),s=n.tabs.findIndex(function(e){return e.url==t}),a=null;-1===s?(a={title:e,name:utils.uuid(),url:t},n.tabs.push(a)):(a=n.tabs[s],top.document.getElementById("frm-"+a.name).contentWindow.location.href=t);n.tabName=a.name},removeTab:function(e){var t=utils.getRootVue();e||(e=t.tabName),t.tabName===e&&(t.activeChildMenu=null,t.tabs.forEach(function(n,s){if(n.name===e){var a=t.tabs[s+1]||t.tabs[s-1];a&&(t.tabName=a.name)}})),t.tabs=t.tabs.filter(function(t){return t.name!==e})},addQuery:function(e,t){return e?(e+=-1===e.indexOf("?")?"?":"&",_.forOwn(t,function(t,n){e+=n+"="+encodeURIComponent(t)+"&"}),e.substr(0,e.length-1)):""},alertDelete:function(e){return!!e&&(alert({title:e.title,text:e.text,type:"warning",confirmButtonText:e.button||"删 除",confirmButtonClass:"el-button el-button--danger",cancelButtonClass:"el-button el-button--default",showCancelButton:!0,cancelButtonText:"取 消"}).then(function(t){t.value&&e.callback()}),!1)},alertSuccess:function(e){return!!e&&(alert({title:e.title,text:e.text,type:"success",confirmButtonText:e.button||"确 定",confirmButtonClass:"el-button el-button--primary",showCancelButton:!1}).then(function(t){t.value&&e.callback()}),!1)},alertWarning:function(e){return!!e&&(alert({title:e.title,text:e.text,type:"question",confirmButtonText:e.button||"确 认",confirmButtonClass:"el-button el-button--primary",cancelButtonClass:"el-button el-button--default",showCancelButton:!0,cancelButtonText:"取 消"}).then(function(t){t.value&&e.callback()}),!1)},getErrorMessage:function(e){if(e.response&&500===e.response.status)return JSON.stringify(e.response.data);var t=e.message;return e.response&&e.response.data&&(e.response.data.exceptionMessage?t=e.response.data.exceptionMessage:e.response.data.message&&(t=e.response.data.message)),t},uuid:function(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(e){var t=16*Math.random()|0;return("x"==e?t:3&t|8).toString(16)})},notifySuccess:function(e,t){utils.getRootVue().$notify.success({title:"成功",message:e,position:t||"top-right"})},notifyWarning:function(e,t){utils.getRootVue().$notify.warning({title:"警告",message:e,position:t||"top-right"})},notifyInfo:function(e,t){utils.getRootVue().$notify.info({title:"提示",message:e,position:t||"top-right"})},notifyError:function(e,t){if(e){var n="";n=e.response?utils.getErrorMessage(e):"string"==typeof e?e:e+"",utils.getRootVue().$notify.error({title:"错误",message:n,position:t||"top-right"})}},success:function(e){utils.getRootVue().$message({type:"success",message:e,showIcon:!0})},error:function(e,t){if(e)if("string"==typeof e)if(t&&t.redirect){var n=utils.uuid();sessionStorage.setItem(n,JSON.stringify({message:e})),top.location.href=utils.getRootUrl("error",{uuid:n})}else utils.getRootVue().$message({type:"error",message:e,showIcon:!0});else if(e.response){var s=utils.getErrorMessage(e);if(!e.response||401!==e.response.status&&403!==e.response.status){if(e.response&&500===e.response.status||t&&t.redirect){n=utils.uuid();return"string"==typeof s?sessionStorage.setItem(n,JSON.stringify({message:s})):sessionStorage.setItem(n,s),t&&t.redirect?void(top.location.href=utils.getRootUrl("error",{uuid:n})):void top.utils.openLayer({url:utils.getRootUrl("error",{uuid:n})})}if(e.response&&400===e.response.status&&t&&t.redirect){n=utils.uuid();sessionStorage.setItem(n,JSON.stringify({message:e})),top.location.href=utils.getRootUrl("error",{uuid:n})}}else{var a=_.trimEnd(window.location.href,"/");_.endsWith(a,"/ss-admin")||_.endsWith(a,"/home")?top.location.href=utils.getRootUrl("login"):top.location.href=utils.getRootUrl("login",{status:401})}utils.getRootVue().$message({type:"error",message:s,showIcon:!0})}else"object"==typeof e&&utils.getRootVue().$message({type:"error",message:e+"",showIcon:!0})},loading:function(e,t){t?e.pageLoad&&(e.loading=e.$loading({text:"页面加载中"})):e.loading?e.loading.close():e.pageLoad=!0},scrollTop:function(){document.documentElement.scrollTop=document.body.scrollTop=0},closeLayer:function(e){return e?parent.location.reload():parent.layer.closeAll(),!1},openLayer:function(e){if(!e||!e.url)return!1;if(e.width){var t=e.width+"";-1==t.indexOf("%")&&-1==t.indexOf("px")&&(e.width=t+"px")}else e.width=$(window).width()-50+"px";if(e.height){var n=e.height+"";-1==n.indexOf("%")&&-1==n.indexOf("px")&&(e.height=n+"px")}else e.height=$(window).height()-50+"px";var s=layer.open({type:2,btn:null,title:e.title,area:[e.width,e.height],maxmin:!e.max,resize:!e.max,shadeClose:!0,content:e.url,success:e.success});return e.max&&layer.full(s),!1},contains:function(e,t){return e&&t&&-1!==e.indexOf(t)},validateMobile:function(e,t,n){t?/^1[3|4|5|7|8][0-9]\d{8}$/.test(t)?n():n(new Error(e.message||"字段必须是有效的手机号码")):n()},validateMax:function(e,t,n){t&&t.length>parseInt(e.value)?n(new Error(e.message||"字段不能超过指定的长度")):n()},validateMin:function(e,t,n){t&&t.length<parseInt(e.value)?n(new Error(e.message||"字段不能低于指定的长度")):n()},validateIdCard:function(e,t,n){t&&/(^\d{15}$)|(^\d{17}(\d|X|x)$)/.test(t)?n():n(new Error(e.message||"字段必须是身份证号码"))},validateChinese:function(e,t,n){if(t){for(var s=!0,a=0;a<t.length;a++)-1!==escape(t[a]).indexOf("%u")||(s=!1);s?n():n(new Error(e.message||"字段必须是中文"))}else n(new Error(e.message||"字段必须是中文"))},validateInt:function(e,t,n){t?/^[-]?\d+$/.test(t)?n():n(new Error(e.message||"字段必须是有效的数字值")):n()},getForm:function(e,t){for(var n=_.assign({},t),s=0;s<e.length;s++){var a=e[s],i=utils.toCamelCase(a.attributeName);"TextEditor"===a.inputType?setTimeout(function(){var e=utils.getEditor(a.attributeName);e.attributeName=a.attributeName,e.ready(function(){this.addListener("contentChange",function(){$this.form[this.attributeName]=this.getContent()})})},100):"CheckBox"!==a.inputType&&"SelectMultiple"!==a.inputType||n[i]&&Array.isArray(n[i])||(n[i]=[])}return n},getRules:function(e){var t=[{required:"字段为必填项"},{email:"字段必须是有效的电子邮件"},{mobile:"字段必须是有效的手机号码"},{url:"字段必须是有效的url"},{alpha:"字段只能包含英文字母"},{alphaDash:"字段只能包含英文字母、数字、破折号或下划线"},{alphaNum:"字段只能包含英文字母或数字"},{alphaSpaces:"字段只能包含英文字母或空格"},{creditCard:"字段必须是有效的信用卡"},{between:"字段必须有一个以最小值和最大值为界的数值"},{decimal:"字段必须是数字，并且可能包含指定数量的小数点"},{digits:"字段必须是整数，并且具有指定的位数"},{included:"字段必须具有指定列表中的值"},{excluded:"字段不能具有指定列表中的值"},{max:"字段不能超过指定的长度"},{maxValue:"字段必须是数值，并且不能大于指定的值"},{min:"字段不能低于指定的长度"},{minValue:"字段必须是数值，并且不能小于指定的值"},{regex:"字段必须匹配指定的正则表达式"},{chinese:"字段必须是中文"},{currency:"字段必须是货币格式"},{zip:"字段必须是邮政编码"},{idCard:"字段必须是身份证号码"}];if(e){for(var n=[],s=0;s<e.length;s++){var a=e[s],i=utils.toCamelCase(a.type);if("required"===i)n.push({required:!0,message:a.message||t.required});else if("email"===i)n.push({type:"email",message:a.message||t.email});else if("mobile"===i)n.push({validator:utils.validateMobile,message:a.message||t.mobile});else if("url"===i)n.push({type:"url",message:a.message||t.url});else if("alpha"===i)n.push({type:"alpha",message:a.message||t.alpha});else if("alphaDash"===i)n.push({type:"alphaDash",message:a.message||t.alphaDash});else if("alphaNum"===i)n.push({type:"alphaNum",message:a.message||t.alphaNum});else if("alphaSpaces"===i)n.push({type:"alphaSpaces",message:a.message||t.alphaSpaces});else if("creditCard"===i)n.push({type:"creditCard",message:a.message||t.creditCard});else if("between"===i)n.push({type:"between",message:a.message||t.between});else if("decimal"===i)n.push({type:"decimal",message:a.message||t.decimal});else if("digits"===i)n.push({type:"digits",message:a.message||t.digits});else if("included"===i)n.push({type:"included",message:a.message||t.included});else if("excluded"===i)n.push({type:"excluded",message:a.message||t.excluded});else if("max"===i)n.push({validator:utils.validateMax,message:a.message||t.mobile,value:a.value});else if("maxValue"===i)n.push({type:"maxValue",message:a.message||t.maxValue});else if("min"===i)n.push({validator:utils.validateMin,message:a.message||t.mobile,value:a.value});else if("minValue"===i)n.push({type:"minValue",message:a.message||t.minValue});else if("regex"===i&&a.value){var r=new RegExp(a.value,"ig"),o=a.message||t.regex;n.push({validator:function(e,t,n){t?r.test(t)?n():n(new Error(o)):n()},message:o})}else"chinese"===i?n.push({validator:utils.validateChinese,message:a.message||t.chinese}):"currency"===i?n.push({type:"currency",message:a.message||t.currency}):"zip"===i?n.push({type:"zip",message:a.message||t.zip}):"idCard"===i&&n.push({validator:utils.validateIdCard,message:a.message||t.idCard})}return n}return null}};if(Object.defineProperty(Object.prototype,"getEntityValue",{value:function(e){var t;for(t in this)if(t.toLowerCase()==e.toLowerCase())return this[t]}}),window.swal&&swal.mixin)var alert=swal.mixin({confirmButtonClass:"el-button el-button--primary",cancelButtonClass:"el-button el-button--default",buttonsStyling:!1});var PER_PAGE=30,DEFAULT_AVATAR_URL="/sitefiles/assets/images/default_avatar.png",$token=sessionStorage.getItem(ACCESS_TOKEN_NAME)||localStorage.getItem(ACCESS_TOKEN_NAME)||utils.getQueryString("accessToken"),$api=axios.create({baseURL:$apiUrl,headers:{Authorization:"Bearer "+$token}});$api.csrfPost=function(e,t,n){return $api.post(t,n,{headers:{"X-CSRF-TOKEN":e}})};