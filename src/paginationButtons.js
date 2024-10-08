import {create} from "fast-creator";

export class PaginationButtons extends HTMLElement {
    constructor() {
        super();
        this.currentPage = 0;
        this.totalPages = 0;
        this.onpageclick = null;
        this.buttonsBox = create('div', {className: 'buttonsBox'});
        this.append(this.buttonsBox);
    }

    render() {
        let pagination = this.getPagination();
        while (this.buttonsBox.firstChild) {
            this.buttonsBox.removeChild(this.buttonsBox.firstChild)
        }
        const back = this.buttonsBox.append(create('button', {
            text: '<<', disabled: this.currentPage == 0, onclick: () => {
                if (this.currentPage > 0) {
                    this.currentPage--;
                    if (this.onpageclick) {
                        this.onpageclick(this.currentPage);
                    }
                    this.render();
                }
                return false;
            }
        }));
        for (let pageNumber of pagination) {
            if (pageNumber == null) {
                this.buttonsBox.append(create('span', {text: '...'}));
            } else {
                let pageButton = create('button', {
                    text: pageNumber + 1,
                    className: pageNumber == this.currentPage ? 'active' : ''
                });
                this.buttonsBox.append(pageButton);
                pageButton.onclick = () => {
                    if (this.onpageclick) {
                        this.onpageclick(pageNumber);
                    }
                    this.currentPage = pageNumber;
                    this.render();
                };
            }
        }
        const forward = this.buttonsBox.append(create('button', {
            text: '>>', disabled: this.currentPage == this.totalPages - 1, onclick: () => {
                if (this.currentPage < this.totalPages - 1) {
                    this.currentPage++;
                    if (this.onpageclick) {
                        this.onpageclick(this.currentPage);
                    }
                    this.render();
                }
                return false;
            }
        }));

    }

    getPagination() {
        const boxesCount = 7;
        let boxes = [];
        if (this.totalPages <= boxesCount) {
            for (let i = 0; i < this.totalPages; i++) {
                boxes.push(i);
            }
        } else if (this.currentPage <= (boxesCount - 1) / 2 - 1) {
            for (let i = 0; i <= boxesCount - 3; i++) {
                boxes.push(i);
            }
            boxes.push(null);
            boxes.push(this.totalPages - 1);
        } else if (this.currentPage >= this.totalPages - (boxesCount - 1) / 2 - 1) {
            boxes.push(0);
            boxes.push(null);
            for (
                let i = this.totalPages - Math.floor((boxesCount - 1) / 2) - 2;
                i < this.totalPages;
                i++
            ) {
                boxes.push(i);
            }
        } else {
            boxes.push(0);
            boxes.push(null);
            for (
                let i = this.currentPage - Math.floor((boxesCount - 5) / 2);
                i <= this.currentPage + Math.ceil((boxesCount - 5) / 2);
                i++
            ) {
                boxes.push(i);
            }
            boxes.push(null);
            boxes.push(this.totalPages - 1);
        }
        return boxes;
    }
}

customElements
    .define(
        'pagination-buttons'
        ,
        PaginationButtons
    )
;
