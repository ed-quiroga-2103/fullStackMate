export interface Question {
    question: string;
    correctId: int;
    type: string;
    tags: string[];
    options: Option[];
    attachments: Attachment[];
}

export interface Option {
    id: int;
    value: string;
    attachments: Attachment[];
}

export interface Attachment {
    name: string;
    type: string;
    data: string;
}
