$.ajaxPrefilter(function(options) {
	options.url = 'http://api-breakingnews-web.itheima.net' + options.url;
	// 统一为有权限的接口设置headers请求头
	if (options.url.indexOf('/my/') !== -1) {
		options.headers = {
			Authorization: localStorage.getItem('token') || ''
		}
	}
	// 全局同意挂载complete回调函数
	options.complete = function(res) {
		if (res.responseJSON.status === 1) {
			//强制清空token
			localStorage.removeItem('token');
			// 强制跳转会登陆界面
			location.href = '../大事件/login.html'
		}
	}
})
