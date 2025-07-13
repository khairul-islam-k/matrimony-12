import { FaFacebookF, FaTwitter, FaInstagram, FaEnvelope } from 'react-icons/fa';
import { Link } from 'react-router';

const Footer = () => {
  return (
    <footer className="bg-gray-900 text-gray-300 py-10 mt-10">
      <div className="max-w-6xl mx-auto px-4 grid grid-cols-1 md:grid-cols-3 gap-8">
        
        {/* Site Info */}
        <div>
          <h2 className="text-2xl font-bold text-white">Matrimony</h2>
          <p className="mt-2 text-sm">
            Bringing hearts together. Find your perfect life partner with trust and ease.
          </p>
        </div>

        {/* Navigation */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Quick Links</h3>
          <ul className="space-y-2 text-sm">
            <li><Link to='/' className="hover:underline">Home</Link></li>
            <li><Link to='/aboutUs' className="hover:underline">About Us</Link></li>
            <li><a className="hover:underline">Contact</a></li>
            <li><a href="/terms" className="hover:underline">Terms & Privacy</a></li>
          </ul>
        </div>

        {/* Social Media */}
        <div>
          <h3 className="text-lg font-semibold text-white mb-3">Follow Us</h3>
          <div className="flex gap-4 text-xl">
            <Link to='https://www.facebook.com/' className="hover:text-white"><FaFacebookF /></Link>
            <Link to='https://twitter.com' className="hover:text-white"><FaTwitter /></Link>
            <Link to='https://www.instagram.com' className="hover:text-white"><FaInstagram /></Link>
            <Link to='https://mail.google.com' className="hover:text-white"><FaEnvelope /></Link>
          </div>
        </div>
      </div>

      {/* Bottom Bar */}
      <div className="border-t border-gray-700 mt-8 pt-4 text-center text-sm text-gray-500">
        &copy; {new Date().getFullYear()} Matrimony. All rights reserved.
      </div>
    </footer>
  );
};

export default Footer;
