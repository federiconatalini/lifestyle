class Post {
    constructor(title, description, body, status, featured, image, created_date, tags, author) {
        this.title = title;
        this.description = description;
        this.body = body;
        this.status = status;
        this.featured = featured;
        this.author = author;
        this.created_date = created_date;
        this.image = image;
        this.tags = [];
    }
}