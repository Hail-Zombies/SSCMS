var $url="/syncDatabase",$urlVerify="/syncDatabase/actions/verify",data=utils.init({pageType:"prepare",databaseVersion:null,version:null}),methods={apiGet:function(){var t=this;utils.loading(this,!0),$api.get($url).then(function(i){var e=i.data;t.databaseVersion=e.databaseVersion,t.version=e.version}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},apiVerify:function(t){var i=this;$api.post($urlVerify,{securityKey:t}).then(function(t){i.apiSubmit()}).catch(function(t){utils.error(t)})},apiSubmit:function(){var t=this;this.pageType="update",$api.post($url).then(function(i){t.pageType="done"}).catch(function(t){utils.error(t)})},getDocsUrl:function(){return cloud.getDocsUrl("")},btnStartClick:function(t){var i=this;t.preventDefault(),this.databaseVersion===this.version?this.$prompt("请进入系统根目录，打开 sscms.json 获取 SecurityKey的值","SecurityKey验证",{confirmButtonText:"确定",cancelButtonText:"取消"}).then(function(t){i.apiVerify(t.value)}):this.apiSubmit()}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiGet()}});