"use client"
import { useState } from "react";
import { IoMoon } from "react-icons/io5";
import { IoIosSunny } from "react-icons/io";
import { useTheme } from 'next-themes';
import { usePathname, useRouter } from "next/navigation"; 
import { signOut, useSession } from "next-auth/react";

const Navbar = () => {
    const router = useRouter(); 
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const { theme, setTheme } = useTheme();
    const { data: session, status } = useSession();

    const toggleMobileMenu = () => {
        setMobileMenuOpen(!mobileMenuOpen);
    };

    const toggleDarkMode = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    };

    const handleLogout = () => {
        signOut({ callbackUrl: '/' });
    };

    const pathname = usePathname()
    const shouldShowNavbar = pathname !== "/login";
    console.log(shouldShowNavbar);

    return shouldShowNavbar ? (
        <nav className={`bg-gray-50/10 backdrop-blur-md sticky top-0 z-50`}>
            <div className="mx-auto max-w-7xl px-2 sm:px-6 lg:px-8">
                <div className="relative flex h-16 items-center justify-between">
                    <div className="absolute inset-y-0 left-0 flex items-center sm:hidden">
                        <button
                            type="button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            aria-controls="mobile-menu"
                            aria-expanded={mobileMenuOpen ? "true" : "false"}
                            onClick={toggleMobileMenu}
                        >
                            <span className="sr-only">Open main menu</span>
                            {mobileMenuOpen ? (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            ) : (
                                <svg className="block h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor" aria-hidden="true">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                                </svg>
                            )}
                        </button>
                    </div>
                    <div className="flex flex-1 items-center justify-start sm:justify-start sm:items-stretch">
                        <div className="flex flex-shrink-0 items-center ml-5 px-4">
                            <svg
                                width="150"
                                height="40"
                                viewBox="0 0 200 60"
                                fill="none"
                                xmlns="http://www.w3.org/2000/svg"
                            >
                                <g>
                                    <path
                                        d="M20 30 C20 20, 30 10, 40 10 C50 10, 60 20, 60 30"
                                        stroke="#4F46E5"
                                        strokeWidth="4"
                                        fill="none"
                                    />
                                    <rect
                                        x="15"
                                        y="30"
                                        width="10"
                                        height="20"
                                        fill="#4F46E5"
                                    />
                                    <rect
                                        x="55"
                                        y="30"
                                        width="10"
                                        height="20"
                                        fill="#4F46E5"
                                    />
                                </g>
                                <text
                                    x="80"
                                    y="35"
                                    fill="#4F46E5"
                                    fontFamily="Arial, sans-serif"
                                    fontSize="24"
                                    fontWeight="bold"
                                >
                                    Audio Hub
                                </text>
                            </svg>
                        </div>
                        <div className="hidden sm:ml-6 sm:block">
                            <div className={`flex space-x-4 ${theme === 'dark' ? 'text-gray-50' : 'text-gray-950'}`}>
                                <a href="/" className={`rounded-md px-3 py-2 text-sm font-medium ${theme === 'dark' ? 'text-gray-50' : 'text-gray-950'}`} aria-current="page">Dashboard</a>
                                <a href="/upload_audio" className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white ${theme === 'dark' ? 'text-gray-50' : 'text-gray-950'}`}>Upload Audio</a>
                                <a href="/" className={`rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white ${theme === 'dark' ? 'text-gray-50' : 'text-gray-950'}`}>Projects</a>
                            </div>
                        </div>
                    </div>
                    <div className="absolute inset-y-0 right-0 flex items-center pr-2 sm:static sm:inset-auto sm:ml-6 sm:pr-0 space-x-4">
                        <button
                            type="button"
                            className="relative inline-flex items-center justify-center rounded-md p-2 text-gray-400 hover:bg-gray-700 hover:text-white focus:outline-none focus:ring-2 focus:ring-inset focus:ring-white"
                            onClick={toggleDarkMode}
                        >
                            <span className="sr-only">Toggle Dark Mode</span>
                            {theme === 'dark' ? (
                                <IoIosSunny color="yellow" />
                            ) : (
                                <IoMoon color="yellow" />
                            )}
                        </button>
                        {status === "authenticated" && (
                            <>
                                <img
                                    src={session.user?.image || ""}
                                    alt={session.user?.name || 'Profile Image'}
                                    className="w-8 h-8 rounded-full object-cover"
                                />
                                <div
                                    onClick={handleLogout}
                                    className={`rounded-md px-3 py-2 text-base font-medium ${theme === 'dark' ? 'text-gray-50' : 'text-gray-950'} hover:bg-gray-700 hover:text-white cursor-pointer`}
                                >
                                    Logout
                                </div>
                            </>
                        )}
                        {status !== "authenticated" && (
                            <div
                                onClick={() => router.push('/login')}
                                className={`rounded-md px-3 py-2 text-base font-medium ${theme === 'dark' ? 'text-gray-50' : 'text-gray-950'} hover:bg-gray-700 hover:text-white cursor-pointer`}
                            >
                                Login
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {shouldShowNavbar && mobileMenuOpen && (
                <div className="sm:hidden" id="mobile-menu">
                    <div className="space-y-1 px-2 pb-3 pt-2">
                        <a
                            href="/"
                            className={`block rounded-md hover:bg-gray-700 hover:text-white px-3 py-2 text-base font-medium ${theme === 'dark' ? 'text-gray-50' : 'text-gray-950'}`}
                            aria-current="page"
                        >
                            Dashboard
                        </a>
                        <a
                            href="/upload_audio"
                            className={`block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white ${theme === 'dark' ? 'text-gray-50' : 'text-gray-950'}`}
                        >
                            Upload Audio
                        </a>
                        <a
                            href="/"
                            className={`block rounded-md px-3 py-2 text-sm font-medium hover:bg-gray-700 hover:text-white ${theme === 'dark' ? 'text-gray-50' : 'text-gray-950'}`}
                        >
                            Projects
                        </a>
                    </div>
                </div>
            )}
        </nav>
    ) : null; 
};

export default Navbar;
