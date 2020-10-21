class IndexController {

    constructor() {
        this.title;
        this.subtitle;
        this.body;
        this.image;
        this.public;
        this.featured;
        this.created_date;
        this.restController = new RestController();
    }

    init() {
        $(document).ready(function () {
            this.title = $("#title");
            this.body = $("#body");
            this.subtitle=$("#subtitle");
            this.image=$("#img");
            this.public = $("#public");
            this.featured = $("#featured");
            this.getPost();

            $('#addPost').click(this.addPost.bind(this));

        }.bind(this))
    }

    getPost() {
        this.restController.get('http://localhost:3000/posts', function (data, textStatus, jqXHR) {
            for (let id in data) {
                this.showPosts(data[id]);
                this.created_date=data[id].created_date;
            }
        }.bind(this));
    }

    showPosts(post) {
       // if (post.public != false) {
         //   if (post.featured != true) {
                this.buildCard(post);
           // }
            //else {
              //  this.buildCardFeatured(post.title, post.body, post.tag);
                //}
            //}
        //}
    }

    buildCard(post){
        var postContainer = $("#postStyle").clone();
        postContainer.css("display","block");
        postContainer.attr("id","");
        postContainer.addClass("class","postContainer");
        var postTitle = postContainer.find(".card-title");
        var postSubtitle = postContainer.find(".card-subtitle");
        var postBody = postContainer.find(".card-text");
        var postDate = postContainer.find(".card-footer");
        var postImg = postContainer.find("#img");
        postTitle.html(post.title);
        postSubtitle.html(post.description);
        postBody.html(post.body);
        (post.image!="") ? postImg.html('<img class="card-img-top" src="'+ post.image +'" alt="immagine non trovata"></img>'): "";
        postDate.html(post.created_date)
        $("#postContainer").append(postContainer);
    }

    addPost(){
        this.closeModal();
        var pub = this.public.prop("checked") ? 'public' : 'draft';
        var fea = this.featured.prop("checked");
        var p = new Post(this.title.val(), this.subtitle.val(), this.body.val(), pub, fea, this.image.val());
        this.newPost(p);
        this.resetModal();
    }

    newPost(post) {
        this.restController.post("http://localhost:3000/posts", post, function (data, status, xhr) {
        this.showPost(post);
        console.log('POST2',post)
        }.bind(this))
    }

    showPost(post) {
        if (post.status=='public') {
            //if (post.featured) {
                //this.buildCardFeatured(that[that.length - 1].title, that[that.length - 1].body);
            //} else {
                this.buildCard(post);
            //}
        } 
    }
    
    closeModal() {
        $("#modal").modal("hide");
    }

    resetModal() {
        this.title.val("");
        this.body.val("");
        this.subtitle.val("");
        this.image.val("");
    }
}