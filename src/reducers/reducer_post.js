import {FETCH_POSTS, FETCH_POST} from "../actions/index";
import _ from 'lodash';
import {DELETE_POST} from "../actions";

export default function (state = {}, action) {
   switch (action.type) {
      case FETCH_POSTS:
         return _.mapKeys(action.payload.data, 'id');
         /*
            [
               { id: '5', title: 'asdf', ..},
               { id: '6', title: 'some', .. }
            ]

            을

            {
               '5': { id: '5', title: 'asdf', .. },
               '6': { id: '6', title: 'some', .. }
            }

            식으로 바꾼다. 두번째 인자인 'id' 를 키로 사용한다.
          */
      case FETCH_POST:
         //=== ES5 ===
         // const post = action.payload.data;
         // const newState = { ...state};
         // newState[post.id] = post;
         // return newState;

         //=== ES6 ===
         return { ...state, [action.payload.data.id]: action.payload.data };
      case DELETE_POST:
         // 구린 방법
         // delete state[action.payload];
         // return { ...state };

         // lodsh 이용법
         return _.omit(state, action.payload);  // 새 객체를 반환.
      default:
         return state;
   }

}