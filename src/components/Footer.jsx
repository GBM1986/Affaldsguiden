import React from 'react';
import appStore from '../assets/images/appstore.png';
import googleStore from '../assets/images/googleplay.png';
import { AiOutlineInstagram, AiOutlineLinkedin, AiOutlineFacebook } from 'react-icons/ai';

export const Footer = () => {
  return (
    <footer className="relative w-full mt-20">
      {/* Content */}
      <div className="relative z-10 flex flex-col justify-between h-full gap-6 px-4 pt-[300px] pb-20  sm:px-6 md:px-10 lg:px-16">
        <div className="flex flex-col gap-6 md:flex-row md:justify-between items-center">
          {/* Section 1 */}
          <section className='flex flex-col gap-2 text-center md:text-left'>
            <h2 className='text-heading-2 font-semibold'>Affaldsguiden</h2>
            <p className='text-body font-semibold'>Øster Uttrupvej 1A</p>
            <p className='text-body font-semibold'>9000 Aalborg</p>
          </section>

          {/* Section 2 */}
          <section className='flex flex-col gap-2 md:flex-row md:gap-4'>
            <img
              src={appStore}
              alt="App Store"
              className="w-[143px] h-[49px]"
            />
            <img
              src={googleStore}
              alt="Google Play"
              className="w-[143px] h-[49px]"
            />
          </section>

          {/* Section 3 */}
          <section className='flex gap-2 md:gap-4'>
            <AiOutlineInstagram className='w-[48px] h-[48px]' />
            <AiOutlineLinkedin className='w-[48px] h-[48px]' />
            <AiOutlineFacebook className='w-[48px] h-[48px]' />
          </section>
        </div>
      </div>

      {/* Background SVG */}
      <svg
        className="absolute bottom-0 left-0 w-full h-auto z-0"
        viewBox="0 0 1440 357"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M1189 254.118C1312.2 263.722 1422.67 322.619 1462.5 350.866L1492.5 607.569H-64L-98 199.74C-76.6667 151.484 4.5 46.4958 158.5 12.5984C351 -29.7734 312.5 57.7949 428 54.9701C520.4 52.7103 680.167 134.535 748.5 175.73C844 197.857 1065.8 244.513 1189 254.118Z"
          fill="url(#paint0_linear)"
          fillOpacity="0.6"
        />
        <path
          d="M717 236.11C886.6 269.442 1322.67 289.545 1519.5 295.43L1538.5 583.558L-21 616.396L-61.5 236.11C-20 203.154 104.7 133.287 271.5 117.469C480 97.6952 505 194.444 717 236.11Z"
          fill="url(#paint1_linear)"
          fillOpacity="0.2"
        />
        <path
          d="M1323.06 105.865C1399.48 93.1883 1428.06 34.5395 1504.56 70.2024L1494.06 630.569H58.5634C-27.2699 511.222 -128.837 242.585 27.5634 232.981C223.063 220.975 258.064 316.312 426.064 342.794C594.064 369.277 1067.56 229.45 1114.56 192.021C1161.56 154.593 1174.06 130.582 1323.06 105.865Z"
          fill="url(#paint2_linear)"
          fillOpacity="0.7"
        />
        <defs>
          <linearGradient
            id="paint0_linear"
            x1="697.25"
            y1="1"
            x2="697.25"
            y2="607.569"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#D8EADB" />
            <stop offset="1" stopColor="#F5F5F5" />
          </linearGradient>
          <linearGradient
            id="paint1_linear"
            x1="738.5"
            y1="114.836"
            x2="738.5"
            y2="616.396"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#D8EADB" />
            <stop offset="1" stopColor="#1A3636" stopOpacity="0.14" />
          </linearGradient>
          <linearGradient
            id="paint2_linear"
            x1="709.056"
            y1="119.636"
            x2="709.056"
            y2="630.569"
            gradientUnits="userSpaceOnUse"
          >
            <stop stopColor="#D8EADB" />
            <stop offset="1" stopColor="#D9D9D9" stopOpacity="0" />
          </linearGradient>
        </defs>
      </svg>
    </footer>
  );
};
