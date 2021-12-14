var $url="/plugins/view",$urlActionsDisable=$url+"/actions/disable",$urlActionsDelete=$url+"/actions/delete",$urlActionsRestart=$url+"/actions/restart",data=utils.init({userName:utils.getQueryString("userName"),name:utils.getQueryString("name"),pluginId:utils.getQueryString("pluginId"),activeName:"overview",cmsVersion:null,plugin:null,content:null,changeLog:null,isShouldUpdate:!1,extension:null,release:null}),methods={apiGet:function(){var t=this;$api.get($url,{params:{userName:this.userName,name:this.name,pluginId:this.pluginId}}).then(function(n){var i=n.data;t.cmsVersion=i.cmsVersion,t.plugin=i.plugin,t.content=i.content,t.changeLog=i.changeLog;var e=t.userName,s=t.name;t.plugin&&(e=t.plugin.publisher,s=t.plugin.name),cloud.getExtension(t.cmsVersion,e,s).then(function(n){var i=n.data;t.extension=i.extension,t.release=i.release,t.plugin&&(t.isShouldUpdate=-1==cloud.compareVersion(t.plugin.version,t.release.version))}).catch(function(t){console.log(t)}).then(function(){utils.loading(t,!1)})}).catch(function(t){utils.error(t)})},apiDisable:function(t){var n=this;utils.loading(this,!0),$api.post($urlActionsDisable,{pluginId:t.pluginId,disabled:!t.disabled}).then(function(i){i.data;var e=t.disabled?"启用":"禁用";n.apiRestart(function(){utils.alertSuccess({title:"插件"+e+"成功",text:"插件"+e+"成功，系统需要重新加载",callback:function(){window.top.location.reload(!0)}})})}).catch(function(t){utils.error(t)}).then(function(){utils.loading(n,!1)})},apiDelete:function(t){var n=this;utils.loading(n,!0),$api.post($urlActionsDisable,{pluginId:t.pluginId,disabled:!0}).then(function(i){i.data;n.apiRestart(function(){$api.post($urlActionsDelete,{pluginId:t.pluginId}).then(function(t){n.apiRestart(function(){utils.alertSuccess({title:"插件卸载成功",text:"插件卸载成功，系统需要重载页面",callback:function(){window.top.location.reload(!0)}})})}).catch(function(t){utils.error(t)}).then(function(){utils.loading(n,!1)})})}).catch(function(t){utils.error(t)})},apiRestart:function(t){$api.post($urlActionsRestart).then(function(n){setTimeout(function(){t()},3e4)}).catch(function(t){utils.error(t)})},btnDisablePlugin:function(t){var n=this,i=t.disabled?"启用":"禁用";utils.alertDelete({title:i+"插件",text:"此操作将会"+i+"“"+t.displayName+"”，确认吗？",button:t.disabled?"确认启用":"确认禁用",callback:function(){n.apiDisable(t)}})},btnDeletePlugin:function(t){var n=this;utils.alertDelete({title:"卸载插件",text:"此操作将会卸载插件“"+t.displayName+"”，确认吗？",button:"确认卸载",callback:function(){n.apiDelete(t)}})},btnUploadClick:function(){utils.openLayer({title:"离线升级插件",url:utils.getPluginsUrl("addLayerUpload"),width:550,height:350})},getPluginUrl:function(){return this.extension?cloud.host+"/plugins/plugin.html?userName="+encodeURIComponent(this.extension.userName)+"&name="+encodeURIComponent(this.extension.name):"javascript:;"},getIconUrl:function(){return this.plugin?this.plugin.iconUrl||utils.getAssetsUrl("images/favicon.png"):this.extension?cloud.hostStorage+"/"+_.trim(this.extension.iconUrl,"/"):utils.getAssetsUrl("images/favicon.png")},getTitle:function(){return this.plugin?this.plugin.displayName:this.extension?this.extension.displayName:null},getPluginId:function(){return this.plugin?this.plugin.publisher+"."+this.plugin.name:this.extension&&this.release?this.extension.userName+"."+this.extension.name:null},getVersion:function(){return this.plugin?this.plugin.version:this.release?this.release.version:null},getDescription:function(){return this.plugin?this.plugin.description:this.extension?this.extension.description:null},getReadme:function(){return this.plugin?this.content:this.extension?this.extension.content:null},getChangeLog:function(){return this.plugin?this.changeLog:this.extension?this.extension.changeLog:null},getTagNames:function(t){var n=[];return t.tags&&(n=t.tags.split(",")),n},btnUpdateClick:function(){location.href=utils.getPluginsUrl("install",{isUpdate:!0,pluginIds:this.plugin.pluginId})},btnBuyClick:function(){window.open(this.getPluginUrl())},btnInstallClick:function(){location.href=utils.getPluginsUrl("install",{pluginIds:this.extension.userName+"."+this.extension.name})}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiGet()}});