import $ from "jquery";

class UserAction {
    createUser(user) {
        $.ajax({
            url: "http://localhost/users/save",
            type: "POST",
            data: JSON.stringify(user),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data, textStatus) => {
                console.log(data);
                console.log(textStatus);
            }
        })
    }

    loadList(pagination, callback){
        $.ajax({
            url: "http://localhost/users/list",
            type: "POST",
            data: JSON.stringify({pagination}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data, textStatus) => {
                callback(data)
            }
        });
    }
}
export default new UserAction();