var $url="/cms/contents/contentsLayerTag",data=utils.init({page:utils.getQueryInt("page"),tagNames:null,isAddForm:!1,form:{siteId:utils.getQueryInt("siteId"),channelId:utils.getQueryInt("channelId"),channelContentIds:utils.getQueryString("channelContentIds"),isCancel:!1,tagNames:[]}}),methods={apiGet:function(){var t=this;utils.loading(this,!0),$api.get($url,{params:{siteId:this.form.siteId,channelId:this.form.channelId}}).then(function(n){var i=n.data;t.tagNames=i.value}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},apiSubmit:function(){var t=this;utils.loading(this,!0),$api.post($url,this.form).then(function(n){n.data;parent.$vue.apiList(t.form.channelId,t.page,"内容标签设置成功!"),utils.closeLayer()}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},btnSubmitClick:function(){var t=this;this.$refs.form.validate(function(n){n&&t.apiSubmit()})},btnCancelClick:function(){utils.closeLayer()}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiGet()}});