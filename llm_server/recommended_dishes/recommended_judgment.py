import io
import sys
import os
from volcenginesdkarkruntime import Ark

current_directory = os.getcwd()
current_directory = current_directory.replace("diet_return", "llm_server")
sys.path.append(current_directory)
from config_ai import generate_api_object
client = generate_api_object()


def recommended_judgment(goal_text, dietary_info):
    response = client.chat.completions.create(
        model="ep-20240802095008-dmklk",
        messages=[
            {"role": "system", "content": '''
                你是一个打分系统。你的任务是根据用户提供目标和他一定范围的饮食内容（本周初至今），分析用户饮食是否有助于目标达成，是否有害、背离目标等后，分析完后在他的目标下对他的饮食内容进行打分。注意，请先分析，再完成分析前请不要作答
                评分的标准是认可程度，强烈认可他整体的饮食行为，得分为10；强烈不认可他整体的饮食行为，得分为0；其余程度为中间值。6分以下为不及格，如果6分以下意味着后面营养师会对他接下来的饮食进行规范帮助他达到目标。'''},
            {"role": "user", f"content": f'''
                我的目标是：{goal_text}。
                我的饮食内容是：{dietary_info}
                作答时你只需要给出得分数字，不要发其他任何内容。'''},
        ],
    )
    print(response.choices[0].message.content)


if __name__ == "__main__":
    # 强制规定输出文本、报错文本的格式
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    if len(sys.argv) > 1:  # 如果命令行窗口有传入特定用户目标，和他当前周的饮食内容（含星期几、餐的性质）。注意：饮食内容不要包含换行符。
        user_id = sys.argv[1]
        goal_text = sys.argv[2]
        dietary_info = sys.argv[3]
    else:  # 否则在python控制台输入
        user_id = "001"
        goal_text = "增肌"
        dietary_info = '''周一：早餐-煮鸡蛋3个、全麦吐司2片、牛奶500毫升；午餐-烤鸡胸肉150克、糙米饭150克、清蒸西兰花100克；晚餐-三文鱼200克、烤红薯200克、炒菠菜150克。周二：早餐-燕麦片1杯、酸奶200克、坚果30克；午餐-牛肉炒饭（牛肉100克、米饭150克）、炒青菜150克；晚餐-烤鸡腿200克、紫米饭'''

    recommended_judgment(goal_text, dietary_info)