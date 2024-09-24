<template>
	<view class="search">
			<view class="search-container">
				<uni-search-bar @input="input" :radius="20" bgColor="#F7F7F7" cancelButton="none"></uni-search-bar>
			</view>
			<!-- 搜索列表 -->
			<view v-if="searchList.length!=0">
				<view class="search-list" v-for="(searchItem,searchIndex) in searchList" :key="searchIndex" >
					<uni-icons type="search" size="18" color="#C0C0C0"/>
					<view class="search-item" >
						{{searchItem.word}}
					</view>
				</view>
			</view>
			<view v-else>
				<!-- 搜索历史 -->
				<view class="history">
					<view class="history-title">
						<text>历史搜索</text>
						<uni-icons type="trash" size="20" color="#C0C0C0" @click="clearHistory"></uni-icons>
					</view>
					<view class="history-content" v-if="historyList.length!=0">
						<view class="history-item" v-for="(historyItem,historyIndex) in historyList" :key="historyIndex">
							{{historyItem}}
						</view>
					</view>
					<view class="history-none" v-else>
						<text>无搜索历史</text>
					</view>
				</view>
				<!-- 搜索发现 -->
				<view class="found">
					<view class="found-title">
						<text>搜索发现</text>
						<uni-icons type="" size="20" color="#C0C0C0"></uni-icons>
					</view>
					<view class="found-content">
						<view class="found-item" v-for="(foundItem,foundIndex) in foundList" :key="foundIndex">
							{{foundItem}}
						</view>
					</view>
				</view>
			</view>
			
		</view>	
</template>

<script setup lang="ts">
	import { ref } from 'vue'
	// 初始化定时器为空
		let time = ref(null)
	// 用户输入的关键词
		let keyword = ref('')
	//搜索数据的数组初始化
		let searchList = ref([]) 
	//搜索历史初始化
		let historyList = ref([])
	// 初始化搜索发现列表
		let foundList = ref(['米饭','鸡蛋','玉米','苹果','红薯','香蕉'])
		
	//用户输入时可以获取用户输入的内容
		const input = (e) => {
			//每次使用先清空定时器，优化
				clearTimeout(time.value);
				time.value = setTimeout(()=>{
				keyword.value = e
				//获取搜索数据
				// getSearchContent()
			},500)
				console.log(e)
		}
		
		const saveHistory = () => {
			if(historyList.value.indexOf(keyword.value)==-1){
				historyList.value.unshift(keyword.value)
					// 把用户输入的内容保存到历史记录当中
					uni.setStorageSync('kw',JSON.stringify(historyList.value||'[]'))
				}				
			}
			
		const clearHistory = () => {
			historyList.value = []
			uni.setStorageSync('kw','[]')
			}

</script>

<style scoped lang="scss">
.history{
		.history-title{
			width: 90%;
			display: flex;
			justify-content: space-between;
			align-items: center;
			margin: 0 auto;
			text{
				font-weight: bold;
				font-size: 34rpx;
			}
		}
		.history-content{
			width: 90%;
			margin: 10rpx auto;
			display: flex;
			flex-wrap: wrap;
			.history-item{
				height: 50rpx;
				line-height: 50rpx;
				background-color: #F8F8F8;
				margin-top: 10rpx;
				margin-right: 20rpx;
				padding:0 20rpx;
				border-radius: 20rpx;
			}
		}
		.history-none{
			width: 100%;
			height: 100rpx;
			text-align: center;
			line-height: 100rpx;
		}
	}
	
	.found{
			.found-title{
				width: 90%;
				display: flex;
				justify-content: space-between;
				align-items: center;
				margin: 0 auto;
				text{
					font-weight: bold;
					font-size: 34rpx;
				}
			}
			.found-content{
				width: 90%;
				margin: 10rpx auto;
				display: flex;
				flex-wrap: wrap;
				.found-item{
					height: 50rpx;
					line-height: 50rpx;
					background-color: #F8F8F8;
					margin-top: 10rpx;
					margin-right: 20rpx;
					padding:0 20rpx;
					border-radius: 20rpx;
				}
			}
			.found-none{
				width: 100%;
				height: 100rpx;
				text-align: center;
				line-height: 100rpx;
			}
		}
	
	.search-list{
		width: 100%;
		height: 80rpx;
		line-height: 80rpx;
		display: flex;
		border-bottom: 1px solid #eee;
		uni-icons{
			margin:0 20rpx;
		}
	}

</style>
