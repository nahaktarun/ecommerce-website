const Footer = () => {
  return (
    <footer className="bg-gray-900 text-white py-4 mt-4">
      <div className="container mx-auto px-4 text-center">
        © {new Date().getFullYear()} India. All rights reserved
      </div>
    </footer>
  );
};

export default Footer;
