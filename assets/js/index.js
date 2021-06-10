
window.addEventListener('load',function(){

 const logoutBtn=document.querySelector('#logout');

 logoutBtn.addEventListener('click',function(){
  layer.confirm('确定退出登录么?', {icon: 3, title:'提示'}, function(index){
   // 确定之后会执行这个回调函数
   layer.close(index);
   // 确认退出之后,会跳转会登录页面,然后删除本地存储中的token值
   console.log(location.href);
   location.href='/login.html';
   localStorage.removeItem('token');
 });
 })
 getUserInfo();
 
})

/**
 * 从本地存储中获取用户的token值,然后向服务器发送请求,获取用户信息
 */
function getUserInfo(){
 ajax({
  method:'GET',
  url:'http://api-breakingnews-web.itheima.net/my/userinfo',
  Header:{
   Authorization:localStorage.getItem('token')||'',
  }
 },function(xhr){
  console.log(xhr);
  let response=JSON.parse(xhr.responseText);
  if(response.status!==0){
   layui.layer.msg('获取用户信息失败');
   // 若果获取用户信息失败,证明用户token值是错误的,然后强制跳转会登录页面
   location.href='/login.html'
   // 同时删除本地存储的token值
   localStorage.removeItem('token');
   return
  }
  renderAvatar(response.data);
 })
}

/**
 * 渲染用户的头像
 * @param {Object} userData 包含了用户的信息
 */
function renderAvatar(userData){

 let welcome=document.querySelector('#welcome');
 welcome.innerText+=userData.nickname||userData.username; //优先选nickname昵称,不存在再选择用户名

 let sideAva=document.querySelector('.userinfo img');
 let textSideAva=document.querySelector('.userinfo .text-avatar');
 let headAva=document.querySelector('.layui-nav img');
 let textHeadAva=document.querySelector('.layui-nav .text-avatar');

 if(userData.user_pic===null){
  let nameChar=userData.username[0].toUpperCase();
  // 渲染文本头像
  textSideAva.style.display='inline-block';
  textSideAva.innerText=nameChar;
  textHeadAva.style.display='inline-block';
  textHeadAva.innerText=nameChar;
  sideAva.style.display='none';
  headAva.style.display='none';
 }else{
  // 渲染用户头像
  textSideAva.style.display='none';
  textHeadAva.style.display='none';
  sideAva.style.display='block';
  sideAva.src=userData.user_pic;
  headAva.style.display='block';
  headAva.src=userData.user_pic;
 }

}