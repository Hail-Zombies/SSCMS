var $url="/common/material/layerArticleSelect",data=utils.init({siteId:utils.getQueryInt("siteId"),itemId:utils.getQueryInt("itemId"),groups:null,count:null,items:null,multipleSelection:[],form:{siteId:utils.getQueryInt("siteId"),keyword:"",groupId:-utils.getQueryInt("siteId"),page:1,perPage:24,articleIds:utils.getQueryString("articleIds")}}),methods={apiList:function(t){var i=this;this.form.page=t,utils.loading(this,!0),$api.get($url,{params:this.form}).then(function(t){var e=t.data;i.groups=e.groups,i.count=e.count,i.items=e.items,i.items.forEach(function(t){t.checked=!1})}).catch(function(t){utils.error(t)}).then(function(){utils.loading(i,!1)})},handleSelectionChange:function(t){this.multipleSelection=t},getLinkUrl:function(t){return utils.getCmsUrl("material"+t,{siteId:this.siteId})},getUploadUrl:function(){return $apiUrl+$url+"?siteId="+this.siteId+"&groupId="+this.form.groupId},getPreviewSrcList:function(t){var i=_.map(this.items,function(t){return t.url});return i.splice(i.indexOf(t),1),i.splice(0,0,t),i},btnTitleClick:function(t){},btnGroupClick:function(t){this.form.groupId=t,this.apiList(1)},btnSearchClick(){utils.loading(this,!0),this.apiList(1)},btnPageClick:function(t){utils.loading(this,!0),this.apiList(t)},btnSubmitClick:function(){parent.$vue.runMaterialLayerArticlesSubmit(this.multipleSelection,this.itemId),utils.closeLayer()},btnCancelClick:function(){utils.closeLayer()}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiList(1)}});