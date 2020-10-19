<template>
    <div>
        <div class="detail">
            <div class="film-header">
                <div class="goBack" @click="goBack()">
                    <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADoAAAA6CAMAAADWZboaAAAAt1BMVEVHcEz///////////////////////////////////////////////////////////////////////////////////97e3saGxyIiYnW1tYdHh9UVVUpKiulpaXLy8s6OzyysrIiIyPx8fEeHyC/v7/5+fklJihCQ0Ntb28bHB1hYWKXl5c0NTZLS0xAQUI4ODk3ODjh4eHr6+s2Nzfq6uptbm5gYGIbHB39/f2VlZdLS0wzNDUZGhs8UYRWAAAAPHRSTlMAGHpLE3cKgEdgVnJfNBZ+cBx9A28js/6sjPvK7p+Q3pn1g/iUgfLYuvzCpeTR2eHiiIXihrvD/YCl0uTUXbEtAAABd0lEQVRIx91W13KDQAw0xnCHARuDe+/dKY7T9f/flTzghCLdMaMXj/eRnZ0T0qqUSveBim96gRWGVuCZfqW4zpCuSMGVRiFhwxEInIY+0qogUFXHHcm6IFGXEa20HaGEY1PKWlNo0KzhylZZaFFuoW8WUP5qkXdtMtrnx4dkzLn/jcgMXY7wlMpVNs+SUs4nMOylvsiME6h6rjawHmfqm/YG6aETzJY5X6V8SykHsJjmvyb9TOVoD/0R5qpElxHKLewOKGHo0tuGThdn/pPsony3A20iHPevMih92MGW9OO1Pj5Gjvqwp63sx1IT4aYLGCi6wIylXp5azuCkaiAvlgY5ZryGzUolDWKplSV6Q5jMlW1rxdIwS7zA8azu+JCWfl+KSRkBM9KEF+fro0BxGJagjPimNyJp/1et/RlNx2l1esC8f2oGDGOscYYpY4RzFgdjXSmW5Fm3JBmrmXMQcM4QzvHDObk4hx7nvGQdtaxTmnXA3zR+AH8JUdNL967cAAAAAElFTkSuQmCC" alt="">
                </div>
            </div>
            <div class="bg"></div>
        <div class="img">
            <div class="img-wrap">
                <img v-lazy="film.poster" />
            </div>
            
        </div>
            <div class="film-detail">
            <div class="col">
                <div class="film-name">
                    <span class="name">{{film.name}}</span>
                    <span class="item">2D</span>
                </div>
                <div class="film-grade">
                    <span class="grade">{{film.grade}}</span>
                    <span class="grade-text"> 分</span>
                </div>
            </div>
            <div class="grey-text">{{film.category}}</div>
            <div class="grey-text">{{film.premiereAt | parsePremiereAt}}上映</div>
            <div class="grey-text">{{film.nation}} | {{film.runtime}}分钟</div>
            <div class="film-synopsis grey-text" style="height:77px" :class="{hidde:isActive}">{{film.synopsis}}</div>
            <div class="toggle" @click="top">
                <img :class="{upper}" src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAABAAAAAICAMAAADHqI+lAAAAOVBMVEVHcEy9xcW9wMW9wcW////Bwca9wcW9wMW9wMW+wMW+wcW9wcXMzMy+wMa+wce9wMe9wca9wMW9wMWKU/2FAAAAEnRSTlMAH+jGBDa6/vaatcIPdlNSdckJHB8JAAAASUlEQVQIHQXBhwGDMAADMCVksQr4/2MrObYCQNkOZ2oH6DWna2Q9wG9lXLQ984V3Zm/gntlb2zNvgN/KGFkPAL0mtQNA+b4C/AGl4gJfgEWzrAAAAABJRU5ErkJggg==" alt="">
            </div>
            </div>
            <div class="actors">
                <div class="actors-title-bar">
                    <span class="actors-title-text">演职人员</span>
                </div>
                <div class="row-scroll-wrapper">
                    <ul class="row-scroll-items-nav">
                        <Swiper :key="'actors_' + film.actors.length">
                            <li class="row-scroll-item swiper-slide" v-for="(item,index) in film.actors" :key="index">
                            <div class="actors-item" style="text-align: center">
                                <div class="bg2"></div>
                                <div class="lazy-img-wrap"><img :src="item.avatarAddress" ></div>
                            </div>
                                <span class="actors-name">{{item.name}}</span>
                                <span class="actors-role">{{item.role}}</span>
                        </li>
                        </Swiper>
                    </ul>
                </div>
            </div>
            <div class="photos">
                <div class="actors-title-bar">
                    <span class="actors-title-text">剧照</span>
                    <span class="photos-to-all">全部</span>
                </div>
                <div class="photos-list">
                    <ul class="row-scroll-items-nav">
                        <Swiper :key="'actors' + film.actors.length">
                            <li class="photos-item-wrap swiper-slide" style="min-width:150px;" v-for="(item,index) in film.photos" :key="index">
                                <div class="bg3"></div>
                                <div class="lazy-img-wrap" style="width: 150px; height: 100px; display: block;">
                                    <img :src="item" >
                                </div>
                            </li>
                        </Swiper>
                    </ul>
                </div>
            </div>
            <a href="javascript:;" class="footgo" style="height: 49px; position: fixed; bottom: 0px; width: 100%;">
                <div class="goSchedule">
                    选座购票
                </div>
            </a>
        </div>
    </div>
</template>

<script>
import {moiveDetailData} from '@/api/api'
import moment from 'moment'
import Swiper from '@/components/Swiper'
export default {
    data() {
        return {
            film:{actors:[],photos:[]},
            isActive:true,
            upper:false
        }
    },
    async mounted() {
        let ret = await moiveDetailData(this.$route.params.filmId)
        this.film = ret.data.data.film
    },
    filters:{
        parsePremiereAt:function(value){
            return moment(value * 1000).format('YYYY-MM-DD')
        },
    },
    methods: {
        top: function(){
            this.isActive = !this.isActive
            this.upper = !this.upper
        },
        //  返回上一页
        goBack:function(){
            this.$router.go(-1)
        }
    },
    components:{
        Swiper
    },
    created() {
        //  移除底部菜单
        this.eventBus.$emit('Footernav',false)
    },
    beforeDestroy() {
        //  恢复底部菜单
        this.eventBus.$emit('Footernav',true)
    },
}
</script>

<style lang="scss" scoped>
    .detail {
        background-color: #f4f4f4;
        overflow-x: hidden;
        overflow-y: hidden;
        .film-header {
            position: fixed;
            background-color: hsla(0,0%,100%,0);
            color: transparent;
            -webkit-transition: all .3s ease;
            -o-transition: all .3s ease;
            transition: all .3s ease;
            width: 100vw;
            height: 44px;
            z-index: 1;
        .goBack {
            height: 30px;
            position: absolute;
            top: 5px;
            left: 5px;
            img{
                width: 30px;
                height: 30px;
            }
        }
}
        .bg{
            height: 56vw;
            display: flex;
            justify-content: center;
            align-items: center;
            width: 100%;
        }
    .img {
        width: 100%;

        .img-wrap{
            position: absolute;
            overflow: hidden;
            top: 0;
            width: 100%;
            height: 56vw;
            display: flex;
            align-items: center;
            justify-content: center;
        }

        img {
            width: 100%;
            position: absolute;
            top: 50%;
            left: 0;
            transform: translateY(-50%);
        }
    }
        .film-detail{
            padding: 15px;
            padding-top: 12px;
            background-color: #fff;
            .col{
                display: flex;
                align-items: center;
                justify-content: flex-start;
                .film-name{
                    width: 256px;
                    .name{
                        color: #191a1b;
                        font-size: 18px;
                        height: 24px;
                        line-height: 24px;
                        margin-right: 7px;
                        vertical-align: middle
                    }
                    .item{
                        font-size: 9px;
                        color: #fff;
                        background-color: #d2d6dc;
                        height: 14px;
                        line-height: 14px;
                        padding: 0 2px;
                        border-radius: 2px;
                        display: inline-block;
                        vertical-align: middle
                    }
                }
                .film-grade{
                    width: calc(100% - 250px);
                    text-align: right;
                    color: #ffb232;
                    .grade{
                        font-size: 18px;
                        font-style: italic;
                    }
                    .grade-text{
                        font-size: 10px;
                    }
                }
            }
            .grey-text{
                font-size: 13.3px;
                color: #797d82;
                margin-top: 4px;
                overflow: hidden;
            }
            .hidde{
                height: 38px!important;
                overflow: hidden;
            }
            .film-synopsis{
                margin-top: 12px;
            }
            .toggle{
                text-align: center;
                display: block;
                height: auto;
                width: 20px;
                margin: auto;
                line-height: normal;
                img{
                    width: 8px;
                    margin: auto;
                }
                .upper{
                    transform: rotate(180deg);
                }
            }
        }
    .actors{
        margin-top: 10px;
        background-color: #fff;
        .actors-title-bar{
            width: 100%;
            padding: 15px;
            .actors-title-text{
                font-size: 16px;
                text-align: left;
                color: #191a1b;
                display: inline-block;
                height: 22.5px;
                line-height: 22px;
            }
        }
        .row-scroll-wrapper{
            height: 140px;
            background: rgb(255, 255, 255);
            overflow-x: auto;
            overflow-y: hidden;
            .row-scroll-items-nav{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                position: relative;
                width: 100%;
                padding-left: 15px;
                list-style: none;
                .row-scroll-item{
                    width: 85px;
                    min-width: 85px;
                    position: relative;
                    margin-right: 10px;
                    display: block;
                    float: left;
                    .actors-item{
                        width: 85px;
                        height: 85px;
                        position: relative;
                        .bg2{
                            width: 100%;
                            height: 100%;
                            display: flex;
                            justify-content: center;
                            align-items: center;
                        }
                        .lazy-img-wrap{ 
                            width: 85px;
                            height: 85px;
                            position: absolute;
                            top: 0;
                            overflow: hidden;
                            img{
                                width: 85px;
                                position: absolute;
                                top: 50%;
                                left: 0;
                                transform: translateY(-50%);
                            }
                        }
                        
                    }
                    .actors-name{
                            padding-top: 10px;
                            font-size: 12px;
                            color: #191a1b;
                            width: 85px;
                            height: 18px;
                            display: block;
                            overflow: hidden;
                            text-overflow: ellipsis;
                            white-space: nowrap;
                            text-align: center;
                        }
                        .actors-role{
                            font-size: 12px;
                            margin-left: -18px;
                            color: #797d82;
                            text-align: center;
                            display: block;
                        }
                }
            }
        }
    }
    .photos{
        margin-top: 10px;
        margin-bottom: 60px;
        background-color: #fff;
        .actors-title-bar{
            width: 100%;
            padding: 15px;
            position: relative;
            .photos-to-all{
                font-size: 13px;
                color: #797d82;
                display: inline-block;
                height: 22.5px;
                line-height: 22px;
                position: absolute;
                right: 50px;
            }
        .actors-title-text{
                font-size: 16px;
                text-align: left;
                color: #191a1b;
                display: inline-block;
                height: 22.5px;
                line-height: 22px;
            }
        }
        .photos-list{
            height: 115px;
            overflow-x: auto;
            overflow-y: hidden;
            .row-scroll-items-nav{
                display: flex;
                justify-content: flex-start;
                align-items: center;
                position: relative;
                width: 100%;
                padding-left: 15px;
                .photos-item-wrap{
                    display: block;
                    float: left;
                    width: 150px;
                    height: 100px;
                    margin-right: 10px;
                    .bg3{
                        width: 100%;
                        height: 100%;
                        display: flex;
                        justify-content: center;
                        align-items: center;
                    }
                    .lazy-img-wrap{ 
                            position: absolute;
                            top: 0;
                            overflow: hidden;
                            z-index: 1;
                            img{
                                width: 100%;
                                position: absolute;
                                top: 50%;
                                left: 0;
                                transform: translateY(-50%);
                            }
                        }
                }
            }
        }
    }
    .footgo{
        z-index: 999;
        .goSchedule {
            position: fixed;
            bottom: 0;
            left: 0;
            height: 49px;
            width: 100%;
            text-align: center;
            background-color: #ff5f16;
            color: #fff;
            font-size: 16px;
            line-height: 49px;
            z-index: 99;
        }   
    }
    
}
</style>