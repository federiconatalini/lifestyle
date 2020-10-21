class RestController{
    constructor(){}

    get(url, onSuccess){
        $.get({
            url: url,
            dataType: 'json',
            success: onSuccess
        });
    }

    post(url, d, onSuccess){
        $.post({
            url: url,
            data: JSON.stringify(d),
            dataType: 'json',
            contentType: "application/json",
            success: onSuccess
        });
    }

    delete(url, onSuccess){
        $.ajax({
            url : url,
            type : 'DELETE',
            dataType: 'json',
            success: onSuccess
        });
    }
}