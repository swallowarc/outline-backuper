import axios from "axios";
import s from "sprintf-js";

export class OutlineClient {
  #axios;

  constructor(baseURL, token) {
    this.#axios = axios.create({
      baseURL: baseURL, // 'URL:port'
      headers: {
        'content-type': 'application/json',
        'authorization': s.sprintf('Bearer %s', token),
        'accept': 'application/json',
      },
      responseType: 'json'
    });
  }

  async listCollectionIDs() {
    let result = [];
    const res = await this.#axios.post('collections.list');
    res.data.data.forEach(collection => {
      result.push(collection.id);
    });

    return result;
  }

  async exportCollection(collectionID) {
    const opt = {
      responseType: 'arraybuffer',
    };
    const res = await this.#axios.post('collections.export', {
      id: collectionID,
    }, opt);

    return res.data;
  }
}
