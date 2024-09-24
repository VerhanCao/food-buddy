import asyncio
import websockets
import sys
import os.path
from volcenginesdkarkruntime import Ark

'''
大体思路：
1.开启websocks服务器，如果收到前端消息就进行处理
2.将传来的[user_id]和[prompt],结合记忆喂给豆包大模型
    2.1一个用户只有一个记忆容器，最后7轮对话为短时记忆
    2.2前面(end-7)往前80轮对话为长时记忆。长时记忆是帮助生成长时回忆用的。
    2.3模型基于 短时记忆 + 长时记忆回忆 + 当前的prompt 生成回复
3.拿到response，流式输出给前端
'''

sys.path.append('../')
port_number = "9999"  # 交流的端口号为9999

from config_ai import generate_api_object
client = generate_api_object()

# client = Ark(
#         base_url="https://ark.cn-beijing.volces.com/api/v3",
#         ak="AKLTNDg4YzA4OGVjZWFjNGU1Zjk2ZjViZjJhMTJkYmRjYzM",
#         sk="TmpCbVlqVTRPVFEyWlRabU5HRTBObUk0TWpZMU5UTTRPRE5qWm1ZMk1qVQ==",
#         api_key="cecbf2cb-d017-407e-9b85-bc3ef79e68ae"
# )


def load_memory(user_id, f):
    """
    Input: user_id, f
    function：在用户的记忆文件中选取 短时记忆 和长时记忆
    Return: 短时记忆, 长时记忆
    """
    memory = f.read()  # 读取文件中所有内容
    memory_lst = memory.split("<|>")  # 以"<|>"来分割字符串到memory_lst列表

    if len(memory_lst) == 0:  # if如果列表长度为0。是第一次创建文件
        return None, None

    memory_lst.pop(0)  # 剔除掉memory第一个元素，因为它是空
    memory_lst.reverse()  # 将记忆进行转反转。最新轮对话在0下标
    lst_len = len(memory_lst)  # 计算列表的长度到lst_len

    short_history_lst = []  # 存储过去的7条记忆的容器
    long_history_lst = []  # 存储80条记忆的容器

    i = 0
    if lst_len < 87:
        end_index = lst_len - 1
    else:
        end_index = 86

    while i <= end_index:
        if 0 <= i <= 6:
            short_history_lst.append(memory_lst[i])
        else:
            long_history_lst.append(memory_lst[i])
        i += 1

    # 将记忆列表专置。将最新的对话最后输入到模型，权重更高，有利于模型生成更好的结果
    short_history_lst.reverse()
    long_history_lst.reverse()

    return "".join(short_history_lst), "".join(long_history_lst)


async def model_response(websocket):
    while True:
        user_id = await websocket.recv()
        if user_id == "-1":
            break

        prompt = await websocket.recv()

        # 为管理短时记忆做准备，创建文件流
        if os.path.exists(f"./memory_db/{user_id}.txt"):  # 如果该用户记忆文件存在就r模式
            f = open(f"./memory_db/{user_id}.txt", "r+", encoding="utf-8")
        else:  # 否则w模型
            f = open(f"./memory_db/{user_id}.txt", "w+", encoding="utf-8")

        # 加载短时、长时记忆
        short_history, long_history = load_memory(user_id, f)

        # 根据当前用户的prompt在长时记忆中检索出相关内容
        long_rela_history = client.chat.completions.create(
            model="ep-20240901195748-6xtbt",
            messages=[
                {"role": "system", "content": '''
                    你是一个匹配相关片段非常准确的向量数据库，你的任务就是在用户提供的长时记忆内容中找出与当前用户propmt非常相关的记忆片段，并以回复的形式输出。
                    注意返回的内容要与用户给的长时记忆匹配到的内容保持一致，不要更改任何信息。如果未匹配到非常相关内容，就回复：无'''
                 },
                {"role": "user", "content": f'''
                    <长时记忆>
                    {long_history}
                    </长时记忆>
                    请基于以上的长时记忆生成与以下prompt相关的原文片段
                    propmt:{prompt}'''
                 }
            ],
            stream=False
        ).choices[0].message.content

        # print(long_rela_history)

        stream = client.chat.completions.create(
            model="ep-20240729093700-spjkh",
            messages=[
                {"role": "system", "content": '''
                    你的名字叫伴伴，是一位AI模拟的友善的大熊猫。人类是你最重要的朋友，你可以陪人类口语化的聊天，能给予人类情感上的依靠。
                    同时你也是名专业的营养师，能为用户提供科学有效的饮食相关的知识。现在你正与这位用户朋友进行交谈，以下是他的话语，你当前要做的就是回应他！
                    '''},

                {"role": "user", "content": f'''
                以下是你与该用户过去对话中相关内容的回忆
                <长时记忆的相关回忆>
                {long_rela_history}
                </长时记忆的相关回忆>

                以下是你与该用户对话的短期记忆
                <短时记忆>
                {short_history}
                </短时记忆>

                记忆帮助你更好的回复，但有时它们是无用的，请保持灵活。
                当前人类对你的话语是：{prompt}
                '''},
            ],
            stream=True
        )

        now_dialogue = {'prompt': prompt, 'response_lst': []}

        for chunk in stream:
            if not chunk.choices:
                continue
            now_dialogue['response_lst'].append(chunk.choices[0].delta.content)
            await websocket.send(chunk.choices[0].delta.content)
        await websocket.send("回复结束")

        # 把本轮对话存入短期记忆
        response = ''.join(now_dialogue['response_lst'])
        f.write(f"<|>人类：{prompt}\nAI：{response}\n")  # 正确被写入到末尾是因为read方法
        f.close()


async def main():
    async with websockets.serve(model_response, "localhost", port_number,
                                ping_interval=None):  # 这里做了个下策的操作，把ping_interval设置为了None，后端与前端取消了通过发送ping来确认连接。recv等待久了不会报错
        await asyncio.Future()


if __name__ == "__main__":
    asyncio.run(main())