import React from 'react';
import { useParams, Link } from 'react-router-dom';
import { MOCK_BLOG_POSTS } from '../../data/mockData';
import { Calendar, Clock, ArrowLeft, Share2, Sparkles, User, Tag } from 'lucide-react';

export const BlogDetailPage: React.FC = () => {
  const { slug } = useParams<{ slug: string }>();
  const post = MOCK_BLOG_POSTS.find((p) => p.slug === slug) || MOCK_BLOG_POSTS[0];

  const relatedPosts = MOCK_BLOG_POSTS.filter((p) => p.id !== post.id).slice(0, 2);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      <Link
        to="/blog"
        className="inline-flex items-center gap-1.5 text-xs font-bold text-purple-700 hover:text-purple-900 bg-purple-50 px-3.5 py-1.5 rounded-full"
      >
        <ArrowLeft className="w-3.5 h-3.5" />
        Back to All Articles
      </Link>

      {/* Article Header */}
      <div className="space-y-4">
        <div className="inline-flex items-center gap-1 px-3 py-1 rounded-full bg-pink-100 text-pink-700 text-xs font-bold uppercase">
          <Tag className="w-3 h-3" />
          {post.category}
        </div>
        <h1 className="text-3xl sm:text-5xl font-black text-purple-950 font-heading leading-tight">
          {post.title}
        </h1>

        <div className="flex items-center justify-between py-3 border-y border-purple-100 text-xs text-slate-500">
          <div className="flex items-center gap-3">
            <img
              src={post.author.avatar}
              alt={post.author.name}
              className="w-10 h-10 rounded-full object-cover ring-2 ring-pink-500"
            />
            <div>
              <span className="font-bold text-slate-900 block">{post.author.name}</span>
              <span className="text-[11px] text-slate-500">{post.author.role}</span>
            </div>
          </div>

          <div className="flex items-center gap-4 text-xs">
            <span className="flex items-center gap-1">
              <Calendar className="w-3.5 h-3.5 text-purple-600" />
              {post.publishedDate}
            </span>
            <span className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5 text-pink-500" />
              {post.readTime}
            </span>
          </div>
        </div>
      </div>

      {/* Cover Image */}
      <div className="aspect-[16/9] w-full rounded-3xl overflow-hidden shadow-xl bg-purple-950">
        <img
          src={post.coverImage}
          alt={post.title}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Article Body */}
      <div className="prose prose-purple max-w-none text-slate-700 leading-relaxed space-y-5 text-sm sm:text-base">
        {post.content.map((paragraph, idx) => (
          <p key={idx} className="leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>

      {/* Bottom CTA to find partner */}
      <div className="p-8 rounded-3xl bg-purple-50/80 border border-purple-100 text-center space-y-3">
        <h3 className="text-xl font-bold text-purple-950 font-heading">
          Looking for a partner for this event?
        </h3>
        <p className="text-xs text-slate-600 max-w-md mx-auto">
          Find dancers attending public festival venues in your city. Safe, 18+ verified, and free to join.
        </p>
        <Link
          to="/find-partner"
          className="inline-flex items-center gap-2 py-3 px-6 rounded-full font-bold text-xs sm:text-sm text-white festive-gradient shadow-md"
        >
          <Sparkles className="w-4 h-4" />
          Find Partner in Your City
        </Link>
      </div>

      {/* Related Articles */}
      <div className="space-y-4 pt-6 border-t border-purple-100">
        <h3 className="text-xl font-bold text-purple-950 font-heading">
          Related Festival Reads
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          {relatedPosts.map((rel) => (
            <Link
              key={rel.id}
              to={`/blog/${rel.slug}`}
              className="p-4 rounded-2xl bg-white border border-purple-100 shadow-sm hover:shadow-md flex items-center gap-3 group"
            >
              <img
                src={rel.coverImage}
                alt={rel.title}
                className="w-16 h-16 rounded-xl object-cover"
              />
              <div>
                <span className="text-[10px] font-bold text-pink-600 uppercase">{rel.category}</span>
                <h4 className="text-xs font-bold text-slate-900 group-hover:text-purple-700 line-clamp-2">
                  {rel.title}
                </h4>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};
