"use client"

import React from 'react'
import { motion, stagger } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const containerVariants = {
    hidden: { opacity: 0},
    visible: { opacity: 1,
    transition:{
    staggerChildren: 0.2 } 
    }
  }

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

const DiscoverSection = () => {
  return (
    <motion.div 
    initial="hidden"
    whileInView="visible" 
    viewport={{ once: true, amount: 0.8 }}
    variants={containerVariants}
    className="py-12 bg-white mb-16">
    <div className="max-w-6xl xl:max-w-7xl mx-auto px-6 sm:px-8 lg:px-12 xl:px-16">
        <motion.div
        variants={itemVariants}
        className="my-12 text-center">
           <h2 className="text-3xl font semibold leading-tight tex">
            Khám phá 
            </h2>
            <p className="mt-4 text-lg text-gray-600">
            Tìm kiếm và đặt Resort một cách dễ dàng và nhanh chóng với RentNQB.
            </p>
            <p className="mt-2 text-gray-600 max-w-3xl mx-auto">
            Chúng tôi cung cấp một nền tảng đơn giản và hiệu quả 
            để bạn có thể tìm kiếm và đặt phòng Resort mơ ước của mình 
            chỉ với vài cú click chuột!!
            </p>
        </motion.div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16 text-center">
            {[
                {
                    imageSrc: "/landing-icon-wand.png",
                    title: "Tìm kiếm Resort",
                    description: "Tìm kiếm Resort một cách nhanh chóng và dễ dàng với RentNQB."
                },
                {
                    imageSrc: "/landing-icon-calendar.png",
                    title: "Đặt Resort",
                    description: "Đặt Resort một cách nhanh chóng và tiện lợi với RentNQB chỉ với vài cú click chuột.",
                },
                {
                    imageSrc: "/landing-icon-heart.png",
                    title: "Tận hưởng kỳ nghỉ ở Resort",
                    description: "Tận hưởng kỳ nghỉ tuyệt vời tại Resort mơ ước của bạn với RentNQB.",
                }
            ].map((card, index) => (
                <motion.div key={index} variants={itemVariants}>
                    <DiscoverCard {...card} />
                </motion.div>
            ))}
    </div>
    </div>
    </motion.div>
  )
}

const DiscoverCard = ({imageSrc, title, description }: 
    {imageSrc: string, title: string, description: string}) => (
        <div className="px-4 py-12 bg-primary-50 rounded-lg shadow-lg md:h-72">
        <div className="bg-primary-700 p-[0.6rem] rounded-full mb-4 h-10 w-10 mx-auto">
            <Image
                src={imageSrc}
                alt={title}
                width={40}
                height={40}
                className="w-full h-full"
            />
        </div>
        <h3 className="mt-4 text-xl font-medium text-gray-800">{title}</h3>
        <p className="mt-2 text-base text-gray-500">{description}</p>
       
    </div>
)

export default DiscoverSection
