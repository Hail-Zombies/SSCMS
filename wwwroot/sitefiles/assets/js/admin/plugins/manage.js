var $url="/plugins/manage",$urlActionsDisable=$url+"/actions/disable",$urlActionsDelete=$url+"/actions/delete",$urlActionsRestart=$url+"/actions/restart",data=utils.init({pageType:utils.getQueryString("pageType"),cmsVersion:null,allPlugins:null,containerized:null,plugins:null,enabledPlugins:[],disabledPlugins:[],errorPlugins:[],updatePlugins:[],updatePluginIds:[]}),methods={getIconUrl:function(t){return cloud.getPluginIconUrl(t)},apiGet:function(){var t=this;utils.loading(this,!0),$api.get($url).then(function(i){var e=i.data;t.cmsVersion=e.cmsVersion,t.allPlugins=e.allPlugins,t.containerized=e.containerized;var n=i.headers.server;if(t.containerized||n&&"Kestrel"!==n){for(var l=0;l<t.allPlugins.length;l++){var a=t.allPlugins[l];a.disabled?t.disabledPlugins.push(a):a.success?t.enabledPlugins.push(a):t.errorPlugins.push(a)}var s=t.enabledPlugins.map(function(t){return t.pluginId});cloud.getUpdates(t.cmsVersion,s).then(function(i){for(var e=i.data.releases,n=0;n<e.length;n++){var l=e[n],a=$.grep(t.enabledPlugins,function(t){return t.pluginId==l.userName+"."+l.name});if(1==a.length){var s=a[0];s.updatePlugin=l,s&&s.version?-1==cloud.compareVersion(s.version,l.version)&&(t.updatePlugins.push(s),t.updatePluginIds.push(s.pluginId)):(t.updatePlugins.push(s),t.updatePluginIds.push(s.pluginId))}}})}else{var u=cloud.getDocsUrl("getting-started/deploy.html");utils.error('页面加载失败，SSCMS 插件需要在进程管理器（Nginx、Apache、IIS、Windows 服务）中运行，请参考文档 <a href="'+u+'" target="_blank">托管和部署</a>',{redirect:!0})}}).catch(function(t){utils.error(t)}).then(function(){t.btnNavSelect(t.pageType||"enabled"),utils.loading(t,!1)})},apiRestart:function(t){utils.loading(this,!0),$api.post($urlActionsRestart).then(function(i){setTimeout(function(){t?t():utils.alertSuccess({title:"插件重新加载成功",text:"插件重新加载成功，系统需要重载页面",callback:function(){window.top.location.reload(!0)}})},3e4)}).catch(function(t){utils.error(t)})},apiDisable:function(t){var i=this;utils.loading(this,!0),$api.post($urlActionsDisable,{pluginId:t.pluginId,disabled:!t.disabled}).then(function(e){e.data;i.plugins.splice(i.plugins.indexOf(t),1);var n=t.disabled?"启用":"禁用";i.apiRestart(function(){utils.alertSuccess({title:"插件"+n+"成功",text:"插件"+n+"成功，系统需要重载页面",callback:function(){window.top.location.reload(!0)}})})}).catch(function(t){utils.error(t)}).then(function(){utils.loading(i,!1)})},apiDelete:function(t){var i=this;utils.loading(i,!0),$api.post($urlActionsDisable,{pluginId:t.pluginId,disabled:!0}).then(function(e){e.data;i.apiRestart(function(){$api.post($urlActionsDelete,{pluginId:t.pluginId}).then(function(t){i.apiRestart(function(){utils.alertSuccess({title:"插件卸载成功",text:"插件卸载成功，系统需要重载页面",callback:function(){window.top.location.reload(!0)}})})}).catch(function(t){utils.error(t)}).then(function(){utils.loading(i,!1)})})}).catch(function(t){utils.error(t)})},btnMenuClick:function(t){var i=t.split(":"),e=this.plugins.find(function(t){return t.pluginId===i[0]});if(e){var n=i[1],l=this;return"config"===n?utils.addTab("插件配置："+e.pluginId,utils.getPluginsUrl("config",{pluginId:e.pluginId})):"enable"===n?utils.alertDelete({title:"启用插件",text:"此操作将会启用“"+e.displayName+"”，确认吗？",button:"确认启用",callback:function(){l.apiDisable(e)}}):"disable"===n?utils.alertDelete({title:"禁用插件",text:"此操作将会禁用“"+e.displayName+"”，确认吗？",button:"确认禁用",callback:function(){l.apiDisable(e)}}):"uninstall"===n&&utils.alertDelete({title:"卸载插件",text:"此操作将会卸载插件“"+e.displayName+"”，确认吗？",button:"确认卸载",callback:function(){l.apiDelete(e)}}),!1}},btnNavSelect:function(t){this.pageType=t,"enabled"==this.pageType?this.plugins=this.enabledPlugins:"disabled"==this.pageType?this.plugins=this.disabledPlugins:"error"==this.pageType?this.plugins=this.errorPlugins:"update"==this.pageType&&(this.plugins=this.updatePlugins)},getPageTitle:function(){return"enabled"==this.pageType?"已启用":"disabled"==this.pageType?"已禁用":"error"==this.pageType?"运行错误":"update"==this.pageType?"发现新版本":""},btnRestartClick:function(){this.apiRestart()},btnViewClick:function(t,i,e){utils.addTab(t,utils.getPluginsUrl("view",{userName:i,name:e}))},btnUploadClick:function(){utils.openLayer({title:"离线升级插件",url:utils.getPluginsUrl("addLayerUpload"),width:550,height:350})},btnUpdateAllClick:function(){location.href=utils.getPluginsUrl("install",{isUpdate:!0,pluginIds:this.updatablePluginIds.join(",")})}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiGet()},computed:{updatablePluginIds:function(){for(var t=[],i=0;i<this.updatePlugins.length;i++){var e=this.updatePlugins[i];0===e.price&&t.push(e.pluginId)}return t}}});