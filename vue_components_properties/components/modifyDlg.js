
let ModifyDlg = Vue.component('modify-dlg', {
    props: ['show', 'item'],
    data: function() {
        return {
            optChosen: 0
        };
    },
    methods: {
        _cleanup: function() {
            //this.optChosen = 0;
        },

        onCancel: function() {
            // reset values
            this._cleanup();
            this.$emit('on-dlg-cancel', {});
        },
        onConfirm: function() {
            // update the app's doneList contents (check if the reference hell problem occurs here :P)
            /*let _d = Object.assign({}, this.item);
            if (_d.answer != this.optChosen) {
                _d['new_answer'] = this.optChosen;
            }*/
            let _d = {
                img: this.item.img, 
                q: this.item.q,
                answer: this.item.answer,
                'new_answer': this.optChosen
            };

            this._cleanup();
            this.$emit('on-dlg-confirm', _d);
        }
        /* normal cases should not need to use this methood v-model should do the trick for us */
        /*
        shouldCheck: function(idx) {
            //console.log(idx, this.item.answer, (idx == this.item.answer));
            let _c = false;
            if (idx == this.item.answer) {
                _c = true;
            }
            return _c;
        }*/
    },
    mounted: function() {
        if (this.item) {
            this.optChosen = this.item.answer;
        }
    },
    watch: {
        item: function() {
            this.optChosen = this.item.answer;
        }
    },
    computed: {
        toShow: function() {
            let _s = {};
            if (this.show == true) {
                _s['display'] = 'block';
            } else {
                _s['display'] = 'none';
            }
            return _s;
        },
        q: function() {
            let _q = '';
            if (this.item && this.item.q) {
                _q = this.item.q;
            }
            return _q;
        },
        bImg: function() {
            if (this.item && this.item.img) {
                return {
                    'background-image': `url('${this.item.img}')`,
                    'background-position': 'center',
                    'background-repeat': 'no-repeat',
                    'background-size': 'cover', // contain showing everything... but got upper and lower segments / gaps too
                    'position': 'relative',
                    'margin': 'auto',
                    'width': '360px',
                    'height': '240px',
                    'border-radius': '6px',
                    'padding-bottom': '20px'
                };
            } else {
                return {};
            }
        },
        opts: function() {
            let _o = [];
            if (this.item && this.item.opts) {
                _o = this.item.opts;
            }
            return _o;
        }
    },
    template: `
<div :style='toShow'>
    <div class='dlg-backdrop'></div>
    <div class='dlg-container'>
        <div class='dlg-header-bar bg-primary'>
            <div class='pull-right' style='cursor: pointer;' @click='onCancel'>X</div>
        </div>
        <div class='dlg-q'>
            {{q}}
        </div>
        <div :style='bImg'></div>
        <div v-for='(opt, idx) in opts' class='dlg-a'>
            <!-- :checked='shouldCheck(idx)' -->
            <input class="form-check-input" type="radio" name="dlgOpts" id="dlgOpts" 
                :value='idx' 
                v-model:number='optChosen'>
            <label class="form-check-label" style='padding-left: 4px;'>
                {{opt}}
            </label>

        </div>
        <div style='width: 100%; height: 80px; line-height: 80px; display: flex; flex-direction: row; padding-top: 20px;'>
            <div class='dlg-btn dlg-btn-confirm bg-success' @click='onConfirm'>confirm</div>
            <div class='dlg-btn dlg-btn-cancel bg-info' @click='onCancel'>cancel</div>
        </div>
        
    </div>
</div>
    `
});