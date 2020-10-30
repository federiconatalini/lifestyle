class IndexController {

    constructor() {
        this.title;
        this.subtitle;
        this.body;
        this.image;
        this.public;
        this.featured;
        this.created_date;
        this.tag;
        this.postID=[];
        this.restController = new RestController();
        this.newArticleTime=false;
        this.newArticleImg=false;
        this.newArticle=false;
        this.getComment=false;
        this.editPost=false;
    }

    init() {
        $(document).ready(function () {
            this.title = $("#title");
            this.body = $("#body");
            this.subtitle = $("#subtitle");
            this.image = $("#image");
            this.public = $("#public");
            this.featured = $("#featured");
            this.tag = $("#tag");
            this.getPost();
            $('#addPost').click(this.addPost.bind(this));
        }.bind(this))
    }

    getPost() {
        this.restController.get('http://localhost:3000/posts', function (data, textStatus, jqXHR) {
            for (let id in data) {
                this.showPost(data[id]);
                console.log(data[id])
                this.postID.push(data[id]._id);
                this.getComment=true;
            }
        }.bind(this));
    }

    deletePost(post, postContainer){
        if(!this.newArticle){
            postContainer.css("display", "none");
            console.log('id: '+post._id+', titolo: '+post.title);
            this.restController.delete('http://localhost:3000/posts/'+ post._id, function(data, status, xhr){
            }.bind(this))
        }else{
            postContainer.css("display", "none");
            this.newArticle=false;
        }
    }

    addPost() {
        this.closeModal();
        var pub = this.public.prop("checked") ? 'public' : 'draft';
        var fea = this.featured.prop("checked");
        this.newArticleTime=true;
        this.newArticleImg=true;
        this.newArticle=true;
        var date= new Date;
        var tags= this.addTag();
        var p = new Post(this.title.val(), this.subtitle.val(), this.body.val(), pub, fea, this.image.val(), tags, date);
        this.newPost(p);
        this.resetModal();
    }

    addTag(){
        var t=[];
        for(let i in this.tag.val().split('#')){
            var tag=this.tag.val().split('#')[i];
            if(tag!='') t.push(tag);
        }
        return t;
    }

    newPost(post) {
        this.restController.post("http://localhost:3000/posts", post, function (data, status, xhr) {
            this.showPost(post);
            console.log('POST2', post)
        }.bind(this))
    }

    showPost(post) {
        if (post.status == 'public') {
            this.buildCard(post);
        }
    }

    buildCard(post) {
        var postContainer = $("#postStyle").clone();
        postContainer.css("display", "block");
        postContainer.attr("id", "");
        postContainer.addClass("class", "postContainer");
        var postTitle = postContainer.find(".card-title");
        var postSubtitle = postContainer.find(".card-subtitle");
        var postBody = postContainer.find(".card-text");
        var postDate = postContainer.find("#date");
        var postImg = postContainer.find("#img");
        var postFeatured = postContainer.find('#badge');
        var postTag = postContainer.find('#tags');
        if (post.featured) postFeatured.html('<span class="badge badge-primary">In primo piano!</span>');
        postTitle.html(post.title);
        postSubtitle.html(post.description);
        postBody.html(post.body);
        this.addBadgeTag(post.tags, postTag);
        this.addTime(post, postDate);
        this.addImg(post, postImg);
        post.featured ? $("#postContainer").prepend(postContainer) : $("#postContainer").append(postContainer);
        if(this.getComment){
            for(let i in post.post_comments){
                this.showComment(post.post_comments[i], postContainer);
                this.getComment=false;
            }
        }
        postContainer.find("#updatePost").click(function(){
            this.editPost=true;
            this.updatePost(post, postContainer);
        }.bind(this))
        postContainer.find("#deletePost").click(function(){
            this.deletePost(post, postContainer);
        }.bind(this))
        postContainer.find("#comment").click(function(){
            this.addComment(post, postContainer);
        }.bind(this))
    }

    addComment(post, postContainer){
        var comment=new Comment(postContainer.find('#commento').val(), post.author);
        if( comment.body!=''){
            this.restController.postComment("http://localhost:3000/comments/"+post._id , comment, function (data, status, xhr) {
            this.showComment(comment, postContainer);
            }.bind(this))
        }
    }

    showComment(comment, postContainer){
        return postContainer.find('#newComment').append('<li class="list-group-item"><p class="badge badge-light mr-4">'+comment.author +'</p>'+ comment.body +'</li>')
    }

    addImg(post, postImg){
        if(this.newArticleImg){
            (post.image != "") ? postImg.html('<img class="card-img-top" src="' + post.image + '" alt="immagine non trovata" style="max-width:100%;max-height:300px;">') : "";
            this.newArticleImg=false;
        }else{
            (post.image != "") ?  postImg.html('<img class="card-img-top" src="' + post.image + '" alt="immagine non trovata" style="max-width:100%;max-height:300px;">') : "";
        }
    }

    addTime(post, postDate){
        var day,month,year;
        if(this.newArticleTime){
            var date=post.created_date.toString();
            day= date.split(' ')[2]
            month= date.split(' ')[1]
            year= date.split(' ')[3]
            postDate.html('Pubblicato il: ' +day+' '+month+ ' '+ year);
            this.newArticleTime=false;
        }else{
            var msec = Date.parse( post.created_date.split('T')[0]);
            var d = new Date(msec).toString();
            day= d.split(' ')[2]
            month= d.split(' ')[1]
            year= d.split(' ')[3]
            postDate.html('Pubblicato il: '+day+' '+month+ ' '+ year);
        }
    }

    addBadgeTag(tags, postTag){
        for(var i=0; i<tags.length; i++){
            postTag.append('<span class="badge badge-pill badge-secondary ml-2">#' +tags[i] + '</span>');
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
        this.tag.val("");
    }
}