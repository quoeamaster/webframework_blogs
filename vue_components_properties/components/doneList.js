
let DoneList = Vue.component('done-list', {
    props: ['item', 'idx'],
    computed: {
        bImg: function() {
            return {
                //'background-image': `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)), url('${this.item.img}')`,
                'background-image': `url('${this.item.img}')`,
                'background-position': 'center',
                'background-repeat': 'no-repeat',
                'background-size': 'cover', // contain showing everything... but got upper and lower segments / gaps too
                'position': 'relative',
                'width': '80px',
                'height': '80px',
                'border-radius': '6px'
            };
        }
    },
    methods: {
        onItemClick: function() {
            this.$emit('on-done-list-item-click', this.item);
        },
        onDeleteDoneItem: function() {
            let _d = Object.assign({}, this.item);
            _d['idx'] = this.idx;
            this.$emit('on-done-list-item-del', _d);
        }
    },
    template: `
<div class='dl-item-container' @click='onItemClick'>
    <div style='display: flex; flex-direction: row; overflow: hidden;'>
        <!-- thumbnail -->
        <div :style='bImg'>
            <div class="fa-stack pull-right" 
                @click.stop.prevent='onDeleteDoneItem'
                style='cursor: pointer;'>
                <i class="fa fa-circle fa-stack-2x"></i>
                <i class="fa fa-trash fa-stack-1x fa-inverse"></i>
            </div>
        </div>
        <div style='display: flex; flex-direction: column;'>
            <!-- question -->
            <div class='dl-q'>
                {{item.q}}
            </div>
            <!-- answer -->
            <div class='dl-a text-success'>
                {{item.opts[item.answer]}}
            </div>
        </div>
    </div>  <!-- inner container -->
</div>
    `
});