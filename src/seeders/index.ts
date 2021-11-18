/* eslint-disable import/no-extraneous-dependencies */
import glob from 'glob';
import path from 'path';

new Promise((resolve, reject) => {
  glob(path.join(__dirname, '/seeds/*.ts'), (err: any, res: any) => {
    if (err) {
      reject(err);
    } else {
      Promise.all(res.map((file: any) => import(file.replace(__dirname, '.').replace('.ts', '')))).then((modules) => {
        resolve(modules);
      });
    }
  });
}).then((modules: any) => {
  modules.forEach((module: any) => {
    module
  });
});
