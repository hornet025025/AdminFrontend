import React from 'react';
import vLogo from '../../image/V-removebg-preview.png';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebook, faLinkedin, faInstagram, faYoutube, faThreads, faGithub, faXTwitter  } from '@fortawesome/free-brands-svg-icons';
import './Footer.css';

function Footer() {
  return (
<footer className="bg-white rounded-lg shadow dark:bg-gray-900 m-4">
    <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
        <div className="sm:flex sm:items-center sm:justify-between">
            <a href="/" className="flex items-center mb-4 sm:mb-0 no-underline">
                <img src={vLogo} className="h-12 mr-3" alt="vision Logo" />
                <h1 className="self-center text-3xl font-serif font-bold whitespace-nowrap dark:text-black">Vision Ventures</h1>
            </a>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-0 dark:text-black">
                <li>
                    <a href="/" className="mr-4 md:mr-6 text-gray-0 dark:text-black no-underline">About</a>
                </li>
                <li>
                    <a href="/" className="mr-4 md:mr-6 text-gray-0 dark:text-black no-underline">Privacy Policy</a>
                </li>
                <li>
                    <a href="/" className="mr-4 md:mr-6 text-gray-0 dark:text-black no-underline">Licensing</a>
                </li>
                <li>
                    <a href="/" className="mr-4 md:mr-6 text-gray-0 dark:text-black no-underline">Contact</a>
                </li>
            </ul>
        </div>
        <div className="footer-social right-align">
             <a href="/"><FontAwesomeIcon icon={faFacebook} /></a>
             <a href="/"><FontAwesomeIcon icon={faYoutube} /></a>
             <a href="/"><FontAwesomeIcon icon={faInstagram} /></a>
             <a href="/"><FontAwesomeIcon icon={faLinkedin} /></a>
             <a href="/"><FontAwesomeIcon icon={faThreads} /></a>
             <a href="/"><FontAwesomeIcon icon={faGithub} /></a>
             <a href="/"><FontAwesomeIcon icon={faXTwitter} /></a>
        </div>
        <hr className="my-6 border-gray-200 dark:border-black lg:my-8" />
        <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">© 2023 <a href="/" className="hover:underline">Vision Ventures</a>. All Rights Reserved.</span>
    </div>
  </footer>

  );
}

export default Footer;
