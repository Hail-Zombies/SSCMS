var $url="/settings/sitesTemplatesOnline",data=utils.init({siteAddPermission:!1,page:utils.getQueryInt("page",1),word:utils.getQueryString("word"),tag:utils.getQueryString("tag"),price:utils.getQueryString("price"),order:utils.getQueryString("order"),themes:null,count:null,pages:null,tags:[]}),methods={apiGet:function(){var t=this;$api.get($url).then(function(e){var i=e.data;t.siteAddPermission=i.siteAddPermission,t.cloudApiGet()}).catch(function(e){utils.error(e),utils.loading(t,!1)})},cloudApiGet:function(){var t=this;utils.loading(this,!0),cloud.getThemes(this.page,this.word,this.tag,this.price,this.order).then(function(e){var i=e.data;t.themes=i.themes,t.count=i.count,t.pages=i.pages,t.tags=i.tags}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},getTemplatesUrl:function(){return cloud.host+"/templates/"},getDisplayUrl:function(t){return cloud.getThemesUrl("template.html?userName="+t.userName+"&name="+t.name)},getCoverUrl:function(t){return cloud.hostStorage+"/themes/"+t.userName+"/"+t.name+"/"+_.trim(t.coverUrl,"/")},btnImageClick:function(t){window.open(this.getDisplayUrl(t))},btnPreviewClick:function(t){window.open(cloud.hostDemo+"/"+t.userName+"/"+t.name+"/")},btnCreateClick:function(t){location.href=utils.getSettingsUrl("sitesAdd",{type:"submit",createType:"cloud",cloudThemeUserName:t.userName,cloudThemeName:t.name})},getPageUrl:function(t){return t<1||t>this.pages||t==this.page?"javascript:;":this.getUrl(t,this.word,this.tag,this.price,this.order)},getTagUrl:function(t){return this.getUrl(this.page,this.word,t,this.price,this.order)},getPriceUrl:function(t){return this.getUrl(this.page,this.word,this.tag,t,this.order)},getOrderUrl:function(t){return this.getUrl(this.page,this.word,this.tag,this.price,t)},btnRedirectClick:function(t){location.href=t},handlePageChange:function(t){location.href=this.getPageUrl(t)},getUrl:function(t,e,i,r,n){var s="?type=selectCloud&page="+t;return e&&(s+="&word="+e),i&&(s+="&tag="+i),r&&(s+="&price="+r),n&&(s+="&order="+n),s},priceChanged:function(){this.cloudApiGet()},orderChanged:function(){this.cloudApiGet()},getThemeUrl:function(t){return t?cloud.host+"/templates/template.html?userName="+encodeURIComponent(t.userName)+"&name="+encodeURIComponent(t.name):"javascript:;"},btnBuyClick:function(t){window.open(this.getThemeUrl(t))}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiGet()}});