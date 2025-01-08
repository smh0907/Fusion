import React from 'react';
import { useParams } from 'react-router-dom';
import { blogPosts } from './blogData';

const BlogDetail = () => {
  const { id } = useParams<{ id: string }>(); 
  const blogPost = blogPosts.find(post => post.id.toString() === id); 

  if (!blogPost) {
    return <div>Blog post not found</div>;
  }

  return (
    <section className="py-16 bg-white">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl font-bold text-center mb-12">{blogPost.title}</h2>
        <div className="flex justify-center mb-8">
          <img
            src={blogPost.image}
            alt={blogPost.title}
            className="w-full md:w-2/3 h-64 object-cover"
          />
        </div>
        <div
         dangerouslySetInnerHTML={{ __html: blogPost.content }} />
      </div>
    </section>
  );
};

export default BlogDetail;
