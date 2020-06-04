<template>
	<view class="pages">
		<view class="fixed-s bg-gradual-pink">
			<view class="flex m-padding justify-center" 
			 :style="{paddingTop: 20+height+'rpx'}">
				列表页
			</view>
			<scroll-view scroll-x class="bg-white nav">
				<view class="flex text-center">
					<view class="cu-item flex-sub" 
						:class="index==tabIndex?'text-orange cur':''" 
						v-for="(item,index) in 2" :key="index" 
						@tap="tabSelect" :data-id="index">
						{{index===0?'历史今天':'名人名言'}}
					</view>
				</view>
			</scroll-view>
			<view class="box" v-if="tabIndex===1">
				<view class="cu-bar search bg-white">
					<view class="search-form round">
						<text class="cuIcon-search"></text>
						<input 
							:adjust-position="false" type="text" 
							placeholder="搜索关键字" 
							v-model="searchVal"
							confirm-type="search"></input>
					</view>
					<view class="action" @click.stop="bindSearch">
						<button class="cu-btn bg-gradual-pink shadow-blur round">搜索</button>
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu-avatar comment solids-top"
			:style="{marginTop: 190+height+'rpx'}"
			v-if="tabIndex===0">
			<view class="cu-item" v-for="(ele, i) in listToday" :key="i">
				<view class="content">
					<view class="text-content margin-bottom-sm" v-if="tabIndex === 0">
						{{ele.title}}
					</view>
					<view class="text-grey text-right">
						——{{ele.year+'-'+ele.month+'-'+ele.day}}
					</view>
				</view>
			</view>
		</view>
		<view class="cu-list menu-avatar comment solids-top"
		  :style="{paddingTop: 284+height+'rpx'}" v-else>
			<view class="cu-item" v-for="(ele, i) in listLang" :key="i">
				<view class="content">
					<view class="bg-grey padding-sm radius margin-top-sm text-sm">
						<view class="flex">
							<text class="flex-sub">{{ele.famous_saying}}</text>
						</view>
					</view>
					<view class="text-grey margin-top-sm text-right">
						——{{ele.famous_name}}
					</view>
				</view>
			</view>
		</view>
		<view class="cu-load" :class="!isLoad?'loading bg-gradual-pink':'over text-gray'"></view>
	</view>
</template>

<script>
	export default {
		name: 'list',
		data() {
			return {
				InputBottom: 0,
				searchVal: '',
				tabIndex: 0,
				listToday: [],
				listLang: [],
				page: 1,
				isLoad: false,
				height: getApp().globalData.height*2
			}
		},
		created() {
			this.getList()
		},
		methods: {
			bindSearch() {
				this.getLang()
			},
			getList() {
				const that = this
				const date = new Date();
				const yue = date.getMonth()+1;
				const ri = date.getDate()
				const key = '0f2ab916b2cf4233895793ab1ae0588c'
				let url = ''
				// 解决 H5跨域问题
				// #ifdef H5
					url = `.cn/HistoryToday/LookUp?page=1&type=2&rows=50&key=${key}&yue=${yue}&ri=${ri}`
				// #endif
				// #ifndef H5
					url = `https://api.avatardata.cn/HistoryToday/LookUp?page=1&type=2&rows=50&key=${key}&yue=${yue}&ri=${ri}`
				// #endif
				uni.request({
					url,
					success(res) {
						if(res.statusCode === 200) {
							that.listToday = res.data.result
							that.isLoad = true
						}
					} 
				})
			},
			getLang(flag) {
				const that = this
				const str = '之乎者也'
				let char = str[parseInt(Math.random()*str.length)]
				const key = '7c5e93b8ac8645d38dab2c242f22b840'
				if(!flag) {
					this.page = 1
				}
				let url = ''
				// #ifdef H5
					url = `.cn/MingRenMingYan/LookUp?keyword=${encodeURIComponent(this.searchVal?this.searchVal:char)}&key=${key}&page=${this.page}`
				// #endif
				// #ifndef H5
					url = `https://api.avatardata.cn/MingRenMingYan/LookUp?keyword=${encodeURIComponent(this.searchVal?this.searchVal:char)}&key=${key}&page=${this.page}`
				// #endif
				uni.request({
					url,
					success(res) {
						if(res.statusCode === 200) {
							if(that.page === 1) {
								that.listLang = res.data.result
							} else {
								that.listLang = that.listLang.concat(res.data.result) 
							}
							if(res.data.result.length < 20) {
								that.isLoad = true
							}
						}
					}
				})
			},
			tabSelect(e) {
				this.tabIndex = e.currentTarget.dataset.id*1
				if(this.tabIndex === 1 && !this.listLang.length) {
					this.isLoad = false
					this.getLang()
				} else {
					this.isLoad = true
				}
			}
		}
	}
</script>

<style lang="scss">
	.fixed-s {
		.m-padding {
			padding-bottom: 36rpx;
		}
		width: 100%;
		position: fixed;
		top: 0;
		z-index: 2;
	}
	.cu-list.menu-avatar.comment>.cu-item {
		padding: 24rpx;
	}
</style>
