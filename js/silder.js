Vue.component('img-view',{
    template:'#imgView',
    props:['path','nowIndex','index','show'],
    data() {
        return {
            ifshow: true,
            _nowIndex: this.nowIndex,
            _index: this.index
        }
    },
})

var app = new Vue({
    el:"#vueApp",
    data:{
        paths:[
            "1_resized.jpg",
            "2_resized.jpg",
            "3_resized.jpg"
        ],
        nowIndex: 0,
        nextIndex: 1,
        show: true,
        auto: null,
        timeOut: null
    },
    methods: {
        goto( index ) {
            console.log(this.nextIndex);
            index == (this.paths.length - 1) ? this.nextIndex = 0 : this.nextIndex= index + 1;
            console.log(this.nextIndex);
            this.show = false;
            this.nowIndex = index;
            clearTimeout( this.timeOut )
            this.timeOut = setTimeout(()=>{
                this.show = true;
            },10)
            clearInterval( this.auto )
            this.timerun()
        },

        timerun() {
            this.auto = setInterval(()=> {
                this.nowIndex == (this.paths.length - 1) ? this.nowIndex = 0 : this.nowIndex+= 1;
    
                this.goto( this.nowIndex );
            },5000)
        },
        prev( nowIndex ) {
            return nowIndex == 0 ? this.paths.length -1 : this.nowIndex - 1;
            
        },
        next( nowIndex ) {
            return nowIndex == this.paths.length -1 ? 0 : this.nowIndex + 1;
        }
    },
    created() {
        this.timerun()
    },
})