var $url="/cms/contents/contentsLayerAttributes",data=utils.init({page:utils.getQueryInt("page"),form:{siteId:utils.getQueryInt("siteId"),channelId:utils.getQueryInt("channelId"),channelContentIds:utils.getQueryString("channelContentIds"),isCancel:!1,isTop:!1,isRecommend:!1,isHot:!1,isColor:!1}}),methods={apiSubmit:function(){var t=this;utils.loading(this,!0),$api.post($url,this.form).then(function(i){i.data;utils.success("内容属性设置成功!"),parent.$vue.apiList(t.form.channelId,t.page),utils.closeLayer()}).catch(function(t){utils.error(t)}).then(function(){utils.loading(t,!1)})},btnSubmitClick:function(){if(!(this.form.isTop||this.form.isRecommend||this.form.isHot||this.form.isColor))return utils.error("请选择内容属性！");this.apiSubmit()},btnCancelClick:function(){utils.closeLayer()}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){utils.loading(this,!1)}});