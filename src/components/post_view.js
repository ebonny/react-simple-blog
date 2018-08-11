import React, {Component, PropTypes} from 'react';
import {connect} from 'react-redux';
import {fetchPost, deletePost} from "../actions/index";
import {Link} from 'react-router-dom';

class PostView extends Component {
   componentDidMount() {
      if(!this.props.post) {
         const {id} = this.props.match.params;
         // ★ 라우터 정보, 즉 url 에서 id 를 가져온다.
         // 라우터에서 :id 라고 선언했으므로 .id  로 가져온다.
         // 만약, 특정댓글로 바로 이동하고싶을때 댓글 아이디가 필요하다.
         // 이땐, /:id/:commentId  식으로 라우터에 선언하고, ..params.commentId 를 가져오면 되겠다.
         this.props.fetchPost(id);
      }
   }

   onDeleteClick() {
      // const {id} = this.props.post;    // ★ 위험한 방식이다. 아직 없거나 유효하지 않을수 있다.
      const {id} = this.props.match.params;

      this.props.deletePost(id, () => {
         this.props.history.push('/');
      });
   }

   render() {
      const {post} = this.props;
      const heightStyle = {
         height: '10px'
      };

      // spinner
      if (!post) {
         return <div>Loading...</div>
      }

      return (
            <div>
               <Link to="/">◁ Back</Link>
               <div style={heightStyle}></div>
               <button
                     onClick={this.onDeleteClick.bind(this)}
                     className="btn btn-danger pull-xs-right">삭제
               </button>
               <h3>{post.title}</h3>
               <h5>Categories: {post.categories}</h5>
               <p>{post.content}</p>
            </div>
      )
   }
}

function mapStateToProps({posts}, ownProps) {
   return { post: posts[ownProps.match.params.id] };
}

export default connect(mapStateToProps, {fetchPost, deletePost})(PostView);