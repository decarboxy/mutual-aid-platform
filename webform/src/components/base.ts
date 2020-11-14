import b from 'bss';

export interface BaseConfig {
    name: string
    attrs?: object
    label?: string
    required?: boolean,
    validator?: (input: string) => string
}

export const styleInput = b
    .d("block")
    .border("1px solid #ccc")
    .bs("inset 0 1px 3px #ddd")
    .boxSizing('border-box')
    .br("4px")
    .p("0.5em")
    .w('100%')
    .fontFamily('inherit')
    .$focus(
        b.outline('0')
    )
    .$invalid(
        b.$not(":placeholder-shown", 
            b
                .borderColor("#e9322d")
        )
    )