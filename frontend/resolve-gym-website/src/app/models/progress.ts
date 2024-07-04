interface image{
    data: String;
    contentType: String;
}

export interface Progress {
    _id:String;
    name: String;
    weight: Number;
    date: Date;
    images: image[];
}
