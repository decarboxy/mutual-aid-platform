import b from 'bss';
import m from 'mithril';

import { FieldInput } from './components/field-input';
import { SelectInput } from './components/select-input';
import { TextInput } from './components/text-input';
import { FormIntro } from './components/form-intro';

interface formOptions  {
    submitUrl?: string
}

const buildForm = (chapterId: string, options:formOptions) => {
    return {
        view: () => {
            return m("div" + b
                .w('50%')
                .ml('auto')
                .mr('auto')
                , [
                    m(FormIntro),
                    m("form", { method: 'POST', action: options.submitUrl || '/' }, [
                        m("input", { type: "hidden", name: "chapter_id", value: chapterId }),
                        m(FieldInput, {
                            name: "full_name",
                            label: "Full Name",
                            required: true,
                            type: "text",
                            placeholder: "Enter your name",
                        }),
                        m(FieldInput, {
                            label: "Email Address",
                            name: "email",
                            required: true,
                            type: "email",
                            placeholder: "Enter your edu email address",
                            pattern: ".+\\.edu$",
                            invalidMsg: "Please enter a valid email address on an edu domain",
                        }),
                        m(FieldInput, {
                            name: "phone",
                            label: "Phone Number",
                            required: true,
                            type: "tel",
                            placeholder: "###-###-####",
                            pattern: "\\(?[0-9]{3}\\)?-?[0-9]{3}-?[0-9]{4}",
                            invalidMsg: "Please double check your phone number",
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
                            pattern: "[0-9]{5}(-[0-9]{4})?",
                            invalidMsg: "Please enter a valid 5 digit zipcode",
                        }),
                        m(FieldInput, {
                            name: "amount",
                            label: "Amount",
                            required: true,
                            validator: (data) => {
                                const amount = parseFloat(data);
                                if(amount > 50.0) {
                                    return "We cannot offer assistance exceeding $50 at this time";
                                }
                                return ""
                            },
                            type: "text",
                            invalidMsg: "We cannot offer assistance exceeding $50 at this time",
                            placeholder:  "Requested aid amount",
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

export default (element: HTMLElement, chapterId: string, options: formOptions = {}) => {
    m.mount(element, buildForm(chapterId, options));
}