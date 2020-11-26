import m from 'mithril'

import { InputComponentFactory, styleInput } from './base';

export const TextInput = InputComponentFactory({
    view: ({ attrs }) => {
        return m("textarea" + styleInput, attrs);
    }
})