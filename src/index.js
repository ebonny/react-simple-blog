import React from 'react';
import ReactDOM from 'react-dom';
import {Provider} from 'react-redux';
import {applyMiddleware, createStore} from 'redux';
import promise from 'redux-promise';
import reducers from './reducers';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';
import PostList from './components/post_list';
import PostAdd from './components/post_add';
import PostView from './components/post_view';
import $ from 'jquery';

const createStoreWithMiddleware = applyMiddleware(promise)(createStore);

$(document).ready(() => {
   $(":input[matching!='']").each(function (i, input) {
      let type = $(input).attr("matching");
      if (type) {
         switch (type) {
            case 'numOnly':
               $(input).on("input", function() {
                  $(this).val($(this).val().replace(/[^0-9]/g,'').replace(/^0.+/g, ''));
               });
               break;
            default:
               console.log("no matched function exists : ", type);
         }
      }
   });
});

ReactDOM.render(
      <Provider store={createStoreWithMiddleware(reducers)}>
         <Router>
            <div>
               <Switch>
                  <Route path="/posts/new" component={PostAdd}/>
                  <Route path="/posts/:id" component={PostView}/>
                  <Route path="/" component={PostList}/>    { /*  '/' 를 아래쪽에 배치 */ }
               </Switch>
            </div>
         </Router>
      </Provider>
      , document.querySelector('.container'));
