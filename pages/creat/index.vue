<template name="creat">
	<view class="pages">
		<!-- <view class="m-fixed flex justify-center m-padding bg-gradual-pink"
		 :style="{paddingTop: 20+height+'rpx'}">
			狗屁不通文章生成器
		</view>
		<form>
			<view class="cu-form-group solid-bottom"
				:style="{marginTop: 88+height+'rpx'}">
				<view class="title">标题:</view>
				<input 
					placeholder="请输入文章标题" 
					name="input" 
					type="text" 
					v-model="title"></input>
				<button class='cu-btn shadow bg-mauve' @click="bindMake">生成</button>
			</view>
			<radio-group class="block" @change="RadioChange">
				<view class="cu-form-group flex justify-around">
					 <view class="">
					 	 <radio class='red margin-left-sm scale' :class="radio=='A'?'checked':''"
					 	  :checked="radio=='A'?true:false" value="A"></radio>300字
					 </view>
					 <view class="">
					 	 <radio class='red margin-left-sm scale' :class="radio=='B'?'checked':''"
					 	  :checked="radio=='B'?true:false" value="B"></radio>500字
					 </view>
					 <view class="">
					 	 <radio class='red margin-left-sm scale' :class="radio=='C'?'checked':''"
					 	  :checked="radio=='C'?true:false" value="C"></radio>800字
					 </view>
				</view>
			</radio-group>
		</form>
		
		<view class="cu-list menu-avatar comment solids-top ma-t" v-if="text">
			<view class="cu-item">
				<view class="content">
					<view class="text-content flex justify-center">
						{{ttitle}}
					</view>
						<view class="text-grey text-right">—— -->
						<!-- #ifdef MP-WEIXIN -->
							<!-- <open-data type="userNickName"></open-data> -->
							<!-- <open-data type="userAvatarUrl"></open-data> -->
						<!-- #endif -->
						<!-- #ifndef MP-WEIXIN -->
							<!-- 匿名用户 -->
						<!-- #endif -->
						<!-- </view>
					
					<view class="bg-grey padding-sm radius margin-top-sm  text-sm">
						<view class="flex">
							<text class="flex-sub indent" selectable="true">{{text}}</text>
						</view>
					</view>
					<view class="margin-tb-sm text-right" @click="bindCopy">
						<button class="cu-btn round shadow bg-mauve">点击复制</button>
					</view>
				</view>
			</view>
		</view> -->
		<view class="margin-top">
			<input type="text" style="height: 60rpx;border: 1rpx solid #bbb;" v-model="uname" />
		</view>
		<view class="flex justify-around">
			<view class="" v-for="(e,i) in imgs" :key="i">
				<image :src="e" mode="widthFix"></image>
			</view>
		</view>
		<!-- <view class="">
			<image src="" mode=""></image>
		</view> -->
		<view class="flex justify-around">
			<text @click="deng">登录</text>
			<text @click="zhu">注册</text>
			<text @click="chuan">上传</text>
		</view>
	</view>
</template>

<script>
	import made from '../../common/made.js'
	let host = 'http://127.0.0.1:8000'
	export default {
		name: 'creat',
		data() {
			return {
				// title: '',
				// text: '',
				// radio: 'A',
				// ttitle: '',
				// height: getApp().globalData.height*2
				
				uname: '',
				token: '',
				imgs: []
			}
		},
		methods: {
			// async bindMake() {
			// 	const count = this.radio === 'A' ? 300 : (this.radio === 'B' ? 500 : 800)
			// 	this.text = await made(this.title, count)
			// 	this.ttitle = this.title || '无标题'
			// },
			// RadioChange(e) {
			// 	this.radio = e.detail.value
			// },
			// bindCopy() {
			// 	uni.setClipboardData({
			// 		data: this.text,
			// 		success(res) {
			// 			uni.showToast({
			// 				title: '复制成功'
			// 			})
			// 		}
			// 	})
			// }
			deng() {
				uni.request({
					url: host+'/mini/deng',
					method: 'GET',
					data: {
						uname: this.uname
					},
					success(res) {
						console.log(res, '登录 res')
						this.token = res.data.data
					}
				})
			},
			zhu() {
				uni.request({
					url: host+'/mini/zhu',
					data: {
						uname: this.uname
					},
					method: 'POST',
					success(res) {
						console.log(res, '注册 res')
					}
				})
			},
			chuan() {
				const that = this
				uni.chooseImage({
					count: 4, //默认9
					sizeType: ['original', 'compressed'], //可以指定是原图还是压缩图，默认二者都有
					sourceType: ['album'], //从相册选择
					success: (res) => {
						// that.imgList = res.tempFiles
						// console.log(that.token,'++ res')
						uni.showLoading({
							title: 'Loading ...',
							mask: true
						})
						for(let i=0; i<res.tempFilePaths.length; i++){
							uni.uploadFile({
								url: `${host}/chaun`,
								method: 'POST',
								header: {
									"Accept":"application/json",
									// "Content-type": 'application/json; charset=utf-8',
									"Authorization": that.token
								},
								filePath: res.tempFilePaths[i],
								name: 'file',
								formData: {
									type: 101
								},
								complete: function (ress) {
									console.log(ress, '上传图片 ress')
									uni.hideLoading()
									if(ress.statusCode === 200 && JSON.parse(ress.data).code === 200) {
										let path = JSON.parse(ress.data).path
										that.imgs.push(path)
									} else {
										uni.showToast({
											title: '上传失败',
											icon: 'none',
											duration: 3000
										})      
										return false
									}
								}
							})  
						} 
					}
				})
			}
		}
	}
</script>

<style lang="scss" scoped>
	.cu-list.menu-avatar.comment>.cu-item {
		padding: 24rpx;
	}
	.scale {
		transform: scale(.8);
	}
	.indent {
		text-indent: 2em;
	}
	.m-fixed {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		z-index: 2;
	}
	.m-padding {
		padding-bottom: 36rpx;
	}
</style>
