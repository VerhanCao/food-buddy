<template>
	<view class="container">
		<view class="tip">仅需两步，完成注册<view>{{ step }} / 2</view>
		</view>
			<view v-if="step === 1" class="logon">
				<view class="number">
					<view class="text">设置账号</view>
					<input border v-model="state.params.number" />
				</view>
				<view class="password">
					<view class="text">设置密码</view>
					<input border v-model="state.params.password" />
				</view>
				<view class="btn">
					<view style="color: #CCCCCC;">取消</view>
					<view>
						<view style="color: #0099CC;" @click="addStep()">下一步</view>
					</view>
				</view>
			</view>
			<view v-else-if="step === 2" class="tag">
				<view class="tagA">
					<view class="title">您的目标是</view>
					<SelectTags v-model="target" :items="targets"></SelectTags>
				</view>
				<view class="tagB">
					<view class="title">您的口味喜好是</view>
					<SelectTags v-model="like" :items="likes" :multiple="false"></SelectTags>
				</view>
				<view class="note">
					<view class="title">附加说明</view>
					<TnInput v-model="input" type="textarea" height="150"></TnInput>
				</view>
				<view class="btn1" @click="logon">完成注册</view>
			</view>
	</view>
</template>

<script setup lang='ts'>
	import {
		reactive,
		ref
	} from 'vue';
	import SelectTags from 'tnuiv3p-tn-select-tags/index.vue'
	import type {
		SelectTagsItem
	} from 'tnuiv3p-tn-select-tags'
	import TnInput from '@tuniao/tnui-vue3-uniapp/components/input/src/input.vue'
import request from '@/utils/request';

	let input = ref < string > ('')
	const step = ref(1)
	const target = ref < string[] > ([])
	const like = ref < string[] > ([])
	const state = reactive({
		params: {
			number: '',
			password: '',
			target: ''
		}
	})

	const targets: SelectTagsItem[] = [{
			label: '减脂',
			value: '目标(减脂)'
		},
		{
			label: '健身',
			value: '目标(健身)'
		},
		{
			label: '疾病预防',
			value: '目标(疾病预防)'
		},
		{
			label: '降血压',
			value: '目标(降血压)'
		},
		{
			label: '养生',
			value: '目标(养生)'
		},
		{
			label: '减肥',
			value: '目标(减肥)'
		}
	]

	const likes: SelectTagsItem[] = [{
			label: '酸',
			value: '口味(酸)',
			activeBgColor: 'tn-teal-light',
			activeColor: 'tn-teal'
		},
		{
			label: '甜',
			value: '口味(甜)',
			activeBgColor: 'tn-gray',
			activeColor: 'tn-gray-light'
		},
		{
			label: '苦',
			value: '口味(苦)',
			activeBgColor: 'tn-brown-light',
			activeColor: 'tn-brown'
		},
		{
			label: '辣',
			value: '口味(辣)',
			activeBgColor: 'tn-orangered-light',
			activeColor: 'tn-orangered'
		},
		{
			label: '咸',
			value: '口味(咸)',
			activeBgColor: 'tn-grey-light',
			activeColor: 'tn-grey'
		},
		{
			label: '清淡',
			value: '口味(清淡)',
			activeBgColor: 'tn-gray-light',
			activeColor: 'tn-gray'
		}
	]

	const addStep = () => {
		step.value++;
	}

	const logon = () => {
		state.params.target = target.value.join(',') + ';' + like.value.join(',') + ';' + input.value
		console.log('target: ' + state.params.target)
		request.post('/resist', state.params).then(res => {
			if(res.code === 1) {
				uni.showToast({
					title: '注册成功'
				})
				uni.navigateTo({
					url: '/pages/login/login'
				})
			}
		})
	}
</script>

<style scoped lang="scss">
	.container {
		width: 100vw;
		height: 100vh;
		display: flex;
		flex-direction: column;
		align-items: center;

		.tip {
			width: 89%;
			display: flex;
			justify-content: space-between;
			font-size: 16px;
		}

		.logon {
			width: 72%;
			margin-top: 20vh;
			display: flex;
			flex-direction: column;
			height: auto;

			.number,
			.password,
			.confirm {
				border-bottom: 1px solid #CCCCCC;
				margin-top: 10rpx;
			}

			.btn {
				width: 100%;
				margin-top: 30px;
				display: flex;
				justify-content: space-between;
				font-size: 16px;
			}
		}

		.tag {
			width: 100%;
			height: 90%;
			display: flex;
			flex-direction: column;
			justify-content: center;
			align-items: center;

			.tagA,
			.note {
				width: 89%;

				.title {
					color: #CCCCCC;
					margin-left: 6px;
				}
			}

			.tagB {
				width: 89%;
				margin-top: 10px;

				.title {
					color: #CCCCCC;
				}
			}

			.note {
				margin-top: 10px;
			}

			.btn1 {
				color: #0099CC;
				font-size: 16px;
				margin-top: 18px;
			}
		}
	}

</style>