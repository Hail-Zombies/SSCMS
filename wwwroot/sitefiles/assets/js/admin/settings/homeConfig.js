var $url="/settings/homeConfig",data=utils.init({config:null,uploadUrl:null,uploadFileListHomeLogoUrl:[],uploadFileListHomeDefaultAvatarUrl:[],uploadType:null,homeDirectory:null,form:{uploadLogoUrl:null,isHomeClosed:null,homeTitle:null,isHomeLogo:null,homeLogoUrl:null,homeDefaultAvatarUrl:null,userRegistrationAttributes:[],isUserRegistrationMobile:null,isUserRegistrationEmail:null,isUserRegistrationGroup:null,isHomeAgreement:null,homeAgreementHtml:null,homeWelcomeHtml:null,styles:null}}),methods={apiGet:function(){var o=this;utils.loading(this,!0),$api.get($url).then(function(e){var t=e.data;o.config=t.config,o.homeDirectory=t.homeDirectory,o.form.isHomeClosed=t.config.isHomeClosed,o.form.homeTitle=t.config.homeTitle,o.form.isHomeLogo=t.config.isHomeLogo,o.form.homeLogoUrl=t.config.homeLogoUrl,o.form.homeDefaultAvatarUrl=t.config.homeDefaultAvatarUrl,o.form.userRegistrationAttributes=t.config.userRegistrationAttributes||[],o.form.isUserRegistrationMobile=t.config.isUserRegistrationMobile,o.form.isUserRegistrationEmail=t.config.isUserRegistrationEmail,o.form.isUserRegistrationGroup=t.config.isUserRegistrationGroup,o.form.isHomeAgreement=t.config.isHomeAgreement,o.form.homeAgreementHtml=t.config.homeAgreementHtml,o.form.homeWelcomeHtml=t.homeWelcomeHtml||"欢迎使用用户中心",o.styles=t.styles,o.form.homeLogoUrl&&o.uploadFileListHomeLogoUrl.push({name:"avatar",url:o.form.homeLogoUrl}),o.form.homeDefaultAvatarUrl&&o.uploadFileListHomeDefaultAvatarUrl.push({name:"avatar",url:o.form.homeDefaultAvatarUrl})}).catch(function(o){utils.error(o)}).then(function(){utils.loading(o,!1)})},apiSubmit:function(){var o=this;utils.loading(this,!0),$api.post($url,{isHomeClosed:this.form.isHomeClosed,homeTitle:this.form.homeTitle,isHomeLogo:this.form.isHomeLogo,homeLogoUrl:this.form.homeLogoUrl,homeDefaultAvatarUrl:this.form.homeDefaultAvatarUrl,userRegistrationAttributes:this.form.userRegistrationAttributes,isUserRegistrationMobile:this.form.isUserRegistrationMobile,isUserRegistrationEmail:this.form.isUserRegistrationEmail,isUserRegistrationGroup:this.form.isUserRegistrationGroup,isHomeAgreement:this.form.isHomeAgreement,homeAgreementHtml:this.form.homeAgreementHtml,homeWelcomeHtml:this.form.homeWelcomeHtml}).then(function(o){o.data;utils.success("用户中心设置保存成功！")}).catch(function(o){utils.error(o)}).then(function(){utils.loading(o,!1)})},getUserRegistrationAttribute:function(o){return o},btnUsersStyleClick:function(){utils.addTab("用户字段",utils.getSettingsUrl("usersStyle"))},btnSubmitClick:function(){var o=this;this.$refs.form.validate(function(e){e&&o.apiSubmit()})},uploadBeforeHomeLogoUrl(o){return this.uploadType="homeLogoUrl",this.uploadBefore(o)},uploadBeforeHomeDefaultAvatarUrl(o){return this.uploadType="homeDefaultAvatarUrl",this.uploadBefore(o)},uploadBefore:o=>/(\.jpg|\.jpeg|\.bmp|\.gif|\.png|\.webp)$/i.exec(o.name)?!!(o.size/1024/1024<10)||(utils.error("管理后台Logo图片大小不能超过 10MB!"),!1):(utils.error("管理后台Logo只能是图片格式，请选择有效的文件上传!"),!1),uploadProgress:function(){utils.loading(this,!0)},uploadSuccess:function(o,e,t){"homeLogoUrl"===this.uploadType?this.form.homeLogoUrl=o.value:"homeDefaultAvatarUrl"===this.uploadType&&(this.form.homeDefaultAvatarUrl=o.value),utils.loading(this,!1),t.length>1&&t.splice(0,1)},uploadError:function(o){utils.loading(this,!1);var e=JSON.parse(o.message);utils.error(e.message)},uploadRemoveHomeLogoUrl(o){this.form.homeLogoUrl=null},uploadRemoveHomeDefaultAvatarUrl(o){this.form.homeDefaultAvatarUrl=null}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.uploadUrl=$apiUrl+$url+"/actions/upload",this.apiGet()}});