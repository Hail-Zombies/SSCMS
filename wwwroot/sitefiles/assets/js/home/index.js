var $url="/index",$sidebarWidth=200,$collapseWidth=60,data=utils.init({homeLogoUrl:null,homeTitle:null,menus:[],user:null,menu:null,defaultOpeneds:[],defaultActive:null,tabName:null,tabs:[],winHeight:0,winWidth:0,isCollapse:!1,isDesktop:!0,isMobileMenu:!1,contextMenuVisible:!1,contextTabName:null,contextLeft:0,contextTop:0}),methods={apiGet:function(){var t=this;$api.get($url).then(function(e){var i=e.data;if(i.user){t.user=i.user,t.homeLogoUrl=i.homeLogoUrl||utils.getAssetsUrl("images/logo.png"),t.homeTitle=i.homeTitle||"用户中心",t.menus=i.menus;var n=[];if(location.hash){var l=location.hash.substr(1).split("/"),s=l[0];t.menu=_.find(t.menus,function(t){return t.id==s});for(var o=1;o<l.length&&l[o];o++)n.push(l[o])}else utils.addTab("欢迎",utils.getPageUrl(null,"dashboard"));!t.menu&&t.menus.length>0&&(t.menu=t.menus[0]),t.menu&&(t.btnTopMenuClick(t.menu),n.length>0&&t.btnSideMenuClick(n.join("/"))),document.title=t.homeTitle,setTimeout(t.ready,100)}else location.href=utils.getRootUrl("login")}).catch(function(t){utils.error(t)})},ready:function(){window.onresize=this.winResize,window.onresize(),utils.loading(this,!1)},openContextMenu:function(t){t.srcElement.id&&_.startsWith(t.srcElement.id,"tab-")&&(this.contextTabName=_.trimStart(t.srcElement.id,"tab-"),this.contextMenuVisible=!0,this.contextLeft=t.clientX,this.contextTop=t.clientY)},closeContextMenu:function(){this.contextMenuVisible=!1},btnContextClick:function(t){var e=this;if("this"===t)this.tabs=this.tabs.filter(function(t){return t.name!==e.contextTabName});else if("others"===t)this.tabs=this.tabs.filter(function(t){return t.name===e.contextTabName}),utils.openTab(e.contextTabName);else if("left"===t){var i=!1;this.tabs=this.tabs.filter(function(t){return t.name===e.contextTabName&&(i=!0),t.name===e.contextTabName||i})}else if("right"===t){i=!1;this.tabs=this.tabs.filter(function(t){return t.name===e.contextTabName&&(i=!0),t.name===e.contextTabName||!i})}else"all"===t&&(this.tabs=[]);this.closeContextMenu()},winResize:function(){this.winHeight=$(window).height(),this.winWidth=$(window).width(),this.isDesktop=this.winWidth>992},getIndex:function(t,e,i){return i?t.id+"/"+e.id+"/"+i.id:e?t.id+"/"+e.id:t?t.id:""},btnTopMenuClick:function(t){if(t.children&&t.children.length>0)for(var e=0;e<t.children.length;e++){var i=t.children[e];if(i.children){this.defaultOpeneds=[i.id];break}}else this.btnMenuClick(t);this.menu=t},btnSideMenuClick:function(t){for(var e=t.split("/"),i=this.menu.children,n=null,l=[],s=0;s<e.length;s++)i=(n=_.find(i,function(t){return t.id==e[s]})).children,l.push(n.id);this.defaultOpeneds=l,n&&this.btnMenuClick(n),location.hash=this.menu.id+"/"+t},btnMenuClick:function(t){this.defaultActive=this.defaultOpeneds.join("/"),this.isMobileMenu=!1,"_layer"==t.target?utils.openLayer({title:t.text,url:t.link,full:!0}):"_self"==t.target?location.href=t.link:"_parent"==t.target?parent.location.href=t.link:"_top"==t.target?top.location.href=t.link:"_blank"==t.target?window.open(t.link):utils.addTab(t.text,t.link)},btnMobileMenuClick:function(){this.isCollapse=!1,this.isMobileMenu=!this.isMobileMenu},btnUserMenuClick:function(t){"profile"===t?utils.addTab("修改资料",utils.getPageUrl(null,"profile")):"password"===t?utils.addTab("更改密码",utils.getPageUrl(null,"password")):"logout"===t&&(location.href=utils.getRootUrl("logout"))}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiGet()},computed:{leftWidth:function(){return this.isDesktop?this.isCollapse?$collapseWidth:$sidebarWidth:this.isMobileMenu?this.winWidth:0}}});