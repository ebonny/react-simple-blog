import React, {Component} from 'react';
import {reduxForm, Field} from 'redux-form';
import {Link} from 'react-router-dom';
import {connect} from 'react-redux';
import {createPost} from "../actions";
import {pack} from '../globals';

const {required, email} = pack.options.validate;

class PostAdd extends Component {

   onSubmit(props) {
      this.props.createPost(props, () => {
         this.props.history.push('/');
         /* submit 후 이동할 url 지정 */
      });
   }

   renderField(field) {
      const { input, label, type, matching, meta: { touched, error, warning } } = field;
      const clsName = `form-group ${touched && (error && 'has-danger') || (warning && 'has-warning') }`;

      return (
            <div className={clsName}>
               <label>{label}</label>
               {
                  type == 'input' &&
                  <input type="text" {...input} className="form-control" matching={matching} />
                  ||
                  type == 'textarea' &&
                  <textarea {...input} className="form-control" matching={matching}></textarea>
               }
               {touched ? error || warning : ''}
            </div>
      );
   }

   render() {
      const {handleSubmit} = this.props;

      return (
            <form onSubmit={handleSubmit(this.onSubmit.bind(this))}>
               <h3>Create a New Post</h3>
               <Field
                     label="Title"
                     name="title"
                     type="input"
                     component={this.renderField}
                     validate={[required]}
                     matching="numOnly"
               />
               <Field
                     label="Categoried"
                     name="categories"
                     type="input"
                     component={this.renderField}
               />
               <Field
                     label="Content"
                     name="content"
                     type="textarea"
                     component={this.renderField}
                     validate={[required]}
                     warn={email}
               />

               {
                  /* Field 는 redux form 과 wire 할줄만 알지, 화면에 어떻게 렌더링할지는 모른다.
                     이부분을 component 를 통해서 JSX 에게 위임한다.
                  */
               }

               {/*<div className="form-group">
                  <label>Title</label>
                  <input type="text" className="form-control" {...title} />
               </div>
               <div className="form-group">
                  <label>Categories</label>
                  <input type="text" className="form-control" {...categories} />
               </div>
               <div className="form-group">
                  <label>Content</label>
                  <textarea className="form-control" {...content} />
               </div>*/}

               <button type="submit" className="btn btn-primary">Save</button>
               <Link to="/" className="btn btn-danger ml-2">Cancel</Link>

            </form>
      );
   }
}

function validate(values) {
   /* values 는 { title: '입력값', categories: '입력값', content: '입력값' }  객체이다. */
   const invalidMsgs = {};

   if (!values.title) {
      invalidMsgs.title = "Enter a Title";
   }
   if (!values.categories) {
      invalidMsgs.categories = "Enter some Categories";
   }
   if (!values.content) {
      invalidMsgs.content = "Enter some Content";
   }

   return invalidMsgs;

}

export default reduxForm({
   /* ▼ 리덕스폼으로 전달하는 문자열이 여기에 위치 */
   form: 'PostAddForm' // 유니크한 이름이면 된다. 딱히 이름을 사용할 곳은 없다.
   //validate    // validate: validate 의 EA6 생략구문
})(
      connect(null, {createPost})(PostAdd)
);

// 세번째 { createPost } 는
// mapDispatchToProps(dispatch) {
//    return bindActionCreators({ 액션생성자 }, dispatch);
// }
// 를 생략하고 액션생성자를 connect 에서 바로 사용하기 위한 생략구문이었다. 여기서도 이와 동일하다.

// connect : 1st arg = mapStateToProps, 2st arg = mapDispatchToProps
// reduxForm: 1st arg = form config, 2st arg = mapStateToProps, 3st arg = mapDispatchToProps(=액션생성자)

// 사용자가 뭔가를 인풋에 입력하면, 이것이 어플리케이션 스테이트로 저장되고, (실제론 컴포넌트 스테이트를 어플리케이션 스테이트로 바꿈)
// 새 스테이트는 form 과 formReducer 가 된다.
// 새 스테이트의 형태는 다음과 같다.
/*

state === {
   form: {
      PostAddForm: {
         title: '...',
         categories: '...',
         content: '...'
      }
   }
}

 */