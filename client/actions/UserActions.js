import $ from "jquery";

class UserAction {

    constructor() {
        this.token = null;

    }

    createUser(user) {
        $.ajax({
            url: "http://localhost/users/save",
            headers: {
                "auth-token": this.token
            },
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
        const token = this.token;
        $.ajax({
            url: "http://localhost/users/list",
            headers: {
                "auth-token": token
            },
            type: "POST",
            data: JSON.stringify({pagination}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success: (data, textStatus) => {
                callback(data)
            }
        });
    }

    login(login, password, callback) {
        const me = this;
        $.ajax({
            url: "http://localhost/login",
            type: "POST",
            data: JSON.stringify({"email":login, "password":password}),
            contentType: "application/json; charset=utf-8",
            dataType: "json",
            success(data) {
                if(data.token) {
                    me.token = data.token;
                    callback();
                }
            }
        })
    }
}
export default new UserAction();