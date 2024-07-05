import { BufferData } from "./buffer-data";

interface image{
    data: BufferData;
    contentType: String;
}

export interface Progress {
    _id:String;
    name: String;
    weight: Number;
    date: Date;
    images: image[];
}
