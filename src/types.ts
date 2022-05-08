export type InlineStyle = { [k: string]: string };

export interface Todo {
    id: string;
    created: string;
    text: string;
    completed: boolean;
}

export interface Project {
    id: string;
    created: string;
    title: string;
}
