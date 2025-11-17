import React from 'react';

interface LandingPageProps {
  onEnter: () => void;
}

const ArrowRightIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3" />
    </svg>
);
const UsersIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M18 18.72a9.094 9.094 0 003.741-.479 3 3 0 00-4.682-2.72m-7.5-2.962a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5zM3.75 19.125a9.094 9.094 0 018.25-3.469 9.094 9.094 0 018.25 3.469m-16.5 0a9.094 9.094 0 003.741.479m7.5-2.962a3.75 3.75 0 100-7.5 3.75 3.75 0 000 7.5z" />
    </svg>
);
const ClockIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6h4.5m4.5 0a9 9 0 11-18 0 9 9 0 0118 0z" />
    </svg>
);
const GlobeIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M12 21a9.004 9.004 0 008.716-6.747M12 21a9.004 9.004 0 01-8.716-6.747M12 21c2.485 0 4.5-4.03 4.5-9S14.485 3 12 3m0 18c-2.485 0-4.5-4.03-4.5-9S9.515 3 12 3m0 0a8.997 8.997 0 017.843 4.582M12 3a8.997 8.997 0 00-7.843 4.582m15.686 0A11.953 11.953 0 0112 10.5c-2.998 0-5.74-1.1-7.843-2.918m15.686 0A8.959 8.959 0 0121 12c0 .778-.099 1.533-.284 2.253m0 0A17.919 17.919 0 0112 16.5c-3.162 0-6.133-.815-8.716-2.247m0 0A9.015 9.015 0 013 12c0-1.605.42-3.113 1.157-4.418" />
    </svg>
);
const BuildIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M15 21v-1a6 6 0 00-5.197-5.975M15 21H9" />
    </svg>
);
const StatsIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.5 14.25v2.25m3-4.5v4.5m3-6.75v6.75m3-9v9M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
    </svg>
);
const ShareIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className={className}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M7.217 10.907a2.25 2.25 0 100 2.186m0-2.186c.18.324.283.696.283 1.093s-.103.77-.283 1.093m0-2.186l9.566-5.314m-9.566 7.5l9.566 5.314m0 0a2.25 2.25 0 103.935 2.186 2.25 2.25 0 00-3.935-2.186zm0-12.814a2.25 2.25 0 103.933-2.186 2.25 2.25 0 00-3.933 2.186z" />
    </svg>
);

const LandingPage: React.FC<LandingPageProps> = ({ onEnter }) => {
    return (
        <div className="bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-gray-200 antialiased">
            {/* Hero Section */}
            <header 
                className="relative h-screen flex items-center justify-center text-center text-white overflow-hidden"
            >
                <div 
                    className="absolute inset-0 bg-cover bg-center bg-fixed"
                    style={{ backgroundImage: "url('https://i.postimg.cc/DZBW1Cbf/Geni-cover.png')" }}
                ></div>
                <div className="absolute inset-0 bg-gradient-to-t from-gray-900 via-gray-900/70 to-transparent"></div>
                <div className="relative z-10 p-4 flex flex-col items-center">
                    <h1 className="text-5xl md:text-7xl font-extrabold mb-4 drop-shadow-lg tracking-tight">
                        ჩემი გენეალოგიური ხე
                    </h1>
                    <p className="text-lg md:text-2xl mb-10 max-w-3xl mx-auto drop-shadow-md text-gray-300">
                        შექმენით, შეისწავლეთ და გაუზიარეთ თქვენი ოჯახის ისტორია მომავალ თაობებს.
                    </p>
                    <button 
                        onClick={onEnter}
                        className="group inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                        ხის ნახვა
                        <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </header>

            {/* Statistics Section */}
            <section className="py-20 bg-gray-50 dark:bg-gray-800">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="text-center mb-16">
                        <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 mb-4">
                            საგვარეულო მასშტაბებში
                        </h2>
                        <p className="text-lg text-gray-600 dark:text-gray-400 max-w-3xl mx-auto">
                            ჩვენი პლატფორმა აერთიანებს ათასობით ოჯახის ისტორიას, ქმნის რა წარსულის უნიკალურ გობელენს.
                        </p>
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                        {/* Stat Card 1 */}
                        <div className="relative p-8 rounded-xl text-white overflow-hidden shadow-2xl h-80 flex flex-col justify-end bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1580691269248-9366e4a2c2b2?q=80&w=1287&auto=format&fit=crop')"}}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            <div className="relative z-10">
                                <UsersIcon className="w-10 h-10 mb-4 text-purple-300"/>
                                <h3 className="text-4xl font-bold">5,000+</h3>
                                <p className="text-lg font-medium text-gray-200">დამატებული ადამიანი</p>
                            </div>
                        </div>
                        {/* Stat Card 2 */}
                        <div className="relative p-8 rounded-xl text-white overflow-hidden shadow-2xl h-80 flex flex-col justify-end bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1444492417255-3d026c7e2833?q=80&w=1287&auto=format&fit=crop')"}}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            <div className="relative z-10">
                                <ClockIcon className="w-10 h-10 mb-4 text-purple-300"/>
                                <h3 className="text-4xl font-bold">12+</h3>
                                <p className="text-lg font-medium text-gray-200">დაფიქსირებული თაობა</p>
                            </div>
                        </div>
                        {/* Stat Card 3 */}
                        <div className="relative p-8 rounded-xl text-white overflow-hidden shadow-2xl h-80 flex flex-col justify-end bg-cover bg-center" style={{backgroundImage: "url('https://images.unsplash.com/photo-1543946207-6c0a7e033e8b?q=80&w=1287&auto=format&fit=crop')"}}>
                            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent"></div>
                            <div className="relative z-10">
                                <GlobeIcon className="w-10 h-10 mb-4 text-purple-300"/>
                                <h3 className="text-4xl font-bold">15+</h3>
                                <p className="text-lg font-medium text-gray-200">ქვეყანა და რეგიონი</p>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* Features Section */}
            <main className="py-24 px-4">
                <div className="max-w-6xl mx-auto space-y-24">
                    {/* Feature 1 */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <div className="inline-flex items-center gap-3 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-semibold px-4 py-1 rounded-full mb-4">
                               <BuildIcon className="w-5 h-5" /> აწყობა
                            </div>
                            <h3 className="text-3xl font-bold mb-4">ააწყვეთ და გამოსახეთ</h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                                მარტივად დაამატეთ ოჯახის წევრები, განსაზღვრეთ ურთიერთობები და იხილეთ, როგორ ცოცხლდება თქვენი წარმომავლობა ინტერაქტიულ ხეზე.
                            </p>
                        </div>
                        <div className="order-1 md:order-2">
                           <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" alt="Building a family tree" className="rounded-xl shadow-2xl aspect-video object-cover" />
                        </div>
                    </div>
                     {/* Feature 2 */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div>
                           <img src="https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=2070&auto=format&fit=crop" alt="Analyzing data" className="rounded-xl shadow-2xl aspect-video object-cover" />
                        </div>
                        <div>
                           <div className="inline-flex items-center gap-3 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-semibold px-4 py-1 rounded-full mb-4">
                                <StatsIcon className="w-5 h-5" /> ანალიზი
                            </div>
                            <h3 className="text-3xl font-bold mb-4">გააანალიზეთ მონაცემები</h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                                მიიღეთ საინტერესო სტატისტიკა: დემოგრაფია, პოპულარული სახელები, სიცოცხლის ხანგრძლივობა და სხვა.
                            </p>
                        </div>
                    </div>
                     {/* Feature 3 */}
                    <div className="grid md:grid-cols-2 gap-12 items-center">
                        <div className="order-2 md:order-1">
                            <div className="inline-flex items-center gap-3 bg-purple-100 dark:bg-purple-900/50 text-purple-700 dark:text-purple-300 font-semibold px-4 py-1 rounded-full mb-4">
                                <ShareIcon className="w-5 h-5" /> გაზიარება
                            </div>
                            <h3 className="text-3xl font-bold mb-4">შეინახეთ და გააზიარეთ</h3>
                            <p className="text-lg text-gray-600 dark:text-gray-400 mb-6">
                                დააექსპორტეთ თქვენი ხე PDF/JSON ფორმატში, ან უსაფრთხოდ გაუზიარეთ ოჯახის წევრებს დაშიფრული ბმულით.
                            </p>
                        </div>
                        <div className="order-1 md:order-2">
                            <img src="https://images.unsplash.com/photo-1543269865-cbf427effbad?q=80&w=2070&auto=format&fit=crop" alt="Sharing with family" className="rounded-xl shadow-2xl aspect-video object-cover" />
                        </div>
                    </div>
                </div>
            </main>
            
            {/* Final CTA */}
            <section className="bg-gray-50 dark:bg-gray-800">
                <div className="max-w-4xl mx-auto py-16 px-4 text-center">
                    <h2 className="text-4xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-purple-500 to-pink-600 mb-6">
                        მზად ხართ თქვენი ისტორიის დასაწყებად?
                    </h2>
                     <button 
                        onClick={onEnter}
                        className="group inline-flex items-center justify-center bg-purple-600 hover:bg-purple-700 text-white font-bold py-3 px-8 rounded-full text-lg transition-all transform hover:scale-105 shadow-lg focus:outline-none focus:ring-4 focus:ring-purple-500 focus:ring-opacity-50"
                    >
                        დაიწყეთ ახლავე
                        <ArrowRightIcon className="w-5 h-5 ml-2 transition-transform group-hover:translate-x-1" />
                    </button>
                </div>
            </section>
            
            {/* Footer */}
            <footer className="bg-gray-100 dark:bg-gray-900 py-6 text-center">
                <p className="text-gray-500 dark:text-gray-400">&copy; {new Date().getFullYear()} გენეალოგიური ხე. ყველა უფლება დაცულია.</p>
            </footer>
        </div>
    );
};

export default LandingPage;
