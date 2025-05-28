"use client"

import React from 'react'
import Image from 'next/image'
import { motion } from 'framer-motion'
import Link from 'next/link'

const CallToActionSection = () => {
  return (
    <div className="h-screen w-full relative overflow-hidden">
      <Image
        src="/landing-call-to-action.jpg"
        alt="Call to Action Background"
        fill
        priority
        className="object-cover object-center"
      />
      <div className="absolute inset-0 bg-black bg-opacity-60">
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            transition={{ duration: 0.5 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative h-full flex flex-col items-center justify-center text-center px-6 sm:px-8 lg:px-12 xl:px-16"
            >
            <h2 className="text-3xl sm:text-4xl font-bold text-white mb-4">
                Khám phá những Resort tuyệt vời
            </h2>
            <p className="text-white text-lg mb-6 max-w-xl">
                Tìm kiếm và đặt Resort mơ ước của bạn một cách dễ dàng với RentNQB.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
                <button
                onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
                className="text-primary-700 bg-white rounded-lg px-6 py-3 font-semibold hover:bg-primary-500 hover:text-white"
                >
                Tìm kiếm ngay
                </button>
                <Link
                href="/signup"
                className="text-white bg-secondary-500 rounded-lg px-6 py-3 font-semibold hover:bg-secondary-600"
                scroll={false}
                >
                Đăng ký ngay
                </Link>
            </div>
            </motion.div>

      </div>
    </div>
  )
}

export default CallToActionSection
