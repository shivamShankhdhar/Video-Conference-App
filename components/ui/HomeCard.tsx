import Image from 'next/image'
import React from 'react'

interface HomeCardProps {
  icon: string,
  bgColor: string,
  title: string,
  description: string,
  alt: string,
  handleClick: () => void;
}
const HomeCard = ({ icon, bgColor, title, description, alt, handleClick }: HomeCardProps) => {
  return (
    <div className={`${bgColor} px-4 py-6 flex flex-col justify-between w-full xl:max-w-[300px] min-h-[250px] rounded-[14px] cursor-pointer`} onClick={handleClick}>
      <div className="flex-center glassmorphism size-8 rounded-[5px]">
        <Image
          src={icon}
          alt={alt}
          width={20}
          height={20}
        />
      </div>
      <div className="flex flex-col ">
        <h1 className='text-2xl font-bold'>{title}</h1>
        <p className='text-lg font-normal'>{description}</p>
      </div>
    </div>
  )
}

export default HomeCard
