var $url="/cms/create/createStatus",data=utils.init({siteId:utils.getQueryInt("siteId"),pageType:null,tasks:null,channelsCount:null,contentsCount:null,filesCount:null,specialsCount:null,timeoutId:null}),methods={load:function(){var t=this;utils.loading(this,!0),$api.get($url,{params:{siteId:t.siteId}}).then(function(e){var n=e.data;t.tasks=n.value.tasks,t.channelsCount=n.value.channelsCount,t.contentsCount=n.value.contentsCount,t.filesCount=n.value.filesCount,t.specialsCount=n.value.specialsCount}).catch(function(t){utils.error(t)}).then(function(){t.timeoutId=setTimeout(function(){t.load()},5e3),utils.loading(t,!1)})},btnRedirectClick:function(t){var e={siteId:t.siteId};t.channelId&&(e.channelId=t.channelId),t.contentId&&(e.contentId=t.contentId),t.fileTemplateId&&(e.fileTemplateId=t.fileTemplateId),t.specialId&&(e.specialId=t.specialId),window.open(utils.getRootUrl("redirect",e))},btnCancelClick:function(){clearTimeout(this.timeoutId);var t=this;utils.loading(this,!0),$api.post($url+"/actions/cancel",{siteId:this.siteId}).then(function(e){e.data;t.load()}).catch(function(t){utils.error(t)})}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.load()}});