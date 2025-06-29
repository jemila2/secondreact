



// import { useState } from 'react';
// import { toast } from 'react-toastify';
// // import { useData } from '../context/DataContext';
// import { useData } from '../../context/DataContext';

// const PostModal = ({ isOpen, onClose, onPostCreated }) => {
//   const { createPost } = useData();
//   const [title, setTitle] = useState(''); // Add state for title
//   const [content, setContent] = useState(''); // Add state for content
//   const [selectedImage, setSelectedImage] = useState(null); // Add state for image
//   const [isSubmitting, setIsSubmitting] = useState(false);

//   const handleImageChange = (e) => {
//     if (e.target.files && e.target.files[0]) {
//       setSelectedImage(e.target.files[0]);
//     }
//   };

// const handleSubmit = async (e) => {
//   e.preventDefault();
  
//   // Basic validation
//   if (!postData.title.trim() || !postData.content.trim()) {
//     toast.error('Title and content are required');
//     return;
//   }

//   try {
//     setIsSubmitting(true);
//     const result = await createPost({
//       title: postData.title,
//       content: postData.content,
//       image: selectedImage // This should be a File object if an image was selected
//     });
    
//     toast.success('Post created successfully!');
//     onClose(); // Close the modal
//     onCreateSuccess?.(); // Optional callback
    
//   } catch (error) {
//     console.error('Post submission error:', error);
//     toast.error(error.message || 'Failed to create post');
//   } finally {
//     setIsSubmitting(false);
//   }
// };

//   if (!isOpen) return null;

//   return (
//     <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
//       <div className="bg-white rounded-lg p-6 w-full max-w-md">
//         <div className="flex justify-between items-center mb-4">
//           <h2 className="text-xl font-bold">Create New Post</h2>
//           <button onClick={onClose} className="text-gray-500 hover:text-gray-700">
//             &times;
//           </button>
//         </div>
        
//         <form onSubmit={handleSubmit}>
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="title">
//               Title
//             </label>
//             <input
//               id="title"
//               type="text"
//               value={title}
//               onChange={(e) => setTitle(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//               required
//             />
//           </div>
          
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="content">
//               Content
//             </label>
//             <textarea
//               id="content"
//               value={content}
//               onChange={(e) => setContent(e.target.value)}
//               className="w-full p-2 border border-gray-300 rounded"
//               rows="4"
//               required
//             />
//           </div>
          
//           <div className="mb-4">
//             <label className="block text-gray-700 mb-2" htmlFor="image">
//               Image (Optional)
//             </label>
//             <input
//               id="image"
//               type="file"
//               onChange={handleImageChange}
//               className="w-full p-2 border border-gray-300 rounded"
//               accept="image/*"
//             />
//           </div>
          
//           <div className="flex justify-end gap-2">
//             <button
//               type="button"
//               onClick={onClose}
//               className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
//               disabled={isSubmitting}
//             >
//               Cancel
//             </button>
//             <button
//               type="submit"
//               className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
//               disabled={isSubmitting}
//             >
//               {isSubmitting ? 'Creating...' : 'Create Post'}
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default PostModal;


import { useState } from 'react';
import { toast } from 'react-toastify';
import { useData } from '../../context/DataContext';

const PostModal = ({ isOpen, onClose, onPostCreated }) => {
  const { createPost } = useData();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [selectedImage, setSelectedImage] = useState(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };


const handleSubmit = async (e) => {
  e.preventDefault();
  
  if (!title.trim() || !content.trim()) {
    toast.error('Title and content are required');
    return;
  }

  try {
    setIsSubmitting(true);
    
    const formData = new FormData();
    formData.append('title', title);
    formData.append('content', content);
    if (selectedImage) {
      formData.append('image', selectedImage);
    }

    await createPost(formData);
    toast.success('Post created successfully!');
    onClose();
    onPostCreated?.();
    
    // Reset form
    setTitle('');
    setContent('');
    setSelectedImage(null);

  } catch (error) {
    if (error.message.includes('Session expired')) {
      // Optionally trigger logout or redirect to login
      toast.error(error.message);
    } else {
      toast.error(error.message);
    }
  } finally {
    setIsSubmitting(false);
  }
};

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-md">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold">Create New Post</h2>
          <button 
            onClick={onClose} 
            className="text-gray-500 hover:text-gray-700"
            disabled={isSubmitting}
          >
            &times;
          </button>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="title">
              Title
            </label>
            <input
              id="title"
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="content">
              Content
            </label>
            <textarea
              id="content"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows="4"
              required
              disabled={isSubmitting}
            />
          </div>
          
          <div className="mb-4">
            <label className="block text-gray-700 mb-2" htmlFor="image">
              Image (Optional)
            </label>
            <input
              id="image"
              type="file"
              onChange={handleImageChange}
              className="w-full p-2 border border-gray-300 rounded"
              accept="image/*"
              disabled={isSubmitting}
            />
          </div>
          
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={onClose}
              className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
              disabled={isSubmitting}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 disabled:opacity-50"
              disabled={isSubmitting}
            >
              {isSubmitting ? 'Creating...' : 'Create Post'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostModal;