$(function() {
	getUserInfo();

	$('#btnLogin').click(function() {
		// 弹出提示消息框
		layer.confirm('是否要退出大事件后台管理系统', {
			icon: 3,
			title: '提示'
		}, function(index) {
			//do something
			location.href = '../大事件/login.html';
			layer.close(index);
		});
	})
})
// 获取用户信息
function getUserInfo() {
	$.ajax({
		method: 'GET',
		url: '/my/userinfo',

		success: function(res) {
			if (res.status !== 0) {
				return layui.layer.msg('获取用户信息失败')
			}
			returnAvater(res.data);
		}
		// },
		// complete: function(res) {
		// 	if (res.responseJSON.status === 1) {
		// 		//强制清空token
		// 		localStorage.removeItem('token');
		// 		// 强制跳转会登陆界面
		// 		location.href = '../大事件/login.html'
		// 	}
		// }
	})
}
// 渲染用户头像
function returnAvater(user) {
	var name = user.nickname || user.username;
	// 设置欢迎文本
	$('#welcome').html('欢迎&nbsp;&nbsp;' + name);
	// 渲染用户头像
	if (user.user_pic !== null) {
		// 渲染图片头像
		$('.layui-img').attr('src', user.user_pic).show();
	}
}
