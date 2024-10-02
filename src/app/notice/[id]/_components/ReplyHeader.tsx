'use client';

import React, { useState, useRef, useEffect } from 'react';
import Button from '@/components/Button';

export default function ReplyHeader() {
  const [value, setValue] = useState('');
  const textareaRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    if (textareaRef.current) {
      const textarea = textareaRef.current;
      textarea.style.height = '14px'; // 초기 높이 14px

      // 1. scrollHeight가 clientHeight보다 큰 경우에만 높이 조절
      if (textarea.scrollHeight > textarea.clientHeight) {
        textarea.style.height = `${textarea.scrollHeight}px`;
      }
    }
  }, [value]);

  const handleChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => {
    setValue(event.target.value);
  };

  return (
    <div className="mb-4 flex items-center justify-between border-y border-primary py-2">
      <textarea
        ref={textareaRef}
        value={value}
        onChange={handleChange}
        placeholder="댓글을 입력해주세요"
        className="w-[350px] resize-none overflow-hidden pr-2 text-14 focus:outline-none"
        style={{
          height: '14px',
          minHeight: '14px',
          lineHeight: '14px',
          padding: '0',
        }}
      />
      <Button label="등록" type="submit" className="h-full w-12 bg-primary text-white" />
    </div>
  );
}
