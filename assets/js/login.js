window.addEventListener('load',function(){

 const loginLink=document.querySelector('#login_link');
 const regLink=document.querySelector('#register_link');

 const loginBox=document.querySelector('.login-box');
 const regBox=document.querySelector('.reg-box');

 const regForm=regBox.querySelector('form');
 const loginForm=loginBox.querySelector('form');

 let submitLogin=document.querySelector('.layui-btn');
 let submitReg=document.querySelector('.reg-box .layui-btn');

 /**
  * 验证表单的值是否符合要求
  * @param {String} item 传入的表单对象
  * @returns {Boolean} 如果符合返回true,如果不符合返回false
  */
 function verify(item){
  if(item.type==='text'){
   if(item.value.trim()===''){
    verifyRender('用户名不能为空',item);
    return false;
   }else if(!new RegExp("^[a-zA-Z0-9_\u4e00-\u9fa5\\s·]+$").test(item.value)){
    verifyRender('用户名不能有特殊字',item);
    return false;
   }else if(/(^\_)|(\__)|(\_+$)/.test(item.value)){
    verifyRender('用户名首尾不能出现下划线\'_\'',item);
    return false;
   }else if(/^\d+\d+\d$/.test(item.value)){
    verifyRender('用户名不能全为数字',item);
    return false;
   }
  }else if(item.type==='password'){
   if(item.value.trim()===''){
    verifyRender('请输入密码',item);
    return false;
   }else if(!/^[\S]{6,12}$/.test(item.value)){
    verifyRender('密码必须6到12位',item);
    return false;
   }
  }
  return true;
 }

 let timer
 /**
  * 将错误信息渲染到页面上
  * @param {String,Object} text 提示用户输入的错误信息 
  */
 function verifyRender(text,item){
  clearTimeout(timer);
  let box=document.querySelector('.login-reg-box');
  let div=document.createElement('div');
  // 添加提示框
  div.innerHTML=`<i class="layui-icon icon layui-icon-face-cry
  " ></i>${text}`;
  div.classList.add('alert');
  box.appendChild(div);
  // 将表单边框设置为橘色
  item.style.borderColor="orange";
  // 设置定时器,一段时间过后提示信息消失
  timer=setTimeout(function(){
   box.removeChild(div);
   item.style.borderColor='#e6e6e6';
  },1500);
 }

 // 给登录按钮注册click事件
 submitLogin.addEventListener('click',function(e){
  let userName=loginBox.querySelector('[type="text"]');
  let pwd=loginBox.querySelector('[type="password"]');
  // 验证用户名和密码是否符合规则
  if(!verify(userName)) return
  if(!verify(pwd)) return
 })

 // 给注册按钮注册click事件
 submitReg.addEventListener('click',function(e){
  let userName=regBox.querySelector('[type="text"]');
  let pwds=regBox.querySelectorAll('[type="password"]');
  // 验证用户名和密码是否符合规则
  if(!verify(userName)) return
  if(!verify(pwds[0])) return
  if(!verify(pwds[1])) return
  // 判断输入的密码是否一致
  if(pwds[0].value!==pwds[1].value) verifyRender('输入密码不一致',pwds[1])
 })

 //点击去登录
 loginLink.addEventListener('click',function(){
  regBox.style.display='none';
  loginBox.style.display='block';
 })

 //点击去注册
 regLink.addEventListener('click',function(){
  loginBox.style.display='none';
  regBox.style.display='block';
 })

 // 注册form表单注册submit事件
regForm.addEventListener('submit',function(e){
 e.preventDefault(); // 阻止表单默认提交
 ajax({
  method:'post',
  url:'http://api-breakingnews-web.itheima.net/api/reguser',
  data:{
   username:regBox.querySelector('[type="text"]').value,
   password:regBox.querySelector('[type="password"]').value
  }
 },function(xhr){
  // 注册成功后,将服务器返回的信息展示给用户
  layer.msg(JSON.parse(xhr.responseText).message);
  // 跳转到登录界面
  loginLink.click();
 })
})

 // 登录form表单注册submit事件
loginForm.addEventListener('submit',function(e){
 e.preventDefault();
 ajax({
  method:'post',
  url:'http://api-breakingnews-web.itheima.net/api/login',
  data:{
   username:loginBox.querySelector('[type="text"]').value,
   password:loginBox.querySelector('[type="password"]').value
  }
 },function(xhr){
  let response=JSON.parse(xhr.responseText);
  layer.msg(response.message);
  if(response.status===0){
   // 登录成功后,服务器会返回一个token字符串,可以用来以后访问有权限的数据
   // 所以需要把这个字符串保存到本地存储中,需要的时候去取
   localStorage.setItem('token',JSON.parse(xhr.responseText).token);
   // 登录成功后,跳转到后台的主页
   location.href='index.html';
  }
 })
})


})