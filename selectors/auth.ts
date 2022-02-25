import { createSelector } from 'reselect';
import { RootState } from '../store';

// // auth情報を取得するSelector
export const authSelector = (state: RootState) => state.auth;

export const idSelector = createSelector(authSelector, (auth) => {
  return auth.id;
});

export const userNameSelector = createSelector(authSelector, (auth) => {
  return auth.username;
});

// /**
//  * liffIdTokenを取得する
//  * @returns liffIdToken
//  */
// export const liffIdTokenSelector = createSelector(authSelector, (auth) => {
//   return auth.liffIdToken;
// });

// /**
//  * LINEの名前を取得する
//  * @returns displayName
//  */
// export const displayNameSelector = createSelector(authSelector, (auth) => {
//   return auth.displayName;
// });

// /**
//  * LINEの画像を取得する
//  * @returns pictureUrl
//  */
// export const pictureUrlSelector = createSelector(authSelector, (auth) => {
//   return auth.pictureUrl;
// });

// /**
//  * errorを取得する
//  * @returns error
//  */
export const errorSelector = createSelector(authSelector, (auth) => {
  return auth.error;
});

export const hasTokenErrorSelector = createSelector(authSelector, (auth) => {
  return auth.hasTokenError;
});
