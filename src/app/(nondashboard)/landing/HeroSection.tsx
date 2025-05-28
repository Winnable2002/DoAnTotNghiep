'use client';

import React from 'react';
import Image from 'next/image';
import { motion } from 'framer-motion';
import { Input } from '@/components/ui/input';

const Herosection = () => {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src="/landing-splash1.png"
        alt="Test"
        fill
        priority
        className="object-cover w-full h-full filter brightness-50"
      />
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="absolute top-1/3 transform -translate-x-1/2 -translate-y-1/2 text-center w-full"
      >
        <div className="max-w-4xl mx-auto px-6 sm:px-12">
          <h1 className="text-5xl font-bold text-white mb-4">
            Bắt đầu hành trình tìm kiếm Resort lý tưởng dành cho bạn
          </h1>
          <p className="text-lg text-white mb-8">
            Tìm kiếm và thuê Resort mơ ước của bạn một cách dễ dàng với RentNQB!!
          </p>

          <div className="flex justify-center">
            <Input
              type="text"
              placeholder="Tìm kiếm"
              onChange={() => {}}
              className="w-full max-w-lg rounded-none rounded-l-xl border-none bg-white h-12"
            />
            <button className="bg-secondary-700 text-white hover:bg-secondary-150 rounded-none rounded-r-xl h-12 px-4">
              Tìm kiếm
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default Herosection;
