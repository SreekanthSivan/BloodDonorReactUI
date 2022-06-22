import axios from "axios";

const baseUrl = "http://localhost:60671/api/"
const azureUrl = "https://blooddonorapiservice2022.azurewebsites.net/api/"


export default {

    dCandidate(url = azureUrl + 'dcandidate/') {
        return {
            fetchAll: () => axios.get(url),
            fetchById: id => axios.get(url + id),
            create: newRecord => axios.post(url, newRecord),
            update: (id, updateRecord) => axios.put(url + id, updateRecord),
            delete: id => axios.delete(url + id)
        }
    }
}