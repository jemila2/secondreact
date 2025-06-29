import { Link } from 'react-router-dom';
// import { formatDate } from '../utils/dateUtils';
import { formatDate } from './utils/dateUtils';

const AuthorCard = ({ author, small = false }) => {
  if (!author) return null;

  return (
    <div className={`flex items-center ${small ? 'gap-2' : 'gap-4'}`}>
      <Link to={`/users/${author._id}`}>
        <img
          src={author.avatar || '/images/default-avatar.jpg'}
          alt={author.name}
          className={`rounded-full ${small ? 'w-8 h-8' : 'w-12 h-12'}`}
        />
      </Link>
      <div>
        <Link 
          to={`/users/${author._id}`}
          className={`font-medium hover:text-blue-500 ${small ? 'text-sm' : 'text-base'}`}
        >
          {author.name}
        </Link>
        {!small && (
          <div className="text-gray-500 text-sm">
            {author.bio || 'No bio provided'} • Joined {formatDate(author.createdAt)}
          </div>
        )}
      </div>
    </div>
  );
};

export default AuthorCard;