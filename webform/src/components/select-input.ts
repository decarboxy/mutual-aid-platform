import m from 'mithril'

import { InputComponentFactory, InputAttributes, styleInput } from './base';

interface SelectInputAttributes extends InputAttributes {
    options: {
        [option: string]: string
    }
}

const innerSelect: m.Component<SelectInputAttributes> = {
    view: ({ attrs: { options, value, ...attrs }} ) => {
        return m("select" + styleInput, attrs,
            m("option", { hidden: true, selected: value === ""}, "Select one..."),
            Object.entries(options).map(([option, description], idx) => {
                return m("option", { value: option, selected: value === option, key: idx}, description)
            })
        )
    }
}

export const SelectInput = InputComponentFactory<SelectInputAttributes>(innerSelect)