
import { RiFacebookFill } from "react-icons/ri";
import { ArticleIcon, AssessmentActiveIcon, AssessmentIcon, CourseIcon, CourseIconActive, GroupIcon, GroupIconActive, HomeIcon, HomeIconActive, LeakActiveIcon, LeakIcon, PriceIcon, PriceIconActive, SettingIcon, SettingIconActive, ShareSecretActiveIcon, ShareSecretIcon, ToolIcon, ToolIconActive, VideoIcon, VideoIconActive } from "@/svgs";
import { IoLogoInstagram } from "react-icons/io";
import { FaYoutube } from "react-icons/fa";
import { RiTwitterXFill } from "react-icons/ri";
import learnIcon from '@/public/assets/icons/learnIcon.svg'
import profile from '@/public/assets/icons/profile.png'
import shieldIcon from '@/public/assets/icons/shieldIcon.svg'
import saveIcon from '@/public/assets/icons/saveIcon.svg'
import featureIcon1 from '@/public/assets/icons/featureIcon1.svg'
import featureIcon2 from '@/public/assets/icons/featureIcon2.svg'
import featureIcon3 from '@/public/assets/icons/featureIcon3.svg'
import featureIcon4 from '@/public/assets/icons/featureIcon4.svg'
import featureIcon5 from '@/public/assets/icons/featureIcon5.svg'
import featureIcon6 from '@/public/assets/icons/featureIcon6.svg'
import intuity1 from '@/public/assets/images/intuity1.svg'
import intuity2 from '@/public/assets/images/intuity2.svg'
import intuity3 from '@/public/assets/images/intuity3.svg'
import testimonialImg from '@/public/assets/images/testimonialImg.png'
import feature1 from '@/public/assets/images/feature1.png'
import feature2 from '@/public/assets/images/feature2.png'
import feature3 from '@/public/assets/images/feature3.png'
import resource1 from '@/public/assets/images/resource1.svg'
import resource2 from '@/public/assets/images/resource2.svg'
import resource3 from '@/public/assets/images/resource3.svg'
import resource4 from '@/public/assets/images/resource4.svg'
import resource5 from '@/public/assets/images/resource5.svg'
import resource6 from '@/public/assets/images/resource6.svg'
import attack1 from '@/public/assets/images/attack1.png'
import attack2 from '@/public/assets/images/attack2.png'
import know1 from '@/public/assets/images/know1.png'
import know2 from '@/public/assets/images/know2.png'
import know3 from '@/public/assets/images/know3.png'
import trick1 from '@/public/assets/images/trick1.svg'
import trick2 from '@/public/assets/images/trick2.svg'
import trick3 from '@/public/assets/images/trick3.svg'
import trick4 from '@/public/assets/images/trick4.svg'
import leak1 from '@/public/assets/images/leak1.png'
import leak2 from '@/public/assets/images/leak2.png'
import leak3 from '@/public/assets/images/leak3.png'
import leak4 from '@/public/assets/images/leak4.png'
import defender1 from '@/public/assets/images/defender1.svg'
import defender2 from '@/public/assets/images/defender2.svg'
import defender3 from '@/public/assets/images/defender3.svg'
import defender4 from '@/public/assets/images/defender4.svg'
import defender5 from '@/public/assets/images/defender5.svg'
import defender6 from '@/public/assets/images/defender6.svg'
import defender7 from '@/public/assets/images/defender7.svg'
import defender8 from '@/public/assets/images/defender8.svg'
import defender9 from '@/public/assets/images/defender9.svg'
import defender10 from '@/public/assets/images/defender10.svg'
import defender11 from '@/public/assets/images/defender11.svg'
import awareness1 from '@/public/assets/images/awareness1.svg'
import awareness2 from '@/public/assets/images/awareness2.svg'
import awareness3 from '@/public/assets/images/awareness3.svg'
import awareness4 from '@/public/assets/images/awareness4.svg'
import awareness5 from '@/public/assets/images/awareness5.svg'
import awareness6 from '@/public/assets/images/awareness6.svg'
import awareness7 from '@/public/assets/images/awareness7.svg'
import awareness8 from '@/public/assets/images/awareness8.svg'
import awareness9 from '@/public/assets/images/awareness9.svg'
import tool1 from '@/public/assets/images/tool1.svg'
import tool2 from '@/public/assets/images/tool2.svg'
import tool3 from '@/public/assets/images/tool3.svg'
import { IoSearchSharp } from "react-icons/io5";
import { FaCode } from "react-icons/fa6";
import { FaGears } from "react-icons/fa6";
import { FaUnlock } from "react-icons/fa";



export const Navs = [
    { name: 'Learn', src: '/learn' },
    { name: 'Assessments', src: '/assessment' },
    { name: 'Resources', src: '/resources' },
    { name: 'Tools', src: '/tools' },
    { name: 'Plans & Pricing', src: '/plansPricing' },
    { name: 'Community', src: '/community' },
    { name: 'About Us', src: '/about' },
]


export const FooterSocial = [
    { icon: <RiFacebookFill className="" />, src: '' },
    { icon: <IoLogoInstagram className="" />, src: '' },
    { icon: <FaYoutube className="" />, src: '' },
    { icon: <RiTwitterXFill className="" />, src: '' },
]


export const FooterCompany = [
    { name: 'FAQ', src: '/faq' },
    { name: 'About Us', src: '/about' },
    { name: 'Contact Us', src: '/contact' },
]

export const FooterResources = [
    { name: 'Learning', src: '' },
    { name: 'Infographics', src: '' },
    { name: 'Tips And Tricks', src: '' },
    { name: 'Tools', src: '' },
    { name: 'Marketplace', src: '' },
    { name: 'Report a Phish', src: '' },
    { name: 'Defender Toolbox', src: '' },
    { name: 'No More Ransom', src: '' },
]


export const FooterInvolved = [
    { name: 'Community', src: '' },
    { name: 'Write For Us', src: '' },
    { name: 'Suggest a Feature', src: '' },
    { name: 'Invite Friends', src: '' },
]



export const EverythingCardData = [
    { name: 'Learn', icon: learnIcon, des: 'Learn how you can protect yourself from all the cyber threats waiting for you. From traditional malware attacks to extremely advanced social engineering attacks, Inturity is your shield.' },
    { name: 'Protect', icon: shieldIcon, des: 'End the confusion. Protect your online assets with the right knowledge, tools, and information. Maintain a strong online reputation.' },
    { name: 'Save', icon: saveIcon, des: 'Save yourself from being the next prey to the hounds of cybercrime. This is about your life. Therefore, never assume that you know things you don’t know because that could cost you.' },
]


export const IntuityCardData = [
    { name: 'Learn', icon: intuity1, des: 'Learn how you can protect yourself from all the cyber threats waiting for you. From traditional malware attacks to extremely advanced social engineering attacks, Inturity is your shield.' },
    { name: 'Protect', icon: intuity2, des: 'End the confusion. Protect your online assets with the right knowledge, tools, and information. Maintain a strong online reputation.' },
    { name: 'Save', icon: intuity3, des: 'Save yourself from being the next prey to the hounds of cybercrime. This is about your life. Therefore, never assume that you know things you don’t know because that could cost you.' },
]


export const FeaturesCardData = [
    { name: 'Cybersecurity Awareness Training', icon: featureIcon1, des: 'The four of functions of management included planning deciding upon on business goals the methods' },
    { name: 'Account Leak Check', icon: featureIcon2, des: 'The four of functions of management included planning deciding upon on business goals the methods' },
    { name: 'Share Password Securely Online', icon: featureIcon3, des: 'The four of functions of management included planning deciding upon on business goals the methods' },
    { name: 'Defender Toolbox', icon: featureIcon4, des: 'The four of functions of management included planning deciding upon on business goals the methods' },
    { name: 'Device Security', icon: featureIcon5, des: 'The four of functions of management included planning deciding upon on business goals the methods' },
    { name: 'Vibrant Community', icon: featureIcon6, des: 'The four of functions of management included planning deciding upon on business goals the methods' },
]




export const TestimonialData = [
    {
        name: "Lorem ipsum dor sit amet. consecdio",
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        userImg: profile,
        userName: 'Jmaes Williams',
        role: 'Founder-Ceo',
        slideImg: testimonialImg
    },
    {
        name: "Lorem ipsum dor sit amet. consecdio",
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        userImg: profile,
        userName: 'Jmaes Williams',
        role: 'Founder-Ceo',
        slideImg: testimonialImg
    },
    {
        name: "Lorem ipsum dor sit amet. consecdio",
        description: 'Sed ut perspiciatis unde omnis iste natus error sit voluptatem accusantium doloremque laudantium, totam rem aperiam, eaque ipsa quae ab illo inventore veritatis et quasi architecto beatae vitae dicta sunt explicabo. Nemo enim ipsam voluptatem quia voluptas sit aspernatur aut odit aut fugit, sed quia consequuntur magni dolores eos qui ratione voluptatem sequi nesciunt. Neque porro quisquam est, qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit',
        userImg: profile,
        userName: 'Jmaes Williams',
        role: 'Founder-Ceo',
        slideImg: testimonialImg
    },

];



export const FeatureCardData = [
    { img: feature1, name: 'Cyber Security Essentials', date: '2023/07/12 I 4 Day Class' },
    { img: feature2, name: 'Cyber Security Essentials', date: '2023/07/12 I 4 Day Class' },
    { img: feature3, name: 'Cyber Security Essentials', date: '2023/07/12 I 4 Day Class' },
]

export const ToolsCardData = [
    { img: tool1, src: '/dashboard/share-secret', name: 'Share Password Securely Online', des: 'The four of functions of management included planning deciding upon on business goals the methods' },
    { img: tool2, src: '/dashboard/tools/password-checker', name: 'Account Leak Check', des: 'The four of functions of management included planning deciding upon on business goals the methods' },
    { img: tool3, src: '/defender-toolbox?id=671c927af8f7176c2df31687', name: 'Defender Toolbox', des: 'The four of functions of management included planning deciding upon on business goals the methods' },
]


export const ResourceCardData = [
    { name: 'Did You Know?', src: '/didYouKnow', icon: resource1, des: 'The four of functions of management included planning deciding upon on business goals the methods' },
    { name: 'Account Leak Check', src: '/leak-check', icon: resource2, des: 'The four of functions of management included planning deciding upon on business goals the methods' },
    { name: 'Share Password Securely Online', src: '#', icon: resource3, des: 'The four of functions of management included planning deciding upon on business goals the methods' },
    { name: 'Defender Toolbox', src: '/defender-toolbox', icon: resource4, des: 'The four of functions of management included planning deciding upon on business goals the methods' },
    { name: 'Tips And Tricks', src: '/tips-tricks', icon: resource5, des: 'The four of functions of management included planning deciding upon on business goals the methods' },
    { name: 'Infographics', src: '/infographics', icon: resource6, des: 'The four of functions of management included planning deciding upon on business goals the methods' },

]

export const AttackCardData = [
    {
        img: attack1,
        name: 'Largest Reported Breaches',
        points: [
            '772,904,991 Collection #1 accounts',
            '763,117,241 Verifications.io accounts',
            '711,477,622 Onliner Spambot accounts',
            '22,161,052 Data Enrichment Exposure From PDL Customer accounts',
            '509,458,528 Facebook accounts',
            '457,962,538 Anti Public Combo List accounts',
            '393,430,309 River City Media Spam List accounts',
            '359,420,698 MySpace accounts',
            '68,765,495 Wattpad accounts',
        ],
    },
    {
        img: attack2,
        name: 'Largest Reported Breaches',
        points: [
            '772,904,991 Collection #1 accounts',
            '763,117,241 Verifications.io accounts',
            '711,477,622 Onliner Spambot accounts',
            '22,161,052 Data Enrichment Exposure From PDL Customer accounts',
            '509,458,528 Facebook accounts',
            '457,962,538 Anti Public Combo List accounts',
            '393,430,309 River City Media Spam List accounts',
            '359,420,698 MySpace accounts',
            '68,765,495 Wattpad accounts',
        ],
    },
];



export const YouKnowCardData = [
    { img: know1, color: '#FDF5E052', name: 'The Cost of Cybercrime', points: ['Cybercrime costs the global economy over $1 trillion annually.', 'Small businesses are the target of 43% of cyber attacks.', 'Cybercrime costs the global economy over $1 trillion annually. Small businesses are the target of 43% of cyber attacks. Ransomware attacks have increased by 40% in the past year, with average ransom payments exceeding $100,000.'] },
    { img: know2, color: '#FDF5E0', name: 'Password Security', points: ['81% of data breaches are due to weak or stolen passwords.', 'The average person reuses passwords across four different sites.', 'Passwords such as "123456" and "password" are still among the most commonly used, making them highly vulnerable'] },
    { img: know2, color: '#FDF5E052', name: 'Phishing Attacks', points: ['Phishing attacks account for more than 80% of reported security incidents.', '30% of phishing emails are opened by targeted users, and 12% of those users click on malicious links or attachments.', 'Training employees to recognize phishing emails can reduce the risk of a successful attack by up to 70%.',] },
    { img: know1, color: '#EFF6C740', name: 'Data Breaches', points: ['Cybercrime costs the global economy over $1 trillion annually.', 'Small businesses are the target of 43% of cyber attacks.', 'Ransomware attacks have increased by 40% in the past year, with average ransom payments exceeding $100,000.'] },
    { img: know3, color: '#FDF5E052', name: 'Mobile Security', points: ['81% of data breaches are due to weak or stolen passwords.', 'The average person reuses passwords across four different sites.', 'Passwords such as "123456" and "password" are still among the most commonly used, making them highly vulnerable'] },
    { img: know1, color: '#FDF5E052', name: 'Cybersecurity Spending', points: ['Cybercrime costs the global economy over $1 trillion annually.', 'Small businesses are the target of 43% of cyber attacks.', 'Ransomware attacks have increased by 40% in the past year, with average ransom payments exceeding $100,000.'] },
]


export const TripTricksCardData = [
    { icon: trick1, name: 'Use Complex Passwords', points: ['Create strong passwords by combining uppercase and lowercase letters, numbers, and special characters.', 'Avoid using easily guessable information such as birthdays, names, or common words.', 'Change your passwords regularly and avoid reusing them across different accounts.', 'Consider using a password manager to securely store and manage your passwords.'] },
    { icon: trick2, name: 'Enable Multi-Factor Authentication', points: ['Create strong passwords by combining uppercase and lowercase letters, numbers, and special characters.', 'Avoid using easily guessable information such as birthdays, names, or common words.', 'Change your passwords regularly and avoid reusing them across different accounts.', 'Consider using a password manager to securely store and manage your passwords.'] },
    { icon: trick3, name: 'Keep Your Software Updated', points: ['Create strong passwords by combining uppercase and lowercase letters, numbers, and special characters.', 'Avoid using easily guessable information such as birthdays, names, or common words.', 'Change your passwords regularly and avoid reusing them across different accounts.', 'Consider using a password manager to securely store and manage your passwords.'] },
    { icon: trick4, name: 'Be Wary of Phishing Scams', points: ['Create strong passwords by combining uppercase and lowercase letters, numbers, and special characters.', 'Avoid using easily guessable information such as birthdays, names, or common words.', 'Change your passwords regularly and avoid reusing them across different accounts.', 'Consider using a password manager to securely store and manage your passwords.'] },
    { icon: trick1, name: 'Use Antivirus and Anti-Malware Software', points: ['Create strong passwords by combining uppercase and lowercase letters, numbers, and special characters.', 'Avoid using easily guessable information such as birthdays, names, or common words.', 'Change your passwords regularly and avoid reusing them across different accounts.', 'Consider using a password manager to securely store and manage your passwords.'] },
    { icon: trick2, name: 'Secure Your Wi-Fi Network', points: ['Create strong passwords by combining uppercase and lowercase letters, numbers, and special characters.', 'Avoid using easily guessable information such as birthdays, names, or common words.', 'Change your passwords regularly and avoid reusing them across different accounts.', 'Consider using a password manager to securely store and manage your passwords.'] },
    { icon: trick3, name: 'Use Complex Passwords', points: ['Create strong passwords by combining uppercase and lowercase letters, numbers, and special characters.', 'Avoid using easily guessable information such as birthdays, names, or common words.', 'Change your passwords regularly and avoid reusing them across different accounts.', 'Consider using a password manager to securely store and manage your passwords.'] },
    { icon: trick4, name: 'Enable Multi-Factor Authentication', points: ['Create strong passwords by combining uppercase and lowercase letters, numbers, and special characters.', 'Avoid using easily guessable information such as birthdays, names, or common words.', 'Change your passwords regularly and avoid reusing them across different accounts.', 'Consider using a password manager to securely store and manage your passwords.'] },
    { icon: trick1, name: 'Use Complex Passwords', points: ['Create strong passwords by combining uppercase and lowercase letters, numbers, and special characters.', 'Avoid using easily guessable information such as birthdays, names, or common words.', 'Change your passwords regularly and avoid reusing them across different accounts.', 'Consider using a password manager to securely store and manage your passwords.'] },
    { icon: trick2, name: 'Enable Multi-Factor Authentication', points: ['Create strong passwords by combining uppercase and lowercase letters, numbers, and special characters.', 'Avoid using easily guessable information such as birthdays, names, or common words.', 'Change your passwords regularly and avoid reusing them across different accounts.', 'Consider using a password manager to securely store and manage your passwords.'] },
    { icon: trick3, name: 'Keep Your Software Updated', points: ['Create strong passwords by combining uppercase and lowercase letters, numbers, and special characters.', 'Avoid using easily guessable information such as birthdays, names, or common words.', 'Change your passwords regularly and avoid reusing them across different accounts.', 'Consider using a password manager to securely store and manage your passwords.'] },
    { icon: trick4, name: 'Be Wary of Phishing Scams', points: ['Create strong passwords by combining uppercase and lowercase letters, numbers, and special characters.', 'Avoid using easily guessable information such as birthdays, names, or common words.', 'Change your passwords regularly and avoid reusing them across different accounts.', 'Consider using a password manager to securely store and manage your passwords.'] },
    { icon: trick1, name: 'Use Antivirus and Anti-Malware Software', points: ['Create strong passwords by combining uppercase and lowercase letters, numbers, and special characters.', 'Avoid using easily guessable information such as birthdays, names, or common words.', 'Change your passwords regularly and avoid reusing them across different accounts.', 'Consider using a password manager to securely store and manage your passwords.'] },
    { icon: trick2, name: 'Secure Your Wi-Fi Network', points: ['Create strong passwords by combining uppercase and lowercase letters, numbers, and special characters.', 'Avoid using easily guessable information such as birthdays, names, or common words.', 'Change your passwords regularly and avoid reusing them across different accounts.', 'Consider using a password manager to securely store and manage your passwords.'] },
    { icon: trick3, name: 'Use Complex Passwords', points: ['Create strong passwords by combining uppercase and lowercase letters, numbers, and special characters.', 'Avoid using easily guessable information such as birthdays, names, or common words.', 'Change your passwords regularly and avoid reusing them across different accounts.', 'Consider using a password manager to securely store and manage your passwords.'] },
    { icon: trick4, name: 'Enable Multi-Factor Authentication', points: ['Create strong passwords by combining uppercase and lowercase letters, numbers, and special characters.', 'Avoid using easily guessable information such as birthdays, names, or common words.', 'Change your passwords regularly and avoid reusing them across different accounts.', 'Consider using a password manager to securely store and manage your passwords.'] },
]



export const HowWorkData = [
    { icon: <IoSearchSharp />, name: 'Choose Your Categories', des: 'Select from our free categories to begin your assessment' },
    { icon: <FaCode />, name: 'Complete the Questionnaire', des: 'Answer a series of questions designed to evaluate different aspects of your digital life.' },
    { icon: <FaGears />, name: 'View Your Results', des: 'Get a comprehensive summary of your strengths and potential risks.' },
    { icon: <FaUnlock />, name: 'Gain Insights and Recommendations', des: 'Receive personalized recommendations to improve your digital safety and well-being.' },
]


export const FaqData = [
    {
        id: 1,
        question: "What services do you offer?",
        answer:
            "We offer UI/UX design, WordPress development, graphic design, and digital marketing services.",
    },
    {
        id: 2,
        question: "What is your design process?",
        answer: "Our design process involves research, wireframing, prototyping, and testing.",
    },
    {
        id: 3,
        question: "Do you provide ongoing support after project completion?",
        answer: "Yes, we provide ongoing support and maintenance after the project completion.",
    },
    {
        id: 4,
        question: "How can I get a quote for my project?",
        answer: "You can request a quote by contacting us through our website.",
    },
    {
        id: 5,
        question: "In publishing and graphic design, Lorem",
        answer: "Details about publishing and graphic design services.",
    },
    {
        id: 6,
        question: "In publishing and graphic design, Lorem",
        answer: "Details about publishing and graphic design services.",
    },
];


export const SidebarData = [
    { name: 'Home', normalIcon: <HomeIcon />, activeIcon: <HomeIconActive />, src: '/dashboard/home' },
    { name: 'Articles', normalIcon: <ArticleIcon />, activeIcon: <ArticleIcon />, src: '' },
    {
        name: 'Assessments', normalIcon: <AssessmentIcon />, activeIcon: <AssessmentActiveIcon />, src: '/dashboard/assessments',
        subTabs: [
            { name: 'Assessment List', src: '/dashboard/assessments/list' },
        ]
    },
    { name: 'Users', normalIcon: <GroupIcon />, activeIcon: <GroupIconActive />, src: '' },
    { name: 'Videos', normalIcon: <VideoIcon />, activeIcon: <VideoIconActive />, src: '' },
    { name: 'Tools', normalIcon: <ToolIcon />, activeIcon: <ToolIconActive />, src: '/dashboard/tools' },
    { name: 'Data Leak Monitor', normalIcon: <LeakIcon />, activeIcon: <LeakActiveIcon />, src: '/dashboard/data-leak-monitor' },
    { name: 'Share Secret', normalIcon: <ShareSecretIcon />, activeIcon: <ShareSecretActiveIcon />, src: '/dashboard/share-secret' },
    { name: 'Settings', normalIcon: <SettingIcon />, activeIcon: <SettingIconActive />, src: '/dashboard/settings' },
]


export const LeakMonitorTableData = [
    {
        id: 1,
        email: 'Cuser897@gmail.com',
        company: 'Canva',
        date: '1200/1500',
        status: 'Account At Risk',
        details: {
            description: `In May 2019, the graphic design tool website Canva suffered a data breach that impacted 137 million subscribers. The exposed data included email addresses, usernames, names, cities of residence, and passwords stored as bcrypt hashes for users not using social logins. The data was provided to HIBP by a source who requested it be attributed to "JimScott.Sec@protonmail.com".`,
            compromisedData: `Email addresses, Geographic locations, Names, Passwords, Usernames`,
            question: 'Have you changed your Canva account password after 05-24-2019?',
        },
    },
    {
        id: 2,
        email: 'Cuser897@gmail.com',
        company: 'Canva',
        date: '1200/1500',
        status: 'Account At Risk',
        details: {
            description: `In May 2019, the graphic design tool website Canva suffered a data breach that impacted 137 million subscribers. The exposed data included email addresses, usernames, names, cities of residence, and passwords stored as bcrypt hashes for users not using social logins. The data was provided to HIBP by a source who requested it be attributed to "JimScott.Sec@protonmail.com".`,
            compromisedData: `Email addresses, Geographic locations, Names, Passwords, Usernames`,
            question: 'Have you changed your Canva account password after 05-24-2019?',
        },
    },
    {
        id: 3,
        email: 'Cuser897@gmail.com',
        company: 'Canva',
        date: '1200/1500',
        status: 'Account At Risk',
        details: {
            description: `In May 2019, the graphic design tool website Canva suffered a data breach that impacted 137 million subscribers. The exposed data included email addresses, usernames, names, cities of residence, and passwords stored as bcrypt hashes for users not using social logins. The data was provided to HIBP by a source who requested it be attributed to "JimScott.Sec@protonmail.com".`,
            compromisedData: `Email addresses, Geographic locations, Names, Passwords, Usernames`,
            question: 'Have you changed your Canva account password after 05-24-2019?',
        },
    },
    {
        id: 4,
        email: 'Cuser897@gmail.com',
        company: 'Canva',
        date: '1200/1500',
        status: 'Account At Risk',
        details: {
            description: `In May 2019, the graphic design tool website Canva suffered a data breach that impacted 137 million subscribers. The exposed data included email addresses, usernames, names, cities of residence, and passwords stored as bcrypt hashes for users not using social logins. The data was provided to HIBP by a source who requested it be attributed to "JimScott.Sec@protonmail.com".`,
            compromisedData: `Email addresses, Geographic locations, Names, Passwords, Usernames`,
            question: 'Have you changed your Canva account password after 05-24-2019?',
        },
    },
    {
        id: 5,
        email: 'Cuser897@gmail.com',
        company: 'Canva',
        date: '1200/1500',
        status: 'Account At Risk',
        details: {
            description: `In May 2019, the graphic design tool website Canva suffered a data breach that impacted 137 million subscribers. The exposed data included email addresses, usernames, names, cities of residence, and passwords stored as bcrypt hashes for users not using social logins. The data was provided to HIBP by a source who requested it be attributed to "JimScott.Sec@protonmail.com".`,
            compromisedData: `Email addresses, Geographic locations, Names, Passwords, Usernames`,
            question: 'Have you changed your Canva account password after 05-24-2019?',
        },
    },
    {
        id: 6,
        email: 'Cuser897@gmail.com',
        company: 'Canva',
        date: '1200/1500',
        status: 'Account At Risk',
        details: {
            description: `In May 2019, the graphic design tool website Canva suffered a data breach that impacted 137 million subscribers. The exposed data included email addresses, usernames, names, cities of residence, and passwords stored as bcrypt hashes for users not using social logins. The data was provided to HIBP by a source who requested it be attributed to "JimScott.Sec@protonmail.com".`,
            compromisedData: `Email addresses, Geographic locations, Names, Passwords, Usernames`,
            question: 'Have you changed your Canva account password after 05-24-2019?',
        },
    },
    {
        id: 7,
        email: 'Cuser897@gmail.com',
        company: 'Canva',
        date: '1200/1500',
        status: 'Account At Risk',
        details: {
            description: `In May 2019, the graphic design tool website Canva suffered a data breach that impacted 137 million subscribers. The exposed data included email addresses, usernames, names, cities of residence, and passwords stored as bcrypt hashes for users not using social logins. The data was provided to HIBP by a source who requested it be attributed to "JimScott.Sec@protonmail.com".`,
            compromisedData: `Email addresses, Geographic locations, Names, Passwords, Usernames`,
            question: 'Have you changed your Canva account password after 05-24-2019?',
        },
    },
    {
        id: 8,
        email: 'Cuser897@gmail.com',
        company: 'Canva',
        date: '1200/1500',
        status: 'Account At Risk',
        details: {
            description: `In May 2019, the graphic design tool website Canva suffered a data breach that impacted 137 million subscribers. The exposed data included email addresses, usernames, names, cities of residence, and passwords stored as bcrypt hashes for users not using social logins. The data was provided to HIBP by a source who requested it be attributed to "JimScott.Sec@protonmail.com".`,
            compromisedData: `Email addresses, Geographic locations, Names, Passwords, Usernames`,
            question: 'Have you changed your Canva account password after 05-24-2019?',
        },
    },

];



export const InviteTableData = [
    { name: 'James Williams', email: "arman78@gmailc.com", invited: 'Yes', status: 'Recived' },
    { name: 'James Williams', email: "arman78@gmailc.com", invited: 'Yes', status: 'Recived' },
    { name: 'James Williams', email: "arman78@gmailc.com", invited: 'Yes', status: 'Recived' },
    { name: 'James Williams', email: "arman78@gmailc.com", invited: 'Yes', status: 'Recived' },
    { name: 'James Williams', email: "arman78@gmailc.com", invited: 'Yes', status: 'Recived' },
    { name: 'James Williams', email: "arman78@gmailc.com", invited: 'Yes', status: 'Recived' },
    { name: 'James Williams', email: "arman78@gmailc.com", invited: 'Yes', status: 'Recived' },
    { name: 'James Williams', email: "arman78@gmailc.com", invited: 'Yes', status: 'Recived' },
    { name: 'James Williams', email: "arman78@gmailc.com", invited: 'Yes', status: 'Recived' },
    { name: 'James Williams', email: "arman78@gmailc.com", invited: 'Yes', status: 'Recived' },
]

export const ShareSecretTableData = [
    { id: '34fu42', des: "I am desciption and i know i am description", date: '12/03/2001', status: 'Expired' },
    { id: '34fu42', des: "I am desciption and i know i am description", date: '12/03/2001', status: 'Expired' },
    { id: '34fu42', des: "I am desciption and i know i am description", date: '12/03/2001', status: 'Viewed' },
    { id: '34fu42', des: "I am desciption and i know i am description", date: '12/03/2001', status: 'Expired' },
    { id: '34fu42', des: "I am desciption and i know i am description", date: '12/03/2001', status: 'Expired' },
    { id: '34fu42', des: "I am desciption and i know i am description", date: '12/03/2001', status: 'Expired' },
    { id: '34fu42', des: "I am desciption and i know i am description", date: '12/03/2001', status: 'Expired' },
    { id: '34fu42', des: "I am desciption and i know i am description", date: '12/03/2001', status: 'Viewed' },
    { id: '34fu42', des: "I am desciption and i know i am description", date: '12/03/2001', status: 'Expired' },
    { id: '34fu42', des: "I am desciption and i know i am description", date: '12/03/2001', status: 'Expired' },
    { id: '34fu42', des: "I am desciption and i know i am description", date: '12/03/2001', status: 'Expired' },

]



export const LeakCheckCards = [
    { img: leak1, color: '#FDF5E0', name: 'Email Address', des: 'Enter your email address or username in the provided field.' },
    { img: leak2, color: '#FAEDCB', name: 'Check Now', des: 'Click the "Check Now" button to initiate the search.' },
    { img: leak3, color: '#F1F4F5', name: 'Search', des: 'Our tool will search through a comprehensive database of known data breaches.' },
    { img: leak4, color: '#EAE1DA', name: 'Feedback', des: 'You will receive immediate feedback on whether your account information has been exposed.' },
]


export const DefenderURLsCards = [
    { name: 'Virus Total', icon: defender1, des: 'Analyze suspicious files, domains, IPs and URLs to detect malware.' },
    { name: 'URLScan.io', icon: defender2, des: 'A sandbox for the web' },
    { name: 'Hybride Anaylysis', icon: defender3, des: 'Malware analysis service that detects and analyzes unknown threats.' },
    { name: 'Joe Sandbox', icon: defender4, des: 'Deep Malware Analysis.' },
    { name: 'Cisco tallos intelegent Group', icon: defender5, des: 'Cisco Talos Intelligence Group is one of the largest commercial threat intelligence teams in the world.' },
    { name: 'More', icon: defender6, des: 'The four of functions of management included planning deciding upon on business goals..' },
]

export const DefenderURLsCards2 = [
    { name: 'MicroSoft', icon: defender7, des: 'Report unsafe site to Microsoft' },
    { name: 'Google', icon: defender8, des: 'Report malicious site to Google' },
    { name: 'PhisTank', icon: defender9, des: 'Submit suspected phishes' },
    { name: 'PhisTank', icon: defender9, des: 'Submit suspected phishes' },
]

export const DefenderURLsCards3 = [
    { name: 'MX Toolbiox', icon: defender10, des: 'Analyze suspicious files, domains, IPs and URLs to detect malware.' },
    { name: 'Email Stuff', icon: defender11, des: 'Microsoft Message Header Analyzer' },
]

export const AwarenessCards = [
    { name: 'Don’t Give up The Game!', icon: awareness1, tag: 'Inforgraphic' },
    { name: 'Don’t Give up The Game!', icon: awareness2, tag: 'Inforgraphic' },
    { name: 'Don’t Give up The Game!', icon: awareness3, tag: 'Inforgraphic' },
    { name: 'Don’t Give up The Game!', icon: awareness4, tag: 'Inforgraphic' },
    { name: 'Don’t Give up The Game!', icon: awareness5, tag: 'Inforgraphic' },
    { name: 'Don’t Give up The Game!', icon: awareness6, tag: 'Inforgraphic' },
    { name: 'Don’t Give up The Game!', icon: awareness7, tag: 'Inforgraphic' },
    { name: 'Don’t Give up The Game!', icon: awareness8, tag: 'Inforgraphic' },
    { name: 'Don’t Give up The Game!', icon: awareness9, tag: 'Inforgraphic' },
]


export const AssessmentsData = [
    { name: 'Cybersecurity Awareness', value: '70%', status: 'unlock' },
    { name: 'Internet Safety', value: '70%', status: 'lock' },
    { name: 'Protecting Your Online Account', value: '70%', status: 'lock' },
    { name: 'Secure Home Computer', value: '70%', status: 'lock' },
    { name: 'Cybersecurity Awareness', value: '70%', status: 'lock' },
    { name: 'Internet Safety', value: '70%', status: 'lock' },
    { name: 'Protecting Your Online Account', value: '70%', status: 'lock' },
    { name: 'Secure Home Computer', value: '70%', status: 'lock' },

]





export const AllAssessmentTableData = [
    { id: "101", name: "My First Assessment", score: '85% (Passed)', questions: 6, status: 'complete' },
    { id: "101", name: "My First Assessment", score: '85% (Passed)', questions: 0, status: 'complete' },
    { id: "101", name: "My First Assessment", score: '85% (Passed)', questions: 8, status: 'complete' },
    { id: "101", name: "My First Assessment", score: '85% (Passed)', questions: 6, status: 'complete' },
    { id: "101", name: "My First Assessment", score: '85% (Passed)', questions: 0, status: 'complete' },
    { id: "101", name: "My First Assessment", score: '85% (Passed)', questions: 8, status: 'complete' },
    { id: "101", name: "My First Assessment", score: '85% (Passed)', questions: 6, status: 'complete' },
    { id: "101", name: "My First Assessment", score: '85% (Passed)', questions: 0, status: 'complete' },
    { id: "101", name: "My First Assessment", score: '85% (Passed)', questions: 8, status: 'complete' },
];