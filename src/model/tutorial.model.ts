export default class TutorialModel {
    private readonly _id: number;
    private _title: string;
    private _description: string;
    private _published: boolean;

    constructor(id: number, title: string, description: string, published: boolean) {
        this._id = id;
        this._title = title;
        this._description = description;
        this._published = published;
    }

    set title(value: string) { this._title = value; }

    set description(value: string) { this._description = value; }

    set published(value: boolean) { this._published = value; }

    get id(): number { return this._id; }

    get title(): string { return this._title; }

    get description(): string { return this._description; }

    get published(): boolean { return this._published; }
}