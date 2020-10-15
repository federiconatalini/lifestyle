class Post {
    constructor(title, subtitle, body, author, pub, featured, date, img, tag) {
        this.title = title;
        this.subtitle = subtitle;
        this.body = body;
        this.public = pub;
        this.featured = featured;
        this.author = author;
        this.date = date;
        this.img = img;
        this.tag = [];
    }
}