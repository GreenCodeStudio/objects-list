import {t} from './i18n.xml';
import {create} from "fast-creator";

export class ColumnFilter extends HTMLElement {
    constructor(props) {
        super(props);
        this.props = props;
        this.select = create('select')
        this.appendChild(this.select)
        this.select.append(create('option', {value: 'none', text: t('filter.none')}))
        this.select.append(create('option', {value: 'equals', text: t('filter.equals')}))
        this.select.append(create('option', {value: 'notEquals', text: t('filter.notEquals')}))
        if (props?.type != 'string') {
            this.select.append(create('option', {value: 'less', text: t('filter.lessThan')}))
            this.select.append(create('option', {value: 'more', text: t('filter.greaterThan')}))
            this.select.append(create('option', {value: 'range', text: t('filter.range')}))
        }
        if (props?.type == 'string') {
            this.select.append(create('option', {value: 'contains', text: t('filter.contains')}))
        }
        this.select.append(create('option', {value: 'oneOf', text: t('filter.oneOf')}))
        this.select.append(create('option', {value: 'empty', text: t('filter.empty')}))
        this.input = create('input')
        this.appendChild(this.input)
        this.input.oninput = () => this.emit();
        this.select.onchange = () => {
            this.updateInput();
            this.emit();
        }
        this.updateInput();
        [this.select, this.input].forEach(el => el.addEventListener('blur', (e) => {
            setTimeout(() => {
                if (this.matches(':focus-within, :focus')) return;
                this.dispatchEvent(new CustomEvent('blur', {bubbles: true}));
            }, 100);
        }));
    }

    updateInput() {
        if (this.select.value == 'none' || this.select.value == 'empty') {
            this.input.style.display = 'none'
        } else if (this.select.value == 'oneOf') {
            this.input.style.display = ''
            this.input.type = 'text';
        } else if (this.props?.type == 'number') {
            this.input.style.display = ''
            this.input.type = 'number';
        } else if (this.props?.type == 'datetime') {
            this.input.style.display = ''
            this.input.type = 'datetime-local';
        } else if (this.props?.type == 'date') {
            this.input.style.display = ''
            this.input.type = 'date';
        } else {
            this.input.style.display = ''
            this.input.type = 'text';
        }
    }

    emit() {
        this.dispatchEvent(new CustomEvent('x-filter', {detail: {type: this.select.value, value: this.input.value}}))
    }

    set({type, value}) {
        this.select.value = type;
        this.input.value = value;
        this.updateInput();
    }
}


customElements.define('column-filter', ColumnFilter);
