import request from 'superagent'

const host = 'http://101.200.129.112:9527/';
const GET_FILE = host + 'file/get/';
const RENAME_FILE = host + 'file/rename/';
const NEW_FOLDER = host + 'file/mkdir/';
const REMOVE = host + 'file/remove/';
const PASTE = host + 'file/copy';
const CUT = host + 'file/move';

export function getFileList(path,successCb,errorCb) {
    request
        .get(GET_FILE)
        .query({
            path:path
        })
        .end(function (err, res) {
            if(err){return errorCb(err)}
            successCb(res.body)
        })
}

export function rename(query,successCb,errorCb) {
    request
        .get(RENAME_FILE)
        .query(query)
        .end(function (err, res) {
            if(err){return errorCb(err)}
            successCb(res.body)
        })
}

export function newFolder(query, successCb, errorCb) {
    request
        .get(NEW_FOLDER)
        .query(query)
        .end(function (err, res) {
            if(err){return errorCb(err)}
            successCb(res.body)
        })
}
export function remove(query, successCb, errorCb) {
    request
        .get(REMOVE)
        .query(query)
        .end(function (err, res) {
            if(err){return errorCb(err)}
            successCb(res.body)
        })
}

export function paste(query, successCb, errorCb) {
    request
        .get(PASTE)
        .query(query)
        .end(function (err, res) {
            if(err){return errorCb(err)}
            successCb(res.body)
        })
}
export function cut(query, successCb, errorCb) {
    request
        .get(CUT)
        .query(query)
        .end(function (err, res) {
            if(err){return errorCb(err)}
            successCb(res.body)
        })
}