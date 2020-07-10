<template>
	<view class="pages">
		<home v-if="page==='h'"></home>
		<list v-if="page==='l'" ref="list"></list>
		<creat v-if="page==='c'"></creat>
		<!-- <view class="cu-bar tabbar bg-white shadow foot">
			<view class="action" 
				:class="page=='l'?'text-mauve':'text-gray'" 
				@click="NavChange" data-cur="l">
				<view :class="page=='l'?'cuIcon-homefill':'cuIcon-home'"></view> 首页
			</view>
			<view class="action add-action" 
				:class="page=='c'?'text-mauve':'text-gray'" 
				@click="NavChange" data-cur="c">
				<button class="cu-btn cuIcon-add bg-gradual-pink shadow"></button> 文章生成
			</view>
			<view class="action" 
				:class="page=='h'?'text-mauve':'text-gray'" 
				@click="NavChange" data-cur="h">
				<view :class="page=='h'?'cuIcon-myfill':'cuIcon-my'"></view> 主页
			</view>
		</view> -->
	</view>
</template>

<script>
	import list from '../list/index.vue'
	import home from '../home/index.vue'
	import creat from '../creat/index.vue'
	export default {
		data() {
			return {
				page: 'c'
			}
		},
		components: {
			list,
			home,
			creat
		},
		
		methods: {
			NavChange(e) {
				this.page = e.currentTarget.dataset.cur
			}
		},
		onReachBottom() {
			if(this.page !== 'l' || this.$refs.list.isLoad || this.$refs.list.tabIndex === 0) return
			this.$refs.list.page++
			this.$refs.list.getLang(true)
		},
		onShareAppMessage(res) {
			return {
				title: '好东西跟大家一起分享',
				path: '/pages/index/index',
				imageUrl: '../../static/0101aad413f5bbf2d744e2aed899d9ac.jpg'
			}
		}
	}
</script>

<style lang="scss">
	
</style>
