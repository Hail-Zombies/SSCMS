var $url="/settings/usersConfig",data=utils.init({isSmsEnabled:!1,form:{isUserRegistrationAllowed:null,isUserRegistrationChecked:null,isUserUnRegistrationAllowed:null,isUserForceVerifyMobile:null,userPasswordMinLength:null,userPasswordRestriction:null,userRegistrationMinMinutes:null,isUserLockLogin:null,userLockLoginCount:null,userLockLoginType:null,userLockLoginHours:null,userFindPasswordSmsTplId:null}}),methods={apiGet:function(){var i=this;utils.loading(this,!0),$api.get($url).then(function(s){var o=s.data;i.isSmsEnabled=o.isSmsEnabled,i.form.isUserRegistrationAllowed=o.config.isUserRegistrationAllowed,i.form.isUserRegistrationChecked=o.config.isUserRegistrationChecked,i.form.isUserUnRegistrationAllowed=o.config.isUserUnRegistrationAllowed,i.form.isUserForceVerifyMobile=o.config.isUserForceVerifyMobile&&o.isSmsEnabled,i.form.userPasswordMinLength=o.config.userPasswordMinLength,i.form.userPasswordRestriction=o.config.userPasswordRestriction,i.form.userRegistrationMinMinutes=o.config.userRegistrationMinMinutes,i.form.isUserLockLogin=o.config.isUserLockLogin,i.form.userLockLoginCount=o.config.userLockLoginCount,i.form.userLockLoginType=o.config.userLockLoginType,i.form.userLockLoginHours=o.config.userLockLoginHours,i.form.userFindPasswordSmsTplId=o.config.userFindPasswordSmsTplId}).catch(function(i){utils.error(i)}).then(function(){utils.loading(i,!1)})},apiSubmit:function(){var i=this;utils.loading(this,!0),$api.post($url,{isUserRegistrationAllowed:this.form.isUserRegistrationAllowed,isUserRegistrationChecked:this.form.isUserRegistrationChecked,isUserUnRegistrationAllowed:this.form.isUserUnRegistrationAllowed,isUserForceVerifyMobile:this.form.isUserForceVerifyMobile,userPasswordMinLength:this.form.userPasswordMinLength,userPasswordRestriction:this.form.userPasswordRestriction,userRegistrationMinMinutes:this.form.userRegistrationMinMinutes,isUserLockLogin:this.form.isUserLockLogin,userLockLoginCount:this.form.userLockLoginCount,userLockLoginType:this.form.userLockLoginType,userLockLoginHours:this.form.userLockLoginHours,userFindPasswordSmsTplId:this.form.userFindPasswordSmsTplId}).then(function(i){i.data;utils.success("用户设置保存成功！")}).catch(function(i){utils.error(i)}).then(function(){utils.loading(i,!1)})},getPasswordRestrictionText:function(i){return"LetterAndDigit"===i?"字母和数字组合":"LetterAndDigitAndSymbol"===i?"字母、数字以及符号组合":"不限制"},btnSubmitClick:function(){var i=this;this.$refs.form.validate(function(s){s&&i.apiSubmit()})}},$vue=new Vue({el:"#main",data:data,methods:methods,created:function(){this.apiGet()}});