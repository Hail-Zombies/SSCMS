var $url="/cms/contents/contentsLayerGroup",data=utils.init({page:utils.getQueryInt("page"),groupNames:null,isAddForm:!1,form:{siteId:utils.getQueryInt("siteId"),channelId:utils.getQueryInt("channelId"),channelContentIds:utils.getQueryString("channelContentIds"),isCancel:!1,groupNames:[]},addForm:{siteId:utils.getQueryInt("siteId"),channelId:utils.getQueryInt("channelId"),channelContentIds:utils.getQueryString("channelContentIds"),groupName:"",description:""}}),methods={apiGet:function(){var t=this;utils.loading(this,!0),$api.get($url,{params:{siteId:this.form.siteId,channelId:this.form.channelId}}).then(function(i){var n=i.data;t.groupNames=n.value,t.groupNames&&0!==t.groupNames.length||(t.isAddForm=!0)}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},apiAdd:function(){var t=this;utils.loading(this,!0),$api.post($url+"/actions/add",this.addForm).then(function(i){i.data;utils.success("内容组设置成功!"),parent.$vue.apiList(t.form.channelId,t.page),utils.closeLayer()}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},apiSubmit:function(){var t=this;utils.loading(this,!0),$api.post($url,this.form).then(function(i){i.data;utils.success("内容组设置成功!"),parent.$vue.apiList(t.form.channelId,t.page),utils.closeLayer()}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},btnSubmitClick:function(){if(this.isAddForm){var t=this;this.$refs.addForm.validate(function(i){i&&t.apiAdd()})}else{if(0===this.form.groupNames.length)return utils.error("请选择内容组！");this.apiSubmit()}},btnCancelClick:function(){this.isAddForm&&this.groupNames&&this.groupNames.length>0?this.isAddForm=!1:utils.closeLayer()}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiGet()}});