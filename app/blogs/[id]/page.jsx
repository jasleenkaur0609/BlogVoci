'use client'
import { blog_data } from '@/Assets/assets';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import { assets } from '@/Assets/assets';
import Footer from '@/Components/Footer';
import Link from 'next/link';

const page = ({params}) => {
  const [data,setData]=useState(null);

  const fetchBlogData = ()=>{

    for(let i=0;i<blog_data.length;i++){

      if(Number(params.id)===blog_data[i].id){
        setData(blog_data[i]);
        console.log(blog_data[i]);
        break;
      }
    }
    
  }

  useEffect(()=>{
    fetchBlogData();
  },[])


  return (data?<>
    <div className='bg-gray-200 py-5 px-5 md:px-12 lg:px-28'>
      <div className='flex justify-between items-center'>
        <Link href='/' >
        <Image src= {assets.logo} width={180} alt='' className='w-[130px] sm:w-auto'/>
        </Link>
        <button className='flex items-center gap-2 font-medium py-1 px-3 sm:py-3 sm:px-6 border boder-black shadow-[-7px_7px_0px_#000000]'>
          Get Started <Image src={assets.arrow} alt='' />
          </button>
      </div>
      
      <div className='text-center my-24'>
        <h1 className='text-2xl sm:text-5xl font-semibold max-w-[700px] mx-auto'>{data.title}</h1>
        <Image className='mx-auto mt-6 border border-white rounded-full' src = {data.author_img} width={60} height={60} alt=''/>
        <p className='mt-1 pb-2 text-lg max-w-[740px] mx-auto'>{data.author}</p>
      </div>
    </div>

    <div className='mx-5 max-w-[800px] md:mx-auto mt-[-100px] mb-10'>
      <Image className='border-4 border-white' src={data.image} width={1280} height={720} alt=''/>
      <h1 className='my-8 text-[26px] font-semibold'>Introdcution: </h1>
      <p >{data.description}</p>
      <h3 className='my-5 text-[18px] font-semibold'>Step 1: Self Reflection and Goal Setting</h3>
      <p className='my-3'>Based on your reflection, set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) to guide your personal or professional growth. Clear goals help you stay focused, track progress, and stay motivated.</p>
      <p className='my-3'>Based on your reflection, set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) to guide your personal or professional growth. Clear goals help you stay focused, track progress, and stay motivated.</p>
    
      <h3 className='my-5 text-[18px] font-semibold'>Step 2: Self Reflection and Goal Setting</h3>
      <p className='my-3'>Based on your reflection, set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) to guide your personal or professional growth. Clear goals help you stay focused, track progress, and stay motivated.</p>
      <p className='my-3'>Based on your reflection, set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) to guide your personal or professional growth. Clear goals help you stay focused, track progress, and stay motivated.</p>

      <h3 className='my-5 text-[18px] font-semibold'>Step 3: Self Reflection and Goal Setting</h3>
      <p className='my-3'>Based on your reflection, set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) to guide your personal or professional growth. Clear goals help you stay focused, track progress, and stay motivated.</p>
      <p className='my-3'>Based on your reflection, set SMART goals (Specific, Measurable, Achievable, Relevant, Time-bound) to guide your personal or professional growth. Clear goals help you stay focused, track progress, and stay motivated.</p>
    
      <h3 className='my-5 text-[18px] font-semibold'>Conclusion</h3>
      <p className='my-3'>Setting SMART goals helps turn aspirations into actionable steps. By clearly defining what you want to achieve, how you'll measure success, and when you'll accomplish it, you stay focused and motivated. Regularly reviewing your progress ensures you stay on track and adjust as needed. Whether it's personal development or career advancement, SMART goals act as a reliable roadmap to long-term growth and fulfillment.</p>
      
    <div className='my-24'>
      <p className='text-black font-semibold my-4'>Share this article on social media</p>
      <div className='flex'>
        <Image src={assets.facebook_icon} width={50} alt=''/>
        <Image src={assets.twitter_icon} width={50} alt=''/>
        <Image src={assets.googleplus_icon} width={50} alt=''/>
      </div>
    </div>
    </div>

    <Footer />
    </>:<></>
  );
}

export default page;
