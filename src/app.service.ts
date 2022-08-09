import * as fs from 'fs';
import { environments } from './config/environments';

export class GlobalService {
  async uploadFile(fileName: string, file: string) {
    const fileDecoded = Buffer.from(file, 'base64');
    fs.writeFile(
      `${environments.PATH_HTTP_SERVER}products/${fileName}`,
      fileDecoded,
      (err) => {
        if (err) console.log(err);
        else {
          console.log('File written successfully\n');
        }
      },
    );
  }
}
