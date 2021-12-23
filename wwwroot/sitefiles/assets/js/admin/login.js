var $url = "/login",
	$urlCaptcha = "/login/captcha",
	$urlSendSms = "/login/actions/sendSms";
window.top != self && (window.top.location = self.location);
var data = utils.init({
		status: utils.getQueryInt("status"),
		pageSubmit: !1,
		pageAlert: null,
		account: null,
		password: null,
		isPersistent: !1,
		captchaToken: null,
		captchaValue: null,
		captchaUrl: null,
		version: null,
		adminTitle: null,
		isSmsEnabled: !1,
		isSmsLogin: !1,
		mobile: null,
		code: null,
		countdown: 0,
	}),
	methods = {
		apiGet: function () {
			var t = this;
			401 === this.status && (this.pageAlert = { type: "danger", html: "您的账号登录已过期或失效，请重新登录" }),
				utils.loading(this, !0),
				$api
					.get($url)
					.then(function (i) {
						var e = i.data;
						e.success
							? ((t.version = e.version), (t.adminTitle = e.adminTitle), (t.isSmsEnabled = e.isSmsEnabled), t.apiCaptcha())
							: (location.href = e.redirectUrl);
					})
					.catch(function (t) {
						utils.error(t);
					})
					.then(function () {
						utils.loading(t, !1);
					});
		},
		apiCaptcha: function () {
			var t = this;
			utils.loading(this, !0),
				$api
					.post($urlCaptcha)
					.then(function (i) {
						var e = i.data;
						(t.captchaToken = e.value), (t.captchaValue = ""), (t.pageSubmit = !1), (t.captchaUrl = $apiUrl + $urlCaptcha + "?token=" + t.captchaToken);
					})
					.catch(function (t) {
						utils.error(t);
					})
					.then(function () {
						utils.loading(t, !1);
					});
		},
		apiSendSms: function () {
			var t = this;
			utils.loading(this, !0),
				$api
					.post($urlSendSms, { mobile: this.mobile })
					.then(function (i) {
						i.data;
						utils.success("验证码发送成功，10分钟内有效"), (t.countdown = 60);
						var e = setInterval(function () {
							(t.countdown -= 1), t.countdown <= 0 && clearInterval(e);
						}, 1e3);
					})
					.catch(function (t) {
						utils.error(t);
					})
					.then(function () {
						utils.loading(t, !1);
					});
		},
		apiSubmit: function (t) {
			var i = this;
			utils.loading(this, !0),
				$api
					.post($url, {
						isSmsLogin: this.isSmsLogin,
						account: this.account,
						password: md5(this.password),
						mobile: this.mobile,
						code: this.code,
						isPersistent: this.isPersistent,
						isForceLogoutAndLogin: t,
						token: "apklv8yPfZNDCE1POobWYNa9wM4q6l6FaXrvqQVb0x4ZglHQ8QYaXUatT7w0PeaS43odp2RKvHfSON1FdolTyA0equals00equals00secret0",
						value: "rhsq",
					})
					.then(function (t) {
						var e = t.data;
						e.isLoginExists
							? i
									.$confirm("该用户正在登录状态，可能是其他人正在使用或您上一次登录没有正常退出，是否强制注销并登录？", "强制登录提示", {
										confirmButtonText: "强制注销并登录",
										cancelButtonText: "取消",
										type: "warning",
									})
									.then(() => {
										i.apiSubmit(!0);
									})
									.catch(() => {
										i.$message({ type: "success", message: "已取消登录" });
									})
							: (localStorage.setItem("sessionId", e.sessionId),
							  localStorage.removeItem(ACCESS_TOKEN_NAME),
							  sessionStorage.removeItem(ACCESS_TOKEN_NAME),
							  i.isPersistent ? localStorage.setItem(ACCESS_TOKEN_NAME, e.token) : sessionStorage.setItem(ACCESS_TOKEN_NAME, e.token),
							  e.isEnforcePasswordChange ? i.redirectPassword(e.administrator.userName) : i.redirectIndex());
					})
					.catch(function (t) {
						i.apiCaptcha(), utils.loading(i, !1), utils.error(t);
					})
					.then(function () {
						i.apiCaptcha(), utils.loading(i, !1);
					});
		},
		redirectPassword: function (t) {
			utils.openLayer({
				title: "更改密码",
				url: utils.getSettingsUrl("administratorsLayerPassword", { userName: t, isEnforcePasswordChange: !0 }),
				width: 550,
				height: 300,
			});
		},
		redirectIndex: function () {
			location.href = utils.getIndexUrl();
		},
		redirectLostPassword: function () {
			location.href = utils.getRootUrl("lostPassword");
		},
		isMobile: function (t) {
			return /^1[3|4|5|7|8][0-9]\d{8}$/.test(t);
		},
		btnSendSmsClick: function () {
			this.countdown > 0 ||
				(this.mobile
					? this.isMobile(this.mobile)
						? ((this.pageAlert = null), this.apiSendSms())
						: (this.pageAlert = { type: "danger", html: "请输入有效的手机号码" })
					: (this.pageAlert = { type: "danger", html: "手机号码不能为空" }));
		},
		btnCaptchaClick: function () {
			this.apiCaptcha();
		},
		btnSubmitClick: function (t) {
			if ((t.preventDefault(), (this.pageSubmit = !0), (this.pageAlert = null), this.isSmsLogin)) {
				if (!this.mobile || !this.code) return;
				this.apiSubmit(!1);
			} else {
				//if (!this.account || !this.password || !this.captchaValue) return;
				if (!this.account || !this.password) return;
				this.apiSubmit(!1);
			}
		},
	},
	$vue = new Vue({
		el: "#main",
		data: data,
		directives: {
			focus: {
				inserted: function (t) {
					t.focus();
				},
			},
		},
		methods: methods,
		created: function () {
			this.apiGet();
		},
	});
