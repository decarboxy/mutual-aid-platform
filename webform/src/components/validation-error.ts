import m from 'mithril';
import b from 'bss';

export const ValidationError = (): m.Component => {
    return {
        view: ({ children }) => {
            return m("div" + b.c("#e9322d"), children)
        }
    }
}