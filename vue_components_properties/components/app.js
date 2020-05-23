
var app = new Vue({
    el: '#app',
    data: function() {
        return {
            // index of the opts question
            optsIdx: 0,
            optsList: [
                { "img": "/res/000.jpg",        // img => resource (image)
                    "q": "Taco for lunch?",     // q => question to be displayed for choice
                    "opts": [ "yes", "no" ] },  // opts => options available for the above question
                { "img": "/res/001.jpg", "q": "toast with spinach, eggs and mayo, want to try?", "opts": [ "sure!", "Nay~ too heavy" ] },
                { "img": "/res/002.jpg", "q": "during a diet... drop by for a slice?", "opts": [ "yes first and 30 situps after this...", "no thanks, I am serious about the diet" ] },
                { "img": "/res/003.jpg", "q": "buy this hat at $15?", "opts": [ "why not?", "let me think about it" ] },
                { "img": "/res/004.jpg", "q": "sunglasses with a stylish design", "opts": [ "I need one", "wait till I have a break first..." ] },
                { "img": "/res/005.jpg", "q": "casual footwear for the weekend", "opts": [ "sounds good", "I prefer flip flops" ] },
                { "img": "/res/006.jpg", "q": "grey, red and blue, which do you prefer?", "opts": [ "blue", "red", "grey", "none" ] },
                { "img": "/res/007.jpg", "q": "quartz watch is always a charm", "opts": [ "agreed", "well..." ] },
                { "img": "/res/008.jpg", "q": "maybe you prefer traditional watches?", "opts": [ "yes", "boooooring" ] },
                { "img": "/res/009.jpg", "q": "time to replace my smart phone, latest iPhone looks great", "opts": [ "yes", "no" ] },
                { "img": "/res/010.jpg", "q": "I am a dinosaur, phones should be like this~", "opts": [ "yes", "no way" ] },
                { "img": "/res/011.jpg", "q": "cakes are nice, a small dip is good", "opts": [ "yes", "no" ] },
                { "img": "/res/012.jpg", "q": "maybe a bigger slice is not that bad too", "opts": [ "so true", "on diet...", "too sweet" ] }
            ],

            doneList: [],

            showDlg: false,
            dlgItem: null
        };
    },
    methods: {
        onAnsweredNProceed: function(data) {
            this.doneList.push(data);

            let _l = this.optsList.length;
            let _i = this.optsIdx + 1;
            if (_i < _l) {
                this.optsIdx = _i;
            } else {
                this.optsIdx = 0;
            }
        },
        onDoneListItemClick: function(data) {
            this.showDlg = true;

            this.dlgItem = null; // bug (need to reset object reference before hand)
            this.dlgItem = data;
        },
        onDoneListItemDel: function(data) {
            if (data && data.idx != undefined) {
                this.doneList.splice(data.idx, 1);
            }
        },
        onDlgCancel: function() {
            this.showDlg = false;
        },
        onDlgConfirm: function(data) {
            this.showDlg = false;
            if (data && data.hasOwnProperty("new_answer")) {
                // find out which doneList item it is (by idx)
                let _l = this.doneList.length;
                for (let _i=0; _i<_l; _i++) {
                    let _item = this.doneList[_i];
                    if (_item.q == data.q && _item.answer == data.answer && _item.img == data.img) {
                        _item.answer = data['new_answer'];
                    } // match
                } // end -- for
            }
        }
    }
});