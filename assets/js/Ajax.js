  /** 
   * 处理用户上传data的函数
   * @param {Object} data 需要发送到服务器的数据
   * @return {String} 返回拼接好的字符串
  */
  function resolveData(data){
   let arr=[];
   for(let key in data){
    arr.push(`${encodeURIComponent(key)}=${encodeURIComponent(data[key])}`);
   }
   return arr.join('&');
  }
  /**
   * 封装Ajax函数,处理请求
   * @param {Object,Function  } 用户的配置对象,需要发给服务器的数据option,可选参数fn表示收到响应之后需要执行的操作,由用户指定
   */
  function ajax(option,fn){
   let xhr=new XMLHttpRequest() //创建xhr对象
   let urlStr=''; //url字符串
   xhr.addEventListener('load',function(){
    // tips:xhr.status中的status指的是http的状态码
    // 服务器返回的信息中的response.status是后台自己定义的状态码
    if(this.readyState===4){
     let response=JSON.parse(this.responseText);
     switch (response.status){
      //判断收到的信息,如果操作成功,再渲染页面
      case 501: //删除失败
       alert(response.msg);
       break;
      case 500: //图书添加失败
       alert(response.msg);
       break;
      case 502: //图书添加失败
       alert(response.msg);
       break;
      case 503: //管理员不允许删除
       alert(response.msg);
       break;
      default:
       fn&&fn(xhr);
     }
    }
   })

   if(option.method=='post'){
    // post请求
    xhr.open(option.method,option.url,true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    if(option.hasOwnProperty('Header')){
     // 添加额外的头部信息
     xhr.setRequestHeader(Object.keys(option.Header)[0],option.Header[Object.keys(option.Header)[0]]);
    }
    if(typeof option.data==='string'){
     // 判断是否是通过表单收集的数据
     // send方法中的参数是要发送的请求报文主体
     xhr.send(option.data);
    }else{
     xhr.send(resolveData(option.data));
    }
   }else if(option.method=='GET'){
    // get请求

    urlStr=option.url+'?'+resolveData(option.data);
    xhr.open(option.method,urlStr,true);
    if(option.hasOwnProperty('Header')){
     // 添加额外的头部信息
     xhr.setRequestHeader(Object.keys(option.Header)[0],option.Header[Object.keys(option.Header)[0]]);
    }
    xhr.send();
   }else if(option.method==="PUT"){
    // put方法
    xhr.open(option.method,option.url,true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    if(option.hasOwnProperty('Header')){
     // 添加额外的头部信息
     xhr.setRequestHeader(Object.keys(option.Header)[0],option.Header[Object.keys(option.Header)[0]]);
    }
    if(typeof option.data==='string'){
     // 判断是否是通过表单收集的数据
     // send方法中的参数是要发送的请求报文主体
     xhr.send(option.data);
    }else{
     xhr.send(resolveData(option.data));
    }
   }else if(option.method==='PATCH'){
    // patch方法
    xhr.open(option.method,option.url,true);
    xhr.setRequestHeader('Content-Type','application/x-www-form-urlencoded');
    if(option.hasOwnProperty('Header')){
     // 添加额外的头部信息
     xhr.setRequestHeader(Object.keys(option.Header)[0],option.Header[Object.keys(option.Header)[0]]);
    }
    if(typeof option.data==='string'){
     // 判断是否是通过表单收集的数据
     // send方法中的参数是要发送的请求报文主体
     xhr.send(option.data);
    }else{
     xhr.send(resolveData(option.data));
    }
   }

  }