import http from '../http-common';
import TutorialModel from "../model/tutorial.model";

class TutorialDataService {
    getAll() { return http.get('/tutorials'); }

    get(id: number) { return http.get(`/tutorials/${id}`); }

    create(data: TutorialModel) { return http.post('/tutorials', data); }

    update(id: number, data: TutorialModel) { return http.put(`/tutorials/${id}`, data); }

    delete(id: number) { return http.delete(`/tutorials/${id}`); }

    deleteAll() { return http.delete('/tutorials'); }

    findByTitle(title: string) { return http.get(`/tutorials?title=${title}`); }
}

export default new TutorialDataService();