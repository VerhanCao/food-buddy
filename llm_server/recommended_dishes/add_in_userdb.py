import io
import os
import sys

def addtion_dishes(user_id, dishes_info):
    dish_list = dishes_info.split("<|>")
    dish_list.pop(0)  # 不能与split合并到一起写，注意pop的返回值

    if os.path.exists(f"./user_dishes_db/{user_id}_db.txt"):  # 如果该用户记忆文件存在就r模式
        f = open(f"./user_dishes_db/{user_id}_db.txt", "r+", encoding="utf-8")
    else:  # 否则w模型
        f = open(f"./user_dishes_db/{user_id}_db.txt", "w+", encoding="utf-8")

    str_db = f.read()
    # 如果是第一次创建文件，pop会报错，加个判断
    if str_db:
        lst_db = str_db.split("<|>")
        lst_db.pop(0)
    else:
        lst_db = list(str_db)

    set_db = set(lst_db)
    for dish in dish_list:
        set_db.add(dish)

    f.seek(0)  # 指针调回最前，覆盖文本
    for dish in set_db:
        f.write(f"<|>{dish}")

    f.close()

if __name__ == "__main__":
    # 强制规定输出文本、报错文本的格式
    sys.stderr = io.TextIOWrapper(sys.stderr.buffer, encoding='utf-8')
    sys.stdout = io.TextIOWrapper(sys.stdout.buffer, encoding='utf-8')

    if len(sys.argv) > 1:  # 如果命令行传入了用户的id和用户食用过菜品的列表（只需要菜品名，以换行（\n）间隔）
        user_id = sys.argv[1]
        dishes_info = sys.argv[2]
    else:  # 否则在python控制台输入
        user_id = "001"
        dishes_info = "<|>煮鸡蛋<|>全麦吐司<|>牛奶<|>烤鸡胸肉<|>糙米饭<|>清蒸西兰花<|>三文鱼<|>烤红薯<|>炒菠菜<|>燕麦片<|>酸奶<|>坚果<|>牛肉炒饭<|>炒青菜<|>烤鸡腿<|>紫米饭<|>清炒四季豆<|>全麦面包<|>鲜榨果汁<|>香煎猪排<|>荞麦面<|>炒花椰菜<|>烤鱼<|>蒸紫薯<|>炒油麦菜<|>麦片<|>黑椒牛肉意面<|>蒸胡萝卜<|>烤鸡翅<|>糙米饭<|>炒生菜<|>全麦吐司<|>低脂芝士片<|>鲜榨橙汁<|>香煎鸡胸肉<|>三色糙米饭<|>炒芦笋<|>烤羊排<|>蒸山药<|>清炒豆芽<|>煮鸡蛋<|>玉米片<|>酸奶<|>红烧猪肉<|>藜麦饭<|>清蒸南瓜<|>水煮鱼片<|>烤土豆<|>炒苦瓜<|>全麦面包<|>花生酱<|>牛奶<|>烤火腿肉<|>白米饭<|>清蒸豆角<|>烤羊肉<|>红薯粥<|>清炒空心菜"

    addtion_dishes(user_id, dishes_info)