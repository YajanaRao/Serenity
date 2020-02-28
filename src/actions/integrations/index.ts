import { addSong } from '..';
import { ThunkDispatch } from 'redux-thunk';
import { AnyAction } from 'redux';

export const bootstrap = (integrations: string[]) => (
  dispatch: ThunkDispatch<{}, {}, AnyAction>,
) => {
  console.log(integrations);
  if (integrations.length) {
    integrations.forEach(intergration => {
      import(`./${intergration}`).then(obj => {
        let plugin = obj.default;
        let handler = new plugin();
        handler.getData().then(data => {
          console.log(Object.keys(data), Object.values(data), data.length);
          data.forEach(song => {
            console.log(song);
            dispatch(addSong(song));
          });
        });
      });
    });
  }
};
