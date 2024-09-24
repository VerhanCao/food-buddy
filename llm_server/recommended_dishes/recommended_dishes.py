import io
import os
import sys
from volcenginesdkarkruntime import Ark


current_directory = os.getcwd()
current_directory = current_directory.replace("diet_return", "llm_server")
sys.path.append(current_directory)
from config_ai import generate_api_object
client = generate_api_object()


def recommended_dishes(user_id, goal_text, dietary_info, quantify_info):
    user_db = ''
    if os.path.exists(f"./user_dishes_db/{user_id}_db.txt"):  # 如果该用户记忆文件存在就r模式
        f = open(f"./user_dishes_db/{user_id}_db.txt", "r+", encoding="utf-8")
        user_db = f.read()
    else:  # 否则w模型
        pass

    completion = client.chat.completions.create(
        model="ep-20240802095008-dmklk",
        messages=[
            {"role": "system", "content": f'''
                    你是名专业的营养师，目前用户的饮食情况有待干预，你的任务是在该用户的个人菜品库中，根据用户提供的目标、本周初至今的饮食内容、当天定量信息，为当下的未来时刻设计出1或2道菜品，设计范围是当下的下一餐到本周的结束。
                    设计请按指定格式输出，格式我在设计例子中为你说明。
                    请把设计的菜品以“<|>星期二-早餐-099-牛肉面<|>星期五-早餐-212-豆浆<|>星期五-午餐-876-青椒炒肉”中展现的格式以一行输出，里面的数字是菜品id，请把“id-菜品名”作为个整体操作，另外不要添加引号。
                    设计星期的范围：从今天的星期几到星期日。
                    餐的性质包含4种：早餐；午餐；晚餐；副食（饮食时间不规定）。
                    设计的菜品从下面菜品库中选取（菜品之间的分割符号用了"<|>"）：{user_db}
                    面对用户现在的问题，如果你认为仅从这个菜品库范围中无法进行针对问题的有效菜品设计，请回复：“设计失败”
                    '''},
            {"role": "user", "content": f'''
                    我的饮食管理目标是：{goal_text}
                    我本周初至今的饮食内容：{dietary_info}
                    我今天截止当下我的营养监控为：{quantify_info}
                    请先思考我的饮食情况是否需要做出干预，然后再思考菜品库里是否有合适的设计菜品，然后再去为我设计。
                    现在请为在未来我设计1或2道菜品，注意这些设计是应该是符合常理的，并且可以改善我现在的饮食问题，利于达到我的目标，否则请回复：“设计失败”
                    请开始你的任务！只用输出设计的菜品（不需要设计出食用量同时是要你在一个菜品设计中不要出现多道菜品，“星期二-晚餐-烤鸡胸肉150克、糙米饭150克”这样的设计是不符合要求的），除此之外不要输出任何多余的内容。'''},
        ],
    )

    print(completion.choices[0].message.content)


if __name__ == "__main__":
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')
    sys.stdout = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')

    if len(sys.argv) > 1:  # 如果命令行窗口有传入特定用户目标，和他当餐的饮食记录（含餐的性质）
        user_id = sys.argv[1]
        goal_text = sys.argv[2]
        dietary_info = sys.argv[3]
        quantify_info = sys.argv[4]
    else:  # 否则在python控制台输入
        user_id = "001"
        goal_text = "减肥到100斤"
        # dietary_info = input("饮食记录：")
        dietary_info = "周一：早餐-煮鸡蛋3个、全麦吐司2片、牛奶500毫升；午餐-烤鸡胸肉150克、糙米饭150克、清蒸西兰花100克；晚餐-三文鱼200克、烤红薯200克、炒菠菜150克。周二：早餐-燕麦片1杯、酸奶200克、坚果30克；午餐-牛肉炒饭（牛肉100克、米饭150克）、炒青菜150克；晚餐-烤鸡腿200克、紫米饭200克、清炒四季豆100克。"
        # quantify_info = input("当天定量监控：")
        quantify_info = "周二：蛋白质：约62-72g；碳水化合物：约160g；脂肪：约37-42g (主要为不饱和脂肪)；纤维：约22g"

    recommended_dishes(user_id, goal_text, dietary_info, quantify_info)