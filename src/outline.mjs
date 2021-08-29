import axios from "axios";
import s from "sprintf-js"

export class OutlineClient {
  constructor(baseURL, token) {
    this.axios = axios.create({
      baseURL: baseURL, // URL:port
      headers: {
        'content-type': 'application/json',
        'authorization': s.sprintf('Bearer %s', token),
        'accept': 'application/json',
      },
      responseType: 'json'
    });
  }

  async ExportCollection(collectionID) {
    const res = await this.axios.post('collections.export', {
      'id': collectionID,
    });

    return res.data;
  }
}
