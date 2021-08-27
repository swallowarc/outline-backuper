import axios from "axios";
import sprintf from "sprintf-js"

export class OutlineClient {
  constructor(baseURL, token) {
    this.axios = axios.create({
      baseURL: baseURL, // URL:port
      headers: {
        'content-type': 'application/json',
        'authorization': sprintf.sprintf('Bearer %s', token),
        'accept': 'application/json',
      },
      responseType: 'json'
    });
  }

  async GetBackup(collectionID) {
    try {
      const params = {
        'id': collectionID,
      };
      const res = await this.axios.post('collections.export', params);
      console.log(res);
    } catch (error) {
      console.log(error);
      return 1;
    }

    return 0;
  }
}
