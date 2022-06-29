import api from "./api";

export const ACTION_TYPES = {
    CREATE: 'CREATE',
    UPDATE: 'UPDATE',
    DELETE: 'DELETE',
    FETCH_ALL: 'FETCH_ALL',
    UPLOAD: 'UPLOAD',
    DOWNLOAD: 'DOWNLOAD'
}

const formateData = data => ({
    ...data,
    age: parseInt(data.age ? data.age : 0)
})

export const fetchAll = () => dispatch => {
    api.dCandidate().fetchAll()
        .then(response => {
            dispatch({
                type: ACTION_TYPES.FETCH_ALL,
                payload: response.data
            })
        })
        .catch(err => console.log(err))
}

export const create = (data, onSuccess) => dispatch => {
    data = formateData(data)
    api.dCandidate().create(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.CREATE,
                payload: res.data
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const update = (id, data, onSuccess) => dispatch => {
    data = formateData(data)
    api.dCandidate().update(id, data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPDATE,
                payload: { id, ...data }
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const Delete = (id, onSuccess) => dispatch => {
    api.dCandidate().delete(id)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DELETE,
                payload: id
            })
            onSuccess()
        })
        .catch(err => console.log(err))
}

export const upload = (data, onSuccess) => dispatch => {
    api.files().uploadFile(data)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.UPLOAD,
                payload: res.data
            })
            onSuccess(res.data)
        })
        .catch(err => console.log(err))
}
export const download = (fileName) => dispatch => {
    api.files().downloadFile(fileName)
        .then(res => {
            dispatch({
                type: ACTION_TYPES.DOWNLOAD,
                payload: res.data
            })
        })
        .catch(err => console.log(err))
}