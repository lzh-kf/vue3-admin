interface Form {
    userAccount: string;
    password: string;
}

interface Rule {
    required?: boolean;
    message?: string;
    trigger?: string;
}

interface RuleObject {
    [key: string]: Array<Rule>;
}

interface Data {
    formData: Form;
    rules: RuleObject;
}

export { Data, Form }