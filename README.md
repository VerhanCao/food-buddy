English | [Simplified Chinese](https://github.com/VerhanCao/food-buddy/blob/main/README_zh.md)

<div align=center>
  <img src="https://github.com/VerhanCao/food-buddy/blob/main/resource/figures/gitee%E5%AE%A3%E4%BC%A0%E7%85%A7.png" width="600px">
</div>

Food Buddy is a native large-model app for managing diet. Key advantages include:

1. Precise Nutritional Monitoring: After users log their meals, we calculate the nutritional content and quantities consumed, providing feedback to users.
2. Effective Dietary Advice: Our large model, trained with extensive professional knowledge, provides scientifically sound dietary advice.
3. "Companion" Emotional Support: A standout feature of our app is the "Companion," integrating partnership elements into diet management to offer emotional value to users.
4. Provides a full-stack solution with open-source front-end and back-end code in uniapp, along with algorithm source code for learning purposes.

# 🔗 Technical Architecture
<div align=center>
    <img src="https://github.com/VerhanCao/food-buddy/blob/main/resource/figures/%E6%8A%80%E6%9C%AF%E6%9E%B6%E6%9E%84%E5%9B%BE.png" width="92%">
</div>

## Technology Stack

| Technology & Version | Purpose | Reason |
|--|--|--|
| Vue 3.x | Main development framework | Familiarity with team members |
| Tuniao UI | Mobile component library | Suitable for mobile projects, mainstream |
| Spring Boot 2.7.x | Main development framework | Team familiarity, mainstream |
| Lombok | Annotation-based code generation | Saves development time |
| MySQL | Database | Well-supported community, stable and easy to use |
| Yuque Large Model API | Enables response generation based on prompts | Yuque excels in character simulation |
| 51.LA | Website analytics | Free and easy to use |

# 🔒 License Information

This open-source project is based on the "[Apache LICENSE](https://github.com/VerhanCao/food-buddy/blob/main/LICENSE)",

With two additional requirements:

1. The software must not be used as part of any academic work or publication.
2. The software must not be used in any contest or competition as a product entry.

# 🔥 Running the Standard Version

<table style="margin: auto;">
  <tr>
    <td style="text-align: center;">
      <img src="https://github.com/VerhanCao/food-buddy/blob/main/resource/figures/%E8%81%8A%E5%A4%A9%E9%A1%B5%E9%9D%A2.png" alt="Chat Page" width="60%">
    </td>
    <td style="text-align: center;">
      <img src="https://github.com/VerhanCao/food-buddy/blob/main/resource/figures/%E9%A5%AE%E9%A3%9F%E8%AE%B0%E5%BD%95%E9%A1%B5%E9%9D%A2.png" alt="Diet Log Page" width="60%">
    </td>
  </tr>
</table>

[Demo Video](https://gitee.com/verhancao/food-buddy/raw/master/resource/figures/demo%E8%A7%86%E9%A2%91.mp4)

> Below is the structure of the core files:
```
|-- food-buddy/
    |-- LICENSE  # License
    |-- README.en.md
    |-- README.md
    |-- diet_manage_user/
        |-- src/
    |-- diet_return/  # Backend project directory
        |-- src/
            |-- main.java/
                |-- com.example/
                    |-- DietReturnApplication  # Entry class
                    |-- Controller/
                        |-- ChatAdviceController  # Dietary advice controller layer
                        |-- ChatReturnController  # Chat module
                        |-- DietAnalyseController  # Dietary analysis controller layer
                        |-- DietController  # Dietary information controller layer
                        |-- RecommendController  # Dish recommendation controller layer
                    |-- entity/  # Entity classes
                        |-- Diet  # Dietary information
                        |-- NutritionStr  # Basic nutrition
                        |-- Result  # Unified interface
                        |-- User  # User information
                    |-- Mapper/
                        |-- ChatAdviceMapper  # Dietary advice query target
                        |-- DataMapper  # Query daily dietary information and dishes
                        |-- DietMapper  # Query weekly dietary information and additions
                    |-- Service/
                        |-- ChatAdviceService  # Dietary advice logic layer
                        |-- DietAnalyseService  # Dietary analysis logic layer
                        |-- DietService  # Dietary information logic layer
                        |-- RecommendService  # Dish recommendation logic layer
            |-- main.resources/
                |-- com.example.Mapper/  # Mapping files
                    |-- ChatAdviceMapper.xml
                    |-- DataMapper.xml
                    |-- DietMapper.xml
                |-- application.properties  # Configuration file
            |-- pom.xml  # Configuration file
    |-- llm_server/  # Large model service project directory
        |-- chat_response/  
            |-- memory_db  # User memory database
            |-- base_memory_chat.py  # Chat interaction module
        |-- dietary_advice/
            |-- dietary_advice.py  # Dietary advice module
        |-- recommended_dishes/
            |-- add_in_userdb.py
            |-- recommended_dishes.py  # Dish recommendation module
            |-- recommended_judgment.py  # Dietary intervention evaluation module
        |-- config_ai.py  # AI configuration file
        |-- requirements.txt  # Library dependencies for AI
    |-- tuniao_uniapp/  # Frontend project directory
        |-- src/
            |-- App.vue  # Project entry file
            |-- pages
                |-- chat/chat.vue  # Large model chat page
                |-- diet/diet.vue  # Main diet management page
                |-- addDiet/addDiet.vue  # Add diet log
                |-- personal/personal.vue  # Personal center page
                |-- login/login.vue  # Login page
            |-- env.d.ts
            |-- main.ts  # Global project file
            |-- manifest.json uniapp  # Mini-program configuration (appid, etc.)
            |-- pages.json  # Global route navigation configuration
            |-- shime-uni.d.ts
            |-- shime-vue.d.ts
            |-- uni.scss  # Global style file
```

**!!! Strongly recommended for beginners to watch the tutorial video I recorded, as it explains the knowledge necessary for this project. I hope everyone can get it running!**

[Tutorial Video](http://)

## I. Preparing the Runtime Environment
> Default prerequisite: Git tool downloaded
> 
> [Food Buddy Software Cloud Drive](https://www.alipan.com/s/38myCHbBcZc)
> 
> [Recommended Tutorial](http://t.csdnimg.cn/5KcaM)

### (I) Clone the Repository
```bash
git clone --depth 1 --branch master https://gitee.com/verhancao/food-buddy.git
```

### (II) Download AI Dependencies
#### 2.1 Download AI Software
- Download PyCharm

[Food Buddy Software Cloud Drive](https://www.alipan.com/s/38myCHbBcZc)

[Recommended Tutorial](https://blog.csdn.net/stormjun/article/details/132721822)

- Download Python Interpreter

[Food Buddy Software Cloud Drive](https://www.alipan.com/s/38myCHbBcZc)

[Recommended Tutorial](https://blog.csdn.net/2301_78095812/article/details/139290210?ops_request_misc=&request_id=&biz_id=102&utm_term=python%E5%AE%89%E8%A3%85%E5%8F%8A%E7%8E%AF%E5%A2%83%E9%85%8D%E7%BD%AE&utm_medium=distribute.pc_search_result.none-task-blog-2~all~sobaiduweb~default-4-139290210.142^v100^pc_search_result_base3&spm=1018.2226.3001.4187)

> ! Python needs to be added to the environment variable

- Download dependencies

Open Command Prompt and install AI dependencies in the `python` environment
```bash
pip install websockets
pip install volcengine-python-sdk
```

During the installation of `volcengine-python-sdk`, errors may occur. [Solution here](https://github.com/volcengine/volcengine-python-sdk/issues/5)

#### 2.2 Modify Configuration Files
Open the project with Pycharm. In the `llm_server` directory, modify the `config_ai.py` file
```python
# Set API key for Volcengine Large Model
client = Ark(
    base_url="XXXXXXXXXX",
    ak="XXXXXXXXXX",
    sk="XXXXXXXXXX",
    api_key="XXXXXXXXXX"
)
```

Replace the above with your API key. [API key application/Volcengine](https://console.volcengine.com/)

### (III) Download Frontend Software
#### 3.1 Install Software
- Install Node.js Environment

[Food Buddy Software Cloud Drive](https://www.alipan.com/s/38myCHbBcZc)

[Recommended Tutorial](https://blog.csdn.net/WHF__/article/details/129362462)

- Install HbuilderX

[Food Buddy Software Cloud Drive](https://cloud.189.cn/web/share?code=zUjmQjbINJ3u) (Access Code: io1r)

- Install WeChat Developer Tool

[Food Buddy Software Cloud Drive](https://www.alipan.com/s/38myCHbBcZc)

#### 3.2 Install Frontend Dependencies
Using Command Prompt, navigate to the project's `tuniao_uniapp` directory

Run the following command to install frontend dependencies:

```bash
npm install
```

### (IV) Download Backend Software
#### 4.1 Install Software
> IntelliJ IDEA enterprise version is required for ease of using `SpringBoot` framework. (New accounts have a free 30-day trial period)
- Install IDEA

[Food Buddy Software Cloud Drive](https://www.alipan.com/s/38myCHbBcZc)

> ! Note that Springboot backend requires IDEA enterprise edition. New accounts have a free 30-day usage period

- Install JDK

[Food Buddy Software Cloud Drive](https://www.alipan.com/s/38myCHbBcZc)

[Recommended Tutorial](https://blog.csdn.net/JunLeon/article/details/122623465)

- Install Maven Repository

[Food Buddy Software Cloud Drive](https://cloud.189.cn/web/share?code=zUjmQjbINJ3u) (Access Code: io1r)

[Recommended Tutorial](https://blog.csdn.net/weixin_46485638/article/details/134722278?fromshare=blogdetail&sharetype=blogdetail&sharerId=134722278&sharerefer=PC&sharesource=qq_74952367&sharefrom=from_link)

> ! Note, MAVEN needs to be added to the environment variable

- Install MySQL Database

[Food Buddy Software Cloud Drive](https://www.alipan.com/s/38myCHbBcZc)

[Recommended Tutorial](https://blog.csdn.net/aaahuahua/article/details/119305769)

During installation, please set the database account password as follows:

name=**root**

password=**11111111**

- Install Navicat

[Food Buddy Software Cloud Drive](https://www.alipan.com/s/38myCHbBcZc)

#### 4.2 Modify Backend Configuration

In the `diet_return` directory, under `main.resources`, modify the `application.properties` file with the following statements:

Specify the path of your Python and the three `.py` files as shown below:

```properties
upload.pyload=D:\\\\python\\\\python.exe
upload.advice=D:\\\\diet\\\\food-buddy\\\\llm_server\\\\dietary_advice\\\\dietary_advice.py
upload.judge=D:\\\\diet\\\\food-buddy\\\\llm_server\\\\recommended_dishes\\\\recommended_judgment.py
upload.dishes=D:\\\\diet\\\\food-buddy\\\\llm_server\\\\recommended_dishes\\\\recommended_dishes.py
upload.add=D:\\\\diet\\\\food-buddy\\\\llm_server\\\\recommended_dishes\\\\add_in_userdb.py
```

## II. Running the Project
### (I) Start the AI Endpoint
Use Pycharm to open the food-buddy project

1. Specify the location of Python during project runtime

[Recommended Tutorial](https://blog.csdn.net/qq_39516859/article/details/80068910)

2. Start the chat backend

To enable real-time communication between AI and the frontend, websocket technology is used. It can be understood as a small python backend within the java backend. Activate it for the chat function to work normally.

In the `llm_server` directory, find the `base_memory_chat.py` file and run it (install any missing packages).

**AI backend started!**

### (II) Start the Backend
Open the food-buddy project with IDEA

1. Configure the local JDK

[Recommended Tutorial](https://www.quanxiaoha.com/idea/idea-set-jdk.html)

2. Configure the local Maven

[Download Tutorial/Configuration Tutorial](https://blog.csdn.net/weixin_46485638/article/details/134722278?fromshare=blogdetail&sharetype=blogdetail&sharerId=134722278&sharerefer=PC&sharesource=qq_74952367&sharefrom=from_link)

! Note, refer to the tutorial to configure the domestic **mirror** to significantly improve the download speed in the next step

3. Download Backend Dependencies

In the pom.xml file, click the Maven update icon to automatically download all the dependencies for the backend project

4. Create a Database

Use Navicat to connect to MySQL

! Note, the created database should be named `diet_manage`

Run the SQL file in the food-buddy project to complete the setup

[Recommended Tutorial](http://t.csdnimg.cn/4YylS)

5. Start the Backend

Find the `diet_return` backend entry in the java `com.example` directory, locate `DietReturnApplication.java` and run it.

**Backend started!**

### (III) Start the Frontend
1. Open HbuilderX, click "Compile," and wait for compilation to complete

2. Open the WeChat Developer Tool, create a mini program.

3. (Required only the first time) In the WeChat Developer Tool, click "Settings" -> "Security Settings" -> Enable "Server Port".

4. Continue to click "Compile" in the WeChat Developer Tool. **Frontend started!**

**The entire software is now running!**

# 🍀 Acknowledgments

- Special thanks to Professors Dong Yuanhe and Xiong Xuhui from Hubei Normal University for their guidance
- Thanks to the Green Bird Studio of Hubei Normal University for their strong support of this project
- Thanks to the Shanghai AI Lab for providing computing power support for this project

# 📧 Contact Information

If you are interested in this project and want to learn more about the full solution, feel free to contact us at: verhancao@foxmail.com
