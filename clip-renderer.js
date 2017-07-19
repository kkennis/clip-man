class ClipRenderer {
    static itemTemplate(item) {
        return `
            <div class='item' tabindex='1' _id=${item._id}>
                <h4 class='item-header'>${item.key}</h4>
                <p class='item-value'>${item.value}</p>
            </div>
        `;
    }

    static drawClips(el, clips) {
        $(el).html('');

        clips.reverse().forEach((item) => {
            $(el).append(this.itemTemplate(item));
        });
    }



}

module.exports = ClipRenderer;