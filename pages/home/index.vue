<template name="home">
	<view class="pages">
		<image class="response" src="../../static/0101aad413f5bbf2d744e2aed899d9ac.jpg" mode="widthFix"></image>
		
		<view class="cu-list menu text-left">
			<view class="cu-item arrow" @click="showMsg">
				<view class="content">
					<view class="cuIcon-my"><text class="margin-left">个人简历</text></view>
				</view>
			</view>
			<!-- #ifdef MP-WEIXIN -->
			<view class="cu-item arrow">
				<button class="content" open-type="contact">
					<view class="cuIcon-service">
						<text class="margin-left">联系客服</text>
					</view>
				</button>
			</view>
			<view class="cu-item arrow">
				<button class="content" open-type="feedback">
					<view class="cuIcon-write">
						<text class="margin-left">意见反馈</text>
					</view>
				</button>
			</view>
			<!-- #endif -->
		</view>
		
		<view class="body-img flex justify-around">
			<image @click="lookImg(0)" src="../../static/20200530130440.jpg" mode="widthFix"></image>
			<image @click="lookImg(1)" src="../../static/20200528202753.jpg" mode="widthFix"></image>
		</view>
	</view>
</template>

<script>
	export default {
		name: 'home',
		data() {
			return {}
		},
		methods: {
			lookImg(index) {
				// #ifndef MP-WEIXIN 
				uni.previewImage({
					urls: ['../../static/20200530130440.jpg', '../../static/20200528202753.jpg'],
					current: index
				})
				// #endif
			},
			showMsg() {
				uni.showToast({
					title: '该页面暂时未开放',
					icon: 'none',
					duration: 2000
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.body-img {
		margin-top: 60rpx;
		image {
			width: 200rpx;
		}
	}
</style>
