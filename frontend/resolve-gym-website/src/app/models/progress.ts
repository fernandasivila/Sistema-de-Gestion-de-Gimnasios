interface image{
    data: Buffer;
    contentType: String;
}

export interface Progress {
    //_id:String;
    name: String;
    weight: Number;
    date: Date;
    images: image[];
}
