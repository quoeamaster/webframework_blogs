
var Optionbar = Vue.component('option-bar', {
    props: [ 'opt' ],
    data: function() {
        return {
            optBtnColorLen: 5,
            optBtnColor: ['bg-success', 'bg-info', 'bg-warning', 'bg-danger', 'bg-primary'],
            optBtnTextColor: [ 'ob-img-opts-text-black', 'ob-img-opts-text-black', 'ob-img-opts-text-black', 'ob-img-opts-text-black', 'ob-img-opts-text-white' ]
        };
    },
    computed: {
        bImg: function() {
            return {
                'background-image': `linear-gradient(rgba(0, 0, 0, 0.1), rgba(0, 0, 0, 0.7)), url('${this.opt.img}')`,
                'background-position': 'center',
                'background-repeat': 'no-repeat',
                'background-size': 'cover', // contain showing everything... but got upper and lower segments / gaps too
                'position': 'relative',
                'height': '800px'
            };
        }
    },
    methods: {
        cssOptBtnColor: function(idx) {
            let _c = {};
            let _i = idx % this.optBtnColorLen;

            _c[this.optBtnColor[_i]] = true;
            _c[this.optBtnTextColor[_i]] = true;

            return _c;
        },

        onChosenNProceed: function(optIdx) {
            //let _answer = this.opt.opts[optIdx];
            //_d['answer'] = _answer;

            let _d = Object.assign({}, this.opt);
            _d['answer'] = optIdx;
            this.$emit('on-q-answered', _d);
        }
    },
    template: `
<div>
    <div class='ob-img-container' :style='bImg'>
        <div class='ob-img-q-text'>
            <h2>{{opt.q}}</h2>
        </div>
        <div class='ob-img-opts-container'>
            <div class='ob-img-opts-inner-container'>
                <div v-for='(item, idx) in opt.opts'
                    @click='onChosenNProceed(idx)'
                    :class='cssOptBtnColor(idx)'
                    style='cursor: pointer;'
                    class='ob-img-opts-btn'>
                    <span class='ob-img-text'>{{item}}</span>
                </div>
            </div>
        </div>
    </div> <!-- ob-img-container -->
</div>
    `
});