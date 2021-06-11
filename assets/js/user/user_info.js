window.addEventListener('load',function(){

 console.log(window);
 const nickName=document.querySelector('input[name="nickname"]');
 const email=document.querySelector('input[name="email"]');
 const form=document.querySelector('form');
 const reset=document.querySelector('[type="reset"]');


 // 提交表单,然后判断表单内容是否合规,如果合规,将修改后的信息上传到服务器
 form.addEventListener('submit',function(e){
  e.preventDefault();
  if(!verify(nickName)) return
  if(!verify(email)) return
  // 将修改后的信息上传到服务器
  ajax({
   method:'PUT',
   url:'http://www.liulongbin.top:3008/my/userinfo',
   Header:{
    Authorization:localStorage.getItem('token'),
   },
   data:{
    id:197,
    nickname:nickName.value,
    email:email.value
   }
  },function(xhr){
   let response=JSON.parse(xhr.responseText);

   // 如果用户信息修改成功,则重新渲染表单,同时重新渲染index主页的头像个人信息
   if(response.code===0){
    getUserInfo();
    // 调用父页面的getUserInfo方法,更新index页面中头像的信息
    window.parent.getUserInfo();
   }
  })
 })

 // 给重置按钮添加click事件
 reset.addEventListener('click',function(e){
  // 阻止表单默认重置行为
  e.preventDefault();
  getUserInfo();
 })

 getUserInfo();

})

/**
 * 从服务器获取用户信息,然后将信息渲染到页面上
 */
function getUserInfo(){
 ajax({
  method:'GET',
  url:'http://www.liulongbin.top:3008/my/userinfo',
  Header:{
   Authorization:localStorage.getItem('token'),
  }
 },function(xhr){
  let response=JSON.parse(xhr.responseText);
  if(response.code===0){
   // 获取用户信息成功后,将信息渲染到表单中
   let userName=document.querySelector('input[name="username"]');
   let nickName=document.querySelector('input[name="nickname"]');
   let email=document.querySelector('input[name="email"]');
   userName.value=response.data.username;
   nickName.value=response.data.nickname;
   email.value=response.data.email;
  }else {
   layer.msg(response.message);
  }
 })
}