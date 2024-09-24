from volcenginesdkarkruntime import Ark

def generate_api_object():
    # 设置星火引擎API密钥
    client = Ark(
        base_url="XXXXXXXXX",
        ak="XXXXXXXXX",
        sk="XXXXXXXXX",
        api_key="XXXXXXXXX"
    )
    return client