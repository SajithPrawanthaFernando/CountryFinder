"use client";
import { FaFacebookF, FaTwitter, FaLinkedinIn } from "react-icons/fa";
import { HiOutlineMail, HiOutlineLocationMarker } from "react-icons/hi";
import { FiPhone } from "react-icons/fi";
import Link from "next/link";
import Image from "next/image";

export const Footer = () => {
  return (
    <footer className="bg-background text-text py-16 px-6 md:px-40">
      <div className="flex flex-col md:flex-row justify-between gap-10 text-sm">
        {/* LOGO + CONTACT */}
        <div>
          <Image
            src="/images/countrylogo.png"
            width={100}
            height={100}
            alt="Country Finder Logo"
            className="w-[170px] h-auto mb-2"
          />
          <p className="text-muted mb-4">
            Discover facts, culture, and insight about countries around the
            globe.
          </p>
          <div className="text-muted text-sm space-y-2">
            <div className="flex items-center gap-2">
              <HiOutlineMail className="text-primary" />
              <a
                href="mailto:support@countryfinder.com"
                className="hover:text-primary transition"
              >
                support@countryfinder.com
              </a>
            </div>
            <div className="flex items-center gap-2">
              <FiPhone className="text-primary" />
              <a
                href="tel:+94771234567"
                className="hover:text-primary transition"
              >
                +94 77 123 4567
              </a>
            </div>
            <div className="flex items-center gap-2">
              <HiOutlineLocationMarker className="text-primary" />
              <p>123 Globe Street, Colombo, Sri Lanka</p>
            </div>
          </div>
        </div>

        {/* Company */}
        <div>
          <h3 className="text-primary font-semibold uppercase tracking-wide mb-4">
            Company
          </h3>
          <ul className="space-y-2 text-muted">
            <li>
              <Link href="/about">About Us</Link>
            </li>
            <li>
              <Link href="/citation">Internet Citation</Link>
            </li>
            <li>
              <Link href="/faq">FAQ</Link>
            </li>
            <li>
              <Link href="/terms">Terms of Use</Link>
            </li>
            <li>
              <Link href="/contact">Contact Us</Link>
            </li>
            <li>
              <Link href="/feedback">Feedback</Link>
            </li>
          </ul>
        </div>

        {/* Resources */}
        <div>
          <h3 className="text-primary font-semibold uppercase tracking-wide mb-4">
            Resources
          </h3>
          <ul className="space-y-2 text-muted">
            <li>
              <Link href="/join">Join</Link>
            </li>
            <li>
              <Link href="/renew">Renew Membership</Link>
            </li>
            <li>
              <Link href="/manage">Manage Membership</Link>
            </li>
            <li>
              <Link href="/teachers">Teacher Resources</Link>
            </li>
            <li>
              <Link href="/widget">Get Your Widget</Link>
            </li>
            <li>
              <Link href="/pricing">Product Pricing</Link>
            </li>
          </ul>
        </div>

        {/* Other Products + Social */}
        <div>
          <h3 className="text-primary font-semibold uppercase tracking-wide mb-4">
            Other Products
          </h3>
          <ul className="space-y-2 text-muted mb-6">
            <li>
              <Link href="/us-edition">United States Edition</Link>
            </li>
            <li>
              <Link href="/sample-country">Sample Country</Link>
            </li>
          </ul>

          <h3 className="text-primary font-semibold uppercase tracking-wide mb-4">
            Blog
          </h3>

          <h3 className="text-primary font-semibold uppercase tracking-wide mb-2">
            Follow Us
          </h3>
          <div className="flex gap-4">
            <Link
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-muted hover:bg-primary hover:text-black transition"
            >
              <FaTwitter size={14} />
            </Link>
            <Link
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-muted hover:bg-primary hover:text-black transition"
            >
              <FaFacebookF size={14} />
            </Link>
            <Link
              href="#"
              className="w-9 h-9 flex items-center justify-center rounded-full border border-muted hover:bg-primary hover:text-black transition"
            >
              <FaLinkedinIn size={14} />
            </Link>
          </div>
        </div>
      </div>
    </footer>
  );
};
