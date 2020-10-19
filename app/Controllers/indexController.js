class IndexController {

    constructor() {
        this.title;
        this.body;
        this.public;
        this.featured;
        this.created_date;
        this.restController = new RestController();
    }

    init() {
        $(document).ready(function () {
            this.title = $("#title");
            this.body = $("#body");
            //this.public = $("#pubblico");
            //this.featured = $("#featured");
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
        var postBody = postContainer.find(".card-text");
        var postDate = postContainer.find(".card-footer");
        var postImg = postContainer.find(".card-img-top");
        postTitle.html(post.title);
        postBody.html(post.body);
        postDate.html(post.created_date)
        $("#postContainer").append(postContainer);
    }

    addPost(){
        this.closeModal();
        //var pub = this.public.prop("checked");
        //var fea = this.featured.prop("checked");
        var p = new Post(this.title.val(), this.body.val());
        this.newPost(p);
        this.resetModal();
    }

    newPost(post) {
        console.log('POST1',post)
        this.restController.post("http://localhost:3000/posts", post, function (data, status, xhr) {
        this.showPost(post);
        console.log('POST2',post)
        }.bind(this))
    }

    showPost(post) {
      //  if (post.public) {
        //    if (post.featured) {
          //      this.buildCardFeatured(that[that.length - 1].title, that[that.length - 1].body);
            //} else {
                this.buildCard(post.title, post.body);
            //}
        //} 
    }
    
    closeModal() {
        $("#modal").modal("hide");
    }

    resetModal() {
        this.title.val("");
        this.body.val("");
    }
}