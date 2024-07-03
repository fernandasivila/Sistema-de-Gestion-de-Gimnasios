export interface Coach {
    //_id?: String;
    fullname: String;
    email: String;
    workArea: String;
    img: {
        data: Buffer;
        contentType: String;
    };
    age: Number;
    description: String;
    schedule: String;
}
