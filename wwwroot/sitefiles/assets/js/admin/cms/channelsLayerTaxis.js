var $url="/cms/channels/channelsLayerTaxis",data=utils.init({siteId:utils.getQueryInt("siteId"),channelIds:utils.getQueryIntList("channelIds"),form:{isUp:!0,taxis:1}}),methods={apiSubmit:function(){var t=this;utils.loading(this,!0),$api.post($url,{siteId:this.siteId,channelIds:this.channelIds,isUp:this.form.isUp,taxis:this.form.taxis}).then(function(t){var i=t.data;parent.$vue.apiList("栏目排序成功!",i),utils.closeLayer()}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},btnSubmitClick:function(){var t=this;this.$refs.form.validate(function(i){i&&t.apiSubmit()})},btnCancelClick:function(){utils.closeLayer()}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){utils.loading(this,!1)}});