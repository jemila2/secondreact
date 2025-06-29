// import { useData } from './DataContext';
import { useData } from '../context/DataContext';

function PostList() {
  const { posts } = useData();

  return (
    <div className="posts-container">
      {posts.map(post => (
        <div key={post._id} className="post-card">
          {post.image && (
            <img 
              src={`http://localhost:5003/${post.image}`} 
              alt={post.title}
              className="post-image"
            />
          )}
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p>By: {post.author?.first_name} {post.author?.last_name}</p>
          <small>{new Date(post.createdAt).toLocaleDateString()}</small>
        </div>
      ))}
    </div>
  );
}
export default PostList