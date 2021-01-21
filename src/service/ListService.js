import axios from 'axios';


export class ListService {
    
    baseUrl = "http://localhost:8080/api/list/";

    getAll(){
        return axios.get(this.baseUrl + "all" ,{headers: {'Access-Control-Allow-Origin': '*'}}).then(res => res.data);
    }

    save(list) {
        return axios.post(this.baseUrl + "save", list ,{headers: {'Access-Control-Allow-Origin': '*'}}).then(res => res.data);
    }

    delete(id) {
        return axios.get(this.baseUrl + "delete/"+id,{headers: {'Access-Control-Allow-Origin': '*'}} ).then(res => res.data);
    }
}