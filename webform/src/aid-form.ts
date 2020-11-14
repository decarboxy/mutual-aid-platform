import b from 'bss';
import m from 'mithril';

import { FieldInput } from './components/field-input';
import { SelectInput } from './components/select-input';
import { TextInput } from './components/text-input';
import { FormIntro } from './components/form-intro';

const buildForm = (chapterId: string) => {
    return {
        view: () => {
            return m("div" + b
                .w('50%')
                .ml('auto')
                .mr('auto')
                , [
                    m(FormIntro),
                    m("form", [
                        m("input", { type: "hidden", name: "chapter_id", value: chapterId }),
                        m(FieldInput, {
                            name: "full_name",
                            label: "Full Name",
                            type: "text",
                            required: true,
                            attrs: {
                                placeholder: "Enter your name",
                            }
                        }),
                        m(FieldInput, {
                            label: "Email Address",
                            name: "email",
                            type: "email",
                            required: true,
                            attrs: {
                                placeholder: "Enter your edu email address",
                                pattern: ".+\\.edu$",
                            },
                        }),
                        m(FieldInput, {
                            name: "phone",
                            label: "Phone Number",
                            type: "tel",
                            required: true,
                            attrs: {
                                placeholder: "###-###-####",
                                pattern: "[0-9]{3}-[0-9]{3}-[0-9]{4}"
                            }
                        }),
                        m(FieldInput, {
                            name: "institution",
                            label: "Institution",
                            type: "text"
                        }),
                        m(FieldInput, {
                            name: "group",
                            label: "Research Group or Advisor",
                            type: "text"
                        }),
                        m(FieldInput, {
                            name: "zip",
                            label: "Zipcode",
                            type: "text",
                            attrs: {
                                pattern: "[0-9]{5}(-[0-9]{4})?",
                            }
                        }),
                        m(FieldInput, {
                            name: "amount",
                            label: "Amount",
                            type: "text",
                            required: true,
                            validator: (data) => {
                                const amount = parseFloat(data);
                                if(amount > 50.0) {
                                    return "We cannot offer assistance exceeding $50 at this time";
                                }
                                return ""
                            },
                            attrs: {
                                placeholder:  "Requested aid amount",
                            },
                        }),
                        m(SelectInput, {
                            name: "payment_method",
                            label: "Payment Method",
                            options: {
                                venmo: "Venmo",
                                cash_app: "Cash App",
                                paypal: "PayPal",
                                zelle: "Zelle",
                            },
                        }),
                        m(TextInput, {
                            name: "reason",
                            label: "Request Details"
                        }),
                        m(FieldInput, {
                            name: "referral",
                            label: "Where did you find us?",
                            type: "text"
                        }),
                        m("button", {
                            type: "submit",
                        }, "Send Request")
                    ])
                ])
        }
    }
}

export default (element: HTMLElement, chapterId: string) => {
    m.mount(element, buildForm(chapterId));
}