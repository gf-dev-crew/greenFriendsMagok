'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';

interface MenuModalProps {
  closeModal: () => void;
}

interface MenuItem {
  href: string;
  label: string;
}

const menuItems: MenuItem[] = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About Us' },
  { href: '/neighborhood', label: 'Neighborhood' },
  { href: '/notice', label: 'Notice' },
  { href: '/calendar', label: 'Calendar' },
  { href: '/community', label: 'Community' },
  { href: 'https://www.greenfriends.co.kr', label: 'GreenFriends' },
  { href: '/faq', label: 'FAQ' },
];

export default function MenuModal({ closeModal }: MenuModalProps) {
  const [isOpen, setIsOpen] = useState(true);

  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, []);

  const handleClose = () => {
    setIsOpen(false);
    closeModal(); // Wait for the exit animation to complete
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 z-50 flex items-center justify-center bg-secondary"
          role="dialog"
          aria-modal="true"
          aria-labelledby="menu-title"
        >
          <motion.button
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2, duration: 0.3 }}
            onClick={handleClose}
            className="absolute right-4 top-4"
            aria-label="메뉴 닫기"
          >
            <Image src="/assets/close-button.svg" alt="닫기" width={30} height={30} />
          </motion.button>
          <nav>
            <h2 id="menu-title" className="sr-only">
              메인 메뉴
            </h2>
            <ul className="space-y-4 text-center">
              {menuItems.map((item, index) => (
                <motion.li
                  key={item.href}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * index, duration: 0.3 }}
                >
                  <Link href={item.href} className="text-4xl font-bold" onClick={handleClose}>
                    {item.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
