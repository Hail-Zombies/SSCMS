var $url="/cms/settings/settingsUploadImage",data=utils.init({siteId:utils.getQueryInt("siteId"),pageType:null,form:null,csrfToken:null,isSafeMode:!1}),methods={apiGet:function(){var i=this;utils.loading(this,!0),$api.get($url,{params:{siteId:this.siteId}}).then(function(t){var e=t.data;i.csrfToken=e.csrfToken,i.isSafeMode=e.isSafeMode,i.form={siteId:i.siteId,imageUploadDirectoryName:e.imageUploadDirectoryName,imageUploadDateFormatString:e.imageUploadDateFormatString,isImageUploadChangeFileName:e.isImageUploadChangeFileName,imageUploadExtensions:e.imageUploadExtensions,imageUploadTypeMaxSize:e.imageUploadTypeMaxSize,photoSmallWidth:e.photoSmallWidth,photoMiddleWidth:e.photoMiddleWidth}}).catch(function(i){utils.error(i)}).then(function(){utils.loading(i,!1)})},apiSubmit:function(){var i=this;utils.loading(this,!0),$api.csrfPost(this.csrfToken,$url,this.form).then(function(i){i.data;utils.success("图片上传设置保存成功！")}).catch(function(i){utils.error(i)}).then(function(){utils.loading(i,!1)})},btnSubmitClick:function(){var i=this;this.$refs.form.validate(function(t){t&&i.apiSubmit()})}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiGet()}});