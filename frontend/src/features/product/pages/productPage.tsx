import React, { useState, useEffect, Children } from 'react';
import { Star, Info, ChevronDown, ChevronUp, Check, Tag, ChevronLeft, ChevronRight } from 'lucide-react';
import { ProductHeader } from '@features/components/ProductHeader';
import { Button } from '@components/ui/button';

interface Product {
    id: string;
    series: string;
    title: string;
    subtitle: string;
    rating: number;
    reviewCount: number;
    currentPrice: number;
    originalPrice?: number;
    colors: { name: string; hex: string }[];
    selectedColor: string;
    inStock: boolean;
    description: string;
    offers: string[];
    specs: {
        dimensions: { label: string; value: string }[];
        physical: { label: string; value: string }[];
        warranty: string;
        partNumbers: { color: string; part: string }[];
    };
    inTheBox: string[];
    supportLinks: { label: string; url: string }[];
    images: string[];
    thumbnails: string[];
    reviewsSummary: {
        overallRating: number;
        verifiedPurchasesText: string;
        starDistribution: { stars: number; count: number }[];
    };
    reviewFilters: string[];
    individualReviews: {
        id: string;
        reviewer: string;
        date: string;
        rating: number;
        text: string;
        images?: string[];
    }[];
    youMayAlsoLike: {
        id: string;
        name: string;
        price: number;
        originalPrice?: number;
        series: string;
        image: string;
        colors?: { name: string; hex: string }[];
        saleInfo?: string;
    }[];
}
const dummyProduct: Product = {
    id: 'g515tkl',
    series: 'G SERIES',
    title: 'G515 TKL',
    subtitle: 'Wired Low Profile Gaming Keyboard',
    rating: 4,
    reviewCount: 98,
    currentPrice: 109.99,
    originalPrice: 119.99,
    colors: [{ name: 'Black', hex: '#000000' }, { name: 'White', hex: '#FFFFFF' }],
    selectedColor: 'White',
    inStock: true,
    description: 'Logitech G515 TKL wired tenkeyless gaming keyboard offers high performance and low-profile aesthetic. Personalize your play with gear that is engineered to hold up to intense moments of play and designed for a finely-tuned gaming experience.',
    offers: [
        'Select a FREE* G435 Headset ($79.99 value) with G309 Mouse and G515 TKL Keyboard. Discount applied in cart.',
        'FREE* Gaming Keyboard Sleeve ($24.99 value) with a bundle of select G or Pro Series Mouse and Keyboard.'
    ],
    specs: {
        dimensions: [
            { label: 'Length', value: '15.2 in (368 mm)' },
            { label: 'Width', value: '5.91 in (150 mm)' },
            { label: 'Height', value: '0.86 in (22 mm)' },
            { label: 'Weight w/o cable', value: '29.63 oz (840 g)' },
            { label: 'Cable length', value: '5.9 ft (1.8 m)' }
        ],
        physical: [
            { label: 'Low-profile key switch actuation point', value: '0.05 in (1.3 mm)' },
            { label: 'Actuation force', value: '1.52 oz (43 g) (Linear) Tactile (45 g)' },
            { label: 'Total travel distance', value: '0.13 in (3.2 mm)' }
        ],
        warranty: '2-Year Limited Hardware Warranty',
        partNumbers: [
            { color: 'Black English Tactile', part: '920-012868' },
            { color: 'White English Tactile', part: '920-012869' }
        ]
    },
    inTheBox: [
        'G515 TKL Gaming Keyboard',
        'USB-A to USB-C charging and data cable 5.9 ft (1.8 m)',
        'User documentation'
    ],
    supportLinks: [
        { label: 'GET STARTED', url: '#' },
        { label: 'REGISTER A PRODUCT', url: '#' },
        { label: 'VIEW FAQS', url: '#' },
        { label: 'VIEW ALL DOWNLOADS', url: '#' },
        { label: 'FILE A WARRANTY CLAIM', url: '#' },
        { label: 'REQUEST SUPPORT', url: '#' },
    ],
    images: [
        'https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/g535-wireless/g535-wireless-gallery-1.png?v=1',
        'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g535-wireless/g535-wireless-gallery-3.png?v=1',
        'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g535-wireless/g535-wireless-gallery-2.png?v=1',
    ],
    thumbnails: [
        'https://resource.logitech.com/w_350,c_fit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g305/g305-violet-gallery-2.png',
        'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g305/g305-violet-gallery-2.png?v=1',
        'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g305/g305-violet-gallery-3.png?v=1',
        'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g305/g305-violet-gallery-4.png?v=1',
        'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g305/g305-violet-gallery-5.png?v=1',
    ],
    reviewsSummary: {
        overallRating: 4,
        verifiedPurchasesText: 'All from verified purchases',
        starDistribution: [
            { stars: 5, count: 144 },
            { stars: 4, count: 28 },
            { stars: 3, count: 23 },
            { stars: 2, count: 17 },
            { stars: 1, count: 27 },
        ],
    },
    reviewFilters: [
        'All(3)', 'Pic review(3)', 'Additional review(3)', 'Local review(3)',
        '5 stars(3)', '4 stars(3)', '3 stars(3)', '2 stars(3)', '1 stars(3)',
        'quality is good(3)', 'very good(3)', 'satisfied(3)'
    ],
    individualReviews: [
        {
            id: 'rev1',
            reviewer: 'Faisal A.',
            date: '28 Jul 2024',
            rating: 4,
            text: 'I was really unhappy because of the delay in delivery from Daraz side but finally I received my parcel yesterday 5pm 27-07-24. The scheduled time was 11-18 July 2024. The product was well packed and sealed having manufacturing date 26-04-24. Everything was up to the mark. Finally it made me happy and let me thanks to daraz. So I marking 4 stars. Thanks to Brite also. Brite nay sub right kar dia.',
            images: [
                'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g515-tkl-wired/gallery/g515-wired-keyboard-white-gallery-1-us.png?v=1',
                'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g515-tkl-wired/gallery/g515-wired-keyboard-white-gallery-4-us.png?v=1',
            ]
        },
        {
            id: 'rev2',
            reviewer: 'Alia B.',
            date: '20 Jun 2024',
            rating: 5,
            text: 'Amazing keyboard! The low profile design is perfect for gaming and typing. Highly recommended!',
            images: [
                'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g515-tkl-wired/gallery/g515-wired-keyboard-white-gallery-4-us.png?v=1'
            ]
        },
        {
            id: 'rev3',
            reviewer: 'Zain C.',
            date: '15 May 2024',
            rating: 3,
            text: 'It\'s okay, but I expected better build quality for the price. Typing feels a bit mushy.',
            images: []
        },
    ],
    youMayAlsoLike: [
        { id: 'prod1', name: 'MX Mechanical Mini', price: 149.99, series: 'MX SERIES', image: 'https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/g535-wireless/g535-wireless-gallery-1.png?v=1', colors: [{ name: 'Gray', hex: '#888888' }] },
        { id: 'prod2', name: 'StreamCam Plus', price: 129.0, series: 'STREAMING', image: 'https://resource.logitech.com/w_350,c_fit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g733/gallery/g733-lilac-gallery-2.png', colors: [{ name: 'Graphite', hex: '#4B4B4B' }] },
        { id: 'prod3', name: 'Litra Glow Light', price: 59.99, series: 'LIGHTING', image: 'https://resource.logitech.com/w_350,c_fit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g733/gallery/g733-violet-gallery-1.png', colors: [{ name: 'White', hex: '#FFFFFF' }] },
        { id: 'prod4', name: 'MX Keys S', price: 119.99, originalPrice: 139.99, series: 'MX SERIES', image: 'https://resource.logitech.com/w_350,c_fit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g733/gallery/g733-lilac-gallery-1.png', colors: [{ name: 'Black', hex: '#000000' }], saleInfo: 'SAVE $20' },
        { id: 'prod5', name: 'Ergo K860', price: 129.99, series: 'ERGONOMIC', image: 'https://resource.logitech.com/w_350,c_fit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g733/gallery/g733-black-gallery-1.png', colors: [{ name: 'Dark Gray', hex: '#2E2E2E' }] },
        { id: 'prod6', name: 'POP Mouse', price: 39.99, series: 'POP SERIES', image: 'https://resource.logitech.com/w_350,c_fit,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g733/gallery/g733-white-gallery-2.png', colors: [{ name: 'Blast Yellow', hex: '#FFD300' }] },
        { id: 'prod7', name: 'Lift Vertical Mouse', price: 79.99, series: 'ERGONOMIC', image: 'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g915-tkl/g915-tkl-gallery-2-white.png?v=1', colors: [{ name: 'Rose', hex: '#FFC0CB' }] },
        { id: 'prod8', name: 'MX Anywhere 3S', price: 99.99, series: 'MX SERIES', image: 'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g915-tkl/g915-tkl-gallery-1-carbon.png?v=1', colors: [{ name: 'Pale Gray', hex: '#D3D3D3' }] },
        { id: 'prod9', name: 'G305 Lightspeed', price: 49.99, series: 'G SERIES', image: 'https://resource.logitechg.com/w_692,c_lpad,ar_4:3,q_auto,f_auto,dpr_1.0/d_transparent.gif/content/dam/gaming/en/products/g915-tkl/g915-tkl-gallery-4-carbon.png?v=1', colors: [{ name: 'Lilac', hex: '#C8A2C8' }] },
        { id: 'prod10', name: 'C920s Webcam', price: 69.99, series: 'STREAMING', image: 'https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/g560/g560-gallery-1.png?v=1', colors: [{ name: 'Black', hex: '#000000' }] },
        { id: 'prod11', name: 'Zone Vibe 100', price: 99.99, series: 'AUDIO', image: 'https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/pro-wireless/pro-wireless-headset-gallery-1.png?v=1', colors: [{ name: 'Off White', hex: '#F5F5F5' }] },
        { id: 'prod12', name: 'Combo Touch Keyboard Case', price: 199.99, series: 'TABLET GEAR', image: 'https://resource.astrogaming.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/astro/en/products/a20-wireless-gen-2-headset/a20-gallery-ps4-01.png?v=1', colors: [{ name: 'Oxford Gray', hex: '#474747' }] },
        { id: 'prod13', name: 'Keys-To-Go', price: 69.99, series: 'PORTABLES', image: 'https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/g335/g335-black-gallery-1.png?v=1', colors: [{ name: 'Red', hex: '#FF0000' }] },
        { id: 'prod14', name: 'Wireless Presenter R500s', price: 49.99, series: 'PRESENTATION', image: 'https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/g432/g432-gallery-1.png?v=1', colors: [{ name: 'Slate Gray', hex: '#708090' }] },
        { id: 'prod15', name: 'Pebble Keys 2', price: 49.99, series: 'POP SERIES', image: 'https://resource.logitechg.com/w_386,ar_1.0,c_limit,f_auto,q_auto,dpr_2.0/d_transparent.gif/content/dam/gaming/en/products/g535-wireless/g535-wireless-gallery-1.png?v=1', colors: [{ name: 'Mint', hex: '#98FF98' }] }
    ],

};

interface StarRatingProps {
    rating: number;
    totalStars?: number;
    size?: number;
}

const StarRating: React.FC<StarRatingProps> = ({ rating, totalStars = 5, size = 20 }) => {
    const stars = []; // Array to hold star icons
    for (let i = 1; i <= totalStars; i++) {
        stars.push(
            <Star
                key={i}
                size={size}
                className={i <= rating ? 'text-yellow-500 fill-yellow-500' : 'text-gray-400'}
            />
        );
    }
    return <div className="flex items-center gap-1">{stars}</div>;
};

interface AccordionPanelProps {
    header: React.ReactNode;
    children: React.ReactNode;
    initialOpen?: boolean;
}

const AccordionPanel: React.FC<AccordionPanelProps> = ({ header, children, initialOpen = false }) => {
    const [isOpen, setIsOpen] = useState(initialOpen);

    return (
        <div className="border-b border-gray-200 last:border-b-0">
            <button
                className="flex justify-between items-center w-full p-4 text-left bg-white hover:bg-gray-50 focus:outline-none"
                onClick={() => setIsOpen(!isOpen)}
            >
                <span className="text-gray-800 font-semibold">{header}</span>
                {isOpen ? <ChevronUp size={20} className="text-gray-500" /> : <ChevronDown size={20} className="text-gray-500" />}
            </button>
            {isOpen && (
                <div className="p-4 bg-gray-50 text-gray-700">
                    {children}
                </div>
            )}
        </div>
    );
};

interface TabItem {
    key: string;
    label: string;
    children: React.ReactNode;
}

interface TabsProps {
    items: TabItem[];
    activeKey: string;
    onChange: (key: string) => void;
}

const Tabs: React.FC<TabsProps> = ({ items, activeKey, onChange }) => {
    return (
        <div>
            <div className="flex border-b border-gray-200 overflow-x-auto hide-scrollbar">
                {items.map((item) => (
                    <button
                        key={item.key}
                        className={`px-6 py-3 text-lg font-semibold whitespace-nowrap focus:outline-none transition-colors duration-200
                            ${activeKey === item.key
                                ? 'text-violet-600 border-b-2 border-violet-600'
                                : 'text-gray-600 hover:text-gray-800'
                            }`}
                        onClick={() => onChange(item.key)}
                    >
                        {item.label}
                    </button>
                ))}
            </div>
            <div className="tab-content mt-4">
                {items.find((item) => item.key === activeKey)?.children}
            </div>
        </div>
    );
};

interface CarouselProps {
    children: React.ReactNode[];
    slidesToShow: number | string;
    arrows?: boolean;
    dots?: boolean;
    className?: string;
}

const Carousel: React.FC<CarouselProps> = ({ children, slidesToShow, arrows = true, dots = true, className = '' }) => {
    const [currentIndex, setCurrentIndex] = useState(0);
    const effectiveSlidesToShowNum = typeof slidesToShow === 'string' ? parseFloat(slidesToShow) : slidesToShow;

    const totalSlides = Children.count(children);
    const totalPages = Math.ceil(totalSlides / effectiveSlidesToShowNum);

    const nextSlide = () => {
        setCurrentIndex((prevIndex) => {
            const next = prevIndex + effectiveSlidesToShowNum;
            return next >= totalSlides ? 0 : Math.floor(next);
        });
    };

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => {
            const prev = prevIndex - effectiveSlidesToShowNum;
            return prev < 0 ? Math.floor((totalPages - 1) * effectiveSlidesToShowNum) : Math.floor(prev);
        });
    };

    const transformValue = `translateX(-${(currentIndex / totalSlides) * 100}%)`;

    return (
        <div className={`relative overflow-hidden ${className}`}>
            <div
                className="flex transition-transform duration-300 ease-in-out"
                style={{
                    transform: transformValue,
                    width: `${(totalSlides / effectiveSlidesToShowNum) * 100}%`
                }}
            >
                {Children.map(children, (child, index) => (
                    <div key={index} className="flex-shrink-0" style={{ width: `${100 / effectiveSlidesToShowNum}%` }}>
                        {child}
                    </div>
                ))}
            </div>

            {arrows && totalSlides > effectiveSlidesToShowNum && (
                <>
                    <button
                        className="absolute top-1/2 left-0 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors duration-200 z-10 text-white"
                        onClick={prevSlide}
                    >
                        <ChevronLeft size={24} />
                    </button>
                    <button
                        className="absolute top-1/2 right-0 transform -translate-y-1/2 bg-gray-700 p-2 rounded-full hover:bg-gray-600 transition-colors duration-200 z-10 text-white"
                        onClick={nextSlide}
                    >
                        <ChevronRight size={24} />
                    </button>
                </>
            )}

            {dots && totalPages > 1 && (
                <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-2">
                    {Array.from({ length: totalPages }).map((_, index) => (
                        <button
                            key={index}
                            className={`w-3 h-3 rounded-full ${Math.floor(currentIndex / effectiveSlidesToShowNum) === index ? 'bg-violet-600' : 'bg-gray-400 hover:bg-gray-500'}`}
                            onClick={() => setCurrentIndex(Math.floor(index * effectiveSlidesToShowNum))} // Jump to the corresponding slide group
                        ></button>
                    ))}
                </div>
            )}
        </div>
    );
};

interface ProductCardProps {
    product: Product['youMayAlsoLike'][0];
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
    return (
        <div className="flex-shrink-0 w-48 md:w-60 lg:w-56 bg-white rounded-lg p-4 text-left shadow-md border border-gray-100">
            <img src={product.image} alt={product.name} className="w-full h-32 object-contain mb-3" />
            <span className="text-violet-600 text-xs font-bold uppercase">{product.series}</span>
            <h4 className="text-gray-800 text-lg font-semibold mt-1 mb-2">{product.name}</h4>
            {product.colors && (
                <div className="flex gap-1 mb-2">
                    {product.colors.map((color) => (
                        <span key={color.name} className="w-4 h-4 rounded-full border border-gray-300" style={{ backgroundColor: color.hex }}></span>
                    ))}
                </div>
            )}
            <div className="text-sm">
                <span className="text-gray-900 font-bold text-xl">${product.price.toFixed(2)}</span>
                {product.originalPrice && (
                    <span className="text-gray-500 line-through ml-2">${product.originalPrice.toFixed(2)}</span>
                )}
                {product.saleInfo && <span className="block text-red-500 mt-1">{product.saleInfo}</span>}
            </div>
        </div>
    );
};

const ProductPage: React.FC = () => {
    const [product, setProduct] = useState<Product>(dummyProduct);
    const [activeTabKey, setActiveTabKey] = useState<string>('reviews');

    const tabItems = [
        {
            key: 'reviews',
            label: `Customer Reviews (${product.reviewCount})`,
            children: (
                <div className="customer-reviews-section p-4 bg-white rounded-lg shadow-sm">
                    <h3 className="text-2xl font-semibold mb-4 text-center md:text-left text-gray-800">Customer Reviews ({product.reviewCount})</h3>
                    <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gray-50 rounded-lg p-6 mb-6 border border-gray-100">
                        <div className="flex flex-col items-center text-center md:text-left">
                            <span className="text-yellow-500 text-6xl font-bold">{product.reviewsSummary.overallRating}</span>
                            <StarRating rating={product.reviewsSummary.overallRating} size={24} />
                            <p className="text-gray-600 mt-2">{product.reviewsSummary.verifiedPurchasesText}</p>
                        </div>
                        <div className="flex-grow w-full md:w-auto">
                            {product.reviewsSummary.starDistribution.map((dist) => (
                                <div key={dist.stars} className="flex items-center gap-2 mb-2 text-gray-700">
                                    <span className="w-8 text-right">{dist.stars} stars</span>
                                    <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                                        <div className="h-full bg-violet-500" style={{ width: `${(dist.count / Math.max(...product.reviewsSummary.starDistribution.map(d => d.count))) * 100}%` }}></div>
                                    </div>
                                    <span className="w-8 text-left">{dist.count}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
                        <button className="bg-violet-500 text-white border border-violet-500 hover:bg-violet-600 rounded-full px-4 py-2 text-sm transition-colors duration-200">
                            All Reviews ({product.reviewCount})
                        </button>
                        {product.reviewFilters.map((filter) => (
                            <button key={filter} className="bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 rounded-full px-4 py-2 text-sm transition-colors duration-200">
                                {filter}
                            </button>
                        ))}
                    </div>

                    {product.individualReviews.map((review) => (
                        <div key={review.id} className="bg-gray-50 rounded-lg p-6 mb-4 text-gray-800 border border-gray-100">
                            <div className="flex justify-between items-center mb-2">
                                <StarRating rating={review.rating} size={20} />
                                <span className="text-gray-600 text-sm">{review.date}</span>
                            </div>
                            <p className="text-gray-700 text-sm mb-2">{review.reviewer} <span className="text-violet-600 font-semibold inline-flex items-center ml-1"><Check size={14} className="inline mr-1" />Verified Purchase</span></p>
                            <p className="text-gray-700 leading-relaxed mb-4">{review.text}</p>
                            {review.images && review.images.length > 0 && (
                                <div className="flex gap-2 flex-wrap">
                                    {review.images.map((img, i) => (
                                        <img key={i} src={img} alt={`Review image ${i + 1}`} className="w-20 h-20 object-cover rounded-md border border-gray-300" />
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>
            ),
        },
        {
            key: 'specs',
            label: 'Specifications',
            children: (
                <div className="specs-section p-4 bg-white rounded-lg shadow-sm">
                    <AccordionPanel header="SPECS & DETAILS">
                        <div className="text-gray-700 leading-relaxed">
                            <h4 className="text-gray-800 font-semibold mt-4 mb-2">DIMENSIONS</h4>
                            <ul className="list-none p-0 m-0">
                                {product.specs.dimensions.map((item, i) => (
                                    <li key={i} className="mb-1"><strong className="text-gray-800">{item.label}:</strong> {item.value}</li>
                                ))}
                            </ul>
                            <h4 className="text-gray-800 font-semibold mt-4 mb-2">PHYSICAL SPECIFICATIONS</h4>
                            <ul className="list-none p-0 m-0">
                                {product.specs.physical.map((item, i) => (
                                    <li key={i} className="mb-1"><strong className="text-gray-800">{item.label}:</strong> {item.value}</li>
                                ))}
                            </ul>
                            <h4 className="text-gray-800 font-semibold mt-4 mb-2">WARRANTY INFORMATION</h4>
                            <p className="mb-1">{product.specs.warranty}</p>
                            <h4 className="text-gray-800 font-semibold mt-4 mb-2">PART NUMBER</h4>
                            <ul className="list-none p-0 m-0">
                                {product.specs.partNumbers.map((item, i) => (
                                    <li key={i} className="mb-1"><strong className="text-gray-800">{item.color}:</strong> {item.part}</li>
                                ))}
                            </ul>
                        </div>
                    </AccordionPanel>
                    <AccordionPanel header="IN THE BOX">
                        <ul className="text-gray-700 list-disc list-inside">
                            {product.inTheBox.map((item, i) => (
                                <li key={i} className="mb-1">{item}</li>
                            ))}
                        </ul>
                    </AccordionPanel>
                    <AccordionPanel header="SUPPORT">
                        <div className="text-gray-700">
                            <p className="mb-4">Find all the documentation we have available to get this product up and running quickly.</p>
                            <ul className="list-none p-0 m-0">
                                {product.supportLinks.map((link, i) => (
                                    <li key={i} className="mb-2"><a href={link.url} className="text-violet-600 hover:underline flex items-center">{link.label} <ChevronRight size={16} className="ml-1" /></a></li>
                                ))}
                            </ul>
                        </div>
                    </AccordionPanel>
                </div>
            ),
        },
        {
            key: 'description',
            label: 'Description',
            children: <p className="p-4 text-gray-700 leading-relaxed bg-white rounded-lg shadow-sm">{product.description}</p>,
        },
        {
            key: 'store',
            label: 'Store',
            children: <p className="p-4 text-gray-700 bg-white rounded-lg shadow-sm">Store details here...</p>,
        },
        {
            key: 'more_to_love',
            label: 'More to love',
            children: (
                <div className="you-may-also-like-section p-4 bg-white rounded-lg shadow-sm text-gray-800 text-center">
                    <h3 className="text-2xl font-semibold mb-6">YOU MAY ALSO LIKE</h3>
                    <Carousel
                        slidesToShow={5}
                        arrows={true}
                        dots={true}
                        className="product-carousel"
                    >
                        {product.youMayAlsoLike.map((prod) => (
                            <div key={prod.id} className="p-2">
                                <ProductCard product={prod} />
                            </div>
                        ))}
                    </Carousel>
                </div>
            ),
        },
    ];

    return (
        <>
            <ProductHeader />
            <div className="min-h-screen bg-gray-100 text-gray-800 font-sans p-4 md:p-8 lg:p-10">
                <div className="max-w-7xl mx-auto">
                    <div className='lg:flex lg:gap-10'>
                        <div className="lg:w-2/5 xl:w-1/2 flex flex-col md:flex-row lg:flex-row items-center justify-center mb-8 lg:mb-0 lg:sticky lg:top-10 lg:h-fit">
                            <div className="relative w-full md:hidden mb-4">
                                <Carousel
                                    slidesToShow={1}
                                    arrows={true}
                                    dots={true}
                                    className="main-image-carousel"
                                >
                                    {product.images.map((img, index) => (
                                        <div key={index} className="flex items-center justify-center">
                                            <img src={img} alt={`Product Image ${index + 1}`} className="w-full h-auto max-h-96 object-contain rounded-lg shadow-md border border-gray-200" />
                                        </div>
                                    ))}
                                </Carousel>
                            </div>

                            <div className="hidden md:flex flex-col lg:flex-row items-center justify-center w-full">
                                <div className="hidden lg:flex flex-col gap-3 mr-4">
                                    {product.thumbnails.map((thumb, index) => (
                                        <img
                                            key={index}
                                            src={thumb}
                                            alt={`Thumbnail ${index + 1}`}
                                            className={`w-35 h-25 object-cover rounded-md cursor-pointer border-2 ${index === 0 ? 'border-violet-600' : 'border-gray-200 hover:border-gray-300'}`}
                                        />
                                    ))}
                                </div>
                                <div className="flex-grow w-full md:w-auto">
                                    <img src={product.images[0]} alt={product.title} className="w-full h-auto max-h-[600px] object-contain rounded-lg shadow-md border border-gray-200" />
                                </div>
                                <div className="flex gap-3 justify-center flex-wrap mt-4 lg:hidden">
                                    {product.thumbnails.map((thumb, index) => (
                                        <img
                                            key={index}
                                            src={thumb}
                                            alt={`Thumbnail ${index + 1}`}
                                            className={`w-20 h-20 object-cover rounded-md cursor-pointer border-2 ${index === 0 ? 'border-violet-600' : 'border-gray-200  hover:border-gray-300'}`}
                                        />
                                    ))}
                                </div>
                            </div>
                        </div>

                        <div className="lg:w-3/5 xl:w-1/2">
                            <div className="mb-6">
                                <span className="text-violet-600 text-sm font-bold uppercase">{product.series}</span>
                                <h1 className="text-4xl lg:text-5xl font-bold text-gray-900 mt-2 mb-2">{product.title}</h1>
                                <h2 className="text-xl text-gray-600 mb-4">{product.subtitle}</h2>
                                <div className="flex items-center gap-3 mb-4">
                                    <StarRating rating={product.rating} size={20} />
                                    <span className="text-gray-600 text-base">{product.reviewCount}Reviews</span>
                                </div>
                                <div className="flex items-baseline gap-3 mb-4">
                                    <span className="text-gray-900 text-3xl font-bold">${product.currentPrice.toFixed(2)}</span>
                                    {product.originalPrice && (
                                        <span className="text-gray-500 line-through text-lg">${product.originalPrice.toFixed(2)}</span>
                                    )}
                                    {product.originalPrice && <span className="bg-red-500 text-white px-2 py-1 rounded text-xs font-semibold">SALE</span>}
                                </div>
                                <div className="flex items-center gap-3 mb-6">
                                    {product.colors.map(color => (
                                        <span
                                            key={color.name}
                                            className={`w-8 h-8 rounded-full border-2 ${product.selectedColor === color.name ? 'border-violet-600' : 'border-gray-300'}`}
                                            style={{ backgroundColor: color.hex }}
                                        ></span>
                                    ))}
                                    <span className="text-gray-700">{product.selectedColor}</span>
                                </div>
                            </div>

                            <div className="mb-6">
                                <p className="text-violet-600 text-base mb-2">In stock. Ready to ship</p>
                                <Button>
                                    ADD TO CART
                                </Button>
                                <p className="text-gray-600 text-sm my-2">Free shipping and returns <Info size={16} className="inline ml-1" /></p>
                                <p className="text-gray-600 text-sm mb-2">Get it by Mon, May 19 with free standard shipping on orders of $29 and above.</p>
                            </div>

                            <p className="text-gray-700 leading-relaxed mb-6">{product.description}</p>

                            <div className="mb-8">
                                {product.offers.map((offer, index) => (
                                    <div key={index} className="flex items-center gap-3 bg-gray-50 p-4 rounded-lg mb-3 border border-gray-100">
                                        <Tag size={20} className="text-violet-600" />
                                        <span className="text-gray-700">{offer}</span>
                                    </div>
                                ))}
                            </div>

                        </div>
                    </div>
                    <div className="hidden md:block">
                        <Tabs
                            items={tabItems}
                            activeKey={activeTabKey}
                            onChange={setActiveTabKey}
                        />
                    </div>
                    <div className="block md:hidden">
                        <div className="customer-reviews-section p-4 bg-white rounded-lg shadow-sm mt-4">
                            <h3 className="text-2xl font-semibold mb-4 text-center md:text-left text-gray-800">Customer Reviews ({product.reviewCount})</h3>
                            <div className="flex flex-col md:flex-row items-center md:items-start gap-6 bg-gray-50 rounded-lg p-6 mb-6 border border-gray-100">
                                <div className="flex flex-col items-center text-center md:text-left">
                                    <span className="text-yellow-500 text-6xl font-bold">{product.reviewsSummary.overallRating}</span>
                                    <StarRating rating={product.reviewsSummary.overallRating} size={24} />
                                    <p className="text-gray-600 mt-2">{product.reviewsSummary.verifiedPurchasesText}</p>
                                </div>
                                <div className="flex-grow w-full md:w-auto">
                                    {product.reviewsSummary.starDistribution.map((dist) => (
                                        <div key={dist.stars + "_mobile_dist"} className="flex items-center gap-2 mb-2 text-gray-700">
                                            <span className="w-8 text-right">{dist.stars} stars</span>
                                            <div className="flex-grow h-2 bg-gray-200 rounded-full overflow-hidden">
                                                <div className="h-full bg-violet-500" style={{ width: `${(dist.count / Math.max(...product.reviewsSummary.starDistribution.map(d => d.count))) * 100}%` }}></div>
                                            </div>
                                            <span className="w-8 text-left">{dist.count}</span>
                                        </div>
                                    ))}
                                </div>
                            </div>
                            <div className="flex flex-wrap gap-3 mb-6 justify-center md:justify-start">
                                <button className="bg-violet-500 text-white border border-violet-500 hover:bg-violet-600 rounded-full px-4 py-2 text-sm transition-colors duration-200">
                                    All Reviews ({product.reviewCount})
                                </button>
                                {product.reviewFilters.map((filter) => (
                                    <button key={filter + "_mobile_filter"} className="bg-gray-100 text-gray-700 border border-gray-300 hover:bg-gray-200 rounded-full px-4 py-2 text-sm transition-colors duration-200">
                                        {filter}
                                    </button>
                                ))}
                            </div>

                            {product.individualReviews.map((review) => (
                                <div key={review.id + "_mobile_review"} className="bg-gray-50 rounded-lg p-6 mb-4 text-gray-800 border border-gray-100">
                                    <div className="flex justify-between items-center mb-2">
                                        <StarRating rating={review.rating} size={20} />
                                        <span className="text-gray-600 text-sm">{review.date}</span>
                                    </div>
                                    <p className="text-gray-700 text-sm mb-2">{review.reviewer} <span className="text-violet-600 font-semibold inline-flex items-center ml-1"><Check size={14} className="inline mr-1" />Verified Purchase</span></p>
                                    <p className="text-gray-700 leading-relaxed mb-4">{review.text}</p>
                                    {review.images && review.images.length > 0 && (
                                        <div className="flex gap-2 flex-wrap">
                                            {review.images.map((img, i) => (
                                                <img key={i + "_mobile_img"} src={img} alt={`Review image ${i + 1}`} className="w-20 h-20 object-cover rounded-md border border-gray-300" />
                                            ))}
                                        </div>
                                    )}
                                </div>
                            ))}
                        </div>
                        <AccordionPanel header="SPECS & DETAILS">
                            <div className="text-gray-700 leading-relaxed">
                                <h4 className="text-gray-800 font-semibold mt-4 mb-2">DIMENSIONS</h4>
                                <ul className="list-none p-0 m-0">
                                    {product.specs.dimensions.map((item, i) => (
                                        <li key={i + "_dim_mobile"} className="mb-1"><strong className="text-gray-800">{item.label}:</strong> {item.value}</li>
                                    ))}
                                </ul>
                                <h4 className="text-gray-800 font-semibold mt-4 mb-2">PHYSICAL SPECIFICATIONS</h4>
                                <ul className="list-none p-0 m-0">
                                    {product.specs.physical.map((item, i) => (
                                        <li key={i + "_phys_mobile"} className="mb-1"><strong className="text-gray-800">{item.label}:</strong> {item.value}</li>
                                    ))}
                                </ul>
                                <h4 className="text-gray-800 font-semibold mt-4 mb-2">WARRANTY INFORMATION</h4>
                                <p className="mb-1">{product.specs.warranty}</p>
                                <h4 className="text-gray-800 font-semibold mt-4 mb-2">PART NUMBER</h4>
                                <ul className="list-none p-0 m-0">
                                    {product.specs.partNumbers.map((item, i) => (
                                        <li key={i + "_part_mobile"} className="mb-1"><strong className="text-gray-800">{item.color}:</strong> {item.part}</li>
                                    ))}
                                </ul>
                            </div>
                        </AccordionPanel>
                        <AccordionPanel header="IN THE BOX">
                            <ul className="text-gray-700 list-disc list-inside">
                                {product.inTheBox.map((item, i) => (
                                    <li key={i + "_box_mobile"} className="mb-1">{item}</li>
                                ))}
                            </ul>
                        </AccordionPanel>
                        <AccordionPanel header="SUPPORT">
                            <div className="text-gray-700">
                                <p className="mb-4">Find all the documentation we have available to get this product up and running quickly.</p>
                                <ul className="list-none p-0 m-0">
                                    {product.supportLinks.map((link, i) => (
                                        <li key={i + "_support_mobile"} className="mb-2"><a href={link.url} className="text-violet-600 hover:underline flex items-center">{link.label} <ChevronRight size={16} className="ml-1" /></a></li>
                                    ))}
                                </ul>
                            </div>
                        </AccordionPanel>

                        <div className="you-may-also-like-section p-4 bg-white rounded-lg shadow-sm text-gray-800 text-center mt-4">
                            <h3 className="text-2xl font-semibold mb-6">YOU MAY ALSO LIKE</h3>
                            <Carousel
                                slidesToShow={1.5}
                                arrows={true}
                                dots={true}
                                className="product-carousel"
                            >
                                {product.youMayAlsoLike.map((prod) => (
                                    <div key={prod.id + "_mobile"} className="p-2">
                                        <ProductCard product={prod} />
                                    </div>
                                ))}
                            </Carousel>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default ProductPage;