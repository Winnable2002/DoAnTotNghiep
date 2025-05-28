"use client"

import React from 'react'
import { motion, stagger } from 'framer-motion'
import Image from 'next/image'
import Link from 'next/link'

const containerVariants = {
    hidden: { opacity: 0, y: 50},
    visible: { opacity: 1, y: 0,
    transition:{
    duration: 0.5,
    staggerChildren: 0.2 } 
    }
  }

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 }
  }

const FeaturesSection = () => {
  return (
    <motion.div 
    initial="hidden"
    whileInView="visible" 
    viewport={{ once: true }}
    variants={containerVariants}
    className="py-24 px-6 sm:px-8 lg:px-12 xl:px-16 bg-gray-100">
    <div className="max-w-4xl xl:max-w-6xl mx-auto">
        <motion.h2 
        variants={itemVariants}
        className="text-3xl sm:w-2/3 font-bold text-center mb-12 w-full mx-auto">
            Tại sao chọn RentNQB?
        </motion.h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 xl:gap-16">
            {[0, 1, 2].map((index) => (
                <motion.div key={index} variants={itemVariants}>
                    <FeatureCard
                    imageSrc={`/landing-search${3 - index}.png`}
                    title={["Tiết kiệm thời gian", "Dễ dàng tìm kiếm", "Đặt Resort nhanh chóng"][index]}
                    description={[
                        "Tìm kiếm và đặt Resort nhanh chóng, tiết kiệm thời gian cho bạn.",
                        "Dễ dàng tìm kiếm Resort phù hợp với nhu cầu của bạn.",
                        "Đặt Resort chỉ với vài cú click chuột, không cần phải gọi điện hay gặp mặt trực tiếp."
                    ][index]}
                    linkText={["Tìm hiểu thêm", "Khám phá ngay", "Đặt phòng ngay"][index]}
                    linkHref={["/search", "/explore", "/book"][index]}
                    />

                </motion.div>
            ))}
    </div>
    </div>
    </motion.div>
  )
}

const FeatureCard = ({imageSrc, title, description, linkText, linkHref }: 
    {imageSrc: string, title: string, description: string, linkText: string, linkHref: string}) => (
        <div className="text-center">
        <div className="p-4 rounded-lg mb-4 flex items-center justify-center h-48">
            <Image
                src={imageSrc}
                alt={title}
                width={400}
                height={400}
                className="w-full h-full object-contain"
            />
        </div>
        <h3 className="text-xl font-semibold mb-2">{title}</h3>
        <p className="mb-4">{description}</p>
        <Link 
        href={linkHref} 
        className="inline-block border border-gray-300 rounded px-4 py-2 hover:bg-gray-100" 
        scroll={false}>
            {linkText}
        </Link>
    </div>
)

export default FeaturesSection
