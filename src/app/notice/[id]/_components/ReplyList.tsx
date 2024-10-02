import React from 'react';

interface Reply {
  id: number;
  author: string;
  date: string;
  content: string;
}

interface ReplyListProps {
  replies: Reply[];
}

export default function ReplyList({ replies }: ReplyListProps) {
  return (
    <div className="space-y-2">
      {replies.map((reply) => (
        <div key={reply.id} className="border-b border-gray-300 pb-2">
          <div className="mb-2 flex items-center justify-start">
            <span className="mr-2 text-14 font-semibold">{reply.author}</span>
            <span className="text-12 text-gray-500">{reply.date}</span>
          </div>
          <p className="text-13">{reply.content}</p>
        </div>
      ))}
      <div className="mt-4 flex justify-center">
        <button className="mr-2 border border-primary px-4 py-2 text-14 text-primary">이전</button>
        <button className="border border-primary px-4 py-2 text-14 text-primary">다음</button>
      </div>
    </div>
  );
}
