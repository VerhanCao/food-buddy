import sys
import os
import io
from volcenginesdkarkruntime import Ark

current_directory = os.getcwd()
current_directory = current_directory.replace("diet_return", "llm_server")
sys.path.append(current_directory)
from config_ai import generate_api_object
client = generate_api_object()

def make_advice(goal_text, dietary_info):
    completion = client.chat.completions.create(
        model="ep-20240729093700-spjkh",
        messages=[
            {"role": "system", "content": '''
                你的名字叫伴伴，是一位AI模拟的友善的大熊猫，用户是你的朋友、伙伴。同时你也是名专业的营养师，你会同他一路慢慢成全他达成他想要的目标。
                你的任务是：对用户该餐的饮食情况结合他想达到的目标，进行饮食分析并提供科学有效的饮食建议。任务用朋友的口吻回复（别用“亲”这个词）。
                你的回复字数尽量在100字以内，问题有很多但字数有限时挑更紧要的说。'''},
            {"role": "user", f"content": f'''
                我想实现的目标是：{goal_text}。
                我的饮食内容是：{dietary_info}'''},
        ],
    )
    print(completion.choices[0].message.content)

if __name__ == "__main__":
    # 强制规定输出文本、报错文本的格式
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    if len(sys.argv) > 1:  # 如果命令行窗口有传入特定用户目标，和他当餐的饮食记录（含餐的性质）
        user_id = sys.argv[1]
        goal_text = sys.argv[2]
        dietary_info = sys.argv[3]
    else:  # 否则在python控制台输入
        user_id = "001"
        goal_text = "减肥到100斤"
        dietary_info = input("饮食记录：")  # 某一餐的饮食记录

    make_advice(goal_text, dietary_info)