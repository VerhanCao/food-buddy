English | [简体中文](https://gitee.com/verhancao/food-buddy/blob/master/README.md)
<div align=center>
  <img src="https://gitee.com/verhancao/dietary-health-program/raw/master/resource/figures/gitee%E5%AE%A3%E4%BC%A0%E7%85%A7.png" width="600px">
</div>

Diet Buddy is a native mini-program for managing diet, with the following advantages:

1. Accurate nutrition monitoring: After users record their meals, we will calculate the nutritional components and portions consumed and provide feedback to the users.
2. Effective dietary advice: The large model has been trained with a wealth of professional knowledge, and the dietary advice it provides is scientific and effective.
3. "Buddy" emotional companionship: The core highlight of the mini-program is Buddy, where we integrate the element of companionship into diet management, providing emotional value to users.
4. Provides a set of front-end and back-end uniapp, algorithm source code, open-source and learnable

# 🔗 Technical Architecture
<div align=center>
    <img src="https://gitee.com/verhancao/dietary-health-program/raw/master/resource/figures/%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84%E5%9B%BE.png" width="92%">
</div>

## Technology Selection

|Technology and Version|Role|Reason|
|--|--|--|
|Vue 3.x|Main development framework|Team members are more familiar with it|
|Tu Niao UI|Mobile component library|Adapt to mobile projects, mainstream|
|Spring Boot 2.7.x|Main development framework|Team members are more familiar with it, mainstream|
|Lombok|Annotation-based code generation|Saves development time|
|MySQL|Database|Good community, stable and easy to use|
|Yu Que Large Model API|Enables generation of responses based on prompts|Excellent at character扮演by Yu Que|
|51.LA|Website statistics|Free and easy to use|

# 🔒 Permission Information

This open-source project is based on the "[Apache LICENSE](https://gitee.com/verhancao/dietary-health-program/raw/master/LICENSE)", with two additional requirements:

1. Prohibition of using this software as part of any academic work or publication.
2. Prohibition of using this software as a product in any competition or contest.

# 🔥 Running the Standard Edition

<table style="margin: auto;">
  <tr>
    <td style="text-align: center;">
      <img src="https://gitee.com/verhancao/food-buddy/raw/master/resource/figures/%E8%81%8A%E5%A4%A9%E9%A1%B5%E9%9D%A2.png" alt="Chat Page" width="60%">
    </td>
    <td style="text-align: center;">
      <img src="https://gitee.com/verhancao/food-buddy/raw/master/resource/figures/%E9%A5%AE%E9%A3%9F%E8%AE%B0%E5%BD%95%E9%A1%B5%E9%9D%A2.png" alt="Diet Record Page" width="60%">
    </td>
  </tr>
</table>

[demo video demonstration](https://gitee.com/verhancao/food-buddy/raw/master/resource/figures/demo%E8%A7%86%E9%A2%91.mp4)

> Below is the structure of the core files
```
|-- food-buddy/
    |-- LICENSE  # License Certificate
    |-- README.en.md
    |-- README.md
    |-- diet_manage_user/
        |-- src/
    |-- diet_return/  # Backend Project Directory
        |-- src/
            |-- main.java/
                |-- com.example/
                    |-- DietReturnApplication  # Startup Class
                    |-- Contrller/
                        |-- ChatAdviceController  # Dietary Advice Controller
                        |-- ChatReturnController  # Chat Module
                        |-- DietAnalyseController  # Dietary Analysis Controller
                        |-- DietController  # Dietary Information Controller
                        |-- RecommendController  # Dish Recommendation Controller
                    |-- entity/  # Entity Class
                        |-- Diet  # Dietary Information
                        |-- NutritionStr  # Basic Nutrition
                        |-- Result  # Unified Interface
                        |-- User  # User Information
                    |-- Mapper/
                        |-- ChatAdviceMapper  # Dietary Advice Query User Target
                        |-- DataMapper  # Query Today's Dietary Information and Dishes
                        |-- DietMapper  # Query This Week's Dietary Information and New Information
                    |-- Service/
                        |-- ChatAdviceService  # Dietary Advice Logic Layer
                        |-- DietAnalyseService  # Dietary Analysis Logic Layer
                        |-- DietService  # Dietary Information Logic Layer
                        |-- RecommendService  # Dish Recommendation Logic Layer
            |-- main.resources/
                |-- com.example.Mapper/  # Mapping Files
                    |-- ChatAdviceMapper.xml
                    |-- DataMapper.xml
                    |-- DietMapper.xml
                |-- application.properties  # Configuration File
            |-- pom.xml  # Configuration File
    |-- llm_server/  # Large Model Service Project Directory
        |-- chat_response/  
            |-- memory_db  # User Memory Database
            |-- base_memory_chat.py  # Chat Dialogue Module
        |-- dietary_advice/
            |-- dietary_advice.py  # Dietary Advice Module
        |-- recommended_dishes/
            |-- add_in_userdb.py
            |-- recommended_dishes.py  # Dish Recommendation Module
            |-- recommended_judgment.py  # Dietary Intervention Evaluation Module
        |-- config_ai.py  # AI Configuration File
        |-- requirements.txt  # AI Library Dependencies
    |-- tuniao_uniapp/  # Front-end Project Directory
        |-- src/
            |-- App.vue  # Project Startup File
            |-- pages
                |-- chat/chat.vue  # Large Model Chat Page
                |-- diet/diet.vue  # Diet Management Main Page
                |-- addDiet/addDiet.vue  # Add Dietary Record
                |-- personal/personal.vue  # Personal Center Page
                |-- login/login.vue  # Login Page
            |-- env.d.ts
            |-- main.ts  # Project Global File
            |-- manifest.json uniapp  # Mini Program Configuration (appid, etc.)
            |-- pages.json  # Global Routing Navigation Configuration
            |-- shime-uni.d.ts
            |-- shime-vue.d.ts
            |-- uni.scss  # Global Style File
```

**！！！ Beginners are strongly advised to listen to the tutorial video I recorded, which will popularize knowledge, and I hope everyone can get it running!** 

[Video Tutorial](http://)

## 1. Prepare the Running Environment
> Default prerequisites: Git tool has been downloaded
> 
> [food-buddy software cloud disk](https://www.alipan.com/s/38myCHbBcZc)
> 
> [Recommended Tutorial](http://t.csdnimg.cn/5KcaM)

### (i) Clone the Repository
```
git clone --depth 1 --branch master https://gitee.com/verhancao/food-buddy.git
```
### (ii) Download AI Dependencies
#### 2.1 Download AI Software
- Download PyCharm

[food-buddy software cloud disk](https://www.alipan.com/s/38myCHbBcZc)

[Recommended Tutorial](https://blog.csdn.net/stormjun/article/details/132721822)

- Download Python Interpreter

[food-buddy software cloud disk](https://www.alipan.com/s/38myCHbBcZc)

[Recommended Tutorial](https://blog.csdn.net/2301_78095812/article/details/139290210?ops_request_misc=&request_id=&biz_id=102&utm_term=python%E5%AE%89%E8%A3%85%E5%8F%8A%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-4-139290210.142^v100^pc_search_result_base3&spm=1018.2226.3001.4187)

> ! Python needs to configure environment variables

- Download Dependency Packages

Open the Command Prompt window and download AI dependencies to the `python` environment
```
pip install websockets
pip install volcengine-python-sdk
```
When downloading `volcengine-python-sdk`, there will be errors, [solution](https://github.com/volcengine/volcengine-python-sdk/issues/5)

#### 2.2 Modify Configuration Files
Open the project with PyCharm. In the `llm_server` directory, modify the `config_ai.py` file
```
# Set the API key for the Volcano Large Model
client = Ark(
    base_url="XXXXXXXXXX",
    ak="XXXXXXXXXX",
    sk="XXXXXXXXXX",
    api_key="XXXXXXXXXX"
)
```
Replace the above with your API key. [API Key Application Entrance / Volcano Engine](https://console.volcengine.com/)

### (iii) Download Front-end Software
#### 3.1 Install Software
- Install Node.js Environment

[food-buddy software cloud disk](https://www.alipan.com/s/38myCHbBcZc)

[Recommended Tutorial](https://blog.csdn.net/WHF__/article/details/129362462)

- Install HbuilderX

[food-buddy software cloud disk](https://cloud.189.cn/web/share?code=zUjmQjbINJ3u) (Access Code: io1r)

- Install WeChat Developer Tools

[food-buddy software cloud disk](https://www.alipan.com/s/38myCHbBcZc)

#### 3.2 Install Front-end Dependencies
Use the Command Prompt window to switch to the project `tuniao_uniapp` directory

Execute the following command to install front-end dependencies

```
npm install
```

### (iv) Download Back-end Software
#### 4.1 Install Software
> IDEA needs to download the enterprise version for easy use of the `SpringBoot` framework. (New accounts have a free 30-day trial period)
- Install IDEA

[food-buddy software cloud disk](https://www.alipan.com/s/38myCHbBcZc)

> ! Note that the Spring Boot back-end requires the IDEA enterprise version, and new accounts have a free 30-day trial period

- Install JDK

[food-buddy software cloud disk](https://www.alipan.com/s/38myCHbBcZc)

[Recommended Tutorial](https://blog.csdn.net/JunLeon/article/details/122623465)

- Install Maven Repository

[food-buddy software cloud disk](https://cloud.189.cn/web/share?code=zUjmQjbINJ3u) (Access Code: io1r)

[Recommended Tutorial](https://blog.csdn.net/weixin_46485638/article/details/134722278?fromshare=blogdetail&sharetype=blogdetail&sharerId=134722278&sharerefer=PC&sharesource=qq_74952367&sharefrom=from_link)

> ! Note that MAVEN needs to configure environment variables

- MySQL Database

[food-buddy software cloud disk](https://www.alipan.com/s/38myCHbBcZc)

[Recommended Tutorial](https://blog.csdn.net/aaahuahua/article/details/119305769)

During installation, set the database account and password as follows:

name=**root**

password=**11111111**

- Navicat

[food-buddy software cloud disk](https://www.alipan.com/s/38myCHbBcZc)

#### 4.2 Modify Back-end Configuration

In the `diet_return` directory, modify the following statements in the `application.properties` file under `main.resources`

Write the corresponding Python path and the absolute paths of the three py files in the following format

```
upload.pyload=D:\\\\python\\\\python.exe
upload.advice=D:\\\\diet\\\\food-buddy\\\\llm_server\\\\dietary_advice\\\\dietary_advice.py
upload.judge=D:\\\\diet\\\\food-buddy\\\\llm_server\\\\recommended_dishes\\\\recommended_judgment.py
upload.dishes=D:\\\\diet\\\\food-buddy\\\\llm_server\\\\recommended_dishes\\\\recommended_dishes.py
upload.add=D:\\\\diet\\\\food-buddy\\\\llm_server\\\\recommended_dishes\\\\add_in_userdb.py
```

## II. Run the Project
### (i) Start AI End
Open the food-buddy project with PyCharm

1. Specify the location of Python when running the project

[Recommended Tutorial](https://blog.csdn.net/qq_39516859/article/details/80068910)

2. Start chat small back-end

In order to achieve real-time communication between AI and front-end, websocket technology is used, which can be understood as a small python back-end within java back-end. The chat function can only work normally after it is enabled

Find the `base_memory_chat.py` file in the llm_server directory and run the file

**AI small back-end started!**

### (ii) Start Back-end
Open the food-buddy project with IDEA

1. Configure local JDK

[Recommended Tutorial](https://www.quanxiaoha.com/idea/idea-set-jdk.html)

2. Configure local Maven

[Download Tutorial / Configuration Tutorial](https://blog.csdn.net/weixin_46485638/article/details/134722278?fromshare=blogdetail&sharetype=blogdetail&sharerId=134722278&sharerefer=PC&sharesource=qq_74952367&sharefrom=from_link)

! Note that you need to refer to the tutorial to configure the domestic **mirror**, which greatly improves the download speed in the next step

3. Download back-end dependencies

Under the pom.xml file, click the Maven update icon to automatically download all dependencies of the project back-end

4. Create a database

Open Navicat and connect to MySQL software

! Note that the created database must be named `diet_manage`

Run the food-buddy sql file to complete the creation

[Recommended Tutorial](http://t.csdnimg.cn/4YylS)

5. Start back-end

Find the `diet_return` back-end folder entrance, and in the java com.example directory, find `DietReturnAPPlication.java`
Run this file

**Back-end started!**

### (iii) Start Front-end
1. Open HbuilderX, click "Compile", and wait for the compilation to complete

2. Open WeChat Developer Tools and create a mini-program.

3. (Only the first time required) In WeChat Developer Tools, click "Settings" -> "Security Settings" -> Enable "Service Port"

4. In WeChat Developer Tools, continue to click "Compile". **Front-end started!**

**The entire software has started!**

# 🍀 Acknowledgements

- Thank you to Dong Yuanhe and Xiong Xuhui teachers from Hubei Normal University for their guidance
- Thank you to Qingniao Studio of Hubei Normal University for their strong support for this project
- Thank you to Shanghai Artificial Intelligence Laboratory for providing computing power support for this project

# 📧 Contact Information

If you are interested in the project and want to learn about the full set of solutions for the project, please contact us: verhancao@foxmail.com