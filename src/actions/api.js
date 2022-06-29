import axios from "axios";

export default {

    dCandidate(url = process.env.REACT_APP_API_URL + 'dcandidate/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    },
    files(url = process.env.REACT_APP_API_URL + 'file/') {
        return {
            uploadFile: formData => axios.post(url + 'upload/', formData, {
                headers: {
                  'Content-Type': 'multipart/form-data'
                }
            }),
            downloadFile: fileName => axios.get(url + 'download/', fileName)
        }
    }
}