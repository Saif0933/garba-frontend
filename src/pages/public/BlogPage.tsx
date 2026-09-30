import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { MOCK_BLOG_POSTS } from '../../data/mockData';
import { BookOpen, Calendar, Clock, ArrowRight, Sparkles, Search } from 'lucide-react';

export const BlogPage: React.FC = () => {
  const [search, setSearch] = useState('');
  const [selectedCat, setSelectedCat] = useState('All');

  const categories = ['All', 'Guides & Tips', 'City Highlights', 'Fashion & Style', 'Safety & Etiquette', 'Culture & Heritage'];

  const filteredPosts = MOCK_BLOG_POSTS.filter((post) => {
    if (selectedCat !== 'All' && post.category !== selectedCat) return false;
    if (search && !post.title.toLowerCase().includes(search.toLowerCase()) && !post.excerpt.toLowerCase().includes(search.toLowerCase())) {
      return false;
    }
    return true;
  });

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10">
      {/* Hero Banner */}
      <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-r from-purple-900 via-pink-900 to-purple-950 text-white shadow-xl flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div className="space-y-3 max-w-xl">
          <div className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-pink-500/30 text-pink-300 text-xs font-bold uppercase tracking-wider border border-pink-500/40">
            <BookOpen className="w-3.5 h-3.5" />
            Navratri Culture & Festival Guides
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-heading">
            GarbaMitra Festival Stories
          </h1>
          <p className="text-xs sm:text-sm text-purple-200/80 leading-relaxed">
            Essential guides on finding partners, festival fashion tips, Dandiya step tutorials, and city ground highlights for Navratri 2026.
          </p>
        </div>

        <div className="w-full md:w-80">
          <div className="relative">
            <Search className="w-4 h-4 text-purple-300 absolute left-3.5 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search festival guides..."
              className="w-full pl-10 pr-4 py-3 rounded-2xl bg-white/10 backdrop-blur-md border border-purple-300/40 text-xs sm:text-sm text-white placeholder:text-purple-300/60 focus:outline-none focus:ring-2 focus:ring-pink-500"
            />
          </div>
        </div>
      </div>

      {/* Category Filter Pills */}
      <div className="flex items-center gap-2 overflow-x-auto pb-2 no-scrollbar">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setSelectedCat(cat)}
            className={`px-4 py-2 rounded-full text-xs font-bold transition-all whitespace-nowrap ${
              selectedCat === cat
                ? 'bg-purple-900 text-white shadow-md'
                : 'bg-white text-slate-700 hover:bg-purple-50 border border-purple-100'
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Blog Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {filteredPosts.map((post) => (
          <Link
            key={post.id}
            to={`/blog/${post.slug}`}
            className="group bg-white rounded-3xl overflow-hidden border border-purple-100 shadow-sm hover:shadow-2xl transition-all duration-300 flex flex-col justify-between transform hover:-translate-y-1.5"
          >
            <div>
              <div className="aspect-[16/10] w-full overflow-hidden bg-purple-950 relative">
                <img
                  src={post.coverImage}
                  alt={post.title}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                />
                <div className="absolute top-3 left-3">
                  <span className="px-3 py-1 rounded-full bg-white/95 backdrop-blur-md text-purple-950 text-[10px] font-black uppercase tracking-wide">
                    {post.category}
                  </span>
                </div>
              </div>

              <div className="p-6 space-y-3">
                <div className="flex items-center gap-3 text-slate-400 text-xs">
                  <span className="flex items-center gap-1">
                    <Calendar className="w-3.5 h-3.5 text-purple-600" />
                    {post.publishedDate}
                  </span>
                  <span>·</span>
                  <span className="flex items-center gap-1">
                    <Clock className="w-3.5 h-3.5 text-pink-500" />
                    {post.readTime}
                  </span>
                </div>

                <h3 className="text-lg font-bold text-slate-900 font-heading group-hover:text-pink-600 transition-colors leading-snug">
                  {post.title}
                </h3>

                <p className="text-xs text-slate-600 leading-relaxed line-clamp-3">
                  {post.excerpt}
                </p>
              </div>
            </div>

            <div className="px-6 pb-6 pt-2 flex items-center justify-between border-t border-purple-50 text-xs font-bold text-purple-700">
              <div className="flex items-center gap-2">
                <img
                  src={post.author.avatar}
                  alt={post.author.name}
                  className="w-6 h-6 rounded-full object-cover"
                />
                <span className="text-slate-700 text-[11px]">{post.author.name}</span>
              </div>
              <span className="flex items-center gap-1 text-pink-600 group-hover:translate-x-1 transition-transform">
                Read Article
                <ArrowRight className="w-3.5 h-3.5" />
              </span>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};
