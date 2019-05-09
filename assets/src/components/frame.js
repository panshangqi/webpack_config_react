import 'whatwg-fetch';

const Frames = {}
function paramFormat(obj){
    var str = ''
    for(var key in obj){
        if(str != ''){
            str += '&'
        }
        str += `${key}=${obj[key]}`
    }
    return str;
}
function common_fetch(method, url, reqParams = {}, callback, fn_err){
    const dtime = new Date().getTime()
    const params = reqParams
    let path = url
    const setting = {
        method,
        credentials: 'include',
        headers: {
            'X-Requested-With': 'XMLHttpRequest',
            'Content-Type': 'application/json',
            'Accept': 'application/json; charset=utf-8'
        }
    }
    params.t = dtime
    if(method == 'post' || method == 'put'){
        setting.body = JSON.stringify(params)
    }else{ //get delete
        const params_string = paramFormat(params)
        path = `${url}?${params_string}`
    }
    function check_response_status(res){
        const { status } = res;
        const msg = [];
        if (status >= 200 && status < 300) {
            return res;
        }else if (status === 400 || status === 500) {
            msg.push('我们正在努力解决问题');
        }
        else if (status === 401) {
            msg.push('您尚未登录');
        }
        else if (status === 403) {
            msg.push('你无权限访问');
        }
        else if (status === 404) {
            msg.push('未发现所请求的资源');
        }
        else if (status === 403) {
            msg.push('没有权限或访问的资源不属于此账号');
        }
        else if (status === 502) {
            msg.push('服务正在升级，请稍后重试！');
        }
        if(typeof fn_err === 'function'){
            fn_err(status);
        }
        msg.push(`(${res.statusText})`);
        const error = new Error();
        error.name = status;
        error.message = msg.join('\n');
        error.res = res;
        throw error;

    }
    function parse_res(res){
        return res.json()
    }
    function success(res_data){
        if(typeof callback === 'function')
            callback(res_data)
    }
    function net_error(err){
        if(typeof fn_err === 'function'){
            fn_err(500)
        }
        console.log(err.message)
    }
    fetch(path, setting).then(check_response_status)
        .then(parse_res)
        .then(success)
        .catch(net_error)
}

Frames.http = {
    get(url, reqParam, callback, fn_err) {
        return common_fetch('get', url, reqParam, callback, fn_err);
    },
    post(url, reqParam, callback, fn_err) {
        return common_fetch('post', url, reqParam, callback, fn_err);
    },
    put(url, reqParam, callback, fn_err) {
        return common_fetch('put', url, reqParam, callback, fn_err);
    },
    _delete(url, reqParam, callback, fn_err) {
        return common_fetch('delete', url, reqParam, callback, fn_err);
    },
    getSync(url, reqParam){
        return new Promise(function (resolve, reject) {
            YQ.http.get(url, reqParam, function (data) {
                resolve(data)
            },function (err_code) {
                resolve(err_code)
            })
        })
    },
    postSync(url, reqParam){
        return new Promise(function (resolve, reject) {
            YQ.http.post(url, reqParam, function (data) {
                resolve(data)
            },function (err_code) {
                resolve(err_code)
            })
        })
    }
};

export default Frames;
