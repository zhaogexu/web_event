$(function() {
	$('#a_login').on('click', function() {
		$('#login').hide();
		$('#reg').show();
	})
	$('#a_reg').on('click', function() {
		$('#reg').hide();
		$('#login').show();
	})

	var my_form = layui.form;
	var my_layer = layui.layer;
	// 通过 form.verify() 函数自定义校验规则
	my_form.verify({
		// 自定义了一个叫做 pwd 校验规则
		pwd: [/^[\S]{6,12}$/, '密码必须6到12位，且不能出现空格'],
		// 校验两次密码是否一致的规则
		repwd: function(value) {
			// 通过形参拿到的是确认密码框中的内容
			// 还需要拿到密码框中的内容
			// 然后进行一次等于的判断
			// 如果判断失败,则return一个提示消息即可
			var pwd = $('.reg [name=password]').val()
			if (pwd !== value) {
				return '两次密码不一致'
			}
		}
	})

	//监听注册表单的提交事件
	$('#form_reg').on('submit', function(e) {
		e.preventDefault();
		//发起ajax的post请求
		var data = {
			username: $('#form_reg [name = username]').val(),
			password: $('#form_reg [name = password]').val()
		};
		// console.log(data.username);
		// console.log(data.password);
		$.post('/api/reguser', data, function(res) {
			if (res.status !== 0) {
				return my_layer.msg(res.message);
			}
			my_layer.msg(res.message);
			$('#a_reg').click();
		})
	})

	//监听登陆表单的登陆事件
	$('#form_login').on('submit', function(e) {
		e.preventDefault();
		//快速获取表单中的数据
		var data = $(this).serialize();
		$.post('/api/login', data, function(res) {
			if (res.status !== 0) {
				return my_layer.msg(res.message);
			}
			my_layer.msg(res.message);
			//将登陆成功的到的token字符串存到localstorage中
			localStorage.setItem('token', res.token);
			//跳转到后台主页
			location.href = '../大事件/index.html';
		})
	})
})
