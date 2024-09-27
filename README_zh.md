[English](https://gitee.com/verhancao/food-buddy/blob/master/README.en.md) | 简体中文

<div align=center>
  <img src="https://github.com/VerhanCao/food-buddy/blob/main/resource/figures/gitee%E5%AE%A3%E4%BC%A0%E7%85%A7.png" width="600px">
</div>

饮食陪伴师是一个管理饮食的原生大模型小程序，优势：

1. 精确营养监控：用户记录饮食后，我们会计算出食用的营养成分与分量，并反馈给用户。
2. 饮食建议有效：大模型经过我们训练具备大量专业知识，它给出的饮食建议科学有效。
3. 「伴伴」情感陪伴：小程序的核心亮点在于伴伴，我们把伙伴的元素融入了饮食管理中，给予用户情绪价值。
4. 提供一套前后端uniapp、算法源码，开源可学习

# 🔗 技术架构

<div align=center>
    <img src="https://github.com/VerhanCao/food-buddy/blob/main/resource/figures/%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84%E5%9B%BE.png" width="92%">
</div>

## 技术选型

|技术及版本|作用|原因|
|--|--|--|
|Vue 3.x|主要开发框架|团队成员更熟悉|
|图鸟UI|移动端组件库|适配移动端项目、主流|
|Spring Boot 2.7.x|主要开发框架|团队成员更熟悉、主流|
|Lombok|注解式代码生成|节省开发时间|
|MySQL|数据库|社区良好、稳定易用|
|语雀大模型API|使能够基于prompt生成回复|对人物扮演这块语雀做的很好|
|51.LA|网站统计|免费、易用|

# 🔒 权限信息

本开源项目基于「[Apache LICENSE](https://github.com/VerhanCao/food-buddy/blob/main/LICENSE
)」，

特别得，在里面我们提出了两个附加要求：

1. 禁止将该软件用作任何学术作品或出版物的一部分。
2. 禁止将该软件作为任何比赛或竞赛的产品参赛。

# 🔥 运行标准版

<table style="margin: auto;">
  <tr>
    <td style="text-align: center;">
      <img src="https://github.com/VerhanCao/food-buddy/blob/main/resource/figures/%E8%81%8A%E5%A4%A9%E9%A1%B5%E9%9D%A2.png" alt="聊天页面" width="60%">
    </td>
    <td style="text-align: center;">
      <img src="https://github.com/VerhanCao/food-buddy/blob/main/resource/figures/%E9%A5%AE%E9%A3%9F%E8%AE%B0%E5%BD%95%E9%A1%B5%E9%9D%A2.png" alt="饮食记录页面" width="60%">
    </td>
  </tr>
</table>

[demo视频演示](https://gitee.com/verhancao/food-buddy/raw/master/resource/figures/demo%E8%A7%86%E9%A2%91.mp4)

> 以下列举了核心文件的结构

```
|-- food-buddy/
    |-- LICENSE  # 许可证书
    |-- README.en.md
    |-- README.md
    |-- diet_manage_user/
        |-- src/
    |-- diet_return/  # 后端工程目录
        |-- src/
            |-- main.java/
                |-- com.example/
                    |-- DietReturnApplication  # 启动类
                    |-- Contrller/
                        |-- ChatAdviceController  # 饮食建议控制层
                        |-- ChatReturnController  # 聊天模块
                        |-- DietAnalyseController  # 饮食分析控制层
                        |-- DietController  # 饮食信息控制层
                        |-- RecommendController  # 菜品推荐控制层
                    |-- entity/  # 实体类
                        |-- Diet  # 饮食信息
                        |-- NutritionStr  # 基础营养
                        |-- Result  # 统一接口
                        |-- User  # 用户信息
                    |-- Mapper/
                        |-- ChatAdviceMapper  # 饮食建议查询用户目标
                        |-- DataMapper  # 查询当天饮食信息和菜品
                        |-- DietMapper  # 查询当周饮食信息和新增信息
                    |-- Service/
                        |-- ChatAdviceService  # 饮食建议逻辑层
                        |-- DietAnalyseService  # 饮食分析逻辑层
                        |-- DietService  # 饮食信息逻辑层
                        |-- RecommendService  # 菜品推荐逻辑层
            |-- main.resources/
                |-- com.example.Mapper/  # 映射文件
                    |-- ChatAdviceMapper.xml
                    |-- DataMapper.xml
                    |-- DietMapper.xml
                |-- application.properties  # 配置文件
            |-- pom.xml  # 配置文件
    |-- llm_server/  # 大模型服务工程目录
        |-- chat_response/  
            |-- memory_db  # 用户记忆库
            |-- base_memory_chat.py  # 聊天对话模块
        |-- dietary_advice/
            |-- dietary_advice.py  # 饮食建议模块
        |-- recommended_dishes/
            |-- add_in_userdb.py
            |-- recommended_dishes.py  # 菜品推荐模块
            |-- recommended_judgment.py  # 饮食干预评估模块
        |-- config_ai.py  # AI配置文件
        |-- requirements.txt  # AI的库依赖
    |-- tuniao_uniapp/  # 前端工程目录
        |-- src/
            |-- App.vue  # 项目启动文件
            |-- pages
                |-- chat/chat.vue  # 大模型聊天页面
                |-- diet/diet.vue  # 饮食管理主页面
                |-- addDiet/addDiet.vue  # 添加饮食记录
                |-- personal/personal.vue  # 个人中心页
                |-- login/login.vue  # 登录页
            |-- env.d.ts
            |-- main.ts  # 项目全局文件
            |-- manifest.json uniapp  # 小程序配置(appid等)
            |-- pages.json  # 全局路由导航配置
            |-- shime-uni.d.ts
            |-- shime-vue.d.ts
            |-- uni.scss  # 全局样式文件
```

 **！！！新手强烈建议听我录制的教程视频，里面会科普知识，希望大家都能跑起来！** 

[视频教程](http://)

## 一、准备运行环境

> 默认前提条件：已下载Git工具
> 
> [food-buddy软件云盘](https://www.alipan.com/s/38myCHbBcZc)
> 
> [推荐教程](http://t.csdnimg.cn/5KcaM)

### （一）克隆仓库

```
git clone --depth 1 --branch master https://gitee.com/verhancao/food-buddy.git
```

### （二）下载AI依赖

#### 2.1 下载AI软件

- 下载PyCharm

[food-buddy软件云盘](https://www.alipan.com/s/38myCHbBcZc)

[推荐教程](https://blog.csdn.net/stormjun/article/details/132721822)

- 下载python解释器

[food-buddy软件云盘](https://www.alipan.com/s/38myCHbBcZc)

[推荐教程](https://blog.csdn.net/2301_78095812/article/details/139290210?ops_request_misc=&request_id=&biz_id=102&utm_term=python%E5%AE%89%E8%A3%85%E5%8F%8A%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-4-139290210.142^v100^pc_search_result_base3&spm=1018.2226.3001.4187)

> ！python需配置环境变量

- 下载依赖包

打开 命令提示窗口 ，下载AI依赖到`python`环境

```
pip install websockets
pip install volcengine-python-sdk
```

下载`volcengine-python-sdk`时会出现报错，[解决方案](https://github.com/volcengine/volcengine-python-sdk/issues/5)

#### 2.2修改配置文件

Pycharm打开项目。在`llm_server`目录下，修改`config_ai.py`文件

```
# 设置火山大模型的API密钥
client = Ark(
    base_url="XXXXXXXXXX",
    ak="XXXXXXXXXX",
    sk="XXXXXXXXXX",
    api_key="XXXXXXXXXX"
)
```

将以上替换成你的API密钥。[API密钥申请入口/火山引擎](https://console.volcengine.com/)

### （三）下载前端软件

#### 3.1 安装软件

- 安装Node.js环境

[food-buddy软件云盘](https://www.alipan.com/s/38myCHbBcZc)

[推荐教程](https://blog.csdn.net/WHF__/article/details/129362462)

- 安装HbuilderX

[food-buddy软件云盘](https://cloud.189.cn/web/share?code=zUjmQjbINJ3u)（访问码：io1r）

- 安装 微信开发者工具

[food-buddy软件云盘](https://www.alipan.com/s/38myCHbBcZc)

#### 3.2 安装前端依赖

用命令提示窗口，切换到项目`tuniao_uniapp`目录下

执行下条命令，安装前端依赖

```
npm install
```

### （四）下载后端软件

#### 4.1 安装软件

> IDEA需下载企业版，方便使用`SpringBoot`框架。（新账户有免费30day的试用期）

- 安装 IDEA

[food-buddy软件云盘](https://www.alipan.com/s/38myCHbBcZc)

> ！注意springboot后端需要IDEA企业版，新账号有免费30days使用期

- 安装 jdk

[food-buddy软件云盘](https://www.alipan.com/s/38myCHbBcZc)

[推荐教程](https://blog.csdn.net/JunLeon/article/details/122623465)

- 安装 maven仓库

[food-buddy软件云盘](https://cloud.189.cn/web/share?code=zUjmQjbINJ3u)（访问码：io1r）

[推荐教程](https://blog.csdn.net/weixin_46485638/article/details/134722278?fromshare=blogdetail&sharetype=blogdetail&sharerId=134722278&sharerefer=PC&sharesource=qq_74952367&sharefrom=from_link)

> ！注意，MAVEN需要配置环境变量

- mysql数据库

[food-buddy软件云盘](https://www.alipan.com/s/38myCHbBcZc)

[推荐教程](https://blog.csdn.net/aaahuahua/article/details/119305769)

安装中，数据库的账号密码请做以下设置：

name=**root**

password=**11111111**

- Navicat

[food-buddy软件云盘](https://www.alipan.com/s/38myCHbBcZc)

#### 4.2 修改后端配置

在`diet_return`目录下，`main.resources`的`application.properties`文件中修改下面的语句，

将对应python路径和三个py文件的绝对路径，按以下格式写出

```
upload.pyload=D:\\\\python\\\\python.exe
upload.advice=D:\\\\diet\\\\food-buddy\\\\llm_server\\\\dietary_advice\\\\dietary_advice.py
upload.judge=D:\\\\diet\\\\food-buddy\\\\llm_server\\\\recommended_dishes\\\\recommended_judgment.py
upload.dishes=D:\\\\diet\\\\food-buddy\\\\llm_server\\\\recommended_dishes\\\\recommended_dishes.py
upload.add=D:\\\\diet\\\\food-buddy\\\\llm_server\\\\recommended_dishes\\\\add_in_userdb.py
```

## 二、运行项目

### （一）启动AI端

用Pycharm打开food-buddy项目

1.指定在项目运行时，Python的位置

[推荐教程](https://blog.csdn.net/qq_39516859/article/details/80068910)

2.启动chat小后端

为了实现AI与前端的实时通信，使用了websocket技术，可以理解为java后端内的一个小python后端。开启后chat功能才能正常

在llm_server目录下找到`base_memory_chat.py`文件，运行该文件

**AI小后端启动！** 

### （二）启动后端

用IDEA打开food-buddy项目

1.配置本地jdk

[推荐教程](https://www.quanxiaoha.com/idea/idea-set-jdk.html)

2.配置本地Maven

[下载教程/配置教程](https://blog.csdn.net/weixin_46485638/article/details/134722278?fromshare=blogdetail&sharetype=blogdetail&sharerId=134722278&sharerefer=PC&sharesource=qq_74952367&sharefrom=from_link)

！注意，这里要参照教程，配置国内**镜像**，大大提升下一步的下载速度

3.下载后端依赖

在pom.xml文件下，点击Maven更新图标，自动下载项目后端所有依赖

4.创建数据库

打开Navicat，连接MySQL软件

！注意，创建的数据库，需命名为`diet_manage`

运行food-buddy的sql文件，完成创建

[推荐教程](http://t.csdnimg.cn/4YylS)

5.启动后端

找到`diet_return`后端文件夹入口，在java的com.example目录下找到`DietReturnAPPlication.java`
运行这个文件

**后端启动！**

### （三）启动前端

1.打开HbuilderX，点击“编译”，等待编译完成

2.打开微信开发者工具，创建小程序。

3.（仅第一次需要）在微信开发者工具，点击“设置”————>“安全设置”————>打开“服务端口”

4.在微信开发者工具，继续次点击“编译”。**前端启动！**

**软件整个启动！**

# 🍀 致谢

- 感谢湖北师范大学董元和老师、熊旭辉老师的指导
- 感谢湖北师范大学青鸟工作室对本项目的大力支持
- 感谢上海人工智能实验室对本项目提供的算力支持

# 📧 联系方式

如果你对项目感兴趣，想要了解项目的全套解决方案，欢迎联系我们：verhancao@foxmail.com
