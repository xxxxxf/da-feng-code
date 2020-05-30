<template name="creat">
	<view class="pages">
		<view class="m-fixed flex justify-center m-padding bg-gradual-pink"
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
						<view class="text-grey text-right">——
						<!-- #ifdef MP-WEIXIN -->
							<open-data type="userNickName"></open-data>
							<!-- <open-data type="userAvatarUrl"></open-data> -->
						<!-- #endif -->
						<!-- #ifndef MP-WEIXIN -->
							匿名用户
						<!-- #endif -->
						</view>
					
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
		</view>
	</view>
</template>

<script>
	import made from '../../common/made.js'
	export default {
		name: 'creat',
		data() {
			return {
				title: '',
				text: '',
				radio: 'A',
				ttitle: '',
				height: getApp().globalData.height*2
			}
		},
		methods: {
			async bindMake() {
				const count = this.radio === 'A' ? 300 : (this.radio === 'B' ? 500 : 800)
				this.text = await made(this.title, count)
				this.ttitle = this.title || '无标题'
			},
			RadioChange(e) {
				this.radio = e.detail.value
			},
			bindCopy() {
				uni.setClipboardData({
					data: this.text,
					success(res) {
						uni.showToast({
							title: '复制成功'
						})
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
