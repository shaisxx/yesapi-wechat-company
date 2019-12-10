# wechat-company
微信小程序，企业展示。基于免费小白接口快速实现的企业展示微信小程序。

API接口（无须自己搭建服务器，可直接使用免费小白接口）  
 + 小白开放平台：http://open.yesapi.cn
 
## 截图效果

![效果](http://cdn7.okayapi.com/yesyesapi_20191210113042_1bbe410e11acf75243234b48c9fcd154.png)  

## 如何快速使用小白接口开发微信小程序

1、注册好小白接口后，修改./utils/config.js文件，修改成自己所在的接口域名和app_key，如下：
```
var API_BASE = 'https://dogstar.api.yesapi.cn';

const CONFIG = {
    API_URL: {
      GET_INDEX: API_BASE + '?app_key=CEE4B8A091578B252AC4C92FB4E893C3',
    }
}

module.exports = CONFIG;
```

2、调用小白接口
以下是三个小白接口的调用，分别是获取首页广告、获取新闻列表数据、微信联登，代码在index.js，如下：
```

  onLoad: function () {
    var that = this;

    // 获取广告
    wx.request({
      url: CONFIG.API_URL.GET_INDEX + "&s=App.Market_Adver.GetAdList",
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res);

        if (res.statusCode == 200 && res.data.ret == 200) {
          that.setData({ swipers: res.data.data.items });
        }
      }
    })

    // 获取新闻
    wx.request({
      url: CONFIG.API_URL.GET_INDEX + "&s=App.Market_LastestNews.GetList&perpage=5",
      method: 'GET',
      data: {},
      header: {
        'Accept': 'application/json'
      },
      success: function (res) {
        console.log(res);

        if (res.statusCode == 200 && res.data.ret == 200) {
          that.setData({ news: res.data.data.list });
        }
      }
    })

    // 登录
    this.goGetUserInfo()

  },
  
  
  onLogin: function (iv, encryptedData) {
    wx.login({ //重新登录
      success(res) {
        if (res.code) {
          //发起网络请求
          wx.request({
            url: CONFIG.API_URL.GET_INDEX + "&s=App.Market_Weixin.FastLogin",
            data: {
              code_type: 1,
              code: res.code,
              iv: iv,
              encryptedData: encryptedData
            },
            success: function (res) {
              if (res.statusCode == 200 && res.data.ret == 200) {
                app.globalData.uuid = res.data.data.uuid
                app.globalData.token = res.data.data.token
              }
            }
          })
        } else {
          console.log('登录失败！' + res.errMsg)
        }
      }
    })
  },
```

此外，小白接口还提供了360+款免费接口，可以快速用于微信小程序的开发。包括数据存储、图片上传、计划任务等。请见：http://api.yesapi.cn/docs.php

## 小白开放平台
小白开放平台是对应的管理后台，有些功能需要开通才可以使用。例如：

首页广告插件：
![图](http://cdn7.okayapi.com/yesyesapi_20191210113622_a9c252f47dadc1c93a6477ca85cd56f0.png)  

新闻插件：
![](http://cdn7.okayapi.com/yesyesapi_20191210113717_44c7caff3ec72f19a7877f7d96810895.png)  

微信联合后的会员信息：
![](http://cdn7.okayapi.com/yesyesapi_20191210113802_a022e451edd7b6a7a0f641d4197ffebd.png)  

小白开放平台链接：http://open.yesapi.cn/
